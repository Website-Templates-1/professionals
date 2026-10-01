import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Stack,
  Button,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Seo from "../components/seo/Seo";
import Breadcrumbs from "../components/common/Breadcrumbs";
import CTASection from "../components/common/CTASection";
import Faq from "../components/common/Faq";
import RelatedContent from "../components/common/RelatedContent";
import { BreadcrumbSchema, CaseStudySchema } from "../components/seo/StructuredData";
import { getCaseStudy, getService, getCaseStudyFaqs } from "../config/siteConfig";
import { getCaseStudyRelated } from "../config/relatedContent";
import NotFound from "./NotFound";

const Panel = ({ title, accent = "primary.main", children }) => (
  <Box sx={{ mb: 5 }}>
    <Typography
      variant="h5"
      component="h2"
      sx={{
        mb: 2,
        display: "flex",
        alignItems: "center",
        gap: 1,
        "&::before": {
          content: '""',
          width: 4,
          height: 22,
          bgcolor: accent,
          borderRadius: 1,
        },
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

// How to present the project's origin without misrepresenting it.
const eyebrowFor = (study) => {
  if (study.kind === "concept") return "Design concept";
  if (study.kind === "product") return `${study.client} (product)`;
  if (study.kind === "prototype") return `${study.client} (prototype)`;
  return study.client; // client work
};

const CaseStudyDetail = ({ slug }) => {
  const study = getCaseStudy(slug);
  if (!study) return <NotFound />;

  const path = `/case-studies/${study.slug}`;
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Case Studies", path: "/case-studies" },
    { name: study.title, path },
  ];
  const relatedServices = (study.services || [])
    .map(getService)
    .filter((s) => s && !s.hidden);
  const shownMetrics = (study.metrics || []).filter((m) => m.value);
  const faqs = getCaseStudyFaqs(study.slug);
  const related = getCaseStudyRelated(study.slug);

  return (
    <>
      <Seo title={study.metaTitle} description={study.metaDescription} path={path} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <CaseStudySchema study={study} />

      <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 4, md: 6 } }}>
        <Container maxWidth="md">
          <Breadcrumbs items={breadcrumbItems} />
          <Stack direction="row" spacing={1} sx={{ mb: 1 }} flexWrap="wrap" useFlexGap>
            <Chip label={study.label} size="small" color="primary" variant="outlined" />
            {study.kind === "concept" && (
              <Chip label="Concept, not a client project" size="small" color="warning" />
            )}
            {study.kind === "prototype" && (
              <Chip label="Prototype" size="small" color="warning" />
            )}
          </Stack>
          <Typography variant="overline" color="text.secondary">
            {eyebrowFor(study)} &middot; {study.year}
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{ mb: 3 }}
          >
            {study.title}
          </Typography>
          {study.liveUrl ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<OpenInNewIcon />}
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View live site
            </Button>
          ) : study.previewUrl ? (
            <Box>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<OpenInNewIcon />}
                href={study.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View preview (temporary)
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                Temporary preview link, not the final production domain.
              </Typography>
            </Box>
          ) : null}
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pb: { xs: 4, md: 8 } }}>
        {shownMetrics.length > 0 && (
          <Grid container spacing={2} sx={{ mb: 5 }}>
            {shownMetrics.map((metric) => (
              <Grid item xs={6} sm={4} key={metric.label}>
                <Box
                  sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: 2,
                    bgcolor: "background.default",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="h4" sx={{ color: "primary.main" }}>
                    {metric.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {metric.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}

        <Panel title="Overview">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
            {study.summary}
          </Typography>
        </Panel>

        {study.problem && (
          <Panel title="The challenge" accent="warning.main">
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
              {study.problem}
            </Typography>
          </Panel>
        )}

        {study.solution && (
          <Panel title="What we built" accent="primary.main">
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
              {study.solution}
            </Typography>
          </Panel>
        )}

        {study.features?.length > 0 && (
          <Panel title="Key features" accent="secondary.main">
            <Grid container spacing={2}>
              {study.features.map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box
                    sx={{
                      p: 2,
                      height: "100%",
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "background.paper",
                    }}
                  >
                    <Typography variant="body2">{feature}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Panel>
        )}

        {study.results?.length > 0 && (
          <Panel title="Impact & results" accent="success.main">
            <Stack spacing={1.5}>
              {study.results.map((result, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                  <CheckCircleOutlineIcon color="success" sx={{ mt: 0.25 }} fontSize="small" />
                  <Typography variant="body1" color="text.secondary">
                    {result}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Panel>
        )}

        {study.note && (
          <Box
            sx={{
              mb: 5,
              p: 2.5,
              borderRadius: 2,
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "divider",
              display: "flex",
              gap: 1.5,
              alignItems: "flex-start",
            }}
          >
            <InfoOutlinedIcon color="info" fontSize="small" sx={{ mt: 0.25 }} />
            <Typography variant="body2" color="text.secondary">
              {study.note}
            </Typography>
          </Box>
        )}

        {study.techStack?.length > 0 && (
          <Panel title="Tech stack" accent="info.main">
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {study.techStack.map((tech) => (
                <Chip key={tech} label={tech} variant="outlined" color="primary" />
              ))}
            </Stack>
          </Panel>
        )}

        {relatedServices.length > 0 && (
          <Panel title="Services used">
            {study.services?.includes("web-design-brampton") && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
                This project is part of our{" "}
                <Box
                  component={RouterLink}
                  to="/web-design-brampton"
                  sx={{ color: "primary.main", fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                >
                  web design in Brampton
                </Box>{" "}
                work — the hub for local small-business sites, packages and related services.
              </Typography>
            )}
            <Grid container spacing={2}>
              {relatedServices.map((service) => (
                <Grid item xs={12} sm={6} key={service.slug}>
                  <Card sx={{ height: "100%" }}>
                    <CardActionArea
                      component={RouterLink}
                      to={`/${service.slug}`}
                      sx={{ height: "100%" }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          {service.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {service.short}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Panel>
        )}
      </Container>

      {related.length > 0 && (
        <Container maxWidth="md" sx={{ pb: { xs: 4, md: 8 } }}>
          <RelatedContent items={related} />
        </Container>
      )}

      {faqs.length > 0 && (
        <Faq items={faqs} title="Project FAQs" disableGutters={false} />
      )}

      <CTASection
        title="Planning something similar? Book a discovery call."
        subtitle="Pick a time that works. We'll use the call to understand the project and suggest a sensible first version."
        intent="caseStudy"
        placement="case_study_cta"
      />
    </>
  );
};

export default CaseStudyDetail;
