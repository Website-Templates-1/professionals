import React from "react";
import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Call } from "@mui/icons-material";

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const TypographyLarge = styled(Typography)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));

const TypographySmall = styled(Typography)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const CallButton = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const Navbar = () => {
  return (
    <AppBar position="fixed" color="transparent">
      <StyledToolBar>
        <TypographyLarge variant="h6">Financial Services</TypographyLarge>
        <TypographySmall variant="h6">Finance</TypographySmall>

        <CallButton>
          <Button
            size="medium"
            variant="contained"
            startIcon={<Call />}
            sx={{ borderRadius: 8 }}
          >
            Call Now
          </Button>
        </CallButton>
      </StyledToolBar>
    </AppBar>
  );
};

export default Navbar;
