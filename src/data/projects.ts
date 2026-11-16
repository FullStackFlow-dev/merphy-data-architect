import pythonPreview from "../assets/project-python.jpg";
import engineeringPreview from "../assets/project-engineering.jpg";
import analyticsPreview from "../assets/project-analytics.jpg";
import dwiWeather from "../assets/dwi-weather-intelligence.jpg";
import dwiCold from "../assets/dwi-cold-weather.jpg";
import dwiEtl from "../assets/dwi-etl-pipeline.jpg";
import dwiAnalytics from "../assets/dwi-analytics.jpg";

export type ProjectDomain = "Data Engineering" | "Database Engineering" | "BI" | "Backend" | "Full Stack";

export type Project = {
  slug: string;
  title: string;
  domain: "Développement Python" | "Data Analyste" | "Data Engineer" | "Database Engineering" | "Full Stack";
  domains?: ProjectDomain[];
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
    domains: ["Data Engineering", "BI"],
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
    domains: ["Data Engineering", "Database Engineering", "BI"],
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
    domains: ["Backend", "Full Stack"],
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
    domains: ["Data Engineering"],
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
    domains: ["BI"],
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
    slug: "wal-transit-engine",
    title: "WAL Transit Engine — West Africa Logistics Analytics",
    domain: "Data Engineer",
    domains: ["Data Engineering", "Database Engineering", "BI"],
    summary: "Plateforme analytique logistique couvrant dix pays d’Afrique de l’Ouest, conçue pour expérimenter les pipelines et alimenter MIRAH-BI.",
    tags: ["Python", "SQL", "Snowflake", "Bronze / Silver / Gold", "Data Quality"],
    year: "2026",
    status: "En développement",
    githubUrl: "https://github.com/FullStackFlow-dev/WAL-Transit-Engine-West-Africa-Logistics-Transit-Engine-",
    previewImage: engineeringPreview,
    previewIsIllustration: true,
    content: "Projet en développement pour la génération et l’analyse de données logistiques couvrant dix pays d’Afrique de l’Ouest. Le dépôt documente une architecture Bronze / Silver / Gold, le chargement Snowflake, la modélisation dimensionnelle et des KPI logistiques. Les données sont prévues pour des essais et démonstrations de la plateforme MIRAH-BI.",
    modules: [
      { name: "Données logistiques", description: "Génération de scénarios autour des chauffeurs, véhicules, entrepôts, expéditions et livraisons." },
      { name: "Pipeline analytique", description: "Organisation des transformations dans les couches Bronze, Silver et Gold." },
      { name: "Entrepôt Snowflake", description: "Chargement et modélisation des données pour l’analyse; la configuration reste propre à l’environnement de développement." },
      { name: "Qualité et indicateurs", description: "Documentation des contrôles de données et des KPI logistiques." },
    ],
  },
  {
    slug: "artenova-shop",
    title: "ArtéNova Shop",
    domain: "Full Stack",
    domains: ["Full Stack"],
    summary: "Vitrine e-commerce responsive dédiée aux créations, vêtements, chaussures et accessoires, avec catalogue et parcours panier.",
    tags: ["JavaScript", "HTML5", "CSS3", "Responsive Design", "E-commerce"],
    year: "2026",
    status: "En développement",
    githubUrl: "https://github.com/FullStackFlow-dev/Projet-Site-E-commerce-ArteNova-Shop",
    demoUrl: "https://artenova-shoponline.vercel.app",
    previewImage: analyticsPreview,
    previewIsIllustration: true,
    content: "Site e-commerce responsive développé avec HTML5, CSS3 et JavaScript natif. Le dépôt présente une vitrine de produits, des pages de catalogue et de détail, ainsi qu’un parcours autour du panier. La démonstration en ligne est annoncée dans le README du dépôt.",
    modules: [
      { name: "Interface et responsive design", description: "Structure HTML et styles CSS adaptatifs pour les écrans mobiles et desktop." },
      { name: "Catalogue", description: "Pages de produits et de détail organisées pour la navigation." },
      { name: "Interactions", description: "Comportements côté navigateur implémentés en JavaScript natif." },
    ],
  },
  {
    slug: "mirah-bi-urban-mobility-analytics",
    title: "MIRAH-BI Urban Mobility Analytics",
    domain: "Data Engineer",
    domains: ["Data Engineering", "Database Engineering", "BI"],
    summary: "Jeu de données synthétiques de mobilité urbaine privée au Sénégal, conçu comme référence pour développer et valider MIRAH-BI.",
    tags: ["Python", "Faker", "SQL Server", "Bronze / Silver / Gold", "Data Quality"],
    year: "2026",
    status: "En développement",
    githubUrl: "https://github.com/FullStackFlow-dev/Urban-Mobility-Analytics",
    previewImage: engineeringPreview,
    previewIsIllustration: true,
    content: "Projet de référence pour la génération, la structuration et l’analyse de données synthétiques de mobilité urbaine privée au Sénégal. Le dépôt précise que les données réelles de plateformes sont confidentielles. SQL Server reçoit la couche Bronze de MIRAH-BI; les couches Silver et Gold servent de référence technique et méthodologique.",
    modules: [
      { name: "Génération synthétique", description: "Données de mobilité produites avec Python et Faker selon des règles métier documentées." },
      { name: "Couche Bronze", description: "Contrat d’échange destiné à la réception dans SQL Server." },
      { name: "Couches Silver et Gold", description: "Référence documentée pour le nettoyage, l’enrichissement, la modélisation et les KPI." },
      { name: "Qualité des données", description: "Contrôles et conventions décrits dans le dépôt pour fiabiliser les jeux de démonstration." },
    ],
  },
  {
    slug: "mirah-bi-test-platform",
    title: "MIRAH-BI Test Platform",
    domain: "Data Engineer",
    domains: ["Data Engineering", "Database Engineering", "BI"],
    summary: "Environnement de données synthétiques pour préparer, tester et valider les pipelines et connecteurs de la plateforme MIRAH-BI.",
    tags: ["Python", "Pandas", "NumPy", "PostgreSQL", "MySQL", "SQL Server", "Snowflake", "Airflow"],
    year: "2026",
    status: "En développement",
    githubUrl: "https://github.com/FullStackFlow-dev/MIRAH-BI-Test-Platform",
    previewImage: engineeringPreview,
    previewIsIllustration: true,
    content: "Environnement de test et de validation de données décrit dans le dépôt MIRAH-BI Test Platform. Il vise à produire des jeux de données réalistes et reproductibles pour développer les pipelines, tester des connecteurs PostgreSQL, MySQL, SQL Server et Snowflake, valider les processus ETL / ELT et les tableaux de bord Power BI.",
    modules: [
      { name: "Données synthétiques", description: "Jeux de données reproductibles destinés aux phases de conception et de validation." },
      { name: "Connecteurs et pipelines", description: "Scénarios de test pour plusieurs SGBD et les processus ETL / ELT." },
      { name: "Orchestration et BI", description: "Expérimentation avec Apache Airflow et validation de tableaux de bord Power BI." },
      { name: "Contrôles", description: "Vérifications de qualité et tests automatisés prévus par le projet." },
    ],
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
