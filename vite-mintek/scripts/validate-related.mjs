// Validates internal links across blog posts, service pages, and case studies
// so a stale slug fails the build early rather than shipping a dead link.
// Runs before build via `prebuild`.
//
// Checks:
//   (a) every TOPIC_MAP service/case-study slug resolves to a real entry, and no
//       service slug points at a hidden (noindex) service — FAIL on any miss.
//   (b) service, case-study, and blog related-slug overrides resolve. Blog
//       overrides must not point at a hidden service.
//   (c) root-relative links in page copy, FAQs, nav, and footer resolve to a
//       real route, and do not target a hidden service.
//   (d) any blog tag used across posts that has no TOPIC_MAP entry (and is not
//       intentionally ignored) — WARN, so new topics don't silently produce
//       empty related sections.
import { TOPIC_MAP, IGNORED_TAGS } from "../src/config/topicMap.js";
import {
  services,
  caseStudies,
  caseStudyRedirects,
  navGroups,
  footerNav,
  homeFaqs,
  serviceFaqs,
  caseStudyFaqs,
} from "../src/config/siteConfig.js";
import { readBlogPosts } from "./blog-posts.mjs";

const serviceBySlug = new Map(services.map((s) => [s.slug, s]));
const caseStudySlugs = new Set(caseStudies.map((c) => c.slug));
const posts = readBlogPosts();
const blogSlugs = new Set(posts.map(({ slug }) => slug));

const errors = [];

const requireService = (where, slug, { allowHidden = false } = {}) => {
  const service = serviceBySlug.get(slug);
  if (!service) {
    errors.push(`${where}: unknown service "${slug}"`);
  } else if (service.hidden && !allowHidden) {
    errors.push(
      `${where}: "${slug}" is a hidden (noindex) service and must not be linked`
    );
  }
};

const requireCaseStudy = (where, slug) => {
  if (!caseStudySlugs.has(slug)) {
    errors.push(`${where}: unknown case study "${slug}"`);
  }
};

const requirePost = (where, slug) => {
  if (!blogSlugs.has(slug)) {
    errors.push(`${where}: unknown blog post "${slug}"`);
  }
};

for (const [tag, entry] of Object.entries(TOPIC_MAP)) {
  for (const slug of entry.services || []) {
    requireService(`TOPIC_MAP["${tag}"].services`, slug);
  }
  for (const slug of entry.caseStudies || []) {
    requireCaseStudy(`TOPIC_MAP["${tag}"].caseStudies`, slug);
  }
}

// Service related overrides. The render path drops hidden services, so a hidden
// relatedServices ref is legal here and must not error.
for (const service of services) {
  const where = `services["${service.slug}"]`;
  for (const slug of service.relatedServices || []) {
    requireService(`${where}.relatedServices`, slug, { allowHidden: true });
  }
  for (const slug of service.relatedCaseStudies || []) {
    requireCaseStudy(`${where}.relatedCaseStudies`, slug);
  }
  for (const slug of service.relatedPosts || []) {
    requirePost(`${where}.relatedPosts`, slug);
  }
}

for (const study of caseStudies) {
  const where = `caseStudies["${study.slug}"]`;
  for (const slug of study.services || []) {
    requireService(`${where}.services`, slug, { allowHidden: true });
  }
  for (const slug of study.relatedServices || []) {
    requireService(`${where}.relatedServices`, slug, { allowHidden: true });
  }
  for (const slug of study.relatedCaseStudies || []) {
    requireCaseStudy(`${where}.relatedCaseStudies`, slug);
  }
  for (const slug of study.relatedPosts || []) {
    requirePost(`${where}.relatedPosts`, slug);
  }
}

for (const { slug, data } of posts) {
  const where = `blog/${slug}`;
  for (const serviceSlug of data.relatedServices || []) {
    requireService(`${where}.relatedServices`, serviceSlug);
  }
  for (const studySlug of data.relatedCaseStudies || []) {
    requireCaseStudy(`${where}.relatedCaseStudies`, studySlug);
  }
}

for (const slug of Object.keys(serviceFaqs)) {
  if (!serviceBySlug.has(slug)) {
    errors.push(`serviceFaqs: unknown service "${slug}"`);
  }
}
for (const slug of Object.keys(caseStudyFaqs)) {
  if (!caseStudySlugs.has(slug)) {
    errors.push(`caseStudyFaqs: unknown case study "${slug}"`);
  }
}

// Root-relative links in copy, FAQs, and navigation.
const STATIC_PATHS = new Set([
  "/",
  "/services",
  "/case-studies",
  "/blog",
  "/research",
  "/research/brampton-business-websites-2026",
  "/start-a-project",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/past-work",
  ...caseStudyRedirects.map((r) => `/case-studies/${r.from}`),
]);

const normalizePath = (path) => {
  const bare = path.split("#")[0].split("?")[0];
  if (bare.length > 1 && bare.endsWith("/")) return bare.slice(0, -1);
  return bare;
};

const checkPath = (where, path) => {
  const clean = normalizePath(path);
  if (STATIC_PATHS.has(clean)) return;
  if (clean.startsWith("/blog/")) {
    requirePost(where, clean.slice("/blog/".length));
    return;
  }
  if (clean.startsWith("/case-studies/")) {
    requireCaseStudy(where, clean.slice("/case-studies/".length));
    return;
  }
  const slug = clean.replace(/^\//, "");
  if (!slug) return;
  requireService(where, slug);
};

const LINK_RE = /\[[^\]]*\]\(([^)]+)\)/g;
const ABSOLUTE_INTERNAL_RE =
  /https?:\/\/(?:www\.)?minteksoftware\.com([^)\s]*)/g;

const checkMarkdown = (where, text) => {
  if (typeof text !== "string") return;
  for (const match of text.matchAll(LINK_RE)) {
    const href = match[1].trim();
    if (/^(https?:|mailto:|#)/.test(href)) continue;
    if (!href.startsWith("/")) {
      errors.push(`${where}: internal link must be root-relative, got "${href}"`);
      continue;
    }
    checkPath(where, href);
  }
  for (const match of text.matchAll(ABSOLUTE_INTERNAL_RE)) {
    errors.push(
      `${where}: use a root-relative path instead of "${match[0]}"`
    );
  }
};

const walk = (where, value) => {
  if (typeof value === "string") {
    checkMarkdown(where, value);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => walk(`${where}[${i}]`, item));
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    if ((key === "to" || key === "path") && typeof child === "string" && child.startsWith("/")) {
      checkPath(`${where}.${key}`, child);
    }
    walk(`${where}.${key}`, child);
  }
};

for (const post of posts) {
  checkMarkdown(`blog/${post.slug}`, post.content);
  (post.data.faqs || []).forEach((faq, i) => {
    checkMarkdown(`blog/${post.slug} faqs[${i}]`, faq?.a);
  });
}

for (const service of services) walk(`services["${service.slug}"]`, service);
for (const study of caseStudies) walk(`caseStudies["${study.slug}"]`, study);
walk("navGroups", navGroups);
walk("footerNav", footerNav);
walk("homeFaqs", homeFaqs);
walk("serviceFaqs", serviceFaqs);
walk("caseStudyFaqs", caseStudyFaqs);

if (errors.length > 0) {
  console.error(`\nRelated-content validation failed (${errors.length} issue(s)):`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error(
    "\nFix the slug or link so it matches a real page in src/config/siteConfig.js or src/content/blog/.\n"
  );
  process.exit(1);
}

// Warn (do not fail) on post tags that map to nothing.
const ignored = new Set(IGNORED_TAGS);
const mappedTags = new Set(Object.keys(TOPIC_MAP));
const unmapped = new Map();

for (const { data } of posts) {
  const tags = Array.isArray(data.tags) ? data.tags : [];
  for (const tag of tags) {
    if (ignored.has(tag) || mappedTags.has(tag)) continue;
    unmapped.set(tag, (unmapped.get(tag) || 0) + 1);
  }
}

if (unmapped.size > 0) {
  console.warn(
    `\nRelated-content notice: ${unmapped.size} blog tag(s) have no topic-map entry ` +
      `(they add no service/case-study links):`
  );
  for (const [tag, count] of unmapped) {
    console.warn(
      `  - "${tag}" (${count} post(s)) -> add to TOPIC_MAP or IGNORED_TAGS in src/config/topicMap.js`
    );
  }
  console.warn("");
}

console.log(
  `Related-content validation passed (${posts.length} posts, ${services.length} services, ${caseStudies.length} case studies, ${Object.keys(TOPIC_MAP).length} topic-map tags).`
);
