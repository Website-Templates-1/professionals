import { useEffect, useMemo, useRef, useState } from "react";
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
import { trackEvent, trackLead } from "../../utils/analytics";
import ScopeDesigns from "./ScopeDesigns";

// Existing enquiry backend (same one the main contact form posts to). Reused so
// scoped leads land in the same inbox, pre-qualified. Never put answers or
// personal details in URL params — everything goes in the POST body.
const EMAIL_SERVICE_URL = import.meta.env.VITE_EMAIL_SERVICE_URL;
const CONTACT_FORM_ID = import.meta.env.VITE_CONTACT_FORM_ID;

// The three questions. Each option auto-advances on select, so the whole flow is
// literally three taps. `value` is what we store/report; `label` is what's shown.
const QUESTIONS = [
  {
    key: "businessType",
    title: "What kind of business is this?",
    options: [
      { value: "salon", label: "Salon & wellness" },
      { value: "trades", label: "Trades & home services" },
      { value: "restaurant", label: "Restaurant or food" },
      { value: "clinic", label: "Clinic or practice" },
      { value: "professional", label: "Professional services" },
      { value: "other", label: "Something else" },
    ],
  },
  {
    key: "currentSite",
    title: "What do you have today?",
    options: [
      { value: "none", label: "No site yet" },
      { value: "rebuild", label: "Have one, but it's old or slow" },
      { value: "refresh", label: "Have one, just needs a refresh" },
    ],
  },
  {
    key: "goal",
    title: "What should the site mainly do?",
    options: [
      { value: "calls", label: "Get calls & enquiries" },
      { value: "bookings", label: "Take bookings or a waitlist" },
      { value: "info", label: "Show menu, hours & directions" },
      { value: "showcase", label: "Showcase your work" },
      { value: "sell", label: "Sell or take orders online" },
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
  calls: "making it effortless to call or send an enquiry",
  bookings: "letting people book or join a waitlist without friction",
  info: "putting your menu, hours and directions one thumb-reach away",
  showcase: "showing your past work so new customers trust you quickly",
  sell: "letting customers order and pay online",
};

// Map answers -> package band. Bands (index 0/1/2) come from the page's own
// published packages config, so the price ranges never drift from the site.
// Rules (highest wins):
//   default            -> Starter (0)
//   goal = bookings     -> Established (1)
//   rebuild / refresh   -> at least Established (1)
//   goal = sell/orders  -> Custom / software (2)
const recommendBandIndex = (answers) => {
  let level = 0;
  if (answers.goal === "bookings") level = Math.max(level, 1);
  if (answers.currentSite === "rebuild" || answers.currentSite === "refresh") level = Math.max(level, 1);
  if (answers.goal === "sell") level = Math.max(level, 2);
  return level;
};

const optionButtonSx = {
  justifyContent: "flex-start",
  textAlign: "left",
  width: "100%",
  minHeight: 56, // thumb-reachable target
  px: 2.5,
  py: 1.5,
  borderRadius: 2,
  borderColor: "divider",
  color: "text.primary",
  fontWeight: 600,
  fontSize: "1rem",
  bgcolor: "background.paper",
  transition: "border-color 0.15s ease, background-color 0.15s ease",
  "@media (prefers-reduced-motion: reduce)": { transition: "none" },
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
  <Box aria-hidden="true" sx={{ display: "flex", gap: 0.75, mb: 3 }}>
    {QUESTIONS.map((q, i) => (
      <Box
        key={q.key}
        sx={{
          height: 6,
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
  p: { xs: 3, md: 4 },
  borderRadius: 3,
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "background.paper",
};

const ScopeTool = ({ bands = [], slug }) => {
  // Screens: "intro" -> 0..4 (questions) -> "result" -> "lead".
  const [screen, setScreen] = useState("intro");
  const [businessName, setBusinessName] = useState("");
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const headingRef = useRef(null);
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
  // screen-reader and keyboard users follow the flow. `preventScroll` keeps the
  // browser from scrolling the heading into view (which would jump the page),
  // and we skip the initial mount entirely so hydration never moves the page.
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    if (headingRef.current) headingRef.current.focus({ preventScroll: true });
  }, [screen]);

  const bandIndex = useMemo(() => recommendBandIndex(answers), [answers]);
  const band = bands[bandIndex] || bands[0];

  const trimmedName = businessName.trim();
  const resultHeader = trimmedName
    ? `Here's the right first version for ${trimmedName}`
    : "Here's the right first version for your site";

  const startQuestions = () => setScreen(0);

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
    if (screen === 0) setScreen("intro");
    else if (typeof screen === "number") setScreen(screen - 1);
    else if (screen === "result") setScreen(QUESTIONS.length - 1);
    else if (screen === "lead") setScreen("result");
  };

  const startOver = () => {
    setAnswers({});
    setErrors({});
    shownBandRef.current = null;
    setScreen("intro");
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
    if (goal) return `The first version should focus on ${goal} — and nothing you don't need yet.`;
    return "The first version should focus on the one job that earns enquiries — and nothing you don't need yet.";
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
      businessName: trimmedName || "Not provided",
      businessType: labelFor("businessType", answers.businessType),
      currentSite: labelFor("currentSite", answers.currentSite),
      goal: labelFor("goal", answers.goal),
      recommendedBand: band?.name || "Unspecified",
      priceRange: band?.price || "Unspecified",
      phone: phone || "Not provided",
      bestTimeToCall: bestTime || "Not specified",
    };

    const message = [
      `Pre-qualified enquiry from the "Scope your site" tool.`,
      trimmedName ? `Business: ${trimmedName}` : null,
      `Business type: ${structuredFields.businessType}`,
      `Current site: ${structuredFields.currentSite}`,
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
      trackLead({ project_type: "Website development", band: band?.name, source: "scope_tool" });

      setScreen("done");
    } catch (error) {
      console.error("Scope tool submit failed:", error);
      setSnackbar({
        open: true,
        message: "An error occurred. Please email or call us directly — we'll pick it up.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ---- Screen renderers -------------------------------------------------

  const renderIntro = () => (
    <Box>
      <Typography
        ref={headingRef}
        tabIndex={-1}
        variant="h5"
        component="h3"
        sx={{ fontWeight: "bold", mb: 1.5, outline: "none" }}
      >
        Scope your site in three taps
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
        Answer three quick questions and we'll suggest the right first version and
        a realistic price range — no pressure, no template picker. If a smaller,
        cheaper version is enough, we'll say so.
      </Typography>
      <Box component="label" htmlFor="scope-business-name" sx={labelSx}>
        Business name{" "}
        <Box component="span" sx={{ color: "text.secondary", fontWeight: 400 }}>
          (optional)
        </Box>
      </Box>
      <Box
        component="input"
        id="scope-business-name"
        type="text"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        placeholder="e.g. Bella's Salon"
        sx={{ ...inputSx, mb: 3 }}
      />
      <Button variant="contained" color="primary" size="large" onClick={startQuestions}>
        Start
      </Button>
    </Box>
  );

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
          sx={{ fontWeight: "bold", mt: 0.5, mb: 3, outline: "none" }}
        >
          {q.title}
        </Typography>
        <Stack spacing={1.5} role="group" aria-labelledby={headingId}>
          {q.options.map((opt) => (
            <Button
              key={opt.value}
              variant="outlined"
              disableElevation
              aria-pressed={selected === opt.value}
              onClick={() => selectOption(stepIndex, opt.value)}
              sx={optionButtonSx}
            >
              {opt.label}
            </Button>
          ))}
        </Stack>
        <Button
          onClick={goBack}
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 3, px: 0, color: "text.secondary" }}
        >
          Back
        </Button>
      </Box>
    );
  };

  const renderResult = () => (
    <Box>
      <Progress current={QUESTIONS.length} />
      <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 2 }}>
        {band?.name}
      </Typography>
      <Typography
        ref={headingRef}
        tabIndex={-1}
        variant="h5"
        component="h3"
        sx={{ fontWeight: "bold", mt: 0.5, mb: 1, outline: "none" }}
      >
        {resultHeader}
      </Typography>
      <Typography variant="h6" component="p" sx={{ fontWeight: 700, color: "primary.main", mb: 2 }}>
        {band?.price}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
        {tailoredSentence()}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
        Every version we build is mobile-first, ships with local SEO foundations,
        and includes analytics so you can see whether calls and enquiries actually
        happen. If a smaller, cheaper version is enough, we'll say so — this is a
        starting point, not a final quote.
      </Typography>

      {/* Recap of their answers */}
      <Box sx={{ mb: 3, p: 2.5, borderRadius: 2, bgcolor: "background.default", border: "1px solid", borderColor: "divider" }}>
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

      {/* Personalized design directions (progressive enhancement; renders
          nothing when the preview backend is unset or answers are incomplete). */}
      <ScopeDesigns answers={answers} band={band} businessName={businessName} slug={slug} />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <Button variant="contained" color="primary" size="large" onClick={() => setScreen("lead")}>
          Get this scoped — talk to us
        </Button>
        <Button variant="text" color="primary" startIcon={<RestartAltIcon />} onClick={startOver}>
          Start over
        </Button>
      </Stack>
    </Box>
  );

  const renderLead = () => (
    <Box component="form" noValidate onSubmit={handleLeadSubmit}>
      <Typography
        ref={headingRef}
        tabIndex={-1}
        variant="h5"
        component="h3"
        sx={{ fontWeight: "bold", mb: 1, outline: "none" }}
      >
        Where should we send the recommendation?
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
        We'll follow up with the {band?.name?.toLowerCase()} scope for
        {trimmedName ? ` ${trimmedName}` : " your business"}. No obligation — it's
        a scoping conversation, not a purchase.
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
      <Box component="select" id="scope-best-time" name="best_time" defaultValue="" sx={{ ...inputSx, mb: 3 }}>
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
        Thanks — we've got it
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, maxWidth: 460, mx: "auto" }}>
        We'll review your answers and follow up with the {band?.name?.toLowerCase()}{" "}
        scope and a clear next step. Talk soon.
      </Typography>
    </Box>
  );

  let content;
  if (screen === "intro") content = renderIntro();
  else if (typeof screen === "number") content = renderQuestion(screen);
  else if (screen === "result") content = renderResult();
  else if (screen === "lead") content = renderLead();
  else content = renderDone();

  return (
    <Box sx={cardWrapSx}>
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
