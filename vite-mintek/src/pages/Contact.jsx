import { Box, Container, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import Seo from "../components/seo/Seo";
import Breadcrumbs from "../components/common/Breadcrumbs";
import ContactUs from "../components/contact-us-section/ContactUs";
import Testimonials from "../components/common/Testimonials";
import { BreadcrumbSchema } from "../components/seo/StructuredData";
import { site } from "../config/siteConfig";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const service = searchParams.get("service") || "";
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <Seo
        title={`Contact | ${site.brand}`}
        description="Get in touch with Mintek Software about custom software, website development or business automation. Based in Brampton, serving the Greater Toronto Area."
        path="/contact"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Box sx={{ pt: { xs: 12, md: 16 }, pb: 2 }}>
        <Container maxWidth="lg">
          <Breadcrumbs items={breadcrumbItems} />
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "2.25rem", md: "3rem" } }}
          >
            Contact Mintek Software
          </Typography>
          <Typography variant="h6" component="p" color="text.secondary" sx={{ maxWidth: 700 }}>
            Tell us about your project and we'll get back to you shortly. You can
            also email us directly at {site.email}.
          </Typography>
        </Container>
      </Box>

      <Testimonials limit={2} columns={2} title={null} />

      <ContactUs defaultService={service} />
    </>
  );
};

export default Contact;
