import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { projects } from "../data/projects";
import { MotionCard, Reveal } from "../components/motion";
import { certGroups, type CertStatus } from "../data/certifications";
import { TbDatabase, TbCode, TbChartBar, TbCheck, TbClock, TbCertificate } from "react-icons/tb";
import profileImg from "../assets/profile.jpg";
import cvPdf from "../assets/cv.pdf";
import { Download } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { TechIcon } from "../components/TechIcon";
import { LINKEDIN_URL, GITHUB_URL } from "../components/SiteLayout";
import { ProjectCard } from "../components/ProjectCard";
import { Button } from "../components/ui/button";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Merphy Mademba — Data & Database Engineer | Python • SQL • PostgreSQL • Airflow • Power BI" },
      {
        name: "description",
        content:
          "Portfolio de Merphy Mademba : Data & Database Engineer — Python, SQL, PostgreSQL, Airflow, Power BI. Pipelines de données & backend.",
      },
      { property: "og:title", content: "Merphy Mademba — Data & Database Engineer" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:description",
        content: "Pipelines de données & backend — Python, SQL, PostgreSQL, Airflow, Power BI.",
      },
    ],
  }),
  component: Index,
});

const domains = [
  {
    title: "Data Engineer / Architecture",
    tag: "Engineering",
    desc: "Construction de pipelines de données fiables : ingestion, transformation, modélisation (Silver/Gold) et préparation à la décision.",
    skills: ["PostgreSQL", "NiFi", "Spark", "Docker", "Airflow", "dbt", "SQL", "Snowflake"],
  },
  {
    title: "Développeur Python & APIs",
    tag: "Python",
    desc: "Applications, scripts et APIs robustes : automatisation, back-ends, web scraping et outils métiers performants.",
    skills: ["Python", "FastAPI", "Django", "SQL", "Git", "Web scraping"],
  },
  {
    title: "Data Analytics & BI",
    tag: "Data",
    desc: "Exploration, visualisation et analyse de données : modélisation décisionnelle et création de dashboards impactants.",
    skills: ["Power BI", "Cubes OLAP/ROLAP", "SQL", "Pandas", "Statistiques", "Excel"],
  },
];

const groupIcons = {
  database: TbDatabase,
  code: TbCode,
  chart: TbChartBar,
} as const;

function StatusBadge({ status }: { status: CertStatus }) {
  const done = status === "certifie";
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
        done
          ? "border-success/35 bg-success/12 text-success"
          : "border-warning/35 bg-warning/12 text-warning"
      }`}
    >
      {done ? <TbCheck className="h-3 w-3" /> : <TbClock className="h-3 w-3" />}
      {done ? "Certifié" : "En cours"}
    </span>
  );
}

function Index() {
  const featured = projects.slice(0, 3);
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/15),transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-20 grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-center">
          <div>
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Merphy Mademba
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight max-w-4xl [text-wrap:balance]">
            Data &amp;{" "}
            <span className="text-primary whitespace-nowrap">Database Engineer</span>
          </h1>
          <p className="mt-4 text-sm tracking-wide text-muted-foreground">
            Python • SQL • PostgreSQL • Airflow • Power BI
          </p>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Je conçois des pipelines de données fiables, j'administre des bases
            PostgreSQL et je développe des back-ends Python — avec des analyses
            Power BI prêtes pour la décision.
          </p>
          <p className="mt-3 text-xs uppercase tracking-wider text-primary/80">
            Pipelines de données &amp; Backend
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Découvrir mes projets
            </Link>
            <Link
              to="/demos"
              className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent"
            >
              Essayer les démos IA
            </Link>
            <a
              href={cvPdf}
              download="CV-Merphy.pdf"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent"
            >
              <Download className="h-4 w-4" /> Télécharger le CV
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border hover:bg-accent hover:text-primary">
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border hover:bg-accent hover:text-primary">
              <SiGithub className="h-5 w-5" />
            </a>
          </div>

          </div>
          <MotionCard className="mx-auto w-56 md:w-full max-w-sm lg:max-w-md rounded-2xl border border-border bg-card overflow-hidden">
            <img
              src={profileImg}
              alt="Photo de profil — Data & Database Engineer"
              className="w-full h-full object-cover aspect-square"
              loading="eager"
            />
          </MotionCard>
        </div>
      </section>

      {/* Domains */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Trois domaines, une approche
          </h2>
          <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
            À propos →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {domains.map((d, i) => (
            <MotionCard
              key={d.tag}
              delay={i * 90}
              className="rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
            >
              <span className="inline-flex items-center rounded-full bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-medium">
                {d.tag}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{d.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {d.skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 text-xs rounded-md border border-border px-2 py-0.5 text-muted-foreground"
                  >
                    <TechIcon name={s} className="h-3.5 w-3.5 text-primary" />
                    {s}
                  </span>
                ))}
              </div>
            </MotionCard>
          ))}
        </div>
      </section>

      {/* Certifications & Formation */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal className="mb-10">
          <p className="text-xs uppercase tracking-widest text-primary/80">
            Formation continue
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
            Certifications &amp; Parcours d'Excellence
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Des parcours suivis chez IBM, Meta, Microsoft et DataCamp : chaque
            certification valide une compétence mise en pratique sur des projets
            réels.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {certGroups.map((g, i) => {
            const GroupIcon = groupIcons[g.icon];
            const done = g.items.filter((c) => c.status === "certifie").length;
            const wip = g.items.length - done;
            return (
              <MotionCard
                key={g.title}
                delay={i * 90}
                className="luminous flex flex-col rounded-xl bg-card p-6"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                    <GroupIcon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold leading-tight">{g.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{g.desc}</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2">
                  {g.items.map((c) => (
                    <li
                      key={c.name}
                      className="cert-item flex items-start gap-2.5 rounded-lg border border-border/70 bg-background/50 px-3 py-2.5"
                    >
                      <TechIcon
                        name={c.provider}
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm leading-snug">{c.name}</span>
                        <span className="mt-1 block text-xs uppercase tracking-wider text-muted-foreground">
                          {c.provider}
                          {c.platform ? ` · ${c.platform}` : ""}
                        </span>
                        {c.verifyUrl ? (
                          <Button asChild variant="link" size="sm" className="mt-1.5 h-auto justify-start whitespace-normal px-0 py-1 text-left text-xs">
                          <a
                            href={c.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Vérifier ${c.name} (nouvel onglet)`}
                          >
                            <TbCertificate className="h-3.5 w-3.5" />
                            Vérifier la certification
                          </a>
                          </Button>
                        ) : (
                          <span
                            aria-disabled="true"
                            title="Lien de vérification bientôt disponible"
                            className="mt-1.5 inline-flex cursor-not-allowed items-center gap-1.5 py-1 text-xs text-muted-foreground"
                          >
                            <TbCertificate className="h-3.5 w-3.5" />
                            Vérifier la certification · À venir
                          </span>
                        )}
                      </span>
                      <StatusBadge status={c.status} />
                    </li>
                  ))}
                </ul>

                <p className="mt-auto pt-4 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {done} certifi{done > 1 ? "ées" : "ée"}
                  {wip > 0 ? ` · ${wip} en cours` : ""}
                </p>
              </MotionCard>
            );
          })}
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Projets à la une
          </h2>
          <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground">
            Tous les projets →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} delay={i * 90} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <MotionCard className="rounded-2xl border border-border bg-card p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Un projet en tête ?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Discutons de vos besoins en développement, data ou IA.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Prendre contact
          </Link>
        </MotionCard>
      </section>
    </SiteLayout>
  );
}
