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
import LanguageIcon from "@mui/icons-material/Language";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { getService } from "../../config/siteConfig";

const iconMap = {
  Language: LanguageIcon,
  Restaurant: RestaurantIcon,
};

// Homepage in-content links to priority local money pages. Anchor text is
// descriptive and keyword-relevant so the highest-authority page passes link
// equity to these routes. Copy is pulled from siteConfig (single source of truth).
const localLinks = [
  {
    slug: "web-design-brampton",
    linkText: "Web design in Brampton",
  },
  {
    slug: "restaurant-website-design",
    linkText: "Restaurant & cafe website design",
  },
  {
    slug: "website-development",
    linkText: "Business website development",
  },
];

const LocalServices = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 14 },
        bgcolor: "background.default",
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
            LOCAL WEB DESIGN
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
            Websites for Brampton &amp; the GTA
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            sx={{ maxWidth: "600px", mx: "auto" }}
          >
            Based in Brampton, we build fast, mobile-friendly websites tailored
            to local businesses. Explore our focused web design and development
            services below.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {localLinks.map(({ slug, linkText }) => {
            const service = getService(slug);
            if (!service) return null;
            const Icon = iconMap[service.icon] || LanguageIcon;
            return (
              <Grid item xs={12} sm={6} md={4} key={slug}>
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
                      "& .local-icon": {
                        transform: "scale(1.1)",
                        bgcolor: service.color,
                        color: "white",
                      },
                    },
                  }}
                >
                  <CardActionArea
                    component={RouterLink}
                    to={`/${slug}`}
                    sx={{ height: "100%" }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        className="local-icon"
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
                        {linkText}
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

export default LocalServices;
