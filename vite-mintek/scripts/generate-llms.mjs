// Generates public/llms.txt from the site config (llmstxt.org format) so the
// list of key pages always matches the routes. Runs automatically before build.
// The file is curated (key pages, not every blog post) and deterministic.
//
// Note: vercel.json's catch-all rewrite serves index.html for unknown paths,
// but static files in public/ are served directly and bypass the rewrite, so
// /llms.txt returns this file rather than homepage HTML.
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  site,
  absoluteUrl,
  publicServices,
  orderedCaseStudies,
} from "../src/config/siteConfig.js";
import { readBlogPosts, isPublished } from "./blog-posts.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

// Collapses whitespace so multi-line config strings render as one clean line.
const oneLine = (text = "") => text.replace(/\s+/g, " ").trim();

// Renders a single markdown list item: - [title](url): description
const link = (title, path, description) => {
  const url = absoluteUrl(path);
  const desc = oneLine(description);
  return desc ? `- [${title}](${url}): ${desc}` : `- [${title}](${url})`;
};

// --- Curated guides (blog): featured first, topped up to ~6 by newest date ---
const TARGET_GUIDES = 6;
const publishedPosts = readBlogPosts()
  .filter((post) => isPublished(post.data))
  // Newest first, then slug as a stable tiebreaker for deterministic output.
  .sort((a, b) => {
    const da = new Date(a.data.date || 0).getTime();
    const db = new Date(b.data.date || 0).getTime();
    if (db !== da) return db - da;
    return a.slug.localeCompare(b.slug);
  });

const featured = publishedPosts.filter((p) => p.data.featured);
const rest = publishedPosts.filter((p) => !p.data.featured);
const curatedGuides = [...featured, ...rest].slice(0, TARGET_GUIDES);

// --- Sections ---------------------------------------------------------------
const serviceLines = [
  link("All Services", "/services", "Overview of everything Mintek Software builds."),
  ...publicServices.map((s) => link(s.title, `/${s.slug}`, s.short)),
];

const caseStudyLines = [
  link("Case Studies", "/case-studies", "Selected projects and outcomes."),
  ...orderedCaseStudies
    .filter((c) => c.kind !== "concept")
    .map((c) => link(c.title, `/case-studies/${c.slug}`, c.shortDescription)),
];

const guideLines = [
  link("Blog", "/blog", "Practical guides for GTA businesses on software, automation and websites."),
  ...curatedGuides.map((p) =>
    link(p.data.title, `/blog/${p.slug}`, p.data.metaDescription)
  ),
];

const companyLines = [
  link("Home", "/", oneLine(site.tagline)),
  link("About", "/about", "Who Mintek Software is and how we work."),
  link("Contact", "/contact", "Start a project or ask a question."),
];

// --- Assemble ---------------------------------------------------------------
const paragraph = oneLine(
  `${site.description} ${site.serviceAreaStatement}`
);

const sections = [
  `# ${site.brand}`,
  ``,
  `> ${oneLine(site.tagline)}`,
  ``,
  paragraph,
  ``,
  `## Services`,
  ``,
  serviceLines.join("\n"),
  ``,
  `## Case Studies`,
  ``,
  caseStudyLines.join("\n"),
  ``,
  `## Guides`,
  ``,
  guideLines.join("\n"),
  ``,
  `## Company`,
  ``,
  companyLines.join("\n"),
  ``,
];

const output = sections.join("\n");

const linkCount = [serviceLines, caseStudyLines, guideLines, companyLines].reduce(
  (sum, list) => sum + list.length,
  0
);

await writeFile(join(publicDir, "llms.txt"), output, "utf-8");

console.log(`Generated llms.txt (${linkCount} links)`);
