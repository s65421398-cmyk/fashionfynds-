import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Toaster } from "sonner";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import FacebookPixel from '@/components/trackers/FacebookPixel';
import HotjarTracker from '@/components/trackers/HotjarTracker';
import CookieConsent from '@/components/CookieConsent';
import { AnalyticsProvider } from '@/contexts/AnalyticsContext';
import PageTracker from '@/components/trackers/PageTracker';

export const metadata: Metadata = {
  title: "FashionFynds - Discover Your Unique Style",
  description: "Shop curated fashion finds from the world's best brands",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
      </head>
      <body className="antialiased">
        <ErrorReporter />
        
        {/* GDPR Cookie Consent Banner */}
        <CookieConsent />

        {/* Analytics Provider wraps all tracking utilities */}
        <AnalyticsProvider>
          <PageTracker />
          
          {/* Google Analytics 4 */}
          {process.env.NEXT_PUBLIC_GA4_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_ID} />
          )}

          {/* Google Tag Manager */}
          {process.env.NEXT_PUBLIC_GTM_ID && (
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
          )}

          {/* Facebook Pixel */}
          <FacebookPixel />

          {/* Hotjar */}
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
          
          {children}
          
          <Toaster position="top-center" richColors />
          <VisualEditsMessenger />
        </AnalyticsProvider>
      </body>
    </html>
  );
}