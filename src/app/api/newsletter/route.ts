import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    let body: { email: string; source?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { email, source } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email.toLowerCase().trim()))
      .limit(1);

    if (existing.length > 0) {
      // If previously unsubscribed, reactivate
      if (!existing[0].active) {
        await db
          .update(newsletterSubscribers)
          .set({ active: true })
          .where(eq(newsletterSubscribers.id, existing[0].id));

        return NextResponse.json(
          { success: true, message: "Welcome back! Your subscription has been reactivated." },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { success: true, message: "You're already subscribed!" },
        { status: 200 }
      );
    }

    // Insert new subscriber
    await db.insert(newsletterSubscribers).values({
      email: email.toLowerCase().trim(),
      source: source || "footer",
      active: true,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Successfully subscribed to the newsletter!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/newsletter] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
