import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { projects } from "../data/projects";
import { ProjectCard } from "../components/ProjectCard";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projets Python & Data — Merphy Mademba" },
      { name: "description", content: "Sélection de projets en développement, data science et IA." },
      { property: "og:title", content: "Projets Python & Data — Merphy Mademba" },
      { property: "og:description", content: "Sélection de projets dev, data et IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-10">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
          Projets
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Une sélection de réalisations
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Projets personnels, open source et professionnels — développement
          Python, data analyse et data engineering.
        </p>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} delay={(i % 3) * 90} />
        ))}
      </section>
    </SiteLayout>
  );
}
