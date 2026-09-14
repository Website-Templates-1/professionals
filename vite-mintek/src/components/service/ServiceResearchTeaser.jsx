import { Box, Button, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import stats from "../../content/research/brampton-2026-stats";
import ServiceSection from "./ServiceSection";

const RESEARCH_PATH = "/research/brampton-business-websites-2026";

const figures = [
  {
    value: String(stats.perf.median),
    label: "Median mobile Lighthouse performance",
    detail: `${stats.scored} scored homepages`,
  },
  {
    value: `${stats.lcp.median}s`,
    label: "Median largest contentful paint",
    detail: "Lab LCP, not a ranking claim",
  },
  {
    value: `${stats.lcp.over25.n}/${stats.lcp.over25.d}`,
    label: "Sites slower than Google's 2.5s LCP “good” threshold",
    detail: `${stats.lcp.over25.pct}% of scored runs`,
  },
  {
    value: `${stats.htmlSignals.localbiz.pct}%`,
    label: "LocalBusiness-style structured data detected",
    detail: `${stats.htmlSignals.localbiz.n} of ${stats.htmlSignals.localbiz.d} fetched HTML pages`,
  },
];

const ServiceResearchTeaser = ({ teaser }) => {
  if (!teaser) return null;

  return (
    <ServiceSection overline={teaser.overline || "RESEARCH"} title={teaser.title}>
      {teaser.body && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.9 }}>
          {teaser.body}
        </Typography>
      )}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {figures.map((item) => (
          <Grid item xs={12} sm={6} key={item.label}>
            <Box
              sx={{
                p: 2.5,
                height: "100%",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main" }}>
                {item.value}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                {item.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.detail}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Button
        component={RouterLink}
        to={teaser.to || RESEARCH_PATH}
        variant="outlined"
        color="primary"
      >
        {teaser.ctaLabel || "Read the Brampton Website Study"}
      </Button>
    </ServiceSection>
  );
};

export default ServiceResearchTeaser;
