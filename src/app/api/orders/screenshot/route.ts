import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('screenshot') as File | null;
    const orderId = formData.get('orderId');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Only JPG, PNG, WebP, or GIF allowed' }, { status: 400 });
    }
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: 'File too large (max 5 MB)' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    // If orderId provided, save directly to the order
    if (orderId) {
      const id = parseInt(orderId as string);
      const existing = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
      if (!existing[0] || existing[0].userId !== session.user.id) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      await db.update(orders)
        .set({ paymentScreenshot: dataUrl, updatedAt: new Date().toISOString() })
        .where(eq(orders.id, id));
    }

    return NextResponse.json({ dataUrl }, { status: 200 });
  } catch (error) {
    console.error('Screenshot upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
