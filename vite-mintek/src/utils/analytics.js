// Lightweight, SSR-safe analytics wrapper. Works with GA4 (gtag) when a real
// Measurement ID is configured in index.html; otherwise events are pushed to
// window.dataLayer so a tag manager can pick them up later. It is intentionally
// inert (no-op) until analytics is actually set up, so nothing breaks in dev,
// during static prerendering, or before a GA4 ID exists.
export const trackEvent = (name, params = {}) => {
  if (typeof window === "undefined") return;
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
