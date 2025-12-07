import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { brands } from '@/db/schema';
import { eq, like, or } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single brand by ID
    if (id) {
      const brandId = parseInt(id);
      if (isNaN(brandId)) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const brand = await db
        .select()
        .from(brands)
        .where(eq(brands.id, brandId))
        .limit(1);

      if (brand.length === 0) {
        return NextResponse.json(
          { error: 'Brand not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(brand[0], { status: 200 });
    }

    // List brands with pagination and search
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');

    let query = db.select().from(brands);

    if (search) {
      query = query.where(like(brands.name, `%${search}%`));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, logo } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required and must be a non-empty string', code: 'MISSING_REQUIRED_FIELD' },
        { status: 400 }
      );
    }

    // Auto-generate slug from name
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    // Check if slug already exists
    const existingBrand = await db
      .select()
      .from(brands)
      .where(eq(brands.slug, slug))
      .limit(1);

    if (existingBrand.length > 0) {
      return NextResponse.json(
        { error: 'A brand with this name already exists', code: 'DUPLICATE_SLUG' },
        { status: 400 }
      );
    }

    const newBrand = await db
      .insert(brands)
      .values({
        name: name.trim(),
        slug,
        description: description?.trim() || null,
        logo: logo?.trim() || null,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newBrand[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const brandId = parseInt(id);

    // Check if brand exists
    const existingBrand = await db
      .select()
      .from(brands)
      .where(eq(brands.id, brandId))
      .limit(1);

    if (existingBrand.length === 0) {
      return NextResponse.json(
        { error: 'Brand not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, description, logo } = body;

    const updates: any = {};

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim() === '') {
        return NextResponse.json(
          { error: 'Name must be a non-empty string', code: 'INVALID_NAME' },
          { status: 400 }
        );
      }
      updates.name = name.trim();
      
      // Regenerate slug if name changes
      const newSlug = name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      // Check if new slug conflicts with other brands
      if (newSlug !== existingBrand[0].slug) {
        const slugConflict = await db
          .select()
          .from(brands)
          .where(eq(brands.slug, newSlug))
          .limit(1);

        if (slugConflict.length > 0) {
          return NextResponse.json(
            { error: 'A brand with this name already exists', code: 'DUPLICATE_SLUG' },
            { status: 400 }
          );
        }
        updates.slug = newSlug;
      }
    }

    if (description !== undefined) {
      updates.description = description?.trim() || null;
    }

    if (logo !== undefined) {
      updates.logo = logo?.trim() || null;
    }

    const updatedBrand = await db
      .update(brands)
      .set(updates)
      .where(eq(brands.id, brandId))
      .returning();

    return NextResponse.json(updatedBrand[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const brandId = parseInt(id);

    // Check if brand exists
    const existingBrand = await db
      .select()
      .from(brands)
      .where(eq(brands.id, brandId))
      .limit(1);

    if (existingBrand.length === 0) {
      return NextResponse.json(
        { error: 'Brand not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(brands)
      .where(eq(brands.id, brandId))
      .returning();

    return NextResponse.json(
      {
        message: 'Brand deleted successfully',
        brand: deleted[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}