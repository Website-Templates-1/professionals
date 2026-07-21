import { load as loadYaml } from "js-yaml";

// Isomorphic frontmatter parser used by BOTH the browser post registry
// (src/config/blog.js) and the Node sitemap/validation scripts, so there is a
// single parsing code path. Splits the leading `---` YAML block from the
// Markdown body and returns { data, content }.
export function parseFrontmatter(raw) {
  const normalized = String(raw).replace(/^\uFEFF/, "");
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(normalized);
  if (!match) {
    return { data: {}, content: normalized };
  }
  const data = loadYaml(match[1]) || {};
  const content = normalized.slice(match[0].length);
  return { data, content };
}
