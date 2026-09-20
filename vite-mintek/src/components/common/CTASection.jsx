import { Box, Container, Stack, Typography } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CtaButton from "./CtaButton";
import { resolveCta } from "../../config/cta";

const INTENT = {
  software: { primary: "book" },
  website: { primary: "estimate" },
  caseStudy: { primary: "book" },
  general: { primary: "book" },
};

const CTASection = ({
  title = "Ready to build something that works?",
  subtitle = "Book a discovery call and we'll talk through what you need.",
  intent = "general",
  primaryLabel,
  primaryTo,
  primaryType,
  secondaryLabel,
  secondaryTo,
  secondaryType,
  onPrimaryClick,
  onSecondaryClick,
  placement = "footer_cta",
  service,
}) => {
  const preset = INTENT[intent] || INTENT.general;
  const primaryKind = primaryType || preset.primary;
  const primary = primaryKind
    ? resolveCta(primaryKind, { service, placement })
    : null;
  const showSecondary = Boolean(secondaryType || secondaryTo);
  const secondary = secondaryType
    ? resolveCta(secondaryType, { service, placement })
    : null;

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h3" component="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          {title}
        </Typography>
        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 640, mx: "auto" }}
        >
          {subtitle}
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <CtaButton
            type={primaryKind}
            to={primaryTo || primary?.to}
            label={primaryLabel || primary?.label}
            placement={placement}
            service={service}
            onClick={onPrimaryClick}
            variant="contained"
            size="large"
            color="primary"
            startIcon={primaryKind === "book" ? <EventAvailableIcon /> : undefined}
          />
          {showSecondary && (
            <CtaButton
              type={secondaryType}
              to={secondaryTo || secondary?.to}
              label={secondaryLabel || secondary?.label}
              placement={placement}
              service={service}
              onClick={onSecondaryClick}
              variant="outlined"
              size="large"
              color="primary"
            />
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default CTASection;
