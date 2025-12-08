'use client';

import React, { createContext, useContext, ReactNode } from 'react';

export type EventParams = Record<string, string | number | boolean | object>;

interface AnalyticsContextType {
  trackEvent: (eventName: string, params?: EventParams) => void;
  trackPageView: (pagePath: string, pageTitle?: string) => void;
  trackEcommerce: (type: 'view_item' | 'add_to_cart' | 'purchase', data: EcommerceData) => void;
  trackConversion: (conversionLabel: string, value?: number) => void;
  trackFbEvent: (eventName: 'Purchase' | 'AddToCart' | 'ViewContent' | 'Lead' | 'InitiateCheckout', data?: Record<string, any>) => void;
  trackFormSubmission: (formType: string, formData?: Record<string, any>) => void;
  trackEmailEvent: (eventType: 'signup' | 'open' | 'click', data?: Record<string, any>) => void;
}

export interface EcommerceData {
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity?: number;
    currency?: string;
    item_brand?: string;
    item_category?: string;
  }>;
  value?: number;
  currency?: string;
  transaction_id?: string;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const trackEvent = (eventName: string, params: EventParams = {}) => {
    // GA4 tracking
    if (window.gtag) {
      window.gtag('event', eventName, params);
    }

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Event:', eventName, params);
    }
  };

  const trackPageView = (pagePath: string, pageTitle?: string) => {
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA4_ID || '', {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }

    // Hotjar virtual page view
    if (window.hj) {
      window.hj('stateChange', pagePath);
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Page View:', pagePath, pageTitle);
    }
  };

  const trackEcommerce = (type: 'view_item' | 'add_to_cart' | 'purchase', data: EcommerceData) => {
    const gaEventMap = {
      view_item: 'view_item',
      add_to_cart: 'add_to_cart',
      purchase: 'purchase',
    };

    // GA4 ecommerce event
    trackEvent(gaEventMap[type], {
      items: data.items,
      value: data.value,
      currency: data.currency || 'USD',
      transaction_id: data.transaction_id,
    });

    // Facebook Pixel ecommerce event
    if (window.fbq) {
      const fbEventMap = {
        view_item: 'ViewContent',
        add_to_cart: 'AddToCart',
        purchase: 'Purchase',
      };

      const eventId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      window.fbq('track', fbEventMap[type], {
        value: data.value,
        currency: data.currency || 'USD',
        content_ids: data.items.map((item) => item.item_id),
        content_type: 'product',
        contents: data.items.map(item => ({
          id: item.item_id,
          quantity: item.quantity || 1,
          item_price: item.price,
        })),
        num_items: data.items.reduce((sum, item) => sum + (item.quantity || 1), 0),
        event_id: eventId,
      });
    }

    // Google Ads conversion for purchases
    if (type === 'purchase' && window.gtag && process.env.NEXT_PUBLIC_GOOGLE_ADS_ID) {
      window.gtag('event', 'conversion', {
        send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/purchase`,
        value: data.value,
        currency: data.currency || 'USD',
        transaction_id: data.transaction_id,
      });
    }

    // Hotjar event
    if (window.hj) {
      window.hj('event', gaEventMap[type]);
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Ecommerce:', type, data);
    }
  };

  const trackConversion = (conversionLabel: string, value?: number) => {
    if (window.gtag && process.env.NEXT_PUBLIC_GOOGLE_ADS_ID) {
      window.gtag('event', 'conversion', {
        send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/${conversionLabel}`,
        value,
        currency: 'USD',
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Conversion:', conversionLabel, value);
    }
  };

  const trackFbEvent = (
    eventName: 'Purchase' | 'AddToCart' | 'ViewContent' | 'Lead' | 'InitiateCheckout',
    data?: Record<string, any>
  ) => {
    if (window.fbq) {
      const eventId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      window.fbq('track', eventName, {
        ...data,
        event_id: eventId,
      });

      if (process.env.NODE_ENV === 'development') {
        console.log('[Facebook Pixel]', eventName, { ...data, event_id: eventId });
      }
    }
  };

  const trackFormSubmission = (formType: string, formData?: Record<string, any>) => {
    // GA4 form submission
    trackEvent('form_submit', {
      form_type: formType,
      ...formData,
    });

    // Facebook Lead event for important forms
    if (formType === 'contact' || formType === 'newsletter') {
      trackFbEvent('Lead', {
        content_name: formType,
      });
    }

    // Google Ads conversion for lead forms
    if (formType === 'contact' || formType === 'newsletter') {
      trackConversion('lead_form');
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Form Submit:', formType, formData);
    }
  };

  const trackEmailEvent = (eventType: 'signup' | 'open' | 'click', data?: Record<string, any>) => {
    trackEvent(`email_${eventType}`, {
      event_category: 'email',
      ...data,
    });

    // Track newsletter signups as conversions
    if (eventType === 'signup') {
      trackConversion('newsletter_signup');
      trackFbEvent('Lead', {
        content_name: 'newsletter',
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Email Event:', eventType, data);
    }
  };

  return (
    <AnalyticsContext.Provider
      value={{
        trackEvent,
        trackPageView,
        trackEcommerce,
        trackConversion,
        trackFbEvent,
        trackFormSubmission,
        trackEmailEvent,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (event: string, eventName?: string, data?: Record<string, any>) => void;
    _fbq?: any;
    hj?: (...args: any[]) => void;
  }
}
