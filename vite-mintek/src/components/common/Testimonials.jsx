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
  Rating,
  Avatar,
} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import StarIcon from "@mui/icons-material/Star";
import { Link as RouterLink } from "react-router-dom";
import { getTestimonials, googleReviews } from "../../config/siteConfig";

const kindLabel = {
  client: "Client",
  partner: "Partner",
  user: "User",
  sample: "Sample",
};

const initials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

const TestimonialCard = ({ item }) => {
  return (
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <FormatQuoteIcon color="primary" sx={{ fontSize: 32, opacity: 0.5 }} />
          {typeof item.rating === "number" && (
            <Rating
              value={item.rating}
              precision={0.5}
              readOnly
              size="small"
              emptyIcon={<StarIcon style={{ opacity: 0.3 }} fontSize="inherit" />}
              aria-label={`${item.rating} out of 5 stars`}
            />
          )}
        </Stack>
        <Typography variant="body1" sx={{ lineHeight: 1.65, mb: 3 }}>
          &ldquo;{item.quote}&rdquo;
        </Typography>
        <Box sx={{ mt: "auto" }}>
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <Avatar
              src={item.photo || undefined}
              alt={item.name}
              imgProps={{ referrerPolicy: "no-referrer", loading: "lazy" }}
              sx={{ width: 40, height: 40, bgcolor: "primary.main", fontSize: 14 }}
            >
              {initials(item.name)}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              {/* Name + role are hidden on mobile to reduce density; the
                  business name alone carries the attribution there. */}
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <Typography variant="subtitle2">{item.name}</Typography>
                {item.kind && kindLabel[item.kind] && (
                  <Chip
                    label={kindLabel[item.kind]}
                    size="small"
                    color={item.kind === "sample" ? "warning" : "primary"}
                    variant="outlined"
                  />
                )}
              </Stack>
              {(item.role || item.business) && (
                <Typography variant="body2" color="text.secondary">
                  {item.role && (
                    <Box
                      component="span"
                      sx={{ display: { xs: "none", sm: "inline" } }}
                    >
                      {item.business ? `${item.role}, ` : item.role}
                    </Box>
                  )}
                  {item.business}
                </Typography>
              )}
            </Box>
          </Stack>
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
};

// Renders real reviews. Shows nothing when there are none, so production stays
// free of placeholder or fabricated content. Reviews sourced from Google are
// shown with Google attribution and a link to the business's Google reviews.
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

  const fromGoogle = items.some((item) => item.source === "Google");
  // An aggregate like "5.0 · 1 Google review" reads as weak social proof. Only
  // show the summary strip once there are enough reviews to stand on; below that
  // the individual named cards (each with its own rating) carry the proof.
  const MIN_AGGREGATE_REVIEWS = 3;
  const showAggregate =
    fromGoogle &&
    typeof googleReviews.count === "number" &&
    googleReviews.count >= MIN_AGGREGATE_REVIEWS;
  const md = Math.max(1, Math.floor(12 / Math.min(columns, items.length || 1)));

  const content = (
    <>
      {title && (
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: subtitle ? 1 : 2, textAlign: "center" }}
        >
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 2, textAlign: "center", maxWidth: 680, mx: "auto" }}
        >
          {subtitle}
        </Typography>
      )}
      {showAggregate && (
        <Stack spacing={1} alignItems="center" sx={{ mb: { xs: 5, md: 6 } }}>
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
            sx={{ columnGap: 1, rowGap: 0.5 }}
          >
            {typeof googleReviews.rating === "number" && (
              <Stack direction="row" spacing={0.75} alignItems="center">
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {googleReviews.rating.toFixed(1)}
                </Typography>
                <Rating
                  value={googleReviews.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                />
              </Stack>
            )}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ whiteSpace: "nowrap" }}
            >
              {googleReviews.count
                ? `${googleReviews.count} Google review${googleReviews.count === 1 ? "" : "s"}`
                : "Reviews from Google"}
            </Typography>
          </Stack>
        </Stack>
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
