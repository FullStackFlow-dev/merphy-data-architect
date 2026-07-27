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
    slug: "mlops-en-2026",
    title: "MLOps en 2026 : ce qui compte vraiment",
    date: "2026-05-14",
    excerpt: "Retour d'expérience sur la mise en production de modèles à l'échelle.",
    tags: ["MLOps", "IA"],
    content: "Contenu provisoire de l'article. À remplacer.",
  },
  {
    slug: "transformers-pour-tabulaire",
    title: "Transformers pour données tabulaires",
    date: "2026-03-02",
    excerpt: "Quand un transformer bat (vraiment) XGBoost, et quand il perd.",
    tags: ["Deep Learning", "Data Science"],
    content: "Contenu provisoire de l'article. À remplacer.",
  },
  {
    slug: "architecture-full-stack-moderne",
    title: "Architecture full-stack moderne",
    date: "2026-01-20",
    excerpt: "Choisir sa stack en 2026 sans se laisser porter par la hype.",
    tags: ["Dev", "Architecture"],
    content: "Contenu provisoire de l'article. À remplacer.",
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
