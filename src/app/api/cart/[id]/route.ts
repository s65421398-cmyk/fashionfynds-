import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cartItems, session } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

async function authenticateRequest(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);

  try {
    const sessionRecord = await db
      .select()
      .from(session)
      .where(eq(session.token, token))
      .limit(1);

    if (sessionRecord.length === 0) {
      return null;
    }

    const userSession = sessionRecord[0];

    if (new Date(userSession.expiresAt) < new Date()) {
      return null;
    }

    return userSession.userId;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await authenticateRequest(request);
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const cartItemId = parseInt(id);

    const existingCartItem = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.id, cartItemId))
      .limit(1);

    if (existingCartItem.length === 0) {
      return NextResponse.json(
        { error: 'Cart item not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    if (existingCartItem[0].userId !== userId) {
      return NextResponse.json(
        { error: 'You do not have permission to update this cart item', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { quantity, selectedSize, selectedColor } = body;

    const updates: Record<string, any> = {
      updatedAt: new Date().toISOString()
    };

    if (quantity !== undefined) {
      if (typeof quantity !== 'number' || quantity < 1) {
        return NextResponse.json(
          { error: 'Quantity must be a positive number', code: 'INVALID_QUANTITY' },
          { status: 400 }
        );
      }
      updates.quantity = quantity;
    }

    if (selectedSize !== undefined) {
      if (typeof selectedSize !== 'string' || selectedSize.trim() === '') {
        return NextResponse.json(
          { error: 'Selected size must be a non-empty string', code: 'INVALID_SIZE' },
          { status: 400 }
        );
      }
      updates.selectedSize = selectedSize.trim();
    }

    if (selectedColor !== undefined) {
      if (typeof selectedColor !== 'string' || selectedColor.trim() === '') {
        return NextResponse.json(
          { error: 'Selected color must be a non-empty string', code: 'INVALID_COLOR' },
          { status: 400 }
        );
      }
      updates.selectedColor = selectedColor.trim();
    }

    const updatedCartItem = await db
      .update(cartItems)
      .set(updates)
      .where(and(eq(cartItems.id, cartItemId), eq(cartItems.userId, userId)))
      .returning();

    if (updatedCartItem.length === 0) {
      return NextResponse.json(
        { error: 'Failed to update cart item', code: 'UPDATE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedCartItem[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await authenticateRequest(request);
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const cartItemId = parseInt(id);

    const existingCartItem = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.id, cartItemId))
      .limit(1);

    if (existingCartItem.length === 0) {
      return NextResponse.json(
        { error: 'Cart item not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    if (existingCartItem[0].userId !== userId) {
      return NextResponse.json(
        { error: 'You do not have permission to delete this cart item', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    const deletedCartItem = await db
      .delete(cartItems)
      .where(and(eq(cartItems.id, cartItemId), eq(cartItems.userId, userId)))
      .returning();

    if (deletedCartItem.length === 0) {
      return NextResponse.json(
        { error: 'Failed to delete cart item', code: 'DELETE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Cart item deleted successfully',
        deletedItem: deletedCartItem[0]
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}