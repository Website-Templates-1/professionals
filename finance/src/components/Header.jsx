import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LocalLibrary } from "@mui/icons-material";
import React from "react";

const StyledMainBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  height: "100vh",
  width: "auto",
  backgroundImage: `url("https://static.wixstatic.com/media/84770f_994ffe746a074d1f8a2ec9456a8bf1ff~mv2.png/v1/fill/w_1800,h_960,al_br,q_90,usm_0.66_1.00_0.01/84770f_994ffe746a074d1f8a2ec9456a8bf1ff~mv2.webp")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const StyledHeadBox = styled(Box)(({ theme }) => ({
  marginLeft: "4rem",
  marginTop: "10rem",
  width: 700,
  height: 200,
  display: "block",
  [theme.breakpoints.down("md")]: {
    width: 500,
    height: 150,
  },
  [theme.breakpoints.down("sm")]: {
    width: 300,
    height: 120,
  },
}));

const StyledButtonBox = styled(Box)(({ theme }) => ({
  marginLeft: "4rem",
  marginTop: "5rem",
}));

const Header = () => {
  return (
    <StyledMainBox>
      <StyledHeadBox>
        <Typography variant="h1">The Power of Good Advice</Typography>
        <Typography variant="body1">
          MintTech Software is GTA's most trusted corporation when it comes to
          your finances
        </Typography>
      </StyledHeadBox>
      <StyledButtonBox>
          <Button
            size="medium"
            variant="contained"
            startIcon={<LocalLibrary />}
            sx={{ borderRadius: 8, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <Typography variant="button">Learn More</Typography>
          </Button>
      </StyledButtonBox>
    </StyledMainBox>
  );
};

export default Header;
