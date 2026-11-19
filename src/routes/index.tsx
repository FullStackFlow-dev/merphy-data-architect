import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ComponentType } from "react";
import { SiteLayout } from "../components/SiteLayout";
import { projects } from "../data/projects";
import { MotionCard, Reveal } from "../components/motion";
import { certGroups, type CertStatus } from "../data/certifications";
import { TbDatabase, TbCode, TbChartBar, TbCheck, TbClock, TbCertificate } from "react-icons/tb";
import profileImg from "../assets/profile.jpg";
import cvPdf from "../assets/cv.pdf";
import { Download, Code2, Database, BarChart3, Cloud, GitBranch, Layers3, Sigma, Workflow } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { TechIcon } from "../components/TechIcon";
import { SiNumpy, SiMysql, SiMariadb, SiMongodb, SiGooglebigquery, SiApachehadoop, SiNodedotjs, SiExpress, SiGithubactions, SiGooglecloud } from "react-icons/si";
import { LINKEDIN_URL, GITHUB_URL } from "../components/SiteLayout";
import { ProjectCard } from "../components/ProjectCard";
import { Button } from "../components/ui/button";
import { ProfileTitle } from "../components/ProfileTitle";
import { experiences, skills } from "../data/profile";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Merphy Mademba — Ingénieur de données et architecte de bases de données" },
      {
        name: "description",
        content:
          "Portfolio de Merphy Mademba : ingénieur de données et architecte de bases de données. Python, SQL, PostgreSQL, MySQL, SQL Server, Airflow, Power BI ; conception de pipelines ETL & ELT.",
      },
      { property: "og:title", content: "Merphy Mademba — Ingénieur de données et architecte de bases de données" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:description",
        content: "Conception de pipelines ETL & ELT — Python, SQL, PostgreSQL, MySQL, SQL Server, Airflow, Power BI.",
      },
    ],
  }),
  component: Index,
});

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

type SkillItem = {
  name: string;
  learning?: boolean;
  uses?: { slug: string; description: string }[];
};

const skillGroups: { title: string; icon: typeof Database; skills: SkillItem[] }[] = [
  {
    title: "Ingénierie des données",
    icon: Workflow,
    skills: [
      { name: "Python", uses: [{ slug: "dakar-weather-intelligence", description: "Socle applicatif et environnement de développement du projet." }, { slug: "mobilite-urbaine-senegal", description: "Génération des données synthétiques et scripts du projet." }] },
      { name: "Pandas" }, { name: "NumPy" },
      { name: "ETL / ELT", uses: [{ slug: "mobilite-urbaine-senegal", description: "Pipeline organisé en couches Bronze, Silver et Gold." }] },
      { name: "Apache Airflow" }, { name: "dbt" }, { name: "Snowflake" }, { name: "BigQuery" },
      { name: "Apache Spark" }, { name: "Kafka" }, { name: "Hadoop" }, { name: "Databricks" },
      { name: "Faker", uses: [{ slug: "mobilite-urbaine-senegal", description: "Création de données synthétiques réalistes pour les scénarios VTC." }] },
    ],
  },
  {
    title: "Bases de données et architecture",
    icon: Database,
    skills: [
      { name: "PostgreSQL", uses: [{ slug: "dakar-weather-intelligence", description: "Base de données de développement configurée pour le projet." }] },
      { name: "MySQL" }, { name: "MariaDB" }, { name: "SQL Server", uses: [{ slug: "mobilite-urbaine-senegal", description: "SGBD cible de la plateforme analytique." }] },
      { name: "Oracle" }, { name: "MongoDB" }, { name: "SQL", uses: [{ slug: "mobilite-urbaine-senegal", description: "Requêtes et structures de données du projet analytique." }] },
      { name: "Modélisation des données" }, { name: "Architecture des bases de données" },
    ],
  },
  {
    title: "Analyse de données et BI",
    icon: BarChart3,
    skills: [
      { name: "Power BI" }, { name: "Excel" }, { name: "Pandas" }, { name: "Python" },
      { name: "Statistiques" }, { name: "Visualisation de données" }, { name: "KPI" },
    ],
  },
  {
    title: "Développement backend et API",
    icon: Code2,
    skills: [
      { name: "Python", uses: [{ slug: "dakar-weather-intelligence", description: "Socle applicatif et environnement de développement du projet." }, { slug: "mobilite-urbaine-senegal", description: "Génération des données synthétiques et scripts du projet." }] },
      { name: "FastAPI" }, { name: "Django" }, { name: "Flask" }, { name: "Node.js" }, { name: "Express" }, { name: "API REST" },
    ],
  },
  {
    title: "DevOps, cloud et sécurité",
    icon: Cloud,
    skills: [
      { name: "Docker", uses: [{ slug: "dakar-weather-intelligence", description: "Environnement local conteneurisé pour la base PostgreSQL." }] },
      { name: "Git" }, { name: "GitHub Actions" }, { name: "CI / CD" },
      { name: "AWS" }, { name: "GCP" },
      { name: "Tests automatisés", uses: [{ slug: "mobilite-urbaine-senegal", description: "Vérifications automatisées avec pytest." }] },
    ],
  },
];

function SkillGrid() {
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);
  const [pinnedSkill, setPinnedSkill] = useState<string | null>(null);
  const activeUses = activeSkill?.uses ?? [];
  const selectedProjectItems = activeUses
    .map((use) => ({ ...use, project: projects.find((project) => project.slug === use.slug) }))
    .filter((use) => use.project);

  return (
    <div onKeyDown={(event) => { if (event.key === "Escape") { setActiveSkill(null); setPinnedSkill(null); } }} onMouseLeave={() => { if (!pinnedSkill) setActiveSkill(null); }}>
      <div className="grid gap-5 md:grid-cols-2">
        {skillGroups.map((group) => {
          const GroupIcon = group.icon;
          return (
            <MotionCard key={group.title} className="rounded-2xl border border-border/80 bg-card/70 p-5 md:p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                  <GroupIcon aria-hidden="true" className="h-4 w-4" />
                </span>
                <h3 className="font-semibold">{group.title}</h3>
              </div>
              <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                {group.skills.map((skill) => {
                  const selected = activeSkill?.name === skill.name;
                  return (
                    <button
                      key={skill.name}
                      type="button"
                      aria-expanded={selected}
                      aria-controls="skill-project-uses"
                      onMouseEnter={() => { if (!pinnedSkill) setActiveSkill(skill); }}
                      onFocus={() => { if (!pinnedSkill) setActiveSkill(skill); }}
                      onClick={() => {
                        if (pinnedSkill === skill.name) {
                          setPinnedSkill(null);
                          setActiveSkill(null);
                        } else {
                          setPinnedSkill(skill.name);
                          setActiveSkill(skill);
                        }
                      }}
                      className={`group relative flex aspect-square min-w-0 flex-col items-center justify-center gap-2 rounded-xl border p-2 text-center transition duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${selected ? "border-primary/60 bg-primary/10 text-foreground" : "border-border/70 bg-background/50 text-muted-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent/60 hover:text-foreground"}`}
                    >
                      <SkillMark name={skill.name} />
                      <span className="line-clamp-2 text-[11px] leading-tight sm:text-xs">{skill.name}</span>
                      {skill.learning ? <span className="text-[9px] leading-none text-primary">En apprentissage</span> : null}
                    </button>
                  );
                })}
              </div>
            </MotionCard>
          );
        })}
      </div>
      <div
        id="skill-project-uses"
        role="region"
        aria-live="polite"
        aria-label="Projets utilisant la compétence sélectionnée"
        className="mt-5 min-h-24 rounded-2xl border border-border/80 bg-card/60 p-5 md:p-6"
      >
        <div className="flex items-start gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
            <GitBranch aria-hidden="true" className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold">Utilisé dans{activeSkill ? ` · ${activeSkill.name}` : ""}</h3>
            {activeSkill?.learning ? <p className="mt-2 text-sm text-primary">Compétence en apprentissage.</p> : null}
            {selectedProjectItems.length > 0 ? (
              <ul className="mt-3 space-y-3">
                {selectedProjectItems.map(({ slug, description, project }) => (
                  <li key={slug} className="text-sm">
                    <Link to="/projects/$slug" params={{ slug }} className="font-medium text-foreground underline decoration-primary/50 underline-offset-4 hover:text-primary">{project!.title}</Link>
                    <p className="mt-1 text-muted-foreground">{description}</p>
                  </li>
                ))}
              </ul>
            ) : activeSkill && !activeSkill.learning ? (
              <p className="mt-2 text-sm text-muted-foreground">Aucun projet présenté ne documente encore cet usage.</p>
            ) : !activeSkill ? (
              <p className="mt-2 text-sm text-muted-foreground">Survolez une compétence, ou sélectionnez-la au clavier ou au toucher, pour voir les projets associés.</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Couleurs officielles de chaque technologie/stack (icône dans la tuile). */
const SKILL_ICON_COLOR: Record<string, string> = {
  // Langages
  Python:            "text-yellow-400",
  SQL:               "text-orange-300",
  // Bases de données
  PostgreSQL:        "text-sky-400",
  MySQL:             "text-blue-400",
  MariaDB:           "text-amber-700",
  "SQL Server":      "text-red-400",
  Oracle:            "text-red-500",
  MongoDB:           "text-green-500",
  Snowflake:         "text-cyan-400",
  BigQuery:          "text-blue-500",
  // Data Engineering
  Airflow:           "text-teal-400",
  "Apache Airflow":  "text-teal-400",
  Pandas:            "text-violet-400",
  NumPy:             "text-sky-500",
  dbt:               "text-orange-400",
  Spark:             "text-orange-500",
  "Apache Spark":    "text-orange-500",
  Kafka:             "text-slate-200",
  Hadoop:            "text-yellow-500",
  Databricks:        "text-red-400",
  // Dev & DevOps
  Docker:            "text-sky-400",
  Git:               "text-orange-500",
  "GitHub Actions":  "text-purple-400",
  "Node.js":         "text-green-500",
  Express:           "text-slate-300",
  FastAPI:           "text-teal-400",
  Django:            "text-green-600",
  Flask:             "text-slate-300",
  GCP:               "text-blue-400",
  AWS:               "text-orange-400",
  // Dev & API
  "API REST":        "text-sky-400",
  "CI / CD":         "text-violet-400",
  "Tests automatisés": "text-green-400",
  // Data
  "ETL / ELT":       "text-orange-400",
  Faker:             "text-teal-400",
  // BI & analyse
  "Power BI":        "text-yellow-400",
  Excel:             "text-green-500",
  KPI:               "text-violet-400",
  "Visualisation de données": "text-cyan-400",
  Statistiques:      "text-purple-400",
  // Architecture & modélisation
  "Modélisation des données":           "text-blue-400",
  "Architecture des bases de données":  "text-sky-400",
};

function SkillMark({ name }: { name: string }) {
  const aliases: Record<string, string> = {
    "Apache Airflow": "Airflow",
    "Apache Spark":   "Spark",
    "Apache Kafka":   "Kafka",
    "Apache Hadoop":  "Hadoop",
  };
  const iconName = aliases[name] ?? name;
  const color = SKILL_ICON_COLOR[name] ?? SKILL_ICON_COLOR[iconName] ?? "text-muted-foreground";

  const logos: Record<string, ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
    NumPy: SiNumpy, MySQL: SiMysql, MariaDB: SiMariadb, MongoDB: SiMongodb,
    BigQuery: SiGooglebigquery, Hadoop: SiApachehadoop,
    "Node.js": SiNodedotjs, Express: SiExpress, "GitHub Actions": SiGithubactions,
    GCP: SiGooglecloud,
  };
  const Logo = logos[name];
  if (Logo) return <Logo aria-hidden="true" className={`h-7 w-7 ${color}`} />;

  const brandedNames = new Set([
    "Python", "PostgreSQL", "Spark", "Docker", "Airflow", "dbt", "SQL", "Snowflake",
    "FastAPI", "Django", "Git", "Pandas", "Excel", "Flask", "Kafka", "Databricks",
  ]);
  if (brandedNames.has(iconName)) return <TechIcon name={iconName} className={`h-7 w-7 ${color}`} />;

  const Icon = /SQL|base|modélisation|architecture/i.test(name)
    ? Database
    : /statistique|KPI|visualisation/i.test(name)
      ? Sigma
      : /ETL|Faker/i.test(name)
          ? Layers3
          : /cloud|CI|tests/i.test(name)
            ? GitBranch
            : Code2;
  return <Icon aria-hidden="true" className={`h-7 w-7 ${color}`} />;
}

function Index() {
  const featured = projects.filter((project) => ["dakar-weather-intelligence", "wal-transit-engine", "artenova-shop"].includes(project.slug));
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_18%_0%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_55%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.12] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-primary">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
              Portfolio · Dakar, Sénégal
            </p>
            <p className="mt-6 text-sm font-medium tracking-wide text-muted-foreground">Merphy Mademba</p>
            <ProfileTitle />
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Je transforme les données en systèmes fiables : bases bien modélisées,
              pipelines lisibles et outils utiles à la décision.
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-primary/85">
              Python · SQL · PostgreSQL · Airflow · Power BI
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition hover:-translate-y-0.5 hover:opacity-90">
                Explorer les projets
              </Link>
              <Link to="/contact" className="inline-flex items-center rounded-md border border-border bg-background/60 px-5 py-3 text-sm font-medium transition hover:border-primary/40 hover:bg-accent">
                Me contacter
              </Link>
              <a href={cvPdf} download="CV-Merphy.pdf" className="inline-flex items-center gap-2 rounded-md px-3 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground">
                <Download className="h-4 w-4" /> Télécharger le CV
              </a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-border/70 pt-6">
              <div><p className="text-2xl font-semibold tabular-nums">{Object.keys(skills).length}</p><p className="mt-1 text-xs text-muted-foreground">domaines d’expertise</p></div>
              <div><p className="text-2xl font-semibold tabular-nums">{projects.length}</p><p className="mt-1 text-xs text-muted-foreground">projets présentés</p></div>
              <div><p className="text-2xl font-semibold tabular-nums">{certGroups.flatMap((group) => group.items).filter((item) => item.status === "certifie").length}</p><p className="mt-1 text-xs text-muted-foreground">certifications obtenues</p></div>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div aria-hidden="true" className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
            <MotionCard className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-2 shadow-2xl shadow-black/20">
              <img src={profileImg} alt="Merphy Mademba — ingénieur de données et architecte de bases de données" width={640} height={640} className="aspect-square w-full rounded-xl object-cover" loading="eager" />
              <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/15 bg-background/85 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.15em] text-primary">Data · Architecture · Analytics</p>
                <p className="mt-1 font-medium">Des fondations solides pour mieux décider.</p>
              </div>
            </MotionCard>
          </div>
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

      {/* Compétences */}
      <section id="competences" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 md:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Savoir-faire</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Compétences &amp; Technologies</h2>
          <p className="mt-4 text-muted-foreground">Technologies et méthodes classées par domaine. Sélectionnez une tuile pour découvrir où elle est mise en pratique.</p>
        </div>
        <SkillGrid />
      </section>

      {/* Expérience */}
      <section id="experience" className="border-y border-border/60 bg-card/25">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Parcours professionnel</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Expérience</h2>
            <p className="mt-4 text-muted-foreground">Les missions et réalisations qui structurent mon parcours dans la donnée.</p>
          </div>
          <div className="space-y-4">
            {experiences.map((experience, index) => (
              <MotionCard key={experience.period} delay={index * 80} className="grid gap-5 rounded-2xl border border-border/80 bg-card p-6 md:grid-cols-[190px_1fr] md:p-8">
                <p className="text-sm font-medium text-primary">{experience.period}</p>
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold">{experience.role}</h3>
                    {experience.type ? <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{experience.type}</span> : null}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{experience.org}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{experience.desc}</p>
                  {experience.responsibilities?.length ? <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">{experience.responsibilities.map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true" className="text-primary">•</span><span>{item}</span></li>)}</ul> : null}
                </div>
              </MotionCard>
            ))}
          </div>
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

        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          {[
            { label: "Certifications obtenues", value: certGroups.flatMap((group) => group.items).filter((item) => item.status === "certifie").length },
            { label: "Parcours en cours", value: certGroups.flatMap((group) => group.items).filter((item) => item.status === "en-cours").length },
            { label: "Domaines de formation", value: certGroups.length },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border/70 bg-card/60 px-4 py-4">
              <p className="text-2xl font-semibold tabular-nums">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

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
                        {c.issuedOn ? <span className="mt-1 block text-xs text-muted-foreground">Certificat de cours · {c.issuedOn}</span> : null}
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
                        {c.documentUrl ? (
                          <Button asChild variant="link" size="sm" className="mt-1 h-auto justify-start whitespace-normal px-0 py-1 text-left text-xs">
                            <a href={c.documentUrl} download="Certificat-Gestion-analyse-donnees-Merphy-Mademba.pdf">
                              <Download className="h-3.5 w-3.5" /> Télécharger le certificat (PDF)
                            </a>
                          </Button>
                        ) : null}
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

      {/* Écrits */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <MotionCard className="flex flex-col gap-6 rounded-2xl border border-primary/20 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_10%,var(--card)),var(--card)_65%)] p-7 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Notes et retours d’expérience</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Écrits</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">Articles et ressources en français autour de Python, des bases de données, de l’ingénierie des données et de l’analyse décisionnelle.</p>
          </div>
          <Link to="/blog" className="inline-flex shrink-0 items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">Parcourir les écrits →</Link>
        </MotionCard>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <MotionCard className="rounded-2xl border border-border bg-card p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Un projet en tête ?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Discutons de vos besoins en développement et en data.
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
