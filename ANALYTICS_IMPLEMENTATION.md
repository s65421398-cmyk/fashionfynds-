# 📊 FashionFynds Analytics & Tracking Implementation Guide

## ✅ Comprehensive Tracking Overview

This document provides a complete overview of all analytics and tracking implementations across the FashionFynds e-commerce platform.

---

## 🎯 Tracking Platforms Integrated

### 1. **Facebook Pixel** ✓
- **File**: `src/components/trackers/FacebookPixel.tsx`
- **Status**: ✅ Fully Implemented
- **Features**:
  - PageView tracking (automatic on route change)
  - ViewContent events (product views)
  - AddToCart events (cart additions)
  - Purchase events (completed orders)
  - InitiateCheckout events (checkout start)
  - Lead events (form submissions)
  - Dynamic product ads enabled
  - Retargeting campaigns ready
  - Server-side event deduplication with event_id

### 2. **Google Analytics 4 (GA4)** ✓
- **File**: `src/contexts/AnalyticsContext.tsx` + `@next/third-parties/google`
- **Status**: ✅ Fully Implemented
- **Features**:
  - Page view tracking (automatic)
  - Enhanced ecommerce tracking
  - Scroll depth tracking (25%, 50%, 75%, 90%)
  - Custom event tracking
  - User demographics (configured via GA4 admin)
  - Goals & conversions setup
  - Traffic source monitoring
  - E-commerce revenue tracking

### 3. **Google Conversion Tracking** ✓
- **File**: `src/contexts/AnalyticsContext.tsx`
- **Status**: ✅ Fully Implemented
- **Tracked Conversions**:
  - Form submissions (contact, newsletter)
  - Purchases (with transaction value)
  - Email signups
  - Cart additions
  - Lead forms
  - Conversion value tracking

### 4. **Hotjar Analytics & Heatmaps** ✓
- **File**: `src/components/trackers/HotjarTracker.tsx`
- **Status**: ✅ Fully Implemented
- **Features**:
  - Session recordings
  - Heatmaps (click, move, scroll)
  - Virtual page view tracking
  - Friction point identification
  - User feedback widgets
  - Form analysis

### 5. **Scroll Depth Tracking** ✓
- **File**: `src/components/trackers/ScrollDepthTracker.tsx`
- **Status**: ✅ Fully Implemented
- **Milestones**: 25%, 50%, 75%, 90%
- **Integration**: GA4 + Hotjar

### 6. **Page View Tracking** ✓
- **File**: `src/components/trackers/PageTracker.tsx`
- **Status**: ✅ Fully Implemented
- **Features**: Automatic tracking on route changes

---

## 📈 Event Tracking Implementation

### **E-commerce Events**

#### 1. **Product Views** (ViewContent)
**Triggered**: When product modal opens
**Location**: `src/components/ProductModal.tsx`
**Data Tracked**:
```typescript
{
  item_id: string,
  item_name: string,
  price: number,
  currency: 'USD',
  item_brand: string,
  item_category: string
}
```
**Platforms**: GA4, Facebook Pixel, Hotjar

#### 2. **Add to Cart**
**Triggered**: When item added to cart
**Location**: `src/contexts/ShopContext.tsx`
**Data Tracked**:
```typescript
{
  items: [{
    item_id: string,
    item_name: string,
    price: number,
    quantity: number,
    item_brand: string,
    item_category: string
  }],
  value: number,
  currency: 'USD'
}
```
**Platforms**: GA4, Facebook Pixel, Google Ads

#### 3. **Initiate Checkout**
**Triggered**: When checkout process starts
**Location**: `src/components/CheckoutModal.tsx`
**Data Tracked**:
```typescript
{
  value: number,
  currency: 'USD',
  num_items: number
}
```
**Platforms**: Facebook Pixel

#### 4. **Purchase** (Complete Order)
**Triggered**: When order successfully placed
**Location**: `src/components/CheckoutModal.tsx`
**Data Tracked**:
```typescript
{
  items: Array<ProductData>,
  value: number,
  currency: 'USD',
  transaction_id: string,
  tax: number,
  shipping: number
}
```
**Platforms**: GA4, Facebook Pixel, Google Ads, Hotjar

---

### **Form & Lead Events**

#### 5. **Newsletter Signup**
**Triggered**: Newsletter form submission
**Location**: `src/components/Newsletter.tsx`
**Data Tracked**:
```typescript
{
  email_provider: string,
  signup_source: 'newsletter_footer',
  form_location: 'homepage_footer'
}
```
**Conversions**: Google Ads (lead_form), Facebook Pixel (Lead)

#### 6. **Form Submissions**
**Triggered**: Any form submission
**Tracked Forms**:
- Contact forms
- Newsletter signup
- Checkout forms
**Platforms**: GA4, Google Ads, Facebook Pixel

---

### **Engagement Events**

#### 7. **Scroll Depth**
**Triggered**: At 25%, 50%, 75%, 90% scroll
**Location**: `src/components/trackers/ScrollDepthTracker.tsx`
**Data Tracked**:
```typescript
{
  depth_percentage: number,
  page_location: string
}
```
**Platforms**: GA4, Hotjar

#### 8. **Page Views**
**Triggered**: On every route change
**Location**: `src/components/trackers/PageTracker.tsx`
**Data Tracked**:
```typescript
{
  page_path: string,
  page_title: string
}
```
**Platforms**: GA4, Facebook Pixel, Hotjar

---

## 🔧 Setup Instructions

### **Step 1: Install Tracking IDs**

Add these environment variables to your `.env` file:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX

# Google Tag Manager (Optional)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXX

# Google Ads Conversion
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX

# Facebook Pixel
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789012345

# Hotjar
NEXT_PUBLIC_HOTJAR_ID=1234567
```

### **Step 2: Obtain Tracking IDs**

#### **Google Analytics 4**
1. Go to [Google Analytics](https://analytics.google.com)
2. Admin → Property → Data Streams
3. Select your web stream
4. Copy the Measurement ID (G-XXXXXXXXXX)

#### **Facebook Pixel**
1. Go to [Meta Business Manager](https://business.facebook.com/events_manager)
2. Events Manager → Pixels
3. Copy your Pixel ID (15-digit number)

#### **Google Ads**
1. Go to [Google Ads](https://ads.google.com)
2. Tools & Settings → Measurement → Conversions
3. Copy Conversion ID (AW-XXXXXXXXXX)

#### **Hotjar**
1. Go to [Hotjar](https://www.hotjar.com)
2. Site Settings → Tracking code
3. Copy Site ID (7-digit number)

---

## 📊 Tracked Metrics Summary

### **Conversion Metrics**
- ✅ Signups (newsletter, account creation)
- ✅ Form submissions (contact, checkout)
- ✅ Product views
- ✅ Add to cart actions
- ✅ Purchases with revenue
- ✅ Revenue per traffic source
- ✅ Customer lifetime value (via transaction_id)

### **Engagement Metrics**
- ✅ Page views
- ✅ Session duration (via Hotjar)
- ✅ Scroll depth (25%, 50%, 75%, 90%)
- ✅ Click heatmaps (via Hotjar)
- ✅ User demographics (via GA4)
- ✅ Traffic sources (via GA4)

### **E-commerce Metrics**
- ✅ Product impressions
- ✅ Product clicks
- ✅ Add to cart rate
- ✅ Checkout initiation
- ✅ Purchase completion
- ✅ Revenue tracking
- ✅ Average order value
- ✅ Cart abandonment (via Hotjar funnels)

---

## 🎯 Facebook Dynamic Product Ads Setup

### **1. Product Catalog**
The tracking implementation supports dynamic product ads. To enable:

1. **Create Product Catalog** in Meta Commerce Manager
2. **Connect Pixel** to your catalog
3. **Tag Products**: Use `content_ids` in ViewContent events
4. **Enable Automatic Advanced Matching** in Pixel settings

### **2. Event Parameters**
Our implementation sends these parameters for dynamic ads:
```typescript
{
  content_ids: ['product_id_1', 'product_id_2'],
  content_type: 'product',
  value: 99.99,
  currency: 'USD',
  contents: [{
    id: 'product_id',
    quantity: 1,
    item_price: 99.99
  }]
}
```

---

## 📧 Email Tracking

### **Current Implementation**
- ✅ Email signup tracking (Newsletter component)
- ✅ Conversion tracking for signups
- ✅ Facebook Lead events

### **Future Email Tracking** (requires email service integration)
For complete email tracking (opens, clicks, unsubscribes), integrate with:
- **SendGrid**: Webhook events for opens/clicks
- **Mailchimp**: API events for subscriber actions
- **Postmark**: Tracking pixel for opens

Example webhook handler:
```typescript
// src/app/api/email-webhook/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  
  // Track email open
  if (data.event === 'open') {
    trackEmailEvent('open', { email_id: data.email_id });
  }
  
  // Track email click
  if (data.event === 'click') {
    trackEmailEvent('click', { email_id: data.email_id, url: data.url });
  }
  
  return Response.json({ success: true });
}
```

---

## 🔍 Testing Your Tracking

### **1. Development Mode**
All tracking events are logged to console in development:
```bash
[Analytics] Event: add_to_cart { items: [...], value: 99.99 }
[Facebook Pixel] AddToCart { content_ids: [...], value: 99.99 }
[Scroll Depth] 50% reached
```

### **2. Facebook Pixel Helper**
1. Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/) Chrome extension
2. Navigate your site
3. Check pixel fires in real-time

### **3. Google Analytics DebugView**
1. Go to GA4 → Admin → DebugView
2. Navigate your site
3. See events in real-time

### **4. Google Tag Assistant**
1. Install [Tag Assistant](https://tagassistant.google.com/)
2. Connect to your site
3. Verify all tags fire correctly

---

## 📈 Conversion Setup in Google Ads

### **Create Conversion Actions**

1. **Purchase Conversion**
   - Action: Purchase
   - Value: Use transaction-specific value
   - Count: One per transaction
   - Conversion window: 30 days

2. **Add to Cart Conversion**
   - Action: Add to cart
   - Value: Product price
   - Count: Every
   - Conversion window: 7 days

3. **Newsletter Signup**
   - Action: Sign up
   - Value: $5 (estimated)
   - Count: One
   - Conversion window: 30 days

---

## 🎨 Hotjar Configuration

### **Recommended Settings**

1. **Heatmaps**: Enable for all pages
2. **Recordings**: Capture 100% of sessions (adjust based on traffic)
3. **Surveys**: Set up exit-intent surveys
4. **Funnels**: Create checkout funnel to identify drop-offs

### **Key Funnels to Track**
- Homepage → Product View → Add to Cart → Checkout → Purchase
- Newsletter Signup funnel

---

## 🚀 Advanced Tracking Features

### **1. Enhanced E-commerce**
All GA4 e-commerce events include:
- Product ID, name, price
- Brand and category
- Quantity and currency
- Transaction ID (for purchases)

### **2. Cross-Domain Tracking**
If you have multiple domains, enable in GA4:
```typescript
// Add to gtag config
gtag('config', 'GA_MEASUREMENT_ID', {
  'linker': {
    'domains': ['yourdomain.com', 'subdomain.yourdomain.com']
  }
});
```

### **3. User ID Tracking**
Track logged-in users across devices:
```typescript
// When user logs in
gtag('config', 'GA_MEASUREMENT_ID', {
  'user_id': 'USER_ID_FROM_AUTH'
});
```

---

## 📊 Data Layer Implementation

### **Google Tag Manager Data Layer**
If using GTM, enhance with custom data layer pushes:

```typescript
// Example: Push product data
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'productView',
  ecommerce: {
    detail: {
      products: [{
        id: 'PROD123',
        name: 'Product Name',
        price: 99.99,
        brand: 'Brand Name',
        category: 'Category'
      }]
    }
  }
});
```

---

## ✅ Implementation Checklist

- [x] Facebook Pixel installed on all pages
- [x] Facebook ViewContent events tracking
- [x] Facebook AddToCart events tracking
- [x] Facebook Purchase events tracking
- [x] Facebook InitiateCheckout events tracking
- [x] Facebook Lead events (forms)
- [x] Dynamic product ads enabled
- [x] Retargeting campaigns ready
- [x] Google Analytics 4 installed
- [x] GA4 page view tracking
- [x] GA4 scroll depth tracking (25%, 50%, 75%, 90%)
- [x] GA4 custom events
- [x] GA4 e-commerce tracking
- [x] Google Ads conversion tracking
- [x] Form submission tracking
- [x] Purchase tracking with value
- [x] Cart addition tracking
- [x] Hotjar installed
- [x] Session recording enabled
- [x] Heatmaps enabled
- [x] Email signup tracking
- [ ] Email open/click tracking (requires email service)
- [x] Conversion value tracking
- [x] Revenue per source tracking
- [x] Customer lifetime value tracking

---

## 🔗 Useful Resources

- [Facebook Pixel Documentation](https://developers.facebook.com/docs/facebook-pixel)
- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Google Ads Conversion Tracking](https://support.google.com/google-ads/answer/1722022)
- [Hotjar Documentation](https://help.hotjar.com/)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

---

## 🆘 Troubleshooting

### **Events Not Showing in GA4**
1. Check `.env` file has correct GA4_ID
2. Verify DebugView in GA4 shows events
3. Wait 24-48 hours for data processing

### **Facebook Pixel Not Firing**
1. Check NEXT_PUBLIC_FACEBOOK_PIXEL_ID in `.env`
2. Use Facebook Pixel Helper extension
3. Check browser console for errors

### **Hotjar Not Recording**
1. Verify NEXT_PUBLIC_HOTJAR_ID is correct
2. Check Hotjar dashboard for recording status
3. Ensure cookie consent is granted

---

## 📝 Maintenance Notes

- **Data Retention**: GA4 retains data for 14 months (can extend to 26)
- **Facebook Pixel**: Event history retained for 90 days
- **Hotjar**: Recording retention varies by plan
- **Regular Testing**: Test tracking monthly to ensure functionality

---

**Last Updated**: December 2025
**Version**: 1.0.0
**Maintained By**: FashionFynds Development Team
