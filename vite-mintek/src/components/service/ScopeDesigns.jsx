import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { trackEvent } from "../../utils/analytics";

// Base URL of the mockup-scope Cloudflare Worker (local-lead-finder repo), which
// serves the v0-modern-design-mockups app. When unset the whole section renders
// nothing — the result screen stays fully functional. Single integration point.
const PREVIEW_BASE = import.meta.env.VITE_SCOPE_PREVIEW_BASE;
const baseUrl = PREVIEW_BASE ? PREVIEW_BASE.replace(/\/$/, "") : "";

// How many "directions" to show. The manifest may hold more per business type;
// we rotate a stable trio per mount so the collection gets surfaced over time.
const SHOW = 3;

const cardMediaSx = {
  position: "relative",
  aspectRatio: "4 / 3",
  borderRadius: 2,
  overflow: "hidden",
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "background.default",
};

// Pick up to SHOW templates for a business type, rotating from a random start so
// repeat visitors see different real designs as the library grows.
const pickTemplates = (all, businessType) => {
  const pool = all.filter((t) => t.businessType === businessType);
  if (pool.length <= SHOW) return pool;
  const start = Math.floor(Math.random() * pool.length);
  return Array.from({ length: SHOW }, (_, i) => pool[(start + i) % pool.length]);
};

const ScopeDesigns = ({ answers, band, businessName, slug }) => {
  const businessType = answers?.businessType || null;

  const [templates, setTemplates] = useState([]);
  const [failed, setFailed] = useState({});
  const shownRef = useRef(false);

  // Fetch the manifest and pick this business type's directions. Fully guarded:
  // no base, no business type, or any fetch error → the section renders nothing.
  useEffect(() => {
    if (!baseUrl || !businessType) return;
    let cancelled = false;
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 8000);
    fetch(`${baseUrl}/manifest.json`, { signal: ctrl.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`manifest ${res.status}`);
        return res.json();
      })
      .then((all) => {
        if (cancelled || !Array.isArray(all)) return;
        setTemplates(pickTemplates(all, businessType));
      })
      .catch(() => {
        /* offline / not deployed / aborted — section simply stays empty */
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [businessType]);

  // Fire designs_shown once, when we actually have directions to show.
  useEffect(() => {
    if (templates.length === 0 || shownRef.current) return;
    shownRef.current = true;
    trackEvent("designs_shown", {
      tool: "scope_your_site",
      business_type: businessType,
      count: templates.length,
      band: band?.name,
      service: slug,
    });
  }, [templates, businessType, band?.name, slug]);

  const trimmedName = (businessName || "").trim();
  const intro = useMemo(
    () =>
      trimmedName
        ? `A few ways ${trimmedName}'s first version could feel.`
        : "A few ways your first version could feel.",
    [trimmedName]
  );

  if (!baseUrl || !businessType || templates.length === 0) return null;

  const handleOpen = (t) => {
    trackEvent("design_opened", {
      tool: "scope_your_site",
      business_type: businessType,
      template_id: t.id,
      band: band?.name,
      service: slug,
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
        A few directions we'd explore
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
        {intro} We design custom — every build starts from scratch, so these are
        just starting points to make the conversation concrete, not templates to
        pick from.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: `repeat(${SHOW}, 1fr)` },
          gap: 1.5,
        }}
      >
        {templates.map((t) => {
          const href = `${baseUrl}/?t=${t.businessType}/${t.id}`;
          const thumb = `${baseUrl}/thumbs/${t.businessType}/${t.id}.webp`;
          const showFallback = failed[t.id];
          const accent = t.accent || "#6C55F9";
          return (
            <Link
              key={t.key || `${t.businessType}/${t.id}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              onClick={() => handleOpen(t)}
              aria-label={`Open the ${t.label} design direction in a new tab`}
              sx={{
                display: "block",
                color: "text.primary",
                borderRadius: 2,
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: 2,
                },
              }}
            >
              <Box sx={cardMediaSx}>
                {showFallback ? (
                  <Box
                    aria-hidden="true"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      textAlign: "center",
                      px: 2,
                      fontWeight: 700,
                      background: `linear-gradient(140deg, ${accent}, rgba(0,0,0,0.45))`,
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#fff" }}>
                      {t.label}
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    component="img"
                    src={thumb}
                    alt={`${t.label} design direction preview`}
                    loading="lazy"
                    decoding="async"
                    onError={() => setFailed((prev) => ({ ...prev, [t.id]: true }))}
                    sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                  />
                )}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.75 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {t.label}
                </Typography>
                <OpenInNewIcon sx={{ fontSize: 15, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary" sx={{ ml: "auto" }}>
                  Live preview
                </Typography>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export default ScopeDesigns;
