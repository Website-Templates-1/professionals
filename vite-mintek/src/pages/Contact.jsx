import { Box, Container, Typography, Grid, Stack, Link, Chip } from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import Seo from "../components/seo/Seo";
import Breadcrumbs from "../components/common/Breadcrumbs";
import ContactUs from "../components/contact-us-section/ContactUs";
import { BreadcrumbSchema, ContactPageSchema } from "../components/seo/StructuredData";
import { site, getService } from "../config/siteConfig";

const serviceLinks = [
  {
    slug: "web-design-brampton",
    label: "Web design in Brampton",
  },
  {
    slug: "small-business-website-design-brampton",
    label: "Small business website design in Brampton",
  },
  {
    slug: "web-design-services-brampton",
    label: "Web design services in Brampton",
  },
  {
    slug: "website-hosting-brampton",
    label: "Website hosting in Brampton",
  },
  {
    slug: "website-development",
    label: "Website development",
  },
  {
    slug: "restaurant-website-design",
    label: "Restaurant website design",
  },
  {
    slug: "custom-software-development",
    label: "Custom software development",
  },
  {
    slug: "local-seo-gta",
    label: "Local SEO for GTA businesses",
  },
];

const Contact = () => {
  const [searchParams] = useSearchParams();
  const service = searchParams.get("service") || "";
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <Seo
        title={`Contact | ${site.brand}`}
        description="Contact Mintek Software in Brampton, Ontario. Serving Brampton and the GTA with web design, custom software and automation. Phone, email and a city map — not a copy of the homepage form."
        path="/contact"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ContactPageSchema />

      <Box sx={{ pt: { xs: 12, md: 16 } }}>
        <Container maxWidth="md">
          <Breadcrumbs items={breadcrumbItems} />
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "2.25rem", md: "3rem" } }}
          >
            Contact a Brampton studio serving the GTA
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, lineHeight: 1.9, mb: 3 }}>
            Mintek Software is based in Brampton and works with businesses across
            the Greater Toronto Area: Toronto, Mississauga, Vaughan and nearby
            cities.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 1 }}>
            <strong>Name:</strong> {site.brand}
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 1 }}>
            <strong>Address:</strong> {site.address.formatted}
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 3 }}>
            <strong>Email:</strong>{" "}
            <Link href={`mailto:${site.email}`} underline="hover">
              {site.email}
            </Link>
          <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 1 }}>
            <strong>Phone:</strong>{" "}
            <Link href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} underline="hover">
              {site.phone}
            </Link>
          </Typography>
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pb: { xs: 4, md: 6 } }}>
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 1, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
          Service area
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
          We take on work throughout these places.
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 5 }}>
          {site.areaServed.map((area) => (
            <Chip key={area} label={area} variant="outlined" color="primary" />
          ))}
        </Stack>

        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 1, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
          What to contact us about
        </Typography>
        <Grid container spacing={1.5} sx={{ mb: 5 }}>
          {serviceLinks.map((item) => {
            const resolved = getService(item.slug);
            if (!resolved || resolved.hidden) return null;
            return (
              <Grid item xs={12} sm={6} key={item.slug}>
                <Link
                  component={RouterLink}
                  to={`/${item.slug}`}
                  underline="hover"
                >
                  {item.label}
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <ContactUs defaultService={service} showMap />
    </>
  );
};

export default Contact;
