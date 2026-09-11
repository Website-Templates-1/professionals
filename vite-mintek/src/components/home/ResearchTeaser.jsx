import { Box, Container, Typography, Card, CardActionArea, CardContent, Chip, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import stats from "../../content/research/brampton-2026-stats";

const ResearchTeaser = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}>
      <Container maxWidth="md">
        <Typography
          variant="overline"
          sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 1.6, display: "block", mb: 1 }}
        >
          Research
        </Typography>
        <Card sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
          <CardActionArea component={RouterLink} to="/research/brampton-business-websites-2026">
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} flexWrap="wrap" useFlexGap>
                <Chip label="2026 study" size="small" color="primary" variant="outlined" />
                <Chip label={`${stats.sample} Brampton businesses`} size="small" variant="outlined" />
              </Stack>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                The State of Brampton Business Websites: 2026
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                An original lab study of independently operated local business
                homepages. Median mobile Lighthouse performance {stats.perf.median};
                median LCP {stats.lcp.median} seconds.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    </Box>
  );
};

export default ResearchTeaser;
