import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: { xs: 12, md: 24 },
        pb: { xs: 16, md: 32 },
        bgcolor: "background.paper",
        backgroundImage: `
        radial-gradient(#B4B2C5 1px, transparent 1px), 
        radial-gradient(#B4B2C5 1px, transparent 1px)
      `,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 20px 20px",
        backgroundRepeat: "repeat",
        "@keyframes moveDown": {
          "0%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(1000%)",
          },
        },
      }}
    >
      {/* Moving Lines */}
      {[...Array(3)].map((_, i) => (
        <Box
          key={`line-${i}`}
          sx={{
            position: "absolute",
            left: `${10 + i * 40}%`,
            width: "2px",
            height: "100px",
            background: "linear-gradient(180deg, #6C55F9 0%, transparent 100%)",
            animation: `moveDown ${3 + i / 2}s linear infinite`,
            opacity: 0.5,
          }}
        />
      ))}

      {/* Content Container */}
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 5,
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "text.primary",
            textAlign: "center",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100px",
              height: "4px",
              background:
                "linear-gradient(90deg, transparent, #6C55F9, transparent)",
            },
          }}
        >
          Join the MinTek family
        </Typography>
        <Typography
          variant="h5"
          component="h5"
          sx={{
            mb: 6,
            color: "text.secondary",
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
            zIndex: 5,
          }}
        >
          Transform your business with cutting-edge technology
        </Typography>
      </Container>

      {/* Scroll Prompt */}
      <Box
        sx={{
          position: "absolute",
          bottom: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          opacity: 0.7,
          transition: "opacity 0.2s ease-in-out",
          cursor: "pointer",
          "&:hover": {
            opacity: 1,
          },
          "@keyframes bounce": {
            "0%, 100%": {
              transform: "translateX(-50%) translateY(0)",
            },
            "50%": {
              transform: "translateX(-50%) translateY(10px)",
            },
          },
          animation: "bounce 2s ease-in-out infinite",
        }}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "0.9rem",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </Typography>
        <Box
          sx={{
            width: "24px",
            height: "40px",
            border: "2px solid",
            borderColor: "text.secondary",
            borderRadius: "12px",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "4px",
              height: "4px",
              backgroundColor: "text.secondary",
              borderRadius: "50%",
              animation: "scrollDot 1.5s ease-in-out infinite",
            },
            "@keyframes scrollDot": {
              "0%": {
                transform: "translate(-50%, 0)",
                opacity: 1,
              },
              "100%": {
                transform: "translate(-50%, 20px)",
                opacity: 0,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Hero;
