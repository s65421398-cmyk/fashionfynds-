import {
  Html,
  Body,
  Container,
  Head,
  Hr,
  Heading,
  Section,
  Text,
  Button,
  Preview,
} from "@react-email/components";
import * as React from "react";

interface OrderStatusUpdateEmailProps {
  customerName: string;
  orderNumber: string;
  oldStatus: string;
  newStatus: string;
  message?: string;
}

const statusLabels: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

const statusEmojis: Record<string, string> = {
  confirmed: "✅",
  processing: "📦",
  shipped: "🚚",
  out_for_delivery: "🏍️",
  delivered: "🎉",
  cancelled: "❌",
  refunded: "💰",
};

export const OrderStatusUpdateEmail = ({
  customerName,
  orderNumber,
  oldStatus,
  newStatus,
  message,
}: OrderStatusUpdateEmailProps) => {
  const emoji = statusEmojis[newStatus] || "📋";
  const label = statusLabels[newStatus] || newStatus;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <Html>
      <Head />
      <Preview>
        Order #{orderNumber} — {label}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading style={heading}>
              {emoji} Order Update
            </Heading>
            <Text style={paragraph}>Hi {customerName},</Text>
            <Text style={paragraph}>
              Your order <strong>#{orderNumber}</strong> has been updated.
            </Text>

            <Section style={statusSection}>
              <Text style={statusRow}>
                <strong>Previous Status:</strong>{" "}
                {statusLabels[oldStatus] || oldStatus}
              </Text>
              <Text style={{...statusRow, fontSize: "18px", color: "#1d1c1d"}}>
                <strong>New Status:</strong> {emoji} {label}
              </Text>
            </Section>

            {message && (
              <Section style={messageSection}>
                <Text style={{ ...paragraph, margin: "0" }}>
                  <strong>Note from FashionFynds:</strong>
                </Text>
                <Text style={{ ...paragraph, whiteSpace: "pre-line", margin: "8px 0 0" }}>
                  {message}
                </Text>
              </Section>
            )}

            <Button
              style={button}
              href={`${siteUrl}/account/orders`}
            >
              View Order Details
            </Button>

            <Hr style={hr} />
            <Text style={footer}>
              Need help? Reply to this email or visit our{" "}
              <a href={`${siteUrl}/contact`} style={{ color: "#1BA6A6" }}>
                support page
              </a>
            </Text>
            <Text style={footer}>
              FashionFynds — Discover Your Unique Style
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f6f6",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif',
};
const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};
const box = { padding: "0 48px" };
const heading = {
  color: "#1d1c1d",
  fontSize: "28px",
  fontWeight: "700" as const,
  margin: "24px 0 16px",
  textAlign: "center" as const,
};
const paragraph = {
  color: "#525252",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 0",
};
const statusSection = {
  backgroundColor: "#f0fdf4",
  borderRadius: "8px",
  padding: "16px",
  margin: "24px 0",
  border: "1px solid #bbf7d0",
};
const statusRow = {
  color: "#525252",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "4px 0",
};
const messageSection = {
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  padding: "16px",
  margin: "16px 0",
};
const button = {
  backgroundColor: "#000000",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600" as const,
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "14px 20px",
  margin: "32px 0",
};
const hr = { borderColor: "#e5e5e5", margin: "20px 0" };
const footer = {
  color: "#898989",
  fontSize: "12px",
  lineHeight: "20px",
  textAlign: "center" as const,
  margin: "8px 0",
};
