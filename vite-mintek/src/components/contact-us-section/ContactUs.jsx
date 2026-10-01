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
import { useSearchParams } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  site,
  projectTypes,
  budgetPresets,
  projectTypeForService,
} from "../../config/siteConfig";
import { LABELS } from "../../config/cta";
import { trackEvent, trackFormStart, trackFormSubmit } from "../../utils/analytics";

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
  title: "Send a project brief",
  subtitle:
    "Share the business problem, current process or website you want to improve. We will review the request and recommend a practical next step.",
  contactInfo: {
    title: "Contact Information",
    items: [
      {
        icon: <PhoneIcon />,
        title: "Phone Number",
        text: site.phone,
      },
      {
        icon: <EmailIcon />,
        title: "Email Address",
        text: site.email,
      },
      {
        icon: <LocationOnIcon />,
        title: "Our Location",
        text: site.address.formatted,
      },
    ],
  },
};

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

const ContactUs = ({
  defaultService = "",
  defaultProjectType = "",
  showIntro = true,
  showMap = false,
  formOnly = false,
  formTitle,
}) => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [projectType, setProjectType] = useState(
    defaultProjectType || projectTypeForService(defaultService)
  );
  const [budget, setBudget] = useState("");
  const [errors, setErrors] = useState({});
  const startedRef = useRef(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Prefill (or update) the project type from ?projectType= or ?service=<slug>.
  useEffect(() => {
    if (defaultProjectType) {
      setProjectType(defaultProjectType);
      return;
    }
    if (defaultService) {
      setProjectType(projectTypeForService(defaultService));
    }
  }, [defaultService, defaultProjectType]);

  // Reset budget when the project type changes, since the ranges differ. This
  // also prevents submitting a stale budget belonging to another project type.
  useEffect(() => {
    setBudget("");
  }, [projectType]);

  const budgetType =
    projectTypes.find((t) => t.value === projectType)?.budgetType || "general";
  const budgetOptions = budgetPresets[budgetType] || budgetPresets.general;
  const sourceCta = searchParams.get("cta") || "";
  const sourcePlacement = searchParams.get("placement") || "";

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Fire a single "form started" event on first interaction.
  const handleFormStart = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackFormStart({
        project_type: projectType || "",
        cta: sourceCta,
        placement: sourcePlacement,
        service: defaultService || "",
      });
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
                page: typeof window === "undefined" ? "" : window.location.pathname,
                cta: sourceCta || "brief",
                placement: sourcePlacement || "",
                service: defaultService || "",
              },
              _gotcha: form.elements._gotcha?.value || "",
            }),
          }
        );
      } finally {
        clearTimeout(timeout);
      }
      if (!res.ok) throw new Error(`Submit failed: ${res.status}`);

      const projectTypeLabel =
        projectTypes.find((t) => t.value === projectType)?.label || "Unspecified";
      trackFormSubmit({
        project_type: projectTypeLabel,
        budget: budget || "Unspecified",
        cta: sourceCta || "brief",
        placement: sourcePlacement || "",
        service: defaultService || "",
      });

      setSnackbar({
        open: true,
        message:
          "Thanks — we received your project brief. We'll review it and follow up with questions or a suggested next step.",
        severity: "success",
      });
      form.reset();
      startedRef.current = false;
      setProjectType(defaultProjectType || projectTypeForService(defaultService));
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
        py: formOnly ? { xs: 4, md: 6 } : { xs: 8, md: 16 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            radial-gradient(#B4B2C5 1px, transparent 1px),
            radial-gradient(#B4B2C5 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
          opacity: 0.22,
          maskImage:
            "radial-gradient(ellipse 75% 55% at 50% 22%, transparent 0%, #000 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 55% at 50% 22%, transparent 0%, #000 72%)",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        {showIntro && (
          <>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
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
                color: "text.primary",
              }}
            >
              {contactContent.title}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                textAlign: "center",
                maxWidth: 720,
                mx: "auto",
                mb: 4,
                color: "text.primary",
                opacity: 0.82,
                lineHeight: 1.6,
              }}
            >
              {contactContent.subtitle}
            </Typography>
          </>
        )}

        {formTitle && (
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: formOnly ? "left" : "center",
              mb: 3,
              color: "text.primary",
            }}
          >
            {formTitle}
          </Typography>
        )}

        <Grid container spacing={6} alignItems="stretch">
          {!formOnly && (
          <Grid item xs={12} md={5} sx={{ display: "flex" }}>
            <Stack spacing={3} sx={{ width: "100%", height: "100%" }}>
              <Box
                sx={{
                  p: 4,
                  bgcolor: "white",
                  borderRadius: 2,
                  boxShadow: "0 8px 24px -4px rgba(108, 85, 249, 0.1)",
                  ...(showMap ? {} : { flex: 1 }),
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ mb: 4, color: "text.primary" }}
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
              {showMap && (
                <Box
                  sx={{
                    flex: 1,
                    minHeight: { xs: 240, md: 0 },
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "white",
                    boxShadow: "0 8px 24px -4px rgba(108, 85, 249, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    component="iframe"
                    title="Google Maps listing for Mintek Software, Brampton"
                    src={site.mapsEmbedSrc}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    sx={{
                      border: 0,
                      width: "100%",
                      height: "100%",
                      flex: 1,
                      minHeight: 0,
                      display: "block",
                    }}
                  />
                </Box>
              )}
            </Stack>
          </Grid>
          )}

          {/* Contact Form */}
          <Grid item xs={12} md={formOnly ? 12 : 7} sx={{ display: "flex" }}>
            <Box
              id="project-brief"
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
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                scrollMarginTop: { xs: 96, md: 112 },
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
                      LABELS.brief
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
        autoHideDuration={8000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ mb: { xs: 8, md: 0 } }}
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
