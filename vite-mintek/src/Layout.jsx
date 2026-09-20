import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import theme from "./theme/theme";
import Navbar from "./components/Navbar";
import Footer from "./components/footer-section/Footer";
import ScrollToTop from "./components/ScrollToTop";
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
    </ThemeProvider>
  );
};

export default Layout;
