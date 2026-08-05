import {
  Box,
  Typography,
  Divider,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Chip,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

// "People also search for": a cross-type internal-linking grid used on blog
// posts and case studies. Items are pre-resolved and normalized by
// src/config/relatedContent.js to { type, key, title, description, to }.
//
// The whole card is a single RouterLink, so the crawlable anchor text is the
// descriptive title + summary (natural internal links, not exact-match). The
// heading is an h2 to keep one h1 per page. Renders nothing when empty.

const CHIP_COLOR = {
  Article: "secondary",
  "Case study": "primary",
  Service: "info",
};

const clampLines = (lines) => ({
  display: "-webkit-box",
  WebkitLineClamp: lines,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

const RelatedContent = ({
  items,
  title = "People also search for",
  divider = true,
}) => {
  if (!items || items.length === 0) return null;

  return (
    <Box component="section">
      {divider && <Divider sx={{ my: 5 }} />}
      <Typography variant="h5" component="h2" sx={{ fontWeight: "bold", mb: 3 }}>
        {title}
      </Typography>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={items.length > 1 ? 6 : 12} key={item.key}>
            <Card sx={{ height: "100%" }}>
              <CardActionArea
                component={RouterLink}
                to={item.to}
                sx={{ height: "100%" }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Chip
                    label={item.type}
                    size="small"
                    variant="outlined"
                    color={CHIP_COLOR[item.type] || "default"}
                    sx={{ mb: 1.5 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {item.title}
                  </Typography>
                  {item.description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={clampLines(3)}
                    >
                      {item.description}
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedContent;
