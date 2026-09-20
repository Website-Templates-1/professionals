// Single source of truth for CTA labels, destinations and page-intent rules.
// Labels are action-accurate: each one names the channel it actually opens.
import { site } from "./siteConfig";
import { contactHrefs, whatsappPrefill } from "../utils/contactHrefs";

export const BOOKING_URL = site.bookingUrl;

export const LABELS = {
  book: "Book a discovery call",
  call: "Call now",
  whatsapp: "Chat on WhatsApp",
  brief: "Send a project brief",
  estimate: "Get a website estimate",
};

export const MOBILE_CTA_BAR_HEIGHT = 64;

export const bookingUrl = ({ placement } = {}) => {
  const url = new URL(BOOKING_URL);
  url.searchParams.set("utm_source", "mintek");
  url.searchParams.set("utm_medium", "cta");
  if (placement) url.searchParams.set("utm_content", placement);
  return url.toString();
};

export const isWebsiteIntent = (service) => {
  if (!service) return false;
  if (service.ctaIntent) return service.ctaIntent === "website";
  if (service.budgetType === "website") return true;
  return /web-design|restaurant-website|local-seo|website-hosting|small-business-website/.test(
    service.slug || ""
  );
};

const briefPath = (options = {}) => {
  const params = new URLSearchParams();
  if (options.service?.slug) params.set("service", options.service.slug);
  if (options.projectType) params.set("projectType", options.projectType);
  params.set("cta", options.cta || "brief");
  if (options.placement) params.set("placement", options.placement);
  const query = params.toString();
  return `/contact${query ? `?${query}` : ""}#project-brief`;
};

export const resolveCta = (type, options = {}) => {
  const placement = options.placement;
  switch (type) {
    case "book":
      return {
        type,
        label: LABELS.book,
        to: bookingUrl({ placement }),
      };
    case "call":
      return {
        type,
        label: LABELS.call,
        to: contactHrefs(site.phone).tel,
      };
    case "whatsapp":
      return {
        type,
        label: LABELS.whatsapp,
        to: contactHrefs(site.phone, {
          text: whatsappPrefill({
            helpWith: options.helpWith || options.service?.title || "___",
            business: options.business || "___",
            discuss: options.discuss || "___",
          }),
        }).wa,
      };
    case "brief":
      return {
        type,
        label: LABELS.brief,
        to: briefPath({ ...options, cta: "brief" }),
      };
    case "estimate":
      return {
        type,
        label: LABELS.estimate,
        to: briefPath({
          ...options,
          cta: "estimate",
          projectType: options.service ? undefined : "website",
        }),
      };
    default:
      return { type, label: options.label || "", to: options.to || "" };
  }
};

export const inferCtaType = (to = "", label = "") => {
  const dest = String(to);
  const text = String(label).toLowerCase();
  if (dest.includes("bookme-web") || dest.includes("mintek-software")) return "book";
  if (dest.startsWith("tel:")) return "call";
  if (dest.includes("wa.me") || dest.includes("whatsapp")) return "whatsapp";
  if (text.includes("estimate")) return "estimate";
  if (dest.includes("/contact")) return "brief";
  return "other";
};

export const isExternalTo = (to = "") =>
  /^(https?:|tel:|sms:|mailto:)/.test(to);

// Default hero + footer CTAs for a service page, driven by page intent.
export const serviceCtas = (service) => {
  const website = isWebsiteIntent(service);
  if (website) {
    return {
      intent: "website",
      hero: [{ type: "estimate", variant: "contained" }],
      pricingType: "estimate",
    };
  }
  return {
    intent: "software",
    hero: [{ type: "book", variant: "contained" }],
    pricingType: "book",
  };
};
