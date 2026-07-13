import { createElement } from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

// Style collector for vite-react-ssg so MUI/Emotion styles are inlined into the
// prerendered HTML (avoids an unstyled flash and gives crawlers styled markup).
// Uses the same cache key ("css") MUI uses by default so the client hydrates
// against the server-rendered <style> tags.
export default async function emotionStyleCollector() {
  const cache = createCache({ key: "css" });
  cache.compat = true;

  return {
    collect(app) {
      return createElement(CacheProvider, { value: cache }, app);
    },
    toString() {
      const ids = Object.keys(cache.inserted);
      const css = ids
        .map((id) => cache.inserted[id])
        .filter((value) => typeof value === "string")
        .join("");
      if (!css) return "";
      return `<style data-emotion="${cache.key} ${ids.join(" ")}">${css}</style>`;
    },
    cleanup() {},
  };
}
