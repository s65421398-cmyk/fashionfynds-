// Hotjar utility functions for advanced tracking

export function identifyUser(userId: string, attributes?: Record<string, any>) {
  if (window.hj) {
    window.hj('identify', userId, attributes);
  }
}

export function trackHotjarEvent(eventName: string, eventData?: Record<string, any>) {
  if (window.hj) {
    if (eventData) {
      window.hj('event', eventName, eventData);
    } else {
      window.hj('event', eventName);
    }
  }
}

export function triggerHotjarFeedback(feedbackId: string) {
  if (window.hj) {
    window.hj('trigger', feedbackId);
  }
}

export function updateHotjarState(path: string) {
  if (window.hj) {
    window.hj('stateChange', path);
  }
}

declare global {
  interface Window {
    hj?: (...args: any[]) => void;
  }
}
