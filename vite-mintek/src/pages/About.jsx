import { Box, Container, Typography, Grid, Stack } from "@mui/material";
import Seo from "../components/seo/Seo";
import Breadcrumbs from "../components/common/Breadcrumbs";
import CTASection from "../components/common/CTASection";
import { BreadcrumbSchema } from "../components/seo/StructuredData";
import { site, caseStudies } from "../config/siteConfig";

const stats = [
  { number: `${caseStudies.length}`, label: "Documented projects" },
  { number: String(site.foundingYear), label: "Building since" },
  { number: "GTA", label: "+ remote clients" },
];

const values = [
  {
    title: "Outcomes over output",
    description:
      "We measure success by the hours saved, errors removed and revenue unlocked, not by lines of code.",
  },
  {
    title: "Built around your workflow",
    description:
      "We start by understanding how your business actually operates, then build software that fits it.",
  },
  {
    title: "Clear communication",
    description:
      "Regular demos and plain-language updates, so you always know where your project stands.",
  },
  {
    title: "Quality you can rely on",
    description:
      "Tested, maintainable software with a strong foundation for future growth.",
  },
];

const About = () => {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <Seo
        title={`About | ${site.brand}`}
        description="Mintek Software is a Brampton-based custom software and web development studio serving the Greater Toronto Area and remote clients since 2022."
        path="/about"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 4, md: 6 } }}>
        <Container maxWidth="md">
          <Breadcrumbs items={breadcrumbItems} />
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontWeight: "bold", mb: 3, fontSize: { xs: "2.25rem", md: "3rem" } }}
          >
            About Mintek Software
          </Typography>
          <Typography variant="h6" component="p" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            {site.brand} is a custom software and web development studio based in{" "}
            {site.address.locality}, {site.address.regionName}. Since{" "}
            {site.foundingYear} we have helped businesses across the Greater
            Toronto Area and remote clients replace manual, error-prone processes
            with software that is fast, reliable and built for the way they work.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pb: { xs: 4, md: 8 } }}>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {stats.map((stat) => (
            <Grid item xs={4} key={stat.label}>
              <Typography variant="h3" sx={{ fontWeight: "bold", color: "primary.main" }}>
                {stat.number}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", mb: 3 }}>
          How we work
        </Typography>
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {values.map((value) => (
            <Grid item xs={12} sm={6} key={value.title}>
              <Box
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Where we work
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.9 }}>
          {site.serviceAreaStatement} We also work with remote clients beyond the
          Greater Toronto Area.
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {site.areaServed.map((area) => (
            <Typography key={area} variant="body2" color="text.secondary">
              {area}
            </Typography>
          ))}
        </Stack>
      </Container>

      <CTASection title="Let's build something that works for your business" />
    </>
  );
};

export default About;
