import { AppBar, Toolbar, Typography, Box, IconButton, Button } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import RightFullPageDrawer from "./RightFullPageDrawer";
import NavLinks from "./NavLinks";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo2-nav.png";
import { navGroups, site } from "../config/siteConfig";

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
              }}
            >
              {site.brand}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              ml: "auto",
              alignItems: "center",
            }}
          >
            <IconButton
              color="primary"
              aria-label="open drawer"
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
          <Button
            component={RouterLink}
            to="/contact"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleDrawerClose}
          >
            Request a consultation
          </Button>
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
