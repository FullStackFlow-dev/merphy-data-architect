import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { projects } from "../data/projects";
import { MotionCard } from "../components/motion";
import profileAsset from "../assets/profile.png.asset.json";
import cvAsset from "../assets/cv.pdf.asset.json";
import { Download } from "lucide-react";


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
    title: "Développeur Python",
    tag: "Python",
    desc: "Applications, scripts et APIs en Python : automatisation, back-ends, web scraping et outils métiers robustes.",
    skills: ["Python", "FastAPI", "Django", "SQL", "Git", "Web scraping"],
  },
  {
    title: "Data Analyste",
    tag: "Data",
    desc: "Exploration, visualisation et analyse de données avec Power BI, Excel, Python et des méthodes statistiques.",
    skills: ["Power BI", "Excel", "Python", "Pandas", "Statistiques", "SQL"],
  },
  {
    title: "Data Engineer",
    tag: "Engineering",
    desc: "Construction de pipelines de données fiables : ingestion, transformation, modélisation et préparation à la décision.",
    skills: ["ETL/ELT", "Airflow", "dbt", "SQL", "Snowflake", "Docker"],
  },
];

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
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight max-w-4xl">
            Développeur Python, Data Analyste &{" "}
            <span className="text-primary">Data Engineer</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Je conçois des applications Python, j'analyse des données avec Power
            BI, Excel et des statistiques, et je bâtis des pipelines de données
            fiables pour transformer la donnée brute en décision.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Voir les projets
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
          </div>

          </div>
          <MotionCard className="mx-auto w-56 md:w-full max-w-sm lg:max-w-md rounded-2xl border border-border bg-card overflow-hidden">
            <img
              src={profileAsset.url}
              alt="Photo de profil — ingénieur logiciel, data scientist et ingénieur IA"
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
                    className="text-xs rounded-md border border-border px-2 py-0.5 text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </MotionCard>
          ))}
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
