import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { projects } from "../data/projects";
import { MotionCard, Reveal } from "../components/motion";
import profileAsset from "../assets/profile.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portfolio — Ingénieur logiciel, Data Scientist & IA" },
      {
        name: "description",
        content:
          "Portfolio d'un ingénieur logiciel généraliste, data scientist et ingénieur IA en machine learning et deep learning.",
      },
      { property: "og:title", content: "Portfolio — Dev, Data & IA" },
      {
        property: "og:description",
        content: "Projets, démos IA, articles et parcours.",
      },
    ],
  }),
  component: Index,
});

const domains = [
  {
    title: "Ingénierie logicielle",
    tag: "Dev",
    desc: "Applications web et back-ends robustes, scalables et testés. Full-stack TypeScript, Python, Rust.",
    skills: ["React", "Node.js", "PostgreSQL", "Docker", "CI/CD"],
  },
  {
    title: "Data Science",
    tag: "Data",
    desc: "De l'ingestion à la modélisation : pipelines, analyse, visualisation et prise de décision.",
    skills: ["Python", "SQL", "Pandas", "Airflow", "dbt"],
  },
  {
    title: "IA — Machine & Deep Learning",
    tag: "IA",
    desc: "Modèles ML/DL en production : vision, NLP, systèmes de recommandation, LLMs.",
    skills: ["PyTorch", "Transformers", "MLOps", "FastAPI"],
  },
];

function Index() {
  const featured = projects.slice(0, 3);
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/15),transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-20 grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Portfolio
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight max-w-4xl">
            Ingénieur logiciel, Data Scientist &{" "}
            <span className="text-primary">ingénieur IA</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Je conçois des produits logiciels, des pipelines de données et des
            modèles de machine learning et de deep learning — du prototype à la
            mise en production.
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
          </div>
          </div>
          <MotionCard className="mx-auto w-56 md:w-full max-w-xs rounded-2xl border border-border bg-card overflow-hidden">
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
