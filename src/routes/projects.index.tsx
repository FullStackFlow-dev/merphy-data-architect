import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { projects } from "../data/projects";
import { MotionCard } from "../components/motion";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projets — Portfolio" },
      { name: "description", content: "Sélection de projets en développement, data science et IA." },
      { property: "og:title", content: "Projets — Portfolio" },
      { property: "og:description", content: "Sélection de projets dev, data et IA." },
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
          Projets personnels, open source et professionnels — dev, data science
          et IA.
        </p>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <MotionCard
            key={p.slug}
            delay={(i % 3) * 90}
            className="rounded-xl border border-border bg-card hover:border-primary/40 flex flex-col"
          >
          <Link
            to="/projects/$slug"
            params={{ slug: p.slug }}
            className="group p-6 flex flex-col flex-1"
          >
            <div className="text-xs text-muted-foreground">
              {p.domain} · {p.year}
            </div>
            <h2 className="mt-2 text-lg font-semibold group-hover:text-primary transition-colors">
              {p.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground flex-1">{p.summary}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="text-xs rounded-md border border-border px-2 py-0.5 text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
          </MotionCard>
        ))}
      </section>
    </SiteLayout>
  );
}
