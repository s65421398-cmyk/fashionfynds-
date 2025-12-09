import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Text,
  Button,
  Hr,
  Preview,
} from '@react-email/components';

interface OrderConfirmationEmailProps {
  orderNumber: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: string;
}

export const OrderConfirmationEmail = ({
  orderNumber,
  customerName,
  orderDate,
  totalAmount,
  items,
  shippingAddress,
}: OrderConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Your FashionFynds order {orderNumber} has been confirmed</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={headerSection}>
          <Text style={logo}>FashionFynds</Text>
        </Section>

        {/* Main Content */}
        <Section style={contentSection}>
          <Text style={heading}>Order Confirmed! 🎉</Text>
          <Text style={paragraph}>
            Hi {customerName},
          </Text>
          <Text style={paragraph}>
            Thank you for your order! We're processing it now and will send tracking information as soon as your items ship.
          </Text>

          {/* Order Details */}
          <Section style={orderDetails}>
            <Row style={detailsRow}>
              <Column style={detailsColumn}>
                <Text style={label}>Order Number</Text>
                <Text style={value}>{orderNumber}</Text>
              </Column>
              <Column style={detailsColumn}>
                <Text style={label}>Order Date</Text>
                <Text style={value}>{orderDate}</Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={label}>Shipping Address</Text>
                <Text style={value}>{shippingAddress}</Text>
              </Column>
            </Row>
          </Section>

          {/* Items Table */}
          <Section style={itemsSection}>
            <Text style={sectionHeading}>Order Items</Text>
            {items.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column style={itemColumn}>
                  <Text style={itemName}>{item.name}</Text>
                </Column>
                <Column style={quantityColumn}>
                  <Text style={itemText}>Qty: {item.quantity}</Text>
                </Column>
                <Column style={priceColumn}>
                  <Text style={itemText}>${(item.price * item.quantity).toFixed(2)}</Text>
                </Column>
              </Row>
            ))}
            <Hr style={divider} />
            <Row style={totalRow}>
              <Column></Column>
              <Column style={totalColumn}>
                <Text style={totalLabel}>Total</Text>
                <Text style={totalValue}>${totalAmount.toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>

          {/* CTA Button */}
          <Section style={buttonSection}>
            <Button style={button} href={`${process.env.NEXT_PUBLIC_APP_URL || 'https://fashionfynds.com'}/account/orders`}>
              View Order Details
            </Button>
          </Section>

          {/* Footer */}
          <Hr style={divider} />
          <Text style={paragraph}>
            If you have any questions, please contact our support team at support@fashionfynds.com
          </Text>
          <Text style={footer}>
            © 2025 FashionFynds. All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

// Styles
const main = {
  backgroundColor: '#f4f4f4',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0',
  marginBottom: '64px',
};

const headerSection = {
  padding: '32px 0',
  borderBottom: '1px solid #efefef',
  textAlign: 'center' as const,
};

const logo = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#000',
  margin: '0',
};

const contentSection = {
  padding: '32px 20px',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#1f2937',
  margin: '0 0 16px 0',
};

const paragraph = {
  fontSize: '14px',
  color: '#4b5563',
  lineHeight: '24px',
  margin: '12px 0',
};

const orderDetails = {
  backgroundColor: '#f9fafb',
  padding: '16px',
  borderRadius: '6px',
  marginBottom: '24px',
};

const detailsRow = {
  marginBottom: '12px',
};

const detailsColumn = {
  paddingRight: '24px',
};

const label = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#6b7280',
  textTransform: 'uppercase' as const,
  margin: '0 0 4px 0',
  letterSpacing: '0.5px',
};

const value = {
  fontSize: '16px',
  fontWeight: '500',
  color: '#1f2937',
  margin: '0',
};

const itemsSection = {
  marginBottom: '24px',
};

const sectionHeading = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 12px 0',
};

const itemRow = {
  borderBottom: '1px solid #e5e7eb',
  paddingBottom: '12px',
  marginBottom: '12px',
};

const itemColumn = {
  paddingRight: '12px',
  width: '60%',
};

const itemName = {
  fontSize: '14px',
  color: '#1f2937',
  margin: '0',
  fontWeight: '500',
};

const quantityColumn = {
  width: '20%',
  textAlign: 'center' as const,
};

const priceColumn = {
  width: '20%',
  textAlign: 'right' as const,
};

const itemText = {
  fontSize: '14px',
  color: '#4b5563',
  margin: '0',
};

const divider = {
  borderTop: '1px solid #efefef',
  margin: '16px 0',
};

const totalRow = {
  marginTop: '12px',
};

const totalColumn = {
  textAlign: 'right' as const,
  paddingRight: '0',
};

const totalLabel = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0',
};

const totalValue = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#1f2937',
  margin: '4px 0 0 0',
};

const buttonSection = {
  margin: '32px 0',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#000',
  color: '#fff',
  padding: '12px 32px',
  textDecoration: 'none',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '600',
  display: 'inline-block',
};

const footer = {
  fontSize: '12px',
  color: '#9ca3af',
  margin: '16px 0 0 0',
  textAlign: 'center' as const,
};
