import { useRef, useState, type ComponentType } from 'react';
import { Bold, Italic, Strikethrough, List, ListOrdered, ListTodo, Quote, Link, Image, Code, Table2, ChartColumn, Undo2, Redo2, Minus, Heading1, Heading2, Heading3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArticleDataDialog } from '@/components/ArticleDataDialog';
import { parseChart, safeMediaUrl, type ArticleChartData } from '@/lib/article-tools';

type Selection = { start: number; end: number };
const fieldClass = 'mt-2 w-full rounded-md border border-input bg-background p-3';

export function ArticleEditor({ value, onChange, disabled }: { value: string; onChange: (value: string) => void; disabled?: boolean }) {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const selection = useRef<Selection>({ start: 0, end: 0 });
  const [dialog, setDialog] = useState<'table' | 'chart' | 'link' | 'image' | 'code' | null>(null);
  const [editingChart, setEditingChart] = useState<ArticleChartData | undefined>();
  const [url, setUrl] = useState('');
  const [label, setLabel] = useState('');
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [history, setHistory] = useState<{ past: string[]; future: string[] }>({ past: [], future: [] });

  function rememberSelection() {
    const node = textarea.current;
    if (node) selection.current = { start: node.selectionStart, end: node.selectionEnd };
  }
  function commit(next: string) {
    if (next === value) return;
    setHistory(current => ({ past: [...current.past.slice(-99), value], future: [] }));
    onChange(next);
  }
  function replace(text: string, range = selection.current) {
    commit(value.slice(0, range.start) + text + value.slice(range.end));
    const position = range.start + text.length;
    selection.current = { start: position, end: position };
    requestAnimationFrame(() => { textarea.current?.focus(); textarea.current?.setSelectionRange(position, position); });
  }
  function wrap(marker: string, fallback: string) {
    const { start, end } = selection.current;
    replace(marker + (value.slice(start, end) || fallback) + marker);
  }
  function prefix(marker: string) {
    const { start, end } = selection.current;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const nextBreak = value.indexOf('\n', end);
    const lineEnd = nextBreak === -1 ? value.length : nextBreak;
    replace(value.slice(lineStart, lineEnd).split('\n').map(line => marker + line).join('\n'), { start: lineStart, end: lineEnd });
  }
  function undo() {
    const previous = history.past.at(-1);
    if (previous === undefined) return;
    setHistory(current => ({ past: current.past.slice(0, -1), future: [value, ...current.future] })); onChange(previous);
  }
  function redo() {
    const next = history.future[0];
    if (next === undefined) return;
    setHistory(current => ({ past: [...current.past, value], future: current.future.slice(1) })); onChange(next);
  }
  function open(kind: NonNullable<typeof dialog>) {
    setEditingChart(undefined); setError(''); setUrl('');
    const selected = value.slice(selection.current.start, selection.current.end);
    setLabel(selected); setCode(selected);
    if (kind === 'chart') {
      const matches = value.matchAll(/```chart\n([\s\S]*?)\n```/g);
      for (const match of matches) {
        const start = match.index;
        const end = start + match[0].length;
        if (selection.current.start >= start && selection.current.end <= end) {
          const parsed = parseChart(match[1]);
          if (parsed) { setEditingChart(parsed); selection.current = { start, end }; }
          break;
        }
      }
    }
    setDialog(kind);
  }
  function insertBlock(text: string) { replace(`\n\n${text}\n\n`); setDialog(null); }
  function submit() {
    if (dialog === 'code') {
      if (!code.trim()) { setError('Ajoutez le code à insérer.'); return; }
      const fence = '`'.repeat(Math.max(3, ...(code.match(/`+/g) ?? []).map(run => run.length + 1)));
      insertBlock(`${fence}${language.replace(/[^a-zA-Z0-9_+-]/g, '')}\n${code}\n${fence}`);
    } else {
      const destination = safeMediaUrl(url);
      if (!destination) { setError('Indiquez une adresse complète commençant par https:// ou http://.'); return; }
      const text = (label || (dialog === 'image' ? 'Image' : 'Lien')).replace(/[\[\]\\]/g, '\\$&');
      replace(`${dialog === 'image' ? '!' : ''}[${text}](<${destination.replace(/>/g, '%3E')}>)`); setDialog(null);
    }
  }
  function Tool({ icon: Icon, title, action, inactive }: { icon: ComponentType<{ className?: string }>; title: string; action: () => void; inactive?: boolean }) {
    return <Tooltip><TooltipTrigger asChild><Button type="button" variant="ghost" size="icon" aria-label={title} title={title} disabled={disabled || inactive} onMouseDown={e => e.preventDefault()} onClick={action}><Icon /></Button></TooltipTrigger><TooltipContent>{title}</TooltipContent></Tooltip>;
  }
  return <div className="min-w-0 overflow-hidden rounded-md border border-input">
    <TooltipProvider delayDuration={200}><div className="flex flex-wrap items-center gap-1 border-b border-border bg-card p-2" role="toolbar" aria-label="Mise en forme de l’article">
      <Tool icon={Undo2} title="Annuler" action={undo} inactive={!history.past.length} /><Tool icon={Redo2} title="Rétablir" action={redo} inactive={!history.future.length} />
      <span className="mx-1 h-6 border-l border-border" />
      <Tool icon={Heading1} title="Titre 1" action={() => prefix('# ')} /><Tool icon={Heading2} title="Titre 2" action={() => prefix('## ')} /><Tool icon={Heading3} title="Titre 3" action={() => prefix('### ')} />
      <Tool icon={Bold} title="Gras" action={() => wrap('**', 'Texte en gras')} /><Tool icon={Italic} title="Italique" action={() => wrap('*', 'Texte en italique')} /><Tool icon={Strikethrough} title="Barré" action={() => wrap('~~', 'Texte barré')} />
      <span className="mx-1 h-6 border-l border-border" />
      <Tool icon={List} title="Liste à puces" action={() => prefix('- ')} /><Tool icon={ListOrdered} title="Liste numérotée" action={() => prefix('1. ')} /><Tool icon={ListTodo} title="Liste de tâches" action={() => prefix('- [ ] ')} /><Tool icon={Quote} title="Citation" action={() => prefix('> ')} /><Tool icon={Minus} title="Séparateur" action={() => insertBlock('---')} />
      <span className="mx-1 h-6 border-l border-border" />
      <Tool icon={Link} title="Insérer un lien" action={() => open('link')} /><Tool icon={Image} title="Insérer une image" action={() => open('image')} /><Tool icon={Code} title="Insérer du code" action={() => open('code')} /><Tool icon={Table2} title="Insérer un tableau" action={() => open('table')} /><Tool icon={ChartColumn} title="Insérer ou modifier un graphique" action={() => open('chart')} />
    </div></TooltipProvider>
    <textarea ref={textarea} aria-label="Article" rows={20} value={value} disabled={disabled} onSelect={rememberSelection} onClick={rememberSelection} onKeyUp={rememberSelection} onChange={e => { commit(e.target.value); selection.current = { start: e.target.selectionStart, end: e.target.selectionEnd }; }} onKeyDown={e => { if (e.ctrlKey || e.metaKey) { if (e.key.toLowerCase() === 'z') { e.preventDefault(); if (e.shiftKey) redo(); else undo(); } if (e.key.toLowerCase() === 'b') { e.preventDefault(); rememberSelection(); wrap('**', 'Texte en gras'); } if (e.key.toLowerCase() === 'i') { e.preventDefault(); rememberSelection(); wrap('*', 'Texte en italique'); } } }} className="block w-full resize-y bg-background p-4 font-mono text-sm leading-7 outline-none focus:ring-2 focus:ring-inset focus:ring-ring" />
    <div className="border-t border-border px-4 py-2 text-right text-xs text-muted-foreground">{value.trim() ? value.trim().split(/\s+/).length : 0} mots · {value.length} caractères</div>
    {(dialog === 'table' || dialog === 'chart') && <ArticleDataDialog kind={dialog} initialChart={editingChart} onClose={() => setDialog(null)} onInsert={insertBlock} />}
    <Dialog open={dialog === 'link' || dialog === 'image' || dialog === 'code'} onOpenChange={isOpen => { if (!isOpen) setDialog(null); }}><DialogContent aria-describedby={undefined} className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto"><DialogHeader><DialogTitle>{dialog === 'code' ? 'Insérer du code' : dialog === 'image' ? 'Insérer une image' : 'Insérer un lien'}</DialogTitle></DialogHeader>
      {dialog === 'code' ? <><label className="text-sm">Langage<input list="article-languages" className={fieldClass} value={language} onChange={e => setLanguage(e.target.value)} /><datalist id="article-languages">{['python', 'sql', 'javascript', 'typescript', 'java', 'c', 'cpp', 'csharp', 'go', 'rust', 'bash', 'html', 'css', 'json', 'yaml', 'markdown', 'r', 'php', 'ruby', 'swift', 'kotlin'].map(name => <option key={name} value={name} />)}</datalist></label><label className="text-sm">Code<textarea rows={10} className={`${fieldClass} font-mono`} value={code} onChange={e => setCode(e.target.value)} /></label></> : <><label className="text-sm">{dialog === 'image' ? 'Texte alternatif' : 'Texte du lien'}<input className={fieldClass} value={label} onChange={e => setLabel(e.target.value)} /></label><label className="text-sm">Adresse URL<input type="url" className={fieldClass} value={url} onChange={e => setUrl(e.target.value)} /></label></>}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}<div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setDialog(null)}>Annuler</Button><Button onClick={submit}>Insérer</Button></div>
    </DialogContent></Dialog>
  </div>;
}