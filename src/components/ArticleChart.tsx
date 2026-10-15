import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ArticleChartData } from '@/lib/article-tools';

const colors = ['var(--primary)', 'var(--success)', 'var(--warning)', 'var(--chart-4)'];

export function ArticleChart({ chart }: { chart: ArticleChartData }) {
  const data = chart.rows.map(row => Object.fromEntries([['label', row.label], ...row.values.map((value, index) => [`value${index}`, value])]));
  const tooltipStyle = { backgroundColor: 'var(--popover)', borderColor: 'var(--border)', color: 'var(--popover-foreground)' };
  const axes = <><CartesianGrid stroke="var(--border)" strokeDasharray="3 3" /><XAxis dataKey="label" stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} /><YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} /><Tooltip contentStyle={tooltipStyle} /><Legend /></>;
  return <figure className="my-6 min-w-0 border-y border-border py-6" aria-label={chart.title || 'Graphique'}>
    {chart.title && <figcaption className="mb-5 font-semibold">{chart.title}</figcaption>}
    <div className="h-80 w-full min-w-0" role="img" aria-label={`${chart.title || 'Graphique'} — ${chart.rows.length} catégories`}>
      <ResponsiveContainer width="100%" height="100%">
        {chart.type === 'pie' ? <PieChart><Tooltip contentStyle={tooltipStyle} /><Legend /><Pie data={data} dataKey="value0" nameKey="label" outerRadius="75%">{data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}</Pie></PieChart> : chart.type === 'line' ? <LineChart data={data} margin={{ top: 8, right: 20, bottom: 8, left: 0 }}>{axes}{chart.series.map((name, i) => <Line key={i} name={name} dataKey={`value${i}`} stroke={colors[i]} strokeWidth={2} />)}</LineChart> : <BarChart data={data} margin={{ top: 8, right: 20, bottom: 8, left: 0 }}>{axes}{chart.series.map((name, i) => <Bar key={i} name={name} dataKey={`value${i}`} fill={colors[i]} radius={[3, 3, 0, 0]} />)}</BarChart>}
      </ResponsiveContainer>
    </div>
    <details className="mt-4 text-sm"><summary className="cursor-pointer text-muted-foreground">Données du graphique</summary><div className="mt-3 overflow-x-auto"><table><thead><tr><th>Catégorie</th>{chart.series.map((name, i) => <th key={i}>{name}</th>)}</tr></thead><tbody>{chart.rows.map((row, i) => <tr key={i}><td>{row.label}</td>{row.values.map((value, j) => <td key={j}>{value.toLocaleString('fr-FR')}</td>)}</tr>)}</tbody></table></div></details>
  </figure>;
}