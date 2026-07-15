import { useState, useEffect } from "react";
import { Box, Container, Typography, Grid, Button, Snackbar, Alert, CircularProgress } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  site,
  projectTypes,
  budgetPresets,
  projectTypeForService,
} from "../../config/siteConfig";
import { trackLead } from "../../utils/analytics";

const contactContent = {
  overline: "GET IN TOUCH",
  title: "Let's Build Something Great Together",
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
    outline: "none",
    borderColor: "primary.main",
  },
};

const ContactUs = ({ defaultService = "" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [projectType, setProjectType] = useState(
    projectTypeForService(defaultService)
  );
  const [budget, setBudget] = useState("");
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

  // Reset budget when the project type changes, since the ranges differ.
  useEffect(() => {
    setBudget("");
  }, [projectType]);

  const budgetType =
    projectTypes.find((t) => t.value === projectType)?.budgetType || "general";
  const budgetOptions = budgetPresets[budgetType] || budgetPresets.general;

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();

    const form = event.target;
    const { name, email, message } = form.elements;

    if (!name.value || !email.value || !message.value) {
      setSnackbar({
        open: true,
        message: "Please fill in your name, email and a short message",
        severity: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.sendForm(
        "service_775ddm4",
        "template_2935oq1",
        form,
        "IujqhptBVwY6OTejt"
      );

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
            mb: 8,
            fontWeight: "bold",
            background: "linear-gradient(45deg, #6C55F9, #8875fa)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {contactContent.title}
        </Typography>

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
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
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
              onSubmit={handleFormSubmission}
              sx={{
                p: 4,
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: "0 8px 24px -4px rgba(108, 85, 249, 0.1)",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Name
                  </Typography>
                  <Box
                    component="input"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    sx={inputSx}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Email
                  </Typography>
                  <Box
                    component="input"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    sx={inputSx}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Project type
                  </Typography>
                  <Box
                    component="select"
                    name="project_type"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
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
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Estimated budget
                  </Typography>
                  <Box
                    component="select"
                    name="budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
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
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Message
                  </Typography>
                  <Box
                    component="textarea"
                    name="message"
                    placeholder="Tell us about your project, goals and timeline..."
                    rows={6}
                    sx={{ ...inputSx, minHeight: 120, resize: "vertical" }}
                  />
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
