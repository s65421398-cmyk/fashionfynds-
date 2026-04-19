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
  Link,
  Preview,
} from "@react-email/components";
import * as React from "react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderConfirmationProps {
  orderNumber: string;
  orderDate: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
}

export const OrderConfirmationEmail = ({
  orderNumber,
  orderDate,
  customerName,
  items,
  totalAmount,
  shippingAddress,
}: OrderConfirmationProps) => {
  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalAmount);

  return (
    <Html>
      <Head />
      <Preview>Order {orderNumber} confirmed - Thank you for your purchase!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading style={heading}>✨ Order Confirmed!</Heading>
            <Text style={paragraph}>
              Hi {customerName},
            </Text>
            <Text style={paragraph}>
              Thank you for your order at FashionFynds! We've received your order and are getting it ready to ship.
            </Text>

            <Section style={orderSection}>
              <Heading as="h2" style={subHeading}>
                Order Details
              </Heading>
              <Text style={{ ...paragraph, fontWeight: "bold", margin: "8px 0" }}>
                Order Number: {orderNumber}
              </Text>
              <Text style={{ ...paragraph, margin: "8px 0" }}>
                Order Date: {orderDate}
              </Text>
            </Section>

            <Section style={itemsSection}>
              <Heading as="h2" style={subHeading}>
                Items Ordered
              </Heading>
              {items.map((item, index) => (
                <Section key={index} style={itemRow}>
                  <Text style={{ margin: 0, flex: 1 }}>
                    {item.name} × {item.quantity}
                  </Text>
                  <Text style={{ margin: 0 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </Section>
              ))}
              <Hr style={hr} />
              <Section style={totalRow}>
                <Text style={{ ...paragraph, fontWeight: "bold", fontSize: "18px" }}>
                  Total: {formattedTotal}
                </Text>
              </Section>
            </Section>

            <Section style={shippingSection}>
              <Heading as="h2" style={subHeading}>
                Shipping Address
              </Heading>
              <Text style={{ ...paragraph, whiteSpace: "pre-line" }}>
                {shippingAddress}
              </Text>
            </Section>

            <Button style={button} href={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/account/orders`}>
              View Order Status
            </Button>

            <Hr style={hr} />
            <Text style={footer}>
              Questions about your order? <Link href="mailto:support@fashionfynds.com" style={link}>Contact us</Link>
            </Text>
            <Text style={footer}>
              FashionFynds - Discover Your Unique Style
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
  fontSize: "32px",
  fontWeight: "700",
  margin: "24px 0 16px",
  textAlign: "center" as const,
};

const subHeading = {
  color: "#1d1c1d",
  fontSize: "18px",
  fontWeight: "600",
  margin: "24px 0 12px",
};

const paragraph = {
  color: "#525252",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 0",
};

const orderSection = {
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  padding: "16px",
  margin: "24px 0",
};

const shippingSection = {
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  padding: "16px",
  margin: "24px 0",
};

const itemsSection = {
  margin: "24px 0",
  border: "1px solid #e5e5e5",
  borderRadius: "8px",
  padding: "16px",
};

const itemRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid #f0f0f0",
};

const totalRow = {
  display: "flex",
  justifyContent: "flex-end",
  padding: "16px 0 0",
};

const hr = {
  borderColor: "#e5e5e5",
  margin: "20px 0",
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
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

const link = {
  color: "#000000",
  textDecoration: "underline",
};
