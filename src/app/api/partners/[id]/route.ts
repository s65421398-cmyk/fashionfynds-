import { NextResponse } from 'next/server';
import { db } from '@/db';
import { partnerApplications } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { status } = await req.json();
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    
    await db.update(partnerApplications)
      .set({ status })
      .where(eq(partnerApplications.id, id));
      
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating partner application:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
