import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight, Clock3, PenLine, Search } from "lucide-react";
import { SiteLayout } from "../components/SiteLayout";
import { blogQuery } from "../lib/blog";
import { Button } from "../components/ui/button";
import { MotionCard } from "../components/motion";

export const Route = createFileRoute("/blog/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(blogQuery),
  head: () => ({
    meta: [
      { title: "Écrits techniques — Merphy Mademba" },
      { name: "description", content: "Articles et retours d’expérience en français sur Python, les données, les bases de données et la BI." },
      { property: "og:title", content: "Écrits techniques — Merphy Mademba" },
      { property: "og:description", content: "Articles et retours d’expérience sur Python, les données et l’architecture." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WritingPage,
});

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function estimateReadingMinutes(markdown: string) {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_~|\-]/g, " ");
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

function WritingPage() {
  const { data: posts } = useSuspenseQuery(blogQuery);
  const [activeTopic, setActiveTopic] = useState("Tous les thèmes");
  const [query, setQuery] = useState("");

  const topics = useMemo(
    () => ["Tous les thèmes", ...new Set(posts.flatMap((post) => post.tags))],
    [posts],
  );

  const visiblePosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("fr");
    return posts.filter((post) => {
      const matchesTopic = activeTopic === "Tous les thèmes" || post.tags.includes(activeTopic);
      const haystack = [post.title, post.excerpt, ...post.tags].join(" ").toLocaleLowerCase("fr");
      return matchesTopic && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [activeTopic, posts, query]);

  const featuredPost = visiblePosts[0];
  const otherPosts = visiblePosts.slice(1);

  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_0%,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_58%)]" />
        <div className="mx-auto max-w-5xl px-6 pb-10 pt-16 md:pb-14 md:pt-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Carnet de bord · Python · Données</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl">Écrits techniques et retours d’expérience.</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Des articles en français sur la conception de pipelines, les bases de données,
            l’analyse et les outils que je construis ou explore.
          </p>
          <Button asChild variant="outline" className="mt-6"><Link to="/blog-admin"><PenLine /> Espace auteur</Link></Button>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10 md:py-14" aria-label="Catalogue des écrits">
        <div className="flex flex-col gap-5">
          <label className="relative block max-w-xl">
            <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <span className="sr-only">Rechercher dans les écrits</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un sujet, un outil ou un mot-clé…"
              className="h-12 w-full rounded-xl border border-border bg-card/70 pl-11 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Parcourir par thème</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer les écrits par thème">
              {topics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  aria-pressed={activeTopic === topic}
                  onClick={() => setActiveTopic(topic)}
                  className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${activeTopic === topic ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"}`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 mt-8 flex items-center justify-between border-b border-border/70 pb-3 text-sm">
          <p className="text-muted-foreground" aria-live="polite">
            {visiblePosts.length} article{visiblePosts.length > 1 ? "s" : ""}
          </p>
          {(activeTopic !== "Tous les thèmes" || query) ? (
            <button type="button" onClick={() => { setActiveTopic("Tous les thèmes"); setQuery(""); }} className="font-medium text-primary underline-offset-4 hover:underline">
              Réinitialiser
            </button>
          ) : null}
        </div>

        {featuredPost ? (
          <div className="space-y-5">
            <MotionCard className="rounded-2xl border border-primary/25 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_10%,var(--card)),var(--card)_70%)]">
              <Link to="/blog/$slug" params={{ slug: featuredPost.slug }} className="group block p-6 md:p-9">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-medium uppercase tracking-wider text-primary">À la une</span>
                  <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                  <span className="inline-flex items-center gap-1"><Clock3 aria-hidden="true" className="h-3.5 w-3.5" />Lecture estimée : {estimateReadingMinutes(featuredPost.content)} min</span>
                </div>
                <h2 className="mt-5 max-w-3xl text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary md:text-3xl">{featuredPost.title}</h2>
                <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{featuredPost.excerpt}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => <span key={tag} className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground">{tag}</span>)}
                </div>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">Lire l’article <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
              </Link>
            </MotionCard>

            {otherPosts.length ? (
              <section className="pt-7" aria-labelledby="all-writings-title">
                <div className="mb-5 flex items-end justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">À explorer</p>
                    <h2 id="all-writings-title" className="mt-2 text-2xl font-semibold tracking-tight">Tous les écrits</h2>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {otherPosts.map((post, index) => (
                    <MotionCard key={post.slug} delay={(index % 2) * 70} className="rounded-2xl border border-border/80 bg-card/70 transition-colors hover:border-primary/40">
                      <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block h-full p-6">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                          <span className="inline-flex items-center gap-1"><Clock3 aria-hidden="true" className="h-3.5 w-3.5" />{estimateReadingMinutes(post.content)} min</span>
                        </div>
                        <h3 className="mt-3 text-lg font-semibold transition-colors group-hover:text-primary">{post.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.map((tag) => <span key={tag} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">{tag}</span>)}
                        </div>
                      </Link>
                    </MotionCard>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
            <h2 className="text-lg font-semibold">{posts.length ? "Aucun écrit ne correspond à cette recherche" : "Les prochains écrits arrivent bientôt"}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {posts.length ? "Essayez un autre mot-clé ou retirez le filtre de thème." : "Les articles publiés apparaîtront ici."}
            </p>
            {posts.length ? <button type="button" onClick={() => { setActiveTopic("Tous les thèmes"); setQuery(""); }} className="mt-4 text-sm font-medium text-primary underline-offset-4 hover:underline">Afficher tous les écrits</button> : null}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
