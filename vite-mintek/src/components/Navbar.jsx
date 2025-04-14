import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RightFullPageDrawer from "./RightFullPageDrawer";
import NavLinks from "./NavLinks";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo2.png"; // Make sure to add the logo to your assets folder

function Navbar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Past Work", path: "/past-work" },
  ];

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleNavLinkClick = (path) => {
    navigate(path);
    handleDrawerClose();
  };

  return (
    <>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              gap: 0.5,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <Box
              component="img"
              src={logo}
              alt="Mintek Logo"
              sx={{
                height: 24,
                width: "auto",
              }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              Mintek Software
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
          linksToRender={menuItems}
          handleNavLinkClick={handleNavLinkClick}
        />
      </RightFullPageDrawer>

      <Toolbar />
    </>
  );
}

export default Navbar;
