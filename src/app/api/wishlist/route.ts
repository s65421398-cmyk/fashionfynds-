import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { wishlistItems, products, session } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

async function authenticateRequest(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.substring(7);
  
  try {
    const sessionRecord = await db.select()
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
    
    return { id: userSession.userId };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
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
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    const body = await request.json();

    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json({ 
        error: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    const { productId } = body;

    if (!productId) {
      return NextResponse.json({ 
        error: "Product ID is required",
        code: "MISSING_PRODUCT_ID" 
      }, { status: 400 });
    }

    const product = await db.select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (product.length === 0) {
      return NextResponse.json({ 
        error: "Product not found",
        code: "PRODUCT_NOT_FOUND" 
      }, { status: 404 });
    }

    const existingItem = await db.select()
      .from(wishlistItems)
      .where(and(
        eq(wishlistItems.userId, user.id),
        eq(wishlistItems.productId, productId)
      ))
      .limit(1);

    if (existingItem.length > 0) {
      return NextResponse.json({ 
        error: "Product already in wishlist",
        code: "DUPLICATE_ITEM" 
      }, { status: 400 });
    }

    const newItem = await db.insert(wishlistItems)
      .values({
        userId: user.id,
        productId: productId,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newItem[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}