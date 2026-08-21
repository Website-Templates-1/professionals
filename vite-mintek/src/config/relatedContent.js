import { getAllPosts, getPost, getRelatedPosts } from "./blog";
import { getService, caseStudies, getCaseStudy } from "./siteConfig";
import { TOPIC_MAP, IGNORED_TAGS } from "./topicMap";

// ---------------------------------------------------------------------------
// "People also search for" resolver.
//
// Powers the cross-type internal-linking section on blog posts and case studies
// (posts <-> case studies <-> services). The goal is topical clustering and
// crawlable internal links; there is no schema/JSON-LD here by design.
//
// Relatedness comes from three layers, in priority order:
//   1. Explicit overrides (post frontmatter / case study object fields).
//   2. The central TOPIC_MAP (blog tag -> services + case studies), which lives
//      in ./topicMap so Node build scripts can validate it too.
//   3. Auto-derivation (case study <-> case study via shared services;
//      case study -> posts by inverting the topic map).
// ---------------------------------------------------------------------------

const IGNORED_TAG_SET = new Set(IGNORED_TAGS);

// Overall cap and per-type quotas keep the section a balanced, high-value
// cluster rather than a wall of one link type.
const MAX_TOTAL = 6;
const QUOTA = { article: 3, caseStudy: 2, service: 2 };

// ---- Normalizers: config objects -> { type, key, title, description, to } ----

const toArticleItem = (post) =>
  post
    ? {
        type: "Article",
        key: `Article:${post.slug}`,
        title: post.title,
        description: post.metaDescription,
        to: `/blog/${post.slug}`,
      }
    : null;

const toCaseStudyItem = (study) =>
  study
    ? {
        type: "Case study",
        key: `Case study:${study.slug}`,
        title: study.title,
        description: study.shortDescription,
        to: `/case-studies/${study.slug}`,
      }
    : null;

// Hidden (noindex) services never surface as related links.
const toServiceItem = (service) =>
  service && !service.hidden
    ? {
        type: "Service",
        key: `Service:${service.slug}`,
        title: service.title,
        description: service.short,
        to: `/${service.slug}`,
      }
    : null;

// Concatenates ordered, quota-limited buckets in priority order, deduping by
// key and capping the total. Deterministic: no reliance on Set/Object key order
// for anything user-visible (inputs are already ordered arrays).
const compose = (buckets) => {
  const seen = new Set();
  const out = [];
  for (const { items, quota } of buckets) {
    let count = 0;
    for (const item of items) {
      if (out.length >= MAX_TOTAL) break;
      if (!item || count >= quota || seen.has(item.key)) continue;
      seen.add(item.key);
      out.push(item);
      count += 1;
    }
  }
  return out;
};

// De-duplicates a list of slugs, preserving first-seen order.
const uniq = (slugs) => [...new Set(slugs.filter(Boolean))];

// Combined service + case study slugs a post points at (overrides first, then
// TOPIC_MAP entries for each non-ignored tag), preserving order.
const mappedSlugsForPost = (post) => {
  const serviceSlugs = [...(post.relatedServices || [])];
  const studySlugs = [...(post.relatedCaseStudies || [])];
  for (const tag of post.tags || []) {
    if (IGNORED_TAG_SET.has(tag)) continue;
    const entry = TOPIC_MAP[tag];
    if (!entry) continue;
    serviceSlugs.push(...(entry.services || []));
    studySlugs.push(...(entry.caseStudies || []));
  }
  return { services: uniq(serviceSlugs), caseStudies: uniq(studySlugs) };
};

// Related items for a blog post: related posts (tag overlap) + services and
// case studies resolved from overrides and the topic map.
export const getBlogRelated = (slug) => {
  const post = getPost(slug);
  if (!post) return [];

  const { services: serviceSlugs, caseStudies: studySlugs } =
    mappedSlugsForPost(post);

  const articleItems = getRelatedPosts(post.slug, QUOTA.article).map(
    toArticleItem
  );
  const caseStudyItems = studySlugs.map(getCaseStudy).map(toCaseStudyItem);
  const serviceItems = serviceSlugs.map(getService).map(toServiceItem);

  return compose([
    { items: articleItems, quota: QUOTA.article },
    { items: caseStudyItems, quota: QUOTA.caseStudy },
    { items: serviceItems, quota: QUOTA.service },
  ]);
};

// Related items for a case study: other case studies (overrides, then shared
// services with concepts deprioritized) + related posts (overrides, then the
// inverse topic map). Services are intentionally omitted here because the detail
// page already renders a "Services used" section.
export const getCaseStudyRelated = (slug) => {
  const study = getCaseStudy(slug);
  if (!study) return [];

  const studyServices = new Set(study.services || []);

  // Shared-service case studies, non-concepts first, in declaration order.
  const sharedByService = caseStudies.filter(
    (c) =>
      c.slug !== study.slug &&
      (c.services || []).some((s) => studyServices.has(s))
  );
  const sharedOrdered = [
    ...sharedByService.filter((c) => c.kind !== "concept"),
    ...sharedByService.filter((c) => c.kind === "concept"),
  ];
  const caseStudyItems = uniq([
    ...(study.relatedCaseStudies || []),
    ...sharedOrdered.map((c) => c.slug),
  ])
    .filter((s) => s !== study.slug)
    .map(getCaseStudy)
    .map(toCaseStudyItem);

  // Posts related via the inverse topic map: a post whose mapped case studies
  // include this study, or whose mapped services intersect this study's.
  const inversePosts = getAllPosts().filter((post) => {
    const mapped = mappedSlugsForPost(post);
    return (
      mapped.caseStudies.includes(study.slug) ||
      mapped.services.some((s) => studyServices.has(s))
    );
  });
  const articleItems = uniq([
    ...(study.relatedPosts || []),
    ...inversePosts.map((p) => p.slug),
  ])
    .map(getPost)
    .map(toArticleItem);

  return compose([
    { items: caseStudyItems, quota: QUOTA.caseStudy },
    { items: articleItems, quota: QUOTA.article },
  ]);
};

// Related items for a service. Purely ADDITIVE to what ServicePage already
// renders: it draws service.relatedCaseStudies as cards and service.relatedServices
// as chips in its own sections, so this cross-linker EXCLUDES those to avoid
// repeating them on one page. Articles are the point and always show: related
// posts (overrides, then the inverse topic map).
export const getServiceRelated = (slug) => {
  const service = getService(slug);
  if (!service || service.hidden) return [];

  // Posts related via the inverse topic map: a post whose mapped services
  // include this service. Overrides (service.relatedPosts) seed the list first.
  const inferredPosts = getAllPosts().filter((post) =>
    mappedSlugsForPost(post).services.includes(slug)
  );
  const articleItems = uniq([
    ...(service.relatedPosts || []),
    ...inferredPosts.map((p) => p.slug),
  ])
    .map(getPost)
    .map(toArticleItem);

  // Shared-service case studies inferred from config, non-concept/non-prototype
  // first, then prototypes, then concepts, in declaration order. Excludes the
  // current page and any study already rendered as a card by ServicePage via
  // service.relatedCaseStudies, so the same study never appears twice on a page.
  const alreadyCarded = new Set(service.relatedCaseStudies || []);
  const sharedByService = caseStudies.filter(
    (c) => (c.services || []).includes(slug) && !alreadyCarded.has(c.slug)
  );
  const sharedOrdered = [
    ...sharedByService.filter(
      (c) => c.kind !== "concept" && c.kind !== "prototype"
    ),
    ...sharedByService.filter((c) => c.kind === "prototype"),
    ...sharedByService.filter((c) => c.kind === "concept"),
  ];
  const caseStudyItems = uniq(sharedOrdered.map((c) => c.slug))
    .map(getCaseStudy)
    .map(toCaseStudyItem);

  // Sibling services: ServicePage already renders service.relatedServices as
  // chips, so those are excluded here to avoid repeating them. This bucket only
  // draws from relatedServices today, so it is typically empty (expected).
  const alreadyChipped = new Set([slug, ...(service.relatedServices || [])]);
  const serviceItems = (service.relatedServices || [])
    .filter((s) => !alreadyChipped.has(s))
    .map(getService)
    .map(toServiceItem);

  return compose([
    { items: articleItems, quota: QUOTA.article },
    { items: caseStudyItems, quota: QUOTA.caseStudy },
    { items: serviceItems, quota: QUOTA.service },
  ]);
};
