import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { wishlistItems } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function DELETE(
  request: NextRequest,
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

    const userId = session.user.id;
    const { id } = await params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const wishlistItemId = parseInt(id);

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

    if (existingItem[0].userId !== userId) {
      return NextResponse.json(
        { error: 'You do not have permission to delete this wishlist item', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    const deleted = await db
      .delete(wishlistItems)
      .where(and(eq(wishlistItems.id, wishlistItemId), eq(wishlistItems.userId, userId)))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json(
        { error: 'Failed to delete wishlist item', code: 'DELETE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Wishlist item deleted successfully', item: deleted[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE wishlist item error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message, code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
