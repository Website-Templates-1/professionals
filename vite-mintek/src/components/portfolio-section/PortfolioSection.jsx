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
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { homepageCaseStudies } from "../../config/siteConfig";

const PortfolioSection = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 14 }, bgcolor: "background.default" }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}>
          <Typography
            variant="overline"
            sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 2, display: "block", mb: 2 }}
          >
            OUR WORK
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "1.8rem", md: "2.5rem" } }}
          >
            Custom Software, Automation and Websites Built for Real Businesses
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            sx={{ maxWidth: 720, mx: "auto" }}
          >
            From map-first marketplaces to data-driven web apps and conversion-focused
            websites, here is a cross-section of what we build.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {homepageCaseStudies.map((study) => {
            const highlight = study.features?.[0] || study.results?.[0];
            return (
            <Grid item xs={12} sm={6} md={4} key={study.slug}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 48px -8px rgba(108, 85, 249, 0.16)",
                  },
                }}
              >
                <CardActionArea
                  component={RouterLink}
                  to={`/case-studies/${study.slug}`}
                  sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}
                >
                  {study.image ? (
                    <Box
                      component="img"
                      src={study.image}
                      alt={study.imageAlt || `${study.title} — ${study.label} by Mintek Software`}
                      loading="lazy"
                      sx={{ width: "100%", height: 180, objectFit: "cover", display: "block" }}
                    />
                  ) : (
                    <Box
                      aria-hidden="true"
                      sx={{
                        height: 140,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        px: 3,
                        textAlign: "center",
                        color: "white",
                        background:
                          "linear-gradient(135deg, #6C55F9 0%, #8875fa 60%, #FF3D85 140%)",
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
                        {study.label}
                      </Typography>
                    </Box>
                  )}
                  <CardContent sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column" }}>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
                      <Chip label={study.label} size="small" color="primary" variant="outlined" />
                      {study.kind === "concept" && (
                        <Chip label="Concept" size="small" color="warning" />
                      )}
                    </Stack>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                      {study.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: highlight ? 2 : 0 }}>
                      {study.shortDescription}
                    </Typography>
                    {highlight && (
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="flex-start"
                        sx={{ mt: "auto", pt: 1 }}
                      >
                        <CheckCircleOutlineIcon color="success" fontSize="small" sx={{ mt: 0.2 }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {highlight}
                        </Typography>
                      </Stack>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            );
          })}
        </Grid>

        <Box sx={{ textAlign: "center", mt: { xs: 5, md: 7 } }}>
          <Button
            component={RouterLink}
            to="/case-studies"
            variant="outlined"
            size="large"
            color="primary"
          >
            View all case studies
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PortfolioSection;
