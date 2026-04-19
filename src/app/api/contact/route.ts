import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { ContactMessageEmail } from "@/components/emails/ContactMessage";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy123456789");

export async function POST(request: NextRequest) {
  try {
    let body: { name: string; email: string; subject: string; message: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required: name, email, subject, message" },
        { status: 400 }
      );
    }

    // 1. Save to database
    const inserted = await db
      .insert(contactMessages)
      .values({
        name,
        email,
        subject,
        message,
        status: "unread",
        createdAt: new Date().toISOString(),
      })
      .returning();

    const msg = inserted[0];

    // 2. Send email notification to admin
    let emailSent = false;
    const adminEmail =
      process.env.ADMIN_NOTIFICATION_EMAIL ||
      (process.env.ADMIN_EMAILS ?? "").split(",").map((s) => s.trim()).filter(Boolean)[0];

    if (process.env.RESEND_API_KEY && adminEmail) {
      try {
        const { error: sendError } = await resend.emails.send({
          from:
            process.env.RESEND_FROM_EMAIL ||
            "FashionFynds <onboarding@resend.dev>",
          to: adminEmail,
          subject: `📩 Contact: ${subject}`,
          react: ContactMessageEmail({
            name,
            email,
            subject,
            message,
            messageId: msg.id,
          }),
          replyTo: email,
        });

        if (sendError) {
          console.error("[Contact Email Error]", sendError.message);
        } else {
          emailSent = true;
        }
      } catch (emailError) {
        console.error("[Contact Email Error]", emailError);
      }
    }

    return NextResponse.json(
      { success: true, messageId: msg.id, emailSent },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/contact] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
