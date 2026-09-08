// Central topic map for the "People also search for" internal-linking section.
//
// Maps the blog tag taxonomy onto service and case-study slugs. Kept in its own
// dependency-free module (no imports) so it can be consumed by both the app
// (src/config/relatedContent.js) and Node build scripts
// (scripts/validate-related.mjs) without pulling in Vite-only code.
//
// Keep it small and tag-driven so new posts inherit related links for free.
// scripts/validate-related.mjs guards every slug here against drift.

// Blog tag -> related service slugs + case study slugs. Tags absent here (or in
// IGNORED_TAGS) simply contribute nothing.
export const TOPIC_MAP = {
  restaurants: {
    services: ["restaurant-website-design"],
    caseStudies: [
      "doaba-junction",
      "restaurant-online-ordering-system",
      "relax-cafe",
    ],
  },
  "online ordering": {
    services: ["custom-software-development"],
    caseStudies: ["restaurant-online-ordering-system"],
  },
  "custom software": {
    services: ["custom-software-development"],
    caseStudies: [
      "restaurant-online-ordering-system",
      "parking-marketplace-platform",
    ],
  },
  websites: {
    services: ["website-development", "web-design-brampton"],
    caseStudies: ["pawpals", "doaba-junction", "relax-cafe"],
  },
  "web applications": {
    services: ["web-application-development"],
    caseStudies: [
      "parking-marketplace-platform",
      "google-sheets-event-discovery-app",
    ],
  },
  marketplace: {
    services: ["marketplace-development"],
    caseStudies: ["parking-marketplace-platform"],
  },
  "mobile app development": {
    services: ["mobile-app-development"],
    caseStudies: [],
  },
  automation: {
    services: ["business-automation"],
    caseStudies: ["restaurant-online-ordering-system"],
  },
  "business process automation": {
    services: ["business-automation"],
    caseStudies: ["restaurant-online-ordering-system"],
  },
  spreadsheets: {
    services: ["spreadsheet-automation"],
    caseStudies: ["google-sheets-event-discovery-app"],
  },
  "google sheets": {
    services: ["google-sheets-website-development", "spreadsheet-automation"],
    caseStudies: ["google-sheets-event-discovery-app"],
  },
  pricing: {
    services: ["website-development", "web-design-brampton"],
    caseStudies: [],
  },
  seo: {
    services: ["website-development", "web-design-toronto", "web-design-brampton", "local-seo-gta"],
    caseStudies: ["pawpals", "doaba-junction"],
  },
  "local seo": {
    services: ["website-development", "web-design-brampton", "web-design-toronto", "local-seo-gta"],
    caseStudies: ["pawpals", "doaba-junction"],
  },
  scheduling: {
    services: ["web-application-development", "custom-software-development"],
    caseStudies: ["bookme-scheduling-platform"],
  },
};

// Tags too broad to imply a specific service or case study.
export const IGNORED_TAGS = ["small business", "strategy", "case study"];
