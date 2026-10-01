// Fetches Google reviews for the business Place ID and writes them to
// src/content/google-reviews.js, which the site bakes into its static pages at
// build time (stars, reviewer photos, and Review JSON-LD).
//
// Uses the Places API (New). Set GOOGLE_PLACES_API_KEY in the environment (or in
// .env) — it is used ONLY here at build time and is never shipped to the client,
// so it must NOT be prefixed with VITE_.
//
// This script is intentionally non-fatal: if the key is missing or the request
// fails, it logs a warning, leaves the existing JSON untouched, and exits 0 so a
// build never breaks because Google is unreachable. Google's terms ask that
// cached review content be refreshed regularly (within ~30 days) and shown with
// attribution — rebuilding the site refreshes this snapshot.
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { site } from "../src/config/siteConfig.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outFile = join(__dirname, "..", "src", "content", "google-reviews.js");
const envFile = join(__dirname, "..", ".env");

const FILE_HEADER =
  "// Generated / maintained by scripts/fetch-google-reviews.mjs — do not edit by hand.\n" +
  "// Baked into the static site at build time. Committed so builds work before the\n" +
  "// first live fetch and when GOOGLE_PLACES_API_KEY is not set. A plain ES module\n" +
  "// (not JSON) so it imports cleanly in Node, Vite and ESLint without attributes.\n" +
  "export default ";

// Minimal .env loader so a local `yarn build` picks up the key without extra
// tooling. Real CI should provide GOOGLE_PLACES_API_KEY as a secret in the env.
async function loadEnvKey(name) {
  if (process.env[name]) return process.env[name];
  if (!existsSync(envFile)) return undefined;
  try {
    const text = await readFile(envFile, "utf-8");
    for (const line of text.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && m[1] === name) return m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    /* ignore */
  }
  return undefined;
}

async function main() {
  const apiKey = await loadEnvKey("GOOGLE_PLACES_API_KEY");
  if (!apiKey) {
    console.warn(
      "[google-reviews] GOOGLE_PLACES_API_KEY not set — keeping existing google-reviews.js."
    );
    return;
  }
  if (!site.placeId) {
    console.warn("[google-reviews] No site.placeId configured — skipping.");
    return;
  }

  const fieldMask = [
    "id",
    "displayName",
    "rating",
    "userRatingCount",
    "googleMapsUri",
    "reviews.name",
    "reviews.rating",
    "reviews.text",
    "reviews.relativePublishTimeDescription",
    "reviews.publishTime",
    "reviews.authorAttribution",
  ].join(",");

  const url =
    `https://places.googleapis.com/v1/places/${encodeURIComponent(site.placeId)}` +
    `?languageCode=en`;

  let data;
  try {
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": fieldMask,
      },
    });
    if (!res.ok) {
      const body = await res.text();
      console.warn(
        `[google-reviews] Places API returned ${res.status}: ${body.slice(0, 300)} — keeping existing JSON.`
      );
      return;
    }
    data = await res.json();
  } catch (err) {
    console.warn(
      `[google-reviews] Fetch failed (${err.message}) — keeping existing JSON.`
    );
    return;
  }

  // Keep only reviews that actually have text; map to a small, stable shape.
  const reviews = (data.reviews || [])
    .filter((r) => r?.text?.text)
    .map((r) => ({
      id: (r.name || "").split("/").pop() || "",
      author: r.authorAttribution?.displayName || "A Google user",
      authorUri: r.authorAttribution?.uri || "",
      photo: r.authorAttribution?.photoUri || "",
      rating: typeof r.rating === "number" ? r.rating : null,
      text: r.text.text.trim(),
      relativeTime: r.relativePublishTimeDescription || "",
      publishTime: r.publishTime || "",
    }));

  const out = {
    placeId: site.placeId,
    fetchedAt: new Date().toISOString(),
    rating: typeof data.rating === "number" ? data.rating : null,
    userRatingCount:
      typeof data.userRatingCount === "number" ? data.userRatingCount : null,
    googleMapsUri: data.googleMapsUri || site.mapsUrl || "",
    reviews,
  };

  await writeFile(outFile, FILE_HEADER + JSON.stringify(out, null, 2) + ";\n", "utf-8");
  console.log(
    `[google-reviews] Wrote ${reviews.length} review(s), overall ${out.rating ?? "?"}★ (${out.userRatingCount ?? "?"} ratings).`
  );
}

main().catch((err) => {
  // Never fail the build because of reviews.
  console.warn(`[google-reviews] Unexpected error: ${err.message}`);
});
