import {
  Html,
  Body,
  Container,
  Head,
  Hr,
  Heading,
  Section,
  Text,
  Preview,
} from "@react-email/components";
import * as React from "react";

interface ContactMessageEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  messageId: number;
}

export const ContactMessageEmail = ({
  name,
  email,
  subject,
  message,
  messageId,
}: ContactMessageEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Contact Message: {subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading style={heading}>📩 New Contact Message</Heading>
            <Text style={paragraph}>
              You received a new message from the FashionFynds contact form.
            </Text>

            <Section style={detailsSection}>
              <Heading as="h2" style={subHeading}>
                Sender Details
              </Heading>
              <Text style={detailRow}>
                <strong>Name:</strong> {name}
              </Text>
              <Text style={detailRow}>
                <strong>Email:</strong> {email}
              </Text>
              <Text style={detailRow}>
                <strong>Subject:</strong> {subject}
              </Text>
            </Section>

            <Section style={messageSection}>
              <Heading as="h2" style={subHeading}>
                Message
              </Heading>
              <Text style={{ ...paragraph, whiteSpace: "pre-line" }}>
                {message}
              </Text>
            </Section>

            <Hr style={hr} />
            <Text style={footer}>
              Message ID: #{messageId} • Reply directly to {email}
            </Text>
            <Text style={footer}>FashionFynds Contact System</Text>
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

const subHeading = {
  color: "#1d1c1d",
  fontSize: "16px",
  fontWeight: "600" as const,
  margin: "0 0 12px",
};

const paragraph = {
  color: "#525252",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 0",
};

const detailRow = {
  color: "#525252",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "4px 0",
};

const detailsSection = {
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  padding: "16px",
  margin: "16px 0",
};

const messageSection = {
  border: "1px solid #e5e5e5",
  borderRadius: "8px",
  padding: "16px",
  margin: "16px 0",
};

const hr = { borderColor: "#e5e5e5", margin: "20px 0" };

const footer = {
  color: "#898989",
  fontSize: "12px",
  lineHeight: "20px",
  textAlign: "center" as const,
  margin: "8px 0",
};
