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

interface PartnerApplicationEmailProps {
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
  applicationId: number;
}

export const PartnerApplicationEmail = ({
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
  applicationId,
}: PartnerApplicationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Partner Application from {brandName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading style={heading}>🤝 New Partner Application</Heading>
            <Text style={paragraph}>
              A new brand has applied to partner with FashionFynds. Here are the details:
            </Text>

            <Section style={detailsSection}>
              <Heading as="h2" style={subHeading}>
                Brand Information
              </Heading>
              <Text style={detailRow}>
                <strong>Brand Name:</strong> {brandName}
              </Text>
              <Text style={detailRow}>
                <strong>Category:</strong> {category}
              </Text>
              {established && (
                <Text style={detailRow}>
                  <strong>Established:</strong> {established}
                </Text>
              )}
              {productsCount && (
                <Text style={detailRow}>
                  <strong>Number of Products:</strong> {productsCount}
                </Text>
              )}
            </Section>

            <Section style={detailsSection}>
              <Heading as="h2" style={subHeading}>
                Contact Details
              </Heading>
              <Text style={detailRow}>
                <strong>Contact Person:</strong> {contactName}
              </Text>
              <Text style={detailRow}>
                <strong>Email:</strong> {email}
              </Text>
              <Text style={detailRow}>
                <strong>Phone:</strong> {phone}
              </Text>
              {website && (
                <Text style={detailRow}>
                  <strong>Website:</strong> {website}
                </Text>
              )}
              {instagram && (
                <Text style={detailRow}>
                  <strong>Instagram:</strong> {instagram}
                </Text>
              )}
            </Section>

            <Section style={descriptionSection}>
              <Heading as="h2" style={subHeading}>
                Brand Description
              </Heading>
              <Text style={{ ...paragraph, whiteSpace: "pre-line" }}>
                {description}
              </Text>
            </Section>

            <Button
              style={button}
              href={`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/partners`}
            >
              Review in Admin Panel
            </Button>

            <Hr style={hr} />
            <Text style={footer}>
              Application ID: #{applicationId} • Received on{" "}
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Text>
            <Text style={footer}>
              FashionFynds Partner Management System
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
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

const box = {
  padding: "0 48px",
};

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

const descriptionSection = {
  border: "1px solid #e5e5e5",
  borderRadius: "8px",
  padding: "16px",
  margin: "16px 0",
};

const hr = {
  borderColor: "#e5e5e5",
  margin: "20px 0",
};

const button = {
  backgroundColor: "#7c3aed",
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

const footer = {
  color: "#898989",
  fontSize: "12px",
  lineHeight: "20px",
  textAlign: "center" as const,
  margin: "8px 0",
};
