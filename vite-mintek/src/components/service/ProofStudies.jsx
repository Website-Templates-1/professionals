import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ServiceSection from "./ServiceSection";

const isPreviewHost = (url) =>
  typeof url === "string" && /\.vercel\.app($|\/)/i.test(url);

const ProofStudies = ({
  studies,
  id,
  overline = "PROOF",
  title = "Named clients and published results",
  intro = "These are real businesses, named. We only repeat outcomes already published on the case-study pages, and we do not invent testimonials or metrics. Where a public URL exists, you can open the live site.",
}) => {
  if (!studies?.length) return null;

  return (
    <ServiceSection id={id} overline={overline} title={title}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
        {intro}
      </Typography>
      <Grid container spacing={3}>
        {studies.map((study) => {
          const shownResults = (study.results || []).filter(Boolean);
          const shownMetrics = (study.metrics || []).filter((m) => m.value);
          const externalUrl = study.liveUrl || study.previewUrl;
          const preview = Boolean(study.previewUrl) || isPreviewHost(study.liveUrl);
          return (
            <Grid item xs={12} key={study.slug}>
              <Card>
                {study.image && (
                  <Box
                    component="img"
                    src={study.image}
                    alt={
                      study.imageAlt ||
                      `${study.client} website — ${study.label} by Mintek Software`
                    }
                    loading="lazy"
                    sx={{
                      width: "100%",
                      height: { xs: 180, sm: 220 },
                      objectFit: "cover",
                      objectPosition: "top",
                      display: "block",
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    }}
                  />
                )}
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="overline" color="text.secondary">
                    {study.client} · {study.label} · {study.year}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {study.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
                    {study.shortDescription}
                  </Typography>
                  {shownMetrics.length > 0 && (
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                      {shownMetrics.map((metric) => (
                        <Chip
                          key={metric.label}
                          label={`${metric.value} ${metric.label}`}
                          color="primary"
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Stack>
                  )}
                  {shownResults.length > 0 && (
                    <Stack spacing={1} sx={{ mb: 2 }}>
                      {shownResults.map((result) => (
                        <Box key={result} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                          <CheckCircleOutlineIcon color="success" fontSize="small" sx={{ mt: 0.25 }} />
                          <Typography variant="body2">{result}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  )}
                  <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                    <Button
                      component={RouterLink}
                      to={`/case-studies/${study.slug}`}
                      size="small"
                      variant="contained"
                    >
                      Read the case study
                    </Button>
                    {externalUrl && (
                      <Button
                        href={externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        variant="outlined"
                        endIcon={<OpenInNewIcon />}
                      >
                        {preview ? "View preview (temporary)" : "View live site"}
                      </Button>
                    )}
                  </Stack>
                  {preview && externalUrl && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5 }}>
                      Temporary preview link, not the final production domain.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </ServiceSection>
  );
};

export default ProofStudies;
