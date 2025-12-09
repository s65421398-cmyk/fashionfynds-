import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, orderItems } from '@/db/schema';
import { eq, desc, like, and, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const conditions = [];

    if (status && status !== 'all') {
      conditions.push(eq(orders.status, status));
    }

    if (search) {
      conditions.push(
        sql`(${orders.orderNumber} LIKE ${'%' + search + '%'} OR ${orders.shippingName} LIKE ${'%' + search + '%'} OR ${orders.shippingEmail} LIKE ${'%' + search + '%'})`
      );
    }

    let query = db.select().from(orders);

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const allOrders = await query
      .orderBy(desc(orders.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(allOrders, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: 'Valid order ID is required',
        code: 'INVALID_ID' 
      }, { status: 400 });
    }

    const existingOrder = await db.select()
      .from(orders)
      .where(eq(orders.id, parseInt(id)))
      .limit(1);

    if (existingOrder.length === 0) {
      return NextResponse.json({ 
        error: 'Order not found',
        code: 'ORDER_NOT_FOUND' 
      }, { status: 404 });
    }

    const body = await request.json();
    const { status } = body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ 
        error: 'Invalid status. Must be one of: ' + validStatuses.join(', '),
        code: 'INVALID_STATUS' 
      }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    };

    if (status) updateData.status = status;

    const updated = await db.update(orders)
      .set(updateData)
      .where(eq(orders.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}
