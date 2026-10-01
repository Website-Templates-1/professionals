import { Box, Typography } from "@mui/material";

const ServiceSection = ({ id, overline, title, children }) => (
  <Box id={id} sx={{ mb: 6, scrollMarginTop: { xs: 88, md: 96 } }}>
    {overline && (
      <Typography variant="overline" sx={{ color: "primary.main" }}>
        {overline}
      </Typography>
    )}
    <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

export default ServiceSection;
