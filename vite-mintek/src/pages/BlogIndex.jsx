import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Seo from "../components/seo/Seo";
import Breadcrumbs from "../components/common/Breadcrumbs";
import CTASection from "../components/common/CTASection";
import { BreadcrumbSchema, BlogListSchema } from "../components/seo/StructuredData";
import { orderedPosts, allTags } from "../config/blog";
import { site } from "../config/siteConfig";
import { formatPostDate } from "../utils/blogFormat";

const breadcrumbItems = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

const BlogIndex = () => {
  const [activeTag, setActiveTag] = useState(null);

  const visiblePosts = activeTag
    ? orderedPosts.filter((post) => post.tags.includes(activeTag))
    : orderedPosts;

  return (
    <>
      <Seo
        title={`Blog | ${site.brand}`}
        description="Practical guides on custom software, business automation and websites for small and growing businesses in the Greater Toronto Area."
        path="/blog"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <BlogListSchema posts={orderedPosts} />

      <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 4, md: 6 } }}>
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "2.25rem", md: "3rem" } }}
          >
            Blog
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            sx={{ maxWidth: 700 }}
          >
            Practical guides on custom software, automation and websites, written
            for growing businesses across Brampton and the Greater Toronto Area.
          </Typography>

          {allTags.length > 0 && (
            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 4 }}
              flexWrap="wrap"
              useFlexGap
            >
              <Chip
                label="All"
                color={activeTag === null ? "primary" : "default"}
                variant={activeTag === null ? "filled" : "outlined"}
                onClick={() => setActiveTag(null)}
              />
              {allTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  color={activeTag === tag ? "primary" : "default"}
                  variant={activeTag === tag ? "filled" : "outlined"}
                  onClick={() => setActiveTag(tag)}
                />
              ))}
            </Stack>
          )}
        </Container>
      </Box>

      <Container sx={{ pb: { xs: 6, md: 10 } }}>
        {visiblePosts.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No posts yet. Check back soon.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {visiblePosts.map((post) => (
              <Grid item xs={12} md={4} key={post.slug}>
                <Card sx={{ height: "100%" }}>
                  <CardActionArea
                    component={RouterLink}
                    to={`/blog/${post.slug}`}
                    sx={{ height: "100%" }}
                  >
                    <CardContent
                      sx={{
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      <Box sx={{ mb: "auto" }}>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ mb: 1.5 }}
                          flexWrap="wrap"
                          useFlexGap
                        >
                          {post.category && (
                            <Chip
                              label={post.category}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          )}
                          {post.featured && (
                            <Chip label="Featured" size="small" color="secondary" />
                          )}
                        </Stack>
                        <Typography variant="overline" color="text.secondary">
                          {formatPostDate(post.date)} &middot; {post.readingTime} min
                          read
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                          {post.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ mb: 3 }}
                        >
                          {post.metaDescription}
                        </Typography>
                      </Box>
                      {post.tags.length > 0 && (
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {post.tags.slice(0, 3).map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              variant="outlined"
                              color="secondary"
                            />
                          ))}
                        </Stack>
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <CTASection
        title="Have a project in mind?"
        subtitle="Tell us what you're trying to improve and we'll suggest an approach."
      />
    </>
  );
};

export default BlogIndex;
