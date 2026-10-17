import { useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { Sparkles, Check, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateBlogSeo } from '@/lib/blog-seo.functions';
import { seoInput, type SeoSuggestion } from '@/lib/blog-seo';

export function BlogSeoAssistant({ content, disabled, onApply }: { content: string; disabled: boolean; onApply: (suggestion: SeoSuggestion) => void }) {
  const generate = useServerFn(generateBlogSeo);
  const [draft, setDraft] = useState(content);
  const [pending, setPending] = useState(false);
  const [suggestion, setSuggestion] = useState<SeoSuggestion | null>(null);
  const [message, setMessage] = useState('');
  async function submit() {
    const input = seoInput.safeParse({ draft });
    if (!input.success) { setMessage(input.error.issues[0]?.message ?? 'Brouillon invalide.'); return; }
    setPending(true); setSuggestion(null); setMessage('');
    try {
      const result = await generate({ data: input.data });
      if (result.error) setMessage(result.error);
      else if (result.suggestion) setSuggestion(result.suggestion);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Génération indisponible.'); }
    finally { setPending(false); }
  }
  return <section className="space-y-4 border-y border-border py-5" aria-label="Suggestions SEO">
    <h2 className="flex items-center gap-2 font-semibold"><Sparkles className="h-4 w-4 text-primary" /> Suggestions SEO · Lovable AI</h2>
    <label className="block text-sm">Texte du brouillon<textarea rows={5} maxLength={40000} value={draft} disabled={pending || disabled} onChange={e => { setDraft(e.target.value); setSuggestion(null); setMessage(''); }} className="mt-2 w-full rounded-md border border-input bg-background p-3" /></label>
    <div className="flex flex-wrap gap-2"><Button variant="outline" disabled={pending || disabled} onClick={() => { setDraft(content); setSuggestion(null); setMessage(''); }}>Reprendre le texte de l’article</Button><Button disabled={pending || disabled || !draft.trim()} onClick={submit}>{pending ? <LoaderCircle className="animate-spin" /> : <Sparkles />}{pending ? 'Génération en cours…' : 'Générer le titre et la description'}</Button></div>
    {message && <p role="alert" className="break-words text-sm text-destructive">{message}</p>}
    {suggestion && <div className="space-y-3"><label className="block text-sm">Titre SEO<input maxLength={180} value={suggestion.title} onChange={e => setSuggestion({ ...suggestion, title: e.target.value })} className="mt-2 w-full rounded-md border border-input bg-background p-3" /></label><label className="block text-sm">Méta-description<textarea maxLength={300} rows={3} value={suggestion.description} onChange={e => setSuggestion({ ...suggestion, description: e.target.value })} className="mt-2 w-full rounded-md border border-input bg-background p-3" /></label><Button variant="outline" disabled={disabled || !suggestion.title.trim() || !suggestion.description.trim()} onClick={() => { onApply(suggestion); setMessage('Titre et résumé mis à jour. Enregistrez votre brouillon pour les conserver.'); }}><Check /> Appliquer au titre et au résumé</Button></div>}
  </section>;
}