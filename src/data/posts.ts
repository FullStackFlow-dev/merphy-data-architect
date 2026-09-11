export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
};

export const posts: Post[] = [
  {
    slug: "pipelines-donnees-2026",
    title: "Pipelines de données en 2026 : ce qui compte vraiment",
    date: "2026-05-14",
    excerpt: "Retour d'expérience sur la construction de pipelines ETL/ELT fiables.",
    tags: ["Data Engineering", "ETL"],
    content: "Contenu provisoire de l'article. À remplacer.",
  },
  {
    slug: "powerbi-vs-python-analyse",
    title: "Power BI vs Python pour l'analyse de données",
    date: "2026-03-02",
    excerpt: "Quand choisir Power BI, Excel ou Python pour un projet d'analyse ?",
    tags: ["Data Analyste", "Power BI", "Python"],
    content: "Contenu provisoire de l'article. À remplacer.",
  },
  {
    slug: "automatisation-python-entreprise",
    title: "Automatisation Python en entreprise",
    date: "2026-01-20",
    excerpt: "Scripts, APIs et outils métiers pour gagner du temps au quotidien.",
    tags: ["Développement Python", "Automatisation"],
    content: "Contenu provisoire de l'article. À remplacer.",
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
