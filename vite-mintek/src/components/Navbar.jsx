import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import RightFullPageDrawer from "./RightFullPageDrawer";
import NavLinks from "./NavLinks";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo2.png";
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
            <Box
              component="img"
              src={logo}
              alt={`${site.brand} logo`}
              sx={{
                height: 24,
                width: "auto",
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
