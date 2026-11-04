import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { MotionCard } from "../components/motion";
import profileImg from "../assets/project-analytics.jpg";
import cvPdf from "../assets/project-analytics.jpg";
import { Download } from "lucide-react";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos & CV — Merphy Mademba" },
      { name: "description", content: "Parcours, compétences et expériences — Data & Database Engineer (Python, SQL, PostgreSQL, Airflow, Power BI)." },
      { property: "og:title", content: "À propos & CV — Merphy Mademba" },
      { property: "og:description", content: "Parcours, compétences et expériences — Data & Database Engineer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const experiences = [
  {
    period: "2024 — présent",
    role: "Data Engineer",
    org: "Entreprise (provisoire)",
    desc: "Construction de pipelines ETL/ELT, modélisation et préparation de données.",
  },
  {
    period: "2022 — 2024",
    role: "Data Analyste",
    org: "Entreprise (provisoire)",
    desc: "Analyse de données, reporting Power BI/Excel, statistiques et visualisation.",
  },
  {
    period: "2020 — 2022",
    role: "Développeur Python",
    org: "Entreprise (provisoire)",
    desc: "Applications, scripts d'automatisation, APIs et outils métiers en Python.",
  },
];

const skills = {
  "Développement Python": [
    "Python",
    "FastAPI",
    "Django",
    "Flask",
    "SQL",
    "Git",
    "Web scraping",
  ],
  "Data Analyste": [
    "Power BI",
    "Excel",
    "Pandas",
    "Python",
    "Statistiques",
    "Visualisation",
    "SQL",
  ],
  "Data Engineer": [
    "ETL/ELT",
    "Airflow",
    "dbt",
    "Snowflake",
    "BigQuery",
    "SQL",
    "Docker",
  ],
};

function AboutPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-10 flex flex-col sm:flex-row sm:items-center gap-8">
        <div className="flex-1">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
          À propos
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Merphy Mademba
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Data &amp; Database Engineer
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Python • SQL • PostgreSQL • Airflow • Power BI
        </p>
        <p className="mt-6 text-lg text-muted-foreground">
          Je conçois des pipelines de données fiables, j'administre des bases
          PostgreSQL et je développe des back-ends Python — avec des analyses
          Power BI prêtes pour la décision.
        </p>
        <a
          href={cvPdf}
          download="CV-Merphy.pdf"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Download className="h-4 w-4" /> Télécharger mon CV (PDF)
        </a>
        </div>

        <MotionCard className="w-40 sm:w-64 md:w-72 shrink-0 rounded-2xl border border-border bg-card overflow-hidden">
          <img
            src={profileImg}
            alt="Portrait de l'auteur du portfolio"
            className="w-full aspect-square object-cover"
          />
        </MotionCard>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="text-2xl font-semibold tracking-tight">Expériences</h2>
        <div className="mt-6 space-y-6">
          {experiences.map((e, i) => (
            <MotionCard key={e.period} delay={i * 80} className="border-l-2 border-border pl-5 rounded-r-xl">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {e.period}
              </div>
              <div className="mt-1 font-semibold">
                {e.role} · <span className="text-muted-foreground">{e.org}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
            </MotionCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="text-2xl font-semibold tracking-tight">Compétences</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {Object.entries(skills).map(([cat, items], i) => (
            <MotionCard key={cat} delay={i * 80} className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold">{cat}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {items.map((s) => (
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

      <section className="mx-auto max-w-3xl px-6 py-10 pb-24">
        <h2 className="text-2xl font-semibold tracking-tight">Formation</h2>
        <div className="mt-6 space-y-4 text-sm">
          <div>
            <div className="font-semibold">Diplôme d'ingénieur (provisoire)</div>
            <div className="text-muted-foreground">École — Année</div>
          </div>
          <div>
            <div className="font-semibold">Spécialisation IA / Data (provisoire)</div>
            <div className="text-muted-foreground">Programme — Année</div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
