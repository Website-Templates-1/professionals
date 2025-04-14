import React from "react";
import { Container, Typography, Grid, Card, CardContent, Box } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import BusinessIcon from "@mui/icons-material/Business";
import DevicesIcon from "@mui/icons-material/Devices";

const servicesContent = {
  overline: "WHAT WE DO",
  title: "Our Services",
  subtitle: "Transforming ideas into powerful digital solutions",
  services: [
    {
      icon: <CodeIcon />,
      title: "Custom Software Development",
      description: "Tailored solutions designed to meet your specific business needs and challenges.",
      color: "#6C55F9",
    },
    {
      icon: <BusinessIcon />,
      title: "Enterprise Solutions",
      description: "Scalable and robust applications for large-scale business operations.",
      color: "#FF3D85",
    },
    {
      icon: <DevicesIcon />,
      title: "Mobile Development",
      description: "Cross-platform mobile applications that deliver exceptional user experience.",
      color: "#35bb78",
    },
  ],
};

const OurServices = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 16 },
        bgcolor: 'background.paper',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(180deg, rgba(108, 85, 249, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
        },
      }}
    >
      <Container>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              letterSpacing: 2,
              mb: 2,
              display: 'block',
            }}
          >
            {servicesContent.overline}
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: "bold",
              mb: 2,
              background: "linear-gradient(45deg, #6C55F9, #8875fa)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {servicesContent.title}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto' }}
          >
            {servicesContent.subtitle}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {servicesContent.services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  background: "#ffffff",
                  borderRadius: 4,
                  transition: "all 0.3s ease-in-out",
                  border: '1px solid',
                  borderColor: 'divider',
                  "&:hover": {
                    transform: "translateY(-12px)",
                    boxShadow: "0 12px 48px -8px rgba(108, 85, 249, 0.16)",
                    borderColor: 'transparent',
                    '& .service-icon': {
                      transform: 'scale(1.1)',
                      bgcolor: service.color,
                      color: 'white',
                    }
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    className="service-icon"
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `${service.color}15`,
                      color: service.color,
                      mb: 3,
                      transition: 'all 0.3s ease-in-out',
                      '& svg': {
                        fontSize: 40,
                      },
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      mb: 2,
                      fontWeight: "bold",
                      color: "text.primary",
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.7,
                    }}
                  >
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default OurServices;
