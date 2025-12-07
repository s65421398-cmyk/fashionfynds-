import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cartItems, products, session, user } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

async function authenticateRequest(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.substring(7);
  
  try {
    const sessionResult = await db
      .select({ userId: session.userId })
      .from(session)
      .where(eq(session.token, token))
      .limit(1);
    
    if (sessionResult.length === 0) {
      return null;
    }
    
    const now = new Date();
    const sessionData = await db
      .select({
        userId: session.userId,
        expiresAt: session.expiresAt,
      })
      .from(session)
      .where(eq(session.token, token))
      .limit(1);
    
    if (sessionData.length === 0 || new Date(sessionData[0].expiresAt) < now) {
      return null;
    }
    
    return { id: sessionResult[0].userId };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }
    
    const items = await db
      .select({
        id: cartItems.id,
        userId: cartItems.userId,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        selectedSize: cartItems.selectedSize,
        selectedColor: cartItems.selectedColor,
        createdAt: cartItems.createdAt,
        updatedAt: cartItems.updatedAt,
        product: {
          id: products.id,
          name: products.name,
          slug: products.slug,
          price: products.price,
          image: products.image,
          inStock: products.inStock,
        },
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, user.id));
    
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json(
        {
          error: 'User ID cannot be provided in request body',
          code: 'USER_ID_NOT_ALLOWED',
        },
        { status: 400 }
      );
    }
    
    const { productId, quantity, selectedSize, selectedColor } = body;
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required', code: 'MISSING_PRODUCT_ID' },
        { status: 400 }
      );
    }
    
    if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
      return NextResponse.json(
        { error: 'Quantity must be a positive number', code: 'INVALID_QUANTITY' },
        { status: 400 }
      );
    }
    
    if (!selectedSize) {
      return NextResponse.json(
        { error: 'Selected size is required', code: 'MISSING_SELECTED_SIZE' },
        { status: 400 }
      );
    }
    
    if (!selectedColor) {
      return NextResponse.json(
        { error: 'Selected color is required', code: 'MISSING_SELECTED_COLOR' },
        { status: 400 }
      );
    }
    
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);
    
    if (product.length === 0) {
      return NextResponse.json(
        { error: 'Product not found', code: 'PRODUCT_NOT_FOUND' },
        { status: 404 }
      );
    }
    
    const now = new Date().toISOString();
    
    const newCartItem = await db
      .insert(cartItems)
      .values({
        userId: user.id,
        productId,
        quantity,
        selectedSize: selectedSize.trim(),
        selectedColor: selectedColor.trim(),
        createdAt: now,
        updatedAt: now,
      })
      .returning();
    
    return NextResponse.json(newCartItem[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}