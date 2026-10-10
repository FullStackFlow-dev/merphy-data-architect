import { Link } from "@tanstack/react-router";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "../data/projects";
import { GITHUB_URL } from "./SiteLayout";
import { MotionCard } from "./motion";
import { Button } from "./ui/button";

export function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[8/5] w-full overflow-hidden bg-secondary">
      <img src={project.previewImage} alt={`Aperçu ${project.previewIsIllustration ? "illustré" : "du projet"} — ${project.title}`} width={1024} height={640} loading="lazy" className="h-full w-full object-cover" />
      {project.previewIsIllustration && (
        <span className="absolute bottom-3 left-3 rounded-md border border-border bg-background/90 px-2 py-1 text-xs text-muted-foreground">Illustration</span>
      )}
    </div>
  );
}

export function ProjectActions({ project }: { project: Project }) {
  const links = [
    { label: "GitHub", url: project.githubUrl, Icon: Github },
    { label: "Démo", url: project.demoUrl, Icon: ExternalLink },
  ];
  return (
    <div className="flex flex-wrap gap-2" aria-label={`Liens — ${project.title}`}>
      {links.map(({ label, url, Icon }) => url ? (
        <Button key={label} asChild variant="outline" size="sm">
          <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${label} — ${project.title} (nouvel onglet)`}>
            <Icon aria-hidden="true" />{label}
          </a>
        </Button>
      ) : (
        <Button key={label} variant="outline" size="sm" disabled title={`Lien ${label} à venir`} aria-label={`${label} — ${project.title} : lien à venir`}>
          <Icon aria-hidden="true" />{label}<span className="text-[10px]">À venir</span>
        </Button>
      ))}
    </div>
  );
}

export function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  return (
    <MotionCard delay={delay} className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card hover:border-primary/40">
      <Link to="/projects/$slug" params={{ slug: project.slug }} aria-label={`Voir le projet ${project.title}`}>
        <ProjectPreview project={project} />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="text-xs text-muted-foreground">{project.domain} · {project.year}</div>
        <Link to="/projects/$slug" params={{ slug: project.slug }} className="mt-2 hover:text-primary transition-colors">
          <h3 className="text-lg font-semibold">{project.title}</h3>
        </Link>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map(tag => <span key={tag} className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">{tag}</span>)}
        </div>
        <div className="mt-5 border-t border-border pt-4"><ProjectActions project={project} /></div>
      </div>
    </MotionCard>
  );
}