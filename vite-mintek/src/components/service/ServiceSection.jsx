import { Box, Typography } from "@mui/material";

const ServiceSection = ({ id, overline, title, titleSx, children }) => (
  <Box id={id} sx={{ mb: 6, scrollMarginTop: { xs: 88, md: 96 } }}>
    {overline && (
      <Typography
        variant="overline"
        sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 2 }}
      >
        {overline}
      </Typography>
    )}
    <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", mb: 2, ...titleSx }}>
      {title}
    </Typography>
    {children}
  </Box>
);

export default ServiceSection;
