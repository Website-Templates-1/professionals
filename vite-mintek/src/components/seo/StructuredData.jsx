import { Head } from "vite-react-ssg";
import { site, canonical, absoluteUrl } from "../../config/siteConfig";

// Emits one or more JSON-LD blocks into <head>.
const JsonLd = ({ data }) => (
  <Head>
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  </Head>
);

const sameAs = Object.values(site.social).filter(Boolean);

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
      address: {
        "@type": "PostalAddress",
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
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
      name: site.brand,
      image: absoluteUrl(site.logo),
      url: site.domain,
      email: site.email,
      telephone: site.phone,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
      areaServed: site.areaServed.map((name) => ({
        "@type": "Place",
        name,
      })),
    }}
  />
);

export const ServiceSchema = ({ service }) => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: service.title,
      name: service.title,
      description: service.metaDescription,
      url: canonical(`/${service.slug}`),
      provider: {
        "@type": "Organization",
        name: site.brand,
        url: site.domain,
      },
      areaServed: site.areaServed,
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
