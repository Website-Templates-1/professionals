import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Seo from "../components/seo/Seo";
import Breadcrumbs from "../components/common/Breadcrumbs";
import CTASection from "../components/common/CTASection";
import { BreadcrumbSchema, CaseStudyListSchema } from "../components/seo/StructuredData";
import { orderedCaseStudies, site } from "../config/siteConfig";

const CaseStudiesIndex = () => {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Case Studies", path: "/case-studies" },
  ];

  return (
    <>
      <Seo
        title={`Case Studies | ${site.brand}`}
        description="Real projects from Mintek Software: custom software, websites and automation with measurable results, from online ordering systems to map-first marketplaces."
        path="/case-studies"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <CaseStudyListSchema studies={orderedCaseStudies} />

      <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 4, md: 6 } }}>
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <Typography variant="h1" component="h1" sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "2.25rem", md: "3rem" } }}>
            Case Studies
          </Typography>
          <Typography variant="h6" component="p" color="text.secondary" sx={{ maxWidth: 700 }}>
            Real projects with measurable outcomes. Each one shows the problem,
            what we built, and the results it delivered.
          </Typography>
        </Container>
      </Box>

      <Container sx={{ pb: { xs: 6, md: 10 } }}>
        <Grid container spacing={4}>
          {orderedCaseStudies.map((study) => (
            <Grid item xs={12} md={4} key={study.slug}>
              <Card sx={{ height: "100%" }}>
                <CardActionArea
                  component={RouterLink}
                  to={`/case-studies/${study.slug}`}
                  sx={{ height: "100%" }}
                >
                  <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", height: "100%" }}>
                    <Box sx={{ mb: "auto" }}>
                      <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} flexWrap="wrap" useFlexGap>
                        <Chip label={study.label} size="small" color="primary" variant="outlined" />
                        {study.kind === "concept" && (
                          <Chip label="Concept" size="small" color="warning" />
                        )}
                        {study.kind === "prototype" && (
                          <Chip label="Prototype" size="small" color="warning" />
                        )}
                      </Stack>
                      <Typography variant="overline" color="text.secondary">
                        {study.client} &middot; {study.year}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                        {study.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        {study.shortDescription}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {study.techStack.slice(0, 3).map((tech) => (
                        <Chip key={tech} label={tech} size="small" variant="outlined" color="secondary" />
                      ))}
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <CTASection
        title="Planning something similar? Book a discovery call."
        subtitle="Pick a time that works. We'll use the call to understand the project and suggest a sensible first version."
        intent="caseStudy"
        placement="case_studies_index_cta"
      />
    </>
  );
};

export default CaseStudiesIndex;
