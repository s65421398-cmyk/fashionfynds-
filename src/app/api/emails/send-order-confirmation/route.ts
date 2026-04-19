import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { OrderConfirmationEmail } from "@/components/emails/OrderConfirmation";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy123456789");

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface SendOrderConfirmationPayload {
  email: string;
  orderNumber: string;
  customerName: string;
  orderDate: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
}

const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 1000;

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = MAX_RETRIES,
  delayMs: number = INITIAL_DELAY_MS
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < maxRetries - 1) {
        const delay = delayMs * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured - email sending disabled');
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 200 } // Return 200 to not block order processing
      );
    }

    let payload: SendOrderConfirmationPayload;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { email, orderNumber, customerName, orderDate, items, totalAmount, shippingAddress } = payload;

    if (!email || !orderNumber || !customerName || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await retryWithBackoff(async () => {
      const { data: emailData, error: sendError } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "FashionFynds <onboarding@resend.dev>",
        to: email,
        subject: `Order Confirmation #${orderNumber}`,
        react: OrderConfirmationEmail({
          orderNumber,
          orderDate,
          customerName,
          items,
          totalAmount,
          shippingAddress,
        }),
        replyTo: process.env.RESEND_REPLY_TO_EMAIL || "support@fashionfynds.com",
      });

      if (sendError) {
        throw new Error(`Resend API error: ${sendError.message}`);
      }

      return emailData;
    });

    return NextResponse.json(
      {
        success: true,
        emailId: result?.id,
        message: "Order confirmation email sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    console.error("[Email Send Error]", {
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send email",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}