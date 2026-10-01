import { Box, Container, Typography, Grid, Stack, Link, Chip } from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Seo from "../components/seo/Seo";
import Breadcrumbs from "../components/common/Breadcrumbs";
import ContactUs from "../components/contact-us-section/ContactUs";
import CtaButton from "../components/common/CtaButton";
import { BreadcrumbSchema, ContactPageSchema } from "../components/seo/StructuredData";
import { site, getService, projectTypes } from "../config/siteConfig";

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
  const projectTypeParam = searchParams.get("projectType") || "";
  const defaultProjectType = projectTypes.some((t) => t.value === projectTypeParam)
    ? projectTypeParam
    : "";
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <Seo
        title={`Contact | ${site.brand}`}
        description="Book a discovery call with Mintek Software in Brampton, or send a written project brief."
        path="/contact"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ContactPageSchema />

      <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 2, md: 4 } }}>
        <Container maxWidth="md">
          <Breadcrumbs items={breadcrumbItems} />
          <Typography
            variant="h1"
            component="h1"
            sx={{ mb: 2 }}
          >
            Choose how you'd like to start
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, lineHeight: 1.9, mb: 3 }}>
            Book a discovery call, or send a written project brief below.
          </Typography>
          <CtaButton
            type="book"
            placement="contact_page"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<EventAvailableIcon />}
          />
        </Container>
      </Box>

      <ContactUs
        defaultService={service}
        defaultProjectType={defaultProjectType}
        showIntro={false}
        formOnly
        formTitle="Send a project brief"
      />

      <Container maxWidth="md" sx={{ pb: { xs: 6, md: 10 } }}>
        <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
          Studio details
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 1 }}>
          <strong>Name:</strong> {site.brand}
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 1 }}>
          <strong>Address:</strong> {site.address.formatted}
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 1 }}>
          <strong>Email:</strong>{" "}
          <Link href={`mailto:${site.email}`} underline="hover">
            {site.email}
          </Link>
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 3 }}>
          <strong>Phone:</strong>{" "}
          <Link href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} underline="hover">
            {site.phone}
          </Link>
        </Typography>

        <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
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

        <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
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

        <Box
          sx={{
            minHeight: { xs: 240, md: 360 },
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "white",
          }}
        >
          <Box
            component="iframe"
            title="Google Maps listing for Mintek Software, Brampton"
            src={site.mapsEmbedSrc}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            sx={{
              border: 0,
              width: "100%",
              height: { xs: 240, md: 360 },
              display: "block",
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default Contact;
