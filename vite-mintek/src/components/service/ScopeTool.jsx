import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SpaIcon from "@mui/icons-material/Spa";
import HandymanIcon from "@mui/icons-material/Handyman";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { trackEvent, trackCta, trackFormSubmit, trackLead } from "../../utils/analytics";
import { contactHrefs, hasChannel, whatsappPrefill } from "../../utils/contactHrefs";
import { site } from "../../config/siteConfig";
import { LABELS } from "../../config/cta";
import WhatsAppIcon from "../common/WhatsAppIcon";
import { whatsappContainedSx } from "../common/whatsappButtonSx";
import ScopeDesigns from "./ScopeDesigns";

// Existing enquiry backend (same one the main contact form posts to). Reused so
// scoped leads land in the same inbox, pre-qualified. Never put answers or
// personal details in URL params — everything goes in the POST body.
const EMAIL_SERVICE_URL = import.meta.env.VITE_EMAIL_SERVICE_URL;
const CONTACT_FORM_ID = import.meta.env.VITE_CONTACT_FORM_ID;

// The questions. Each option auto-advances on select, so the whole flow is just
// a couple of taps. `value` is what we store/report; `label` is what's shown;
// `icon` is a MUI icon component prefixed on the button.
const QUESTIONS = [
  {
    key: "businessType",
    title: "What kind of business do you run?",
    options: [
      { value: "salon", label: "Salon & wellness", icon: SpaIcon },
      { value: "trades", label: "Trades & home services", icon: HandymanIcon },
      { value: "restaurant", label: "Restaurant or food", icon: RestaurantIcon },
      { value: "clinic", label: "Clinic or practice", icon: MedicalServicesIcon },
      { value: "professional", label: "Professional services", icon: WorkOutlineIcon },
      { value: "other", label: "Something else", icon: MoreHorizIcon },
    ],
  },
  {
    key: "goal",
    title: "What should the site mainly do for you?",
    options: [
      { value: "calls", label: "Get calls & enquiries", icon: PhoneInTalkIcon },
      { value: "bookings", label: "Take bookings or a waitlist", icon: EventAvailableIcon },
      { value: "info", label: "Show menu, hours & directions", icon: MenuBookIcon },
      { value: "showcase", label: "Showcase your work", icon: PhotoLibraryIcon },
      { value: "sell", label: "Sell or take orders online", icon: StorefrontIcon },
    ],
  },
];

// Human-readable labels for the recap and the enquiry we hand to sales.
const labelFor = (key, value) => {
  const q = QUESTIONS.find((item) => item.key === key);
  return q?.options.find((o) => o.value === value)?.label || value;
};

// Fragments used to assemble the tailored "what the first version should focus
// on" sentence from their main goal. Kept in Mintek's plain voice.
const GOAL_PHRASES = {
  calls: "making it easy to call or send an enquiry",
  bookings: "letting people book or join a waitlist without the back-and-forth",
  info: "making your menu, hours and directions easy to find on a phone",
  showcase: "showing your past work so new customers trust you quickly",
  sell: "letting customers order and pay online",
};

// Map answers -> package band. Bands (index 0/1/2) come from the page's own
// published packages config, so the price ranges never drift from the site.
// Rules (highest wins):
//   default            -> Starter (0)
//   goal = bookings     -> Established (1)
//   goal = sell/orders  -> Custom / software (2)
const recommendBandIndex = (answers) => {
  let level = 0;
  if (answers.goal === "bookings") level = Math.max(level, 1);
  if (answers.goal === "sell") level = Math.max(level, 2);
  return level;
};

const whatsappPrefillFromAnswers = (answers) =>
  whatsappPrefill({
    helpWith: "a website",
    business: labelFor("businessType", answers.businessType).toLowerCase(),
    discuss: labelFor("goal", answers.goal).toLowerCase(),
  });

const optionButtonSx = {
  justifyContent: { xs: "center", sm: "flex-start" },
  alignItems: "center",
  flexDirection: { xs: "column", sm: "row" },
  textAlign: { xs: "center", sm: "left" },
  width: "100%",
  height: "100%",
  minHeight: { xs: 72, sm: 56 }, // thumb-reachable; 2-col on xs so the card stays short
  px: { xs: 1, sm: 2.5 },
  py: { xs: 1, sm: 1.5 },
  columnGap: { xs: 0, sm: 1.5 },
  rowGap: { xs: 0.5, sm: 0 },
  borderRadius: { xs: "12px", sm: 2 },
  borderColor: "divider",
  color: "text.primary",
  fontWeight: 600,
  fontSize: { xs: "0.8125rem", sm: "1rem" },
  lineHeight: 1.25,
  whiteSpace: "normal",
  bgcolor: "background.paper",
  transition: "border-color 0.15s ease, background-color 0.15s ease",
  "@media (prefers-reduced-motion: reduce)": { transition: "none" },
  "& .MuiButton-startIcon": { mr: 0, ml: 0 },
  "&:hover": { borderColor: "primary.main", bgcolor: "background.paper" },
  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: "primary.main",
    outlineOffset: 2,
  },
  '&[aria-pressed="true"]': {
    borderColor: "primary.main",
    bgcolor: "rgba(108, 85, 249, 0.08)",
  },
};

const inputSx = {
  width: "100%",
  p: 1.5,
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 1,
  fontFamily: "inherit",
  fontSize: "1rem",
  bgcolor: "white",
  "&:focus": {
    outline: "2px solid",
    outlineColor: "primary.main",
    outlineOffset: "-1px",
    borderColor: "primary.main",
  },
};

const labelSx = { display: "block", mb: 1, fontWeight: 600 };

// Progress indicator, one segment per question. `current` is the 0-based index
// of the active step (-1 on the intro screen, QUESTIONS.length on result/lead).
const Progress = ({ current }) => (
  <Box aria-hidden="true" sx={{ display: "flex", gap: 0.75, mb: { xs: 1.5, md: 3 } }}>
    {QUESTIONS.map((q, i) => (
      <Box
        key={q.key}
        sx={{
          height: { xs: 4, md: 6 },
          flex: 1,
          borderRadius: 3,
          bgcolor: i <= current ? "primary.main" : "rgba(108, 85, 249, 0.15)",
          transition: "background-color 0.2s ease",
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
      />
    ))}
  </Box>
);

const cardWrapSx = {
  p: { xs: 2, md: 4 },
  borderRadius: { xs: 2, md: 3 },
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "background.paper",
  scrollMarginTop: { xs: 88, md: 96 },
};

const ScopeTool = ({ bands = [], slug, contact }) => {
  // Screens: 0..N-1 (questions) -> "result" -> "lead". Opens straight on the
  // first question — no intro screen — to keep the flow to a couple of taps.
  const [screen, setScreen] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const headingRef = useRef(null);
  const cardRef = useRef(null);
  const shownBandRef = useRef(null);
  // The tool hydrates while still ~300px below the viewport, so the very first
  // focus() would scroll it into view and yank the page. Skip that initial
  // mount; only move focus on genuine, user-driven screen transitions.
  const didMountRef = useRef(false);

  // The interactive tool has scrolled into view and hydrated: that's a genuine
  // engagement signal, so fire tool_start once on mount.
  useEffect(() => {
    trackEvent("tool_start", { tool: "scope_your_site", service: slug });
  }, [slug]);

  // Move keyboard focus to the new screen's heading on each transition so
  // screen-reader and keyboard users follow the flow. `preventScroll` stops
  // focus itself from moving the page; we then pin the card to the top of the
  // viewport so every step (questions, result, lead, done, start over, back)
  // lands on the heading instead of wherever the previous, taller screen sat.
  useLayoutEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    if (headingRef.current) headingRef.current.focus({ preventScroll: true });
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, [screen]);

  const bandIndex = useMemo(() => recommendBandIndex(answers), [answers]);
  const band = bands[bandIndex] || bands[0];

  const selectOption = (stepIndex, value) => {
    const q = QUESTIONS[stepIndex];
    const next = { ...answers, [q.key]: value };
    setAnswers(next);
    trackEvent("step_completed", {
      tool: "scope_your_site",
      step_number: stepIndex + 1,
      step_key: q.key,
      value,
    });
    if (stepIndex < QUESTIONS.length - 1) {
      setScreen(stepIndex + 1);
    } else {
      setScreen("result");
    }
  };

  const goBack = () => {
    if (typeof screen === "number") setScreen(Math.max(0, screen - 1));
    else if (screen === "result") setScreen(QUESTIONS.length - 1);
    else if (screen === "lead") setScreen("result");
  };

  const startOver = () => {
    setAnswers({});
    setErrors({});
    shownBandRef.current = null;
    setScreen(0);
  };

  // Fire recommendation_shown once per distinct band the user reaches.
  useEffect(() => {
    if (screen === "result" && band && shownBandRef.current !== band.name) {
      shownBandRef.current = band.name;
      trackEvent("recommendation_shown", {
        tool: "scope_your_site",
        band: band.name,
        price: band.price,
        service: slug,
      });
    }
  }, [screen, band, slug]);

  const tailoredSentence = () => {
    const goal = GOAL_PHRASES[answers.goal];
    if (goal) return `Your first version focuses on ${goal}, and nothing you don't need yet.`;
    return "Your first version focuses on the one job that brings in customers, and nothing you don't need yet.";
  };

  const handleCloseSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  const handleLeadSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const phone = form.elements.phone.value.trim();
    const bestTime = form.elements.best_time.value;

    const nextErrors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!email && !phone) nextErrors.contact = "Please add a phone number or an email so we can reach you.";
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstKey = Object.keys(nextErrors)[0];
      const target = firstKey === "contact" ? form.elements.phone : form.elements[firstKey];
      if (target?.focus) target.focus();
      return;
    }
    setErrors({});

    if (!EMAIL_SERVICE_URL || !CONTACT_FORM_ID) {
      // Integration point: if the enquiry backend isn't configured, don't
      // silently swallow the lead — tell the user to reach out directly.
      console.error("Scope tool: enquiry backend not configured (VITE_EMAIL_SERVICE_URL / VITE_CONTACT_FORM_ID).");
      setSnackbar({
        open: true,
        message: "Something's not set up right on our end. Please email or call us directly and mention 'scope your site'.",
        severity: "error",
      });
      return;
    }

    // Structured, pre-qualified enquiry. All answers + the recommended band go
    // in the POST body only (fields object), never in the URL.
    const structuredFields = {
      source: "Scope your site tool",
      page: slug || "web-design-brampton",
      businessType: labelFor("businessType", answers.businessType),
      goal: labelFor("goal", answers.goal),
      recommendedBand: band?.name || "Unspecified",
      priceRange: band?.price || "Unspecified",
      phone: phone || "Not provided",
      bestTimeToCall: bestTime || "Not specified",
    };

    const message = [
      `Pre-qualified enquiry from the "Scope your site" tool.`,
      `Business type: ${structuredFields.businessType}`,
      `Main goal: ${structuredFields.goal}`,
      `Recommended band: ${structuredFields.recommendedBand} (${structuredFields.priceRange})`,
      phone ? `Phone: ${phone}` : null,
      `Best time to call: ${structuredFields.bestTimeToCall}`,
    ]
      .filter(Boolean)
      .join("\n");

    setIsLoading(true);
    try {
      const ctrl = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), 60000);
      let res;
      try {
        res = await fetch(`${EMAIL_SERVICE_URL}/v1/forms/${CONTACT_FORM_ID}/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: ctrl.signal,
          body: JSON.stringify({
            name,
            // Backend expects an email; fall back to a marker when phone-only so
            // the submission still carries the reachable phone in the body.
            email: email || "no-email-provided@scope-tool.mintek",
            message,
            fields: structuredFields,
            _gotcha: form.elements._gotcha?.value || "",
          }),
        });
      } finally {
        clearTimeout(timeout);
      }
      if (!res.ok) throw new Error(`Submit failed: ${res.status}`);

      trackEvent("lead_submitted", {
        tool: "scope_your_site",
        band: band?.name,
        service: slug,
        contact_method: email ? "email" : "phone",
      });
      // Also feed the site's existing lead metric so this path shows up in the
      // same funnel as the main contact form.
      trackFormSubmit({
        form: "scope_your_site",
        project_type: "Website development",
        band: band?.name,
        service: slug || "",
      });
      trackLead({ project_type: "Website development", band: band?.name, source: "scope_tool" });

      setScreen("done");
    } catch (error) {
      console.error("Scope tool submit failed:", error);
      setSnackbar({
        open: true,
        message: "Something went wrong. Please email or call us directly and we'll pick it up.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ---- Screen renderers -------------------------------------------------

  const renderQuestion = (stepIndex) => {
    const q = QUESTIONS[stepIndex];
    const selected = answers[q.key];
    const headingId = `scope-q-${q.key}`;
    return (
      <Box>
        <Progress current={stepIndex} />
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
          Step {stepIndex + 1} of {QUESTIONS.length}
        </Typography>
        <Typography
          ref={headingRef}
          tabIndex={-1}
          id={headingId}
          variant="h5"
          component="h3"
          sx={{
            fontWeight: "bold",
            mt: 0.5,
            mb: { xs: 1.5, md: 3 },
            outline: "none",
          }}
        >
          {q.title}
        </Typography>
        <Box
          role="group"
          aria-labelledby={headingId}
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: { xs: 1, md: 1.5 },
          }}
        >
          {q.options.map((opt, i) => {
            const Icon = opt.icon;
            const lastOdd = q.options.length % 2 === 1 && i === q.options.length - 1;
            return (
              <Button
                key={opt.value}
                variant="outlined"
                disableElevation
                aria-pressed={selected === opt.value}
                onClick={() => selectOption(stepIndex, opt.value)}
                startIcon={Icon ? <Icon sx={{ fontSize: { xs: 20, sm: 22 } }} color="action" /> : undefined}
                sx={[
                  optionButtonSx,
                  lastOdd && {
                    gridColumn: { xs: "1 / -1", sm: "auto" },
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    textAlign: "left",
                    minHeight: { xs: 48, sm: 56 },
                    px: { xs: 2, sm: 2.5 },
                  },
                ]}
              >
                {opt.label}
              </Button>
            );
          })}
        </Box>
        {stepIndex > 0 && (
          <Button
            onClick={goBack}
            startIcon={<ArrowBackIcon />}
            sx={{ mt: { xs: 1.5, md: 3 }, px: 0, color: "text.secondary" }}
          >
            Back
          </Button>
        )}
      </Box>
    );
  };

  const renderResult = () => {
    const showWhatsApp = hasChannel(contact, "whatsapp");
    const showSms = hasChannel(contact, "sms");
    const showDirect = showWhatsApp || showSms;
    const hrefs = contactHrefs(site.phone, { text: whatsappPrefillFromAnswers(answers) });
    const trackDirect = (type, to, label) =>
      trackCta({
        type,
        placement: "scope_tool_result",
        to,
        label,
        service: slug,
      });

    return (
      <Box>
        <Progress current={QUESTIONS.length} />
        <Typography
          ref={headingRef}
          tabIndex={-1}
          variant="h5"
          component="h3"
          sx={{
            fontWeight: "bold",
            mb: { xs: 1.25, md: 2 },
            outline: "none",
          }}
        >
          Here's what your site could look like
        </Typography>

        {/* Designs first: the visual payoff, then the price and the plan.
            Renders nothing when the preview backend is unset. */}
        <ScopeDesigns answers={answers} band={band} slug={slug} />

        {/* Price + plan */}
        <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 2 }}>
          {band?.name}
        </Typography>
        <Typography variant="h6" component="p" sx={{ fontWeight: 700, color: "primary.main", mb: { xs: 1.25, md: 2 } }}>
          {band?.price}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9, mb: { xs: 1.25, md: 2 } }}>
          {tailoredSentence()}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: { xs: 2, md: 3 } }}>
          Every site we build loads fast on a phone, helps you show up in local
          searches, and comes with analytics so you can see the calls and enquiries
          come in. If a smaller, cheaper version does the job, we'll tell you. This
          is a starting point, not a final quote.
        </Typography>

        {/* Recap of their answers */}
        <Box sx={{ mb: { xs: 2, md: 3 }, p: { xs: 1.5, md: 2.5 }, borderRadius: 2, bgcolor: "background.default", border: "1px solid", borderColor: "divider" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
            Your answers
          </Typography>
          <Stack spacing={0.75}>
            {QUESTIONS.map((q) => (
              <Box key={q.key} sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  {q.title.replace(/\?$/, "")}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, textAlign: "right" }}>
                  {labelFor(q.key, answers[q.key])}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        <Stack spacing={1.5}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setScreen("lead")}
              sx={showWhatsApp ? { flex: 1 } : undefined}
            >
              Get your price in writing
            </Button>
            {showWhatsApp && (
              <Button
                variant="contained"
                size="large"
                href={hrefs.wa}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<WhatsAppIcon />}
                onClick={() => trackDirect("whatsapp", hrefs.wa, LABELS.whatsapp)}
                sx={[whatsappContainedSx, { flex: 1 }]}
              >
                {LABELS.whatsapp}
              </Button>
            )}
            {!showDirect && (
              <Button variant="text" color="primary" startIcon={<RestartAltIcon />} onClick={startOver}>
                Start over
              </Button>
            )}
          </Stack>
          {showDirect && (
            <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
              {showSms && (
                <Button variant="text" color="primary" href={hrefs.sms} onClick={() => trackDirect("other", hrefs.sms, "SMS")}>
                  SMS
                </Button>
              )}
              <Button variant="text" color="primary" startIcon={<RestartAltIcon />} onClick={startOver}>
                Start over
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>
    );
  };

  const renderLead = () => (
    <Box component="form" noValidate onSubmit={handleLeadSubmit}>
      <Typography
        ref={headingRef}
        tabIndex={-1}
        variant="h5"
        component="h3"
        sx={{
          fontWeight: "bold",
          mb: 1,
          outline: "none",
        }}
      >
        Where should we send the recommendation?
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 2, md: 3 }, lineHeight: 1.8 }}>
        We'll send you the {band?.name?.toLowerCase()} price and a plan for your
        first version. No obligation. It's just a conversation, not a purchase.
      </Typography>

      {/* Honeypot */}
      <Box aria-hidden="true" sx={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </Box>

      <Box component="label" htmlFor="scope-name" sx={labelSx}>
        Name <Box component="span" aria-hidden="true">*</Box>
      </Box>
      <Box
        component="input"
        id="scope-name"
        name="name"
        type="text"
        placeholder="Your name"
        aria-required="true"
        aria-invalid={errors.name ? "true" : undefined}
        aria-describedby={errors.name ? "scope-name-error" : undefined}
        sx={{ ...inputSx, mb: errors.name ? 0.5 : 2 }}
      />
      {errors.name && (
        <Typography id="scope-name-error" role="alert" variant="caption" color="error" sx={{ mb: 1.5, display: "block" }}>
          {errors.name}
        </Typography>
      )}

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: errors.contact ? 0.5 : 2 }}>
        <Box sx={{ flex: 1 }}>
          <Box component="label" htmlFor="scope-phone" sx={labelSx}>
            Phone
          </Box>
          <Box
            component="input"
            id="scope-phone"
            name="phone"
            type="tel"
            placeholder="(###) ###-####"
            aria-invalid={errors.contact ? "true" : undefined}
            aria-describedby={errors.contact ? "scope-contact-error" : undefined}
            sx={inputSx}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box component="label" htmlFor="scope-email" sx={labelSx}>
            Email
          </Box>
          <Box
            component="input"
            id="scope-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            aria-invalid={errors.contact ? "true" : undefined}
            aria-describedby={errors.contact ? "scope-contact-error" : undefined}
            sx={inputSx}
          />
        </Box>
      </Stack>
      {errors.contact && (
        <Typography id="scope-contact-error" role="alert" variant="caption" color="error" sx={{ mb: 1.5, display: "block" }}>
          {errors.contact}
        </Typography>
      )}

      <Box component="label" htmlFor="scope-best-time" sx={labelSx}>
        Best time to call
      </Box>
      <Box component="select" id="scope-best-time" name="best_time" defaultValue="" sx={{ ...inputSx, mb: { xs: 2, md: 3 } }}>
        <option value="">No preference</option>
        <option value="Morning">Morning</option>
        <option value="Afternoon">Afternoon</option>
        <option value="Evening">Evening</option>
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ sm: "center" }}>
        <Button type="submit" variant="contained" color="primary" size="large" disabled={isLoading}>
          {isLoading ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <CircularProgress size={18} color="inherit" />
              <span>Sending…</span>
            </Box>
          ) : (
            "Send my enquiry"
          )}
        </Button>
        <Button onClick={goBack} startIcon={<ArrowBackIcon />} sx={{ color: "text.secondary" }}>
          Back to result
        </Button>
      </Stack>
    </Box>
  );

  const renderDone = () => (
    <Box sx={{ textAlign: "center", py: 2 }}>
      <CheckCircleOutlineIcon color="success" sx={{ fontSize: 48, mb: 1.5 }} />
      <Typography ref={headingRef} tabIndex={-1} variant="h5" component="h3" sx={{ fontWeight: "bold", mb: 1, outline: "none" }}>
        Thanks, we've got it
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9, maxWidth: 460, mx: "auto" }}>
        We'll review what you sent and follow up with the suggested price and a
        clear next step.
      </Typography>
    </Box>
  );

  let content;
  if (typeof screen === "number") content = renderQuestion(screen);
  else if (screen === "result") content = renderResult();
  else if (screen === "lead") content = renderLead();
  else content = renderDone();

  return (
    <Box ref={cardRef} sx={cardWrapSx}>
      {content}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ScopeTool;
