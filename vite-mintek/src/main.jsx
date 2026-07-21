import { ViteReactSSG } from "vite-react-ssg";
import * as amplitude from "@amplitude/unified";
import { routes } from "./routes.jsx";
import emotionStyleCollector from "./ssg/emotionStyleCollector.js";

// Entry for vite-react-ssg. Prerenders each route to static HTML at build time
// and hydrates on the client. The Emotion collector inlines MUI styles.
export const createRoot = ViteReactSSG(
  { routes },
  ({ isClient }) => {
    if (isClient && import.meta.env.PROD) {
      amplitude.initAll("4f478eba5fea8c1125cd4abc6d3e16ed", {
        analytics: { autocapture: true },
        sessionReplay: { sampleRate: 1 },
      });
    }
  },
  { getStyleCollector: emotionStyleCollector }
);
