# 📊 Analytics & Tracking Implementation Guide

## ✅ What's Been Implemented

Your FashionFynds e-commerce site now has **comprehensive tracking** across all major platforms:

### 🎯 Tracking Platforms Installed:
- ✅ **Facebook Pixel** - Product views, add to cart, purchases, dynamic product ads
- ✅ **Google Analytics 4** - Page views, user behavior, e-commerce events, conversions
- ✅ **Google Ads Conversion Tracking** - Purchase conversions, form submissions, lead tracking
- ✅ **Hotjar** - Session recordings, heatmaps, user behavior analysis, feedback surveys
- ✅ **GDPR Cookie Consent** - Compliant consent banner with granular controls

---

## 📋 Events Being Tracked

### E-commerce Events:
| Event | Triggers When | Tracked On |
|-------|--------------|------------|
| **ViewContent** | User views product detail page | Facebook Pixel, GA4 |
| **AddToCart** | User adds item to cart | Facebook Pixel, GA4, Google Ads |
| **InitiateCheckout** | User begins checkout | Facebook Pixel, GA4 |
| **Purchase** | Order completed successfully | Facebook Pixel, GA4, Google Ads |

### Engagement Events:
| Event | Triggers When | Tracked On |
|-------|--------------|------------|
| **PageView** | Every page navigation | Facebook Pixel, GA4, Hotjar |
| **Lead** | Newsletter signup or contact form | Facebook Pixel, Google Ads |
| **FormSubmit** | Any form submission | GA4 |
| **EmailSignup** | Newsletter subscription | GA4, Google Ads |

### Custom Events:
- **Scroll depth tracking** (GA4 automatic)
- **User demographics** (GA4 automatic)
- **Traffic sources** (GA4 automatic)
- **Session recordings** (Hotjar automatic)
- **Heatmap data** (Hotjar automatic)

---

## 🚀 Quick Setup Guide

### Step 1: Get Your Tracking IDs

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Then fill in your tracking IDs:

#### 1. **Google Analytics 4** (Required)
```env
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```
**How to get:**
1. Go to [Google Analytics](https://analytics.google.com)
2. Admin → Property → Data Streams → Web
3. Copy the **Measurement ID** (starts with `G-`)

#### 2. **Facebook Pixel** (Required for Facebook Ads)
```env
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789012345
```
**How to get:**
1. Go to [Meta Events Manager](https://business.facebook.com/events_manager)
2. Connect Data Sources → Web → Facebook Pixel
3. Copy the **Pixel ID** (15-digit number)

#### 3. **Google Ads** (Optional - for conversion tracking)
```env
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
```
**How to get:**
1. Go to [Google Ads](https://ads.google.com)
2. Tools → Measurement → Conversions
3. Create conversion action → Copy **Conversion ID** (starts with `AW-`)

#### 4. **Hotjar** (Optional - for heatmaps/recordings)
```env
NEXT_PUBLIC_HOTJAR_ID=1234567
```
**How to get:**
1. Go to [Hotjar](https://www.hotjar.com)
2. Create account → Add site
3. Copy the **Site ID** from tracking code

#### 5. **Google Tag Manager** (Optional - advanced users)
```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
```
**How to get:**
1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Create container → Copy **Container ID** (starts with `GTM-`)

---

## 📊 Tracking in Action

### Product Views
When a user views a product page:
```typescript
// Automatically tracked in src/app/products/[id]/page.tsx
trackEcommerce('view_item', {
  items: [{
    item_id: '123',
    item_name: 'Nike Air Max',
    price: 129.99,
    currency: 'USD',
  }],
  value: 129.99,
});
```

### Add to Cart
When a user adds to cart:
```typescript
// Automatically tracked in src/contexts/ShopContext.tsx
trackEcommerce('add_to_cart', {
  items: [{ item_id, item_name, price, quantity }],
  value: price * quantity,
});
```

### Purchase
When checkout completes:
```typescript
// Automatically tracked in src/components/CheckoutModal.tsx
trackEcommerce('purchase', {
  items: [...cart items...],
  value: total,
  transaction_id: 'ORDER_123',
});
```

### Newsletter Signup
When user subscribes:
```typescript
// Automatically tracked in src/components/Newsletter.tsx
trackEmailEvent('signup', {
  email_provider: 'gmail.com',
  signup_source: 'newsletter_footer',
});
```

---

## 🔍 Testing Your Tracking

### 1. **Development Mode** (Built-in)
All tracking events are logged to console in development:
```javascript
[Analytics] Event: view_item { item_id: '123', ... }
[Facebook Pixel] Purchase { value: 299.99, ... }
```

### 2. **Facebook Pixel Helper** (Chrome Extension)
- Install: [Meta Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
- Open any page → Click extension icon
- Verify events fire correctly

### 3. **Google Analytics DebugView**
- Go to GA4 → Admin → DebugView
- Browse your site
- See real-time events appear

### 4. **Google Tag Assistant** (Chrome Extension)
- Install: [Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
- Verify GA4 and Google Ads tags

### 5. **Hotjar Recordings**
- Go to Hotjar dashboard → Recordings
- Watch actual user sessions (after going live)

---

## 📈 Setting Up Conversions

### Google Analytics 4 Conversions
1. Go to GA4 → Events
2. Find custom events (e.g., `newsletter_signup`, `form_submit`)
3. Click "Mark as conversion"
4. Now they appear in conversion reports!

### Google Ads Conversion Tracking
1. In Google Ads → Conversions
2. Create new conversion action
3. Select "Website" → Manual code installation
4. Use the conversion label in your tracking code

### Facebook Dynamic Product Ads
Your pixel is already configured for dynamic ads! To enable:
1. Go to Meta Commerce Manager
2. Create product catalog
3. Upload product feed
4. Create dynamic ad campaign
5. Your pixel will automatically match products

---

## 🛡️ GDPR Compliance

### Cookie Consent Banner
A compliant cookie consent banner appears on first visit:
- ✅ **Accept All** - Enables all tracking
- ✅ **Reject Non-Essential** - Only functional cookies
- Stored in localStorage for 365 days

### Consent Management
The banner respects user choice:
```typescript
// Consent is updated via Google Consent Mode v2
gtag('consent', 'update', {
  analytics_storage: 'granted', // or 'denied'
  ad_storage: 'granted',
  ad_personalization: 'granted',
});
```

### User Opt-Out
Users can manage cookies via the consent banner.

---

## 🎨 Customization

### Add Custom Events
Use the analytics hook anywhere:
```typescript
import { useAnalytics } from '@/contexts/AnalyticsContext';

function MyComponent() {
  const { trackEvent } = useAnalytics();
  
  const handleClick = () => {
    trackEvent('button_click', {
      button_name: 'subscribe',
      page: 'homepage',
    });
  };
}
```

### Track Custom Form Submissions
```typescript
const { trackFormSubmission } = useAnalytics();

trackFormSubmission('contact_form', {
  form_location: 'footer',
  user_type: 'guest',
});
```

### Track Email Events
```typescript
const { trackEmailEvent } = useAnalytics();

trackEmailEvent('click', {
  email_id: 'welcome_email',
  link_clicked: 'shop_now',
});
```

---

## 📊 Available Analytics Functions

### `useAnalytics()` Hook
```typescript
const {
  trackEvent,           // Generic event tracking
  trackPageView,        // Manual page view (auto-tracked)
  trackEcommerce,       // E-commerce events (view_item, add_to_cart, purchase)
  trackConversion,      // Google Ads conversions
  trackFbEvent,         // Facebook-specific events
  trackFormSubmission,  // Form submission tracking
  trackEmailEvent,      // Email-related tracking
} = useAnalytics();
```

---

## 🎯 Best Practices

### 1. **Event Naming**
Use consistent, descriptive names:
- ✅ `newsletter_signup`, `product_view`, `cart_add`
- ❌ `click1`, `event2`, `test`

### 2. **Event Parameters**
Include relevant context:
```typescript
trackEvent('search', {
  search_term: 'nike shoes',
  results_count: 24,
  page: 'homepage',
});
```

### 3. **Transaction IDs**
Always use unique IDs for purchases:
```typescript
transaction_id: `ORDER_${Date.now()}` // Unique timestamp-based ID
```

### 4. **Currency Consistency**
Always specify currency:
```typescript
currency: 'USD' // ISO 4217 format
```

### 5. **Testing Before Launch**
Test all events in development mode before going live!

---

## 🚨 Troubleshooting

### Events Not Showing in GA4?
1. Check Measurement ID format: `G-XXXXXXXXXX`
2. Wait 24-48 hours for data to appear in reports
3. Use DebugView for real-time verification

### Facebook Pixel Not Firing?
1. Check Pixel ID is 15 digits
2. Verify with Meta Pixel Helper extension
3. Check browser console for errors

### Hotjar Not Recording?
1. Verify Site ID is correct
2. Check domain whitelist in Hotjar settings
3. Ensure cookies are enabled

### Google Ads Conversions Not Tracking?
1. Verify Conversion ID format: `AW-XXXXXXXXXX`
2. Check conversion label matches your setup
3. Wait 24 hours for data sync

---

## 📚 Resources

### Official Documentation
- [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Facebook Pixel](https://developers.facebook.com/docs/facebook-pixel)
- [Google Ads Conversions](https://support.google.com/google-ads/answer/6095821)
- [Hotjar Help Center](https://help.hotjar.com/)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

### Support
- GA4: [Google Analytics Support](https://support.google.com/analytics)
- Facebook: [Meta Business Help Center](https://www.facebook.com/business/help)
- Google Ads: [Google Ads Help](https://support.google.com/google-ads)
- Hotjar: [Hotjar Support](https://help.hotjar.com/)

---

## ✨ What's Next?

After setting up your tracking IDs:

1. **Test all events** in development mode
2. **Deploy to production** with real tracking IDs
3. **Verify tracking** with browser extensions
4. **Set up conversion goals** in each platform
5. **Create custom reports** in GA4
6. **Launch retargeting campaigns** using Facebook Pixel data
7. **Analyze heatmaps** in Hotjar to optimize UX

---

**Need Help?** All tracking is implemented and ready to go. Just add your tracking IDs to `.env.local` and start collecting data! 🎉
