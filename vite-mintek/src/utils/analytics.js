// Lightweight, SSR-safe analytics wrapper. Forwards events to Amplitude (the
// SDK is initialized in main.jsx and buffers events fired before init(), so
// calling track() early is safe) and, when configured, to GA4 (gtag) or a tag
// manager via window.dataLayer. It is intentionally inert (no-op) until an
// analytics backend is actually set up, so nothing breaks in dev, during static
// prerendering, or before a GA4 ID exists.
import * as amplitude from "@amplitude/analytics-browser";

export const trackEvent = (name, params = {}) => {
  if (typeof window === "undefined") return;
  try {
    // Amplitude is the primary sink (autocapture + explicit events).
    amplitude.track(name, params);
  } catch {
    // Never let analytics failures affect the user experience.
  }
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...params });
    }
  } catch {
    // Never let analytics failures affect the user experience.
  }
};

// Fired on a successful contact-form submission.
export const trackLead = (params = {}) => trackEvent("generate_lead", params);
