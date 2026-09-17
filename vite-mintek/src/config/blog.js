import { parseFrontmatter } from "./frontmatter";

// ---------------------------------------------------------------------------
// Blog post registry.
//
// Posts are plain Markdown files in src/content/blog/*.md. This module is the
// SINGLE source of truth: a post is published purely by adding a file and
// unpublished by deleting it. No other file edits are needed. Routes, the index
// page, related posts and SEO all read from here.
// ---------------------------------------------------------------------------

const WORDS_PER_MINUTE = 200;

// Raw Markdown for every post, resolved at build time (SSG) and in the client.
const rawPosts = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const IS_PROD = import.meta.env.PROD;

const slugFromPath = (path) =>
  path.split("/").pop().replace(/\.md$/, "");

const computeReadingTime = (content) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

// Normalizes the optional `faqs` frontmatter into a clean [{ q, a }] list,
// dropping any malformed entries so a typo cannot crash rendering.
const parseFaqs = (faqs) =>
  Array.isArray(faqs)
    ? faqs
        .filter((f) => f && typeof f.q === "string" && typeof f.a === "string")
        .map((f) => ({ q: f.q, a: f.a }))
    : [];

const buildPost = (path, raw) => {
  const { data, content } = parseFrontmatter(raw);
  const slug = data.slug || slugFromPath(path);
  const faqs = parseFaqs(data.faqs);
  // FAQ copy is real reading, so count it toward the estimate even though it
  // lives in frontmatter rather than the Markdown body.
  const readingTime = computeReadingTime(
    content + faqs.map((f) => ` ${f.q} ${f.a}`).join("")
  );
  return {
    slug,
    title: data.title || slug,
    metaDescription: data.metaDescription || "",
    date: data.date ? String(data.date) : null,
    updated: data.updated ? String(data.updated) : null,
    author: data.author || "Mintek Software",
    tags: Array.isArray(data.tags) ? data.tags : [],
    category: data.category || null,
    // Optional "People also search for" overrides (service / case study slugs).
    // The topic map covers posts that omit these; overrides just fine-tune.
    relatedServices: Array.isArray(data.relatedServices)
      ? data.relatedServices
      : [],
    relatedCaseStudies: Array.isArray(data.relatedCaseStudies)
      ? data.relatedCaseStudies
      : [],
    coverImage: data.coverImage || null,
    // Opt-in: render the "Scope your site" tool below the article body. Set on
    // website-planning posts where a scoping recommendation fits reader intent.
    scopeTool: Boolean(data.scopeTool),
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    faqs,
    readingTime,
    content,
  };
};

// Files starting with "_" (e.g. _template.md) are authoring helpers, not posts.
const allPosts = Object.entries(rawPosts)
  .filter(([path]) => !slugFromPath(path).startsWith("_"))
  .map(([path, raw]) => buildPost(path, raw));

// In production, hide drafts and posts dated in the future. In dev, show
// everything so authors can preview work in progress.
const isVisible = (post) => {
  if (!IS_PROD) return true;
  if (post.draft) return false;
  if (post.date && new Date(post.date) > new Date()) return false;
  return true;
};

const posts = allPosts
  .filter(isVisible)
  .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

export const getAllPosts = () => posts;

export const getPost = (slug) => posts.find((p) => p.slug === slug);

export const getPostsByTag = (tag) =>
  posts.filter((p) => p.tags.includes(tag));

export const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();

// Featured posts first, then most recent, for the index page ordering.
export const orderedPosts = [
  ...posts.filter((p) => p.featured),
  ...posts.filter((p) => !p.featured),
];

// Posts sharing the most tags with the given slug, most recent as tiebreaker.
export const getRelatedPosts = (slug, limit = 3) => {
  const current = getPost(slug);
  if (!current) return [];
  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      shared: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        new Date(b.post.date || 0) - new Date(a.post.date || 0)
    )
    .slice(0, limit)
    .map((x) => x.post);
};

export { posts };
