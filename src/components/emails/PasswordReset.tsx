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

interface PasswordResetEmailProps {
  userName: string;
  resetUrl: string;
}

export const PasswordResetEmail = ({
  userName,
  resetUrl,
}: PasswordResetEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your FashionFynds password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading style={heading}>🔐 Password Reset</Heading>
            <Text style={paragraph}>Hi {userName},</Text>
            <Text style={paragraph}>
              We received a request to reset your password. Click the button
              below to choose a new password. This link expires in 1 hour.
            </Text>

            <Button style={button} href={resetUrl}>
              Reset Password
            </Button>

            <Text style={paragraph}>
              If you didn&apos;t request this, you can safely ignore this email.
              Your password will remain unchanged.
            </Text>

            <Hr style={hr} />
            <Text style={footer}>
              For security, this link will expire in 1 hour.
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
