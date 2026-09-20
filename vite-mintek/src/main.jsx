import { ViteReactSSG } from "vite-react-ssg";
import * as amplitude from "@amplitude/analytics-browser";
import { routes } from "./routes.jsx";
import emotionStyleCollector from "./ssg/emotionStyleCollector.js";

const AMPLITUDE_API_KEY = "4f478eba5fea8c1125cd4abc6d3e16ed";

// Founder/test machines. Events still send so we can debug instrumentation;
// production charts exclude user property traffic = internal_test.
const INTERNAL_TEST_DEVICE_IDS = new Set([
  "cf107910-43a0-4aec-a2cf-cb04ac5c548a",
]);

const isInternalTestDevice = (deviceId) =>
  Boolean(deviceId && INTERNAL_TEST_DEVICE_IDS.has(deviceId));

const tagInternalTestTraffic = () => {
  if (!isInternalTestDevice(amplitude.getDeviceId())) return;
  const identifyEvent = new amplitude.Identify();
  identifyEvent.set("traffic", "internal_test");
  amplitude.identify(identifyEvent);
};

// Stamp events from founder machines so charts can exclude them without
// dropping the stream (we still want this traffic for instrumentation tests).
const internalTestPlugin = {
  name: "internal-test-traffic",
  type: "enrichment",
  setup: async () => undefined,
  execute: async (event) => {
    const deviceId = event.device_id || amplitude.getDeviceId();
    if (!isInternalTestDevice(deviceId)) return event;
    event.event_properties = { ...event.event_properties, traffic: "internal_test" };
    event.user_properties = { ...event.user_properties, traffic: "internal_test" };
    return event;
  },
};

// Initialize Amplitude off the critical path so analytics doesn't compete with
// initial render/hydration. The SDK buffers any events fired via track() before
// init() runs and flushes them once initialized, so deferring is safe for
// ordering. Session Replay is intentionally dropped (heavy request chain); we
// use the lightweight event SDK with autocapture instead.
const initAnalytics = () => {
  amplitude.add(internalTestPlugin);
  amplitude
    .init(AMPLITUDE_API_KEY, {
      autocapture: true,
    })
    .promise.then(tagInternalTestTraffic);
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
