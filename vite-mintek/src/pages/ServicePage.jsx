import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Stack,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Seo from "../components/seo/Seo";
import Breadcrumbs from "../components/common/Breadcrumbs";
import CTASection from "../components/common/CTASection";
import Faq from "../components/common/Faq";
import Testimonials from "../components/common/Testimonials";
import RelatedContent from "../components/common/RelatedContent";
import {
  ServiceSchema,
  BreadcrumbSchema,
} from "../components/seo/StructuredData";
import {
  getService,
  getCaseStudy,
  getServiceFaqs,
  projectStages,
} from "../config/siteConfig";
import { getServiceRelated } from "../config/relatedContent";
import NotFound from "./NotFound";

// Which testimonial theme a service page should request.
const testimonialTagForService = (service) => {
  if (service.group === "data") return "automation";
  if (service.group === "website") return "website";
  if (service.group === "software") return "software";
  if (/web-design|restaurant/.test(service.slug)) return "website";
  if (/automation/.test(service.slug)) return "automation";
  return "software";
};

const Section = ({ overline, title, children }) => (
  <Box sx={{ mb: 6 }}>
    {overline && (
      <Typography
        variant="overline"
        sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 2 }}
      >
        {overline}
      </Typography>
    )}
    <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", mb: 2 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

const ServicePage = ({ slug }) => {
  const service = getService(slug);
  if (!service) return <NotFound />;

  const path = `/${service.slug}`;
  const contactPath = `/contact?service=${service.slug}`;
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path },
  ];
  const relatedStudies = (service.relatedCaseStudies || [])
    .map(getCaseStudy)
    .filter(Boolean);
  const relatedServices = (service.relatedServices || [])
    .map(getService)
    .filter((s) => s && !s.hidden);
  const faqs = getServiceFaqs(service.slug);
  const related = getServiceRelated(service.slug);

  return (
    <>
      <Seo
        title={service.metaTitle}
        description={service.metaDescription}
        path={path}
        noindex={!!service.hidden}
      />
      <ServiceSchema service={service} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Breadcrumbs items={breadcrumbItems} />
          <Typography
            variant="overline"
            sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 2 }}
          >
            {service.title}
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontWeight: "bold", mb: 3, fontSize: { xs: "2.25rem", md: "3rem" } }}
          >
            {service.hero}
          </Typography>
          <Typography variant="h6" component="p" color="text.secondary">
            {service.short}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pb: { xs: 4, md: 8 } }}>
        <Section overline="THE CHALLENGE" title="The problem we solve">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
            {service.problem}
          </Typography>
        </Section>

        <Section overline="OUR APPROACH" title="What we deliver">
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
            {service.solution}
          </Typography>
          {service.note && (
            <Box
              sx={{
                mt: 3,
                p: 2.5,
                borderRadius: 2,
                bgcolor: "background.default",
                border: "1px solid",
                borderColor: "divider",
                display: "flex",
                gap: 1.5,
                alignItems: "flex-start",
              }}
            >
              <InfoOutlinedIcon color="info" fontSize="small" sx={{ mt: 0.25 }} />
              <Typography variant="body2" color="text.secondary">
                {service.note}
              </Typography>
            </Box>
          )}
        </Section>

        {service.audiences?.length > 0 && (
          <Section
            overline="WHO THIS IS FOR"
            title="Brampton businesses we actually build for"
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              These are the local patterns we see, not invented industries. If
              your work looks like one of them, the site should be built around
              that job — not a generic template.
            </Typography>
            <Grid container spacing={2}>
              {service.audiences.map((item) => (
                <Grid item xs={12} sm={6} key={item.title}>
                  <Box
                    sx={{
                      p: 3,
                      height: "100%",
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "background.paper",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      {item.body}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Section>
        )}

        <Section overline="HOW WE WORK" title="Our process">
          <Grid container spacing={2}>
            {service.process.map((step, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="span"
                    aria-hidden="true"
                    sx={{ color: "primary.main", fontWeight: "bold", mb: 1, display: "block" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Section>

        {service.stages && (
          <Section overline="ENGAGEMENT" title="How projects are structured">
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              We work in clearly defined stages and quote fixed outcomes wherever
              possible, so you can start small and expand with confidence.
            </Typography>
            <Stack spacing={1.5}>
              {projectStages.map((stage, index) => (
                <Box
                  key={stage.title}
                  sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
                >
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {stage.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stage.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Section>
        )}

        <Section overline="TECHNOLOGY" title="Technologies we use">
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {service.tech.map((tech) => (
              <Chip key={tech} label={tech} variant="outlined" color="primary" />
            ))}
          </Stack>
        </Section>

        <Section overline="OUTCOME" title="What you can expect">
          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <CheckCircleOutlineIcon color="success" sx={{ mt: 0.5 }} />
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
              {service.outcome}
            </Typography>
          </Box>
        </Section>

        {service.localAreas && service.localAreas.length > 0 && (
          <Section overline="LOCAL COVERAGE" title="Areas we serve">
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              We're based in Brampton and work with businesses right across the
              city and its neighbourhoods, in person or online.
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {service.localAreas.map((area) => (
                <Chip key={area} label={area} variant="outlined" color="primary" />
              ))}
            </Stack>
          </Section>
        )}

        {service.pricing && (
          <Box
            sx={{
              mb: 6,
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 2 }}
            >
              PRICING
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1.5 }}>
              {service.pricing}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              We scope fixed-price stages wherever possible. Final quotes follow a
              short discovery call about your goals and requirements.
            </Typography>
            <Button
              component={RouterLink}
              to={contactPath}
              variant="contained"
              color="primary"
            >
              Request a quote
            </Button>
          </Box>
        )}

        {service.packages?.length > 0 && (
          <Section overline="COMPARE" title="Packages at a glance">
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              These bands match what we already publish in our GTA website cost
              guide. They are planning ranges, not a menu you order from without
              a conversation.
            </Typography>
            <Grid container spacing={2}>
              {service.packages.map((pkg) => (
                <Grid item xs={12} md={4} key={pkg.name}>
                  <Box
                    sx={{
                      p: 3,
                      height: "100%",
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "background.paper",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="overline" color="primary.main" sx={{ fontWeight: 600 }}>
                      {pkg.price}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      {pkg.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>
                      {pkg.fit}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      {pkg.includes}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Section>
        )}

        {(service.extraSections || []).map((block) => (
          <Section key={block.title} overline={block.overline} title={block.title}>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9, mb: block.links?.length ? 2 : 0 }}>
              {block.body}
            </Typography>
            {block.links?.length > 0 && (
              <Stack spacing={1}>
                {block.links.map((link) => (
                  <Typography
                    key={link.to}
                    component={RouterLink}
                    to={link.to}
                    variant="body2"
                    sx={{ color: "primary.main", fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Stack>
            )}
          </Section>
        ))}

        {relatedStudies.length > 0 && (
          <Section overline="PROOF" title="Named clients and published results">
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              These are real businesses, named. We only repeat outcomes already
              published on the case-study pages, and we do not invent
              testimonials or metrics. Where a public URL exists, you can open
              the live site.
            </Typography>
            <Grid container spacing={3}>
              {relatedStudies.map((study) => {
                const shownResults = (study.results || []).filter(Boolean);
                const shownMetrics = (study.metrics || []).filter((m) => m.value);
                return (
                  <Grid item xs={12} key={study.slug}>
                    <Card>
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="overline" color="text.secondary">
                          {study.client} · {study.label} · {study.year}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                          {study.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
                          {study.shortDescription}
                        </Typography>
                        {shownMetrics.length > 0 && (
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                            {shownMetrics.map((metric) => (
                              <Chip
                                key={metric.label}
                                label={`${metric.value} ${metric.label}`}
                                color="primary"
                                variant="outlined"
                                size="small"
                              />
                            ))}
                          </Stack>
                        )}
                        {shownResults.length > 0 && (
                          <Stack spacing={1} sx={{ mb: 2 }}>
                            {shownResults.map((result) => (
                              <Box key={result} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                                <CheckCircleOutlineIcon color="success" fontSize="small" sx={{ mt: 0.25 }} />
                                <Typography variant="body2">{result}</Typography>
                              </Box>
                            ))}
                          </Stack>
                        )}
                        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                          <Button
                            component={RouterLink}
                            to={`/case-studies/${study.slug}`}
                            size="small"
                            variant="contained"
                          >
                            Read the case study
                          </Button>
                          {study.liveUrl && (
                            <Button
                              href={study.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="small"
                              variant="outlined"
                              endIcon={<OpenInNewIcon />}
                            >
                              View live site
                            </Button>
                          )}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Section>
        )}

        {relatedServices.length > 0 && (
          <Section overline="EXPLORE" title="Related services">
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {relatedServices.map((s) => (
                <Chip
                  key={s.slug}
                  label={s.anchorText || s.title}
                  component={RouterLink}
                  to={`/${s.slug}`}
                  clickable
                  variant="outlined"
                />
              ))}
            </Stack>
          </Section>
        )}
      </Container>

      {related.length > 0 && (
        <Container maxWidth="md" sx={{ pb: { xs: 4, md: 8 } }}>
          <RelatedContent items={related} />
        </Container>
      )}

      <Testimonials tag={testimonialTagForService(service)} limit={3} />

      <Faq items={faqs} />

      <CTASection
        title={`Let's talk about your ${service.title.toLowerCase()} project`}
        primaryTo={contactPath}
      />
    </>
  );
};

export default ServicePage;
