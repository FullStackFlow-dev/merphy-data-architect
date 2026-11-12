import pythonPreview from "../assets/project-python.jpg";
import engineeringPreview from "../assets/project-engineering.jpg";
import analyticsPreview from "../assets/project-analytics.jpg";
import dwiWeather from "../assets/dwi-weather-intelligence.jpg";
import dwiCold from "../assets/dwi-cold-weather.jpg";
import dwiEtl from "../assets/dwi-etl-pipeline.jpg";
import dwiAnalytics from "../assets/dwi-analytics.jpg";

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
  status?: "En développement";
  modules?: { name: string; description: string }[];
  gallery?: { image: string; caption: string }[];
};

export const projects: Project[] = [
  {
    slug: "dakar-weather-intelligence",
    title: "Dakar Weather Intelligence (DWI)",
    domain: "Data Engineer",
    summary: "Plateforme intelligente de collecte, d'analyse et de prévision météorologique pour Dakar.",
    tags: ["Data Engineering", "ETL", "Analyse de données", "Power BI", "Météorologie"],
    year: "2026",
    status: "En développement",
    githubUrl: "https://github.com/FullStackFlow-dev/Dakar-Weather-Intelligence_-DWI-",
    previewImage: dwiWeather,
    previewIsIllustration: false,
    content: "Dakar Weather Intelligence (DWI) est un projet en cours de développement à la croisée de l’ingénierie des données, de l’analyse et de la Business Intelligence. La plateforme vise à collecter, analyser et prévoir les conditions météorologiques de Dakar. Elle s’organise autour de quatre modules complémentaires.",
    modules: [
      { name: "Weather Intelligence", description: "Collecte, analyse et prévision météorologique pour Dakar." },
      { name: "Cold Weather Intelligence", description: "Analyse des épisodes de froid et des risques associés." },
      { name: "ETL Data Pipeline", description: "Extraction, transformation et chargement des données pour alimenter les analyses." },
      { name: "Power BI Analytics", description: "Tableaux de bord et visualisations des données météorologiques." },
    ],
    gallery: [
      { image: dwiWeather, caption: "Weather Intelligence — aperçu fourni" },
      { image: dwiCold, caption: "Cold Weather Intelligence — aperçu fourni" },
      { image: dwiEtl, caption: "ETL Data Pipeline — aperçu fourni" },
      { image: dwiAnalytics, caption: "Power BI Analytics — aperçu fourni" },
    ],
  },
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

export const getProjectLinks = (project: Project) => ({
  github: project.githubUrl || undefined,
  demo: project.demoUrl || undefined,
});
