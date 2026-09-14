import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const CTASection = ({
  title = "Ready to build something that works?",
  subtitle = "Tell us about your project and we'll show you how we can help.",
  primaryLabel = "Request a consultation",
  primaryTo = "/contact",
  secondaryLabel = "See our work",
  secondaryTo = "/case-studies",
  onPrimaryClick,
  onSecondaryClick,
}) => {
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
          <Button
            component={RouterLink}
            to={primaryTo}
            onClick={onPrimaryClick}
            variant="contained"
            size="large"
            color="primary"
          >
            {primaryLabel}
          </Button>
          {secondaryTo && (
            <Button
              component={RouterLink}
              to={secondaryTo}
              onClick={onSecondaryClick}
              variant="outlined"
              size="large"
              color="primary"
            >
              {secondaryLabel}
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default CTASection;
