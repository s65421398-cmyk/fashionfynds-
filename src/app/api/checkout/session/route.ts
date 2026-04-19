import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  brand?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customerEmail } = body as {
      items: CartItem[];
      customerEmail: string;
    };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Invalid items" }, { status: 400 });
    }

    if (!customerEmail || !customerEmail.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Validate and compute total server-side (never trust client totals)
    for (const item of items) {
      if (typeof item.price !== "number" || item.price <= 0) {
        return NextResponse.json({ error: "Invalid item price" }, { status: 400 });
      }
      if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 50) {
        return NextResponse.json({ error: "Invalid item quantity" }, { status: 400 });
      }
    }

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const totalINR = Math.round((subtotal + shipping + tax) * 100); // paise

      if (!razorpay) {
        return NextResponse.json({ error: "Payment gateway not configured. Please add Razorpay keys." }, { status: 503 });
      }

      const order = await razorpay.orders.create({
      amount: totalINR,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        customerEmail,
        itemCount: String(items.length),
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
