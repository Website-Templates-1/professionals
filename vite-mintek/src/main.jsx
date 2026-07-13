import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes.jsx";
import emotionStyleCollector from "./ssg/emotionStyleCollector.js";

// Entry for vite-react-ssg. Prerenders each route to static HTML at build time
// and hydrates on the client. The Emotion collector inlines MUI styles.
export const createRoot = ViteReactSSG(
  { routes },
  undefined,
  { getStyleCollector: emotionStyleCollector }
);
