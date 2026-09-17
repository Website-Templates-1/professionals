# CLAUDE.md — vite-mintek

## "Scope your site" tool & its design previews

The scoping widget is `src/components/service/ScopeTool.jsx` (lazy-mounted below the fold by
`ScopeToolSection.jsx`, opt-in per page via `scopeTool` in `siteConfig.js` and blog
frontmatter). Its result screen shows three **design directions** via
`src/components/service/ScopeDesigns.jsx`.

Those previews are **hosted in a different repo** (`local-lead-finder`) on Cloudflare
Workers + R2. This app only consumes them:

- Env var `VITE_SCOPE_PREVIEW_BASE` (`.env`) points at the `mockup-scope` worker, e.g.
  `https://mockup-scope.mintek.workers.dev`. Unset → the design section renders nothing.
- The leaf key is `` `${answers.businessType}-${answers.mainJob}` `` and **must stay in sync**
  with `data/scope-previews/leaves.js` in `local-lead-finder`.

**To change the actual preview designs, thumbnails, or per-leaf copy, work in the
`local-lead-finder` repo — see its `docs/scope-previews.md`.** Nothing about the preview
*look* is controlled from this repo.
