import { AppBar, Toolbar, Typography, Box, IconButton, Button } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import RightFullPageDrawer from "./RightFullPageDrawer";
import NavLinks from "./NavLinks";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import logo from "../assets/logo2-nav.png";
import { navGroups, site } from "../config/siteConfig";
import { LABELS, resolveCta } from "../config/cta";
import { trackCta } from "../utils/analytics";
import WhatsAppIcon from "./common/WhatsAppIcon";
import { WHATSAPP } from "./common/whatsappButtonSx";
import CtaButton from "./common/CtaButton";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const call = resolveCta("call", { placement: "header" });
  const whatsapp = resolveCta("whatsapp", { placement: "header" });
  const book = resolveCta("book", { placement: "header" });

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleNavLinkClick = () => {
    handleDrawerClose();
  };

  const trackHeader = (cta) => () =>
    trackCta({
      type: cta.type,
      placement: "header",
      to: cta.to,
      label: cta.label,
    });

  return (
    <>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Box
            component={RouterLink}
            to="/"
            aria-label={`${site.brand} home`}
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              minWidth: 0,
              gap: 0.5,
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            <img
              src={logo}
              alt={`${site.brand} logo`}
              width={28}
              height={24}
              style={{
                height: 24,
                width: "auto",
                display: "block",
              }}
            />
            <Typography
              variant="h6"
              component="span"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {site.brand}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              ml: "auto",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <IconButton
              href={call.to}
              onClick={trackHeader(call)}
              color="primary"
              aria-label={`${LABELS.call} at ${site.phone}`}
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              <PhoneIcon />
            </IconButton>
            <IconButton
              href={whatsapp.to}
              onClick={trackHeader(whatsapp)}
              aria-label={LABELS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: { xs: "none", md: "inline-flex" }, color: WHATSAPP.green }}
            >
              <WhatsAppIcon />
            </IconButton>
            <Button
              href={book.to}
              onClick={trackHeader(book)}
              variant="contained"
              color="primary"
              size="small"
              startIcon={<EventAvailableIcon />}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={LABELS.book}
              sx={{
                display: { xs: "none", md: "inline-flex" },
                py: 0.5,
                px: 1.75,
                fontSize: "0.875rem",
                whiteSpace: "nowrap",
              }}
            >
              {LABELS.book}
            </Button>
            <IconButton
              color="primary"
              aria-label="open menu"
              edge="end"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <RightFullPageDrawer
        open={drawerOpen}
        drawerClose={handleDrawerClose}
        drawerTitle="Menu"
        allowOverflow={true}
        footer={
          <CtaButton
            type="book"
            placement="nav_drawer"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            startIcon={<EventAvailableIcon />}
            onClick={handleDrawerClose}
          />
        }
      >
        <NavLinks
          groups={navGroups}
          handleNavLinkClick={handleNavLinkClick}
        />
      </RightFullPageDrawer>

      <Toolbar />
    </>
  );
}

export default Navbar;
