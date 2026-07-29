// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const projectSlugs = [
  "plateforme-saas-temps-reel",
  "pipeline-data-etl",
  "classification-images-cnn",
  "nlp-analyse-sentiments",
  "moteur-recommandation",
  "cli-devtools",
];

const postSlugs = [
  "mlops-en-2026",
  "transformers-pour-tabulaire",
  "architecture-full-stack-moderne",
];

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Static prerendering so the site can be served by static hosts (e.g. GitHub Pages).
    prerender: { enabled: true, crawlLinks: true },
    pages: [
      "/",
      "/projects",
      "/demos",
      "/blog",
      "/about",
      "/contact",
      ...projectSlugs.map((s) => `/projects/${s}`),
      ...postSlugs.map((s) => `/blog/${s}`),
    ].map((path) => ({ path, prerender: { enabled: true } })),
  },
});
