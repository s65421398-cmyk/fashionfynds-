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

interface WelcomeEmailProps {
  userName: string;
}

export const WelcomeEmail = ({ userName }: WelcomeEmailProps) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <Html>
      <Head />
      <Preview>Welcome to FashionFynds, {userName}! 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading style={heading}>🎉 Welcome to FashionFynds!</Heading>
            <Text style={paragraph}>Hi {userName},</Text>
            <Text style={paragraph}>
              Thank you for joining FashionFynds! We&apos;re thrilled to have
              you as part of our fashion community. Here&apos;s what you can do:
            </Text>

            <Section style={featureSection}>
              <Text style={featureItem}>
                🛍️ <strong>Browse curated collections</strong> from top Indian
                and international brands
              </Text>
              <Text style={featureItem}>
                ❤️ <strong>Create wishlists</strong> to save your favourite
                pieces
              </Text>
              <Text style={featureItem}>
                🚚 <strong>Track orders</strong> in real-time from your
                dashboard
              </Text>
              <Text style={featureItem}>
                💎 <strong>Get exclusive deals</strong> and early access to
                sales
              </Text>
            </Section>

            <Button style={button} href={`${siteUrl}/explore`}>
              Start Shopping
            </Button>

            <Hr style={hr} />
            <Text style={footer}>
              Questions? Reply to this email or visit our{" "}
              <a href={`${siteUrl}/faq`} style={{ color: "#1BA6A6" }}>
                FAQ
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
const featureSection = {
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  padding: "16px",
  margin: "24px 0",
};
const featureItem = {
  color: "#525252",
  fontSize: "14px",
  lineHeight: "28px",
  margin: "4px 0",
};
const button = {
  backgroundColor: "#1BA6A6",
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
