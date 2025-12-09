'use client';

import { useEffect, useRef } from 'react';
import { useAnalytics } from '@/contexts/AnalyticsContext';

export default function ScrollDepthTracker() {
  const { trackEvent } = useAnalytics();
  const trackedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      );

      // Track at 25%, 50%, 75%, and 100% (90% to account for browser variations)
      const milestones = [25, 50, 75, 90];
      
      milestones.forEach((milestone) => {
        if (
          scrollPercentage >= milestone &&
          !trackedDepths.current.has(milestone)
        ) {
          trackedDepths.current.add(milestone);
          
          trackEvent('scroll_depth', {
            depth_percentage: milestone,
            page_location: window.location.pathname,
          });

          // Track in Hotjar
          if (window.hj) {
            window.hj('event', `scroll_${milestone}`);
          }

          if (process.env.NODE_ENV === 'development') {
            console.log(`[Scroll Depth] ${milestone}% reached`);
          }
        }
      });
    };

    // Throttle scroll events
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });

    return () => {
      window.removeEventListener('scroll', scrollListener);
      // Reset tracked depths on unmount
      trackedDepths.current.clear();
    };
  }, [trackEvent]);

  return null;
}
