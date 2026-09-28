# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Blog

The blog is file-driven. Each post is a Markdown file in `src/content/blog/`, and
that folder is the single source of truth: adding a `.md` file publishes a post
and deleting it unpublishes it. No routing, config, or sitemap edits are needed.

### Add a post manually

1. Copy `src/content/blog/_template.md` to `src/content/blog/<your-slug>.md`.
   The filename (minus `.md`) becomes the URL: `/blog/<your-slug>`.
2. Fill in the frontmatter and write the body in Markdown.
3. Run `npm run dev` to preview (drafts are visible in dev), or `npm run build`.

Files whose names start with `_` (like the template) are ignored.

### Frontmatter fields

| Field             | Required | Notes                                                        |
| ----------------- | -------- | ------------------------------------------------------------ |
| `title`           | yes      | Post title (also the `<h1>`).                                |
| `metaDescription` | yes      | SEO + social description and card summary.                   |
| `date`            | yes      | `YYYY-MM-DD`. Future dates stay hidden in production.        |
| `updated`         | no       | `YYYY-MM-DD` of the last meaningful edit.                    |
| `author`          | no       | Defaults to `Mintek Software`.                               |
| `tags`            | no       | List; powers filtering and related posts.                    |
| `category`        | no       | Shown as a chip on cards and the post header.                |
| `coverImage`      | no       | Absolute `/public` path; falls back to the site logo for OG. |
| `featured`        | no       | Featured posts surface first on `/blog`.                     |
| `draft`           | no       | Visible in dev, excluded from production builds.             |
| `faqs`            | no       | List of `{ q, a }`; renders a FAQ accordion. Answers support inline Markdown. |

`slug` is optional and defaults to the filename.

### Validation

`npm run validate:blog` checks every post for required/valid frontmatter and
unique, kebab-case slugs. `npm run validate:related` checks topic-map slugs,
related links on posts and pages, and root-relative internal links. Both run
automatically as part of `prebuild`, so a broken link fails the build before
it can ship.

### Autonomous content

`content/blog-backlog.md` tracks planned topics (target keyword, intent, and the
service/case-study page each should link to). An agent or author can pull from
this backlog, drop a new `.md` file, and the post goes live on the next build.
