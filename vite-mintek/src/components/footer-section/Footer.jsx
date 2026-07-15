import { Box, Container, Typography, Grid, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { site, footerNav } from "../../config/siteConfig";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 4,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              {site.brand}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, maxWidth: 320 }}
            >
              {site.description}
            </Typography>
            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                {site.address.locality}, {site.address.regionName},{" "}
                {site.address.countryName}
              </Typography>
              <Link
                href={`mailto:${site.email}`}
                variant="body2"
                color="text.secondary"
                underline="hover"
              >
                {site.email}
              </Link>
              <Link
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                variant="body2"
                color="text.secondary"
                underline="hover"
              >
                {site.phone}
              </Link>
            </Stack>
          </Grid>

          {footerNav.map((group) => (
            <Grid item xs={6} sm={3} md key={group.heading}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                {group.heading}
              </Typography>
              <Stack spacing={1}>
                {group.links.map((link) => (
                  <Link
                    key={link.path}
                    component={RouterLink}
                    to={link.path}
                    variant="body2"
                    color="text.secondary"
                    underline="hover"
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mt: 6,
            pt: 3,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          &copy; {year} {site.brand}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
