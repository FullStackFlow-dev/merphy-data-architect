import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { posts } from "../data/posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Portfolio" },
      { name: "description", content: "Articles techniques sur le dev, la data et l'IA." },
      { property: "og:title", content: "Blog — Portfolio" },
      { property: "og:description", content: "Articles dev, data et IA." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-10">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
          Blog
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Articles & retours d'expérience
        </h1>
        <p className="mt-4 text-muted-foreground">
          Notes techniques sur le développement, la data science et l'IA.
        </p>
      </section>
      <section className="mx-auto max-w-3xl px-6 pb-20 divide-y divide-border">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="block py-8 group"
          >
            <div className="text-xs text-muted-foreground">
              {new Date(post.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <h2 className="mt-1 text-xl font-semibold group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            <div className="mt-3 flex gap-1.5">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs rounded-md border border-border px-2 py-0.5 text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </SiteLayout>
  );
}
