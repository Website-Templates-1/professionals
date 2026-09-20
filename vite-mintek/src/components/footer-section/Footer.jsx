import { Box, Container, Typography, Grid, Link, Stack } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Link as RouterLink } from "react-router-dom";
import { site, footerNav } from "../../config/siteConfig";
import { resolveCta } from "../../config/cta";
import { trackCta } from "../../utils/analytics";

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
        {/* Brand + contact block */}
        <Box sx={{ mb: 6, maxWidth: 420 }}>
          <Typography variant="h6" component="p" sx={{ fontWeight: "bold", mb: 1 }}>
            {site.brand}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {site.description}
          </Typography>
          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              {site.address.formatted}
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
              href={resolveCta("call", { placement: "footer" }).to}
              variant="body2"
              color="text.secondary"
              underline="hover"
              onClick={() =>
                trackCta({
                  type: "call",
                  placement: "footer",
                  to: resolveCta("call", { placement: "footer" }).to,
                  label: site.phone,
                })
              }
            >
              {site.phone}
            </Link>
            <Link
              href={resolveCta("whatsapp", { placement: "footer" }).to}
              variant="body2"
              color="text.secondary"
              underline="hover"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                const cta = resolveCta("whatsapp", { placement: "footer" });
                trackCta({
                  type: "whatsapp",
                  placement: "footer",
                  to: cta.to,
                  label: cta.label,
                });
              }}
            >
              WhatsApp
            </Link>
          </Stack>
        </Box>

        {/* Service-line link columns */}
        <Typography variant="h2" sx={visuallyHidden}>
          Footer navigation
        </Typography>
        <Grid container spacing={4}>
          {footerNav.map((group) => (
            <Grid item xs={6} md={3} key={group.heading}>
              <Box component="nav" aria-label={group.heading}>
                <Typography
                  variant="subtitle2"
                  component="p"
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
                      sx={{ display: "block" }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              </Box>
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
