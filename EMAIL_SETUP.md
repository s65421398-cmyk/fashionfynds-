# Email Service Setup Guide

This guide will help you set up order confirmation emails for FashionFynds using Resend.

## Quick Setup (5 minutes)

### 1. Get Resend API Key

1. Go to [https://resend.com](https://resend.com) and sign up (free account available)
2. Click **"API Keys"** in the left sidebar
3. Click **"Create API Key"** button
4. Name your key (e.g., "FashionFynds Production" or "Development")
5. Copy the API key that starts with `re_`

### 2. Configure Environment Variables

Add these variables to your `.env` file:

```env
# REQUIRED: Your Resend API key
RESEND_API_KEY=re_your_actual_api_key_here

# OPTIONAL: For testing, use the default below
# For production, add your verified domain in Resend dashboard
RESEND_FROM_EMAIL=FashionFynds <onboarding@resend.dev>

# OPTIONAL: Support email for replies
RESEND_REPLY_TO=support@fashionfynds.com

# OPTIONAL: For email links
NEXT_PUBLIC_APP_URL=https://fashionfynds.com
```

### 3. Test Email (Development)

For development testing, use Resend's test email addresses:

- **Send to:** `delivered@resend.dev` - This will deliver successfully in test mode
- **From:** `onboarding@resend.dev` - Pre-verified sender for testing

Example test with curl:

```bash
curl -X POST http://localhost:3000/api/emails/send-order-confirmation \
  -H "Content-Type: application/json" \
  -d '{
    "email": "delivered@resend.dev",
    "orderNumber": "TEST-12345",
    "customerName": "Test Customer",
    "orderDate": "December 9, 2025",
    "totalAmount": 99.99,
    "items": [
      {
        "name": "Test Product",
        "quantity": 1,
        "price": 99.99
      }
    ],
    "shippingAddress": "123 Test St, Test City, TS 12345"
  }'
```

## Production Setup

### 1. Verify Your Domain (Recommended)

For production, verify your domain to send from your own email address:

1. Go to [https://resend.com/domains](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter your domain (e.g., `fashionfynds.com`)
4. Add the provided DNS records to your domain registrar:
   - SPF record
   - DKIM records
   - DMARC record (optional but recommended)
5. Wait for verification (usually 5-10 minutes)

### 2. Update Environment Variables

```env
RESEND_FROM_EMAIL=FashionFynds <orders@fashionfynds.com>
RESEND_REPLY_TO=support@fashionfynds.com
NEXT_PUBLIC_APP_URL=https://fashionfynds.com
```

### 3. Test Real Orders

Place a test order through your checkout flow with a real email address to verify the integration works end-to-end.

## Email Features

### Current Implementation

✅ **Order Confirmation Email** - Sent automatically after checkout
- Professional branded template
- Order details with item breakdown
- Shipping address
- Total amount
- "View Order Details" button linking to account page

### Email Template Preview

The order confirmation email includes:
- FashionFynds branding
- Order number and date
- Customer name
- Itemized list with quantities and prices
- Shipping address
- Total amount
- Call-to-action button to view order
- Support contact information

## Customization

### Modify Email Template

Edit `src/emails/OrderConfirmation.tsx` to customize:
- Logo and branding
- Colors and styling
- Layout and sections
- Content and messaging

### Add New Email Types

Create new templates in `src/emails/` folder:
- Shipping notifications
- Order updates
- Welcome emails
- Password reset

Example structure:
```typescript
// src/emails/ShippingNotification.tsx
export const ShippingNotificationEmail = ({ trackingNumber, ... }) => (
  <Html>
    {/* Your email template */}
  </Html>
);

// src/app/api/emails/send-shipping-notification/route.ts
export async function POST(request: NextRequest) {
  // Render and send email
}
```

## Monitoring & Analytics

### Track Email Sends

Resend provides:
- Delivery status
- Open rates (if tracking enabled)
- Click rates
- Bounce tracking

Access at: [https://resend.com/emails](https://resend.com/emails)

### Email Tags

Emails are tagged with `order-confirmation` for easy filtering in the Resend dashboard.

## Troubleshooting

### Email Not Sending

**Check console logs** - The checkout modal logs email results:
```javascript
console.log('Order confirmation email sent:', { messageId, orderNumber, recipient });
// or
console.warn('Order confirmation email failed:', error);
```

**Common Issues:**

1. **503 Error - "Email service not configured"**
   - Missing `RESEND_API_KEY` in `.env` file
   - Solution: Add your Resend API key

2. **401 Error - Unauthorized**
   - Invalid API key
   - Solution: Generate new key from Resend dashboard

3. **422 Error - Validation failed**
   - Missing required fields (email, orderNumber, customerName)
   - Solution: Check checkout form data

4. **429 Error - Rate limit exceeded**
   - Too many emails sent (free tier limits)
   - Solution: Wait or upgrade Resend plan

5. **Email delivers but from wrong address**
   - Using default `onboarding@resend.dev` in production
   - Solution: Verify your domain in Resend

### Testing Without Sending

To test checkout without sending real emails, temporarily comment out the email sending code:

```typescript
// In src/components/CheckoutModal.tsx, comment out:
/*
try {
  const emailResponse = await fetch('/api/emails/send-order-confirmation', {
    // ...
  });
} catch (emailError) {
  // ...
}
*/
```

## Rate Limits

**Resend Free Tier:**
- 100 emails per day
- 3,000 emails per month

**Paid Plans:** Higher limits available

For high-volume stores, consider implementing email queuing.

## Next Steps

After basic email setup:

1. ✅ **Verify domain** for production emails
2. ✅ **Add shipping notifications** when orders ship
3. ✅ **Create password reset emails** for account recovery
4. ✅ **Add welcome emails** for new registrations
5. ✅ **Implement email preferences** for customers to opt-in/out

## Resources

- **Resend Documentation:** [https://resend.com/docs](https://resend.com/docs)
- **React Email Components:** [https://react.email/docs/components](https://react.email/docs/components)
- **Email Testing:** Use `delivered@resend.dev` for dev testing
- **Support:** [https://resend.com/support](https://resend.com/support)

---

**Need Help?** Check the Resend dashboard logs or contact support through the Resend platform.
