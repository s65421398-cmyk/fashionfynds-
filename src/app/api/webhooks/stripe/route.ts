import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${error}`);
    return NextResponse.json(
      { error: `Webhook error: ${error}` },
      { status: 400 }
    );
  }

  // Handle events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log(`Payment received. Session ID: ${session.id}`);
      console.log(`Customer: ${session.customer_email}`);
      console.log(`Amount: ${session.amount_total}`);
      console.log(`Metadata:`, session.metadata);

      // Send order confirmation email
      try {
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        
        const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/emails/send-order-confirmation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: session.customer_email,
            orderNumber: session.id.slice(-12).toUpperCase(),
            customerName: session.customer_details?.name || 'Customer',
            orderDate: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            totalAmount: (session.amount_total || 0) / 100,
            items: lineItems.data.map((item) => ({
              name: item.description || 'Product',
              quantity: item.quantity || 1,
              price: (item.amount_total || 0) / 100 / (item.quantity || 1),
            })),
            shippingAddress: session.customer_details?.address 
              ? `${session.customer_details.address.line1}\n${session.customer_details.address.line2 ? session.customer_details.address.line2 + '\n' : ''}${session.customer_details.address.city}, ${session.customer_details.address.state} ${session.customer_details.address.postal_code}\n${session.customer_details.address.country}`
              : 'Address not provided',
          }),
        });

        if (!emailResponse.ok) {
          console.warn('Order confirmation email failed');
        }
      } catch (emailError) {
        console.error('Failed to send order confirmation email:', emailError);
      }

      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object;
      console.log(`Checkout expired. Session ID: ${session.id}`);
      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object;
      console.log(`Charge refunded. Charge ID: ${charge.id}`);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
