import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArticleChart } from '@/components/ArticleChart';
import { chartMarkdown, tableMarkdown, type ArticleChartData } from '@/lib/article-tools';

const inputClass = 'w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm';

export function ArticleDataDialog({ kind, initialChart, onClose, onInsert }: { kind: 'table' | 'chart'; initialChart?: ArticleChartData; onClose: () => void; onInsert: (text: string) => void }) {
  const [title, setTitle] = useState(initialChart?.title ?? '');
  const [type, setType] = useState<ArticleChartData['type']>(initialChart?.type ?? 'bar');
  const [cells, setCells] = useState<string[][]>(initialChart ? [['Catégorie', ...initialChart.series], ...initialChart.rows.map(row => [row.label, ...row.values.map(String)])] : kind === 'chart' ? [['Catégorie', 'Valeur'], ['', ''], ['', ''], ['', '']] : [['Colonne 1', 'Colonne 2', 'Colonne 3'], ['', '', ''], ['', '', '']]);
  const [error, setError] = useState('');
  const headers = cells[0] ?? [];
  const numeric = (value: string) => Number(value.trim().replace(',', '.'));
  const validChart = kind === 'chart' && headers.slice(1).every(value => value.trim()) && cells.slice(1).every(row => row[0]?.trim() && row.slice(1).every(value => value.trim() && Number.isFinite(numeric(value)))) && (type !== 'pie' || cells.slice(1).every(row => numeric(row[1] ?? '') >= 0) && cells.slice(1).some(row => numeric(row[1] ?? '') > 0));
  const chart: ArticleChartData = { title, type, series: headers.slice(1), rows: cells.slice(1).map(row => ({ label: row[0] ?? '', values: row.slice(1).map(numeric) })) };
  function changeCell(row: number, column: number, value: string) { setError(''); setCells(current => current.map((values, i) => i === row ? values.map((old, j) => j === column ? value : old) : values)); }
  function insert() {
    if (kind === 'chart' && !validChart) { setError('Renseignez les catégories, les noms des séries et des nombres valides. Un graphique en secteurs nécessite des valeurs positives.'); return; }
    onInsert(kind === 'chart' ? chartMarkdown(chart) : tableMarkdown(cells));
  }
  return <Dialog open onOpenChange={open => { if (!open) onClose(); }}><DialogContent aria-describedby={undefined} className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto">
    <DialogHeader><DialogTitle>{kind === 'chart' ? initialChart ? 'Modifier le graphique' : 'Insérer un graphique' : 'Créer un tableau'}</DialogTitle></DialogHeader>
    {kind === 'chart' && <div className="grid gap-4 sm:grid-cols-[1fr_180px]"><label className="text-sm">Titre du graphique<input className={`${inputClass} mt-2`} maxLength={180} value={title} onChange={e => setTitle(e.target.value)} /></label><label className="text-sm">Type<select className={`${inputClass} mt-2`} value={type} onChange={e => { const next = e.target.value as ArticleChartData['type']; setType(next); if (next === 'pie') setCells(current => current.map(row => row.slice(0, 2))); }}><option value="bar">Barres</option><option value="line">Courbes</option><option value="pie">Secteurs</option></select></label></div>}
    <div className="overflow-x-auto"><table className="w-full border-collapse"><tbody>{cells.map((row, i) => <tr key={i}>{row.map((value, j) => <td key={j} className="min-w-32 border border-border p-1"><input aria-label={`${i === 0 ? 'En-tête' : `Ligne ${i}`} ${j + 1}`} maxLength={kind === 'chart' ? i === 0 ? 80 : j === 0 ? 120 : 40 : 500} inputMode={kind === 'chart' && i > 0 && j > 0 ? 'decimal' : 'text'} value={value} onChange={e => changeCell(i, j, e.target.value)} className={`${inputClass} ${i === 0 ? 'font-semibold' : ''}`} /></td>)}<td className="w-10 px-1">{i > 0 && <Button variant="ghost" size="icon" disabled={cells.length <= 2} title={`Supprimer la ligne ${i}`} aria-label={`Supprimer la ligne ${i}`} onClick={() => setCells(current => current.filter((_, index) => index !== i))}><Trash2 /></Button>}</td></tr>)}</tbody></table></div>
    <div className="flex flex-wrap gap-2"><Button variant="outline" size="sm" disabled={cells.length >= 101} onClick={() => setCells(current => [...current, headers.map(() => '')])}><Plus /> Ligne</Button><Button variant="outline" size="sm" disabled={headers.length >= (kind === 'chart' ? type === 'pie' ? 2 : 5 : 12)} onClick={() => setCells(current => current.map((row, i) => [...row, i === 0 ? kind === 'chart' ? `Série ${headers.length}` : `Colonne ${headers.length + 1}` : '']))}><Plus /> Colonne</Button><Button variant="ghost" size="sm" disabled={headers.length <= 2} onClick={() => setCells(current => current.map(row => row.slice(0, -1)))}><Trash2 /> Dernière colonne</Button></div>
    {validChart && <ArticleChart chart={chart} />}
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    <div className="flex justify-end gap-2"><Button variant="outline" onClick={onClose}>Annuler</Button><Button onClick={insert}>{initialChart ? 'Mettre à jour' : 'Insérer'}</Button></div>
  </DialogContent></Dialog>;
}