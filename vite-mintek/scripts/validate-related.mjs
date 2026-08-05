// Validates the "People also search for" topic map against real content so a
// stale slug fails the build early rather than shipping a dead or wrong link.
// Runs before build via `prebuild`.
//
// Checks:
//   (a) every TOPIC_MAP service/case-study slug resolves to a real entry, and no
//       service slug points at a hidden (noindex) service — FAIL on any miss.
//   (b) any blog tag used across posts that has no TOPIC_MAP entry (and is not
//       intentionally ignored) — WARN, so new topics don't silently produce
//       empty related sections.
import { TOPIC_MAP, IGNORED_TAGS } from "../src/config/topicMap.js";
import { services, caseStudies } from "../src/config/siteConfig.js";
import { readBlogPosts } from "./blog-posts.mjs";

const serviceBySlug = new Map(services.map((s) => [s.slug, s]));
const caseStudySlugs = new Set(caseStudies.map((c) => c.slug));

const errors = [];

for (const [tag, entry] of Object.entries(TOPIC_MAP)) {
  for (const slug of entry.services || []) {
    const service = serviceBySlug.get(slug);
    if (!service) {
      errors.push(`TOPIC_MAP["${tag}"].services: unknown service "${slug}"`);
    } else if (service.hidden) {
      errors.push(
        `TOPIC_MAP["${tag}"].services: "${slug}" is a hidden (noindex) service and must not be linked`
      );
    }
  }
  for (const slug of entry.caseStudies || []) {
    if (!caseStudySlugs.has(slug)) {
      errors.push(`TOPIC_MAP["${tag}"].caseStudies: unknown case study "${slug}"`);
    }
  }
}

if (errors.length > 0) {
  console.error(`\nRelated-content validation failed (${errors.length} issue(s)):`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error(
    "\nFix the slug(s) in src/config/topicMap.js to match src/config/siteConfig.js.\n"
  );
  process.exit(1);
}

// Warn (do not fail) on post tags that map to nothing.
const ignored = new Set(IGNORED_TAGS);
const mappedTags = new Set(Object.keys(TOPIC_MAP));
const unmapped = new Map();

for (const { data } of readBlogPosts()) {
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
  `Related-content validation passed (topic map: ${
    Object.keys(TOPIC_MAP).length
  } tag(s), ${caseStudies.length} case studies, ${services.length} services).`
);
