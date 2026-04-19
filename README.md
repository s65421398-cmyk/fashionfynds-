# FashionFynds — AI-Powered Fashion Discovery Platform

> **Built for [PromptWars Virtual — Build with AI 2026](https://promptwars.in)**
> India's first end-to-end vibe coding challenge powered by Google AI tools.

---

## 🎯 Problem Statement

**Bridging the Discovery Gap in Indian Fashion E-Commerce**

India's fashion e-commerce market is booming, yet **70% of online shoppers abandon their carts** because they can't find what they're looking for. Small and emerging Indian fashion brands struggle to compete against large marketplaces due to poor product discoverability, lack of personalization, and limited technological resources.

**FashionFynds solves this by creating an AI-powered fashion discovery platform** that uses Google Cloud services to connect shoppers with curated fashion from India's best emerging brands — delivering a personalized, accessible, and conversion-optimized shopping experience.

---

## 💡 Solution Overview

FashionFynds is a full-stack e-commerce platform built entirely using **vibe coding with Google Antigravity** (AI-assisted development). The platform leverages multiple Google Cloud services to deliver:

1. **Smart Product Discovery** — AI-powered search and recommendations using Google Gemini
2. **Personalized Shopping** — Behavioral analytics via Google Analytics 4 for tailored experiences
3. **Secure Authentication** — Firebase Authentication with social logins (Google, Facebook)
4. **Real-time Analytics** — Google Tag Manager + GA4 for monitoring user behavior and conversions
5. **Accessible Design** — WCAG 2.1 AA compliant interface with semantic HTML and ARIA support
6. **Performance Optimized** — Server-side rendering with Next.js, image optimization, and CDN delivery

---

## 🔧 Google Cloud Services Used

| Service | Purpose |
|---------|---------|
| **Google Analytics 4 (GA4)** | User behavior tracking, conversion funnels, e-commerce events |
| **Google Tag Manager (GTM)** | Tag management, consent mode, event tracking |
| **Firebase Authentication** | User sign-up/login with Google OAuth and email/password |
| **Firebase Cloud Storage** | Product image storage and CDN delivery |
| **Google Fonts** | Typography optimization (Inter, system fonts) |
| **Google Consent Mode v2** | GDPR-compliant analytics with user consent management |
| **Google Structured Data** | SEO with Organization, Website, and LocalBusiness schemas |
| **Google Antigravity** | AI-powered vibe coding for entire application development |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (Next.js 15)             │
│  ┌──────────┐ ┌──────────┐ ┌───────────────────┐   │
│  │ React 19 │ │ Tailwind │ │  Framer Motion    │   │
│  └──────────┘ └──────────┘ └───────────────────┘   │
├─────────────────────────────────────────────────────┤
│                  Google Cloud Services              │
│  ┌────────┐ ┌──────┐ ┌────────┐ ┌──────────────┐  │
│  │  GA4   │ │ GTM  │ │Firebase│ │ Consent Mode │  │
│  └────────┘ └──────┘ └────────┘ └──────────────┘  │
├─────────────────────────────────────────────────────┤
│                    Backend (API Routes)              │
│  ┌───────────┐ ┌────────────┐ ┌────────────────┐  │
│  │Better Auth│ │ Drizzle ORM│ │  Resend Email  │  │
│  └───────────┘ └────────────┘ └────────────────┘  │
├─────────────────────────────────────────────────────┤
│                    Database (Turso/LibSQL)           │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Key Features

### For Shoppers
- 🛒 **Smart Cart & Wishlist** — Persistent, real-time cart with price tracking
- 🔍 **Intelligent Search** — Fuzzy search with category filtering
- 📱 **Mobile-First Design** — Fully responsive across all devices
- ♿ **Accessible** — Keyboard navigation, screen reader support, WCAG 2.1 AA
- 🎯 **Personalized Recommendations** — Based on browsing history and preferences
- 📦 **Order Tracking** — Real-time order status with email notifications

### For Brands
- 📊 **Analytics Dashboard** — Revenue, customer, and conversion insights
- 👥 **Customer Management** — View and manage customer profiles
- 🤝 **Partner Portal** — Self-service brand onboarding with application tracking
- 📧 **Email Automation** — Order confirmations, status updates, welcome emails

### Technical Highlights
- ⚡ **Server-Side Rendering** — Next.js 15 App Router with React 19
- 🔐 **Secure Auth** — Better Auth + Firebase with session management
- 💳 **Payments** — Stripe + Razorpay integration for Indian market
- 📈 **SEO Optimized** — Structured data, meta tags, sitemap generation
- 🧪 **Tested** — Unit tests with Vitest + React Testing Library
- 🍪 **GDPR Compliant** — Cookie consent with Google Consent Mode v2

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.8 (App Router)
- **Language**: TypeScript
- **UI**: React 19, Tailwind CSS 4, Radix UI, Framer Motion
- **Database**: Turso (LibSQL) with Drizzle ORM
- **Auth**: Better Auth + Firebase Authentication
- **Payments**: Stripe + Razorpay
- **Email**: Resend + React Email
- **Analytics**: Google Analytics 4, Google Tag Manager
- **Testing**: Vitest + React Testing Library
- **Deployment**: Vercel (Edge Network)

---

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

---

## 🌐 Deployment

The application is deployed on **Vercel** with automatic CI/CD from GitHub.

- **Production**: Auto-deploys on push to `main`
- **Preview**: Auto-deploys for pull requests

---

## 🤖 Built with Vibe Coding

This entire application was built using **vibe coding** — an intent-driven development approach where AI tools (Google Antigravity) handle the heavy lifting of code generation, while the developer focuses on architecture, UX decisions, and problem-solving.

**Key AI-powered development aspects:**
- Component scaffolding and implementation via AI prompts
- Database schema design and migration generation
- API route implementation with error handling patterns
- Accessibility audit and remediation
- Test suite generation and coverage optimization

---

## 📄 License

This project was built for the **PromptWars Virtual — Build with AI 2026** hackathon.

---

## 👥 Team

Built with ❤️ using Google AI tools for the Build with AI 2026 initiative.
