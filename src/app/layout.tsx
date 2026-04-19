import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Suspense } from "react";
import { Toaster } from "sonner";
import FacebookPixel from '@/components/trackers/FacebookPixel';
import HotjarTracker from '@/components/trackers/HotjarTracker';
import ScrollDepthTracker from '@/components/trackers/ScrollDepthTracker';
import CookieConsent from '@/components/CookieConsent';
import { ShopProvider } from '@/contexts/ShopContext';
import { AnalyticsProvider } from '@/contexts/AnalyticsContext';
import PageTracker from '@/components/trackers/PageTracker';
import { OrganizationSchema, WebsiteSchema, LocalBusinessSchema } from '@/components/StructuredData';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "FashionFynds - Discover Your Unique Style",
  description: "Shop curated fashion finds from the world's best brands",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const isBuild = process.env.NODE_ENV === 'production' && !process.env.NEXT_RUNTIME;

  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <OrganizationSchema />
        <WebsiteSchema />
        <LocalBusinessSchema />

        {/* Google Consent Mode - Initialize before any tracking */}
        <Script
          id="gtm-consent"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'personalization_storage': 'denied',
                'functionality_storage': 'granted',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
              });
            `,
          }}
        />

        {/* Google Analytics 4 */}
        {!isBuild && ga4Id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${ga4Id}');
                `,
              }}
            />
          </>
        )}

        {/* Google Tag Manager */}
        {!isBuild && gtmId && (
          <Script
            id="gtm-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
        )}
      </head>
      <body className="antialiased">
        <ErrorReporter />

        {/* GDPR Cookie Consent Banner */}
        <CookieConsent />

        {/* Google Tag Manager noscript fallback */}
        {!isBuild && gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        {/* Analytics Provider wraps all tracking utilities */}
        <AnalyticsProvider>
          <ShopProvider>
            {!isBuild && (
              <>
                <Suspense fallback={null}>
                  <PageTracker />
                </Suspense>
                <ScrollDepthTracker />
                <FacebookPixel />
                <HotjarTracker />
                <Script
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
                  strategy="afterInteractive"
                  data-target-origin="*"
                  data-message-type="ROUTE_CHANGE"
                  data-include-search-params="true"
                  data-only-in-iframe="true"
                  data-debug="true"
                  data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
                />
              </>
            )}

            {children}

            <Toaster position="top-center" richColors />
            <VisualEditsMessenger />
          </ShopProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
