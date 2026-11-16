import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { SiteLayout } from "../components/SiteLayout";
import { projects } from "../data/projects";
import { ProjectCard } from "../components/ProjectCard";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projets Python & Data — Merphy Mademba" },
      { name: "description", content: "Sélection de projets en ingénierie des données, bases de données, BI et développement full stack." },
      { property: "og:title", content: "Projets Python & Data — Merphy Mademba" },
      { property: "og:description", content: "Projets en ingénierie des données, bases de données, BI et développement full stack." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

const domainFilters = ["Tous", "Data Engineering", "Database Engineering", "BI", "Backend", "Full Stack"] as const;

function ProjectsPage() {
  const [activeDomain, setActiveDomain] = useState<(typeof domainFilters)[number]>("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  const visibleProjects = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase("fr");
    return projects.filter((project) => {
      const legacyDomains = project.domain === "Data Engineer" ? ["Data Engineering"] : project.domain === "Data Analyste" ? ["BI"] : ["Backend", "Full Stack"];
      const matchesDomain = activeDomain === "Tous" || (project.domains ?? legacyDomains).includes(activeDomain);
      const searchableText = [project.title, project.summary, project.domain, ...(project.domains ?? legacyDomains), ...project.tags]
        .join(" ")
        .toLocaleLowerCase("fr");
      return matchesDomain && (!query || searchableText.includes(query));
    });
  }, [activeDomain, searchQuery]);

  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_0%,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_58%)]" />
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:pb-14 md:pt-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Portfolio · Réalisations</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">Des projets concrets, de la donnée à l’usage.</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Explorez les projets en ingénierie des données, bases de données, BI, backend et full stack.
            Filtrez par domaine ou recherchez une technologie.
          </p>
          <p className="mt-5 text-sm text-muted-foreground"><span className="font-semibold text-foreground">{projects.length}</span> projets présentés</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14" aria-label="Catalogue des projets">
        <div className="flex flex-col gap-5">
          <label className="relative block max-w-xl">
            <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <span className="sr-only">Rechercher un projet ou une technologie</span>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Projet, compétence ou technologie…"
              className="h-12 w-full rounded-xl border border-border bg-card/70 pl-11 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer les projets par domaine">
            {domainFilters.map((domain) => (
              <button
                key={domain}
                type="button"
                aria-pressed={activeDomain === domain}
                onClick={() => setActiveDomain(domain)}
                className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${activeDomain === domain ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"}`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5 mt-8 flex items-center justify-between border-b border-border/70 pb-3 text-sm">
          <p className="text-muted-foreground" aria-live="polite">{visibleProjects.length} résultat{visibleProjects.length > 1 ? "s" : ""}</p>
          {(activeDomain !== "Tous" || searchQuery) ? (
            <button type="button" onClick={() => { setActiveDomain("Tous"); setSearchQuery(""); }} className="font-medium text-primary underline-offset-4 hover:underline">
              Réinitialiser
            </button>
          ) : null}
        </div>

        {visibleProjects.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} delay={(index % 3) * 90} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
            <h2 className="text-lg font-semibold">Aucun projet trouvé</h2>
            <p className="mt-2 text-sm text-muted-foreground">Essayez un autre terme ou retirez le filtre de domaine.</p>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
