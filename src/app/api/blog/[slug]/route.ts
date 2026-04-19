import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Validate slug parameter
    if (!slug) {
      return NextResponse.json(
        { 
          error: 'Slug is required',
          code: 'MISSING_SLUG' 
        },
        { status: 400 }
      );
    }

    if (typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Valid slug is required',
          code: 'INVALID_SLUG' 
        },
        { status: 400 }
      );
    }

    // Query blog post by slug
    const result = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json(
        { 
          error: 'Blog post not found',
          code: 'NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    const post = result[0];

    // Increment view count
    const updatedPost = await db
      .update(blogPosts)
      .set({
        views: (post.views ?? 0) + 1,
        updatedAt: new Date().toISOString()
      })
      .where(eq(blogPosts.slug, slug))
      .returning();

    // Return the blog post with updated view count
    return NextResponse.json(updatedPost[0], { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}