// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const projectSlugs = [
  "dakar-weather-intelligence",
  "mobilite-urbaine-senegal",
  "plateforme-api-python",
  "pipeline-data-etl",
  "dashboard-ventes-powerbi",
  "analyse-sentiments-reviews",
  "moteur-recommandation",
  "automatisation-etl-python",
];

const postSlugs = [
  "pipelines-donnees-2026",
  "powerbi-vs-python-analyse",
  "automatisation-python-entreprise",
];

// Static export mode (GitHub Pages CI): skip the nitro server build and emit
// prerendered HTML into dist/client.
const staticExport = process.env.STATIC_EXPORT === "1";

export default defineConfig({
  nitro: staticExport ? false : undefined,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Static prerendering (GitHub Pages only) so the site can be served by a static host.
    prerender: { enabled: staticExport, crawlLinks: false },
    pages: staticExport
      ? [
          "/",
          "/projects",
          "/demos",
          "/blog",
          "/about",
          "/contact",
          ...projectSlugs.map((s) => `/projects/${s}`),
          ...postSlugs.map((s) => `/blog/${s}`),
        ].map((path) => ({ path, prerender: { enabled: true } }))
      : [],
  },
});
