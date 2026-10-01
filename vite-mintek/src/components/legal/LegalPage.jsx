import { Box, Container, Typography, Stack } from "@mui/material";
import Seo from "../seo/Seo";
import Breadcrumbs from "../common/Breadcrumbs";
import { BreadcrumbSchema } from "../seo/StructuredData";
import { site } from "../../config/siteConfig";

// Shared layout for legal/policy pages (Privacy Policy, Terms of Service).
// Pages pass metadata plus a `sections` array of { heading, body } where body
// is any React node. Content is intentionally plain and readable; these pages
// stay indexable because Google requires a publicly reachable privacy policy.
const LegalPage = ({ title, description, path, lastUpdated, intro, sections }) => {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: title, path },
  ];

  return (
    <>
      <Seo title={`${title} | ${site.brand}`} description={description} path={path} />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Header */}
      <Box
        sx={{
          pt: { xs: 12, md: 16 },
          pb: { xs: 4, md: 6 },
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="md">
          <Breadcrumbs items={breadcrumbItems} />
          <Typography
            variant="h2"
            component="h1"
            sx={{ mb: 2 }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last updated: {lastUpdated}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
        {intro && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 5, lineHeight: 1.9 }}
          >
            {intro}
          </Typography>
        )}

        <Stack spacing={5}>
          {sections.map((section) => (
            <Box component="section" key={section.heading}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2 }}
              >
                {section.heading}
              </Typography>
              <Box
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.9,
                  "& p": { mb: 2 },
                  "& p:last-child": { mb: 0 },
                  "& ul": { pl: 3, mb: 2 },
                  "& li": { mb: 1 },
                  "& a": { color: "primary.main" },
                }}
              >
                {section.body}
              </Box>
            </Box>
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default LegalPage;
