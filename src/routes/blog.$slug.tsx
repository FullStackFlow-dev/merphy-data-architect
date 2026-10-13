import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { getPost } from "../data/posts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { blogQuery } from "../lib/blog";
import { ArticleContent } from "../components/ArticleContent";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params, context }) => {
    const all = await context.queryClient.ensureQueryData(blogQuery);
    const post = all.find(p => p.slug === params.slug) ?? getPost(params.slug);
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
  const { data: posts } = useSuspenseQuery(blogQuery);
  const { slug } = Route.useParams();
  const post = posts.find(p => p.slug === slug);
  if (!post) return <SiteLayout><section className="mx-auto max-w-3xl px-6 py-20"><h1 className="text-3xl font-semibold">Article introuvable</h1><Link to="/blog" className="mt-6 inline-block text-primary">Retour au blog</Link></section></SiteLayout>;
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
        <div className="mt-10">
          <ArticleContent content={post.content} />
        </div>
      </article>
    </SiteLayout>
  );
}
