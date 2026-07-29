import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { MotionCard } from "../components/motion";
import profileAsset from "../assets/profile.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos & CV — Portfolio" },
      { name: "description", content: "Parcours, compétences et expériences." },
      { property: "og:title", content: "À propos & CV" },
      { property: "og:description", content: "Parcours, compétences et expériences." },
    ],
  }),
  component: AboutPage,
});

const experiences = [
  {
    period: "2024 — présent",
    role: "Ingénieur IA / ML",
    org: "Entreprise (provisoire)",
    desc: "Conception et mise en production de modèles ML/DL.",
  },
  {
    period: "2022 — 2024",
    role: "Data Scientist",
    org: "Entreprise (provisoire)",
    desc: "Pipelines analytiques, modèles prédictifs, dashboards.",
  },
  {
    period: "2020 — 2022",
    role: "Ingénieur logiciel full-stack",
    org: "Entreprise (provisoire)",
    desc: "Applications web multi-tenant, APIs et infrastructure.",
  },
];

const skills = {
  Développement: ["TypeScript", "React", "Node.js", "Python", "Rust", "SQL"],
  "Data Science": ["Pandas", "Airflow", "dbt", "Spark", "Snowflake"],
  "IA / ML": ["PyTorch", "TensorFlow", "Transformers", "MLOps", "FastAPI"],
  DevOps: ["Docker", "Kubernetes", "CI/CD", "AWS", "GCP"],
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
          Ingénieur logiciel, data & IA
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Bio provisoire : je construis des produits logiciels et des systèmes
          d'apprentissage automatique, de l'idée à la mise en production. À
          remplacer par votre présentation.
        </p>
        </div>
        <MotionCard className="w-40 sm:w-48 shrink-0 rounded-2xl border border-border bg-card overflow-hidden">
          <img
            src={profileAsset.url}
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
