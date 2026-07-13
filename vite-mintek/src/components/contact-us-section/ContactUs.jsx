import { useState } from "react";
import { Box, Container, Typography, Grid, Button, Snackbar, Alert, CircularProgress } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import { site } from "../../config/siteConfig";

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
    ],
  },
  form: {
    fields: [
      {
        label: "Name",
        type: "text",
        name: "name",
        placeholder: "John Doe",
      },
      {
        label: "Email",
        type: "email",
        name: "email",
        placeholder: "john@example.com",
      },
      {
        label: "Message",
        type: "textarea",
        name: "message",
        placeholder: "Your message...",
      },
    ],
    submitButton: "Send Message",
  },
};

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    
    const form = event.target;
    const { name, email, message } = form.elements;

    if (!name.value || !email.value || !message.value) {
      setSnackbar({
        open: true,
        message: 'Please fill in all fields',
        severity: 'error'
      });
      return;
    }

    setIsLoading(true);

    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.sendForm(
        'service_775ddm4',
        'template_2935oq1',
        form,
        'IujqhptBVwY6OTejt'
      );
      
      setSnackbar({
        open: true,
        message: 'Thank you for your message. We will get back to you shortly.',
        severity: 'success'
      });
      form.reset();
    } catch (error) {
      console.error('Failed to send email:', error);
      setSnackbar({
        open: true,
        message: 'An error occurred. Please email us directly at our email address above.',
        severity: 'error'
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
                sx={{
                  fontWeight: "bold",
                  mb: 4,
                  color: "text.primary",
                }}
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
                {contactContent.form.fields.map((field, index) => (
                  <Grid item xs={12} key={index}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      {field.label}
                    </Typography>
                    {field.type === "textarea" ? (
                      <Box
                        component="textarea"
                        name={field.name}
                        placeholder={field.placeholder}
                        rows={6}
                        sx={{
                          width: "100%",
                          p: 1.5,
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 1,
                          minHeight: 120,
                          resize: "vertical",
                          fontFamily: "inherit",
                          "&:focus": {
                            outline: "none",
                            borderColor: "primary.main",
                          },
                        }}
                      />
                    ) : (
                      <Box
                        component="input"
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        sx={{
                          width: "100%",
                          p: 1.5,
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 1,
                          "&:focus": {
                            outline: "none",
                            borderColor: "primary.main",
                          },
                        }}
                      />
                    )}
                  </Grid>
                ))}
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
                      position: 'relative'
                    }}
                  >
                    {isLoading ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CircularProgress size={20} color="inherit" />
                        <span>Sending...</span>
                      </Box>
                    ) : (
                      contactContent.form.submitButton
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUs;
