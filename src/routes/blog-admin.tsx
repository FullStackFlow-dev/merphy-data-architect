import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { PenLine, Plus, Save, Send, LogOut, Eye, Trash2 } from 'lucide-react';
import { SiteLayout } from '@/components/SiteLayout';
import { Button } from '@/components/ui/button';
import { ArticleContent } from '@/components/ArticleContent';
import { ArticleEditor } from '@/components/ArticleEditor';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { articleSlug, type BlogPost } from '@/lib/blog';

export const Route = createFileRoute('/blog-admin')({
  head: () => ({ meta: [{ title: 'Rédaction du blog — Merphy Mademba' }, { name: 'description', content: 'Espace privé de rédaction des articles de Merphy Mademba.' }, { property: 'og:title', content: 'Rédaction du blog — Merphy Mademba' }, { property: 'og:description', content: 'Espace privé de rédaction du blog.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex, nofollow' }] }),
  component: BlogAdmin,
});

const blank = { title: '', slug: '', excerpt: '', content: '', tags: '' };

function BlogAdmin() {
  const cache = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(blank);
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => { setUserId(data.user?.id ?? null); setReady(true); });
  }, []);
  const role = useQuery({ queryKey: ['blog-role', userId], enabled: !!userId, queryFn: async () => {
    const { data, error } = await supabase.rpc('is_blog_author');
    if (error) throw new Error('Vérification de l’accès impossible.');
    return data;
  } });
  const articles = useQuery({ queryKey: ['blog-own', userId], enabled: !!userId && role.data === true, queryFn: async () => {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('author_id', userId ?? '').order('updated_at', { ascending: false });
    if (error) throw new Error('Chargement des articles impossible.');
    return data;
  } });
  async function authenticate(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMessage('');
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/blog-admin` } });
        setMessage(error ? 'Création impossible. Vérifiez votre adresse et réessayez.' : 'Vérifiez votre boîte mail pour confirmer votre compte.');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setMessage('Connexion impossible. Vérifiez votre email et votre mot de passe.');
        else setUserId(data.user.id);
      }
    } catch { setMessage('Connexion indisponible. Réessayez.'); }
    finally { setBusy(false); }
  }
  async function save(status: 'draft' | 'published') {
    if (!userId) return;
    if (!form.title.trim() || !articleSlug(form.slug || form.title) || (status === 'published' && !form.content.trim())) { setMessage('Renseignez le titre et le contenu avant de publier.'); return; }
    setBusy(true); setMessage('');
    try {
      const values = { author_id: userId, title: form.title.trim(), slug: articleSlug(form.slug || form.title), excerpt: form.excerpt.trim(), content: form.content, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean), status, published_at: status === 'published' ? selected?.published_at ?? new Date().toISOString() : selected?.published_at ?? null };
      const query = selected ? supabase.from('blog_posts').update(values).eq('id', selected.id) : supabase.from('blog_posts').insert(values);
      const { data, error } = await query.select().single();
      if (error) { setMessage(error.code === '23505' ? 'Cette adresse d’article existe déjà. Choisissez une autre adresse.' : 'Enregistrement impossible. Vérifiez votre accès et réessayez.'); return; }
      setSelected(data); setForm(f => ({ ...f, slug: data.slug }));
      await cache.invalidateQueries({ queryKey: ['blog-own'] });
      await cache.invalidateQueries({ queryKey: ['blog-public'] });
      setMessage(status === 'published' ? 'Article publié.' : 'Brouillon enregistré.');
    } catch { setMessage('Enregistrement indisponible. Réessayez.'); }
    finally { setBusy(false); }
  }
  async function remove() {
    if (!selected || !window.confirm('Supprimer définitivement cet article ?')) return;
    setBusy(true);
    const { error } = await supabase.from('blog_posts').delete().eq('id', selected.id);
    setBusy(false);
    if (error) { setMessage('Suppression impossible.'); return; }
    setSelected(null); setForm(blank); setMessage('Article supprimé.');
    await cache.invalidateQueries({ queryKey: ['blog-own'] });
    await cache.invalidateQueries({ queryKey: ['blog-public'] });
  }
  return <SiteLayout><section className="mx-auto max-w-6xl px-6 py-14">
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4"><h1 className="flex items-center gap-3 text-3xl font-semibold"><PenLine className="h-7 w-7 text-primary" /> Rédaction du blog</h1>{userId && <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); setUserId(null); cache.removeQueries({ queryKey: ['blog-own'] }); }}><LogOut /> Déconnexion</Button>}</div>
    {message && <p role="status" className="mb-6 rounded-md border border-border bg-muted p-4 text-sm">{message}</p>}
    {!ready ? <p>Chargement…</p> : !userId ? <div className="max-w-md space-y-5">
      <h2 className="text-xl font-semibold">{mode === 'login' ? 'Connexion à votre espace' : 'Créer votre compte'}</h2>
      <form onSubmit={authenticate} className="space-y-4"><label className="block text-sm">Email<input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-md border border-input bg-background p-3" /></label><label className="block text-sm">Mot de passe<input required minLength={8} type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-md border border-input bg-background p-3" /></label><Button disabled={busy} type="submit" className="w-full">{busy ? 'Veuillez patienter…' : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}</Button></form>
      <Button variant="outline" className="w-full" disabled={busy} onClick={async () => { setBusy(true); const result = await lovable.auth.signInWithOAuth('google', { redirect_uri: `${window.location.origin}/blog-admin` }); setBusy(false); if (result.error) setMessage('Connexion Google impossible.'); else if (!result.redirected) { const { data } = await supabase.auth.getUser(); setUserId(data.user?.id ?? null); } }}>Continuer avec Google</Button>
      <Button variant="link" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMessage(''); }}>{mode === 'login' ? 'Créer un compte' : 'Déjà un compte ? Se connecter'}</Button><Button variant="link" asChild><Link to="/reset-password">Mot de passe oublié</Link></Button>
    </div> : role.isPending ? <p>Vérification de votre accès…</p> : role.error ? <p role="alert">{role.error.message}</p> : !role.data ? <div className="max-w-xl space-y-4"><h2 className="text-xl font-semibold">Accès auteur en attente</h2><p className="text-muted-foreground">Votre compte est connecté, mais n’est pas autorisé à publier. Demandez l’activation de votre accès auteur à Merphy Mademba.</p></div> : <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="space-y-4"><Button variant="outline" className="w-full" disabled={busy} onClick={() => { setSelected(null); setForm(blank); setMessage(''); }}><Plus /> Nouvel article</Button>{articles.isPending ? <p>Chargement…</p> : articles.error ? <p role="alert">{articles.error.message}</p> : !articles.data?.length ? <p className="text-sm text-muted-foreground">Aucun article enregistré.</p> : articles.data.map(p => <Button key={p.id} variant={selected?.id === p.id ? 'secondary' : 'ghost'} disabled={busy} className="h-auto w-full flex-col items-start whitespace-normal py-3 text-left" onClick={() => { setSelected(p); setForm({ title: p.title, slug: p.slug, excerpt: p.excerpt, content: p.content, tags: p.tags.join(', ') }); setMessage(''); }}><span>{p.title}</span><span className="text-xs text-muted-foreground">{p.status === 'published' ? 'Publié' : 'Brouillon'}</span></Button>)}</aside>
      <div className="min-w-0 space-y-5"><div className="flex flex-wrap gap-2"><Button disabled={busy} variant="outline" onClick={() => save('draft')}><Save /> Enregistrer le brouillon</Button><Button disabled={busy} onClick={() => save('published')}><Send /> {selected?.status === 'published' ? 'Mettre à jour' : 'Publier'}</Button><Button variant={preview ? 'secondary' : 'ghost'} onClick={() => setPreview(!preview)}><Eye /> Aperçu</Button>{selected && <Button disabled={busy} variant="ghost" size="icon" aria-label="Supprimer l’article" title="Supprimer l’article" onClick={remove}><Trash2 /></Button>}{selected?.status === 'published' && <Button variant="link" asChild><Link to="/blog/$slug" params={{ slug: selected.slug }}>Voir l’article</Link></Button>}</div>
      {preview ? <article className="space-y-6"><h2 className="break-words text-3xl font-semibold">{form.title || 'Sans titre'}</h2><p className="text-muted-foreground">{form.excerpt}</p><ArticleContent content={form.content} /></article> : <><label className="block text-sm">Titre<input maxLength={180} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="mt-2 w-full rounded-md border border-input bg-background p-3" /></label><label className="block text-sm">Adresse de l’article<input value={form.slug} placeholder={articleSlug(form.title)} onChange={e => setForm({ ...form, slug: e.target.value })} className="mt-2 w-full rounded-md border border-input bg-background p-3" /></label><label className="block text-sm">Résumé<textarea rows={2} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} className="mt-2 w-full rounded-md border border-input bg-background p-3" /></label><label className="block text-sm">Thèmes<input value={form.tags} placeholder="Python, Data Engineering" onChange={e => setForm({ ...form, tags: e.target.value })} className="mt-2 w-full rounded-md border border-input bg-background p-3" /></label><div className="space-y-2"><p className="text-sm">Article</p><ArticleEditor key={selected?.id ?? 'new'} value={form.content} onChange={content => setForm(current => ({ ...current, content }))} disabled={busy} /></div></>}
      </div></div>}
  </section></SiteLayout>;
}