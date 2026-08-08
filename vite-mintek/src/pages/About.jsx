import { Box, Container, Typography, Grid, Stack, Chip } from "@mui/material";
import Seo from "../components/seo/Seo";
import Breadcrumbs from "../components/common/Breadcrumbs";
import CTASection from "../components/common/CTASection";
import { BreadcrumbSchema, AboutPageSchema } from "../components/seo/StructuredData";
import { site, caseStudies } from "../config/siteConfig";
import founderPhoto from "../assets/founder.jpg";

const founder = {
  name: "Saksham Ahluwalia",
  jobTitle: "Founder",
};

const stats = [
  { number: `${caseStudies.length}`, label: "Documented projects" },
  { number: String(site.foundingYear), label: "Building since" },
  { number: "GTA", label: "+ remote clients" },
];

const founderBio = [
  `I started ${site.brand} in ${site.address.locality} in ${site.foundingYear} to help growing businesses replace slow, manual processes with software built for the way they actually work.`,
  "Since then I've built custom applications, automations and websites for clients across the Greater Toronto Area and remotely, from a map-first parking marketplace to a restaurant ordering system that cut third-party commissions.",
  "My focus is simple: outcomes over output. Every project should save time, remove errors or unlock revenue, backed by clear communication and software you can rely on.",
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
      <AboutPageSchema founder={founder} />

      {/* Hero header */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          pt: { xs: 12, md: 16 },
          pb: { xs: 6, md: 10 },
          bgcolor: "background.paper",
        }}
      >
        {/* Dot-pattern background, faded toward the center */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage: `
              radial-gradient(#B4B2C5 1px, transparent 1px),
              radial-gradient(#B4B2C5 1px, transparent 1px)
            `,
            backgroundSize: { xs: "26px 26px", md: "22px 22px" },
            backgroundPosition: { xs: "0 0, 13px 13px", md: "0 0, 11px 11px" },
            opacity: { xs: 0.25, md: 0.4 },
            maskImage:
              "radial-gradient(ellipse 75% 70% at 50% 40%, transparent 0%, #000 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 70% at 50% 40%, transparent 0%, #000 85%)",
          }}
        />
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 5 }}>
          <Breadcrumbs items={breadcrumbItems} />
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              letterSpacing: 2,
              mb: 2,
              display: "block",
            }}
          >
            ABOUT MINTEK SOFTWARE
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontWeight: "bold", mb: 3, fontSize: { xs: "2.25rem", md: "3rem" } }}
          >
            Software built for how your business works
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            sx={{ lineHeight: 1.8, maxWidth: 720 }}
          >
            {site.brand} is a custom software and web development studio based in{" "}
            {site.address.locality}, {site.address.regionName}. Since{" "}
            {site.foundingYear} we have helped businesses across the Greater
            Toronto Area and remote clients replace manual, error-prone processes
            with software that is fast, reliable and built for the way they work.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 4, md: 8 } }}>
        {/* Stats */}
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 8, md: 12 } }}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={4} key={stat.label}>
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  textAlign: { xs: "left", sm: "center" },
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px -10px rgba(108, 85, 249, 0.18)",
                  },
                }}
              >
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ fontWeight: "bold", color: "primary.main", mb: 0.5 }}
                >
                  {stat.number}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Founder */}
        <Grid
          container
          spacing={{ xs: 4, md: 8 }}
          alignItems="center"
          sx={{ mb: { xs: 8, md: 12 } }}
        >
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                position: "relative",
                maxWidth: 360,
                mx: { xs: "auto", md: 0 },
                borderRadius: 4,
                p: "4px",
                background: "linear-gradient(135deg, #6C55F9, #8875fa)",
                boxShadow: "0 24px 48px -18px rgba(108, 85, 249, 0.35)",
              }}
            >
              <Box
                component="img"
                src={founderPhoto}
                alt="Saksham Ahluwalia, Founder of Mintek Software"
                width={700}
                height={933}
                loading="lazy"
                sx={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  aspectRatio: "700 / 933",
                  objectFit: "cover",
                  borderRadius: "14px",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                letterSpacing: 2,
                mb: 1,
                display: "block",
              }}
            >
              MEET THE FOUNDER
            </Typography>
            <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", mb: 0.5 }}>
              {founder.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
              {founder.jobTitle}, {site.brand}
            </Typography>
            {founderBio.map((paragraph, index) => (
              <Typography
                key={index}
                variant="body1"
                color="text.secondary"
                sx={{ mb: 2, lineHeight: 1.9 }}
              >
                {paragraph}
              </Typography>
            ))}
          </Grid>
        </Grid>

        {/* Values */}
        <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", mb: 4 }}>
          How we work
        </Typography>
        <Grid container spacing={3} sx={{ mb: { xs: 8, md: 12 } }}>
          {values.map((value) => (
            <Grid item xs={12} sm={6} key={value.title}>
              <Box
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px -10px rgba(108, 85, 249, 0.18)",
                  },
                }}
              >
                <Typography variant="h6" component="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Where we work */}
        <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Where we work
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.9 }}>
          {site.serviceAreaStatement} We also work with remote clients beyond the
          Greater Toronto Area.
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {site.areaServed.map((area) => (
            <Chip
              key={area}
              label={area}
              variant="outlined"
              sx={{
                borderColor: "divider",
                color: "text.secondary",
                fontWeight: 500,
              }}
            />
          ))}
        </Stack>
      </Container>

      <CTASection title="Let's build something that works for your business" />
    </>
  );
};

export default About;
