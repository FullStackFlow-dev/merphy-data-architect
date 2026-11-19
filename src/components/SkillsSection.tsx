import {
  Database,
  Workflow,
  ChartBar,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { MotionCard, Reveal } from "./motion";
import { TechIcon } from "./TechIcon";
import { skillDomains, type SkillDomain } from "../data/skills";

const DOMAIN_ICONS: Record<string, LucideIcon> = {
  database: Database,
  workflow: Workflow,
  "bar-chart-2": ChartBar,
  layers: Layers,
};

/** Barre de couleur d'accent en tête de carte de domaine */
const ACCENT_BORDER: Record<string, string> = {
  "text-blue-400": "border-blue-400/50 bg-blue-400/5",
  "text-emerald-400": "border-emerald-400/50 bg-emerald-400/5",
  "text-violet-400": "border-violet-400/50 bg-violet-400/5",
  "text-amber-400": "border-amber-400/50 bg-amber-400/5",
};

const ACCENT_ICON_BG: Record<string, string> = {
  "text-blue-400": "bg-blue-400/10",
  "text-emerald-400": "bg-emerald-400/10",
  "text-violet-400": "bg-violet-400/10",
  "text-amber-400": "bg-amber-400/10",
};

/**
 * Couleurs officielles de chaque technologie/stack.
 * iconColor  → classe Tailwind pour l'icône SVG (text-*)
 * badgeStyle → classes pour la bordure + fond du badge pill
 * Toutes les valeurs sont des chaînes complètes pour que Tailwind les détecte.
 */
const TECH_COLOR: Record<string, { iconColor: string; badgeStyle: string }> = {
  // ── Langages ──────────────────────────────────────────────────────────────
  Python:          { iconColor: "text-yellow-400",  badgeStyle: "border-yellow-400/40 bg-yellow-400/8" },
  SQL:             { iconColor: "text-orange-300",   badgeStyle: "border-orange-300/40 bg-orange-300/8" },
  // ── Bases de données ───────────────────────────────────────────────────────
  PostgreSQL:      { iconColor: "text-sky-400",      badgeStyle: "border-sky-400/40 bg-sky-400/8" },
  MySQL:           { iconColor: "text-blue-400",     badgeStyle: "border-blue-400/40 bg-blue-400/8" },
  "SQL Server":    { iconColor: "text-red-400",      badgeStyle: "border-red-400/40 bg-red-400/8" },
  Snowflake:       { iconColor: "text-cyan-400",     badgeStyle: "border-cyan-400/40 bg-cyan-400/8" },
  // ── Outils data ───────────────────────────────────────────────────────────
  Airflow:         { iconColor: "text-teal-400",     badgeStyle: "border-teal-400/40 bg-teal-400/8" },
  "Apache Airflow":{ iconColor: "text-teal-400",     badgeStyle: "border-teal-400/40 bg-teal-400/8" },
  Pandas:          { iconColor: "text-violet-400",   badgeStyle: "border-violet-400/40 bg-violet-400/8" },
  dbt:             { iconColor: "text-orange-400",   badgeStyle: "border-orange-400/40 bg-orange-400/8" },
  "ETL / ELT Pipelines": { iconColor: "text-orange-400", badgeStyle: "border-orange-400/40 bg-orange-400/8" },
  "Workflow Orchestration": { iconColor: "text-teal-400", badgeStyle: "border-teal-400/40 bg-teal-400/8" },
  // ── BI & visualisation ────────────────────────────────────────────────────
  "Power BI":      { iconColor: "text-yellow-400",   badgeStyle: "border-yellow-400/40 bg-yellow-400/8" },
  Excel:           { iconColor: "text-green-500",    badgeStyle: "border-green-500/40 bg-green-500/8" },
  Statistiques:    { iconColor: "text-purple-400",   badgeStyle: "border-purple-400/40 bg-purple-400/8" },
  "Statistical Analysis": { iconColor: "text-purple-400", badgeStyle: "border-purple-400/40 bg-purple-400/8" },
};

function DomainCard({
  domain,
  delay,
}: {
  domain: SkillDomain;
  delay: number;
}) {
  const Icon = DOMAIN_ICONS[domain.icon] ?? Database;
  const accentBorder = ACCENT_BORDER[domain.accentClass] ?? "";
  const iconBg = ACCENT_ICON_BG[domain.accentClass] ?? "";

  return (
    <MotionCard
      delay={delay}
      className={`flex flex-col rounded-xl border bg-card p-6 ${accentBorder}`}
    >
      {/* En-tête du domaine */}
      <div className="flex items-start gap-4 mb-5">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
          aria-hidden="true"
        >
          <Icon
            className={`h-5 w-5 ${domain.accentClass}`}
            strokeWidth={1.75}
          />
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold text-base leading-tight">
            {domain.title}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {domain.subtitle}
          </p>
        </div>
      </div>

      {/* Groupes de compétences */}
      <div className="flex flex-col gap-5 flex-1">
        {domain.groups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => {
                const tech = item.icon ? TECH_COLOR[item.icon] ?? TECH_COLOR[item.name] : TECH_COLOR[item.name];
                const iconColor = tech?.iconColor ?? domain.accentClass;
                const badgeStyle = tech?.badgeStyle
                  ? `border ${tech.badgeStyle}`
                  : "border border-border bg-secondary/40";
                return (
                  <span
                    key={item.name}
                    className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-foreground/85 transition-colors hover:brightness-110 ${badgeStyle}`}
                  >
                    {item.icon && (
                      <TechIcon
                        name={item.icon}
                        className={`h-3.5 w-3.5 shrink-0 ${iconColor}`}
                      />
                    )}
                    {item.name}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </MotionCard>
  );
}

/**
 * Section « Compétences & Technologies » structurée en quatre domaines.
 * À insérer dans la page /about.
 */
export function SkillsSection() {
  return (
    <section
      className="mx-auto max-w-5xl px-6 py-10"
      aria-labelledby="skills-heading"
    >
      <Reveal>
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
          Compétences & Technologies
        </p>
        <h2
          id="skills-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Quatre domaines d'expertise
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Compétences acquises et en développement dans le cadre de projets
          concrets, de formations et d'une expérience en ingénierie de données
          et architecture de bases de données.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {skillDomains.map((domain, i) => (
          <DomainCard key={domain.id} domain={domain} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}
