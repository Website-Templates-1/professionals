import { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  site,
  projectTypes,
  budgetPresets,
  projectTypeForService,
} from "../../config/siteConfig";
import { trackEvent, trackLead } from "../../utils/analytics";

// Public config (safe to ship in browser code — same trust model as the old
// EmailJS public key). The formId can only submit this one form to a fixed inbox.
const EMAIL_SERVICE_URL = import.meta.env.VITE_EMAIL_SERVICE_URL;
const CONTACT_FORM_ID = import.meta.env.VITE_CONTACT_FORM_ID;
if (!EMAIL_SERVICE_URL || !CONTACT_FORM_ID) {
  console.error(
    "Contact form is not configured: set VITE_EMAIL_SERVICE_URL and VITE_CONTACT_FORM_ID"
  );
}

const contactContent = {
  overline: "GET IN TOUCH",
  title: "Tell Us What You Want to Build or Automate",
  subtitle:
    "Share the business problem, current process or website you want to improve. We will review the request and recommend a practical next step.",
  contactInfo: {
    title: "Contact Information",
    items: [
      {
        icon: <LocationOnIcon />,
        title: "Our Location",
        text: `${site.address.locality}, ${site.address.regionName}, ${site.address.countryName}`,
      },
      {
        icon: <EmailIcon />,
        title: "Email Address",
        text: site.email,
      },
      {
        icon: <PhoneIcon />,
        title: "Phone Number",
        text: site.phone,
      },
    ],
  },
};

// Quick-start enquiry links (crawlable) that prefill the form's project type.
const enquiryLinks = [
  { label: "Custom software", service: "custom-software-development" },
  { label: "Automation", service: "business-automation" },
  { label: "Website estimate", service: "website-development" },
];

const inputSx = {
  width: "100%",
  p: 1.5,
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 1,
  fontFamily: "inherit",
  fontSize: "1rem",
  bgcolor: "white",
  "&:focus": {
    outline: "2px solid",
    outlineColor: "primary.main",
    outlineOffset: "-1px",
    borderColor: "primary.main",
  },
};

const labelSx = { display: "block", mb: 1, fontWeight: 600 };

const ContactUs = ({ defaultService = "", showIntro = true }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [projectType, setProjectType] = useState(
    projectTypeForService(defaultService)
  );
  const [budget, setBudget] = useState("");
  const [errors, setErrors] = useState({});
  const startedRef = useRef(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Prefill (or update) the project type when arriving via ?service=<slug>.
  useEffect(() => {
    if (defaultService) {
      setProjectType(projectTypeForService(defaultService));
    }
  }, [defaultService]);

  // Reset budget when the project type changes, since the ranges differ. This
  // also prevents submitting a stale budget belonging to another project type.
  useEffect(() => {
    setBudget("");
  }, [projectType]);

  const budgetType =
    projectTypes.find((t) => t.value === projectType)?.budgetType || "general";
  const budgetOptions = budgetPresets[budgetType] || budgetPresets.general;

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Fire a single "form started" event on first interaction.
  const handleFormStart = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("form_start", { form: "contact" });
    }
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();

    const form = event.target;
    const { name, email, message } = form.elements;

    const nextErrors = {};
    if (!name.value.trim()) nextErrors.name = "Please enter your name.";
    if (!email.value.trim()) nextErrors.email = "Please enter your email address.";
    if (!message.value.trim()) nextErrors.message = "Please tell us a little about your project.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      trackEvent("form_error", {
        form: "contact",
        fields: Object.keys(nextErrors).join(","),
      });
      setSnackbar({
        open: true,
        message: "Please fill in your name, email and a short message.",
        severity: "error",
      });
      const firstInvalid = form.elements[Object.keys(nextErrors)[0]];
      if (firstInvalid && typeof firstInvalid.focus === "function") {
        firstInvalid.focus();
      }
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // Generous timeout so a cold-started service (first submit after idle) can
      // wake instead of hanging forever.
      const ctrl = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), 60000);
      let res;
      try {
        res = await fetch(
          `${EMAIL_SERVICE_URL}/v1/forms/${CONTACT_FORM_ID}/submit`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: ctrl.signal,
            body: JSON.stringify({
              name: name.value.trim(),
              email: email.value.trim(),
              message: message.value.trim(),
              fields: {
                projectType:
                  projectTypes.find((t) => t.value === projectType)?.label ||
                  "Unspecified",
                budget: budget || "Unspecified",
              },
              _gotcha: form.elements._gotcha?.value || "",
            }),
          }
        );
      } finally {
        clearTimeout(timeout);
      }
      if (!res.ok) throw new Error(`Submit failed: ${res.status}`);

      trackLead({
        project_type:
          projectTypes.find((t) => t.value === projectType)?.label || "Unspecified",
        budget: budget || "Unspecified",
      });

      setSnackbar({
        open: true,
        message: "Thank you for your message. We will get back to you shortly.",
        severity: "success",
      });
      form.reset();
      startedRef.current = false;
      setProjectType(projectTypeForService(defaultService));
      setBudget("");
    } catch (error) {
      console.error("Failed to send email:", error);
      setSnackbar({
        open: true,
        message:
          "An error occurred. Please email us directly at the email address above.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        py: { xs: 8, md: 16 },
        position: "relative",
        overflow: "hidden",
        backgroundImage: `
              radial-gradient(#B4B2C5 1px, transparent 1px), 
              radial-gradient(#B4B2C5 1px, transparent 1px)
            `,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 20px 20px",
        backgroundRepeat: "repeat",
      }}
    >
      <Container maxWidth="lg">
        {showIntro && (
          <>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                letterSpacing: 2,
                mb: 2,
                display: "block",
                textAlign: "center",
              }}
            >
              {contactContent.overline}
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                textAlign: "center",
                mb: 2,
                fontWeight: "bold",
                background: "linear-gradient(45deg, #6C55F9, #8875fa)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {contactContent.title}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              color="text.secondary"
              sx={{ textAlign: "center", maxWidth: 720, mx: "auto", mb: 4 }}
            >
              {contactContent.subtitle}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              sx={{ mb: 8 }}
            >
              {enquiryLinks.map((link) => (
                <Button
                  key={link.service}
                  component={RouterLink}
                  to={`/contact?service=${link.service}`}
                  variant="outlined"
                  color="primary"
                >
                  {link.label}
                </Button>
              ))}
            </Stack>
          </>
        )}

        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                p: 4,
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: "0 8px 24px -4px rgba(108, 85, 249, 0.1)",
                height: "100%",
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                sx={{ fontWeight: "bold", mb: 4, color: "text.primary" }}
              >
                {contactContent.contactInfo.title}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {contactContent.contactInfo.items.map((item, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <Box
                      aria-hidden="true"
                      sx={{
                        minWidth: 48,
                        minHeight: 48,
                        borderRadius: 2,
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" component="p" sx={{ mb: 0.5 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.text}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Box
              component="form"
              noValidate
              onSubmit={handleFormSubmission}
              onFocus={handleFormStart}
              onChange={handleFormStart}
              sx={{
                p: 4,
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: "0 8px 24px -4px rgba(108, 85, 249, 0.1)",
              }}
            >
              <Grid container spacing={3}>
                {/* Honeypot: hidden from humans/AT; bots that fill it are dropped
                    server-side. Off-screen wrapper keeps it out of layout flow. */}
                <Box
                  aria-hidden="true"
                  sx={{ position: "absolute", top: "-9999px", left: "-9999px" }}
                >
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
                </Box>
                <Grid item xs={12} sm={6}>
                  <Typography component="label" htmlFor="contact-name" variant="subtitle2" sx={labelSx}>
                    Name <Box component="span" aria-hidden="true">*</Box>
                  </Typography>
                  <Box
                    component="input"
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    aria-required="true"
                    aria-invalid={errors.name ? "true" : undefined}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    sx={inputSx}
                  />
                  {errors.name && (
                    <Typography
                      id="contact-name-error"
                      role="alert"
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.5, display: "block" }}
                    >
                      {errors.name}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="label" htmlFor="contact-email" variant="subtitle2" sx={labelSx}>
                    Email address <Box component="span" aria-hidden="true">*</Box>
                  </Typography>
                  <Box
                    component="input"
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    aria-required="true"
                    aria-invalid={errors.email ? "true" : undefined}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    sx={inputSx}
                  />
                  {errors.email && (
                    <Typography
                      id="contact-email-error"
                      role="alert"
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.5, display: "block" }}
                    >
                      {errors.email}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography component="label" htmlFor="contact-project-type" variant="subtitle2" sx={labelSx}>
                    Project type
                  </Typography>
                  <Box
                    component="select"
                    id="contact-project-type"
                    name="project_type"
                    value={projectType}
                    onChange={(e) => {
                      setProjectType(e.target.value);
                      if (e.target.value) {
                        trackEvent("select_project_type", { project_type: e.target.value });
                      }
                    }}
                    sx={inputSx}
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="label" htmlFor="contact-budget" variant="subtitle2" sx={labelSx}>
                    Estimated budget
                  </Typography>
                  <Box
                    component="select"
                    id="contact-budget"
                    name="budget"
                    value={budget}
                    onChange={(e) => {
                      setBudget(e.target.value);
                      if (e.target.value) {
                        trackEvent("select_budget", { budget: e.target.value });
                      }
                    }}
                    sx={inputSx}
                  >
                    <option value="">Select a budget range</option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Typography component="label" htmlFor="contact-message" variant="subtitle2" sx={labelSx}>
                    Message <Box component="span" aria-hidden="true">*</Box>
                  </Typography>
                  <Box
                    component="textarea"
                    id="contact-message"
                    name="message"
                    placeholder="Tell us about your project, goals and timeline..."
                    rows={6}
                    aria-required="true"
                    aria-invalid={errors.message ? "true" : undefined}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    sx={{ ...inputSx, minHeight: 120, resize: "vertical" }}
                  />
                  {errors.message && (
                    <Typography
                      id="contact-message-error"
                      role="alert"
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.5, display: "block" }}
                    >
                      {errors.message}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={isLoading}
                    sx={{
                      py: 2,
                      bgcolor: "primary.main",
                      "&:hover": {
                        bgcolor: "primary.dark",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 16px -4px rgba(108, 85, 249, 0.3)",
                      },
                      position: "relative",
                    }}
                  >
                    {isLoading ? (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <CircularProgress size={20} color="inherit" />
                        <span>Sending...</span>
                      </Box>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUs;
