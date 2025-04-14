import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        py: 6,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          © 2025 Mintek Software. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
