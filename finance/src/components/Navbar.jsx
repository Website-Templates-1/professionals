import React from "react";
import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, Typography, Button, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Call } from "@mui/icons-material";

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const NavbarLargeHeading = styled(Typography)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));

const NavbarSmallHeading = styled(Typography)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const StyledList = styled(List)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
}));

const CallButton = styled(Button)(({ theme }) => ({
  display: "flex",
}));

const Navbar = () => {
  return (
    <AppBar position="fixed" color="transparent">
      <StyledToolBar>
        <NavbarLargeHeading variant="h6">Financial Services</NavbarLargeHeading>
        <NavbarSmallHeading variant="h6">Finance</NavbarSmallHeading>
        
        <StyledList>
            <ListItem disablePadding>
                <ListItemButton>
                  <Typography variant="button">Home</Typography>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                  <Typography variant="button">Services</Typography>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                  <Typography variant="button">About</Typography>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                  <Typography variant="button">Testimonials</Typography>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                  <Typography variant="button">Clients</Typography>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                  <Typography variant="button">Contact</Typography>
                </ListItemButton>
            </ListItem>
        </StyledList>

        <CallButton>
          <Button
            size="medium"
            variant="contained"
            startIcon={<Call />}
            sx={{ borderRadius: 8 }}
          >
          <Typography variant="button">Call Now</Typography>
          </Button>
        </CallButton>
      </StyledToolBar>
    </AppBar>
  );
};

export default Navbar;
