import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/db";
import { partnerApplications } from "@/db/schema";
import { PartnerApplicationEmail } from "@/components/emails/PartnerApplication";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy123456789");

interface PartnerPayload {
  brandName: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string;
  category: string;
  description: string;
  instagram?: string;
  productsCount?: string;
  established?: string;
}

export async function POST(request: NextRequest) {
  try {
    let payload: PartnerPayload;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const {
      brandName,
      contactName,
      email,
      phone,
      website,
      category,
      description,
      instagram,
      productsCount,
      established,
    } = payload;

    // Validate required fields
    if (!brandName || !contactName || !email || !phone || !category || !description) {
      return NextResponse.json(
        { error: "Missing required fields: brandName, contactName, email, phone, category, description" },
        { status: 400 }
      );
    }

    // 1. Save to database
    const now = new Date().toISOString();
    const inserted = await db
      .insert(partnerApplications)
      .values({
        brandName,
        contactName,
        email,
        phone,
        website: website || null,
        category,
        description,
        instagram: instagram || null,
        productsCount: productsCount || null,
        established: established || null,
        status: "pending",
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    const application = inserted[0];

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
          subject: `🤝 New Partner Application: ${brandName}`,
          react: PartnerApplicationEmail({
            brandName,
            contactName,
            email,
            phone,
            website,
            category,
            description,
            instagram,
            productsCount,
            established,
            applicationId: application.id,
          }),
          replyTo: email, // Reply goes to the applicant
        });

        if (sendError) {
          console.error("[Partner Email Error]", sendError.message);
        } else {
          emailSent = true;
          console.log(
            `[Partner Email] Notification sent to ${adminEmail} for application #${application.id}`
          );
        }
      } catch (emailError) {
        console.error("[Partner Email Error]", emailError);
      }
    } else {
      console.warn(
        "[Partner Email] Skipped — RESEND_API_KEY or admin email not configured"
      );
    }

    return NextResponse.json(
      {
        success: true,
        applicationId: application.id,
        emailSent,
        message: "Partner application submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/partners] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
