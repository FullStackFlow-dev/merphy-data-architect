export type Experience = {
  period: string;
  role: string;
  org: string;
  desc: string;
  type?: string;
  responsibilities?: string[];
};

export const experiences: Experience[] = [
  {
    period: "Depuis août 2026",
    role: "Ingénieur de données et ingénieur bases de données",
    org: "MIRAHTEC · Équipe Data / BI · Plateforme MIRAH-BI",
    type: "Stage",
    desc: "Contribution à la conception et à l’évolution d’une plateforme BI multi-sources : modélisation des données, développement de flux de préparation et validation de connecteurs dans des environnements de test.",
    responsibilities: [
      "Concevoir et modéliser les bases de données et leurs schémas.",
      "Structurer des données issues de sources multiples.",
      "Développer des traitements ETL / ELT avec Python et SQL.",
      "Mettre en œuvre une organisation Bronze / Silver / Gold.",
      "Concevoir et valider des schémas de bases de données.",
      "Tester des connecteurs PostgreSQL, MySQL, SQL Server et Snowflake en environnement de développement.",
      "Contrôler la qualité, la cohérence et l’intégrité des données.",
      "Préparer les données destinées aux analyses décisionnelles et à Power BI.",
      "Documenter les choix techniques et contribuer à la gouvernance des données.",
      "Contribuer à la conception et à l’évolution de la plateforme MIRAH-BI.",
    ],
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
