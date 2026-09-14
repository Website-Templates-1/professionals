import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to top on route change. Effects only run client-side, so this is
// safe during static prerendering.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname, hash]);
  return null;
};

export default ScrollToTop;
