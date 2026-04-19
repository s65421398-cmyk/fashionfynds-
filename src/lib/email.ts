import { Resend } from "resend";
import { PasswordResetEmail } from "@/components/emails/PasswordReset";
import { VerifyEmail } from "@/components/emails/VerifyEmail";
import { WelcomeEmail } from "@/components/emails/WelcomeEmail";
import { OrderStatusUpdateEmail } from "@/components/emails/OrderStatusUpdate";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy123456789");
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "FashionFynds <onboarding@resend.dev>";

export async function sendPasswordResetEmail(email: string, userName: string, resetUrl: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Reset your FashionFynds password",
      react: PasswordResetEmail({ userName, resetUrl }),
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
}

export async function sendVerificationEmail(email: string, userName: string, verifyUrl: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Verify your email address — FashionFynds",
      react: VerifyEmail({ userName, verifyUrl }),
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}

export async function sendWelcomeEmail(email: string, userName: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Welcome to FashionFynds! 🎉",
      react: WelcomeEmail({ userName }),
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}

export async function sendOrderStatusEmail(
  email: string,
  customerName: string,
  orderNumber: string,
  oldStatus: string,
  newStatus: string,
  message?: string
) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Order #${orderNumber} Update`,
      react: OrderStatusUpdateEmail({
        customerName,
        orderNumber,
        oldStatus,
        newStatus,
        message,
      }),
    });
  } catch (error) {
    console.error("Error sending order status email:", error);
  }
}
