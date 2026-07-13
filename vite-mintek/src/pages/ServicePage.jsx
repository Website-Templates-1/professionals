import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Stack,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Seo from "../components/seo/Seo";
import Breadcrumbs from "../components/common/Breadcrumbs";
import CTASection from "../components/common/CTASection";
import {
  ServiceSchema,
  BreadcrumbSchema,
} from "../components/seo/StructuredData";
import { getService, getCaseStudy } from "../config/siteConfig";
import NotFound from "./NotFound";

const Section = ({ overline, title, children }) => (
  <Box sx={{ mb: 6 }}>
    {overline && (
      <Typography
        variant="overline"
        sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 2 }}
      >
        {overline}
      </Typography>
    )}
    <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", mb: 2 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

const ServicePage = ({ slug }) => {
  const service = getService(slug);
  if (!service) return <NotFound />;

  const path = `/${service.slug}`;
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: service.title, path },
  ];
  const relatedStudies = (service.relatedCaseStudies || [])
    .map(getCaseStudy)
    .filter(Boolean);

  return (
    <>
      <Seo
        title={service.metaTitle}
        description={service.metaDescription}
        path={path}
      />
      <ServiceSchema service={service} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Breadcrumbs items={breadcrumbItems} />
          <Typography
            variant="overline"
            sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 2 }}
          >
            {service.title}
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontWeight: "bold", mb: 3, fontSize: { xs: "2.25rem", md: "3rem" } }}
          >
            {service.hero}
          </Typography>
          <Typography variant="h6" component="p" color="text.secondary">
            {service.short}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pb: { xs: 4, md: 8 } }}>
        <Section overline="THE CHALLENGE" title="The problem we solve">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
            {service.problem}
          </Typography>
        </Section>

        <Section overline="OUR APPROACH" title="What we deliver">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
            {service.solution}
          </Typography>
        </Section>

        <Section overline="HOW WE WORK" title="Our process">
          <Grid container spacing={2}>
            {service.process.map((step, index) => (
              <Grid item xs={12} sm={6} key={index}>
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
                  <Typography
                    variant="h6"
                    sx={{ color: "primary.main", fontWeight: "bold", mb: 1 }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section overline="TECHNOLOGY" title="Technologies we use">
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {service.tech.map((tech) => (
              <Chip key={tech} label={tech} variant="outlined" color="primary" />
            ))}
          </Stack>
        </Section>

        <Section overline="OUTCOME" title="What you can expect">
          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <CheckCircleOutlineIcon color="success" sx={{ mt: 0.5 }} />
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
              {service.outcome}
            </Typography>
          </Box>
        </Section>

        {relatedStudies.length > 0 && (
          <Section overline="PROOF" title="Related case studies">
            <Grid container spacing={3}>
              {relatedStudies.map((study) => (
                <Grid item xs={12} sm={6} key={study.slug}>
                  <Card sx={{ height: "100%" }}>
                    <CardActionArea
                      component={RouterLink}
                      to={`/case-studies/${study.slug}`}
                      sx={{ height: "100%" }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                          {study.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {study.shortDescription}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Section>
        )}
      </Container>

      <CTASection
        title={`Let's talk about your ${service.title.toLowerCase()} project`}
      />
    </>
  );
};

export default ServicePage;
