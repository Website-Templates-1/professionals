import {
  Box,
  Container,
  Typography,
  Stack,
  Chip,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Paper,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Seo from "../components/seo/Seo";
import Breadcrumbs from "../components/common/Breadcrumbs";
import CTASection from "../components/common/CTASection";
import RelatedContent from "../components/common/RelatedContent";
import { BreadcrumbSchema } from "../components/seo/StructuredData";
import { Head } from "vite-react-ssg";
import { site, canonical, absoluteUrl } from "../config/siteConfig";
import stats from "../content/research/brampton-2026-stats";
import {
  Histogram,
  IndustryBars,
  ScatterPlot,
  SignalBars,
} from "../components/research/researchCharts";

const PATH = "/research/brampton-business-websites-2026";

const breadcrumbItems = [
  { name: "Home", path: "/" },
  { name: "Research", path: "/research" },
  { name: "Brampton business websites 2026", path: PATH },
];

const related = [
  {
    type: "Service",
    key: "s-wd",
    title: "Web design in Brampton",
    description: "Fast, mobile friendly marketing websites for Brampton businesses.",
    to: "/web-design-brampton",
  },
  {
    type: "Service",
    key: "s-seo",
    title: "Local SEO in the GTA",
    description: "On page and technical local search work for service businesses.",
    to: "/local-seo-gta",
  },
  {
    type: "Article",
    key: "a-slow",
    title: "Why are Brampton business websites so slow?",
    description: "What 76 mobile Lighthouse runs showed about LCP, page weight, and what to fix first.",
    to: "/blog/why-are-brampton-business-websites-so-slow",
  },
  {
    type: "Article",
    key: "a-weight",
    title: "How much does a Brampton business website actually need to load?",
    description: "Page weight, request count, and when video, animation, and widgets earn their keep.",
    to: "/blog/how-much-does-a-brampton-business-website-need-to-load",
  },
  {
    type: "Article",
    key: "a-call",
    title: "How many Brampton business websites make it easy to call?",
    description: "Click-to-call tel: links on 58 of 87 fetched homepages, and why a visible number is not the same thing.",
    to: "/blog/how-many-brampton-business-websites-make-it-easy-to-call",
  },
  {
    type: "Article",
    key: "a-form",
    title: "Do Brampton business websites actually have contact forms?",
    description: "A form element on 47 of 87 fetched homepages, and why that tag is not a working enquiry.",
    to: "/blog/do-brampton-business-websites-actually-have-contact-forms",
  },
  {
    type: "Article",
    key: "a-check",
    title: "Brampton small business website checklist",
    description: "A practical checklist for local marketing sites.",
    to: "/blog/brampton-small-business-website-checklist",
  },
  {
    type: "Article",
    key: "a-cost",
    title: "How much a business website costs in the GTA",
    description: "Pricing ranges for marketing websites, without ranking claims.",
    to: "/blog/how-much-does-a-business-website-cost-in-the-gta",
  },
  {
    type: "Article",
    key: "a-seo",
    title: "How local SEO works for GTA service businesses",
    description: "What local search actually involves for a service company.",
    to: "/blog/how-local-seo-works-for-gta-service-businesses",
  },
  {
    type: "Service",
    key: "s-dev",
    title: "Website development",
    description: "Engineering led websites built around performance and conversion.",
    to: "/website-development",
  },
];

const fmt = (s) => `${s.pct}% (${s.n} of ${s.d})`;

const StatCard = ({ value, label, denom, tone }) => (
  <Card
    component="article"
    sx={{
      height: "100%",
      boxShadow: "none",
      border: "1px solid",
      borderColor: "divider",
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Typography
        variant="h3"
        component="p"
        sx={{
          color: tone === "alert" ? "error.main" : "primary.main",
          mb: 1,
        }}
      >
        {value}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {denom}
      </Typography>
    </CardContent>
  </Card>
);

const ExampleLink = ({ href, children }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" underline="hover">
    {children}
  </Link>
);

const ResearchReportSchema = () => (
  <Head>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Report",
        name: "The State of Brampton Business Websites: 2026",
        headline: "The State of Brampton Business Websites: 2026",
        description:
          "An original measurement study of independently operated small and medium sized business websites serving Brampton, Ontario.",
        url: canonical(PATH),
        datePublished: "2026-09-11",
        dateModified: "2026-09-11",
        inLanguage: "en-CA",
        author: {
          "@type": "Organization",
          name: site.brand,
          url: site.domain,
        },
        publisher: {
          "@type": "Organization",
          name: site.brand,
          url: site.domain,
          logo: {
            "@type": "ImageObject",
            url: absoluteUrl(site.logo),
          },
        },
        about: [
          "Brampton business websites",
          "website performance",
          "local SEO",
          "PageSpeed Insights",
        ],
        spatialCoverage: {
          "@type": "City",
          name: "Brampton",
          containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" },
        },
      })}
    </script>
  </Head>
);

const BramptonBusinessWebsites2026 = () => {
  const { htmlSignals: sig, perf, lcp, page, corr, cms, industry, hist, examples } = stats;
  const chartIndustry = industry
    .filter((r) => r.reportMedian)
    .sort((a, b) => b.median - a.median);

  const signals = [
    { label: "HTTPS", ...sig.https },
    { label: "XML sitemap present", ...sig.sitemap },
    { label: "Brampton mentioned on homepage", ...sig.brampton },
    { label: "Primary CTA phrase", ...sig.cta },
    { label: "Click to call (tel: link)", ...sig.clickToCall },
    { label: "Any JSON LD / schema.org", ...sig.schema },
    { label: "Contact form element", ...sig.form },
    { label: "Service section links", ...sig.servicePages },
    { label: "LocalBusiness style schema", ...sig.localbiz },
    { label: "Review / testimonial pattern", ...sig.reviews },
  ];

  return (
    <>
      <Seo
        title={`The State of Brampton Business Websites: 2026 | ${site.brand}`}
        description="Original 2026 lab study of 93 independently operated Brampton business websites: mobile Lighthouse performance, LCP, local SEO signals, and conversion markup. Not a ranking study."
        path={PATH}
        type="article"
      >
        <meta property="article:published_time" content="2026-09-11" />
        <meta property="article:modified_time" content="2026-09-11" />
      </Seo>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ResearchReportSchema />

      <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 8, md: 10 }, bgcolor: "background.paper" }}>
        <Container maxWidth="md">
          <Breadcrumbs items={breadcrumbItems} />
          <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
            <Chip label="Research" color="primary" size="small" />
            <Chip label="Fieldwork 11 September 2026" variant="outlined" size="small" />
          </Stack>
          <Typography
            variant="h1"
            component="h1"
            sx={{ mb: 2 }}
          >
            The State of Brampton Business Websites: 2026
          </Typography>
          <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
            An original measurement study of independently operated small and
            medium sized business websites serving Brampton, Ontario.
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label={`${stats.sample} businesses in final sample`} />
            <Chip label={`${stats.html} HTML inspections`} />
            <Chip label={`${stats.scored} Lighthouse / PageSpeed runs`} />
          </Stack>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            Executive summary
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
            On 11 September 2026 we measured publicly accessible homepages for
            Brampton businesses discovered through Google Places searches across
            twelve industry groups. After quality control we removed national
            chains, a municipal facility, a dead domain, a national HVAC brand,
            and a listing whose listed website was a TikTok profile.{" "}
            <strong>{stats.sample}</strong> independently operated sites remained.
            We fetched HTML for <strong>{stats.html}</strong> of those homepages.
            Google PageSpeed Insights completed a mobile Lighthouse run for{" "}
            <strong>{stats.scored}</strong>.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
            Among scored homepages, median mobile Lighthouse performance was{" "}
            <strong>{perf.median}</strong>. Median Largest Contentful Paint was{" "}
            <strong>{lcp.median} seconds</strong>, and {fmt(lcp.over25)} exceeded
            Google’s 2.5 second “good” LCP threshold for that metric. Most fetched
            homepages used HTTPS and mentioned Brampton. LocalBusiness style
            structured data and click to call were less consistent.
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
            These are lab observations from one PSI mobile run per URL plus
            pattern matching on public HTML. They are not Google search rankings,
            not WCAG certification, and not a judgement of how well a company
            serves customers offline. Businesses were not contacted and did not
            participate in or endorse this study.
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
          <Container maxWidth="md" disableGutters sx={{ mb: 4 }}>
            <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
              Key findings
            </Typography>
            <Typography color="text.secondary">
              Each statistic shows its denominator. Performance metrics use scored
              homepages; HTML signals use successfully fetched homepages.
            </Typography>
          </Container>
          <Grid container spacing={2}>
            {[
              { value: String(perf.median), label: "Median mobile Lighthouse performance", denom: `${stats.scored} scored homepages` },
              { value: `${perf.below50.pct}%`, label: "Performance score below 50", denom: `${perf.below50.n} of ${perf.below50.d} scored` },
              { value: `${perf.above90.pct}%`, label: "Performance score 90 or above", denom: `${perf.above90.n} of ${perf.above90.d} scored` },
              { value: `${lcp.median}s`, label: "Median Largest Contentful Paint", denom: `${stats.scored} scored homepages`, tone: "alert" },
              { value: `${lcp.over25.pct}%`, label: "LCP slower than 2.5 seconds", denom: `${lcp.over25.n} of ${lcp.over25.d} scored`, tone: "alert" },
              { value: `${page.medianMb} MB`, label: "Median homepage transfer size", denom: `${stats.scored} scored homepages` },
              { value: String(page.medianRequests), label: "Median network requests", denom: `${stats.scored} scored homepages` },
              { value: `${sig.https.pct}%`, label: "HTTPS on fetched homepages", denom: `${sig.https.n} of ${sig.https.d} fetched` },
              { value: `${sig.localbiz.pct}%`, label: "LocalBusiness style structured data", denom: `${sig.localbiz.n} of ${sig.localbiz.d} fetched` },
              { value: `${sig.clickToCall.pct}%`, label: "Click to call (tel: link)", denom: `${sig.clickToCall.n} of ${sig.clickToCall.d} fetched` },
              { value: `${sig.form.pct}%`, label: "Homepage form element", denom: `${sig.form.n} of ${sig.form.d} fetched` },
              { value: `${sig.brampton.pct}%`, label: "Brampton mentioned on homepage", denom: `${sig.brampton.n} of ${sig.brampton.d} fetched` },
              { value: `${sig.sitemap.pct}%`, label: "XML sitemap responded", denom: `${sig.sitemap.n} of ${sig.sitemap.d} fetched` },
              { value: `${sig.robots.pct}%`, label: "robots.txt present", denom: `${sig.robots.n} of ${sig.robots.d} fetched` },
              { value: `${sig.reviews.pct}%`, label: "Review / testimonial pattern", denom: `${sig.reviews.n} of ${sig.reviews.d} fetched` },
              { value: String(stats.seo.median), label: "Median Lighthouse SEO score", denom: `${stats.scored} scored homepages` },
              { value: String(stats.a11y.median), label: "Median Lighthouse accessibility", denom: `${stats.scored} scored; automated checks only` },
            ].map((s) => (
              <Grid item xs={12} sm={6} md={4} key={s.label}>
                <StatCard {...s} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            The big finding: mobile LCP
          </Typography>
          <Card
            sx={{
              mb: 3,
              boxShadow: "none",
              border: "2px solid",
              borderColor: "error.main",
              bgcolor: "background.paper",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="overline" color="error.main">
                Lab measurement · one PSI mobile run
              </Typography>
              <Typography variant="h3" component="p" sx={{ my: 1 }}>
                Median LCP {lcp.median} seconds
              </Typography>
              <Typography variant="h6" component="p" color="text.secondary">
                {lcp.over25.n} of {lcp.over25.d} scored homepages ({lcp.over25.pct}%)
                exceeded Google’s 2.5 second “good” threshold for Largest
                Contentful Paint.
              </Typography>
            </CardContent>
          </Card>
          <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
            LCP is the time until the largest content element in the viewport
            finishes rendering. The 2.5 second threshold is Google’s published
            “good” lab or field guidance for that metric. This study used a single
            PageSpeed Insights API v5 run with <code>strategy=mobile</code> on 11
            September 2026. It is not Chrome User Experience Report field data,
            and it is not a statement that Google penalized these businesses.
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Median transferred homepage weight among scored sites was about{" "}
            {page.medianMb} MB, with a median of {page.medianRequests} network
            requests. Heavier pages in this sample tended to have lower
            performance scores (see Performance analysis).
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            Industry breakdown
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            Industry cells are often small. Medians with fewer than five scored
            homepages are labelled indicative and are omitted from the chart.
            These differences are descriptive. This dataset does not show that an
            industry causes faster or slower pages.
          </Typography>
          <IndustryBars
            rows={chartIndustry}
            caption={`Median mobile Lighthouse performance by industry. Source: PageSpeed Insights API v5, mobile, 11 September 2026. Only groups with at least 5 scored homepages. Sample median ${perf.median}.`}
          />
          <TableContainer component={Paper} elevation={0} sx={{ mt: 4, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
            <Table size="small" aria-label="Industry sample sizes and median Lighthouse performance">
              <TableHead>
                <TableRow>
                  <TableCell>Industry</TableCell>
                  <TableCell align="right">Sites</TableCell>
                  <TableCell align="right">Lighthouse n</TableCell>
                  <TableCell align="right">Median performance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {industry.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.n}</TableCell>
                    <TableCell align="right">{row.scored}</TableCell>
                    <TableCell align="right">
                      {row.indicative
                        ? `${row.median} (indicative)`
                        : row.median}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5 }}>
            Fitness independent site coverage collapsed after removing gym chains
            and a municipal facility, so that median is not used for comparison.
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            Homepage signals
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            Presence or absence from public HTML and robots/sitemap probes. Missing
            a given signal is recorded as absence. It is not coded as “bad SEO.”
          </Typography>
          <SignalBars
            items={signals}
            caption={`Share of ${stats.html} successfully fetched homepages. Fieldwork 11 September 2026.`}
          />
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            Performance analysis
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
            Distribution among {stats.scored} mobile PSI runs: minimum {perf.min},
            25th percentile {perf.p25}, median {perf.median}, 75th percentile{" "}
            {perf.p75}, maximum {perf.max}. Mean was {perf.mean}.
          </Typography>
          <Histogram
            bins={hist}
            caption={`Count of scored homepages by Lighthouse performance band. n = ${stats.scored}. PageSpeed Insights mobile, 11 September 2026.`}
          />
          <Typography color="text.secondary" sx={{ mt: 3, mb: 2, lineHeight: 1.8 }}>
            Across the {corr.n} scored sites with both metrics, Pearson correlation
            between performance score and page bytes was <strong>{corr.perfSize}</strong>
            , and between performance score and request count was{" "}
            <strong>{corr.perfReq}</strong>. Those are associations, not proof that
            bytes or requests cause the score.
          </Typography>
          <ScatterPlot
            points={stats.scatter}
            xLabel="Homepage transfer size (MB)"
            yLabel="Lighthouse performance"
            caption={`Each point is one scored homepage (n = ${corr.n}). Source: PSI total byte weight and performance category, 11 September 2026.`}
          />
          <Typography color="text.secondary" sx={{ mt: 3, lineHeight: 1.8 }}>
            Additional lab medians on scored homepages: FCP {stats.fcp.median}s;
            TBT {stats.tbt.median} ms; CLS {stats.cls.median} ({fmt(stats.cls.over01)}{" "}
            above 0.1). Median Lighthouse best practices score was {stats.bp.median}.
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            Local SEO analysis
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
            Observed strengths on fetched homepages included HTTPS (
            {fmt(sig.https)}), title tags ({fmt(sig.title)}), Brampton mentioned in
            text ({fmt(sig.brampton)}), and sitemaps that responded at a robots.txt
            or default URL ({fmt(sig.sitemap)}). robots.txt: {fmt(sig.robots)}.
            Canonical tags: {fmt(sig.canonical)}. Meta description: {fmt(sig.meta)}.
            An H1: {fmt(sig.h1)}.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
            JSON LD or other schema.org blocks were detected on {fmt(sig.schema)}.
            Types consistent with LocalBusiness, Organization, or common
            professional subtypes appeared on {fmt(sig.localbiz)}. Service section
            links: {fmt(sig.servicePages)}. Hours like language: {fmt(sig.hours)}.
            Address like patterns: {fmt(sig.address)}.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
            Median Lighthouse SEO category score was {stats.seo.median}. That lab
            category mostly reflects titles, robots, HTTPS, and crawl basics. It is
            not evidence of Google rankings.{" "}
            <Link component={RouterLink} to="/local-seo-gta" underline="hover">
              Local SEO for GTA service businesses
            </Link>{" "}
            is a separate service page if you want the implementation side.
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Absence of a particular item is not treated as automatically meaning
            the business has bad SEO.
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            Conversion analysis
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
            A listed primary CTA phrase (for example “call now”, “contact us”,
            “book now”) appeared on {fmt(sig.cta)}. Click to call{" "}
            <code>tel:</code> links: {fmt(sig.clickToCall)}. A <code>&lt;form&gt;</code>{" "}
            element: {fmt(sig.form)}. That may include newsletter or site search
            forms, not only enquiry forms. Booking related third party scripts or
            “book/schedule” language: {fmt(sig.booking)}. Homepage testimonial or
            review wording: {fmt(sig.reviews)}.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
            A restaurant reasonably needs a menu or order path; an accounting firm
            more often needs a consultation request. This study does not score
            businesses down for missing functionality that does not fit the model.
            What the <code>tel:</code> detection actually measured — and what it
            did not — is unpacked in{" "}
            <Link
              component={RouterLink}
              to="/blog/how-many-brampton-business-websites-make-it-easy-to-call"
              underline="hover"
            >
              How Many Brampton Business Websites Make It Easy to Call?
            </Link>
            . What the <code>&lt;form&gt;</code> detection measured — a tag, not a
            submitted enquiry — is unpacked in{" "}
            <Link
              component={RouterLink}
              to="/blog/do-brampton-business-websites-actually-have-contact-forms"
              underline="hover"
            >
              Do Brampton Business Websites Actually Have Contact Forms?
            </Link>
            .
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Among scored sites that we also fetched, those with a detected CTA
            phrase had median performance {stats.ctaPerf.with.median} (n=
            {stats.ctaPerf.with.n}); those without had median{" "}
            {stats.ctaPerf.without.median} (n={stats.ctaPerf.without.n}). That is
            not evidence that CTAs slow pages. Marketing widgets often travel with
            CTAs.
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            Technical analysis
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
            CMS detection is HTML pattern matching (<code>wp-content</code>,
            Shopify CDN hosts, Wix/Squarespace/Webflow markers). False positives
            and unidentified custom stacks are expected.
          </Typography>
          <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
            <Table size="small" aria-label="CMS signals on fetched homepages">
              <TableHead>
                <TableRow>
                  <TableCell>Signal</TableCell>
                  <TableCell align="right">Share of fetched homepages</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  ["WordPress", cms.wordpress],
                  ["Not identified / custom / opaque", cms.unidentified],
                  ["Shopify", cms.shopify],
                  ["GoDaddy builder", cms.godaddy],
                  ["Wix", cms.wix],
                  ["Squarespace", cms.squarespace],
                  ["Webflow", cms.webflow],
                ].map(([name, row]) => (
                  <TableRow key={name}>
                    <TableCell>{name}</TableCell>
                    <TableCell align="right">{fmt(row)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography color="text.secondary" sx={{ mt: 2, lineHeight: 1.8 }}>
            One homepage also matched a Hostinger website builder generator tag.
            HTTP/2 versus HTTP/3 was not reliably recorded. CDN detection from
            HTML is incomplete. Script signatures matching gtag/GA4 were common (
            {fmt(sig.ga4)}); treat that as “a matching script was detected,” not as
            proof of a well configured GA4 property. Google Tag Manager: {fmt(sig.gtm)}.
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            Interesting examples
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            Snapshots from 11 September 2026. These are measurements, not reviews
            of the businesses and not a ranking.
          </Typography>
          <Stack spacing={2}>
            {examples.high.map((ex) => (
              <Typography key={ex.url} color="text.secondary" sx={{ lineHeight: 1.7 }}>
                <ExampleLink href={ex.url}>{ex.name}</ExampleLink>
                {": "}
                Lighthouse performance {ex.perf}
                {ex.seo === 100 ? ", SEO 100" : ""}
                {typeof ex.a11y === "number" ? `, accessibility ${ex.a11y}` : ""}
                {ex.localbiz ? "; LocalBusiness style schema detected" : ""}.
              </Typography>
            ))}
            {examples.mixed.map((ex) => (
              <Typography key={ex.url} color="text.secondary" sx={{ lineHeight: 1.7 }}>
                <ExampleLink href={ex.url}>{ex.name}</ExampleLink>
                {": "}
                performance {ex.perf}, LCP {ex.lcp}s
                {ex.call && ex.form ? "; tel link and form present" : ""}.
              </Typography>
            ))}
            {examples.heavy.map((ex) => (
              <Typography key={ex.url} color="text.secondary" sx={{ lineHeight: 1.7 }}>
                <ExampleLink href={ex.url}>{ex.name}</ExampleLink>
                {": "}
                performance {ex.perf}
                {ex.mb != null ? `, about ${ex.mb} MB` : ""}
                {typeof ex.requests === "number" ? `, ${ex.requests} requests` : ""}
                {typeof ex.lcp === "number" ? `, LCP ${ex.lcp}s` : ""}.
              </Typography>
            ))}
          </Stack>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            Methodology
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
            Businesses were selected with the Google Places API (New) Text Search
            for <em>{"{category} in Brampton, ON"}</em>, requesting website, phone,
            address, rating, and Place ID. Existing directory leads for
            accountants, plumbers, and roofers were reused instead of repeating
            those searches. Keep rules before measurement: the formatted address
            contained “Brampton”; the listing was operational; the site was not
            Facebook, Instagram, Linktree, or Google’s free builders; hostnames
            were unique in the sample; names did not match a national QSR / big box
            denylist; per search caps prevented one category from dominating.
            Within each search, eligible businesses were ordered by Google review
            count, then the cap was applied. We did not sample only weak websites.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
            After measurement, quality control removed Planet Fitness, Fit4Less,
            Brampton YMCA, Indigo Brampton, Speedy Auto Service, Cassie Campbell
            Community Centre, Heal360 (DNS failure), Enercare, and a jewellery
            listing whose Places website was TikTok. Drawn listings with websites:
            102. Analysis sample: {stats.sample}. HTML succeeded: {stats.html} of{" "}
            {stats.sample}. PageSpeed succeeded: {stats.scored} of {stats.sample}.
            Remaining Lighthouse gaps ({stats.lighthouseMissing} sites) are{" "}
            <em>not available</em>: timeouts, 403 bot blocks, or document load
            failures. They were not imputed.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
            HTML inspection used GET on the homepage, <code>/robots.txt</code>, and
            a sitemap URL from robots or <code>/sitemap.xml</code>, with a research
            user agent. Performance used PageSpeed Insights API v5, mobile
            strategy, categories performance, accessibility, best practices, and
            SEO. One run per URL, not a median of three lab runs. PSI executes in
            Google’s infrastructure; HTML fetch ran from the researcher’s machine.
            No businesses were contacted. No forms were submitted. No accounts were
            created. No purchases were made.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
            Limitations: this is a convenience sample of businesses that appear in
            Places for the chosen queries, not a census. Businesses without
            websites were excluded by design. Industry cells are often small.
            Single PSI runs vary by day. Some WAFs return 403 to our crawler while
            still serving humans (and sometimes still serving PSI). Fitness
            coverage is too thin to compare. CMS, analytics, schema, and CTA
            detection can false positive or false negative. Correlation is not
            causation. Automated accessibility scores are not WCAG certification.
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            What a typical Brampton SMB website can learn
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
            These are implementation notes from what was common in the sample, not
            a list of things every website must have.
          </Typography>
          <Box component="ol" sx={{ pl: 3, m: 0, color: "text.secondary", lineHeight: 1.8 }}>
            <li>
              Reduce LCP: compress and size hero media; the median transfer was
              already about {page.medianMb} MB.
            </li>
            <li>
              Keep HTTPS and a viewport meta tag (already typical; missing viewport
              was {fmt(sig.viewportMissing)}).
            </li>
            <li>
              Add a <code>tel:</code> link if the business takes phone leads
              (missing on about one third of fetched homepages).
            </li>
            <li>
              Publish LocalBusiness or Organization JSON LD with name, address,
              telephone, and opening hours when those facts are public.
            </li>
            <li>
              Say “Brampton” and the service area on the homepage if that is
              accurate.
            </li>
            <li>
              Link to dedicated service pages when the business has more than one
              offer.
            </li>
            <li>
              Show hours and a small set of reviews when they exist and rights
              allow.
            </li>
            <li>
              Do not treat a high Lighthouse SEO category as “the site ranks.”
            </li>
          </Box>
          <Typography color="text.secondary" sx={{ mt: 2, lineHeight: 1.8 }}>
            For how we approach local marketing sites, see{" "}
            <Link component={RouterLink} to="/web-design-brampton" underline="hover">
              web design in Brampton
            </Link>
            ,{" "}
            <Link component={RouterLink} to="/small-business-website-design-brampton" underline="hover">
              small business website design
            </Link>
            , and the{" "}
            <Link component={RouterLink} to="/blog/brampton-small-business-website-checklist" underline="hover">
              Brampton small business website checklist
            </Link>
            .
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            Data
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
            The study was conducted from a structured research dataset built from
            public webpages and the Places API. We are not publishing the row level
            file: it includes Place IDs, phone numbers, and map URLs that are not
            needed to evaluate the findings. The statistics on this page were
            recalculated from the final quality controlled sample of {stats.sample}{" "}
            sites on the fieldwork date above.
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            Conclusion
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
            In this lab sample, Brampton SMB homepages usually had HTTPS, a title,
            and often a sitemap. They were “online enough” on paper. The strongest
            recurring measurable weaknesses were mobile Largest Contentful Paint
            and incomplete machine readable local business data.
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Those measurements describe website properties. They do not describe
            the quality of the businesses themselves.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pb: 2 }}>
        <RelatedContent items={related} title="Related reading" />
      </Container>

      <CTASection
        title="Want to know how your website compares?"
        subtitle="Mintek builds and maintains high performance websites for businesses in Brampton and the GTA. If you would like a technical look at your current site, get a website estimate. This study is independent research, not a review of any client."
        intent="website"
        placement="research_cta"
      />
    </>
  );
};

export default BramptonBusinessWebsites2026;
