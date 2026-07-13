import { Head } from "vite-react-ssg";
import { site, canonical, absoluteUrl } from "../../config/siteConfig";

// Per-route metadata: title, description, canonical, Open Graph and Twitter tags.
// Renders into <head> at build time (prerendered) and on the client.
const Seo = ({
  title,
  description = site.description,
  path = "/",
  image = site.ogImage,
  type = "website",
  noindex = false,
  children,
}) => {
  const fullTitle = title
    ? `${title}`
    : `${site.tagline} | ${site.brand}`;
  const url = canonical(path);
  const imageUrl = absoluteUrl(image);

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.brand} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {children}
    </Head>
  );
};

export default Seo;
