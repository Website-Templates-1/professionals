// Node-side helper for build scripts (sitemap, validation). Reads the Markdown
// blog posts from disk using the SAME frontmatter parser as the app registry,
// so the two never drift apart.
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { parseFrontmatter } from "../src/config/frontmatter.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const blogDir = join(__dirname, "..", "src", "content", "blog");

// Returns [{ file, slug, data, content }] for every real post (ignores files
// starting with "_", e.g. _template.md).
export function readBlogPosts() {
  return readdirSync(blogDir)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map((file) => {
      const raw = readFileSync(join(blogDir, file), "utf-8");
      const { data, content } = parseFrontmatter(raw);
      const slug = data.slug || file.replace(/\.md$/, "");
      return { file, slug, data, content };
    });
}

// Matches the production visibility rules in src/config/blog.js.
export function isPublished(data) {
  if (data.draft) return false;
  if (data.date && new Date(data.date) > new Date()) return false;
  return true;
}
