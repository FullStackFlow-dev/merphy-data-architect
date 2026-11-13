import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "../components/SiteLayout";
import { MotionCard } from "../components/motion";

export const Route = createFileRoute("/demos")({
  head: () => ({
    meta: [
      { title: "Démos IA & Éditeur SQL — Merphy Mademba" },
      { name: "description", content: "Testez en direct des démonstrations IA et un éditeur SQL PostgreSQL interactif." },
      { property: "og:title", content: "Démos IA & Éditeur SQL — Merphy Mademba" },
      { property: "og:description", content: "Démos interactives IA et éditeur SQL PostgreSQL en ligne." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DemosPage,
});

const demos = [
  {
    id: "sentiment",
    title: "Analyse de sentiment",
    desc: "Classifie un texte en positif / négatif / neutre.",
    tag: "NLP",
  },
  {
    id: "vision",
    title: "Classification d'image",
    desc: "Prédit la classe d'une image téléchargée.",
    tag: "Vision",
  },
  {
    id: "forecast",
    title: "Prévision de séries temporelles",
    desc: "Prédit les prochaines valeurs d'une série.",
    tag: "ML",
  },
  {
    id: "llm",
    title: "Résumé de texte (LLM)",
    desc: "Résume automatiquement un texte long.",
    tag: "LLM",
  },
];

function DemosPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-10">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
          Démos IA / ML
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Testez les modèles en direct
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Démonstrations interactives. Les modèles sont simulés — contenu
          provisoire à brancher sur les vrais endpoints.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10 grid gap-6 md:grid-cols-2">
        {demos.map((d, i) => (
          <MotionCard key={d.id} delay={(i % 2) * 90} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-medium">
                {d.tag}
              </span>
            </div>
            <h2 className="mt-3 text-lg font-semibold">{d.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
            <div className="mt-5">
              <DemoRunner id={d.id} />
            </div>
          </MotionCard>
        ))}
      </section>
    </SiteLayout>
  );
}

function DemoRunner({ id }: { id: string }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 600));
    if (id === "sentiment") {
      const positive = /bon|super|génial|adore|excellent/i.test(input);
      const negative = /mauvais|nul|horrible|déteste|pire/i.test(input);
      setResult(positive ? "Positif (0.92)" : negative ? "Négatif (0.88)" : "Neutre (0.61)");
    } else if (id === "vision") {
      setResult("Prédiction (démo) : chat (0.87) · chien (0.09) · autre (0.04)");
    } else if (id === "forecast") {
      const nums = input.split(/[,\s]+/).map(Number).filter((n) => !isNaN(n));
      const last = nums[nums.length - 1] ?? 0;
      const next = [last + 1.2, last + 2.1, last + 3.0].map((n) => n.toFixed(2)).join(", ");
      setResult(nums.length ? `Prévisions : ${next}` : "Entrez une série de nombres.");
    } else {
      setResult(input ? `Résumé (démo) : ${input.slice(0, 80)}…` : "Entrez un texte à résumer.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-3">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          id === "forecast"
            ? "ex : 1, 2, 3, 4, 5"
            : id === "vision"
            ? "(démo) collez une URL d'image"
            : "Saisissez du texte…"
        }
        className="w-full min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <button
        onClick={run}
        disabled={loading}
        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Analyse…" : "Lancer"}
      </button>
      {result && (
        <div className="rounded-md border border-border bg-muted/40 p-3 text-sm">
          {result}
        </div>
      )}
    </div>
  );
}
