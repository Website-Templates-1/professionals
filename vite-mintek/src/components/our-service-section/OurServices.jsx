import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CodeIcon from "@mui/icons-material/Code";
import LanguageIcon from "@mui/icons-material/Language";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DevicesIcon from "@mui/icons-material/Devices";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { homepageServices } from "../../config/siteConfig";

const iconMap = {
  Code: CodeIcon,
  Language: LanguageIcon,
  AutoAwesome: AutoAwesomeIcon,
  Devices: DevicesIcon,
  Dashboard: DashboardIcon,
  Storefront: StorefrontIcon,
};

const OurServices = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 16 },
        bgcolor: "background.paper",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background:
            "linear-gradient(180deg, rgba(108, 85, 249, 0.05) 0%, rgba(255, 255, 255, 0) 100%)",
        },
      }}
    >
      <Container>
        <Box sx={{ textAlign: "center", mb: 8 }}>
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
            WHAT WE DO
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
            Our Services
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            sx={{ maxWidth: "600px", mx: "auto" }}
          >
            Custom software, business automation and web applications that turn
            manual work into measurable results, plus the websites that support
            them.
          </Typography>
          <Typography
            variant="body2"
            component="p"
            color="text.secondary"
            sx={{ maxWidth: "600px", mx: "auto", mt: 2 }}
          >
            Business website projects start at CAD $1,500. Custom software and
            automation projects are quoted after discovery.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {homepageServices.map((service) => {
            const Icon = iconMap[service.icon] || CodeIcon;
            return (
              <Grid item xs={12} sm={6} md={3} key={service.slug}>
                <Card
                  sx={{
                    height: "100%",
                    background: "#ffffff",
                    borderRadius: 4,
                    transition: "all 0.3s ease-in-out",
                    border: "1px solid",
                    borderColor: "divider",
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: "0 12px 48px -8px rgba(108, 85, 249, 0.16)",
                      borderColor: "transparent",
                      "& .service-icon": {
                        transform: "scale(1.1)",
                        bgcolor: service.color,
                        color: "white",
                      },
                    },
                  }}
                >
                  <CardActionArea
                    component={RouterLink}
                    to={`/${service.slug}`}
                    sx={{ height: "100%" }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        className="service-icon"
                        sx={{
                          width: 72,
                          height: 72,
                          borderRadius: 3,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: `${service.color}15`,
                          color: service.color,
                          mb: 3,
                          transition: "all 0.3s ease-in-out",
                          "& svg": { fontSize: 36 },
                        }}
                      >
                        <Icon />
                      </Box>
                      <Typography
                        variant="h6"
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
                        sx={{ color: "text.secondary", lineHeight: 1.7 }}
                      >
                        {service.short}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default OurServices;
