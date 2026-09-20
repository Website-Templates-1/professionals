import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Stack,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Seo from "../components/seo/Seo";
import Breadcrumbs from "../components/common/Breadcrumbs";
import CTASection from "../components/common/CTASection";
import Faq from "../components/common/Faq";
import Testimonials from "../components/common/Testimonials";
import RelatedContent from "../components/common/RelatedContent";
import ServiceSection from "../components/service/ServiceSection";
import ProofStudies from "../components/service/ProofStudies";
import InlineCta from "../components/service/InlineCta";
import ServiceResearchTeaser from "../components/service/ServiceResearchTeaser";
import ScopeToolSection from "../components/service/ScopeToolSection";
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
import { resolveCta, serviceCtas } from "../config/cta";
import CtaButton from "../components/common/CtaButton";
import NotFound from "./NotFound";

const testimonialTagForService = (service) => {
  if (service.group === "data") return "automation";
  if (service.group === "website") return "website";
  if (service.group === "software") return "software";
  if (/web-design|restaurant/.test(service.slug)) return "website";
  if (/automation/.test(service.slug)) return "automation";
  return "software";
};

const cardSx = {
  p: 3,
  height: "100%",
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "background.paper",
};

const InfoCardGrid = ({ items, sm = 6 }) => (
  <Grid container spacing={2}>
    {items.map((item) => (
      <Grid item xs={12} sm={sm} key={item.title}>
        <Box sx={cardSx}>
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
);

const HeroCtas = ({ items, service, placement = "service_hero" }) => {
  if (!items?.length) return null;
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.5}
      sx={{ mt: 4 }}
    >
      {items.map((cta) => (
        <CtaButton
          key={cta.label || cta.type}
          type={cta.type}
          to={cta.to}
          label={cta.label}
          placement={placement}
          service={service}
          variant={cta.variant || "contained"}
          color="primary"
          size="large"
        />
      ))}
    </Stack>
  );
};

const ProblemSection = ({ service }) => (
  <ServiceSection overline="THE CHALLENGE" title="The problem we solve">
    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
      {service.problem}
    </Typography>
  </ServiceSection>
);

const ApproachSection = ({ service }) => (
  <ServiceSection overline="OUR APPROACH" title="What we deliver">
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
  </ServiceSection>
);

const AudiencesSection = ({ service }) => {
  if (!service.audiences?.length) return null;
  return (
    <ServiceSection
      overline="WHO THIS IS FOR"
      title={service.audiencesTitle || "Brampton businesses we actually build for"}
    >
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
        {service.audiencesIntro ||
          "These are the local patterns we see, not invented industries. If your work looks like one of them, the site should be built around that job — not a generic template."}
      </Typography>
      <InfoCardGrid items={service.audiences} />
    </ServiceSection>
  );
};

const ProcessSection = ({ service }) => (
  <ServiceSection overline="HOW WE WORK" title="Our process">
    <Grid container spacing={2}>
      {service.process.map((step, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Box sx={cardSx}>
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
  </ServiceSection>
);

const StagesSection = ({ service }) => {
  if (!service.stages) return null;
  return (
    <ServiceSection overline="ENGAGEMENT" title="How projects are structured">
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        We work in clearly defined stages and quote fixed outcomes wherever
        possible, so you can start small and expand with confidence.
      </Typography>
      <Stack spacing={1.5}>
        {projectStages.map((stage, index) => (
          <Box key={stage.title} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
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
    </ServiceSection>
  );
};

const TechSection = ({ service }) => {
  if (!service.tech?.length) return null;
  return (
    <ServiceSection overline="TECHNOLOGY" title="Technologies we use">
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {service.tech.map((tech) => (
          <Chip key={tech} label={tech} variant="outlined" color="primary" />
        ))}
      </Stack>
    </ServiceSection>
  );
};

const OutcomeSection = ({ service }) => (
  <ServiceSection overline="OUTCOME" title="What you can expect">
    <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
      <CheckCircleOutlineIcon color="success" sx={{ mt: 0.5 }} />
      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
        {service.outcome}
      </Typography>
    </Box>
  </ServiceSection>
);

const LocalAreasSection = ({ service }) => {
  if (!service.localAreas?.length) return null;
  return (
    <ServiceSection overline="LOCAL COVERAGE" title="Areas we serve">
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        We're based in Brampton and work with businesses right across the
        city and its neighbourhoods, in person or online.
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {service.localAreas.map((area) => (
          <Chip key={area} label={area} variant="outlined" color="primary" />
        ))}
      </Stack>
    </ServiceSection>
  );
};

const PricingSection = ({ service, intent }) => {
  if (!service.pricing) return null;
  const pricingCta = resolveCta(intent.pricingType, {
    service,
    placement: "service_pricing",
  });
  return (
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
      <Typography variant="body2" color="text.secondary" sx={{ mb: service.pricingDrivers?.length ? 2 : 3 }}>
        {service.pricingNote ||
          "We scope fixed-price stages wherever possible. Final quotes follow a short discovery call about your goals and requirements."}
      </Typography>
      {service.pricingDrivers?.length > 0 && (
        <Box component="ul" sx={{ mt: 0, mb: 3, pl: 2.5 }}>
          {service.pricingDrivers.map((item) => (
            <Typography
              key={item}
              component="li"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 0.75, lineHeight: 1.7 }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      )}
      <CtaButton
        type={intent.pricingType}
        to={pricingCta.to}
        label={service.pricingCtaLabel || pricingCta.label}
        placement="service_pricing"
        service={service}
        variant="contained"
        color="primary"
      />
    </Box>
  );
};

const PackagesSection = ({ service }) => {
  if (!service.packages?.length) return null;
  return (
    <ServiceSection overline="COMPARE" title="Packages at a glance">
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
        These bands match what we already publish in our GTA website cost
        guide. They are planning ranges, not a menu you order from without
        a conversation.
      </Typography>
      <Grid container spacing={2}>
        {service.packages.map((pkg) => (
          <Grid item xs={12} md={4} key={pkg.name}>
            <Box sx={{ ...cardSx, display: "flex", flexDirection: "column" }}>
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
    </ServiceSection>
  );
};

const ExtraSections = ({ service }) =>
  (service.extraSections || []).map((block) => (
    <ServiceSection key={block.title} overline={block.overline} title={block.title}>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ lineHeight: 1.9, mb: block.links?.length ? 2 : 0 }}
      >
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
              sx={{
                color: "primary.main",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {link.label}
            </Typography>
          ))}
        </Stack>
      )}
    </ServiceSection>
  ));

const RelatedServicesSection = ({ relatedServices }) => {
  if (!relatedServices.length) return null;
  return (
    <ServiceSection overline="EXPLORE" title="Related services">
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
    </ServiceSection>
  );
};

const DifferentiatorSection = ({ service }) => {
  if (!service.differentiators?.length) return null;
  return (
    <ServiceSection
      overline={service.differentiatorOverline || "WHY MINTEK"}
      title={service.differentiatorTitle || "Not just another web design company"}
    >
      {service.differentiatorIntro && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.9 }}>
          {service.differentiatorIntro}
        </Typography>
      )}
      <InfoCardGrid items={service.differentiators} />
    </ServiceSection>
  );
};

const CustomerOutcomesSection = ({ service }) => {
  if (!service.customerOutcomes?.length) return null;
  return (
    <ServiceSection
      overline={service.outcomesOverline || "OUTCOMES"}
      title={service.outcomesTitle || "What the website is for"}
    >
      {service.outcomesIntro && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
          {service.outcomesIntro}
        </Typography>
      )}
      <InfoCardGrid items={service.customerOutcomes} />
    </ServiceSection>
  );
};

const EnquiryStepsSection = ({ service }) => {
  if (!service.enquirySteps?.length) return null;
  return (
    <ServiceSection
      overline={service.enquiryOverline || "NEXT STEPS"}
      title={service.enquiryTitle || "What happens next"}
    >
      {service.enquiryIntro && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
          {service.enquiryIntro}
        </Typography>
      )}
      <Stack spacing={1.5}>
        {service.enquirySteps.map((step, index) => (
          <Box key={step.title || step} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
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
              {typeof step === "string" ? (
                <Typography variant="body2" color="text.secondary">
                  {step}
                </Typography>
              ) : (
                <>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.body}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        ))}
      </Stack>
    </ServiceSection>
  );
};

const ServicePage = ({ slug }) => {
  const service = getService(slug);
  if (!service) return <NotFound />;

  const commercial = service.layout === "commercial";
  const path = `/${service.slug}`;
  const intent = serviceCtas(service);
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
  const proofEarly = commercial && service.proofPlacement === "early";

  const heroCtas = (service.heroCtas || intent.hero).map((cta) =>
    cta.type
      ? { ...resolveCta(cta.type, { service, placement: "service_hero" }), ...cta }
      : cta
  );

  const proof = (
    <ProofStudies
      studies={relatedStudies}
      id={commercial ? "work" : undefined}
      overline={service.proofOverline}
      title={service.proofTitle}
      intro={service.proofIntro}
    />
  );

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

      <Box sx={{ pt: { xs: 3, md: 8 }, pb: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Breadcrumbs items={breadcrumbItems} sx={{ mb: { xs: 1.5, md: 3 } }} />
          <Typography
            variant="overline"
            sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 2 }}
          >
            {service.title}
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: { xs: 2, md: 3 },
              fontSize: { xs: "1.875rem", md: "3rem" },
              lineHeight: { xs: 1.2, md: 1.167 },
            }}
          >
            {service.hero}
          </Typography>
          <Typography variant="h6" component="p" color="text.secondary">
            {service.short}
          </Typography>
          <HeroCtas items={heroCtas} service={service} />
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pb: { xs: 4, md: 8 } }}>
        {commercial ? (
          <>
            {proofEarly && proof}
            {proofEarly && service.scopeTool && (
              <ScopeToolSection service={service} />
            )}
            <DifferentiatorSection service={service} />
            {service.inlineCtas?.afterWhy && (
              <InlineCta
                {...service.inlineCtas.afterWhy}
                placement="service_after_why"
                service={service}
              />
            )}
            <ProblemSection service={service} />
            <ApproachSection service={service} />
            <CustomerOutcomesSection service={service} />
            {!service.customerOutcomes?.length && <AudiencesSection service={service} />}
            <ProcessSection service={service} />
            <EnquiryStepsSection service={service} />
            {service.inlineCtas?.afterNext && (
              <InlineCta
                {...service.inlineCtas.afterNext}
                placement="service_after_next"
                service={service}
              />
            )}
            {!proofEarly && service.scopeTool && (
              <ScopeToolSection service={service} />
            )}
            <StagesSection service={service} />
            {!service.hideTech && <TechSection service={service} />}
            {!service.hideOutcome && <OutcomeSection service={service} />}
            <PricingSection service={service} intent={intent} />
            <PackagesSection service={service} />
            <ServiceResearchTeaser teaser={service.researchTeaser} />
            <ExtraSections service={service} />
            <LocalAreasSection service={service} />
            {!proofEarly && proof}
            <RelatedServicesSection relatedServices={relatedServices} />
          </>
        ) : (
          <>
            <ProblemSection service={service} />
            <ApproachSection service={service} />
            <AudiencesSection service={service} />
            <ProcessSection service={service} />
            {service.scopeTool && <ScopeToolSection service={service} />}
            <StagesSection service={service} />
            <TechSection service={service} />
            <OutcomeSection service={service} />
            <LocalAreasSection service={service} />
            <PricingSection service={service} intent={intent} />
            <PackagesSection service={service} />
            <ExtraSections service={service} />
            {proof}
            <RelatedServicesSection relatedServices={relatedServices} />
          </>
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
        title={
          service.ctaTitle || `Let's talk about your ${service.title.toLowerCase()} project`
        }
        subtitle={
          service.ctaSubtitle ||
          (intent.intent === "website"
            ? "Get a website estimate and we'll recommend a clear first version."
            : "Book a discovery call and we'll talk through what you need.")
        }
        intent={intent.intent}
        placement="service_footer_cta"
        service={service}
      />
    </>
  );
};

export default ServicePage;
