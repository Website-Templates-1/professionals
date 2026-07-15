// Single source of truth for brand, contact (NAP), navigation and page content.
// Update values here and they propagate to metadata, structured data, nav and pages.
//
// CONTENT-INTEGRITY RULES (must hold for all copy in this file):
// - Laal Button is a READ-ONLY Google Sheets event-discovery web app; registration
//   happens externally on Eventbrite. Never describe it as a booking, ticketing,
//   registration, user-account, performer or Eventbrite-replacement platform.
// - Distinguish project `kind`: client | product | internal | prototype | concept.
//   Concepts/prototypes must be clearly labelled and never ranked above real work.
// - Temporary preview URLs (e.g. *.vercel.app) are shown as "preview (temporary)",
//   never presented as a final production domain.
// - Rent a Parking is custom software / a marketplace, NOT a mobile app.
// - Never claim offices in Toronto, Mississauga or Vaughan. Use `serviceAreaStatement`.
// - Internal estimating range is CAD $100-125/hr. This is for the owner only and must
//   NOT be rendered anywhere on the site. Sell fixed outcomes and project stages.

export const site = {
  brand: "Mintek Software",
  legalName: "Mintek Software",
  domain: "https://minteksoftware.com",
  // Canonical host choice: non-www. Configure hosting to redirect www -> non-www.
  tagline: "Custom software, automation and websites for growing businesses",
  description:
    "Mintek Software builds custom software, business automation and high-performing websites that streamline operations and support business growth.",
  serviceAreaStatement:
    "Based in Brampton and serving businesses across Toronto, Mississauga, Vaughan and the Greater Toronto Area. In-person meetings are available.",
  email: "minteksoftware@gmail.com",
  phone: "+1-647-470-4180",
  logo: "/logo2.png",
  ogImage: "/logo2.png",
  address: {
    locality: "Brampton",
    region: "ON",
    regionName: "Ontario",
    country: "CA",
    countryName: "Canada",
  },
  areaServed: [
    "Brampton",
    "Mississauga",
    "Toronto",
    "Vaughan",
    "Greater Toronto Area",
    "Ontario",
  ],
  social: {
    // Add real profiles when available; used in Organization schema `sameAs`.
    linkedin: "",
    github: "",
  },
  foundingYear: 2022,
};

// Canonical URL helper. Pass a route path such as "/about".
export const canonical = (path = "/") => {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return `${site.domain}${clean}`;
};

export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//.test(path)) return path;
  return `${site.domain}${path.startsWith("/") ? path : `/${path}`}`;
};

// ---------------------------------------------------------------------------
// Commercial model: public project stages + budget ranges (used on service
// pages and the contact form). Hourly pricing is intentionally NOT published.
// ---------------------------------------------------------------------------
export const projectStages = [
  {
    title: "Discovery and requirements",
    description:
      "We map your goals, workflows and data to define the smallest solution that delivers the most value.",
  },
  {
    title: "Prototype or proof of concept",
    description:
      "A clickable prototype or focused proof of concept so you can validate the approach before full build.",
  },
  {
    title: "Initial production release",
    description:
      "We ship a solid, usable first version, deployed and ready for real work.",
  },
  {
    title: "Integrations and enhancements",
    description:
      "We connect the tools you already use and expand functionality as priorities become clear.",
  },
  {
    title: "Support and maintenance",
    description:
      "Ongoing monitoring, improvements and support so the system keeps delivering.",
  },
];

// Budget ranges shown in the contact form, keyed by project type.
export const budgetPresets = {
  website: [
    "$1,500 – $3,000",
    "$3,000 – $6,000",
    "$6,000 – $10,000",
    "$10,000+",
    "Not sure",
  ],
  automation: [
    "Under $3,000",
    "$3,000 – $7,500",
    "$7,500 – $15,000",
    "$15,000 – $30,000",
    "$30,000+",
    "Not sure",
  ],
  software: [
    "Under $5,000",
    "$5,000 – $15,000",
    "$15,000 – $30,000",
    "$30,000 – $75,000",
    "$75,000+",
    "Not sure",
  ],
  general: [
    "Not sure yet",
    "Under $5,000",
    "$5,000 – $15,000",
    "$15,000 – $30,000",
    "$30,000+",
  ],
};

// Contact-form project types. `budgetType` selects which budget list to show.
export const projectTypes = [
  { value: "custom-software", label: "Custom software", budgetType: "software" },
  { value: "automation", label: "Business automation", budgetType: "automation" },
  { value: "marketplace", label: "Marketplace / web application", budgetType: "software" },
  { value: "website", label: "Website / web design", budgetType: "website" },
  { value: "other", label: "Something else / not sure", budgetType: "general" },
];

// Maps a service slug to a contact-form project type (for ?service= prefill).
export const projectTypeForService = (slug) => {
  if (!slug) return "";
  if (/custom-software|mobile-app/.test(slug)) return "custom-software";
  if (/automation/.test(slug)) return "automation";
  if (/marketplace|web-application/.test(slug)) return "marketplace";
  if (/website|web-design|google-sheets|restaurant-website/.test(slug)) return "website";
  return "other";
};

// ---------------------------------------------------------------------------
// Services (each becomes /<slug> with a dedicated, indexable page)
// group: software | data | website | local
// ---------------------------------------------------------------------------
export const services = [
  {
    slug: "custom-software-development",
    icon: "Code",
    color: "#6C55F9",
    group: "software",
    showOnHomepage: true,
    order: 1,
    stages: true,
    budgetType: "software",
    pricing:
      "Custom software projects generally start at CAD $5,000. Final pricing depends on functionality, integrations, user roles, security requirements and ongoing support.",
    offersFrom: 5000,
    title: "Custom Software Development",
    metaTitle: "Custom Software Development | Mintek Software",
    metaDescription:
      "Custom software development for growing businesses. Mintek Software designs and builds tailored applications, dashboards and internal tools that streamline operations and scale with you.",
    short:
      "Tailored applications, dashboards and internal tools built around your exact workflows.",
    hero: "Custom software built around how your business actually works.",
    problem:
      "Off-the-shelf tools force your team to work around software that was never built for them. Manual workarounds, disconnected spreadsheets and duplicated data slow everyone down and hide costly mistakes.",
    solution:
      "We build custom software that fits your processes exactly, from internal dashboards and admin tools to customer-facing platforms. Every feature earns its place by removing manual work or unlocking new revenue.",
    process: [
      "Discovery: we map your workflows, data and goals to define the smallest solution that delivers the most value.",
      "Design: clickable prototypes so you can validate the experience before we write production code.",
      "Build: iterative development with regular demos, so you always see progress.",
      "Launch and support: deployment, training and ongoing improvements.",
    ],
    tech: ["React", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", "AWS"],
    outcome:
      "Software your team actually wants to use, that removes manual work and gives you reliable data to make decisions.",
    relatedServices: [
      "web-application-development",
      "business-automation",
      "marketplace-development",
    ],
    relatedCaseStudies: [
      "parking-marketplace-platform",
      "restaurant-online-ordering-system",
    ],
  },
  {
    slug: "business-automation",
    icon: "AutoAwesome",
    color: "#35bb78",
    group: "software",
    showOnHomepage: true,
    order: 2,
    stages: true,
    budgetType: "automation",
    pricing:
      "Small, clearly defined automation projects start at CAD $3,000. Larger workflow and systems-integration projects are quoted after discovery.",
    offersFrom: 3000,
    title: "Business Automation",
    metaTitle: "Business Process Automation | Mintek Software",
    metaDescription:
      "Business automation that eliminates repetitive manual work. Mintek Software builds automated workflows, dashboards and integrations that save hours every week.",
    short:
      "Automate repetitive manual work so your team can focus on what matters.",
    hero: "Automate the busywork that eats your team's day.",
    problem:
      "Hours disappear every week into copying data between systems, building the same reports and chasing manual steps that are easy to forget or get wrong.",
    solution:
      "We identify the highest-cost manual processes and replace them with automated workflows, integrations and dashboards, so the work happens reliably in the background. Small, clearly defined projects are a great place to start, and even sub-$3,000 ideas can suit a paid discovery or proof of concept.",
    process: [
      "Audit: measure where time and errors actually accumulate.",
      "Prioritize: target the automations with the fastest payback.",
      "Build: connect your tools with reliable, monitored workflows.",
      "Measure: track hours saved and error rates after launch.",
    ],
    tech: ["Node.js", "REST APIs", "Webhooks", "SQL", "Cloud Functions", "Google Sheets API"],
    outcome:
      "Reclaimed hours, fewer errors and reporting that updates itself, for example reducing multi-hour manual reporting to minutes.",
    relatedServices: [
      "spreadsheet-automation",
      "custom-software-development",
      "business-automation-toronto",
    ],
    relatedCaseStudies: ["restaurant-online-ordering-system"],
  },
  {
    slug: "web-application-development",
    icon: "Dashboard",
    color: "#05B4E1",
    group: "software",
    showOnHomepage: true,
    order: 3,
    stages: true,
    budgetType: "software",
    pricing:
      "Web application projects generally start at CAD $5,000, depending on functionality, integrations, user roles and ongoing support.",
    offersFrom: 5000,
    title: "Web Application Development",
    metaTitle: "Web Application Development | Mintek Software",
    metaDescription:
      "Custom web application development with React and Node. Mintek Software builds fast, data-driven web apps, portals and marketplaces that run in the browser.",
    short:
      "Fast, data-driven web apps, portals and dashboards that run in any browser.",
    hero: "Web applications that do real work, not just display pages.",
    problem:
      "Marketing sites and page builders fall over the moment you need real logic: user roles, live data, search, maps or dashboards. Bolting that onto the wrong foundation gets slow and fragile fast.",
    solution:
      "We build genuine web applications with a solid architecture: React and TypeScript on the front end, Node-based services and databases behind them. That means responsive interfaces, real data and room to grow.",
    process: [
      "Define: core user journeys and the metric that matters most.",
      "Architect: data model, APIs and the right foundation for scale.",
      "Build: iterative delivery with regular, usable releases.",
      "Operate: monitoring, analytics and ongoing enhancements.",
    ],
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "PostgreSQL", "Mapbox GL JS"],
    outcome:
      "A responsive, reliable web application with a foundation that can expand as your needs grow.",
    relatedServices: [
      "custom-software-development",
      "marketplace-development",
      "google-sheets-website-development",
    ],
    relatedCaseStudies: [
      "parking-marketplace-platform",
      "google-sheets-event-discovery-app",
    ],
  },
  {
    slug: "website-development",
    icon: "Language",
    color: "#FF3D85",
    group: "website",
    showOnHomepage: true,
    order: 4,
    budgetType: "website",
    pricing: "Business website projects start at CAD $1,500.",
    offersFrom: 1500,
    title: "Website Development",
    metaTitle: "Website Development & Design | Mintek Software",
    metaDescription:
      "Fast, responsive, SEO-friendly website development. Mintek Software designs and builds websites that load quickly, rank well and convert visitors into customers.",
    short:
      "Fast, responsive, SEO-ready websites that turn visitors into customers.",
    hero: "Websites that load fast, rank well and convert.",
    problem:
      "A slow, dated or hard-to-update website costs you customers before they ever contact you, and page builders often produce bloated sites that rank poorly and are painful to maintain.",
    solution:
      "We design and build modern, responsive websites with clean code, strong technical SEO foundations and content you can update yourself, from marketing sites to data-driven web apps.",
    process: [
      "Strategy: clarify audience, goals and the actions you want visitors to take.",
      "Design: responsive layouts focused on clarity and conversion.",
      "Build: fast, accessible, SEO-friendly code with analytics wired in.",
      "Launch: performance tuning, search setup and handover.",
    ],
    tech: ["React", "Vite", "Next.js", "Google Sheets API", "Analytics"],
    outcome:
      "A fast, credible website that ranks for the searches your customers actually make and turns traffic into enquiries.",
    relatedServices: [
      "google-sheets-website-development",
      "web-design-brampton",
      "restaurant-website-design",
    ],
    relatedCaseStudies: [
      "google-sheets-event-discovery-app",
      "pawpals",
    ],
  },
  {
    slug: "marketplace-development",
    icon: "Storefront",
    color: "#6C55F9",
    group: "software",
    stages: true,
    budgetType: "software",
    pricing:
      "Marketplace and multi-sided platform projects generally start at CAD $5,000 and are scoped after discovery.",
    offersFrom: 5000,
    title: "Marketplace Development",
    metaTitle: "Marketplace Development Company Toronto | Mintek Software",
    metaDescription:
      "Custom marketplace development: listings, search, maps, location data and marketplace SEO. Mintek Software builds two-sided and location-based marketplaces.",
    short:
      "Two-sided and location-based marketplaces with listings, search and maps.",
    hero: "Custom marketplaces built to connect supply and demand.",
    problem:
      "Marketplaces are deceptively hard: you have to serve two different audiences, keep listings fresh, make search and maps fast, and still be discoverable in Google. Generic templates rarely hold up.",
    solution:
      "We build custom marketplaces around real user journeys, listing management, robust search and filtering, map-based discovery, location data and marketplace SEO so listing pages can rank. Payments are added when the model calls for them.",
    process: [
      "Model: map both sides of the marketplace and the core loop that creates value.",
      "Design: listing, search and map experiences that feel effortless.",
      "Build: scalable listing data, filtering and location-aware search.",
      "Grow: marketplace SEO, admin tooling and expansion to new areas.",
    ],
    tech: ["React", "TypeScript", "Node.js", "MongoDB", "Mapbox GL JS", "REST APIs"],
    outcome:
      "A marketplace with a strong technical foundation, discoverable listings and room to expand across new cities or categories.",
    relatedServices: [
      "web-application-development",
      "custom-software-development",
    ],
    relatedCaseStudies: ["parking-marketplace-platform"],
  },
  {
    slug: "google-sheets-website-development",
    icon: "TableChart",
    color: "#35bb78",
    group: "data",
    budgetType: "website",
    pricing: "Google Sheets-powered websites start at CAD $1,500.",
    offersFrom: 1500,
    title: "Google Sheets Website Development",
    metaTitle: "Google Sheets Website Development | Mintek Software",
    metaDescription:
      "Websites and web apps that let your team manage live content through Google Sheets. Ideal for events, menus, catalogues and directories that change often.",
    short:
      "Websites and web apps your team updates through a familiar spreadsheet.",
    hero: "Manage your website content from a Google Sheet.",
    problem:
      "Your content changes constantly, but every update means emailing a developer or wrestling with a clunky CMS. Meanwhile the information already lives in a spreadsheet your team knows how to use.",
    solution:
      "We build websites and web applications that read live content from Google Sheets, so non-technical staff can update events, menus, catalogues, price lists, schedules or directories directly in a spreadsheet and see changes appear on the site. Well suited to frequently changing, non-sensitive content.",
    process: [
      "Model: structure your spreadsheet so it behaves like a reliable content source.",
      "Build: a fast front end that reads and renders the sheet data.",
      "Safeguard: validation and fallbacks for missing or malformed rows.",
      "Handover: a simple guide so anyone on the team can publish updates.",
    ],
    tech: ["React", "Google Sheets API", "Vite", "Analytics"],
    outcome:
      "A site your team can update in seconds from a spreadsheet, with no CMS logins or developer bottleneck.",
    // Honesty caveat rendered on the page via `note`.
    note:
      "Google Sheets is ideal for frequently changing, non-sensitive content. It is not appropriate for secure, highly sensitive or complex transactional systems, which we build with a proper database and backend.",
    relatedServices: ["website-development", "web-application-development", "spreadsheet-automation"],
    relatedCaseStudies: ["google-sheets-event-discovery-app"],
  },
  {
    slug: "spreadsheet-automation",
    icon: "Sync",
    color: "#FAC14D",
    group: "data",
    stages: true,
    budgetType: "automation",
    pricing:
      "Spreadsheet automation projects start at CAD $3,000. Smaller, well-defined tasks can suit a paid discovery or proof of concept.",
    offersFrom: 3000,
    title: "Spreadsheet Automation",
    metaTitle: "Spreadsheet Automation & Integrations | Mintek Software",
    metaDescription:
      "Automate reporting, data syncing and spreadsheet workflows. Mintek Software turns manual spreadsheet operations into reliable, scheduled, automated processes.",
    short:
      "Turn manual spreadsheet work into automated reporting, syncing and dashboards.",
    hero: "Stop copying data between spreadsheets by hand.",
    problem:
      "Spreadsheets quietly run the business, but keeping them current is manual: exports, copy-paste, cleanup and the same report rebuilt every week. It is slow and error-prone.",
    solution:
      "We automate the operational work around your spreadsheets and other tools: automated reporting, data synchronization, scheduled imports and exports, validation and cleanup, notifications, document generation and dashboards.",
    process: [
      "Audit: find the highest-cost manual spreadsheet tasks.",
      "Design: define the automated flow and where data comes from and goes.",
      "Build: reliable, monitored automations and integrations.",
      "Measure: confirm time saved and error reduction.",
    ],
    tech: ["Node.js", "Google Sheets API", "REST APIs", "Webhooks", "Cloud Functions"],
    outcome:
      "Reports and data that update themselves, with fewer errors and hours handed back to your team.",
    note:
      "We prioritise this page with real, named or anonymized automation examples as engagements are completed.",
    relatedServices: ["business-automation", "google-sheets-website-development", "custom-software-development"],
    relatedCaseStudies: ["restaurant-online-ordering-system"],
  },
  {
    slug: "mobile-app-development",
    icon: "Devices",
    color: "#05B4E1",
    group: "software",
    budgetType: "software",
    title: "Mobile App Development",
    metaTitle: "Mobile App Development | Mintek Software",
    metaDescription:
      "Cross-platform mobile app development. Mintek Software builds fast, reliable iOS and Android apps from a single codebase for a great user experience.",
    short:
      "Cross-platform mobile apps that deliver a great experience on iOS and Android.",
    hero: "Mobile apps your customers keep coming back to.",
    problem:
      "Building separately for iOS and Android is slow and expensive, and a poor mobile experience drives users away fast.",
    solution:
      "We build cross-platform mobile apps from a single codebase, so you reach both platforms faster while keeping a native-quality experience.",
    process: [
      "Define: core user journeys and the metric that matters most.",
      "Prototype: validate the experience on real devices early.",
      "Build: performant cross-platform app with offline-friendly design.",
      "Ship: store submission, analytics and iteration.",
    ],
    tech: ["React Native", "TypeScript", "Node.js", "Push Notifications"],
    outcome:
      "A polished app on both app stores, built once, that users find fast and reliable.",
    relatedServices: ["custom-software-development", "web-application-development"],
    relatedCaseStudies: [],
  },

  // --- Location / local landing pages ---------------------------------------
  {
    slug: "custom-software-development-toronto",
    icon: "Code",
    color: "#6C55F9",
    group: "local",
    stages: true,
    budgetType: "software",
    pricing:
      "Custom software projects generally start at CAD $5,000, scoped after a short discovery call.",
    offersFrom: 5000,
    title: "Custom Software Development Toronto",
    metaTitle: "Custom Software Development Toronto | Mintek Software",
    metaDescription:
      "Custom software development for Toronto and GTA businesses. Mintek Software builds tailored applications, dashboards and internal tools, based in Brampton with in-person meetings available.",
    short:
      "Custom applications and internal tools for Toronto and GTA businesses.",
    hero: "Custom software development for Toronto businesses.",
    problem:
      "Toronto and GTA businesses often outgrow off-the-shelf tools but worry that custom software means big agencies and bigger budgets.",
    solution:
      "We are a Brampton-based studio that builds custom software for businesses across Toronto and the GTA: dashboards, internal tools and customer-facing platforms, scoped to your budget and priorities. In-person meetings are available across the GTA.",
    process: [
      "Discovery: understand your workflows and the outcome that matters.",
      "Design: prototype the solution before building.",
      "Build: iterative delivery with regular demos.",
      "Support: launch, training and ongoing improvements.",
    ],
    tech: ["React", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", "AWS"],
    outcome:
      "Software built around your Toronto business, delivered by a local team you can meet in person.",
    relatedServices: ["custom-software-development", "web-application-development", "business-automation-toronto"],
    relatedCaseStudies: ["parking-marketplace-platform"],
  },
  {
    slug: "business-automation-toronto",
    icon: "AutoAwesome",
    color: "#35bb78",
    group: "local",
    stages: true,
    budgetType: "automation",
    pricing:
      "Small, clearly defined automation projects start at CAD $3,000; larger integrations are quoted after discovery.",
    offersFrom: 3000,
    title: "Business Automation Toronto",
    metaTitle: "Business Automation Toronto | Mintek Software",
    metaDescription:
      "Business process automation for Toronto and GTA companies. Mintek Software automates reporting, data syncing and manual workflows to save hours every week.",
    short:
      "Automate manual workflows for Toronto and GTA businesses.",
    hero: "Business automation for Toronto companies.",
    problem:
      "Growing Toronto businesses lose hours to manual data entry, repeated reporting and disconnected tools that do not talk to each other.",
    solution:
      "We help Toronto and GTA businesses automate their highest-cost manual processes with reliable workflows, integrations and dashboards. Based in Brampton, with in-person meetings available across the GTA.",
    process: [
      "Audit: measure where time and errors accumulate.",
      "Prioritize: target the fastest-payback automations.",
      "Build: connect your tools with monitored workflows.",
      "Measure: track hours saved after launch.",
    ],
    tech: ["Node.js", "REST APIs", "Webhooks", "SQL", "Google Sheets API"],
    outcome:
      "Fewer manual hours and more reliable operations for your Toronto business.",
    relatedServices: ["business-automation", "spreadsheet-automation", "custom-software-development-toronto"],
    relatedCaseStudies: ["restaurant-online-ordering-system"],
  },
  {
    slug: "web-design-brampton",
    icon: "Language",
    color: "#FF3D85",
    group: "local",
    budgetType: "website",
    pricing: "Small-business website projects start at CAD $1,500.",
    offersFrom: 1500,
    title: "Web Design Brampton",
    metaTitle: "Web Design Brampton | Mintek Software",
    metaDescription:
      "Web design in Brampton for small businesses. Mintek Software builds fast, mobile-friendly, lead-generating websites for Brampton businesses. Based locally in Brampton.",
    short:
      "Fast, mobile-friendly, lead-generating websites for Brampton businesses.",
    hero: "Web design for Brampton small businesses.",
    problem:
      "Brampton small businesses need a professional website that brings in enquiries, but many end up with slow, template sites that do not convert.",
    solution:
      "As a Brampton-based studio, we design and build fast, mobile-first websites focused on turning local visitors into leads, with clear calls to action and strong local SEO foundations.",
    process: [
      "Strategy: clarify your local audience and the action you want them to take.",
      "Design: clean, mobile-first layouts built to convert.",
      "Build: fast, accessible, SEO-ready code.",
      "Launch: local search setup and handover.",
    ],
    tech: ["React", "Vite", "Analytics"],
    outcome:
      "A professional, fast Brampton website that turns local searches into enquiries.",
    relatedServices: ["website-development", "web-design-mississauga", "restaurant-website-design"],
    relatedCaseStudies: ["pawpals"],
  },
  {
    slug: "web-design-mississauga",
    icon: "Language",
    color: "#FF3D85",
    group: "local",
    budgetType: "website",
    pricing: "Small-business website projects start at CAD $1,500.",
    offersFrom: 1500,
    title: "Web Design Mississauga",
    metaTitle: "Web Design Mississauga | Mintek Software",
    metaDescription:
      "Web design in Mississauga for small businesses. Mintek Software builds fast, mobile-friendly, conversion-focused websites for Mississauga businesses.",
    short:
      "Conversion-focused websites for Mississauga small businesses.",
    hero: "Web design for Mississauga small businesses.",
    problem:
      "Mississauga businesses compete in a crowded market and need a website that loads fast, looks credible and actually generates enquiries.",
    solution:
      "We build fast, mobile-first websites for Mississauga businesses, focused on conversion and local search. Based in nearby Brampton, with in-person meetings available across the GTA.",
    process: [
      "Strategy: define your audience and conversion goals.",
      "Design: mobile-first, credibility-building layouts.",
      "Build: fast, SEO-ready, accessible code.",
      "Launch: local search setup and handover.",
    ],
    tech: ["React", "Vite", "Analytics"],
    outcome:
      "A credible, fast Mississauga website built to convert local visitors.",
    relatedServices: ["website-development", "web-design-brampton", "restaurant-website-design"],
    relatedCaseStudies: [],
  },
  {
    slug: "restaurant-website-design",
    icon: "Restaurant",
    color: "#FF3D85",
    group: "local",
    budgetType: "website",
    pricing: "Restaurant and cafe website projects start at CAD $1,500.",
    offersFrom: 1500,
    title: "Restaurant Website Design",
    metaTitle: "Restaurant & Cafe Website Design | Mintek Software",
    metaDescription:
      "Restaurant and cafe website design that shows your menu, drives calls and directions, and handles catering enquiries. Mobile-first sites built to convert diners.",
    short:
      "Menu-first, mobile-friendly websites that turn diners into calls and visits.",
    hero: "Restaurant and cafe websites that bring in diners.",
    problem:
      "Diners decide on their phones. If your menu is a PDF, your hours are unclear or directions are buried, they move on to the next result.",
    solution:
      "We design menu-first, mobile-friendly restaurant and cafe websites that make it effortless to view the menu, call, get directions, check hours and send catering enquiries, with Google Maps and local search built in.",
    process: [
      "Plan: menu structure, key actions and local details.",
      "Design: appetising, mobile-first layouts.",
      "Build: fast pages with click-to-call, directions and maps.",
      "Launch: local search and Google presence setup.",
    ],
    tech: ["React", "Vite", "Google Maps", "Analytics"],
    outcome:
      "A mobile-first restaurant website that turns hungry searchers into calls, visits and catering enquiries.",
    relatedServices: ["website-development", "web-design-brampton", "web-design-toronto"],
    relatedCaseStudies: ["doaba-junction", "relax-cafe"],
  },
  {
    slug: "web-design-toronto",
    icon: "Language",
    color: "#FF3D85",
    group: "local",
    budgetType: "website",
    pricing: "Business website projects start at CAD $1,500.",
    offersFrom: 1500,
    title: "Web Design Toronto",
    metaTitle: "Web Design Toronto | Mintek Software",
    metaDescription:
      "Web design in Toronto for small and growing businesses. Mintek Software builds fast, mobile-friendly, conversion-focused websites for Toronto businesses.",
    short:
      "Fast, conversion-focused websites for Toronto businesses.",
    hero: "Web design for Toronto businesses.",
    problem:
      "Toronto businesses need a website that stands out in a competitive market, loads quickly and turns visitors into customers.",
    solution:
      "We build fast, mobile-first, conversion-focused websites for Toronto businesses, with strong technical SEO foundations. Based in Brampton, serving the wider GTA with in-person meetings available.",
    process: [
      "Strategy: clarify audience and conversion goals.",
      "Design: modern, mobile-first layouts.",
      "Build: fast, accessible, SEO-ready code.",
      "Launch: analytics and search setup.",
    ],
    tech: ["React", "Vite", "Analytics"],
    outcome:
      "A fast, credible Toronto website built to convert.",
    relatedServices: ["website-development", "restaurant-website-design", "custom-software-development-toronto"],
    relatedCaseStudies: ["doaba-junction"],
  },
  {
    slug: "web-design-vaughan",
    icon: "Language",
    color: "#FF3D85",
    group: "local",
    budgetType: "website",
    // Deferred per strategy: kept out of nav and sitemap and set to noindex until
    // local proof and lead data justify promoting it.
    hidden: true,
    pricing: "Business website projects start at CAD $1,500.",
    offersFrom: 1500,
    title: "Web Design Vaughan",
    metaTitle: "Web Design Vaughan | Mintek Software",
    metaDescription:
      "Web design for Vaughan businesses. Mintek Software builds fast, mobile-friendly, conversion-focused websites. Based in Brampton, serving Vaughan and the GTA.",
    short: "Conversion-focused websites for Vaughan businesses.",
    hero: "Web design for Vaughan businesses.",
    problem:
      "Vaughan businesses need a credible, fast website that generates enquiries from local searches.",
    solution:
      "We build fast, mobile-first websites for Vaughan businesses. Based in Brampton, with in-person meetings available across the GTA.",
    process: [
      "Strategy: define audience and goals.",
      "Design: mobile-first layouts.",
      "Build: fast, SEO-ready code.",
      "Launch: search setup and handover.",
    ],
    tech: ["React", "Vite", "Analytics"],
    outcome: "A fast, credible Vaughan website built to convert.",
    relatedServices: ["website-development", "web-design-brampton"],
    relatedCaseStudies: [],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
export const publicServices = services.filter((s) => !s.hidden);
export const homepageServices = services
  .filter((s) => s.showOnHomepage)
  .sort((a, b) => (a.order || 99) - (b.order || 99));
export const servicesByGroup = (group) =>
  publicServices.filter((s) => s.group === group);

// ---------------------------------------------------------------------------
// Case studies (each becomes /case-studies/<slug>)
// kind: client | product | internal | prototype | concept
// metrics: [{ label, value }] - only entries with a value are rendered publicly;
//          null values are reminders for the owner to confirm and fill in later.
// ---------------------------------------------------------------------------
export const caseStudies = [
  {
    slug: "parking-marketplace-platform",
    kind: "product",
    label: "Marketplace Platform",
    homepageOrder: 1,
    title: "Building a Map-First Parking Marketplace for Canadian Cities",
    client: "Rent a Parking",
    year: "2024",
    metaTitle: "Case Study: Map-First Parking Marketplace | Mintek Software",
    metaDescription:
      "How Mintek Software designed and built Rent a Parking, a map-first, location-based marketplace for renting unused parking spaces across Canadian cities.",
    shortDescription:
      "A map-first parking marketplace with location search, listings and geographic filtering, built with React, TypeScript, Node and Mapbox.",
    summary:
      "Rent a Parking is a location-based marketplace that lets people rent out unused driveways, garages and parking spots. Purpose-built for parking, it prioritises a map-first experience so users explore listings visually, filter by location and connect with space owners. Mintek designed and built the platform with a React and TypeScript front end, Node-based services and Mapbox integration, with structured listing data intended to scale across Canadian cities.",
    problem:
      "Finding and listing parking is fragmented and manual. The platform needed map-based discovery, fast location search and listing management that could scale across multiple cities while remaining discoverable in search.",
    solution:
      "Mintek built a map-first marketplace: interactive Mapbox discovery, location search and geographic filtering, listing creation and management, price display and structured listing data designed for marketplace SEO and multi-city expansion.",
    services: [
      "custom-software-development",
      "web-application-development",
      "marketplace-development",
      "custom-software-development-toronto",
    ],
    features: [
      "Map-first discovery: interactive Mapbox interface with real-time filtering",
      "Location search and geographic filtering by proximity and area",
      "Listing management portal for space owners",
      "Price display and structured listing data",
      "Marketplace SEO foundations for indexable listing and city pages",
      "Responsive application design across devices",
    ],
    results: [
      "Reached 100+ listings across urban neighbourhoods",
      "Grew entirely through organic channels with zero marketing spend",
      "Built on a scalable foundation intended to expand across Canadian cities",
    ],
    metrics: [
      { label: "Listings", value: "100+" },
      { label: "Daily active users (early peak)", value: "10" },
      { label: "Cities", value: null },
      { label: "Monthly visitors", value: null },
      { label: "Organic-search impressions", value: null },
      { label: "Indexed city pages", value: null },
      { label: "Listing view to enquiry", value: null },
      { label: "Returning users", value: null },
      { label: "Development timeline", value: null },
    ],
    techStack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Mapbox GL JS"],
    status: "Live",
    liveUrl: null,
    previewUrl: "http://rentaparking.ca",
    githubUrl: null,
  },
  {
    slug: "google-sheets-event-discovery-app",
    kind: "client",
    label: "Data-Driven Web Application",
    homepageOrder: 2,
    title: "Building a Google Sheets-Powered Event Discovery Web App",
    client: "LaaL Button",
    year: "2023",
    metaTitle: "Case Study: Google Sheets Event Discovery App | Mintek Software",
    metaDescription:
      "How Mintek Software built a read-only, Google Sheets-powered event-discovery web app for LaaL Button, letting non-technical staff publish events without a developer.",
    shortDescription:
      "A read-only event-discovery web app powered by Google Sheets, with registration handled externally on Eventbrite.",
    summary:
      "Mintek created a data-driven React application connected to Google Sheets. Event information could be maintained through a familiar spreadsheet, while website visitors received a structured, responsive event-discovery experience. Registration links directed visitors to Eventbrite.",
    problem:
      "LaaL Button needed a simple way to publish and update event information without requiring developers to edit the website whenever an event changed.",
    solution:
      "Mintek built a read-only React application that reads event data live from Google Sheets and presents it in a responsive discovery interface. Staff manage everything from a spreadsheet, and each event links out to Eventbrite where registration is completed. There is no user login, in-app registration, ticketing or payment processing in the app itself.",
    services: [
      "website-development",
      "google-sheets-website-development",
      "custom-software-development",
    ],
    features: [
      "Public event discovery with a structured, responsive listing interface",
      "Read-only event listings rendered live from Google Sheets",
      "Non-technical staff update events through a familiar spreadsheet, no developer required",
      "Each listed event links out to Eventbrite, where registration is completed",
      "Fast, lightweight front end with no custom backend to maintain",
    ],
    results: [
      "Staff can publish and update events themselves without developer involvement",
      "Event changes appear on the site as soon as the spreadsheet is updated",
      "Consistent, mobile-friendly presentation of every event",
      "No CMS, logins or plugins to maintain",
    ],
    metrics: [
      { label: "Events published", value: null },
      { label: "Eventbrite outbound clicks", value: null },
      { label: "Website visitors", value: null },
      { label: "Time to publish an event (before vs after)", value: null },
      { label: "Staff able to manage listings", value: null },
    ],
    techStack: ["React", "Google Sheets API", "Amplitude"],
    status: "Live",
    liveUrl: "https://laalbutton.com/",
    previewUrl: null,
    githubUrl: null,
    // Internal reminder (never rendered): what Mintek did NOT build here.
    internalExclusions: [
      "No user authentication or accounts",
      "No in-app event registration or ticket purchasing",
      "No performer registration",
      "No payment processing",
      "No custom administrative dashboard",
      "Registration handled externally on Eventbrite",
    ],
  },
  {
    slug: "pawpals",
    kind: "client",
    label: "Lead-Generation Website",
    homepageOrder: 3,
    title: "Creating a Brampton Dog Daycare Website and Waitlist Funnel",
    client: "PawPals",
    year: "2024",
    metaTitle: "Case Study: Brampton Dog Daycare Website | Mintek Software",
    metaDescription:
      "How Mintek Software built a Brampton dog daycare website with a waitlist funnel designed to turn local mobile traffic into qualified enquiries.",
    shortDescription:
      "A Brampton dog daycare website with a waitlist funnel built to convert local, mobile visitors into enquiries.",
    summary:
      "PawPals is a Brampton dog daycare. Mintek designed and built a fast, mobile-first website with a clear waitlist funnel, focused on converting local searches into qualified enquiries.",
    problem:
      "A new local daycare needed to build demand before opening and capture interested pet owners in a structured waitlist rather than scattered messages.",
    solution:
      "Mintek built a mobile-first lead-generation website with a focused waitlist funnel, clear calls to action and local SEO foundations for Brampton searches.",
    services: ["website-development", "web-design-brampton"],
    features: [
      "Mobile-first design tuned for local, on-the-go visitors",
      "Waitlist funnel with a focused signup flow",
      "Clear calls to action throughout the page",
      "Local SEO foundations for Brampton searches",
    ],
    results: [
      "Launched a focused waitlist funnel to capture early demand",
    ],
    metrics: [
      { label: "Waitlist submissions", value: null },
      { label: "Form conversion rate", value: null },
      { label: "Monthly visitors", value: null },
      { label: "Mobile traffic share", value: null },
      { label: "Launch date", value: null },
    ],
    techStack: ["React", "Vite", "Analytics"],
    status: "Live",
    liveUrl: "https://pawpals.online/",
    previewUrl: null,
    githubUrl: null,
  },
  {
    slug: "doaba-junction",
    kind: "client",
    label: "Restaurant Website",
    homepageOrder: 4,
    title: "Restaurant Website Design for Doaba Junction",
    client: "Doaba Junction",
    year: "2024",
    metaTitle: "Case Study: Doaba Junction Restaurant Website | Mintek Software",
    metaDescription:
      "How Mintek Software designed a mobile-first restaurant website for Doaba Junction, focused on menu presentation, calls, directions and catering enquiries.",
    shortDescription:
      "A mobile-first restaurant website focused on menu presentation, calls, directions and catering enquiries.",
    summary:
      "Doaba Junction is a restaurant client. Mintek designed a mobile-first website focused on menu presentation, click-to-call, directions, business hours and catering enquiries, with Google Maps and local search information built in.",
    problem:
      "Diners decide on their phones. Doaba Junction needed a website that made the menu, hours, location and contact options instantly accessible on mobile.",
    solution:
      "Mintek built a menu-first, mobile-friendly website with click-to-call, Google Maps directions, clear business hours, catering enquiries and conversion-focused calls to action.",
    services: ["website-development", "restaurant-website-design", "web-design-toronto"],
    features: [
      "Menu presentation optimised for mobile",
      "Click-to-call and Google Maps directions",
      "Business hours and catering enquiry prompts",
      "Local search information and conversion-focused calls to action",
    ],
    results: [
      "A mobile-first restaurant site built around calls, directions and catering enquiries",
    ],
    metrics: [
      { label: "Monthly visitors", value: null },
      { label: "Calls / directions taps", value: null },
      { label: "Catering enquiries", value: null },
    ],
    techStack: ["React", "Vite", "Google Maps"],
    status: "Live",
    liveUrl: "https://v0-restaurant-website-mvp-mu.vercel.app/",
    previewUrl: null,
    githubUrl: null,
  },
  {
    slug: "relax-cafe",
    kind: "client",
    label: "Hospitality Website",
    homepageOrder: 5,
    title: "Cafe Website Design for an Australian Hospitality Business",
    client: "Relax Cafe",
    year: "2024",
    metaTitle: "Case Study: Australian Cafe Website Design | Mintek Software",
    metaDescription:
      "How Mintek Software designed a mobile-first cafe website for an Australian hospitality business, with menu presentation, location and brand-led visuals.",
    shortDescription:
      "A mobile-first cafe website for an Australian hospitality business, demonstrating international client delivery.",
    summary:
      "Relax Cafe is a hospitality business based in Australia. Mintek designed a mobile-first cafe website with clear menu presentation, location and contact details and brand-led visuals, demonstrating international client delivery.",
    problem:
      "The cafe needed a clean, mobile-first website that presented its menu and brand well and made location and contact details easy to find.",
    solution:
      "Mintek delivered a responsive cafe website with menu presentation, location and contact information and a visual design aligned to the cafe's brand.",
    services: ["website-development", "restaurant-website-design"],
    features: [
      "Menu presentation with a clean, appetising layout",
      "Mobile-first responsive design",
      "Location and contact presentation",
      "Visual brand implementation",
    ],
    results: [
      "Delivered for an international (Australian) hospitality client",
    ],
    metrics: [],
    techStack: ["React", "Vite"],
    status: "Live",
    liveUrl: "https://cafe-website-australia.vercel.app/",
    previewUrl: null,
    githubUrl: null,
    // Not GTA-local: do not use as local proof for Brampton/Mississauga/Vaughan/Toronto.
    note:
      "Relax Cafe is based in Australia and demonstrates international delivery; it is not used as local Greater Toronto Area proof.",
  },
  {
    slug: "aloe-accounting",
    kind: "concept",
    label: "Design Concept",
    homepageOrder: 6,
    title: "Accounting Website Design Concept",
    client: "ALOE Accounting",
    year: "2024",
    metaTitle: "Design Concept: Accounting Website | Mintek Software",
    metaDescription:
      "A self-initiated accounting website design concept by Mintek Software, illustrating how a professional services firm could present its services online.",
    shortDescription:
      "A self-initiated design concept for an accounting firm website. Not a completed client engagement.",
    summary:
      "ALOE Accounting is a self-initiated design concept, not a completed client engagement. It illustrates how a professional services firm could present its services, credibility and calls to action online.",
    problem:
      "A concept exploring how an accounting firm could present services and build trust online.",
    solution:
      "A design concept showing structure, services presentation and conversion-focused layout for a professional accounting firm.",
    services: ["website-development"],
    features: [
      "Concept layout for services presentation",
      "Trust and credibility structure",
      "Conversion-focused calls to action",
    ],
    results: [],
    metrics: [],
    techStack: ["React", "Vite"],
    status: "Concept",
    liveUrl: "https://v0-modern-design-mockups-sandy.vercel.app/",
    previewUrl: null,
    githubUrl: null,
  },
  {
    slug: "restaurant-online-ordering-system",
    kind: "client",
    label: "Custom Software",
    homepageOrder: null,
    title: "Restaurant Online Ordering System",
    client: "Airport Sweets and Tandoori",
    year: "2022",
    metaTitle: "Case Study: Restaurant Online Ordering System | Mintek Software",
    metaDescription:
      "How Mintek Software built a custom online ordering system with Stripe payments and SMS marketing for a Brampton restaurant, driving up to 705% ROI in a month.",
    shortDescription:
      "A fully custom online ordering system with integrated payments, real-time order management, and SMS marketing.",
    summary:
      "In 2022, we partnered with Airport Sweets and Tandoori, a Brampton restaurant that needed a robust online ordering system. We built a fully custom solution that eliminated third-party commissions and gave the restaurant control over payments, real-time order management and SMS-based marketing with a clean, mobile-first design.",
    problem:
      "The restaurant was losing margin to third-party ordering commissions and had no direct control over orders or customer relationships.",
    solution:
      "Mintek built a custom online ordering system with secure Stripe payments, a real-time admin dashboard, order tracking and SMS retargeting driven by call-history analytics.",
    services: ["custom-software-development", "business-automation"],
    features: [
      "Real-time online ordering with cart, tracking and payments",
      "Secure Stripe integration with promo-code handling",
      "Customer behaviour analytics from call history",
      "SMS retargeting campaigns targeting top callers",
      "Admin dashboard for menu, orders and offers",
    ],
    results: [
      "684 customer calls in November alone, up from an average of 523",
      "ROI of up to 705% in November depending on profit-per-order scenario",
      "323 customers placed at least one order, with 18 ordering 3+ times",
      "173 out of 290 orders occurred during promotional periods",
    ],
    metrics: [
      { label: "Peak monthly calls", value: "684" },
      { label: "Max monthly ROI", value: "705%" },
      { label: "Customers who ordered", value: "323" },
    ],
    techStack: ["React", "Node.js", "Express", "SQL", "Stripe", "SMS API", "Google Analytics"],
    status: "Completed",
    liveUrl: null,
    previewUrl: null,
    githubUrl: null,
  },
];

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
// Homepage portfolio: ordered projects that convey the full range of work.
export const homepageCaseStudies = caseStudies
  .filter((c) => c.homepageOrder != null)
  .sort((a, b) => a.homepageOrder - b.homepageOrder);
// Case studies index order: homepage-ordered first, then the rest.
export const orderedCaseStudies = [
  ...homepageCaseStudies,
  ...caseStudies.filter((c) => c.homepageOrder == null),
];

// Renamed slugs -> used for 301 redirects.
export const caseStudyRedirects = [
  { from: "map-first-parking-marketplace", to: "parking-marketplace-platform" },
  { from: "google-sheets-powered-website", to: "google-sheets-event-discovery-app" },
];

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
export const navGroups = [
  { heading: null, links: [{ name: "Home", path: "/" }] },
  {
    heading: "Services",
    links: [
      ...servicesByGroup("software").map((s) => ({ name: s.title, path: `/${s.slug}` })),
      ...servicesByGroup("data").map((s) => ({ name: s.title, path: `/${s.slug}` })),
      ...servicesByGroup("website").map((s) => ({ name: s.title, path: `/${s.slug}` })),
    ],
  },
  {
    heading: "Locations",
    links: servicesByGroup("local").map((s) => ({ name: s.title, path: `/${s.slug}` })),
  },
  {
    heading: "Company",
    links: [
      { name: "Case Studies", path: "/case-studies" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
    ],
  },
];

export const footerNav = [
  {
    heading: "Software & Apps",
    links: servicesByGroup("software").map((s) => ({ name: s.title, path: `/${s.slug}` })),
  },
  {
    heading: "Data & Websites",
    links: [
      ...servicesByGroup("data").map((s) => ({ name: s.title, path: `/${s.slug}` })),
      ...servicesByGroup("website").map((s) => ({ name: s.title, path: `/${s.slug}` })),
    ],
  },
  {
    heading: "Locations",
    links: servicesByGroup("local").map((s) => ({ name: s.title, path: `/${s.slug}` })),
  },
  {
    heading: "Company",
    links: [
      { name: "Case Studies", path: "/case-studies" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
    ],
  },
];
