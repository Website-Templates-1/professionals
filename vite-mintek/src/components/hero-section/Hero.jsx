import { Box, Container, Typography, Button, Stack, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Hero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: { xs: 10, md: 24 },
        pb: { xs: 10, md: 28 },
        bgcolor: "background.paper",
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
      {/* Dot pattern background (faded toward the center so it never competes
          with the text, and lighter/sparser on mobile) */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `
            radial-gradient(#B4B2C5 1px, transparent 1px),
            radial-gradient(#B4B2C5 1px, transparent 1px)
          `,
          backgroundSize: { xs: "26px 26px", md: "22px 22px" },
          backgroundPosition: { xs: "0 0, 13px 13px", md: "0 0, 11px 11px" },
          opacity: { xs: 0.3, md: 0.55 },
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 45%, transparent 0%, #000 82%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 45%, transparent 0%, #000 82%)",
        }}
      />

      {/* Moving Lines (decorative, desktop only) */}
      {[...Array(3)].map((_, i) => (
        <Box
          key={`line-${i}`}
          aria-hidden
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            left: `${10 + i * 40}%`,
            width: "2px",
            height: "100px",
            background: "linear-gradient(180deg, #6C55F9 0%, transparent 100%)",
            animation: `moveDown ${3 + i / 2}s linear infinite`,
            opacity: 0.35,
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
            mb: { xs: 3.5, md: 3 },
            fontWeight: "bold",
            color: "text.primary",
            textAlign: "center",
            position: "relative",
            fontSize: { xs: "1.9rem", sm: "2.6rem", md: "3.5rem" },
            lineHeight: { xs: 1.25, md: 1.167 },
            px: { xs: 1, md: 0 },
            "&::before": {
              content: '""',
              position: "absolute",
              bottom: { xs: "-14px", md: "-10px" },
              left: "50%",
              transform: "translateX(-50%)",
              width: { xs: "72px", md: "100px" },
              height: "4px",
              borderRadius: "2px",
              background:
                "linear-gradient(90deg, transparent, #6C55F9, transparent)",
            },
          }}
        >
          Custom Software and Business Automation for Growing Companies
        </Typography>
        <Typography
          variant="h5"
          component="p"
          sx={{
            mb: { xs: 4, md: 6 },
            color: "text.secondary",
            textAlign: "center",
            maxWidth: "760px",
            mx: "auto",
            px: { xs: 1, md: 0 },
            fontSize: { xs: "1rem", md: "1.5rem" },
            lineHeight: 1.6,
          }}
        >
          Mintek Software builds web applications, internal tools and automated
          workflows that reduce manual work and help businesses operate more
          efficiently. We also offer{" "}
          <Link
            component={RouterLink}
            to="/web-design-brampton"
            underline="hover"
            sx={{ fontWeight: 600 }}
          >
            web design in Brampton
          </Link>{" "}
          and high-performance business websites for companies across the
          Greater Toronto Area.
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ position: "relative", zIndex: 5, px: { xs: 2, sm: 0 } }}
        >
          <Button
            component={RouterLink}
            to="/contact?service=custom-software-development"
            variant="contained"
            size="large"
            color="primary"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Discuss Your Software Project
          </Button>
          <Button
            component={RouterLink}
            to="/contact?service=website-development"
            variant="outlined"
            size="large"
            color="primary"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Get a Website Estimate
          </Button>
        </Stack>
      </Container>

      {/* Scroll Prompt (desktop only) */}
      <Box
        sx={{
          position: "absolute",
          bottom: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
          display: { xs: "none", md: "flex" },
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
