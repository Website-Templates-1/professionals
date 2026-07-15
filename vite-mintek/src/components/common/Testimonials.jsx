import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  Link,
} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Link as RouterLink } from "react-router-dom";
import { getTestimonials } from "../../config/siteConfig";

const kindLabel = {
  client: "Client",
  partner: "Partner",
  user: "User",
  sample: "Sample",
};

const TestimonialCard = ({ item }) => (
  <Card
    sx={{
      height: "100%",
      borderRadius: 3,
      border: "1px solid",
      borderColor: "divider",
      bgcolor: "background.paper",
    }}
  >
    <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
      <FormatQuoteIcon color="primary" sx={{ fontSize: 32, mb: 1, opacity: 0.5 }} />
      <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
        &ldquo;{item.quote}&rdquo;
      </Typography>
      <Box sx={{ mt: "auto" }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            {item.name}
          </Typography>
          {item.kind && kindLabel[item.kind] && (
            <Chip
              label={kindLabel[item.kind]}
              size="small"
              color={item.kind === "sample" ? "warning" : "primary"}
              variant="outlined"
            />
          )}
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {[item.role, item.business].filter(Boolean).join(", ")}
        </Typography>
        {item.caseStudySlug && (
          <Link
            component={RouterLink}
            to={`/case-studies/${item.caseStudySlug}`}
            variant="body2"
            underline="hover"
            sx={{ display: "inline-block", mt: 1 }}
          >
            Read the case study
          </Link>
        )}
      </Box>
    </CardContent>
  </Card>
);

// Renders approved client testimonials. Shows nothing when there are none, so
// production stays free of placeholder or fabricated content until real,
// approved quotes are added to `testimonials` in siteConfig.
const Testimonials = ({
  tag,
  limit,
  title = "What our clients say",
  subtitle,
  disableGutters = false,
  columns = 3,
}) => {
  const items = getTestimonials({ tag, limit });
  if (!items.length) return null;

  const md = Math.max(1, Math.floor(12 / Math.min(columns, items.length || 1)));

  const content = (
    <>
      {title && (
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: "bold", mb: subtitle ? 1 : 4, textAlign: "center" }}
        >
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, textAlign: "center", maxWidth: 680, mx: "auto" }}
        >
          {subtitle}
        </Typography>
      )}
      <Grid container spacing={3} justifyContent="center">
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={md} key={item.id}>
            <TestimonialCard item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );

  if (disableGutters) return content;

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "background.default" }}>
      <Container>{content}</Container>
    </Box>
  );
};

export default Testimonials;
