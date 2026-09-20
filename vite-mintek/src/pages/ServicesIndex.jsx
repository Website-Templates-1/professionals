import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Stack,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Seo from "../components/seo/Seo";
import Breadcrumbs from "../components/common/Breadcrumbs";
import CTASection from "../components/common/CTASection";
import { BreadcrumbSchema, ServiceListSchema } from "../components/seo/StructuredData";
import { publicServices, servicesByGroup, site } from "../config/siteConfig";

const breadcrumbItems = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

// Canonical service groups, in the order we present them. Labels are chosen to
// be clear for visitors while matching the taxonomy used in the config.
const serviceGroups = [
  {
    key: "software",
    heading: "Software & Apps",
    blurb:
      "Custom software, web and mobile apps, and marketplaces built around the way your business actually works.",
  },
  {
    key: "website",
    heading: "Websites",
    blurb:
      "Fast, accessible websites that are straightforward to run and easy for customers to act on.",
  },
  {
    key: "data",
    heading: "Data & Google Sheets",
    blurb:
      "Turn spreadsheets and manual steps into automated workflows and tools your team can trust.",
  },
  {
    key: "local",
    heading: "Local / GTA",
    blurb:
      "Web design, local SEO and software for businesses across Brampton, Toronto and the wider Greater Toronto Area.",
  },
];

const ServicesIndex = () => {
  return (
    <>
      <Seo
        title={`Software, Web & Automation Services | ${site.brand}`}
        description="Explore Mintek Software's services: custom software, web and mobile apps, websites, business automation and local SEO for businesses across the Greater Toronto Area."
        path="/services"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceListSchema services={publicServices} />

      <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 4, md: 6 } }}>
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "2.25rem", md: "3rem" } }}
          >
            Services
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            sx={{ maxWidth: 760 }}
          >
            Mintek Software is a small studio in the Greater Toronto Area that
            designs and builds custom software, websites and automation. If you
            already know what you need, jump straight to a service below. If
            you're not sure, start with the category closest to the problem
            you're trying to solve, custom software for bespoke tools, websites
            for your online presence, or data and automation to remove manual
            work, and we'll help you scope the rest from there.
          </Typography>
        </Container>
      </Box>

      <Container sx={{ pb: { xs: 6, md: 10 } }}>
        {serviceGroups.map((group) => {
          const groupServices = servicesByGroup(group.key);
          if (groupServices.length === 0) return null;

          return (
            <Box key={group.key} sx={{ mb: { xs: 5, md: 7 } }}>
              <Typography
                variant="overline"
                sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 2 }}
              >
                {group.heading}
              </Typography>
              <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                {group.heading}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, maxWidth: 760 }}
              >
                {group.blurb}
              </Typography>
              <Grid container spacing={4}>
                {groupServices.map((service) => (
                  <Grid item xs={12} md={4} key={service.slug}>
                    <Card sx={{ height: "100%" }}>
                      <CardActionArea
                        component={RouterLink}
                        to={`/${service.slug}`}
                        sx={{ height: "100%" }}
                      >
                        <CardContent
                          sx={{
                            p: 4,
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold", mb: 2 }}
                          >
                            {service.title}
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {service.short}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          );
        })}
      </Container>

      <CTASection
        title="Not sure which service fits?"
        subtitle="Book a discovery call and we'll suggest an approach."
        intent="general"
        placement="services_index_cta"
      />
    </>
  );
};

export default ServicesIndex;
