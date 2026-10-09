export type CertStatus = "certifie" | "en-cours";

export type CertProvider = "IBM" | "Meta" | "Microsoft" | "DataCamp";

export type Certification = {
  name: string;
  provider: CertProvider;
  /** Plateforme d'obtention, affichée en complément du fournisseur. */
  platform?: string;
  status: CertStatus;
};

export type CertGroup = {
  title: string;
  desc: string;
  icon: "database" | "code" | "chart";
  items: Certification[];
};

export const certGroups: CertGroup[] = [
  {
    title: "Data Engineering & Databases",
    desc: "Conception de pipelines et administration de bases de données.",
    icon: "database",
    items: [
      {
        name: "IBM Data Engineering Professional",
        provider: "IBM",
        platform: "Coursera",
        status: "certifie",
      },
      {
        name: "Meta Database Engineer",
        provider: "Meta",
        platform: "Coursera",
        status: "certifie",
      },
      {
        name: "Data Engineer Python & SQL",
        provider: "DataCamp",
        status: "certifie",
      },
      {
        name: "PostgreSQL Administrator",
        provider: "DataCamp",
        status: "en-cours",
      },
    ],
  },
  {
    title: "Développement Python",
    desc: "Du script à l'application : tests, qualité, bonnes pratiques.",
    icon: "code",
    items: [
      {
        name: "Microsoft Certified Python Developer",
        provider: "Microsoft",
        status: "certifie",
      },
      {
        name: "Professional Python Developer",
        provider: "DataCamp",
        status: "certifie",
      },
      {
        name: "Associate Python Developer",
        provider: "DataCamp",
        status: "en-cours",
      },
    ],
  },
  {
    title: "Analytics & Business Intelligence",
    desc: "Analyse descriptive, modélisation et restitution décisionnelle.",
    icon: "chart",
    items: [
      {
        name: "Microsoft Power BI Data Analyst",
        provider: "Microsoft",
        status: "certifie",
      },
      {
        name: "IBM Data Analyst with Python",
        provider: "IBM",
        platform: "Coursera",
        status: "certifie",
      },
    ],
  },
];
