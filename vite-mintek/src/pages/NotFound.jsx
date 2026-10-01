import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Seo from "../components/seo/Seo";

const NotFound = () => {
  return (
    <>
      <Seo title="Page not found | Mintek Software" path="/404" noindex />
      <Container maxWidth="md" sx={{ py: { xs: 16, md: 24 }, textAlign: "center" }}>
        <Box>
          <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
            404
          </Typography>
          <Typography variant="h5" component="p" color="text.secondary" sx={{ mb: 4 }}>
            The page you're looking for doesn't exist or has moved.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button component={RouterLink} to="/" variant="contained" size="large">
              Back to home
            </Button>
            <Button component={RouterLink} to="/case-studies" variant="outlined" size="large">
              View our work
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default NotFound;
