import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { useSuspenseQuery } from "@tanstack/react-query";
import { blogQuery } from "../lib/blog";
import { Button } from "../components/ui/button";
import { PenLine } from "lucide-react";
import { MotionCard } from "../components/motion";

export const Route = createFileRoute("/blog/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(blogQuery),
  head: () => ({
    meta: [
      { title: "Blog Python & Data — Merphy Mademba" },
      { name: "description", content: "Articles techniques sur le dev, la data et l'IA." },
      { property: "og:title", content: "Blog Python & Data — Merphy Mademba" },
      { property: "og:description", content: "Articles dev, data et IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { data: posts } = useSuspenseQuery(blogQuery);
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
          Notes techniques sur le développement Python, l'analyse de données et le data engineering.
        </p>
        <Button asChild variant="outline" className="mt-6"><Link to="/blog-admin"><PenLine /> Espace auteur</Link></Button>
      </section>
      <section className="mx-auto max-w-3xl px-6 pb-20 space-y-5">
        {posts.map((post, i) => (
          <MotionCard
            key={post.slug}
            delay={(i % 3) * 90}
            className="rounded-xl border border-border bg-card hover:border-primary/40"
          >
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="block p-6 group"
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
          </MotionCard>
        ))}
      </section>
    </SiteLayout>
  );
}
