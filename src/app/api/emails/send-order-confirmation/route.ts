import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { OrderConfirmationEmail } from '@/emails/OrderConfirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendOrderEmailRequest {
  email: string;
  orderNumber: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: string;
}

interface SendEmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<SendEmailResponse>> {
  try {
    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured - email will not be sent');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email service not configured' 
        },
        { status: 503 }
      );
    }

    const body: SendOrderEmailRequest = await request.json();

    // Validate required fields
    if (!body.email || !body.orderNumber || !body.customerName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Render email template
    const emailHtml = render(
      OrderConfirmationEmail({
        orderNumber: body.orderNumber,
        customerName: body.customerName,
        orderDate: body.orderDate,
        totalAmount: body.totalAmount,
        items: body.items,
        shippingAddress: body.shippingAddress,
      })
    );

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'FashionFynds <orders@fashionfynds.com>',
      to: body.email,
      subject: `Order Confirmation - #${body.orderNumber}`,
      html: emailHtml,
      replyTo: process.env.RESEND_REPLY_TO || 'support@fashionfynds.com',
      tags: [
        {
          name: 'category',
          value: 'order-confirmation',
        },
      ],
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: error.message 
        },
        { status: 500 }
      );
    }

    console.log('Order confirmation email sent:', {
      messageId: data?.id,
      orderNumber: body.orderNumber,
      recipient: body.email,
    });

    return NextResponse.json(
      { 
        success: true, 
        messageId: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
