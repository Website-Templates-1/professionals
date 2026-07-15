// Generates public/sitemap.xml and public/robots.txt from the site config so the
// list of URLs always matches the routes. Runs automatically before build.
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { site, services, caseStudies } from "../src/config/siteConfig.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const staticPaths = ["/", "/case-studies", "/about", "/contact"];
// Exclude hidden/deferred service pages (e.g. noindex location pages).
const servicePaths = services.filter((s) => !s.hidden).map((s) => `/${s.slug}`);
const caseStudyPaths = caseStudies.map((c) => `/case-studies/${c.slug}`);

const paths = [...staticPaths, ...servicePaths, ...caseStudyPaths];

const today = new Date().toISOString().split("T")[0];

const urls = paths
  .map((path) => {
    const loc = path === "/" ? site.domain : `${site.domain}${path}`;
    const priority = path === "/" ? "1.0" : "0.8";
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${site.domain}/sitemap.xml\n`;

await writeFile(join(publicDir, "sitemap.xml"), sitemap, "utf-8");
await writeFile(join(publicDir, "robots.txt"), robots, "utf-8");

console.log(`Generated sitemap.xml (${paths.length} URLs) and robots.txt`);
