// Single source of truth for brand, contact (NAP), navigation and page content.
// Update values here and they propagate to metadata, structured data, nav and pages.

export const site = {
  brand: "Mintek Software",
  legalName: "Mintek Software",
  domain: "https://minteksoftware.com",
  // Canonical host choice: non-www. Configure hosting to redirect www -> non-www.
  tagline: "Custom software and website development for growing businesses",
  description:
    "Mintek Software builds custom websites, business applications and software solutions that automate operations and support business growth.",
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
// Services (each becomes /<slug> with a dedicated, indexable page)
// ---------------------------------------------------------------------------
export const services = [
  {
    slug: "custom-software-development",
    icon: "Code",
    color: "#6C55F9",
    title: "Custom Software Development",
    metaTitle: "Custom Software Development | Mintek Software",
    metaDescription:
      "Custom software development for growing businesses. Mintek Software designs and builds tailored applications that streamline operations and scale with you.",
    short:
      "Tailored applications designed around your exact workflows, not generic templates.",
    hero:
      "Custom software built around how your business actually works.",
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
    relatedCaseStudies: ["restaurant-online-ordering-system"],
  },
  {
    slug: "website-development",
    icon: "Language",
    color: "#FF3D85",
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
      "We design and build modern, responsive websites with clean code, strong technical SEO foundations and content you can update yourself. From marketing sites to data-driven web apps.",
    process: [
      "Strategy: clarify audience, goals and the actions you want visitors to take.",
      "Design: responsive layouts focused on clarity and conversion.",
      "Build: fast, accessible, SEO-friendly code with analytics wired in.",
      "Launch: performance tuning, search setup and handover.",
    ],
    tech: ["React", "Vite", "Next.js", "Google Sheets API", "Analytics"],
    outcome:
      "A fast, credible website that ranks for the searches your customers actually make and turns traffic into enquiries.",
    relatedCaseStudies: ["google-sheets-powered-website"],
  },
  {
    slug: "business-automation",
    icon: "AutoAwesome",
    color: "#35bb78",
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
      "We identify the highest-cost manual processes and replace them with automated workflows, integrations and dashboards, so the work happens reliably in the background.",
    process: [
      "Audit: measure where time and errors actually accumulate.",
      "Prioritize: target the automations with the fastest payback.",
      "Build: connect your tools with reliable, monitored workflows.",
      "Measure: track hours saved and error rates after launch.",
    ],
    tech: ["Node.js", "REST APIs", "Webhooks", "SQL", "Cloud Functions"],
    outcome:
      "Reclaimed hours, fewer errors and reporting that updates itself. For example, reducing multi-hour manual reporting to minutes.",
    relatedCaseStudies: ["restaurant-online-ordering-system"],
  },
  {
    slug: "mobile-app-development",
    icon: "Devices",
    color: "#05B4E1",
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
    relatedCaseStudies: ["map-first-parking-marketplace"],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);

// ---------------------------------------------------------------------------
// Case studies (each becomes /case-studies/<slug>)
// ---------------------------------------------------------------------------
export const caseStudies = [
  {
    slug: "google-sheets-powered-website",
    title: "Google Sheets Powered Website",
    client: "LaaL Button",
    year: "2023",
    metaTitle: "Case Study: Google Sheets Powered Website | Mintek Software",
    metaDescription:
      "How Mintek Software built a fully dynamic, no-backend website for a Toronto comedy club, powered entirely by Google Sheets so non-technical staff manage content.",
    shortDescription:
      "A dynamic comedy club website powered by Google Sheets, enabling non-technical team members to manage content through spreadsheets.",
    summary:
      "In 2023, we developed a fully dynamic website for LaaL Button, a rising comedy club and production house based in Toronto. Unlike traditional CMS solutions, this website fetches and renders content directly from Google Sheets, giving non-technical team members full control over everything from show lineups and performer bios to background images and footers.",
    services: ["website-development"],
    features: [
      "Event Listings & Lineups: all shows, dates, venues, and artist details pulled live from Google Sheets",
      "Fully Dynamic Content: from banners to bios, images to footer text, every inch of the site is configurable through a spreadsheet",
      "Instant Updates: no rebuilds or logins, just update the sheet and the next visitor sees the changes",
      "No Backend Needed: content is retrieved client-side via the Google Sheets API, keeping the site lightweight and fast",
      "User Analytics: integrated Amplitude to track how users interact with the schedule, lineup, and ticket links",
    ],
    results: [
      "Saved the team hours of frustration compared to their old WordPress setup",
      "Enabled non-developers to control the website entirely",
      "Smoother user experience across devices, resulting in higher engagement",
      "Reduced operational overhead: no plugins, no logins, no content freezes",
    ],
    techStack: ["React", "Google Sheets API", "Amplitude"],
    status: "Live",
    liveUrl: "https://laalbutton.com",
    githubUrl: null,
  },
  {
    slug: "map-first-parking-marketplace",
    title: "Map-First Parking Marketplace",
    client: "Rent a Parking",
    year: "2024",
    metaTitle: "Case Study: Map-First Parking Marketplace | Mintek Software",
    metaDescription:
      "How Mintek Software designed and built Rent a Parking, a map-first marketplace that lets people rent out unused parking spaces, reaching 100+ listings.",
    shortDescription:
      "A map-first parking rental marketplace enabling users to rent out their unused parking spaces, built with a modern stack and sophisticated mapping integration.",
    summary:
      "In 2024, we designed and built Rent a Parking, a location-based marketplace that lets everyday people rent out their unused driveways, garages, or parking spots. Inspired by platforms like Airbnb but purpose-built for parking, it prioritized a map-first experience so users can explore listings visually and connect directly with space owners.",
    services: ["mobile-app-development", "custom-software-development"],
    features: [
      "Map-First UX: dynamic Mapbox-powered map interface with real-time filter updates",
      "Listing Portal for Hosts: easy-to-use interface for posting parking spaces with detailed information",
      "Robust Search & Filters: advanced filtering including location proximity and space type",
      "Off-Platform Messaging: streamlined communication between renters and hosts",
      "Responsive, Mobile-Optimized Design: seamless experience across all devices",
    ],
    results: [
      "100+ listings across major urban neighborhoods",
      "10 daily active users at its early peak",
      "Zero marketing spend, all growth was organic",
      "Built with a strong foundation for future scaling",
    ],
    techStack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Mapbox GL JS"],
    status: "Live",
    liveUrl: "http://rentaparking.ca",
    githubUrl: null,
  },
  {
    slug: "restaurant-online-ordering-system",
    title: "Restaurant Online Ordering System",
    client: "Airport Sweets and Tandoori",
    year: "2022",
    metaTitle: "Case Study: Restaurant Online Ordering System | Mintek Software",
    metaDescription:
      "How Mintek Software built a custom online ordering system with Stripe payments and SMS marketing for a Brampton restaurant, driving up to 705% ROI in a month.",
    shortDescription:
      "A fully custom online ordering system with integrated payments, real-time order management, and SMS marketing capabilities.",
    summary:
      "In 2022, we partnered with Airport Sweets and Tandoori, a local restaurant in Brampton, Ontario that was struggling to find a robust online ordering system. We built a fully custom solution that eliminated third-party commissions and gave the restaurant full control over their digital storefront, accepting direct payments, managing orders in real time, and running SMS-based marketing with a clean, mobile-first design.",
    services: ["custom-software-development", "business-automation"],
    features: [
      "Real-Time Online Ordering: dynamic menu with cart functionality, order tracking, and payment processing",
      "Secure Stripe Integration: one-time purchases and promo code handling with seamless checkout",
      "Customer Behavior Analytics: tracked caller frequency and repeat engagement",
      "SMS Retargeting Campaigns: custom scripts to identify top callers and target them with promotions",
      "Admin Dashboard: staff could manage menu items, view order history, and adjust offers",
    ],
    results: [
      "684 customer calls in November alone, up from an average of 523",
      "ROI of up to 705% in November depending on profit-per-order scenario",
      "323 customers placed at least one order, with 18 ordering 3+ times",
      "173 out of 290 orders occurred during promotional periods",
      "Identified 68 loyal customers who ordered 2+ times in one month",
    ],
    techStack: ["React", "Node.js", "Express", "SQL", "Stripe", "SMS API", "Google Analytics"],
    status: "Completed",
    liveUrl: null,
    githubUrl: null,
  },
];

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
export const primaryNav = [
  { name: "Home", path: "/" },
  { name: "Custom Software", path: "/custom-software-development" },
  { name: "Website Development", path: "/website-development" },
  { name: "Business Automation", path: "/business-automation" },
  { name: "Mobile Apps", path: "/mobile-app-development" },
  { name: "Case Studies", path: "/case-studies" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export const footerNav = [
  {
    heading: "Services",
    links: services.map((s) => ({ name: s.title, path: `/${s.slug}` })),
  },
  {
    heading: "Company",
    links: [
      { name: "About", path: "/about" },
      { name: "Case Studies", path: "/case-studies" },
      { name: "Contact", path: "/contact" },
    ],
  },
];
