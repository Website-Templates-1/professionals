---
# Copy this file to publish a new post. The filename becomes the URL slug,
# e.g. src/content/blog/my-post.md -> /blog/my-post
# Files starting with "_" (like this template) are ignored by the blog.

# Required:
title: "Your Post Title"
metaDescription: "One to two sentence summary used for SEO and social sharing (aim for 140-160 characters)."
date: "2026-01-01" # YYYY-MM-DD. Future-dated posts stay hidden in production until this date.

# Optional (sensible defaults applied when omitted):
updated: "" # YYYY-MM-DD of the last meaningful edit. Leave blank if never revised.
author: "Mintek Software"
tags: ["automation", "small business"] # used for filtering and related posts
category: "Guides"
coverImage: "" # absolute path in /public, e.g. "/blog/my-post.png". Falls back to the site logo.
featured: false # featured posts surface first on the blog index
draft: true # drafts are visible in `npm run dev` but excluded from production builds

# Optional FAQ accordion, rendered by the shared Faq component below the article.
# Answers support inline Markdown (bold, italic, and [internal links](/contact)).
# Use folded block scalars (">-") for single-paragraph answers; each answer must
# stay one paragraph (folding joins lines with spaces). For a list inside an
# answer, use a literal block ("|-") instead.
faqs:
  - q: "A question a reader would actually search?"
    a: >-
      A concise, honest answer. Only claim what the site already claims, and link
      to a relevant [service or case study](/custom-software-development).
---

Write the article body in Markdown below the frontmatter block.

## Use H2 headings for main sections

Standard Markdown works: **bold**, _italic_, [links](/contact), lists, and code.

- Point one
- Point two

### H3 for subsections

Internal links use root-relative paths so they stay client-side, e.g.
[our business automation service](/business-automation). External links open in
a new tab automatically.

> Blockquotes render as a styled callout.

End with a soft call to action pointing readers to [get in touch](/contact).
