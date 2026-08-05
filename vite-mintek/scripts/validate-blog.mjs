// Validates blog frontmatter and slugs so a malformed post fails the build
// early rather than shipping broken pages. Runs before build via `prebuild`.
import { readBlogPosts } from "./blog-posts.mjs";

const REQUIRED_STRING_FIELDS = ["title", "metaDescription"];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const errors = [];
const seenSlugs = new Map();

const posts = readBlogPosts();

for (const { file, slug, data } of posts) {
  const where = `${file}`;

  for (const field of REQUIRED_STRING_FIELDS) {
    if (!data[field] || typeof data[field] !== "string") {
      errors.push(`${where}: missing required "${field}"`);
    }
  }

  if (!data.date) {
    errors.push(`${where}: missing required "date" (YYYY-MM-DD)`);
  } else if (!DATE_RE.test(String(data.date))) {
    errors.push(`${where}: "date" must be YYYY-MM-DD, got "${data.date}"`);
  } else if (Number.isNaN(new Date(data.date).getTime())) {
    errors.push(`${where}: "date" is not a valid calendar date: "${data.date}"`);
  }

  if (data.updated && !DATE_RE.test(String(data.updated))) {
    errors.push(`${where}: "updated" must be YYYY-MM-DD, got "${data.updated}"`);
  }

  if (data.tags && !Array.isArray(data.tags)) {
    errors.push(`${where}: "tags" must be a list`);
  }

  if (data.faqs !== undefined) {
    if (!Array.isArray(data.faqs)) {
      errors.push(`${where}: "faqs" must be a list of { q, a } entries`);
    } else {
      data.faqs.forEach((faq, i) => {
        if (!faq || typeof faq.q !== "string" || typeof faq.a !== "string") {
          errors.push(`${where}: faqs[${i}] must have string "q" and "a"`);
        }
      });
    }
  }

  // Optional "People also search for" overrides: lists of slugs. Existence of
  // each slug is validated separately against the topic map / config in
  // scripts/validate-related.mjs; here we only enforce shape.
  for (const field of ["relatedServices", "relatedCaseStudies"]) {
    if (data[field] === undefined) continue;
    if (!Array.isArray(data[field])) {
      errors.push(`${where}: "${field}" must be a list of slugs`);
    } else {
      data[field].forEach((slug, i) => {
        if (typeof slug !== "string" || !SLUG_RE.test(slug)) {
          errors.push(
            `${where}: ${field}[${i}] must be a lowercase kebab-case slug`
          );
        }
      });
    }
  }

  if (!SLUG_RE.test(slug)) {
    errors.push(
      `${where}: slug "${slug}" must be lowercase kebab-case (a-z, 0-9, hyphens)`
    );
  }

  if (seenSlugs.has(slug)) {
    errors.push(`${where}: duplicate slug "${slug}" (also in ${seenSlugs.get(slug)})`);
  } else {
    seenSlugs.set(slug, file);
  }
}

if (errors.length > 0) {
  console.error(`\nBlog validation failed (${errors.length} issue(s)):`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error("");
  process.exit(1);
}

console.log(`Blog validation passed (${posts.length} post(s)).`);
