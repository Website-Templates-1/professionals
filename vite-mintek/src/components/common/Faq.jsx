import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Accessible FAQ accordion. Questions render as H3s and answers stay in the
// rendered DOM (prerendered by vite-react-ssg and crawlable), so the content is
// useful even before a visitor expands an item. MUI Accordion provides keyboard
// navigation and ARIA wiring out of the box. No FAQ JSON-LD by design (Google
// deprecated FAQ rich results); the value here is usefulness and conversion.
const Faq = ({
  items = [],
  title = "Frequently asked questions",
  subtitle,
  disableGutters = false,
}) => {
  if (!items.length) return null;

  const content = (
    <>
      {title && (
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: "bold", mb: subtitle ? 1 : 3, textAlign: "center" }}
        >
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, textAlign: "center", maxWidth: 680, mx: "auto" }}
        >
          {subtitle}
        </Typography>
      )}

      <Box sx={{ maxWidth: 820, mx: "auto" }}>
        {items.map((item, index) => (
          <Accordion
            key={item.q}
            disableGutters
            elevation={0}
            defaultExpanded={index === 0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              mb: 1.5,
              "&:before": { display: "none" },
              overflow: "hidden",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-${index}-content`}
              id={`faq-${index}-header`}
              sx={{
                "& .MuiAccordionSummary-content": { my: 1.5 },
              }}
            >
              <Typography
                variant="subtitle1"
                component="h3"
                sx={{ fontWeight: 600 }}
              >
                {item.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8 }}
              >
                {item.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );

  if (disableGutters) return content;

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">{content}</Container>
    </Box>
  );
};

export default Faq;
