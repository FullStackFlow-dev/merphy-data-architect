import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { MotionCard } from "../components/motion";
import { CodeWorkspace } from "../components/CodeWorkspace";

export const Route = createFileRoute("/demos")({
  head: () => ({
    meta: [
      { title: "Data Lab — Merphy Mademba" },
      { name: "description", content: "Environnements de démonstration pour les données, les bases SQL et l’analyse." },
      { property: "og:title", content: "Data Lab — Merphy Mademba" },
      { property: "og:description", content: "Démonstrations de données et environnements en cours de configuration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DemosPage,
});

const capabilities = [
  {
    title: "PostgreSQL",
    tag: "Démo disponible",
    description: "Requêtes exécutées sur une base PostgreSQL en mémoire et des données synthétiques isolées. Aucune base privée n’est connectée.",
    available: true,
  },
  {
    title: "Python et analyse de données",
    tag: "Bac à sable requis",
    description: "L’exécution est désactivée tant qu’un service serveur isolé avec limites de ressources n’est pas configuré.",
    available: false,
  },
  {
    title: "MySQL et SQL Server",
    tag: "Connexions requises",
    description: "Les instances de démonstration et leurs connexions sécurisées ne sont pas encore configurées.",
    available: false,
  },
  {
    title: "Visualisation et pipelines",
    tag: "En préparation",
    description: "Les tableaux, graphiques et étapes ETL seront affichés à partir de résultats réels lorsque leurs traitements seront intégrés.",
    available: false,
  },
  {
    title: "Modèles et services IA",
    tag: "Indisponible",
    description: "Aucun modèle ni endpoint n’est configuré. Aucun résultat simulé n’est présenté.",
    available: false,
  },
];

function DemosPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-10">
        <p className="mb-3 text-sm uppercase tracking-widest text-primary">Laboratoire de données</p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Data Lab</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Un espace de démonstration construit autour de données synthétiques. Les fonctions non reliées à un moteur réel sont signalées comme indisponibles.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10" aria-labelledby="sql-lab-title">
        <div className="mb-5">
          <h2 id="sql-lab-title" className="text-2xl font-semibold">Éditeur SQL</h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            PostgreSQL utilise une base de démonstration en mémoire. L’exécution reste limitée à des données synthétiques et ne se connecte pas à MIRAHTEC.
            MySQL et SQL Server attendent la configuration de leurs instances isolées.
          </p>
        </div>
        <CodeWorkspace />
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-3" aria-label="État des environnements Data Lab">
        {capabilities.map((capability, index) => (
          <MotionCard key={capability.title} delay={(index % 3) * 70} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-semibold">{capability.title}</h2>
              <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium ${capability.available ? "border-success/35 bg-success/10 text-success" : "border-warning/35 bg-warning/10 text-warning"}`}>
                {capability.tag}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{capability.description}</p>
          </MotionCard>
        ))}
      </section>
    </SiteLayout>
  );
}
