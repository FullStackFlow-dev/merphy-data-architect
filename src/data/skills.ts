/**
 * Données centralisées des compétences par domaine professionnel.
 * Reflète fidèlement le positionnement réel : expérience effective,
 * technologies en cours d'apprentissage ou d'expérimentation distinguées.
 */

export type SkillLevel = "maîtrisé" | "pratiqué" | "en apprentissage";

export type SkillItem = {
  name: string;
  /** Clé dans TechIcon.map — omis si pas d'icône disponible */
  icon?: string;
  level?: SkillLevel;
};

export type SkillGroup = {
  /** Sous-titre de groupe à l'intérieur d'un domaine */
  label: string;
  items: SkillItem[];
};

export type SkillDomain = {
  id: string;
  title: string;
  subtitle: string;
  /** Couleur d'accent du domaine (classe Tailwind CSS inline-safe) */
  accentClass: string;
  /** Icône principale du domaine (clé TechIcon ou nom lucide) */
  icon: string;
  groups: SkillGroup[];
};

export const skillDomains: SkillDomain[] = [
  {
    id: "database-engineering",
    title: "Database Engineering",
    subtitle: "Ingénierie des bases de données",
    accentClass: "text-blue-400",
    icon: "database",
    groups: [
      {
        label: "Conception & modélisation",
        items: [
          { name: "Database Design & Modeling" },
          { name: "Dimensional Modeling" },
          { name: "Data Integrity & Constraints" },
          { name: "Query Optimization" },
        ],
      },
      {
        label: "Administration & sécurité",
        items: [
          { name: "Database Administration" },
          { name: "Database Security & Access Control" },
          { name: "Backup & Recovery" },
          { name: "Performance Tuning" },
        ],
      },
      {
        label: "SGBD",
        items: [
          { name: "PostgreSQL", icon: "PostgreSQL" },
          { name: "MySQL", icon: "MySQL" },
          { name: "SQL Server", icon: "SQL Server" },
          { name: "SQL", icon: "SQL" },
        ],
      },
    ],
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    subtitle: "Ingénierie des données",
    accentClass: "text-emerald-400",
    icon: "workflow",
    groups: [
      {
        label: "Pipelines & intégration",
        items: [
          { name: "ETL / ELT Pipelines", icon: "dbt" },
          { name: "Data Ingestion" },
          { name: "Data Transformation" },
          { name: "API Data Integration" },
          { name: "Workflow Orchestration", icon: "Airflow" },
        ],
      },
      {
        label: "Qualité & automatisation",
        items: [
          { name: "Data Cleaning & Validation" },
          { name: "Data Quality" },
          { name: "Data Automation" },
          { name: "Bronze / Silver / Gold" },
        ],
      },
      {
        label: "Outils & langages",
        items: [
          { name: "Python", icon: "Python" },
          { name: "Pandas", icon: "Pandas" },
          { name: "NumPy" },
          { name: "Apache Airflow", icon: "Airflow" },
          { name: "SQL", icon: "SQL" },
        ],
      },
    ],
  },
  {
    id: "data-analytics-bi",
    title: "Data Analytics & BI",
    subtitle: "Analyse de données et Business Intelligence",
    accentClass: "text-violet-400",
    icon: "bar-chart-2",
    groups: [
      {
        label: "Analyse & statistiques",
        items: [
          { name: "Exploratory Data Analysis (EDA)" },
          { name: "Statistical Analysis", icon: "Statistiques" },
          { name: "KPI Development" },
          { name: "Reporting & Data Storytelling" },
        ],
      },
      {
        label: "Visualisation & outils BI",
        items: [
          { name: "Power BI", icon: "Power BI" },
          { name: "DAX" },
          { name: "Dashboard Design" },
          { name: "Data Visualization" },
          { name: "Excel", icon: "Excel" },
          { name: "Matplotlib & Seaborn" },
        ],
      },
      {
        label: "Python analytique",
        items: [
          { name: "Python", icon: "Python" },
          { name: "Pandas", icon: "Pandas" },
        ],
      },
    ],
  },
  {
    id: "data-architecture",
    title: "Data Architecture",
    subtitle: "Architecture des données",
    accentClass: "text-amber-400",
    icon: "layers",
    groups: [
      {
        label: "Conception architecturale",
        items: [
          { name: "Data Architecture Design" },
          { name: "Data Warehouse" },
          { name: "Data Modeling" },
          { name: "Data Integration Architecture" },
        ],
      },
      {
        label: "Modèles & patterns",
        items: [
          { name: "Star Schema & Snowflake Schema" },
          { name: "Medallion Architecture (Bronze / Silver / Gold)" },
          { name: "Dimensional Modeling" },
          { name: "Data Lake & Lakehouse Concepts" },
        ],
      },
      {
        label: "Plateformes cloud",
        items: [
          { name: "Snowflake", icon: "Snowflake" },
          { name: "Google BigQuery" },
          { name: "Cloud Data Platforms" },
          { name: "Data Governance" },
        ],
      },
    ],
  },
];
