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
    slug: "automatisation-python-entreprise",
    title: "Automatisation Python en entreprise",
    date: "2026-01-20",
    excerpt: "Scripts, APIs et outils métiers pour gagner du temps au quotidien.",
    tags: ["Développement Python", "Automatisation"],
    content: "Contenu provisoire de l'article. À remplacer.",
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
