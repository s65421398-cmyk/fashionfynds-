import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { partnerApplications } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

async function requireAdmin(): Promise<NextResponse | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user)
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  if (
    ADMIN_EMAILS.length > 0 &&
    !ADMIN_EMAILS.includes(session.user.email)
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}

// GET all partner applications (admin only)
export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const allApplications = await db
      .select()
      .from(partnerApplications)
      .orderBy(desc(partnerApplications.createdAt));

    return NextResponse.json(allApplications, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/partners error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT — update status and/or admin notes
export async function PUT(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: "Valid application ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status, adminNotes } = body;

    const validStatuses = ["pending", "approved", "rejected"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error:
            "Invalid status. Must be one of: " + validStatuses.join(", "),
        },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    };

    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    const updated = await db
      .update(partnerApplications)
      .set(updateData)
      .where(eq(partnerApplications.id, parseInt(id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error("PUT /api/admin/partners error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
