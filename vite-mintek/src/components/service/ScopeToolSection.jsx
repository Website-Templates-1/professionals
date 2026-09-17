import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import ServiceSection from "./ServiceSection";
import { websitePricingBands } from "../../config/siteConfig";

// Code-split so the tool's JS never ships in the initial route bundle. The
// dynamic import only runs once the section is near the viewport, so it can't
// affect the page's LCP or block the server-rendered copy.
const ScopeTool = lazy(() => import("./ScopeTool"));

// Progressive enhancement: the heading + intro paragraph below are server
// rendered (crawlable, LCP-neutral). The interactive tool mounts client-side
// only when the user scrolls near it. During prerender there's no
// IntersectionObserver/window, so only the static intro is emitted.
// `service` is passed on service pages; blog posts pass `slug` (and no service)
// directly. Bands come from an explicit `bands` prop, else the service's own
// packages, else the shared canonical bands.
const ScopeToolSection = ({ service, slug, bands }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const resolvedBands = bands?.length
    ? bands
    : service?.packages?.length
    ? service.packages
    : websitePricingBands;
  const resolvedSlug = slug || service?.slug;

  useEffect(() => {
    if (visible) return;
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      // No IO support: fall back to mounting on idle so the tool still works.
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Start loading a bit before it's on screen so it's ready by the time the
      // user reaches it, without loading up front.
      { rootMargin: "300px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <ServiceSection
      id="scope-your-site"
      overline="NOT SURE WHERE TO START?"
      title="Scope your site"
    >
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8, maxWidth: 640 }}>
        Not ready to fill in the full project form? Answer five quick questions
        and we'll suggest the right first version for your business and a
        realistic price range. It's a scoping tool, not a template picker — and
        if a smaller, cheaper version is enough, we'll say so.
      </Typography>
      <Box ref={ref}>
        {visible ? (
          <Suspense
            fallback={
              <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress size={28} />
              </Box>
            }
          >
            <ScopeTool bands={resolvedBands} slug={resolvedSlug} />
          </Suspense>
        ) : (
          // Reserve height to avoid layout shift when the tool mounts.
          <Box sx={{ minHeight: 240 }} aria-hidden="true" />
        )}
      </Box>
    </ServiceSection>
  );
};

export default ScopeToolSection;
