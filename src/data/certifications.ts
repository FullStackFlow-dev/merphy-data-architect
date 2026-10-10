export type CertStatus = "certifie" | "en-cours";

export type CertProvider = "IBM" | "Meta" | "Microsoft" | "DataCamp";

export type Certification = {
  name: string;
  provider: CertProvider;
  /** Plateforme d'obtention, affichée en complément du fournisseur. */
  platform?: string;
  status: CertStatus;
  /**
   * Page officielle de vérification de la certification (lien public du
   * diplôme). Renseignez l'URL ici : un bouton « Vérifier » apparaît
   * automatiquement sur la carte. Laissez la chaîne vide tant que le lien
   * n'est pas disponible — le bouton est alors masqué.
   */
  verifyUrl?: string;
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
        name: "IBM Data Engineering Professional Certificate",
        provider: "IBM",
        platform: "Coursera",
        status: "en-cours",
        verifyUrl: "",
      },
      {
        name: "Meta Database Engineer Professional Certificate",
        provider: "Meta",
        platform: "Coursera",
        status: "en-cours",
        verifyUrl: "",
      },
      {
        name: "Data Engineer Python & SQL",
        provider: "DataCamp",
        status: "certifie",
        verifyUrl: "",
      },
      {
        name: "PostgreSQL Administrator",
        provider: "DataCamp",
        status: "certifie",
        verifyUrl: "",
      },
    ],
  },
  {
    title: "Développement Python",
    desc: "Du script à l'application : tests, qualité, bonnes pratiques.",
    icon: "code",
    items: [
      {
        name: "Microsoft Python Developer Professional Certificate",
        provider: "Microsoft",
        platform: "Coursera",
        status: "certifie",
        verifyUrl: "",
      },
      {
        name: "Professional Python Developer",
        provider: "DataCamp",
        status: "certifie",
        verifyUrl: "",
      },
      {
        name: "Associate Python Developer",
        provider: "DataCamp",
        status: "certifie",
        verifyUrl: "",
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
        platform: "Coursera",
        status: "certifie",
        verifyUrl: "",
      },
      {
        name: "IBM Data Analyst with Python",
        provider: "IBM",
        platform: "Coursera",
        status: "en-cours",
        verifyUrl: "",
      },
    ],
  },
];
