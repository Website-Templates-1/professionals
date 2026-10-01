import { Head } from "vite-react-ssg";
import { site, canonical, absoluteUrl, postalAddressSchema } from "../../config/siteConfig";

// Emits one or more JSON-LD blocks into <head>.
const JsonLd = ({ data }) => (
  <Head>
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  </Head>
);

const sameAs = [
  ...Object.values(site.social).filter(Boolean),
  site.mapsUrl,
].filter(Boolean);

export const OrganizationSchema = () => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.brand,
      legalName: site.legalName,
      url: site.domain,
      logo: absoluteUrl(site.logo),
      description: site.description,
      email: site.email,
      telephone: site.phone,
      foundingDate: String(site.foundingYear),
      address: postalAddressSchema(),
      contactPoint: {
        "@type": "ContactPoint",
        telephone: site.phone,
        email: site.email,
        contactType: "Customer Service",
        areaServed: site.address.country,
        availableLanguage: "English",
      },
      ...(sameAs.length ? { sameAs } : {}),
    }}
  />
);

export const WebSiteSchema = () => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.brand,
      url: site.domain,
    }}
  />
);

export const LocalBusinessSchema = () => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${site.domain}/#localbusiness`,
      name: site.brand,
      image: absoluteUrl(site.logo),
      url: site.domain,
      email: site.email,
      telephone: site.phone,
      priceRange: "$$",
      address: postalAddressSchema(),
      areaServed: site.areaServed.map((name) => ({
        "@type": "Place",
        name,
      })),
      hasMap: site.mapsUrl,
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.geo.latitude,
        longitude: site.geo.longitude,
      },
      identifier: {
        "@type": "PropertyValue",
        name: "Google Place ID",
        propertyID: "placeId",
        value: site.placeId,
      },
      ...(sameAs.length ? { sameAs } : {}),
    }}
  />
);

export const ContactPageSchema = () => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: `Contact ${site.brand}`,
      url: canonical("/contact"),
      description:
        "Book a discovery call with Mintek Software in Brampton, or send a written project brief.",
      mainEntity: { "@id": `${site.domain}/#localbusiness` },
    }}
  />
);

export const ServiceSchema = ({ service }) => {
  const areaNames = service.schemaAreaServed || site.areaServed;
  const providerType = service.schemaTypes?.includes("ProfessionalService")
    ? "ProfessionalService"
    : "Organization";
  const areaServed = areaNames.map((name) =>
    name === "Brampton"
      ? { "@type": "City", name }
      : { "@type": "Place", name }
  );

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: service.title,
        name: service.title,
        description: service.metaDescription,
        url: canonical(`/${service.slug}`),
        provider: {
          "@type": providerType,
          name: site.brand,
          url: site.domain,
          telephone: site.phone,
          email: site.email,
          address: postalAddressSchema(),
          areaServed,
        },
        areaServed,
        ...(service.offersFrom
          ? {
              offers: {
                "@type": "Offer",
                priceCurrency: "CAD",
                price: service.offersFrom,
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "CAD",
                  minPrice: service.offersFrom,
                },
              },
            }
          : {}),
      }}
    />
  );
};

// A portfolio case study modelled as a CreativeWork (accurate for project
// write-ups, and avoids Article rich-result warnings we can't satisfy without
// per-project images). Uses only truthful fields from the case study config.
export const CaseStudySchema = ({ study }) => {
  const path = `/case-studies/${study.slug}`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: study.title,
        headline: study.title,
        description: study.metaDescription || study.shortDescription,
        url: canonical(path),
        image: absoluteUrl(site.logo),
        ...(study.year ? { datePublished: String(study.year) } : {}),
        inLanguage: "en",
        creator: {
          "@type": "Organization",
          name: site.brand,
          url: site.domain,
        },
        ...(study.client && study.kind !== "concept"
          ? { about: { "@type": "Organization", name: study.client } }
          : {}),
        ...(study.techStack?.length
          ? { keywords: study.techStack.join(", ") }
          : {}),
        isPartOf: {
          "@type": "WebSite",
          name: site.brand,
          url: site.domain,
        },
      }}
    />
  );
};

// The case studies index as an ordered ItemList of the individual projects.
export const CaseStudyListSchema = ({ studies }) => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: studies.map((study, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: study.title,
        url: canonical(`/case-studies/${study.slug}`),
      })),
    }}
  />
);

// The services hub as an ordered ItemList of the individual service pages.
export const ServiceListSchema = ({ services }) => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        url: canonical(`/${service.slug}`),
      })),
    }}
  />
);

// A blog post modelled as BlogPosting. Uses only truthful frontmatter fields;
// falls back to the site logo when a post has no cover image.
export const ArticleSchema = ({ post }) => {
  const path = `/blog/${post.slug}`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        url: canonical(path),
        mainEntityOfPage: canonical(path),
        image: absoluteUrl(post.coverImage || site.logo),
        inLanguage: "en",
        ...(post.date ? { datePublished: post.date } : {}),
        ...(post.updated || post.date
          ? { dateModified: post.updated || post.date }
          : {}),
        author: {
          "@type": "Organization",
          name: post.author || site.brand,
          url: site.domain,
        },
        publisher: {
          "@type": "Organization",
          name: site.brand,
          url: site.domain,
          logo: {
            "@type": "ImageObject",
            url: absoluteUrl(site.logo),
          },
        },
        ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
        isPartOf: {
          "@type": "Blog",
          name: `${site.brand} Blog`,
          url: canonical("/blog"),
        },
      }}
    />
  );
};

// The blog index as an ordered ItemList of the individual posts.
export const BlogListSchema = ({ posts }) => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: canonical(`/blog/${post.slug}`),
      })),
    }}
  />
);

// About page: an AboutPage whose mainEntity is the Organization, with the
// founder modelled as a Person. Truthful fields only.
export const AboutPageSchema = ({ founder }) => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: `About ${site.brand}`,
      url: canonical("/about"),
      mainEntity: {
        "@type": "Organization",
        name: site.brand,
        legalName: site.legalName,
        url: site.domain,
        logo: absoluteUrl(site.logo),
        foundingDate: String(site.foundingYear),
        ...(founder
          ? {
              founder: {
                "@type": "Person",
                name: founder.name,
                jobTitle: founder.jobTitle,
                worksFor: { "@type": "Organization", name: site.brand },
              },
            }
          : {}),
      },
    }}
  />
);

// A single real, client-approved Review attached to the Organization. Emits
// nothing unless the testimonial carries a genuine numeric `rating`, so we never
// publish a review node without a truthful star value. Note: Google does not
// show star rich results for first-party ("self-serving") reviews hosted on the
// reviewed business's own site; this markup is for honest entity understanding,
// not rich snippets.
export const ReviewSchema = ({ testimonial }) => {
  if (!testimonial || typeof testimonial.rating !== "number") return null;
  const source = testimonial.reviewSource || testimonial.source;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Review",
        reviewBody: testimonial.quote,
        reviewRating: {
          "@type": "Rating",
          ratingValue: testimonial.rating,
          bestRating: 5,
          worstRating: 1,
        },
        author: {
          "@type": "Person",
          name: testimonial.name,
          ...(testimonial.authorUri ? { url: testimonial.authorUri } : {}),
          ...(testimonial.business
            ? { worksFor: { "@type": "Organization", name: testimonial.business } }
            : {}),
        },
        ...(testimonial.publishTime
          ? { datePublished: testimonial.publishTime }
          : {}),
        ...(source
          ? { publisher: { "@type": "Organization", name: source } }
          : {}),
        itemReviewed: {
          "@type": "Organization",
          "@id": `${site.domain}/#localbusiness`,
          name: site.brand,
          url: site.domain,
        },
      }}
    />
  );
};

// items: [{ name, path }]
export const BreadcrumbSchema = ({ items }) => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: canonical(item.path),
      })),
    }}
  />
);
