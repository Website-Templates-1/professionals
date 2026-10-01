import {
  Box,
  Container,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Seo from "../components/seo/Seo";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { BreadcrumbSchema } from "../components/seo/StructuredData";
import { site } from "../config/siteConfig";
import stats from "../content/research/brampton-2026-stats";

const breadcrumbItems = [
  { name: "Home", path: "/" },
  { name: "Research", path: "/research" },
];

const reports = [
  {
    to: "/research/brampton-business-websites-2026",
    title: "The State of Brampton Business Websites: 2026",
    description:
      "An original lab study of independently operated Brampton SMB homepages: Lighthouse performance, LCP, local SEO signals, and conversion markup.",
    date: "11 September 2026",
    facts: `${stats.sample} businesses · ${stats.html} HTML inspections · ${stats.scored} Lighthouse runs`,
  },
];

const ResearchIndex = () => {
  return (
    <>
      <Seo
        title={`Research | ${site.brand}`}
        description="Original research from Mintek Software on websites, performance, and local search for businesses in Brampton and the Greater Toronto Area."
        path="/research"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Breadcrumbs items={breadcrumbItems} />
          <Typography
            variant="h1"
            component="h1"
            sx={{ mb: 2 }}
          >
            Research
          </Typography>
          <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 6, maxWidth: 700 }}>
            Measurement studies and technical reports. These are not client
            testimonials and not search ranking claims.
          </Typography>

          {reports.map((report) => (
            <Card key={report.to} sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
              <CardActionArea component={RouterLink} to={report.to}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} flexWrap="wrap" useFlexGap>
                    <Chip label="Research" color="primary" size="small" />
                    <Chip label={report.date} variant="outlined" size="small" />
                  </Stack>
                  <Typography variant="h4" component="h2" sx={{ mb: 1.5 }}>
                    {report.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.7 }}>
                    {report.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {report.facts}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Container>
      </Box>
    </>
  );
};

export default ResearchIndex;
