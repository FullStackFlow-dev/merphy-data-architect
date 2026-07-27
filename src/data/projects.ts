export type Project = {
  slug: string;
  title: string;
  domain: "Dev" | "Data Science" | "IA / ML";
  summary: string;
  tags: string[];
  year: string;
  content: string;
};

export const projects: Project[] = [
  {
    slug: "plateforme-saas-temps-reel",
    title: "Plateforme SaaS temps réel",
    domain: "Dev",
    summary:
      "Application full-stack multi-tenant avec collaboration temps réel, auth et facturation.",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "WebSocket"],
    year: "2025",
    content:
      "Architecture modulaire, tests end-to-end, déploiement continu. Contenu provisoire à remplacer.",
  },
  {
    slug: "pipeline-data-etl",
    title: "Pipeline ETL analytique",
    domain: "Data Science",
    summary:
      "Ingestion, nettoyage et modélisation de millions de lignes pour dashboards décisionnels.",
    tags: ["Python", "Airflow", "dbt", "Snowflake", "Pandas"],
    year: "2024",
    content:
      "Orchestration robuste, qualité de données monitorée, KPIs métiers. Contenu provisoire à remplacer.",
  },
  {
    slug: "classification-images-cnn",
    title: "Classification d'images (CNN)",
    domain: "IA / ML",
    summary:
      "Modèle de vision par ordinateur entraîné sur dataset personnalisé, servi via API.",
    tags: ["PyTorch", "CNN", "FastAPI", "Docker"],
    year: "2024",
    content:
      "Fine-tuning ResNet, augmentation, MLOps. Contenu provisoire à remplacer.",
  },
  {
    slug: "nlp-analyse-sentiments",
    title: "Analyse de sentiments NLP",
    domain: "IA / ML",
    summary:
      "Modèle transformer fine-tuné pour la classification de textes multi-langues.",
    tags: ["Transformers", "HuggingFace", "PyTorch"],
    year: "2025",
    content:
      "Distillation, quantization, benchmark. Contenu provisoire à remplacer.",
  },
  {
    slug: "moteur-recommandation",
    title: "Moteur de recommandation",
    domain: "Data Science",
    summary:
      "Système hybride collaboratif + contenu, évalué en A/B testing.",
    tags: ["Python", "Scikit-learn", "Spark"],
    year: "2023",
    content:
      "Feature store, embeddings, ranking. Contenu provisoire à remplacer.",
  },
  {
    slug: "cli-devtools",
    title: "CLI open source pour devs",
    domain: "Dev",
    summary: "Outil en ligne de commande pour automatiser les workflows de dev.",
    tags: ["Rust", "CLI", "Open source"],
    year: "2023",
    content:
      "Distribution multi-plateforme, plugins. Contenu provisoire à remplacer.",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
