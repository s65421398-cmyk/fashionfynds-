import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { wishlistItems, products } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

async function authenticateRequest() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}

export async function GET() {
  try {
    const user = await authenticateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required', code: 'UNAUTHORIZED' }, { status: 401 });
    }

    const items = await db.select({
      id: wishlistItems.id,
      userId: wishlistItems.userId,
      productId: wishlistItems.productId,
      createdAt: wishlistItems.createdAt,
      product: {
        id: products.id,
        name: products.name,
        slug: products.slug,
        price: products.price,
        originalPrice: products.originalPrice,
        image: products.image,
        images: products.images,
        rating: products.rating,
        reviews: products.reviews,
        inStock: products.inStock,
        deal: products.deal,
        dealDiscount: products.dealDiscount,
      }
    })
      .from(wishlistItems)
      .innerJoin(products, eq(wishlistItems.productId, products.id))
      .where(eq(wishlistItems.userId, user.id));

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error('GET /api/wishlist error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required', code: 'UNAUTHORIZED' }, { status: 401 });
    }

    const body = await request.json();

    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json({ error: "User ID cannot be provided in request body", code: "USER_ID_NOT_ALLOWED" }, { status: 400 });
    }

    const { productId } = body;

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required", code: "MISSING_PRODUCT_ID" }, { status: 400 });
    }

    const product = await db.select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (product.length === 0) {
      return NextResponse.json({ error: "Product not found", code: "PRODUCT_NOT_FOUND" }, { status: 404 });
    }

    const existingItem = await db.select()
      .from(wishlistItems)
      .where(and(
        eq(wishlistItems.userId, user.id),
        eq(wishlistItems.productId, productId)
      ))
      .limit(1);

    if (existingItem.length > 0) {
      return NextResponse.json({ error: "Product already in wishlist", code: "DUPLICATE_ITEM" }, { status: 400 });
    }

    const newItem = await db.insert(wishlistItems)
      .values({
        userId: user.id,
        productId,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newItem[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/wishlist error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
