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
  // Public scheduler for discovery calls. All "Book a discovery call" CTAs
  // point here — never invent a second booking destination.
  bookingUrl: "https://bookme-web.onrender.com/mintek-software",
  logo: "/og-image.webp",
  ogImage: "/og-image.webp",
  address: {
    // Must match Google Business Profile / Maps exactly (NAP).
    street: "233 Mountainberry Rd",
    locality: "Brampton",
    region: "ON",
    regionName: "Ontario",
    postalCode: "L6R 1W3",
    country: "CA",
    countryName: "Canada",
    formatted: "233 Mountainberry Rd, Brampton, ON L6R 1W3",
  },
  areaServed: [
    "Brampton",
    "Mississauga",
    "Toronto",
    "Vaughan",
    "Greater Toronto Area",
    "Ontario",
  ],
  // Google Business Profile / Maps listing. Used on /contact, hasMap and sameAs.
  placeId: "ChIJ6cEXlgKG4aQR3MG_z_YD3X8",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Mintek%20Software&query_place_id=ChIJ6cEXlgKG4aQR3MG_z_YD3X8",
  // Official /maps/embed?pb= URL (place_id + output=embed 404s and will not iframe).
  mapsEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.5!2d-79.7278208!3d43.7563589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa4e186029617c1e9%3A0x7fdd03f6cfbfc1dc!2sMintek%20Software!5e0!3m2!1sen!2sca!4v1",
  geo: {
    latitude: 43.7563589,
    longitude: -79.7278208,
  },
  social: {
    // Add real profiles when available; used in Organization schema `sameAs`.
    linkedin: "",
    github: "",
  },
  foundingYear: 2022,
};

// ---------------------------------------------------------------------------
// Client onboarding funnel.
//
// The onboarding app is a SEPARATE, already-deployed static site that collects
// the details we need to design and launch a client's website. It sits AFTER
// trust is built on this marketing site: Google -> /web-design-brampton ->
// trust content -> "Tell us about your project" (/start-a-project) -> the
// matching external onboarding form -> we review -> discovery call.
//
// We do NOT embed these forms. /start-a-project is a Mintek-branded transition
// page that routes an owner to the right form. The `blurb` copy for each
// industry is drawn from what the forms actually collect (see the onboarding
// app's assets/industries/*.js) so nothing is invented.
export const onboarding = {
  // Selector/hub that lists every form (fallback for "not sure").
  selectorUrl: "https://mintek-client-onboarding.onrender.com/",
  industries: [
    {
      id: "law",
      label: "Law firm",
      to: "https://mintek-client-onboarding.onrender.com/law/",
      blurb:
        "Firm details and practice areas, per-lawyer profiles (LSO directory listing, year called, bio, languages), booking and Clio links, and a short LSO advertising-compliance check.",
    },
    {
      id: "accounting",
      label: "Accounting / CPA firm",
      to: "https://mintek-client-onboarding.onrender.com/accounting/",
      blurb:
        "Firm and services, team credentials (CPA designations and CPA Ontario profile), your client portal and accounting software, brand direction, and a CPA Ontario compliance note.",
    },
    {
      id: "dental",
      label: "Dental practice",
      to: "https://mintek-client-onboarding.onrender.com/dental/",
      blurb:
        "Practice and treatments, whether you're accepting new patients, insurance and payment, team listings (RCDSO, specialty), online booking software, and RCDSO advertising compliance.",
    },
    {
      id: "general",
      label: "Other business",
      to: "https://mintek-client-onboarding.onrender.com/general/",
      blurb:
        "A lighter starting point for any local or professional business: what you do, your services and team, brand direction, files, and access. The right choice when the others don't fit.",
    },
  ],
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

export const postalAddressSchema = () => ({
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
});

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
    "Under $3,000",
    "$3,000 – $10,000",
    "$10,000 – $30,000",
    "$30,000+",
    "Not sure",
  ],
};

// Contact-form project types. `budgetType` selects which budget list to show.
// Order matches the site's positioning: software and automation first.
export const projectTypes = [
  { value: "custom-software", label: "Custom software", budgetType: "software" },
  { value: "automation", label: "Business automation", budgetType: "automation" },
  { value: "website", label: "Website development", budgetType: "website" },
  { value: "web-application", label: "Web application", budgetType: "software" },
  { value: "other", label: "Other / not sure", budgetType: "general" },
];

// Maps a service slug to a contact-form project type (for ?service= prefill).
export const projectTypeForService = (slug) => {
  if (!slug) return "";
  if (/custom-software|mobile-app/.test(slug)) return "custom-software";
  if (/automation/.test(slug)) return "automation";
  if (/marketplace|web-application/.test(slug)) return "web-application";
  if (/website|web-design|google-sheets|restaurant-website/.test(slug)) return "website";
  return "other";
};

// Canonical GTA website cost bands. Single source of truth shared by the
// web-design-brampton "Packages at a glance" section and the "Scope your site"
// tool's recommendation, so the published ranges never drift apart.
export const websitePricingBands = [
  {
    name: "Starter site",
    price: "CAD $1,500 – $3,000",
    fit: "New or small Brampton businesses that need a proper first site.",
    includes:
      "Homepage, services, about and a working contact path; mobile-first layout; click-to-call; on-page SEO foundations; analytics. Content and photos usually supplied by you.",
  },
  {
    name: "Established presence",
    price: "CAD $3,000 – $6,000",
    fit: "Businesses that need more pages, stronger local content, or a redesign that is still a marketing site.",
    includes:
      "More templates (services, locations, proof), richer on-page SEO, a blog if you will actually use it, and a more tailored design. Same ownership and handover.",
  },
  {
    name: "Custom or hospitality-led",
    price: "CAD $6,000+",
    fit: "Menus and location-heavy restaurant sites, booking-style flows, or sites that start behaving like applications.",
    includes:
      "Scoped after a short conversation. Restaurant sites start at CAD $1,500 when they stay menu-and-enquiry focused; online ordering, logins or marketplaces are quoted as software, not as a brochure upgrade.",
  },
];

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
    navLabel: "Custom Software",
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
      "bookme-scheduling-platform",
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
    navLabel: "Web Applications",
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
      "bookme-scheduling-platform",
    ],
  },
  {
    slug: "website-development",
    scopeTool: true,
    icon: "Language",
    color: "#FF3D85",
    group: "website",
    showOnHomepage: true,
    order: 4,
    budgetType: "website",
    pricing: "Business website projects start at CAD $1,500.",
    offersFrom: 1500,
    title: "Website Development",
    navLabel: "Websites",
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
      "small-business-website-design-brampton",
      "web-design-services-brampton",
    ],
    anchorText: "Website development",
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
    navLabel: "Marketplace",
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
    navLabel: "Google Sheets Websites",
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
    navLabel: "Spreadsheets",
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
      "Automation projects can be delivered as standalone workflows or integrated into your existing business systems.",
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
    navLabel: "Mobile Apps",
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
    navLabel: "Custom Software (Toronto)",
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
    navLabel: "Automation (Toronto)",
    metaTitle: "Business Automation Toronto | Mintek Software",
    metaDescription:
      "Business process automation for Toronto and GTA companies. Mintek Software automates reporting, data syncing and manual workflows to save hours every week.",
    short:
      "Automate manual workflows for Toronto and GTA businesses.",
    hero: "Business automation for Toronto & GTA businesses.",
    problem:
      "Established Toronto and GTA operators such as trades, clinics, property managers, wholesalers and professional-services firms often run on a patchwork of spreadsheets, email inboxes and off-the-shelf tools that were never connected. Staff re-key the same order, invoice or client record into three systems, month-end reporting eats a full day, and details slip through when someone is out. As the business grows, that manual overhead scales with headcount instead of shrinking.",
    solution:
      "We work with Toronto and GTA businesses in person, on-site where it helps, to map the actual day-to-day workflow before writing a line of code. Because we are based in Brampton, we can sit down with your team in Toronto, Mississauga, Vaughan or Markham to watch how quotes, dispatch, intake or reconciliation really happen, then automate the highest-cost steps: syncing your CRM with QuickBooks, turning inbox requests into tracked jobs, auto-generating the reports a GTA operations manager rebuilds by hand each week, and wiring your existing tools together with monitored integrations. We start with a small, clearly scoped process so you see a payback before committing to a larger rollout.",
    process: [
      "Audit: meet on-site or over a call to map the real GTA workflow and measure where hours and errors accumulate.",
      "Prioritize: target the automations with the fastest local payback and lowest disruption to your team.",
      "Build: connect your existing tools with reliable, monitored workflows and integrations.",
      "Measure: track hours saved and error rates after launch, and iterate on the next process.",
    ],
    tech: ["Node.js", "REST APIs", "Webhooks", "SQL", "Cloud Functions", "Google Sheets API", "QuickBooks API"],
    outcome:
      "Your team stops re-keying data between systems, month-end reporting drops from hours to minutes, and operations keep running the same way whether or not a key person is in that day, with a local partner you can meet face to face when something needs a change.",
    relatedServices: ["business-automation", "spreadsheet-automation", "custom-software-development-toronto"],
    relatedCaseStudies: ["restaurant-online-ordering-system"],
  },
  {
    slug: "web-design-brampton",
    icon: "Language",
    color: "#FF3D85",
    group: "local",
    budgetType: "website",
    layout: "commercial",
    // Brampton-only, config-driven contact for the scope tool. First person and
    // plain on purpose (the founder is Brampton-local and speaks these
    // languages) — reword these to taste; they render only on this page.
    // Channels drive both the intro line and the result-screen CTAs. Numbers
    // come from site.phone. Add "sms" later to surface an SMS link.
    scopeContact: {
      note: "I'm local to Brampton and happy to talk it through in Punjabi, Hindi or English.",
      channels: ["whatsapp", "call"],
    },
    hideTech: true,
    hideOutcome: true,
    proofPlacement: "early",
    // Renders the interactive "Scope your site" tapthrough mid-page (see
    // ScopeToolSection). Opt-in so it only appears on this hub, not every service.
    scopeTool: true,
    pricing: "Small-business website projects start at CAD $1,500.",
    offersFrom: 1500,
    title: "Web Design Brampton",
    navLabel: "Brampton",
    anchorText: "Web design in Brampton",
    metaTitle: "Web Design Brampton | Mintek Software",
    metaDescription:
      "Web Design Brampton for GTA businesses. Mintek Software delivers practical, results-focused work — get a clear, fixed-scope quote.",
    short:
      "Mintek is a Brampton software company that builds business websites. The work covers how the site looks, how it performs, how it gets found, and what happens when you need it to do more later.",
    hero: "Web design in Brampton for small businesses",
    heroCtas: [
      { type: "estimate", variant: "contained" },
    ],
    schemaTypes: ["ProfessionalService"],
    schemaAreaServed: ["Brampton"],
    localAreas: [
      "Downtown Brampton", "Bramalea", "Heart Lake", "Springdale",
      "Mount Pleasant", "Castlemore", "Fletcher's Meadow", "Sandalwood",
    ],
    problem:
      "A Brampton small business can lose a potential customer in the seconds after someone searches on a phone: a slow page, a buried phone number, hours that do not match Google, or a template that looks like every other website in Peel. Trades, clinics, daycares, independent restaurants and professional-service firms here compete on trust and convenience, not on having a website for its own sake. Many owners already paid once for a builder site that is painful to update and invisible for the searches that actually matter — “near me,” a neighbourhood name, or a service plus Brampton.",
    solution:
      "We are based in Brampton, so the work starts with how local customers actually decide: tap to call, get directions, join a waitlist, check a menu, or send a catering enquiry. We design and build fast, mobile-first sites with clear next steps, on-page local SEO (titles, headings, NAP consistency, crawlable pages) and analytics. You own the site when it is paid for. In-person meetings are available across the city. Because we also build software, the same team can later add booking, ordering or other integrations if the business actually needs them — without starting over with a new vendor. For the long-tail searches people use when they are ready to hire, see our pages on small business website design in Brampton, web design services in Brampton, and website hosting in Brampton — they sit under this hub rather than repeating it.",
    process: [
      "Strategy: name the local audience, the pages that earn their keep, and how we will know the first version is done.",
      "Design: mobile-first layouts, with the primary action where a thumb actually lands.",
      "Build: fast, accessible, SEO-ready code with analytics — not a bloated page-builder export.",
      "Launch: Google Business Profile alignment, handover, and optional hosting and support so the site stays yours.",
    ],
    tech: ["React", "Vite", "Analytics"],
    outcome:
      "A professional, fast Brampton website that turns local searches into enquiries, with a local team you can meet in person and a technical owner if the site needs to grow.",
    proofOverline: "WORK",
    proofTitle: "Websites we have actually built",
    proofIntro:
      "A few examples of work we've built for local businesses, from focused marketing sites to custom ordering software.",
    differentiatorOverline: "WHY MINTEK",
    differentiatorTitle: "Not just another Brampton web design company",
    differentiatorIntro:
      "Our engineering background changes how we approach a website. Visual design still matters, but so do performance, structure, search foundations, analytics, and whether you can keep the site without being locked to a page builder.",
    differentiators: [
      {
        title: "Performance customers can feel",
        body: "A site that takes too long on a phone loses the visit before the offer lands. We treat load time and mobile layout as part of the design, not a later cleanup.",
      },
      {
        title: "Technical quality you own",
        body: "You get a site built to be handed over: code, hosting accounts and a clear way to update it. You are not renting a template you cannot take with you.",
      },
      {
        title: "SEO foundations, not keyword stuffing",
        body: "Titles, headings, crawlable pages, consistent name-address-phone details, and a structure search engines can read.",
      },
      {
        title: "Analytics, integrations and a longer path",
        body: "We install analytics so you can see whether calls and forms actually happen. If you later need booking, ordering or a connection to existing software, that is the same kind of work we already do.",
      },
    ],
    outcomesOverline: "OUTCOMES",
    outcomesTitle: "What the website should do for the business",
    outcomesIntro:
      "A Brampton website is doing its job when a nearby customer can take the next step without hunting for it.",
    customerOutcomes: [
      {
        title: "Calls, bookings and enquiries",
        body: "Click-to-call, waitlists, forms and a clear next step on a phone — the number, the list, or the request, within a thumb-reach.",
      },
      {
        title: "Ordering when a brochure is not enough",
        body: "A marketing site can stop at menu, hours and directions. When third-party ordering adds friction or commissions, we can build ordering and payments into the website as a separate, scoped piece of software.",
      },
      {
        title: "Credibility and easier management",
        body: "A fast, specific site looks like a real business. Sensible content management means you should not need a developer for routine hours, menu or service updates.",
      },
      {
        title: "Local visibility",
        body: "A crawlable site with solid local SEO foundations gives a Brampton business a strong starting point in search. Rankings still depend on competition, reviews and the rest of your online presence.",
      },
    ],
    enquiryOverline: "NEXT STEPS",
    enquiryTitle: "What happens after you contact us",
    enquiryIntro:
      "Starting a conversation is a scoping step, not a purchase. We confirm what you need and what it will cost before any build starts.",
    enquirySteps: [
      {
        title: "Tell us about your business",
        body: "What you do, who you serve in Brampton or nearby, and whether you already have a site.",
      },
      {
        title: "We review the current situation",
        body: "If there is an existing site we look at structure, speed and content. If there is not, we start from the job the first version must do.",
      },
      {
        title: "We recommend what you actually need",
        body: "A focused marketing site, a rebuild, or software such as booking or ordering. We will say so if a cheaper, smaller first version is enough.",
      },
      {
        title: "Clear scope and price",
        body: "You get a written scope and a fixed quote for that version, including what sits outside it.",
      },
      {
        title: "Build, launch and optional support",
        body: "Once you approve the scope, we build, launch with HTTPS, and hand over the accounts. Ongoing updates and hosting support are available; they are not required to keep the site.",
      },
    ],
    pricingNote:
      "The starting price is for a focused marketing site. Projects cost more when the work is larger. These are the usual drivers — we quote the actual scope after a short conversation.",
    pricingDrivers: [
      "Number of pages and how much unique content they need",
      "Custom design versus a tighter, reusable layout",
      "Booking, ordering, logins or other custom functionality",
      "Integrations with existing software or payment tools",
      "Who writes and supplies photos versus copy we help structure",
      "Depth of on-page SEO and local content",
      "Ongoing support after launch",
    ],
    pricingCtaLabel: "Get a website estimate",
    inlineCtas: {
      afterWhy: {
        title: "Want this approach on your site?",
        body: "Send a short project brief and we'll come back with a recommendation and a clear price for that scope.",
        primaryLabel: "Get a website estimate",
        primaryType: "estimate",
      },
      afterNext: {
        title: "Ready to talk about your website?",
        body: "Get a website estimate and we'll recommend a clear first version.",
        primaryLabel: "Get a website estimate",
        primaryType: "estimate",
      },
    },
    researchTeaser: {
      overline: "RESEARCH",
      title: "We studied 93 Brampton business websites",
      body:
        "In 2026 we measured independently operated Brampton business homepages in the lab so we could talk about local websites from evidence: speed, mobile experience, and whether basic local markup is even present. The figures below are from that study, not from a ranking report.",
      ctaLabel: "Read the Brampton Website Study",
      to: "/research/brampton-business-websites-2026",
    },
    ctaTitle: "Ready to talk about your website?",
    ctaSubtitle:
      "Get a website estimate and we'll recommend a clear first version.",
    audiences: [
      {
        title: "Trades and home services",
        body: "Electricians, HVAC, landscapers and similar crews need click-to-call, service lists that match how people search, and a site that loads in a driveway on a phone — not a 12-page brochure.",
      },
      {
        title: "Clinics, studios and professional services",
        body: "Dentists, physio, accountants and consultants need credibility, clear services, and an enquiry path that does not dump people into a generic contact form with no context.",
      },
      {
        title: "Daycares, pet care and local consumer services",
        body: "Capacity is often the constraint. PawPals, a Brampton dog daycare, needed a waitlist funnel and local SEO foundations so nearby owners could enquire before opening — not a blog they would never write.",
      },
      {
        title: "Independent restaurants and cafes",
        body: "Diners decide on phones. Menu, hours, maps and catering have to work in one thumb-reach. Doaba Junction is the restaurant example; a custom ordering system is a separate, larger project when commissions actually hurt.",
      },
    ],
    packages: websitePricingBands,
    extraSections: [
      {
        overline: "LONG-TAIL",
        title: "Small business website design in Brampton",
        body: "If you are searching that phrase, you are usually comparing a local studio with a builder template. The decision is whether the site will generate enquiries from nearby searches, not whether it has a slider. We build focused first versions from CAD $1,500 and expand only when the extra pages earn their keep.",
        links: [
          {
            to: "/small-business-website-design-brampton",
            label: "Small business website design in Brampton",
          },
        ],
      },
      {
        overline: "SERVICES",
        title: "Web design services in Brampton",
        body: "The hub is the location page. The services around it are specific jobs: a new marketing site, a restaurant site, a Google Sheets–updated site, a rebuild, or local SEO on what you already have. Pick the job, not a generic “web design package” that hides the scope.",
        links: [
          {
            to: "/web-design-services-brampton",
            label: "Web design services in Brampton",
          },
        ],
      },
      {
        overline: "LAUNCH",
        title: "Website hosting in Brampton",
        body: "Hosting is not a separate product we resell with invented monthly fees. When we launch a site we deploy it, put HTTPS in place, and hand over the accounts so you are not locked to a proprietary platform. Domain, DNS and ongoing updates are planned in the open.",
        links: [
          {
            to: "/website-hosting-brampton",
            label: "Website hosting in Brampton",
          },
        ],
      },
    ],
    relatedServices: [
      "website-development",
      "restaurant-website-design",
      "small-business-website-design-brampton",
      "web-design-services-brampton",
      "website-hosting-brampton",
    ],
    relatedCaseStudies: ["aloe-accounting", "restaurant-online-ordering-system", "pawpals"],
    relatedPosts: [
      "how-many-brampton-business-websites-make-it-easy-to-call",
      "how-much-does-a-brampton-business-website-need-to-load",
      "why-are-brampton-business-websites-so-slow",
      "comparing-web-design-companies-in-brampton",
      "how-to-choose-a-web-designer-in-brampton",
      "how-local-seo-works-for-gta-service-businesses",
      "how-much-does-a-business-website-cost-in-the-gta",
      "brampton-small-business-website-checklist",
    ],
  },
  {
    slug: "small-business-website-design-brampton",
    scopeTool: true,
    icon: "Language",
    color: "#FF3D85",
    group: "local",
    budgetType: "website",
    pricing: "Small-business website projects start at CAD $1,500.",
    offersFrom: 1500,
    title: "Small Business Website Design Brampton",
    navLabel: "Small business (Brampton)",
    anchorText: "Small business website design in Brampton",
    metaTitle: "Small Business Website Design Brampton | Mintek Software",
    metaDescription:
      "Small business website design in Brampton: a focused, mobile-first site from CAD $1,500 that turns local searches into calls and enquiries. Built by a Brampton studio.",
    short:
      "Focused first websites for Brampton small businesses — built to convert local searches, not to look like a template.",
    hero: "Small business website design in Brampton",
    schemaTypes: ["ProfessionalService"],
    schemaAreaServed: ["Brampton"],
    problem:
      "Owners of Brampton shops, trades, clinics and new storefronts are often told they need “a website” and then handed a theme with stock photos. The site exists, but it does not answer the questions a nearby customer actually has: can I tap to call, are you open, do you do this service, can I get on a list? Paying for pages you will not maintain is how small budgets get wasted.",
    solution:
      "Small business website design, for us, means the smallest set of pages that produces a lead: a clear homepage, what you offer, who you are, and a contact path that works on a phone. We are based in Brampton and can meet in person. Technical SEO, speed and local details are built in, not bolted on. This page is the small-business spoke; the full Brampton practice — packages, neighbourhoods and case studies — lives on our web design in Brampton hub.",
    process: [
      "Scope: agree the pages and the one conversion (call, form, waitlist, directions).",
      "Design: mobile-first, readable, with your real services and location in the copy.",
      "Build: a fast site you own, with analytics so you can see if enquiries actually arrive.",
      "Handover: how to update, how hosting and the domain are set up, and what to do next for local search.",
    ],
    tech: ["React", "Vite", "Analytics"],
    outcome:
      "A first version a Brampton small business can launch without overbuilding, then extend when the extra work is justified.",
    relatedServices: [
      "web-design-brampton",
      "website-development",
      "web-design-services-brampton",
    ],
    relatedCaseStudies: ["pawpals"],
    relatedPosts: [
      "comparing-web-design-companies-in-brampton",
      "brampton-small-business-website-checklist",
      "how-to-choose-a-web-designer-in-brampton",
      "how-much-does-a-business-website-cost-in-the-gta",
    ],
  },
  {
    slug: "web-design-services-brampton",
    scopeTool: true,
    icon: "Language",
    color: "#FF3D85",
    group: "local",
    budgetType: "website",
    pricing: "Business website projects start at CAD $1,500.",
    offersFrom: 1500,
    title: "Web Design Services Brampton",
    navLabel: "Web design services",
    anchorText: "Web design services in Brampton",
    metaTitle: "Web Design Services Brampton | Mintek Software",
    metaDescription:
      "Web design services in Brampton: new sites, rebuilds, restaurant websites, Google Sheets sites and local SEO. Scoped from CAD $1,500 by a Brampton-based studio.",
    short:
      "The specific web design jobs we do for Brampton businesses — not a vague “full service” menu.",
    hero: "Web design services in Brampton",
    schemaTypes: ["ProfessionalService"],
    schemaAreaServed: ["Brampton"],
    problem:
      "“Web design services” is a search people use when they know they need help but not which product to buy. Agencies often answer with a bundled retainer. Small Brampton businesses need a map: new site vs rebuild, restaurant vs professional services, marketing site vs something that updates from a spreadsheet.",
    solution:
      "We list the actual services and send you to the page that matches the job. A standard marketing site is website development. Location-specific small-business work is the Brampton hub. Restaurants get a menu-first build. Frequently changing, non-sensitive content can live in Google Sheets. Local SEO is for visibility after the site is technically sound. Hosting and launch are documented separately so they are not hidden inside a mystery monthly fee.",
    process: [
      "Match the job: new site, rebuild, restaurant, data-driven content, or SEO on an existing site.",
      "Scope a first version with a published starting price where we have one.",
      "Build and launch with ownership and analytics.",
      "Only then talk about extras — ordering systems, apps, or ongoing SEO work.",
    ],
    tech: ["React", "Vite", "Analytics", "Google Sheets API"],
    outcome:
      "You hire for a named service with a clear starting price, instead of a generic web-design bundle.",
    extraSections: [
      {
        overline: "THE MENU",
        title: "Which Brampton web design service you actually need",
        body: "Use this as a filter. If two could apply, start with the smaller marketing site; we will say so if the project is really software.",
        links: [
          { to: "/web-design-brampton", label: "Web design in Brampton (hub)" },
          { to: "/website-development", label: "Website development" },
          { to: "/restaurant-website-design", label: "Restaurant website design" },
          {
            to: "/google-sheets-website-development",
            label: "Google Sheets website development",
          },
          { to: "/local-seo-gta", label: "Local SEO for GTA businesses" },
          { to: "/website-hosting-brampton", label: "Website hosting in Brampton" },
        ],
      },
    ],
    relatedServices: [
      "web-design-brampton",
      "website-development",
      "restaurant-website-design",
      "website-hosting-brampton",
    ],
    relatedCaseStudies: ["pawpals", "doaba-junction"],
    relatedPosts: [
      "comparing-web-design-companies-in-brampton",
      "should-you-redesign-or-rebuild-your-website",
      "how-to-choose-a-web-designer-in-brampton",
    ],
  },
  {
    slug: "website-hosting-brampton",
    icon: "Language",
    color: "#FF3D85",
    group: "local",
    budgetType: "website",
    pricing:
      "Hosting is arranged as part of launch. We do not publish a separate hosting menu or hourly rate.",
    title: "Website Hosting Brampton",
    navLabel: "Hosting (Brampton)",
    anchorText: "Website hosting in Brampton",
    metaTitle: "Website Hosting Brampton | Mintek Software",
    metaDescription:
      "Website hosting in Brampton explained: how Mintek deploys your site, HTTPS, domains and ownership. Launch is part of the build; no invented monthly hosting packages.",
    short:
      "How we host and launch Brampton business websites — deployment, HTTPS and accounts you control.",
    hero: "Website hosting in Brampton, without a lock-in story",
    schemaTypes: ["ProfessionalService"],
    schemaAreaServed: ["Brampton"],
    problem:
      "Hosting is where a cheap website becomes expensive: a proprietary platform, an expired card, no one who knows the DNS, or a site that only the original designer can log into. Brampton owners searching “website hosting Brampton” are usually trying to avoid that, or to understand what they will pay after the build.",
    solution:
      "We are not a generic hosting reseller with a secret monthly price list. When we build your site we deploy it to modern hosting, enable HTTPS, and document the domain and DNS so you (or another developer) can keep it. You own the site once it is paid for. Optional support and content updates are separate from the build, as our GTA website cost guide already states. For what the site itself should do, use the web design in Brampton hub — hosting is the launch and upkeep layer, not a substitute for a converting site.",
    process: [
      "Domain: you register it (or we help); it stays in an account you control.",
      "Deploy: we ship the site to reliable hosting with HTTPS and a sensible cache.",
      "Handover: login paths, DNS notes, and how updates get published.",
      "After launch: optional support if you want us to handle changes; you are not required to stay.",
    ],
    tech: ["HTTPS / TLS", "CDN / static hosting", "DNS", "Analytics"],
    outcome:
      "A live Brampton website on hosting you can actually take with you, with no platform holding the files hostage.",
    note:
      "We do not quote a public monthly hosting fee because it depends on the domain registrar, email, and whether you want ongoing support. Budget for a domain and hosting as running costs; we will itemise them when we scope the project rather than bury them in a vague retainer.",
    relatedServices: [
      "web-design-brampton",
      "website-development",
      "web-design-services-brampton",
    ],
    relatedCaseStudies: ["pawpals"],
    relatedPosts: ["how-much-does-a-business-website-cost-in-the-gta"],
  },
  {
    slug: "web-design-mississauga",
    scopeTool: true,
    icon: "Language",
    color: "#FF3D85",
    group: "local",
    // Deferred from indexing: currently too similar to the Brampton/Toronto
    // pages. ServicePage emits `noindex, follow` and the sitemap excludes it
    // until it has unique Mississauga-specific proof and content. Keep a
    // self-referencing canonical (Seo sets it) and do not redirect it.
    hidden: true,
    budgetType: "website",
    pricing: "Small-business website projects start at CAD $1,500.",
    offersFrom: 1500,
    title: "Web Design Mississauga",
    navLabel: "Mississauga",
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
    scopeTool: true,
    icon: "Restaurant",
    color: "#FF3D85",
    group: "local",
    budgetType: "website",
    pricing: "Restaurant and cafe website projects start at CAD $1,500.",
    offersFrom: 1500,
    title: "Restaurant Website Design",
    navLabel: "Restaurant Websites",
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
    anchorText: "Restaurant website design",
    relatedServices: [
      "website-development",
      "web-design-brampton",
      "web-design-services-brampton",
      "web-design-toronto",
    ],
    relatedCaseStudies: ["doaba-junction", "relax-cafe"],
  },
  {
    slug: "web-design-toronto",
    scopeTool: true,
    icon: "Language",
    color: "#FF3D85",
    group: "local",
    budgetType: "website",
    pricing: "Business website projects start at CAD $1,500.",
    offersFrom: 1500,
    title: "Web Design Toronto",
    navLabel: "Toronto",
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
    scopeTool: true,
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
  {
    slug: "local-seo-gta",
    icon: "Language",
    color: "#FF3D85",
    group: "local",
    budgetType: "website",
    title: "Local SEO Services (GTA)",
    navLabel: "Local SEO",
    metaTitle: "GTA SEO & Local SEO Services | Mintek Software",
    metaDescription:
      "Local SEO and GTA SEO services from Mintek Software. We audit your site, fix on-page and technical SEO, optimize your Google Business Profile and report on progress for GTA businesses.",
    short:
      "SEO audits, on-page, technical and local SEO for GTA and Toronto businesses.",
    hero: "SEO services for GTA & Toronto businesses.",
    localAreas: [
      "Toronto", "Brampton", "Mississauga", "Vaughan", "Markham",
    ],
    problem:
      "Many GTA businesses have a website that never shows up when local customers search. Pages are slow, titles and headings are not written for the terms people actually type, Google Business Profiles are incomplete, and there is no clear reporting on what is working. Without a structured SEO foundation, even a good-looking site stays invisible in local results.",
    solution:
      "We provide full local SEO services for GTA businesses: we audit your current site, fix on-page and technical SEO, optimize your Google Business Profile and local listings, and build content and reporting so you can see progress over time. Based in Brampton, we can meet in person across Toronto, Mississauga, Vaughan and Markham to understand your market before we start. We focus on the fundamentals that make a site eligible to rank, rather than promising positions we cannot control.",
    process: [
      "Audit: review your site, current rankings, technical health and local search presence.",
      "On-page & technical SEO: improve titles, headings, structure, site speed, crawlability and structured data.",
      "Local SEO & Google Business Profile: optimize your profile, categories, listings and local landing pages.",
      "Content & reporting: plan content around real search terms and report on rankings, traffic and actions taken.",
    ],
    tech: ["Google Search Console", "Google Business Profile", "Google Analytics", "Structured Data", "Core Web Vitals"],
    outcome:
      "A technically sound, well-structured site and a fully optimized local presence, with clear reporting so you can see exactly what we changed and how your search visibility is developing.",
    relatedServices: ["web-design-brampton", "web-design-toronto", "website-development"],
    relatedCaseStudies: ["pawpals", "doaba-junction"],
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
    liveUrl: "https://parkbnb-frontend.onrender.com/",
    previewUrl: null,
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
    homepageOrder: 5,
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
    services: ["website-development", "web-design-brampton", "small-business-website-design-brampton"],
    relatedPosts: [
      "brampton-small-business-website-checklist",
      "how-to-choose-a-web-designer-in-brampton",
    ],
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
    homepageOrder: 6,
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
    services: [
      "website-development",
      "restaurant-website-design",
      "web-design-brampton",
      "web-design-toronto",
    ],
    relatedPosts: ["high-converting-restaurant-website"],
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
    liveUrl: null,
    previewUrl: "https://v0-restaurant-website-mvp-mu.vercel.app/",
    githubUrl: null,
  },
  {
    slug: "relax-cafe",
    kind: "client",
    label: "Hospitality Website",
    homepageOrder: 7,
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
    kind: "client",
    label: "CPA Firm Website",
    homepageOrder: 3,
    title: "Website and AI Blog Engine for a Brampton CPA Firm",
    client: "ALOE Accounting and Tax",
    year: "2026",
    metaTitle: "Case Study: Brampton CPA Firm Website | Mintek Software",
    metaDescription:
      "How Mintek Software built a fast, SEO-first website for ALOE Accounting and Tax, a licensed Brampton CPA firm, with an AI-assisted weekly blog pipeline and a Google review dashboard.",
    shortDescription:
      "A fast, SEO-first website for a licensed Brampton CPA firm, with an AI-assisted weekly blog pipeline and a review-management dashboard.",
    summary:
      "ALOE Accounting and Tax is a licensed Chartered Professional Accountant firm in Brampton. Mintek designed and built a fast, statically rendered website with strong technical SEO foundations, plus two systems that keep it working after launch: an AI-assisted weekly blog pipeline the owner controls, and a dashboard for managing Google reviews. Delivered in roughly three weeks.",
    problem:
      "A licensed Brampton CPA firm needed a credible, fast, search-friendly website, and a way to keep publishing fresh content and stay on top of reviews without paying an agency retainer or hiring a developer for every change.",
    solution:
      "Mintek built a statically rendered Next.js site with an SEO-first content pipeline, then added an AI-assisted blog workflow: the owner keeps a queue of topics, one draft is generated automatically each week, and she edits and approves it before it publishes. A review-management dashboard lets her view and reply to Google reviews in one place, with AI-assisted reply drafting.",
    services: ["website-development", "web-design-brampton", "business-automation"],
    features: [
      "Fast, statically rendered Next.js site with an SEO-first content pipeline (JSON-LD, sitemap, clean metadata)",
      "AI-assisted weekly blog pipeline: a topic queue drafts one article every Monday for the owner to edit and approve",
      "Human-in-the-loop editorial workflow with an admin approval step before anything publishes",
      "Review-management dashboard to view and reply to Google reviews, with AI-assisted reply drafting",
      "Mobile-first, accessible design with strong Lighthouse scores",
      "Free-consultation booking and clear calls to action",
    ],
    results: [
      "Launched a production website for a licensed Brampton CPA firm in roughly three weeks",
      "Strong mobile Lighthouse scores: SEO 100 and Best Practices 100, Accessibility 93, Performance 96",
      "A self-sustaining weekly blog cadence the owner controls, with no agency retainer",
    ],
    metrics: [
      { label: "Lighthouse SEO", value: "100 / 100" },
      { label: "Lighthouse Best Practices", value: "100 / 100" },
      { label: "Lighthouse Accessibility", value: "93 / 100" },
      { label: "Lighthouse Performance", value: "96 / 100" },
      { label: "Time to launch", value: "~3 weeks" },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Netlify", "OpenAI API"],
    status: "Live",
    liveUrl: "https://www.aloeaccountingandtax.com",
    previewUrl: null,
    githubUrl: null,
    relatedCaseStudies: ["pawpals", "doaba-junction"],
  },
  {
    slug: "restaurant-online-ordering-system",
    kind: "client",
    label: "Custom Software",
    homepageOrder: 4,
    title: "Restaurant Online Ordering System",
    client: "Airport Sweets and Tandoori",
    year: "2022",
    metaTitle: "Brampton Restaurant Online Ordering System | Mintek Software",
    metaDescription:
      "How Mintek Software built a commission-free custom online ordering system for a Brampton restaurant, with Stripe payments and SMS marketing driving up to 705% ROI in a month.",
    shortDescription:
      "A fully custom online ordering system with integrated payments, real-time order management, and SMS marketing.",
    summary:
      "In 2022, we partnered with Airport Sweets and Tandoori, a Brampton restaurant that needed a robust online ordering system. We built a fully custom solution that eliminated third-party commissions and gave the restaurant control over payments, real-time order management and SMS-based marketing with a clean, mobile-first design.",
    problem:
      "The restaurant was losing margin to third-party ordering commissions and had no direct control over orders or customer relationships.",
    solution:
      "Mintek built a custom online ordering system with secure Stripe payments, a real-time admin dashboard, order tracking and SMS retargeting driven by call-history analytics.",
    services: [
      "custom-software-development",
      "business-automation",
      "web-design-brampton",
      "restaurant-website-design",
    ],
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
      { label: "Repeat customers (3+ orders)", value: "18" },
      { label: "Orders in promo periods", value: "173 of 290" },
    ],
    techStack: ["React", "Node.js", "Express", "SQL", "Stripe", "SMS API", "Google Analytics"],
    status: "Completed",
    liveUrl: null,
    previewUrl: null,
    githubUrl: null,
  },
  {
    slug: "bookme-scheduling-platform",
    kind: "prototype",
    label: "Scheduling Platform",
    homepageOrder: null,
    title: "Building a Calendly-Style Booking Platform for Service Providers",
    client: "BookMe",
    year: "2026",
    metaTitle: "Case Study: BookMe Scheduling Platform | Mintek Software",
    metaDescription:
      "How Mintek Software designed and built BookMe, a Calendly-style multi-staff booking platform with a timezone-correct availability engine, no-double-booking safeguards and Google Calendar sync.",
    shortDescription:
      "A Calendly-style, multi-staff booking platform with a timezone-correct availability engine, Google Calendar sync and automated reminders, built on the MERN stack with TypeScript.",
    summary:
      "BookMe is a booking platform for independent service providers such as barbers, makeup artists and small studios. Each business gets a shareable booking page where clients self-schedule, while owners manage team, services and availability from a dashboard. Mintek built it as a lean MVP with a React and TypeScript front end and a Node, Express and MongoDB backend, with optional Google Calendar sync and email/SMS notifications.",
    problem:
      "Service businesses lose time and revenue to manual scheduling: DMs, phone tag, double-bookings and no-shows. Off-the-shelf tools are often over-priced or not built for multi-staff shops. The goal was a focused, self-serve booking experience a small business could stand up in minutes.",
    solution:
      "Mintek built a branded public booking flow (pick a service, choose a team member, select a date and time, confirm) backed by a real-time availability engine, plus an owner dashboard for bookings, a service catalogue, a visual weekly availability editor and team management. Google Calendar, email and SMS integrations are all optional, so the app runs fully without any third-party accounts.",
    services: ["web-application-development", "custom-software-development"],
    features: [
      "Branded, mobile-friendly public booking page per business",
      "Guided multi-step flow: service, team member, date and time, confirm",
      "Timezone-correct availability engine with configurable duration and buffers",
      "No double-bookings, enforced by a unique database index (not just a UI check)",
      "Per-staff Google Calendar sync: writes bookings and reads back busy times",
      "Automated email and SMS confirmations plus 24-hour and 1-hour reminders",
      "Owner dashboard: bookings, service catalogue, availability editor, team management",
      "JWT auth with role-based access, request validation and encrypted OAuth tokens",
    ],
    results: [
      "Delivered a production-ready MVP verified end-to-end: availability, booking, concurrency safeguards, auth and notifications",
      "Concurrency-safe by design: two clients racing for one slot can never both succeed",
      "Graceful degradation: email, SMS and calendar integrations are optional, keeping local dev and demos friction-free",
      "Containerized MongoDB for local development and one-click cloud deploy via a Render Blueprint backed by MongoDB Atlas",
    ],
    metrics: [],
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Google Calendar API",
    ],
    status: "Live",
    liveUrl: "https://bookme-web.onrender.com/",
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
// Short, human-friendly drawer labels for services (fall back to full title),
// with hidden/noindex services filtered out so they can never leak into nav.
const navItems = (slugs) =>
  slugs
    .map(getService)
    .filter((s) => s && !s.hidden)
    .map((s) => ({ name: s.navLabel || s.title, path: `/${s.slug}` }));

// Full, keyword-rich footer labels for services (better anchor text for SEO),
// with hidden/noindex services filtered out so they can never leak into footer.
const footerItems = (slugs) =>
  slugs
    .map(getService)
    .filter((s) => s && !s.hidden)
    .map((s) => ({ name: s.title, path: `/${s.slug}` }));

const companyLinks = [
  { name: "Case Studies", path: "/case-studies" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Research", path: "/research" },
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Terms of Service", path: "/terms" },
];

// Drawer navigation: concise labels, grouped by meaning, local-first order.
// Hidden/noindex services are auto-filtered by navItems.
export const navGroups = [
  { heading: null, links: [{ name: "Home", path: "/" }] },
  {
    heading: "Web Design & Local SEO",
    links: navItems([
      "small-business-website-design-brampton",
      "restaurant-website-design",
      "local-seo-gta",
      "website-development",
      "web-design-brampton",
      "web-design-toronto",
    ]),
  },
  {
    heading: "Software & Apps",
    links: navItems([
      "custom-software-development",
      "web-application-development",
      "marketplace-development",
      "mobile-app-development",
    ]),
  },
  {
    heading: "Automation & Data",
    links: navItems([
      "google-sheets-website-development",
      "business-automation",
      "spreadsheet-automation",
    ]),
  },
  { heading: "Company", links: companyLinks },
];

// Footer navigation: specific, service-line headings with full descriptive
// anchor text. Location pages sit under the service they belong to (e.g. city
// web-design pages under "Web Design"), so every heading matches its links.
export const footerNav = [
  {
    heading: "Software & Apps",
    links: footerItems([
      "custom-software-development-toronto",
      "custom-software-development",
      "web-application-development",
      "marketplace-development",
      "mobile-app-development",
    ]),
  },
  {
    heading: "Automation & Data",
    links: footerItems([
      "google-sheets-website-development",
      "business-automation-toronto",
      "spreadsheet-automation",
      "business-automation",
    ]),
  },
  {
    heading: "Web Design",
    // Hidden/noindex city pages (e.g. web-design-mississauga) are filtered out
    // automatically by footerItems, so they never appear here.
    links: footerItems([
      "web-design-services-brampton",
      "website-hosting-brampton",
      "website-development",
      "web-design-brampton",
      "web-design-toronto",
    ]),
  },
  {
    heading: "SEO & Marketing",
    links: footerItems(["local-seo-gta"]),
  },
  { heading: "Company", links: companyLinks },
];

// ---------------------------------------------------------------------------
// FAQs
// People-first answers written from approved facts (pricing strings above,
// serviceAreaStatement, existing service copy and real case studies). No
// ranking/revenue/savings guarantees. No FAQ JSON-LD (rich results deprecated).
// ---------------------------------------------------------------------------
export const homeFaqs = [
  {
    q: "What does Mintek Software build?",
    a: "Mintek builds custom software, business applications, automation and websites for growing businesses. That includes internal tools and dashboards, customer-facing web applications and marketplaces, Google Sheets-powered sites, spreadsheet and workflow automation, and fast, SEO-ready marketing websites. We focus on removing manual work and turning day-to-day operations into reliable, measurable systems. If you are not sure which type of project you need, we can help you scope the smallest solution that delivers the most value.",
  },
  {
    q: "Does Mintek work with small businesses?",
    a: "Yes. Most of our clients are small and growing businesses across the Greater Toronto Area. We scope projects to your budget and priorities, often starting with a focused first version and expanding from there. Whether you need a website starting at CAD $1,500, a spreadsheet automation or a larger custom application, we tailor the approach so it fits how your business works today while leaving room to grow.",
  },
  {
    q: "Which cities does Mintek serve?",
    a: `${site.serviceAreaStatement} We work with businesses throughout Brampton, Mississauga, Toronto and Vaughan, and also support remote clients beyond the GTA. Being based locally means we can meet in person for discovery, demos and handover while running much of the work efficiently over video and email.`,
  },
  {
    q: "Can Mintek meet clients in person?",
    a: "Yes. We are based in Brampton and in-person meetings are available across the Greater Toronto Area, including Toronto, Mississauga and Vaughan. Many projects also run smoothly over video calls and email, so we can work whichever way suits you best. For discovery, demos and planning we are happy to meet at a location that works for your team.",
  },
  {
    q: "How do I get a project estimate?",
    a: "Book a discovery call, or send a short project brief through the contact form: the problem you are trying to solve, roughly what you have in mind, and your timeline. You can also call or WhatsApp us from the header or the mobile bar. We follow up with questions and suggested next steps. For custom software and automation we usually recommend a short discovery call so the estimate reflects your real requirements. Website projects can often be scoped from a written brief.",
  },
];

// Per-service FAQ sets, keyed by slug.
export const serviceFaqs = {
  "custom-software-development": [
    {
      q: "How much does custom software development cost?",
      a: "Custom software projects generally start at CAD $5,000. Final pricing depends on functionality, integrations, user roles, security requirements and project scope. Simple internal tools sit near the starting point, while multi-user platforms with integrations cost more. We quote fixed-scope stages wherever possible so you can start with a focused first version and expand later, and we confirm pricing after a short discovery conversation about your goals and requirements.",
    },
    {
      q: "What types of custom software does Mintek build?",
      a: "We build internal tools and admin dashboards, customer-facing web applications, marketplaces, booking and ordering systems, reporting tools, and integrations between systems that do not currently talk to each other. Examples from our work include a map-first parking marketplace and a custom restaurant online-ordering system with payments and analytics. If off-the-shelf software almost fits but forces awkward workarounds, that is usually a strong candidate for a tailored build.",
    },
    {
      q: "How long does a custom software project take?",
      a: "It depends on scope. A focused first version or proof of concept can take a few weeks, while a larger multi-user platform with integrations takes longer. We work in clearly defined stages: discovery, prototype, initial release, then integrations and enhancements. That way you see usable progress early rather than waiting months for a single launch. We agree on timelines during discovery once the requirements are clear.",
    },
    {
      q: "Can Mintek build an MVP first?",
      a: "Yes, and we usually recommend it. Starting with a minimum viable product or proof of concept lets you validate the idea with real users, control cost and learn what matters most before investing in the full build. We ship a solid, usable first version, then expand functionality as priorities become clear. This staged approach reduces risk and gets value into your hands sooner.",
    },
    {
      q: "Who owns the source code after completion?",
      a: "You own the software we build for you, including the source code, once the project is complete and paid for. We hand over the code and deployment details and can document everything so another developer could maintain it if needed. Third-party services and libraries keep their own licences, but the custom work is yours. You are never locked into a platform that holds your project hostage.",
    },
    {
      q: "Can Mintek integrate with existing systems?",
      a: "Yes. We regularly connect custom software to the tools businesses already use, such as payment processors, spreadsheets, email and SMS services, and other systems through their APIs. During discovery we map which systems need to exchange data and design reliable, monitored connections. If a system has no modern API, we will tell you honestly and suggest the most dependable approach available rather than promising something fragile.",
    },
    {
      q: "Does Mintek provide maintenance after launch?",
      a: "Yes. After launch we offer ongoing support, monitoring and enhancements so the software keeps working as your business changes. We can fix issues, add features and update integrations when a connected service changes. Support can be arranged on a flexible basis depending on how critical the system is to your daily operations.",
    },
    {
      q: "What information is needed to prepare an estimate?",
      a: "It helps to know the problem you are solving, who will use the software, the key features you need, any systems it must connect to, your rough timeline and budget range, and any security or compliance requirements. Even a short written summary is enough to start. We then follow up with a few questions, and for larger projects a short discovery call, before proposing scope and pricing.",
    },
  ],
  "business-automation": [
    {
      q: "What business processes can Mintek automate?",
      a: "We automate repetitive, rule-based work such as data entry, copying information between systems, recurring reporting, invoice and document generation, notifications and reminders, and syncing data between spreadsheets and other tools. If your team does the same manual steps every day or week, or rebuilds the same report regularly, that is usually a strong candidate. We start by finding where time and errors accumulate, then automate the highest-payback tasks first.",
    },
    {
      q: "How do I know whether a process should be automated?",
      a: "A good sign is any task that is repetitive, rule-based and done often, especially if it is slow, error-prone or relies on one person remembering to do it. If the steps can be written down as a clear set of rules, they can usually be automated. During a short discovery we measure where your team spends time and highlight the automations with the fastest payback, so you can decide with clear priorities.",
    },
    {
      q: "How much does business automation cost?",
      a: "Small, clearly defined automation projects generally start at CAD $3,000. Larger workflow and integration projects are quoted after discovery. Even smaller ideas below that range can suit a paid discovery or proof of concept. Because automation value comes from time saved and errors removed, we focus first on the processes with the fastest payback so the work pays for itself.",
    },
    {
      q: "Can Mintek automate Google Sheets and spreadsheet workflows?",
      a: "Yes. Google Sheets and spreadsheet workflows are among the most common things we automate. We can pull data in on a schedule, clean and validate it, generate reports and dashboards, sync sheets with other systems, and send notifications when something needs attention. This removes manual copy-paste and keeps your spreadsheets current without someone updating them by hand.",
    },
    {
      q: "Can Mintek connect systems that do not currently communicate?",
      a: "Often, yes. Many systems can be connected through their APIs or through integration tools, even when they were not designed to work together. We map what data needs to move between them and build reliable, monitored connections. If a system genuinely cannot share data, we will tell you honestly and suggest the most dependable alternative rather than promising something that will not hold up.",
    },
    {
      q: "How much time can automation save?",
      a: "It varies by process, and we do not promise a specific number of hours without evidence from your actual workflow. What we can say is that automating repetitive reporting, data entry and syncing typically turns tasks that took hours into ones that run in minutes in the background. During discovery we measure the current effort so that, after launch, we can compare and show the real time saved.",
    },
    {
      q: "Will employees need technical knowledge to use the automation?",
      a: "No. We design automations to run quietly in the background and, where staff interaction is needed, to work through tools your team already knows, such as spreadsheets, email or simple dashboards. The goal is less manual work, not new software to learn. We also provide a short guide so anyone on the team can use and understand what was built.",
    },
    {
      q: "Does Mintek provide support when a connected system changes?",
      a: "Yes. Connected systems occasionally change their interfaces or settings, which can affect an automation. We offer ongoing support and monitoring so that when something changes we can update the connection and keep things running. Arranging support up front is a good idea for automations that are critical to daily operations.",
    },
  ],
  "business-automation-toronto": [
    {
      q: "Does Mintek need to be in Toronto to automate our processes?",
      a: "No. Mintek is based in Brampton and works with businesses across Toronto and the GTA, with in-person meetings available. Being in the wider GTA means we can visit your Toronto office for discovery and walkthroughs when it helps, while the build and monitoring happen efficiently over video and shared tools. You get a local partner without needing us to sit in a downtown office.",
    },
    {
      q: "Can you meet in person to map our workflow?",
      a: "Yes. For automation work it often helps to sit with your team and watch how a process actually runs before we change anything. We can meet on-site or nearby across Toronto, Mississauga, Vaughan and Markham to map the real steps, then confirm the details over follow-up calls. Seeing the workflow first-hand usually surfaces edge cases a checklist would miss.",
    },
    {
      q: "Which GTA industries do you automate for?",
      a: "We work with a range of GTA operators, including trades and field services, clinics and professional-services firms, property management, wholesale and small e-commerce. The common thread is repetitive, rule-based work spread across spreadsheets, email and disconnected tools. We are not tied to one vertical, so during discovery we focus on your specific processes rather than a fixed template.",
    },
    {
      q: "How does this differ from your general business automation service?",
      a: "The work itself is the same discipline; the difference is how we deliver it locally. For GTA clients we lean on in-person discovery, walkthroughs and handover, and we tailor examples to the operational realities of Toronto-area businesses. If you prefer a fully remote engagement, our general business automation service covers the same capabilities without the in-person component.",
    },
    {
      q: "Do you work remotely or on-site?",
      a: "Both. We combine in-person meetings across the GTA with efficient remote development. Discovery, walkthroughs and handover often work well face to face, while building and monitoring the automations runs smoothly over video and shared tools. We adapt to how your team prefers to work rather than forcing a single model.",
    },
    {
      q: "How much does business automation cost for a GTA business?",
      a: "Small, clearly defined automation projects generally start at CAD $3,000, and larger workflow or integration projects are quoted after discovery. Smaller ideas below that range can suit a paid discovery or proof of concept. Because the value comes from time saved and errors removed, we prioritise the processes with the fastest payback so the work pays for itself.",
    },
    {
      q: "How much time can automation save us?",
      a: "It varies by process, and we do not promise a specific number of hours without evidence from your actual workflow. What we can say is that automating recurring reporting, data entry and syncing typically turns tasks that took hours into ones that run in minutes in the background. During discovery we measure the current effort so that, after launch, we can show the real time saved.",
    },
  ],
  "custom-software-development-toronto": [
    {
      q: "Does Mintek have to be located in Toronto to serve Toronto clients?",
      a: "No. Mintek is based in Brampton and serves clients across Toronto and the GTA. In-person meetings are available. A presence in the wider GTA means we can meet Toronto clients face to face for discovery, demos and planning, while much of the build work happens efficiently over video and email. You get a nearby team without needing us to sit in a Toronto office.",
    },
    {
      q: "Can Mintek attend in-person meetings in Toronto?",
      a: "Yes. We attend in-person meetings in Toronto for discovery, planning, demos and handover. Mintek is based in nearby Brampton, so travelling into Toronto to meet your team is straightforward. Many clients mix in-person sessions with video calls, and we are flexible about whatever works best for your schedule.",
    },
    {
      q: "What kinds of Toronto businesses does Mintek work with?",
      a: "We work with small and growing Toronto businesses that have outgrown off-the-shelf tools and need software built around their processes, from internal dashboards and admin tools to customer-facing applications and marketplaces. If manual workarounds and disconnected spreadsheets are slowing your team down, that is usually where custom software helps most. We scope to your budget and priorities.",
    },
    {
      q: "Does Mintek work remotely or on-site?",
      a: "Both. We combine in-person meetings across Toronto and the GTA with efficient remote development. Discovery, planning and demos often work well face to face, while the build itself runs smoothly over video and shared tools. We adapt to how your team prefers to work rather than forcing a single model.",
    },
    {
      q: "What does a typical custom-software engagement include?",
      a: "A typical engagement runs in clear stages: discovery to map your workflows and goals, a prototype or proof of concept to validate the approach, an initial production release, then integrations and enhancements, with ongoing support. You see usable progress early and can expand as priorities become clear, rather than waiting for one large launch.",
    },
    {
      q: "Can Mintek take over an existing application?",
      a: "Often, yes. We can take over an existing application, starting with a review of the code, architecture and current pain points. We give you an honest assessment of what is worth keeping and what should be improved, then stabilise and extend it. If a rebuild would serve you better than patching, we will explain why rather than run up hours on fragile foundations.",
    },
    {
      q: "Can Mintek begin with a paid discovery phase?",
      a: "Yes. For larger or less-defined projects we often recommend starting with a paid discovery phase. This produces a clear plan, scope and estimate before committing to the full build, which reduces risk for both sides. It is especially useful when requirements are still taking shape or several approaches are possible.",
    },
    {
      q: "How is confidential business information protected?",
      a: "We take confidentiality seriously. We are happy to sign a non-disclosure agreement, limit access to your data to what the work requires, and follow sensible security practices for credentials and hosting. During discovery we discuss any specific security or compliance needs so they are built into the project from the start.",
    },
  ],
  "google-sheets-website-development": [
    {
      q: "Can a website use Google Sheets as its data source?",
      a: "Yes. We build websites and web applications that read live content directly from Google Sheets, so a spreadsheet becomes the content source for the site. Your team updates rows in a familiar spreadsheet, and the changes appear on the website. It is a fast, low-maintenance approach for content that changes often, with no traditional CMS to log into or maintain.",
    },
    {
      q: "What types of websites work well with Google Sheets?",
      a: "Google Sheets works well for sites with structured, frequently changing, non-sensitive content: events, menus, catalogues, price lists, schedules, directories and listings. Our work for Laal Button used Google Sheets to power a read-only event-discovery web app, letting staff publish and update events from a spreadsheet. It is ideal when the information already lives in a sheet your team knows how to use.",
    },
    {
      q: "How quickly do spreadsheet changes appear on the website?",
      a: "Changes appear quickly, typically within moments of updating the spreadsheet, depending on how the site is configured for caching. We can tune this so updates feel near-instant while keeping the site fast. This means staff can correct a price or add an event and see it reflected on the website without waiting for a developer.",
    },
    {
      q: "Can staff update the website without contacting a developer?",
      a: "Yes, that is the main benefit. Non-technical staff update content directly in Google Sheets, with no developer involvement and no CMS logins to manage. We structure the sheet so it behaves like a reliable content source and add validation for missing or malformed rows. We also provide a short guide so anyone on the team can publish updates confidently.",
    },
    {
      q: "Is Google Sheets suitable for confidential information?",
      a: "No. Google Sheets is best for public, non-sensitive content such as events, menus and listings. It is not appropriate for confidential, secure or highly sensitive information, or for complex transactional systems. When a project involves sensitive data or transactions, we build it with a proper database, backend and secure access controls instead, and we will tell you honestly which approach fits.",
    },
    {
      q: "What happens when the spreadsheet becomes very large?",
      a: "Very large or complex datasets can strain a spreadsheet-powered approach, affecting speed and reliability. For modest, structured content it works well, but as data grows we may recommend caching strategies or moving to a proper database. During planning we look at how much data you expect and choose an approach that will stay fast and dependable as you grow.",
    },
    {
      q: "Can Google Sheets connect to an existing website?",
      a: "Often, yes. We can add a Google Sheets-powered section, such as an events or menu listing, to an existing website, depending on how that site is built. We review your current setup and recommend the cleanest way to integrate. If the existing platform makes it impractical, we will say so and suggest alternatives.",
    },
    {
      q: "Is a spreadsheet-powered website better than a traditional CMS?",
      a: "It depends on your needs. For frequently changing, structured, non-sensitive content, a Google Sheets-powered site is simpler, faster to update and cheaper to maintain than a traditional CMS, with nothing to log into. For complex sites with many content types, user accounts or sensitive data, a proper CMS or custom backend is the better choice. We help you pick the right tool rather than forcing one approach.",
    },
  ],
  "restaurant-website-design": [
    {
      q: "How much does a restaurant website cost?",
      a: "Restaurant and cafe website projects start at CAD $1,500. Final pricing depends on the number of pages, design, menu presentation and any integrations such as online ordering or reservations. A clean, mobile-first site that shows your menu and drives calls and directions sits near the starting point, while custom features cost more. We confirm a fixed quote after a short chat about what your restaurant needs.",
    },
    {
      q: "Can Mintek add menus and catering information?",
      a: "Yes. We design menu-first websites that present your food clearly on mobile, and we can add catering information, packages and enquiry prompts. Menus can be structured so they are easy to read and, if they change often, we can connect them to a tool like Google Sheets so staff update prices and items themselves. Catering enquiries can flow straight to your inbox.",
    },
    {
      q: "Can customers order directly through the website?",
      a: "Yes, we can build ordering into the site. We previously built a fully custom online ordering system with secure Stripe payments and real-time order management for a Brampton restaurant, which removed third-party commissions. Direct ordering is a larger, custom project than a standard website, so we scope and quote it separately based on your menu and payment needs.",
    },
    {
      q: "Can the website connect to an existing ordering platform?",
      a: "Yes. If you already use an ordering or delivery platform, we can feature it prominently with clear buttons and links so customers reach it easily from your site. This is a quick, low-cost option compared with building ordering from scratch. If you later want to reduce platform commissions, we can discuss a custom ordering system.",
    },
    {
      q: "Can restaurant staff update menu prices?",
      a: "Yes. We can build your menu so staff update prices and items themselves, including connecting it to a familiar spreadsheet such as Google Sheets for frequently changing menus. Changes appear on the site without needing a developer. We provide a short guide so updates are quick and stress-free.",
    },
    {
      q: "Does Mintek build mobile-friendly restaurant websites?",
      a: "Yes. Every restaurant site we build is mobile-first, because most diners decide on their phones. That means fast pages, tap-friendly buttons, easy-to-read menus and instant access to calling, directions and hours. A smooth mobile experience is often the difference between a hungry searcher choosing you or the next result.",
    },
    {
      q: "Can the website include Google Maps, hours and contact details?",
      a: "Yes. We include Google Maps directions, business hours, click-to-call and contact details as standard, so customers can find you, check if you are open and reach you in one tap. These local details also strengthen your presence in local search, helping nearby diners discover you.",
    },
    {
      q: "Can Mintek redesign an outdated restaurant website?",
      a: "Yes. We regularly modernise outdated restaurant websites that are slow, hard to read on mobile or difficult to update. We keep what works, rebuild on a fast mobile-first foundation, improve the menu presentation and add clear calls to action for calls, directions and catering. The result is a site that looks current and turns visits into customers.",
    },
  ],
  "marketplace-development": [
    {
      q: "What is a two-sided marketplace?",
      a: "A two-sided marketplace is a platform that connects two groups who need each other, such as buyers and sellers or, in our Rent a Parking project, drivers and people with unused parking spaces. The platform's job is to make it easy for both sides to find each other and transact. Building one well means serving both audiences, keeping listings fresh, and making discovery fast and trustworthy.",
    },
    {
      q: "How much does marketplace development cost?",
      a: "Marketplace and multi-sided platform projects generally start at CAD $5,000 and are scoped after discovery. Cost depends on features such as listings, search, maps, messaging, user roles and whether payments are included. We usually recommend starting with a focused first version that proves the core loop between both sides, then expanding, so you control cost and learn what matters most before investing further.",
    },
    {
      q: "Can Mintek build a location-based marketplace?",
      a: "Yes. Location-based marketplaces are a particular strength. We built Rent a Parking as a map-first marketplace with location search and geographic filtering across urban neighbourhoods. We handle structured listing data, proximity search and map discovery so users can explore what is available near them, with a foundation designed to expand to new cities.",
    },
    {
      q: "Can a marketplace include maps and geographic search?",
      a: "Yes. We integrate interactive maps and geographic search so users can browse listings visually, filter by area or proximity and find what is nearby. In Rent a Parking we used Mapbox for a map-first discovery experience with real-time filtering. Fast, reliable map search is central to a good location-based marketplace, so we build it on a solid technical foundation.",
    },
    {
      q: "Can Mintek build listing-management features?",
      a: "Yes. We build listing creation and management so the supply side can add, edit and manage their listings, with structured data behind the scenes and admin tooling for you to oversee the marketplace. Good listing management keeps content fresh and trustworthy, which is essential for a marketplace to grow.",
    },
    {
      q: "Should the first version include payments?",
      a: "Not always. Many marketplaces prove their core value first, connecting both sides, before adding payments. We often recommend launching a focused first version that validates demand, then adding payment processing once the model is working. This controls cost and risk. If payments are essential from day one, we can include them, scoped accordingly.",
    },
    {
      q: "How long does it take to build a marketplace MVP?",
      a: "A marketplace MVP focused on the core loop between both sides typically takes several weeks to a few months, depending on features such as maps, search and listing management. We work in stages, discovery, prototype, initial release, so you see progress early and launch a usable first version rather than waiting for every feature. We confirm timelines during discovery.",
    },
    {
      q: "How is marketplace SEO different from normal website SEO?",
      a: "Marketplace SEO differs because value comes from many listing and category pages, often location-based, that should each be discoverable in search. That means structured, indexable listing pages, sensible URLs and content that scales as inventory grows. We build these foundations in, as we did for Rent a Parking's city and listing pages, so the marketplace can attract organic traffic. We do not guarantee rankings.",
    },
  ],
  "web-design-brampton": [
    {
      q: "How much does a business website cost in Brampton?",
      a: "Mintek business website projects start at CAD $1,500. Final pricing depends on the number of pages, design requirements, content, integrations and custom functionality. A focused, mobile-first site for a Brampton small business sits near the starting point, while more pages or custom features increase the price. We confirm a fixed quote after a short conversation about your goals and the pages you need.",
    },
    {
      q: "What is included in a $1,500 website?",
      a: "A $1,500 website typically includes a focused, mobile-first site with the core pages a small business needs, a clear layout built to turn visitors into enquiries, click-to-call and contact details, on-page SEO foundations and analytics. Content and imagery are usually provided by you, though we can guide the structure. If you need many pages, e-commerce or custom functionality, we scope those separately and quote before starting.",
    },
    {
      q: "How long does it take to build a business website?",
      a: "A straightforward small-business website usually takes a couple of weeks once we have your content and a clear picture of the pages you need. More pages, custom design or integrations extend that. We keep the process simple: agree on structure and goals, design mobile-first layouts, build fast SEO-ready pages, then launch. We confirm the timeline before starting so you know what to expect.",
    },
    {
      q: "Can Mintek meet Brampton clients in person?",
      a: "Yes. Mintek is based in Brampton, so meeting local clients in person is easy, and we are happy to meet at your business location. We also work smoothly over video and email if that is more convenient. Being local means quick, face-to-face discovery and handover for Brampton businesses.",
    },
    {
      q: "Will I own my website after it is completed?",
      a: "Yes. Once the project is complete and paid for, the website is yours, including the content and code. We hand over everything you need and can document how to manage it. You are never locked into a proprietary platform that holds your site hostage.",
    },
    {
      q: "Can I update the content myself?",
      a: "Yes. We can build your site so you update key content yourself, and for frequently changing content such as events or menus we can connect it to a familiar tool like Google Sheets. We provide a short guide so updates are simple, and we remain available if you would rather we handle changes for you.",
    },
    {
      q: "Does website development include SEO?",
      a: "Yes, website development includes strong technical SEO foundations: fast performance, mobile-friendly design, clean structure, sensible page titles and descriptions, and crawlable content. These give you the best possible starting point in search. We do not guarantee specific rankings, because no honest provider can, but we build your site so it is technically ready to rank and easy for search engines to understand.",
    },
    {
      q: "Does Mintek build websites for new Brampton businesses?",
      a: "Yes. We regularly build first websites for new and growing Brampton businesses, as well as redesigns of dated or slow sites. For a new business we focus on a fast, mobile-first site with clear calls to action and local SEO foundations, so you can start capturing enquiries from local searches as soon as you launch.",
    },
    {
      q: "Do you host the website after launch?",
      a: "We deploy the site, enable HTTPS, and hand over the hosting and domain details so you control the accounts. Hosting is a running cost (domain plus hosting), not a hidden platform fee, and you are not required to keep us as the only people who can log in. See our website hosting in Brampton page for the practical details.",
    },
    {
      q: "Can you redesign my existing website?",
      a: "Yes. We can rebuild a dated or slow site on a faster, mobile-first foundation while keeping the pages, offers and content that already work. If the current site is technically sound and only needs clearer calls to action or local SEO, we will say so instead of selling a full rebuild.",
    },
    {
      q: "Can you maintain the site after launch?",
      a: "Yes. Ongoing support and content updates are optional and scoped separately from the build. You own the site once it is paid for, so you can also update it yourself or take it to another developer. You are not required to keep a retainer to keep the site online.",
    },
    {
      q: "Can you integrate booking, ordering or other software?",
      a: "Yes, when the business actually needs it. A first marketing site often stops at calls, forms and menus. Booking, online ordering, payments or connections to tools you already use are quoted as extra functionality or as software, not hidden inside the CAD $1,500 starting price. The Airport Sweets case study is an example of custom ordering rather than a brochure upgrade.",
    },
    {
      q: "Do you work with businesses outside Brampton?",
      a: "Yes. Mintek is based in Brampton and also works with businesses across Mississauga, Toronto, Vaughan and the rest of the GTA. In-person meetings are available; we also work over video and email when that is easier.",
    },
  ],
  "small-business-website-design-brampton": [
    {
      q: "What does a small-business website in Brampton include at CAD $1,500?",
      a: "A focused, mobile-first site with the core pages you need, a layout built to produce enquiries, click-to-call, on-page SEO foundations and analytics. Photos and copy are usually yours. Extra pages, e-commerce or custom apps are scoped separately. The Brampton hub page has the package comparison.",
    },
    {
      q: "Is this different from your main Brampton web design page?",
      a: "This page is for owners specifically shopping small-business website design: first sites, tight scope, local enquiries. The web design in Brampton hub is the full practice page with neighbourhoods, packages and case studies. Both describe the same studio and starting price; they are linked so you can move between the overview and this tighter brief.",
    },
  ],
  "web-design-services-brampton": [
    {
      q: "What web design services do you offer in Brampton?",
      a: "New marketing websites from CAD $1,500, restaurant and cafe sites, Google Sheets–updated sites, rebuilds versus redesigns, local SEO, and launch hosting with handover. Custom software, ordering systems and apps are separate services with their own starting prices.",
    },
    {
      q: "Should I start here or on web design in Brampton?",
      a: "Start here if you need to pick a job (restaurant vs rebuild vs SEO). Use the web design in Brampton hub if you already know you want a local small-business site and want packages, neighbourhoods and proof in one place.",
    },
  ],
  "website-hosting-brampton": [
    {
      q: "How much does website hosting cost with Mintek?",
      a: "We do not publish a separate hosting price list. Domain registration and hosting are real running costs that we itemise when we scope the project. We do not lock the site to a proprietary platform, and ongoing support is optional rather than a required hosting bundle.",
    },
    {
      q: "Will I own the hosting account?",
      a: "Yes. We set the site up so you control the domain and hosting logins, and we hand over how to publish updates. You can keep us for support or take the site elsewhere.",
    },
    {
      q: "Is hosting included in the CAD $1,500 website?",
      a: "The starting price is for the design and build of a focused marketing site. Launch includes deployment and HTTPS. Registrar and hosting bills, and any paid support after handover, sit outside that figure and are spelled out before work starts.",
    },
  ],
  "web-design-mississauga": [
    {
      q: "Does Mintek serve businesses near Mississauga's commercial and industrial areas?",
      a: "Yes. We work with businesses across Mississauga, including those in its commercial and industrial districts. Mintek is based in nearby Brampton, so we can meet Mississauga clients in person for discovery and planning, and we support many projects over video and email. Whether you are a storefront, office or industrial business, we build fast, mobile-first sites focused on generating enquiries.",
    },
    {
      q: "Can Mintek meet Mississauga clients in person?",
      a: "Yes. Mississauga is next to our base in Brampton, so in-person meetings are easy for discovery, demos and handover. We are equally comfortable working over video and email if that suits your schedule better. Being local keeps communication quick and personal for Mississauga businesses.",
    },
    {
      q: "How much does a Mississauga business website cost?",
      a: "Mississauga business website projects start at CAD $1,500, with final pricing depending on pages, design, content and any custom features. A focused, mobile-first site built to convert local visitors sits near the starting point, while extra pages or functionality increase it. We provide a fixed quote after a short conversation about your goals.",
    },
    {
      q: "How long will my Mississauga website take to build?",
      a: "A straightforward Mississauga small-business site usually takes a couple of weeks once we have your content and page list. Custom design or integrations take longer. We agree the timeline up front and keep the process simple: plan, design, build, launch, so you always know where the project stands.",
    },
    {
      q: "Will I own the website, and can I update it myself?",
      a: "Yes. You own your website once it is complete and paid for, including content and code, and we can build it so you update key content yourself. For frequently changing content we can connect a familiar tool like Google Sheets. You are never locked into a proprietary platform.",
    },
    {
      q: "Can Mintek redesign my existing Mississauga website?",
      a: "Yes. We redesign dated or slow Mississauga websites, rebuilding on a fast, mobile-first foundation with stronger SEO and clearer calls to action, while keeping what already works. If you are launching a new business, we can build your first site too.",
    },
  ],
  "web-design-toronto": [
    {
      q: "Does Mintek work with Toronto clients without maintaining a Toronto office?",
      a: "Yes. Mintek is based in Brampton and serves clients across Toronto and the GTA, with in-person meetings available. You get a nearby team for discovery and demos without us needing a Toronto office, and much of the work runs efficiently over video and email. Toronto businesses get local, responsive service either way.",
    },
    {
      q: "Can Mintek attend discovery meetings in Toronto?",
      a: "Yes. We travel into Toronto for discovery, planning and demo meetings when meeting face to face is helpful. Based in nearby Brampton, getting into the city to meet your team is straightforward, and we combine in-person sessions with video calls to keep projects moving.",
    },
    {
      q: "How much does a Toronto business website cost?",
      a: "Toronto business website projects start at CAD $1,500, with final pricing depending on pages, design, content and custom features. A fast, mobile-first site built to convert sits near the starting point; more pages or functionality increase it. We confirm a fixed quote after a short discovery chat.",
    },
    {
      q: "How long does a Toronto website take to build?",
      a: "A focused Toronto small-business website typically takes a couple of weeks once content and pages are agreed, with custom work taking longer. We set the timeline before starting and keep the process clear: strategy, design, build, launch.",
    },
    {
      q: "Does the website include SEO?",
      a: "Website development includes technical SEO foundations: fast performance, mobile-friendly structure and crawlable content, so your Toronto site is ready to rank and easy for search engines to understand. We do not guarantee specific rankings, as no honest provider can, but we give you a strong technical starting point.",
    },
    {
      q: "Will I own my Toronto website?",
      a: "Yes. You own your Toronto website once it is complete and paid for, including content and code, and we hand over everything you need. We can build it so you update content yourself, and you are never locked into a proprietary platform.",
    },
  ],
  "web-design-vaughan": [
    {
      q: "Does Mintek work with Vaughan retailers and professional-service companies?",
      a: "Yes. We work with Vaughan retailers, professional-service firms and other growing businesses, building fast, mobile-first websites focused on generating enquiries. Mintek is based in nearby Brampton, so we can meet Vaughan clients in person and also support projects remotely. We tailor each site to how your business wins customers.",
    },
    {
      q: "Can Mintek modernize an existing Vaughan business website?",
      a: "Yes. We modernise dated or slow Vaughan websites, rebuilding on a fast, mobile-first foundation with clearer calls to action and stronger SEO, while keeping what already works. We start with a quick review of your current site and recommend the highest-impact improvements.",
    },
    {
      q: "How much does a Vaughan business website cost?",
      a: "Vaughan business website projects start at CAD $1,500, depending on pages, design, content and custom features. A focused, conversion-ready site sits near the starting point. We confirm a fixed quote after a short conversation about your goals.",
    },
    {
      q: "Can Mintek meet Vaughan clients in person?",
      a: "Yes. Vaughan is a short distance from our Brampton base, so in-person meetings are available for discovery, demos and handover, alongside video and email for convenience.",
    },
    {
      q: "Will I own my Vaughan website?",
      a: "Yes. You own your website once it is complete and paid for, including content and code. We can build it so you update key content yourself, and you are never locked into a proprietary platform.",
    },
  ],
  "local-seo-gta": [
    {
      q: "What does local SEO include?",
      a: "Our local SEO work covers an audit of your current site and search presence, on-page SEO such as titles, headings and content structure, technical SEO like site speed, crawlability and structured data, and local signals including your Google Business Profile, categories, listings and local landing pages. We also set up reporting so you can see what was changed and how visibility develops. It is a set of fundamentals that make a site eligible to rank locally, not a single trick.",
    },
    {
      q: "How long does SEO take to show results?",
      a: "SEO is a gradual process rather than an instant switch. Technical and on-page fixes can be implemented quickly, but search engines take time to re-crawl a site and reflect changes, and competitive local terms take longer than niche ones. We focus on doing the right work and reporting on it honestly, rather than promising a specific timeframe we cannot control.",
    },
    {
      q: "Can you guarantee first-page or #1 Google rankings?",
      a: "No, and we would be cautious of anyone who does. Rankings are decided by Google's algorithms and by what your competitors are doing, none of which any agency controls. What we can commit to is doing the work that gives a site the best chance to rank: a clean technical foundation, well-structured on-page content, an optimized local presence and clear reporting so you can see exactly what we changed.",
    },
    {
      q: "Do you serve the whole GTA?",
      a: "Yes. We work with businesses across the GTA, including Toronto, Brampton, Mississauga, Vaughan and Markham. Being based in Brampton means we can also meet in person to understand your local market before starting. Local SEO itself is delivered the same way wherever you are, since it centres on your website, your listings and the areas you want to reach.",
    },
    {
      q: "Do I need a new website for SEO to work?",
      a: "Not always. In many cases we improve the site you already have by fixing technical issues, restructuring pages and strengthening content. If a site is very slow, hard to edit or built on a platform that blocks good SEO, we will tell you honestly and can rebuild it, but a new website is a recommendation we only make when it is genuinely warranted.",
    },
    {
      q: "How is local SEO priced?",
      a: "Pricing depends on the size of your site, the competitiveness of your market and whether you want a one-off audit and fixes or ongoing work. We scope this after an initial conversation and audit so you know what is included before committing. We keep the work transparent, with reporting on what was done, rather than charging for vague retainers.",
    },
    {
      q: "Do you optimize Google Business Profiles?",
      a: "Yes. Optimizing your Google Business Profile is a core part of local SEO. We review and complete your profile, choose accurate categories, keep your business information consistent across listings, and align it with your website and local landing pages. A well-maintained profile helps you show up in local map results and gives searchers the details they need to contact you.",
    },
    {
      q: "How do you report on SEO work?",
      a: "We set up reporting so you can see the state of your search presence and what we have changed. Using tools such as Google Search Console and Google Analytics, we track visibility, traffic and the actions taken on the site, and we summarise the work in plain language. The goal is that you always know what was done and why, rather than paying for activity you cannot see.",
    },
  ],
};

// Project-specific FAQs for case studies, keyed by slug.
export const caseStudyFaqs = {
  "parking-marketplace-platform": [
    {
      q: "What is Rent a Parking?",
      a: "Rent a Parking is a location-based marketplace that lets people rent out unused driveways, garages and parking spaces. Mintek designed and built it as a map-first web application, with location search, geographic filtering and listing management, on a foundation intended to scale across Canadian cities.",
    },
    {
      q: "Is Rent a Parking a mobile app?",
      a: "No. Rent a Parking is a responsive web application, not a native mobile app. It works in the browser on phones, tablets and desktops, with a map-first interface built for on-the-go use. This case study is an example of our custom software and marketplace development, not mobile app development.",
    },
    {
      q: "Can Mintek build a marketplace like this for my business?",
      a: "Yes. Rent a Parking shows our approach to custom marketplaces: map-based discovery, location search, structured listings and marketplace SEO. We can build a two-sided or location-based marketplace for your industry, usually starting with a focused first version that proves the core loop before expanding. See our marketplace development service for details.",
    },
  ],
  "google-sheets-event-discovery-app": [
    {
      q: "How do event updates work on the Laal Button site?",
      a: "Event information is maintained in Google Sheets, and the website reads it live, so staff publish and update events from a familiar spreadsheet without a developer. The app presents those events in a clean, responsive discovery interface. It is read-only: visitors browse events on the site, and registration is completed externally on Eventbrite.",
    },
    {
      q: "Does the app handle registration or payments?",
      a: "No. The application is a read-only event-discovery experience. It does not include user accounts, in-app registration, ticketing or payment processing. Each listed event links out to Eventbrite, where registration is completed. This kept the site fast and simple to maintain, with no custom backend.",
    },
    {
      q: "Can Mintek build a Google Sheets-powered site for me?",
      a: "Yes. This project is an example of our Google Sheets website development. If you have structured, frequently changing, non-sensitive content such as events, menus or listings, we can build a site your team updates from a spreadsheet. For sensitive or transactional systems we use a proper database instead.",
    },
  ],
  "restaurant-online-ordering-system": [
    {
      q: "What did Mintek build for Airport Sweets and Tandoori?",
      a: "We built a fully custom online ordering system with secure Stripe payments, a real-time admin dashboard, order tracking and SMS marketing driven by call-history analytics. It removed third-party ordering commissions and gave the restaurant direct control over payments, orders and customer relationships.",
    },
    {
      q: "What results did it achieve?",
      a: "In November, the restaurant received 684 customer calls, up from an average of 523, and saw a return on investment of up to 705 percent depending on the profit-per-order scenario. 323 customers placed at least one order. These figures come from the project's own reporting.",
    },
    {
      q: "Can Mintek build an ordering system for my restaurant?",
      a: "Yes. This is an example of our custom software and business automation work for restaurants. We can build direct online ordering with payments to reduce platform commissions, or connect and feature an existing ordering platform if that suits you better. See our restaurant website design and custom software services.",
    },
  ],
  pawpals: [
    {
      q: "What did Mintek build for PawPals?",
      a: "PawPals is a Brampton dog daycare. Mintek designed and built a fast, mobile-first website with a clear waitlist funnel, focused on turning local searches into qualified enquiries before opening. It includes strong local SEO foundations and conversion-focused calls to action.",
    },
    {
      q: "Can Mintek build a lead-generation website for my local business?",
      a: "Yes. PawPals is an example of our web design work for Brampton small businesses. We build mobile-first sites with focused funnels that capture enquiries, ideal for new or growing local businesses. See our Web Design Brampton service for details.",
    },
  ],
  "doaba-junction": [
    {
      q: "What did Mintek build for Doaba Junction?",
      a: "Mintek designed a mobile-first restaurant website for Doaba Junction focused on menu presentation, click-to-call, Google Maps directions, business hours and catering enquiries, with conversion-focused calls to action built for diners deciding on their phones.",
    },
    {
      q: "Can Mintek build a website for my restaurant?",
      a: "Yes. Doaba Junction is an example of our restaurant website design. We build menu-first, mobile-friendly sites that drive calls, directions and catering enquiries, and can add or connect online ordering. See our restaurant website design service.",
    },
  ],
  "bookme-scheduling-platform": [
    {
      q: "What is BookMe?",
      a: "BookMe is a Calendly-style booking platform built as a prototype for independent service providers such as barbers, makeup artists and small studios. Each business gets a shareable booking page where clients self-schedule, while owners manage their team, services and availability from a dashboard. It is a demonstration of our web application and custom software work, not a paid client engagement.",
    },
    {
      q: "How does BookMe prevent double-bookings?",
      a: "Concurrency is enforced at the database level with a unique index, not just a check in the interface. That means if two people race for the same slot, only one can ever succeed. The availability engine also computes bookable times in the business's timezone, subtracting existing bookings and, when connected, external calendar busy times, with configurable service durations and buffers.",
    },
    {
      q: "Can Mintek build a booking platform for my business?",
      a: "Yes. BookMe shows our approach to booking and scheduling software: a self-serve public booking flow, a real-time availability engine, an owner dashboard and optional Google Calendar, email and SMS integrations. We can build a tailored version for your industry, usually starting with a focused first version that proves the core booking loop before expanding. See our web application development and custom software development services.",
    },
  ],
};

export const getServiceFaqs = (slug) => serviceFaqs[slug] || [];
export const getCaseStudyFaqs = (slug) => caseStudyFaqs[slug] || [];

// ---------------------------------------------------------------------------
// Testimonials
// INTEGRITY: `testimonials` holds only real, client-approved quotes. It is
// empty until approved wording is provided, so production never shows a
// fabricated endorsement. `sampleTestimonials` are obviously-fictional design
// placeholders (NOT real clients) shown only when the preview flag is set.
// ---------------------------------------------------------------------------
export const testimonials = [];

// Fictional personas for local design preview only. Never presented as real
// clients and never included in a normal production build.
export const sampleTestimonials = [
  {
    id: "software",
    tag: "software",
    kind: "software",
    quote:
      "Mintek replaced a tangle of spreadsheets with a single dashboard our whole team actually enjoys using. They understood our workflow first, then built exactly what we needed.",
    name: "Priya S.",
    role: "Operations Lead",
    business: "Rent a Parking",
  },
  {
    id: "automation",
    tag: "automation",
    kind: "automation",
    quote:
      "A report that used to eat half a day now runs on its own every morning. Fewer errors, less busywork, and the team can focus on customers instead of copy-paste.",
    name: "Daniel M.",
    role: "Founder",
    business: "PawPals Dog Daycare",
  },
  {
    id: "website",
    tag: "website",
    kind: "website",
    quote:
      "Our new site is fast, looks fantastic on mobile and is finally bringing in enquiries. The whole process was clear and genuinely enjoyable from start to finish.",
    name: "Bhavish K.",
    role: "Owner",
    business: "Relax Cafe",
  },
];

const showSampleTestimonials =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  import.meta.env.VITE_SHOW_SAMPLE_TESTIMONIALS === "true";

// Returns approved testimonials (optionally filtered by tag). Falls back to
// fictional samples only when the preview flag is explicitly enabled.
export const getTestimonials = ({ tag, limit } = {}) => {
  const source = testimonials.length
    ? testimonials
    : showSampleTestimonials
      ? sampleTestimonials
      : [];
  const filtered = tag ? source.filter((t) => t.tag === tag) : source;
  return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
};
