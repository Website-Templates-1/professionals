import { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Seo from "../components/seo/Seo";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { onboarding } from "../config/siteConfig";
import { trackEvent } from "../utils/analytics";

const breadcrumbItems = [
  { name: "Home", path: "/" },
  { name: "Start a project", path: "/start-a-project" },
];

const steps = [
  {
    title: "Pick what fits",
    body: "Choose the option closest to your business so the questions match how you actually work. Not sure? Other business is a safe default.",
  },
  {
    title: "Answer a few questions",
    body: "Tell us about the business, your services, and what the site needs to do. A rough draft is fine — we help polish the wording later.",
  },
  {
    title: "We review and follow up",
    body: "We read what you sent, then set up a short discovery call to confirm scope and give you a clear price. No commitment to book.",
  },
];

const IndustryCard = ({ industry }) => (
  <Grid item xs={12} sm={6} key={industry.id}>
    <Box
      component="a"
      href={industry.to}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent("select_industry", {
          industry: industry.id,
          to: industry.to,
        })
      }
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        textDecoration: "none",
        color: "text.primary",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 8px 32px -4px rgba(108, 85, 249, 0.18)",
          transform: "translateY(-2px)",
        },
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.main",
          outlineOffset: 2,
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1 }}
      >
        <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
          {industry.label}
        </Typography>
        <ArrowForwardIcon color="primary" fontSize="small" />
      </Stack>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ lineHeight: 1.8, mb: 2 }}
      >
        {industry.blurb}
      </Typography>
      <Typography
        variant="body2"
        sx={{ mt: "auto", color: "primary.main", fontWeight: 600 }}
      >
        Continue to the {industry.label} form
      </Typography>
    </Box>
  </Grid>
);

const StartProject = () => {
  useEffect(() => {
    trackEvent("start_a_project_view");
  }, []);

  return (
    <>
      <Seo
        title="Start a project | Mintek Software"
        description="Tell us about your project. Pick your type of business and answer a few quick questions so Mintek can design and launch the right website for you."
        path="/start-a-project"
        noindex
      />

      <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 4, md: 6 } }}>
        <Container maxWidth="md">
          <Breadcrumbs items={breadcrumbItems} />
          <Typography
            variant="overline"
            sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 2 }}
          >
            START A PROJECT
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontWeight: "bold", mb: 3, fontSize: { xs: "2.25rem", md: "3rem" } }}
          >
            Tell us about your project
          </Typography>
          <Typography variant="h6" component="p" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            Help us understand what you need. Pick the option that fits your
            business and answer a few short questions — it takes a few minutes,
            and it's a scoping step, not a purchase. We review what you send and
            follow up to set up a discovery call.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pb: { xs: 6, md: 8 } }}>
        <Grid container spacing={2}>
          {onboarding.industries.map((industry) => (
            <IndustryCard industry={industry} key={industry.id} />
          ))}
        </Grid>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 3, lineHeight: 1.8 }}
        >
          Prefer to see every option first? Open the{" "}
          <Box
            component="a"
            href={onboarding.selectorUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("select_industry", { industry: "selector", to: onboarding.selectorUrl })}
            sx={{ color: "primary.main", fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
          >
            full onboarding selector
          </Box>
          , or{" "}
          <Box
            component={RouterLink}
            to="/contact"
            sx={{ color: "primary.main", fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
          >
            just send us a message
          </Box>{" "}
          if you'd rather start with a quick email.
        </Typography>
      </Container>

      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.default" }}>
        <Container maxWidth="md">
          <Typography
            variant="overline"
            sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 2 }}
          >
            WHAT HAPPENS NEXT
          </Typography>
          <Typography variant="h3" component="h2" sx={{ fontWeight: "bold", mb: 4 }}>
            A few minutes now saves a long first call
          </Typography>
          <Stack spacing={2.5}>
            {steps.map((step, index) => (
              <Box key={step.title} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  {index + 1}
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {step.body}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>

          <Button
            component={RouterLink}
            to="/web-design-brampton"
            variant="text"
            color="primary"
            sx={{ mt: 4, px: 0 }}
          >
            Back to web design in Brampton
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default StartProject;
