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

interface VerifyEmailProps {
  userName: string;
  verifyUrl: string;
}

export const VerifyEmail = ({ userName, verifyUrl }: VerifyEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email — FashionFynds</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading style={heading}>✉️ Verify Your Email</Heading>
            <Text style={paragraph}>Hi {userName},</Text>
            <Text style={paragraph}>
              Thanks for signing up at FashionFynds! Please verify your email
              address by clicking the button below.
            </Text>

            <Button style={button} href={verifyUrl}>
              Verify Email Address
            </Button>

            <Text style={paragraph}>
              If you didn&apos;t create an account, you can safely ignore this
              email.
            </Text>

            <Hr style={hr} />
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
