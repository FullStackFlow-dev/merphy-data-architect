import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { projects } from "../data/projects";
import { MotionCard, Reveal } from "../components/motion";
import { certGroups, type CertStatus } from "../data/certifications";
import { TbDatabase, TbCode, TbChartBar, TbCheck, TbClock } from "react-icons/tb";
import profileAsset from "../assets/profile.png.asset.json";
import cvAsset from "../assets/cv.pdf.asset.json";
import { Download } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { TechIcon } from "../components/TechIcon";
import { LINKEDIN_URL, GITHUB_URL } from "../components/SiteLayout";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Merphy Mademba — Développeur Python, Data Analyste & Data Engineer" },
      {
        name: "description",
        content:
          "Portfolio de Merphy Mademba : développeur Python, data analyste (Power BI, Excel, Python, statistiques) et data engineer.",
      },
      { property: "og:title", content: "Merphy Mademba — Python, Data & Engineering" },
      {
        property: "og:description",
        content: "Projets, démos, articles et parcours autour de Python, l'analyse de données et le data engineering.",
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
            Développeur Python &amp;{" "}
            <span className="text-primary whitespace-nowrap">Data Engineer</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Je conçois des applications Python, j'analyse des données avec Power
            BI, Excel et des statistiques, et je bâtis des pipelines de données
            fiables pour transformer la donnée brute en décision.
          </p>
          <p className="mt-3 text-xs uppercase tracking-wider text-primary/80">
            Pipelines ETL, ELT conçus · Visualisations BI · Modèles IA locaux
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
              href={cvAsset.url}
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
              src={profileAsset.url}
              alt="Photo de profil — développeur Python, data analyste et data engineer"
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
                className="luminous rounded-xl bg-card p-6"
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
                        <span className="mt-1 block text-[11px] uppercase tracking-wider text-muted-foreground">
                          {c.provider}
                          {c.platform ? ` · ${c.platform}` : ""}
                        </span>
                      </span>
                      <StatusBadge status={c.status} />
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-[11px] uppercase tracking-wider text-muted-foreground">
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
            <MotionCard
              key={p.slug}
              delay={i * 90}
              className="rounded-xl border border-border bg-card hover:border-primary/40"
            >
            <Link
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group block p-6"
            >
              <div className="text-xs text-muted-foreground">
                {p.domain} · {p.year}
              </div>
              <h3 className="mt-2 text-lg font-semibold group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
            </Link>
            </MotionCard>
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
