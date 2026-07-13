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
import Seo from "../components/seo/Seo";
import Breadcrumbs from "../components/common/Breadcrumbs";
import CTASection from "../components/common/CTASection";
import { BreadcrumbSchema } from "../components/seo/StructuredData";
import { getCaseStudy, getService } from "../config/siteConfig";
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

const CaseStudyDetail = ({ slug }) => {
  const study = getCaseStudy(slug);
  if (!study) return <NotFound />;

  const path = `/case-studies/${study.slug}`;
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Case Studies", path: "/case-studies" },
    { name: study.title, path },
  ];
  const relatedServices = (study.services || []).map(getService).filter(Boolean);

  return (
    <>
      <Seo title={study.metaTitle} description={study.metaDescription} path={path} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 4, md: 6 } }}>
        <Container maxWidth="md">
          <Breadcrumbs items={breadcrumbItems} />
          <Typography variant="overline" color="text.secondary">
            {study.client} &middot; {study.year} &middot; {study.status}
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontWeight: "bold", mb: 3, fontSize: { xs: "2.25rem", md: "3rem" } }}
          >
            {study.title}
          </Typography>
          {study.liveUrl && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<OpenInNewIcon />}
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View live
            </Button>
          )}
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pb: { xs: 4, md: 8 } }}>
        <Panel title="Overview">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
            {study.summary}
          </Typography>
        </Panel>

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

        <Panel title="Tech stack" accent="info.main">
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {study.techStack.map((tech) => (
              <Chip key={tech} label={tech} variant="outlined" color="primary" />
            ))}
          </Stack>
        </Panel>

        {relatedServices.length > 0 && (
          <Panel title="Services used">
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
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
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

      <CTASection title="Have a project like this in mind?" />
    </>
  );
};

export default CaseStudyDetail;
