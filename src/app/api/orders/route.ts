import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, orderItems } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

async function authenticateRequest() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest();
    if (!user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 50);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    const userOrders = await db.select()
      .from(orders)
      .where(eq(orders.userId, user.id))
      .orderBy(desc(orders.createdAt))
      .limit(limit)
      .offset(offset);

    const orderCount = userOrders.length;
    const totalItems = userOrders.reduce((sum, order) => {
      return sum + (order.subtotal / 100);
    }, 0);

    return NextResponse.json(userOrders, { 
      status: 200,
      headers: {
        'X-Total-Count': orderCount.toString(),
        'X-Total-Items': totalItems.toString()
      }
    });

    } catch (error) {
      console.error('GET /api/orders error:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest();
    if (!user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    const body = await request.json();
    const {
      items,
      subtotal,
      shipping,
      tax,
      total,
      shippingName,
      shippingEmail,
      shippingPhone,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZip,
      shippingCountry,
      paymentMethod
    } = body;

    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json({ 
        error: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ 
        error: "Items array is required and must not be empty",
        code: "MISSING_ITEMS" 
      }, { status: 400 });
    }

    if (!subtotal || typeof subtotal !== 'number' || subtotal <= 0) {
      return NextResponse.json({ 
        error: "Valid subtotal is required",
        code: "INVALID_SUBTOTAL" 
      }, { status: 400 });
    }

    if (typeof shipping !== 'number' || shipping < 0) {
      return NextResponse.json({ 
        error: "Valid shipping cost is required",
        code: "INVALID_SHIPPING" 
      }, { status: 400 });
    }

    if (typeof tax !== 'number' || tax < 0) {
      return NextResponse.json({ 
        error: "Valid tax amount is required",
        code: "INVALID_TAX" 
      }, { status: 400 });
    }

    if (!total || typeof total !== 'number' || total <= 0) {
      return NextResponse.json({ 
        error: "Valid total is required",
        code: "INVALID_TOTAL" 
      }, { status: 400 });
    }

    if (!shippingName || typeof shippingName !== 'string' || shippingName.trim() === '') {
      return NextResponse.json({ 
        error: "Shipping name is required",
        code: "MISSING_SHIPPING_NAME" 
      }, { status: 400 });
    }

    if (!shippingEmail || typeof shippingEmail !== 'string' || shippingEmail.trim() === '') {
      return NextResponse.json({ 
        error: "Shipping email is required",
        code: "MISSING_SHIPPING_EMAIL" 
      }, { status: 400 });
    }

    if (!shippingPhone || typeof shippingPhone !== 'string' || shippingPhone.trim() === '') {
      return NextResponse.json({ 
        error: "Shipping phone is required",
        code: "MISSING_SHIPPING_PHONE" 
      }, { status: 400 });
    }

    if (!shippingAddress || typeof shippingAddress !== 'string' || shippingAddress.trim() === '') {
      return NextResponse.json({ 
        error: "Shipping address is required",
        code: "MISSING_SHIPPING_ADDRESS" 
      }, { status: 400 });
    }

    if (!shippingCity || typeof shippingCity !== 'string' || shippingCity.trim() === '') {
      return NextResponse.json({ 
        error: "Shipping city is required",
        code: "MISSING_SHIPPING_CITY" 
      }, { status: 400 });
    }

    if (!shippingState || typeof shippingState !== 'string' || shippingState.trim() === '') {
      return NextResponse.json({ 
        error: "Shipping state is required",
        code: "MISSING_SHIPPING_STATE" 
      }, { status: 400 });
    }

    if (!shippingZip || typeof shippingZip !== 'string' || shippingZip.trim() === '') {
      return NextResponse.json({ 
        error: "Shipping zip is required",
        code: "MISSING_SHIPPING_ZIP" 
      }, { status: 400 });
    }

    if (!shippingCountry || typeof shippingCountry !== 'string' || shippingCountry.trim() === '') {
      return NextResponse.json({ 
        error: "Shipping country is required",
        code: "MISSING_SHIPPING_COUNTRY" 
      }, { status: 400 });
    }

      if (!paymentMethod || typeof paymentMethod !== 'string' || paymentMethod.trim() === '') {
        return NextResponse.json({ 
          error: "Payment method is required",
          code: "MISSING_PAYMENT_METHOD" 
        }, { status: 400 });
      }

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!item.productId || !item.productName || !item.productImage || !item.quantity || !item.price) {
          return NextResponse.json({ 
            error: `Item at index ${i} is missing required fields`,
            code: "INVALID_ITEM" 
          }, { status: 400 });
        }
      }

      const VALID_STATUSES = ['pending', 'pending_verification', 'processing', 'shipped', 'delivered', 'cancelled'];
      const orderStatus = body.status && VALID_STATUSES.includes(body.status) ? body.status : 'pending';

      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      const orderNumber = `ORD-${timestamp}${random}`;
      const now = new Date().toISOString();

      const newOrder = await db.insert(orders)
        .values({
          userId: user.id,
          orderNumber,
          status: orderStatus,
        subtotal,
        shipping,
        tax,
        total,
        shippingName: shippingName.trim(),
        shippingEmail: shippingEmail.trim().toLowerCase(),
        shippingPhone: shippingPhone.trim(),
        shippingAddress: shippingAddress.trim(),
        shippingCity: shippingCity.trim(),
        shippingState: shippingState.trim(),
        shippingZip: shippingZip.trim(),
        shippingCountry: shippingCountry.trim(),
        paymentMethod: paymentMethod.trim(),
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    if (newOrder.length === 0) {
      return NextResponse.json({ 
        error: 'Failed to create order',
        code: 'ORDER_CREATION_FAILED' 
      }, { status: 500 });
    }

    const createdOrder = newOrder[0];
    const orderId = createdOrder.id;

    const itemPromises = items.map(item => 
      db.insert(orderItems)
        .values({
          orderId,
          productId: item.productId,
            productName: item.productName.trim(),
            productImage: item.productImage.trim(),
            quantity: item.quantity,
            price: item.price,
            selectedSize: (item.selectedSize ?? "One Size").trim(),
            selectedColor: (item.selectedColor ?? "Default").trim(),
          createdAt: now,
        })
        .returning()
    );

    const createdItems = await Promise.all(itemPromises);

    const orderWithItems = {
      ...createdOrder,
      items: createdItems.map(item => item[0])
    };

    return NextResponse.json(orderWithItems, { status: 201 });

    } catch (error) {
      console.error('POST /api/orders error:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}