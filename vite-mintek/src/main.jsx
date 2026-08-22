import { ViteReactSSG } from "vite-react-ssg";
import * as amplitude from "@amplitude/analytics-browser";
import { routes } from "./routes.jsx";
import emotionStyleCollector from "./ssg/emotionStyleCollector.js";

const AMPLITUDE_API_KEY = "4f478eba5fea8c1125cd4abc6d3e16ed";

// Initialize Amplitude off the critical path so analytics doesn't compete with
// initial render/hydration. The SDK buffers any events fired via track() before
// init() runs and flushes them once initialized, so deferring is safe for
// ordering. Session Replay is intentionally dropped (heavy request chain); we
// use the lightweight event SDK with autocapture instead.
const initAnalytics = () => {
  amplitude.init(AMPLITUDE_API_KEY, {
    autocapture: true,
  });
};

const deferAnalytics = () => {
  if (typeof window === "undefined") return;
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(initAnalytics, { timeout: 2000 });
  } else {
    window.setTimeout(initAnalytics, 1);
  }
};

// Entry for vite-react-ssg. Prerenders each route to static HTML at build time
// and hydrates on the client. The Emotion collector inlines MUI styles.
export const createRoot = ViteReactSSG(
  { routes },
  ({ isClient }) => {
    if (isClient && import.meta.env.PROD) {
      deferAnalytics();
    }
  },
  { getStyleCollector: emotionStyleCollector }
);
