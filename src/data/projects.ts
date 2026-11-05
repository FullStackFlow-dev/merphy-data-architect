import pythonPreview from "../assets/project-python.jpg";
import engineeringPreview from "../assets/project-engineering.jpg";
import analyticsPreview from "../assets/project-analytics.jpg";

export type Project = {
  slug: string;
  title: string;
  domain: "Développement Python" | "Data Analyste" | "Data Engineer";
  summary: string;
  tags: string[];
  year: string;
  content: string;
  embedUrl?: string;
  /** URLs publiques exactes. Laisser vide si elles ne sont pas disponibles. */
  githubUrl?: string;
  demoUrl?: string;
  /** Remplacer par une capture réelle lorsque disponible. */
  previewImage: string;
  previewIsIllustration?: boolean;
};

export const projects: Project[] = [
  {
    slug: "mobilite-urbaine-senegal",
    title: "Mobilité urbaine au Sénégal",
    domain: "Data Engineer",
    summary: "Données synthétiques réalistes de VTC au Sénégal et pipeline Bronze / Silver / Gold pour tester une plateforme BI multi-sources.",
    tags: ["Python", "Faker", "SQL Server", "ETL/ELT", "pytest"],
    year: "2026",
    githubUrl: "https://github.com/merphy-mademba/Mirah-BI-Urban-Mobility-Analytics",
    previewImage: engineeringPreview,
    previewIsIllustration: true,
    content: "Projet de référence reproduisant le fonctionnement des plateformes de VTC au Sénégal : chauffeurs, passagers, véhicules, courses, paiements, zones de Dakar, évaluations et incidents. La génération est reproductible grâce à une graine (seed) et une volumétrie paramétrable, avec des heures de pointe et une tarification en FCFA.\n\nL’architecture distingue les données brutes et métadonnées d’ingestion (Bronze), le nettoyage, le typage et l’enrichissement (Silver), puis les agrégats, KPI et modèles analytiques (Gold). SQL Server est le SGBD cible. Les contrôles d’intégrité, de cohérence temporelle et de plausibilité, ainsi que les tests pytest, servent à valider la qualité et la robustesse de la plateforme BI sans utiliser de données personnelles réelles.",
  },
  {
    slug: "plateforme-api-python",
    githubUrl: "",
    demoUrl: "",
    previewImage: pythonPreview,
    previewIsIllustration: true,
    title: "API métier avec FastAPI",
    domain: "Développement Python",
    summary:
      "API REST robuste et documentée, authentification, tests et déploiement continu.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Docker", "Git"],
    year: "2025",
    content:
      "Architecture modulaire, tests unitaires et d'intégration, CI/CD. Contenu provisoire à remplacer.",
  },
  {
    slug: "pipeline-data-etl",
    githubUrl: "",
    demoUrl: "",
    previewImage: engineeringPreview,
    previewIsIllustration: true,
    title: "Pipeline ETL analytique",
    domain: "Data Engineer",
    summary:
      "Ingestion, nettoyage et modélisation de millions de lignes pour dashboards décisionnels.",
    tags: ["Python", "Airflow", "dbt", "Snowflake", "SQL"],
    year: "2024",
    content:
      "Orchestration robuste, qualité de données monitorée, KPIs métiers. Contenu provisoire à remplacer.",
  },
  {
    slug: "dashboard-ventes-powerbi",
    githubUrl: "",
    demoUrl: "https://playground.powerbi.com/sampleReportEmbed",
    previewImage: analyticsPreview,
    previewIsIllustration: true,
    title: "Dashboard de ventes Power BI",
    domain: "Data Analyste",
    summary:
      "Analyse descriptive et visualisation interactive des performances commerciales.",
    tags: ["Power BI", "Excel", "Python", "Pandas", "Statistiques"],
    year: "2024",
    content:
      "Nettoyage de données, modélisation DAX, rapports interactifs. Contenu provisoire à remplacer.",
    embedUrl: "https://playground.powerbi.com/sampleReportEmbed",
  },
  {
    slug: "analyse-sentiments-reviews",
    githubUrl: "",
    demoUrl: "",
    previewImage: analyticsPreview,
    previewIsIllustration: true,
    title: "Analyse de sentiments de reviews",
    domain: "Data Analyste",
    summary:
      "Analyse textuelle et statistique d'avis clients pour en extraire les tendances.",
    tags: ["Python", "Pandas", "NLP", "Statistiques", "Visualisation"],
    year: "2025",
    content:
      "Collecte, nettoyage, visualisation et interprétation des résultats. Contenu provisoire à remplacer.",
  },
  {
    slug: "moteur-recommandation",
    githubUrl: "",
    demoUrl: "",
    previewImage: engineeringPreview,
    previewIsIllustration: true,
    title: "Moteur de recommandation",
    domain: "Data Engineer",
    summary:
      "Système de recommandation alimenté par un pipeline de données et des features stores.",
    tags: ["Python", "Airflow", "SQL", "Spark", "dbt"],
    year: "2023",
    content:
      "Feature store, embeddings, ranking et livraison des données. Contenu provisoire à remplacer.",
  },
  {
    slug: "automatisation-etl-python",
    githubUrl: "",
    demoUrl: "",
    previewImage: pythonPreview,
    previewIsIllustration: true,
    title: "Automatisation ETL en Python",
    domain: "Développement Python",
    summary: "Scripts Python d'extraction, transformation et chargement de données.",
    tags: ["Python", "Pandas", "SQL", "Airflow", "Git"],
    year: "2023",
    content:
      "Orchestration de tâches, gestion des erreurs, logging et monitoring. Contenu provisoire à remplacer.",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
