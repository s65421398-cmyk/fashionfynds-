import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("RAZORPAY_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  // HMAC-SHA256 validation
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  const sigBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");

  if (
    sigBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
  ) {
    console.warn("Razorpay webhook signature mismatch");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: { event: string; payload: Record<string, unknown> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  switch (event.event) {
    case "payment.captured": {
      const payment = (event.payload as { payment?: { entity?: Record<string, unknown> } })
        ?.payment?.entity;
      console.log("Payment captured:", payment?.id, "Amount:", payment?.amount);

      // Notify brand/admin of new order via email
      const notes = payment?.notes as Record<string, string> | undefined;
      const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.RESEND_REPLY_TO_EMAIL;
      if (adminEmail && notes?.customerEmail) {
        try {
          const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
          await fetch(`${origin}/api/emails/send-order-confirmation`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: adminEmail,
              orderNumber: String(payment?.id ?? "").slice(-12).toUpperCase(),
              customerName: `[BRAND ALERT] New order from ${notes.customerEmail}`,
              orderDate: new Date().toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              }),
              totalAmount: Number(payment?.amount ?? 0) / 100,
              items: [{ name: `Order from ${notes.customerEmail}`, quantity: Number(notes.itemCount ?? 1), price: Number(payment?.amount ?? 0) / 100 }],
              shippingAddress: "See admin panel for full details",
            }),
          });
        } catch (emailErr) {
          console.error("Brand notification email failed:", emailErr);
        }
      }
      break;
    }

    case "payment.failed": {
      const payment = (event.payload as { payment?: { entity?: Record<string, unknown> } })
        ?.payment?.entity;
      console.warn("Payment failed:", payment?.id, "Error:", payment?.error_description);
      break;
    }

    case "order.paid": {
      const order = (event.payload as { order?: { entity?: Record<string, unknown> } })
        ?.order?.entity;
      console.log("Order paid:", order?.id);
      break;
    }

    default:
      console.log("Unhandled Razorpay event:", event.event);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
