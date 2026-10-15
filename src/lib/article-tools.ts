import { z } from 'zod';

export const chartSchema = z.object({
  title: z.string().max(180),
  type: z.enum(['bar', 'line', 'pie']),
  series: z.array(z.string().min(1).max(80)).min(1).max(4),
  rows: z.array(z.object({ label: z.string().min(1).max(120), values: z.array(z.number().finite()).min(1).max(4) })).min(1).max(100),
}).refine(chart => chart.rows.every(row => row.values.length === chart.series.length));

export type ArticleChartData = z.infer<typeof chartSchema>;

export function parseChart(source: string): ArticleChartData | null {
  try {
    const result = chartSchema.safeParse(JSON.parse(source));
    return result.success ? result.data : null;
  } catch { return null; }
}

export function chartMarkdown(chart: ArticleChartData) {
  return '```chart\n' + JSON.stringify(chart, null, 2) + '\n```';
}

const escapeCell = (value: string) => value.replace(/\r?\n/g, ' ').replace(/\|/g, '\\|');
export function tableMarkdown(cells: string[][]) {
  if (!cells.length || !cells[0]?.length) return '';
  return [cells[0], cells[0].map(() => '---'), ...cells.slice(1)].map(row => '| ' + row.map(escapeCell).join(' | ') + ' |').join('\n');
}

export function safeMediaUrl(value: string) {
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; }
}