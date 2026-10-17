<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep project URLs and preview images in the shared project data and render them through ProjectCard/ProjectActions/ProjectPreview so home, listings and details remain consistent; unavailable URLs must never be replaced with invented destinations.
- Blog publication uses Cloud tables protected by author roles and RLS; never grant publication access through self-registration or client metadata, because only approved authors may publish.
- Public blog reads refresh through a browser Data API after static SSR fallback, so published articles remain accessible on static hosting without server RPCs.
- Article bodies render as Markdown with raw HTML disabled, so user-authored content cannot execute scripts.
- Blog editing tools generate Markdown and validated fenced chart JSON; shared ArticleContent renders tables and Recharts visualizations identically in previews and published articles without changing article storage.
- Blog SEO suggestions run through an author-verified server function and server-only AI Gateway helpers; authors explicitly apply suggestions to the existing title/excerpt fields to preserve publication storage and metadata consistency.
- AI provider access denials are persisted in a service-only state table and cleared only after confirmed access restoration, preventing repeated denied requests across reloads.
