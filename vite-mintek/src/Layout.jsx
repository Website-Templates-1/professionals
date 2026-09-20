import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import theme from "./theme/theme";
import Navbar from "./components/Navbar";
import Footer from "./components/footer-section/Footer";
import ScrollToTop from "./components/ScrollToTop";
import MobileCtaBar from "./components/common/MobileCtaBar";
import { MOBILE_CTA_BAR_HEIGHT } from "./config/cta";
import {
  OrganizationSchema,
  WebSiteSchema,
  LocalBusinessSchema,
} from "./components/seo/StructuredData";

// Root layout: providers + persistent chrome (navbar/footer) + site-wide schema.
const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OrganizationSchema />
      <WebSiteSchema />
      <LocalBusinessSchema />
      <ScrollToTop />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          pb: {
            xs: `calc(${MOBILE_CTA_BAR_HEIGHT}px + env(safe-area-inset-bottom))`,
            md: 0,
          },
        }}
      >
        <Navbar />
        <Box component="main" sx={{ flex: 1 }}>
          <Suspense fallback={<Box sx={{ minHeight: "60vh" }} />}>
            <Outlet />
          </Suspense>
        </Box>
        <Footer />
      </Box>
      <MobileCtaBar />
    </ThemeProvider>
  );
};

export default Layout;
