import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { getProject } from "../data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.title} — Projet` : "Projet";
    const desc = p?.summary ?? "Projet du portfolio.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-6 pt-20 pb-24">
        <Link
          to="/projects"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Tous les projets
        </Link>
        <div className="mt-6 text-xs text-muted-foreground">
          {project.domain} · {project.year}
        </div>
        <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{project.summary}</p>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((t: string) => (
            <span
              key={t}
              className="text-xs rounded-md border border-border px-2 py-0.5 text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-10 prose prose-neutral dark:prose-invert max-w-none">
          <p>{project.content}</p>
          <h2>Contexte</h2>
          <p>Contexte du projet — contenu provisoire à remplacer.</p>
          <h2>Approche</h2>
          <p>Choix techniques et méthodologiques — contenu provisoire.</p>
          <h2>Résultats</h2>
          <p>Impact et métriques — contenu provisoire.</p>
        </div>
      </article>
    </SiteLayout>
  );
}
