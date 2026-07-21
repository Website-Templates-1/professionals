/* eslint-disable react-refresh/only-export-components */
import { Box, Typography, Link, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

// MUI-styled element map for react-markdown, matching the site's theme tokens.
// Post titles are rendered by the page header, so body headings start at h2.

const heading = (variant, component) => ({ children }) => (
  <Typography
    variant={variant}
    component={component}
    sx={{ fontWeight: "bold", mt: 5, mb: 2, scrollMarginTop: "96px" }}
  >
    {children}
  </Typography>
);

const MarkdownLink = ({ href = "", children }) => {
  const isInternal = href.startsWith("/");
  if (isInternal) {
    return (
      <Link component={RouterLink} to={href} color="primary" underline="hover">
        {children}
      </Link>
    );
  }
  return (
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
};

export const markdownComponents = {
  h1: heading("h4", "h2"),
  h2: heading("h4", "h2"),
  h3: heading("h5", "h3"),
  h4: heading("h6", "h4"),
  p: ({ children }) => (
    <Typography
      variant="body1"
      color="text.secondary"
      sx={{ lineHeight: 1.9, mb: 2.5 }}
    >
      {children}
    </Typography>
  ),
  a: MarkdownLink,
  ul: ({ children }) => (
    <Box
      component="ul"
      sx={{ pl: 3, mb: 2.5, color: "text.secondary", lineHeight: 1.9 }}
    >
      {children}
    </Box>
  ),
  ol: ({ children }) => (
    <Box
      component="ol"
      sx={{ pl: 3, mb: 2.5, color: "text.secondary", lineHeight: 1.9 }}
    >
      {children}
    </Box>
  ),
  li: ({ children }) => (
    <Typography component="li" variant="body1" sx={{ mb: 0.75 }}>
      {children}
    </Typography>
  ),
  blockquote: ({ children }) => (
    <Box
      sx={{
        my: 3,
        pl: 2.5,
        py: 0.5,
        borderLeft: "4px solid",
        borderColor: "primary.main",
        bgcolor: "background.default",
        borderRadius: 1,
        "& p": { mb: 0, fontStyle: "italic" },
      }}
    >
      {children}
    </Box>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = /language-/.test(className || "");
    if (isBlock) {
      return (
        <Box
          component="code"
          className={className}
          sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}
          {...props}
        >
          {children}
        </Box>
      );
    }
    return (
      <Box
        component="code"
        sx={{
          fontFamily: "monospace",
          fontSize: "0.85em",
          px: 0.75,
          py: 0.25,
          borderRadius: 1,
          bgcolor: "background.default",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {children}
      </Box>
    );
  },
  pre: ({ children }) => (
    <Box
      component="pre"
      sx={{
        my: 3,
        p: 2.5,
        borderRadius: 2,
        bgcolor: "#2D2B3A",
        color: "#F6F5FC",
        overflowX: "auto",
        fontSize: "0.875rem",
        lineHeight: 1.7,
        "& code": { bgcolor: "transparent", border: 0, p: 0, color: "inherit" },
      }}
    >
      {children}
    </Box>
  ),
  img: ({ src, alt }) => (
    <Box
      component="img"
      src={src}
      alt={alt || ""}
      loading="lazy"
      sx={{
        display: "block",
        maxWidth: "100%",
        height: "auto",
        borderRadius: 2,
        my: 3,
        mx: "auto",
      }}
    />
  ),
  hr: () => <Divider sx={{ my: 4 }} />,
  table: ({ children }) => (
    <Box sx={{ overflowX: "auto", my: 3 }}>
      <Box
        component="table"
        sx={{
          width: "100%",
          borderCollapse: "collapse",
          "& th, & td": {
            border: "1px solid",
            borderColor: "divider",
            p: 1.5,
            textAlign: "left",
          },
          "& th": { bgcolor: "background.default", fontWeight: 700 },
        }}
      >
        {children}
      </Box>
    </Box>
  ),
};
