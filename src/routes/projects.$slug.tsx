import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { getProject } from "../data/projects";
import { ProjectActions, ProjectPreview } from "../components/ProjectCard";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.title} — Merphy Mademba` : "Projet — Merphy Mademba";
    const desc = p?.summary ?? "Projet du portfolio.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
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
        {project.status ? <p className="mt-4 text-sm font-medium text-warning">{project.status}</p> : null}
        <div className="mt-6"><ProjectActions project={project} /></div>
        <div className="mt-8 overflow-hidden rounded-lg border border-border"><ProjectPreview project={project} /></div>
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
          {project.modules ? null : <>
          <h2>Contexte</h2>
          <p>Contexte du projet — contenu provisoire à remplacer.</p>
          <h2>Approche</h2>
          <p>Choix techniques et méthodologiques — contenu provisoire.</p>
          <h2>Résultats</h2>
          <p>Impact et métriques — contenu provisoire.</p>
          </>}
        </div>
        {project.modules ? <section className="mt-10" aria-labelledby="project-modules-title">
          <h2 id="project-modules-title" className="text-2xl font-semibold">Modules du projet</h2>
          <dl className="mt-5 divide-y divide-border">
            {project.modules.map(module => <div key={module.name} className="py-5">
              <dt className="font-semibold text-primary">{module.name}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{module.description}</dd>
            </div>)}
          </dl>
        </section> : null}
        {project.gallery ? <section className="mt-10" aria-labelledby="project-gallery-title">
          <h2 id="project-gallery-title" className="text-2xl font-semibold">Aperçus du projet</h2>
          <div className="mt-6 space-y-8">
            {project.gallery.map(item => <figure key={item.caption}>
              <a href={item.image} target="_blank" rel="noopener noreferrer" aria-label={`Agrandir : ${item.caption}`}>
                <img src={item.image} alt={item.caption} loading="lazy" className="h-auto w-full rounded-lg border border-border" />
              </a>
              <figcaption className="mt-3 text-sm text-muted-foreground">{item.caption}</figcaption>
            </figure>)}
          </div>
        </section> : null}
        {project.embedUrl ? (
          <section className="mt-12" aria-labelledby="power-bi-demo-title">
            <h2 id="power-bi-demo-title" className="text-2xl font-semibold">
              Rapport interactif Power BI
            </h2>
            <div className="mt-5 aspect-video w-full overflow-hidden rounded-lg border border-border bg-card">
              <iframe
                title="Démonstration du rapport Power BI"
                src={project.embedUrl}
                className="h-full w-full"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </section>
        ) : null}
      </article>
    </SiteLayout>
  );
}
