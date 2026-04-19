import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, orderItems } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const { id } = await params;
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid order ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const orderId = parseInt(id);

    const orderRecord = await db
      .select()
      .from(orders)
      .where(and(eq(orders.id, orderId), eq(orders.userId, session.user.id)))
      .limit(1);

    if (orderRecord.length === 0) {
      // Check if order exists at all to give the right error code
      const exists = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
      return NextResponse.json(
        exists.length === 0
          ? { error: 'Order not found', code: 'ORDER_NOT_FOUND' }
          : { error: 'Unauthorized access to this order', code: 'FORBIDDEN' },
        { status: exists.length === 0 ? 404 : 403 }
      );
    }

    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));

    return NextResponse.json({ ...orderRecord[0], items }, { status: 200 });
  } catch (error) {
    console.error('GET order error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
