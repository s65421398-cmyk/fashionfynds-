import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { wishlistItems, session } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Extract and validate bearer token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'MISSING_TOKEN' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // Verify session and get userId
    const userSession = await db
      .select()
      .from(session)
      .where(eq(session.token, token))
      .limit(1);

    if (userSession.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or expired token', code: 'INVALID_TOKEN' },
        { status: 401 }
      );
    }

    // Check if session is expired
    const sessionData = userSession[0];
    if (new Date(sessionData.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: 'Session expired', code: 'SESSION_EXPIRED' },
        { status: 401 }
      );
    }

    const userId = sessionData.userId;

    // Validate id parameter
    const { id } = params;
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const wishlistItemId = parseInt(id);

    // Check if wishlist item exists and belongs to the authenticated user
    const existingItem = await db
      .select()
      .from(wishlistItems)
      .where(eq(wishlistItems.id, wishlistItemId))
      .limit(1);

    if (existingItem.length === 0) {
      return NextResponse.json(
        { error: 'Wishlist item not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Verify ownership
    if (existingItem[0].userId !== userId) {
      return NextResponse.json(
        {
          error: 'You do not have permission to delete this wishlist item',
          code: 'FORBIDDEN',
        },
        { status: 403 }
      );
    }

    // Delete the wishlist item
    const deleted = await db
      .delete(wishlistItems)
      .where(
        and(
          eq(wishlistItems.id, wishlistItemId),
          eq(wishlistItems.userId, userId)
        )
      )
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json(
        { error: 'Failed to delete wishlist item', code: 'DELETE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Wishlist item deleted successfully',
        item: deleted[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE wishlist item error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error as Error).message,
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}