import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { getPost } from "../data/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    const title = p ? `${p.title} — Blog Merphy Mademba` : "Article — Merphy Mademba";
    const desc = p?.excerpt ?? "Article du blog.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PostDetail,
});

function PostDetail() {
  const { post } = Route.useLoaderData();
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-6 pt-20 pb-24">
        <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
          ← Tous les articles
        </Link>
        <div className="mt-6 text-xs text-muted-foreground">
          {new Date(post.date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
        <div className="mt-10 prose prose-neutral dark:prose-invert max-w-none">
          <p>{post.content}</p>
          <p>Contenu détaillé — provisoire, à remplacer par le vrai article.</p>
        </div>
      </article>
    </SiteLayout>
  );
}
