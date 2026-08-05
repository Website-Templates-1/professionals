# Blog System — AI Agent Handoff Guide

Read this before building or improving blog content on the Mintek Software site.
It explains what the site is, how the blog works, how to add/improve posts, and
the rules you must follow. Everything here reflects the system that is already
implemented and building successfully.

---

## 1. Site gist (internalize before writing)

- **Brand:** Mintek Software — a Brampton-based studio that builds **custom
  software, business automation, and high-performance websites** for small and
  growing businesses across the Greater Toronto Area (Toronto, Mississauga,
  Vaughan). In-person meetings available; also serves remote clients.
- **Audience:** non-technical owners/operators of small/growing GTA businesses
  evaluating whether to hire a studio.
- **Conversion goal:** contact form submissions at `/contact` (service pages use
  `/contact?service=<slug>`). Every post should ultimately nudge readers there.
- **Voice:** clear, honest, practical, plain-English. No hype, no jargon dumps.
  Helpful first; selling second.

### Integrity rules (NON-NEGOTIABLE)

- Never fabricate statistics, clients, testimonials, results, savings, timelines,
  or credentials.
- Only state facts the site already claims. Approved facts include:
  - Published **starting prices**: websites from **CAD $1,500**, automation from
    **CAD $3,000**, custom software from **CAD $5,000** (always frame as "starting
    from", with final pricing depending on scope). Hourly rates are intentionally
    not published.
  - The service-area statement (Brampton + GTA, in-person available).
  - Real case studies in `src/config/siteConfig.js` (`caseStudies[]`).
- If a number or claim isn't verifiable from the config, don't state it. When in
  doubt, publish as `draft: true` for human review.

---

## 2. How the blog works (architecture)

The blog is **file-driven**: the `src/content/blog/` folder is the single source
of truth. Adding a `.md` file publishes a post; deleting it unpublishes. No
routing, config, sitemap, or nav edits are ever needed to publish.

```
src/content/blog/*.md            <- posts (one file = one post)
  _template.md                   <- authoring template (ignored; starts with "_")

src/config/frontmatter.js        <- isomorphic YAML frontmatter parser (js-yaml)
src/config/blog.js               <- registry: import.meta.glob raw -> parsed posts
                                    (getAllPosts, getPost, getPostsByTag,
                                     getRelatedPosts, orderedPosts, allTags)
src/config/topicMap.js           <- tag -> service/case-study slug map (dep-free; used by app + scripts)
src/config/relatedContent.js     <- "People also search for" resolver (getBlogRelated / getCaseStudyRelated)
src/pages/BlogIndex.jsx          <- /blog  (card grid + tag filter, featured first)
src/pages/BlogPost.jsx           <- /blog/:slug (Markdown body, FAQ accordion, related content, CTA)
src/components/blog/markdownComponents.jsx  <- MUI styling map for react-markdown
src/components/common/Faq.jsx    <- shared FAQ accordion (blog posts + service/case pages)
src/components/common/RelatedContent.jsx  <- "People also search for" card grid
src/utils/blogFormat.js          <- deterministic "Month D, YYYY" date formatter

src/routes.jsx                   <- maps getAllPosts() -> /blog/:slug routes
src/components/seo/StructuredData.jsx  <- ArticleSchema + BlogListSchema
src/config/siteConfig.js         <- companyLinks has the "Blog" nav/footer entry

scripts/blog-posts.mjs           <- Node reader (shared by build scripts)
scripts/validate-blog.mjs        <- frontmatter/slug validator (runs in prebuild)
scripts/validate-related.mjs     <- topic-map integrity validator (runs in prebuild)
scripts/generate-sitemap.mjs     <- includes /blog + published posts

content/blog-backlog.md          <- topic queue for autonomous content
content/blog-agent-guide.md      <- this file
```

Data flow: `*.md` -> `frontmatter.js` -> `blog.js` registry -> routes, index page,
post page, related posts, and SEO. The same `frontmatter.js` parser feeds the Node
build scripts via `scripts/blog-posts.mjs`, so app and scripts never drift.

Rendering: posts are plain Markdown rendered with `react-markdown` + `remark-gfm`
(GitHub-flavoured Markdown: tables, etc.). **There is no MDX** — you cannot embed
React components in a post body. Styling comes from `markdownComponents.jsx`,
which maps each element to MUI + theme tokens. Below the body, `BlogPost.jsx`
renders the optional `faqs` accordion (via the shared `Faq` component, with a
slim Markdown map for answers) before the related-posts section.

---

## 3. Frontmatter schema

```yaml
---
title: "Post Title"                 # REQUIRED — also the <h1>
metaDescription: "140-160 char SEO + card summary."  # REQUIRED
date: "2026-07-20"                  # REQUIRED — YYYY-MM-DD; future dates hidden in prod
updated: "2026-08-01"               # optional — YYYY-MM-DD of last meaningful edit
author: "Mintek Software"           # optional — defaults to "Mintek Software"
tags: ["automation", "small business"]  # optional — powers filter + related posts
category: "Guides"                  # optional — chip on cards/header
coverImage: "/blog/my-cover.png"    # optional — absolute /public path; falls back to site logo
featured: false                     # optional — featured posts surface first on /blog
draft: false                        # optional — visible in dev, excluded from prod build
relatedServices: []                 # optional — "People also search for" override (service slugs)
relatedCaseStudies: []              # optional — "People also search for" override (case study slugs)
faqs:                               # optional — renders a FAQ accordion below the article
  - q: "A question a reader would search?"
    a: >-
      Concise answer; supports inline Markdown incl. [internal links](/contact).
---
```

- `faqs` renders via the shared `Faq` accordion (`src/components/common/Faq.jsx`)
  below the article body, before related posts. Answers are Markdown (bold,
  italic, links); keep each answer to a single paragraph and use folded block
  scalars (`>-`). No FAQ JSON-LD is emitted (Google deprecated FAQ rich results);
  the value is usefulness and on-page SEO. FAQ text is counted toward reading time.

- `relatedServices` / `relatedCaseStudies` are optional overrides for the
  "People also search for" section (see section 7). Usually leave them empty: a
  post's `tags` already resolve to related services/case studies via the central
  topic map (`src/config/topicMap.js`). Set them only to pin a specific link;
  pinned items appear first and the map fills the rest. Slugs are shape-checked
  by `validate-blog.mjs` and existence-checked by `validate-related.mjs`; never
  point them at a hidden service.
- `slug` defaults to the filename (`my-post.md` -> `/blog/my-post`). Slugs must be
  lowercase kebab-case; the validator enforces this and rejects duplicates.
- Body starts after the closing `---`. Use `##`/`###` for structure (the title is
  the only `#`/h1, rendered by the page header, so start body headings at `##`).

---

## 4. Adding or improving a post (manual or agent)

1. Copy `src/content/blog/_template.md` to `src/content/blog/<slug>.md`.
2. Fill in frontmatter (see schema). Set `draft: true` if unsure about accuracy.
3. Write the body in Markdown.
4. Validate + build (see commands). Fix any validator errors.

**Improving existing posts:** edit the `.md` file in place, bump `updated`, and
keep internal links valid. Don't change the filename/slug of a live post (it
would break its URL and lose SEO); if a rename is truly needed, add a redirect in
`vercel.json` and `public/_redirects` (see how case-study slug renames are handled).

---

## 5. Autonomous content workflow

1. Open `content/blog-backlog.md`. Pick a topic from **Queued** (or add new ones
   by auditing `services[]` and `caseStudies[]` in `siteConfig.js` for
   top-of-funnel questions a GTA small business would search).
2. For each topic the backlog records: working title, target keyword, search
   intent, and the service/case-study page(s) to link to.
3. Write the post (see content guidelines below), drop the `.md` file, and move
   the topic to the **Done** section of the backlog.
4. Report what you added, why, what remains queued, and any topic you could not
   responsibly cover under the integrity rules.

---

## 6. Content guidelines (per post)

- **Length:** ~900-1500 words. Genuinely useful, specific, and skimmable.
- **Structure:** short intro that frames the reader's problem, then `##` sections
  with `###` subsections, ending in a soft CTA.
- **Internal links (important for SEO):** 1-3 links to the most relevant service
  or case-study page, plus a `/contact` CTA. Use **root-relative** paths so links
  stay client-side SPA navigation:
  - Services: `/custom-software-development`, `/business-automation`,
    `/web-application-development`, `/website-development`,
    `/marketplace-development`, `/google-sheets-website-development`,
    `/spreadsheet-automation`, `/mobile-app-development`,
    `/restaurant-website-design`, `/web-design-brampton`, `/web-design-toronto`
    (avoid noindexed pages: `web-design-mississauga`, `web-design-vaughan`).
  - Case studies: `/case-studies/parking-marketplace-platform`,
    `/case-studies/google-sheets-event-discovery-app`,
    `/case-studies/restaurant-online-ordering-system`, `/case-studies/pawpals`,
    `/case-studies/doaba-junction`, `/case-studies/relax-cafe`,
    `/case-studies/aloe-accounting`.
  - Cross-link to related posts via `/blog/<slug>` too (all three live posts do
    this) to build topical clusters. Verify the target slug exists.
  - Always verify a slug exists in `siteConfig.js` before linking.
- **FAQs (recommended):** add an optional `faqs` block of ~3-6 Q&As targeting
  real "People Also Ask"-style queries for the topic. Keep each answer to a
  single paragraph (folded scalar `>-`), and use inline Markdown links to the
  relevant service, case-study or post. All three live posts include one.
- **External links** open in a new tab automatically (handled by the renderer).
- **CTA:** end with a low-pressure invitation to `/contact`, matching the tone of
  the existing three posts.
- **Honesty:** apply the integrity rules above to every claim.

---

## 7. SEO specifics (already wired — keep intact)

- Each post uses `<Seo type="article">` for title/description/OG/Twitter, plus
  `ArticleSchema` (BlogPosting JSON-LD) and `BreadcrumbSchema`.
- The index uses `BlogListSchema` (ItemList).
- `metaDescription` is used for both the meta description and the card summary —
  write it to be compelling and ~140-160 chars.
- The sitemap auto-includes `/blog` and every **published** post on build.
- `coverImage` is used as the OG/Twitter/BlogPosting image; without it, the site
  logo is the fallback.
- `faqs` render as an accessible, crawlable accordion (answers stay in the
  prerendered DOM, first item expanded) and count toward reading time. No FAQ
  JSON-LD is emitted by design (Google deprecated FAQ rich results); the value is
  usefulness and on-page SEO.
- Every post ends with a **"People also search for"** section (via
  `RelatedContent`) that cross-links related posts, case studies and services to
  build topic clusters. Links are resolved from the post's `tags` through the
  central topic map (`src/config/topicMap.js`), with optional per-post overrides.
  When adding a post on a brand-new topic, add its tag(s) to the topic map (or to
  `IGNORED_TAGS`) so the section has links; `validate-related.mjs` warns about
  unmapped tags. No schema is emitted here — plain crawlable internal links.

---

## 8. Commands

```bash
npm run validate:blog     # checks frontmatter (incl. faqs shape) + unique kebab-case slugs
npm run validate:related  # checks topic-map slugs resolve; warns on unmapped tags
npm run dev               # preview (drafts + future-dated posts ARE visible here)
npm run build             # SSG build; prebuild runs both validators + sitemap; drafts/future hidden
npm run lint              # must pass with 0 warnings
```

Definition of done for any blog change: `npm run lint` clean, `npm run build`
succeeds, and the new/edited post prerenders under `dist/blog/...`.

---

## 9. Extending the system (when improving, not just adding posts)

- **New frontmatter field:** add parsing/defaulting in `buildPost()` in
  `src/config/blog.js`, then use it in the pages. Add validation in
  `scripts/validate-blog.mjs` if it should be required. Update `_template.md`,
  this guide, and the README table.
- **Restyle post body:** edit `src/components/blog/markdownComponents.jsx` (it
  keeps the `/* eslint-disable react-refresh/only-export-components */` header
  because it exports a config object, not a component — keep that line).
- **New feature (e.g. pagination, author pages, RSS):** follow the case-studies
  pattern. Routes must be enumerable at build for SSG. For an RSS feed, add a
  generator script alongside `generate-sitemap.mjs` using
  `scripts/blog-posts.mjs`.
- **Draft/scheduling behavior** lives in `isVisible()` in `blog.js` and
  `isPublished()` in `scripts/blog-posts.mjs` — keep the two in sync.

---

## 10. Gotchas / hard constraints

- **SSG:** never introduce logic that breaks static prerendering. Routes come from
  `getAllPosts()` at build time.
- **js-yaml import:** use named import `import { load as loadYaml } from "js-yaml"`
  (v4 has no default export in ESM/Node) — already done in `frontmatter.js`.
- **Internal links must be root-relative** (`/path`) to stay client-side. Absolute
  `https://minteksoftware.com/...` links render as external and reload the page.
- **No MDX / no JSX in posts.** Markdown + GFM only.
- **JavaScript/JSX only** — the repo has no TypeScript.
- **Don't hardcode post lists** anywhere; always read from the registry.
- **Keep the two visibility rules in sync** (`blog.js` and `blog-posts.mjs`).

---

## 11. Ready-to-use kickoff prompt for a future agent

> You are working in the Mintek Software marketing site (React 18, Vite,
> vite-react-ssg, MUI, JS/JSX). First read `content/blog-agent-guide.md` in full
> and follow it. Then [ADD N POSTS FROM THE BACKLOG / IMPROVE POST X / ADD FEATURE Y].
> Obey the integrity rules: never fabricate stats, clients, testimonials, or
> results; only claim what `src/config/siteConfig.js` already claims; mark
> uncertain drafts `draft: true`. Use root-relative internal links to real
> service/case-study slugs and end with a `/contact` CTA. When done, run
> `npm run validate:blog`, `npm run lint`, and `npm run build`, confirm the pages
> prerender under `dist/blog/`, then report what changed and what remains queued.
