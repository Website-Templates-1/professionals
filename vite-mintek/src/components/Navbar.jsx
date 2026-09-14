import { AppBar, Toolbar, Typography, Box, IconButton, Button, Stack } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import RightFullPageDrawer from "./RightFullPageDrawer";
import NavLinks from "./NavLinks";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import logo from "../assets/logo2-nav.png";
import { navGroups, site } from "../config/siteConfig";

const telHref = `tel:${site.phone.replace(/[^+\d]/g, "")}`;

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleNavLinkClick = () => {
    handleDrawerClose();
  };

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
            <Button
              href={telHref}
              variant="contained"
              color="primary"
              size="small"
              startIcon={<PhoneIcon />}
              aria-label={`Call us at ${site.phone}`}
              sx={{
                py: 0.5,
                px: 1.75,
                fontSize: "0.875rem",
                whiteSpace: "nowrap",
              }}
            >
              Call us
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
          <Stack spacing={1.5}>
            <Button
              href={telHref}
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={<PhoneIcon />}
              aria-label={`Call us at ${site.phone}`}
            >
              Call us
            </Button>
            <Button
              component={RouterLink}
              to="/contact"
              variant="outlined"
              color="primary"
              fullWidth
              size="large"
              startIcon={<EventAvailableIcon />}
              onClick={handleDrawerClose}
            >
              Free consult
            </Button>
          </Stack>
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
