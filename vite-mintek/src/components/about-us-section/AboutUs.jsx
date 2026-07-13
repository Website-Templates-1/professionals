import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";

const aboutUsContent = {
  overline: "ABOUT US",
  title: "Software built for how your business works",
  description:
    "Mintek Software is a Brampton-based software and web development studio serving businesses across the Greater Toronto Area and remotely. We build custom websites, internal business applications and automation that remove manual work, so growing teams can operate faster and make better decisions.",
  stats: [
    {
      number: "10+",
      label: "Projects Completed",
    },
    {
      number: "20+",
      label: "Happy Clients",
    },
    {
      number: "5",
      label: "Team Experts",
    },
  ],
  features: [
    {
      title: "Innovation First",
      description:
        "Pushing boundaries with cutting-edge technologies and creative solutions.",
    },
    {
      title: "Client Success",
      description:
        "Your success is our priority. We're committed to delivering exceptional results.",
    },
    {
      title: "Expert Team",
      description:
        "Skilled professionals with deep industry knowledge and experience.",
    },
    {
      title: "Quality Assured",
      description:
        "Rigorous testing and quality control in every project we deliver.",
    },
  ],
};

const AboutUs = () => {
  return (
    <Container
      sx={{
        py: { xs: 8, md: 16 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Grid container spacing={8} alignItems="center">
        {/* Left Column - Text Content */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              letterSpacing: 2,
              mb: 2,
              display: "block",
            }}
          >
            {aboutUsContent.overline}
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: "bold",
              mb: 4,
              background: "linear-gradient(45deg, #6C55F9, #8875fa)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {aboutUsContent.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 3,
              lineHeight: 1.8,
            }}
          >
            {aboutUsContent.description}
          </Typography>
          <Box sx={{ display: "flex", gap: 4, mb: 4 }}>
            {aboutUsContent.stats.map((stat, index) => (
              <Box key={index}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "primary.main",
                    mb: 1,
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Right Column - Feature Grid */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {aboutUsContent.features.map((feature, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  sx={{
                    p: 3,
                    height: "100%",
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 24px -10px rgba(108, 85, 249, 0.1)",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      color: "text.primary",
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
