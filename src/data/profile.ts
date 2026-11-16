export type Experience = {
  period: string;
  role: string;
  org: string;
  desc: string;
};

export const experiences: Experience[] = [
  {
    period: "Depuis août 2026 · Stage",
    role: "Ingénieur de données et architecte de bases de données",
    org: "Plateforme de Business Intelligence multi-sources",
    desc: "Création de bases de test et génération de données synthétiques réalistes avec Faker. Tests de volumétrie et de robustesse des ingestions et DAGs Airflow, stabilisation des connexions, gouvernance des accès et contrôles qualité dans une architecture Bronze / Silver / Gold.",
  },
];

export const skills = {
  "Développement Python": [
    "Python",
    "FastAPI",
    "Django",
    "Flask",
    "SQL",
    "Git",
    "Web scraping",
    "JavaScript",
    "Node.js",
    "Express",
    "React Native",
  ],
  "Analyse de données et BI": [
    "Power BI",
    "Excel",
    "Pandas",
    "Python",
    "Statistiques",
    "Visualisation",
    "SQL",
  ],
  "Ingénierie des données": [
    "ETL/ELT",
    "Airflow",
    "dbt",
    "Snowflake",
    "BigQuery",
    "SQL",
    "Docker",
    "Kafka",
    "Spark",
    "Hadoop",
    "Databricks",
    "Faker",
    "Bronze / Silver / Gold",
  ],
  "Bases de données et sources": [
    "PostgreSQL",
    "MySQL",
    "MariaDB",
    "SQL Server",
    "Oracle",
    "MongoDB",
    "SAP HANA",
    "API REST",
    "SharePoint",
  ],
  "DevOps et cloud": [
    "Docker",
    "GitHub Actions",
    "CI/CD",
    "Tests automatisés",
    "AWS",
    "GCP",
    "Poetry",
  ],
} as const;
