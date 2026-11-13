import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { MotionCard } from "../components/motion";
import profileImg from "../assets/profile.jpg";
import cvPdf from "../assets/cv.pdf";
import { Download } from "lucide-react";
import { Button } from "../components/ui/button";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos & CV — Merphy Mademba" },
      { name: "description", content: "Parcours de Merphy Mademba, ingénieur de données et architecte de bases de données : plateforme BI multi-sources, Python, SQL, conception de pipelines ETL & ELT et intelligence artificielle." },
      { property: "og:title", content: "À propos & CV — Merphy Mademba" },
      { property: "og:description", content: "Ingénieur de données et architecte de bases de données : expérience BI multi-sources, conception de pipelines ETL & ELT et compétences data, cloud et IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const experiences = [
  {
    period: "Depuis août 2026 · Stage",
    role: "Ingénieur de données et architecte de bases de données",
    org: "Plateforme de Business Intelligence multi-sources",
    desc: "Création de bases de test et génération de données synthétiques réalistes avec Faker. Tests de volumétrie et de robustesse des ingestions et DAGs Airflow, stabilisation des connexions, gouvernance des accès et contrôles qualité dans une architecture Bronze / Silver / Gold.",
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
    "JavaScript", "Node.js", "Express", "React Native",
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
  "Ingénierie de données": [
    "ETL/ELT",
    "Airflow",
    "dbt",
    "Snowflake",
    "BigQuery",
    "SQL",
    "Docker",
    "Kafka", "Spark", "Hadoop", "Databricks", "Faker", "Bronze / Silver / Gold",
  ],
  "Bases de données & sources": ["PostgreSQL", "MySQL", "MariaDB", "SQL Server", "Oracle", "MongoDB", "SAP HANA", "API REST", "SharePoint"],
  "Machine Learning & Deep Learning": ["Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Keras"],
  "DevOps & Cloud": ["Docker", "GitHub Actions", "CI/CD", "Tests automatisés", "AWS", "GCP", "Poetry"],
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
          Ingénieur de données et architecte de bases de données
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Python • SQL • PostgreSQL • MySQL • SQL Server • Airflow • Power BI
        </p>
        <p className="mt-6 text-lg text-muted-foreground">
          Basé au Sénégal, je modélise, optimise et sécurise les données,
          du stockage aux tableaux de bord. Mon approche associe pipelines
          Bronze / Silver / Gold, développement backend Python et analyse BI,
          avec des systèmes documentés, testés et maintenables.
        </p>
        <Button asChild className="mt-6"><a
          href={cvPdf}
          download="CV-Merphy.pdf"
        >
          <Download className="h-4 w-4" /> Télécharger mon CV (PDF)
        </a></Button>
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
            <div className="font-semibold">Développement logiciel, données & bases de données</div>
            <div className="text-muted-foreground">Parcours de formation et apprentissage continu auprès de Meta, IBM, Microsoft et DataCamp.</div>
          </div>
          <div>
            <div className="font-semibold">Objectifs de spécialisation</div>
            <div className="text-muted-foreground">DevOps & Software Engineering, Machine Learning et Deep Learning avec DeepLearning.AI.</div>
          </div>
        </div>
        <blockquote className="mt-8 border-l-2 border-primary pl-5 text-muted-foreground">
          « Je préfère une ligne de code documentée et testée à cent lignes de code “magiques”. »
        </blockquote>
      </section>
    </SiteLayout>
  );
}
