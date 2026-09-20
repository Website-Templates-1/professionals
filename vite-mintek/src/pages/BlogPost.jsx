import {
  Box,
  Container,
  Typography,
  Stack,
  Chip,
  Divider,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Seo from "../components/seo/Seo";
import Breadcrumbs from "../components/common/Breadcrumbs";
import CTASection from "../components/common/CTASection";
import Faq from "../components/common/Faq";
import RelatedContent from "../components/common/RelatedContent";
import ScopeToolSection from "../components/service/ScopeToolSection";
import { BreadcrumbSchema, ArticleSchema } from "../components/seo/StructuredData";
import { markdownComponents } from "../components/blog/markdownComponents";
import { getPost } from "../config/blog";
import { getBlogRelated } from "../config/relatedContent";
import { formatPostDate } from "../utils/blogFormat";
import NotFound from "./NotFound";

// Slim Markdown map for FAQ answers: paragraphs, links and lists only. Kept
// separate from the article body map (which styles headings, tables, code) so
// answers stay compact inside the accordion. Links reuse the internal (client
// side RouterLink) vs external (new tab) rule used across the blog.
const FaqAnswerLink = ({ href = "", children }) =>
  href.startsWith("/") ? (
    <Link component={RouterLink} to={href} color="primary" underline="hover">
      {children}
    </Link>
  ) : (
    <Link
      href={href}
      color="primary"
      underline="hover"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );

const faqAnswerComponents = {
  p: ({ children }) => (
    <Typography
      variant="body1"
      color="text.secondary"
      sx={{ lineHeight: 1.8, mb: 1.5, "&:last-child": { mb: 0 } }}
    >
      {children}
    </Typography>
  ),
  a: FaqAnswerLink,
  ul: ({ children }) => (
    <Box
      component="ul"
      sx={{ pl: 3, mb: 1.5, color: "text.secondary", lineHeight: 1.8 }}
    >
      {children}
    </Box>
  ),
  ol: ({ children }) => (
    <Box
      component="ol"
      sx={{ pl: 3, mb: 1.5, color: "text.secondary", lineHeight: 1.8 }}
    >
      {children}
    </Box>
  ),
  li: ({ children }) => (
    <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
      {children}
    </Typography>
  ),
};

const renderFaqItems = (faqs) =>
  faqs.map((f) => ({
    q: f.q,
    a: (
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={faqAnswerComponents}>
        {f.a}
      </ReactMarkdown>
    ),
  }));

const BlogPost = ({ slug }) => {
  const post = getPost(slug);
  if (!post) return <NotFound />;

  const path = `/blog/${post.slug}`;
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path },
  ];
  const related = getBlogRelated(post.slug);

  return (
    <>
      <Seo
        title={`${post.title} | Mintek Software`}
        description={post.metaDescription}
        path={path}
        type="article"
        image={post.coverImage || undefined}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ArticleSchema post={post} />

      <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 4, md: 6 } }}>
        <Container maxWidth="md">
          <Breadcrumbs items={breadcrumbItems} />
          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} flexWrap="wrap" useFlexGap>
            {post.category && (
              <Chip label={post.category} size="small" color="primary" variant="outlined" />
            )}
            {post.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" color="secondary" />
            ))}
          </Stack>
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "2.25rem", md: "3rem" } }}
          >
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            By {post.author} &middot; {formatPostDate(post.date)}
            {" "}&middot; {post.readingTime} min read
            {post.updated && ` \u00b7 Updated ${formatPostDate(post.updated)}`}
          </Typography>
        </Container>
      </Box>

      {post.coverImage && (
        <Container maxWidth="md" sx={{ mb: { xs: 2, md: 4 } }}>
          <Box
            component="img"
            src={post.coverImage}
            alt={post.title}
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 3,
              display: "block",
            }}
          />
        </Container>
      )}

      <Container maxWidth="md" sx={{ pb: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            "& > :first-of-type": { mt: 0 },
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {post.content}
          </ReactMarkdown>
        </Box>

        {post.scopeTool && (
          <>
            <Divider sx={{ my: 5 }} />
            <ScopeToolSection slug={`blog/${post.slug}`} />
          </>
        )}

        {post.faqs.length > 0 && (
          <>
            <Divider sx={{ my: 5 }} />
            <Faq align="left" disableGutters items={renderFaqItems(post.faqs)} />
          </>
        )}

        <RelatedContent items={related} />
      </Container>

      <CTASection title="Ready to put these ideas to work?" intent="general" placement="blog_post_cta" />
    </>
  );
};

export default BlogPost;
