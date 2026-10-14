// Wraps unfenced code paragraphs in Markdown fences so pasted code is highlighted like in an IDE.
const CODE_LINE = [
  /^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|WITH|FROM|WHERE|JOIN|LEFT JOIN|INNER JOIN|GROUP BY|ORDER BY|HAVING|LIMIT|VALUES|SET|UNION)\b/,
  /^\s*(def|class|import|async def|return|elif|except|raise|yield|lambda|try:|else:|finally:|with .+:|for .+:|while .+:|if .+:)/,
  /^\s*from \S+ import /,
  /^\s*(const|let|var|function|export|interface|enum|namespace|public|private|protected|static|package|fn|func|impl|struct|use|module|#include|#define|using)\b/,
  /^\s*(\$|>>>|PS>|sudo|npm|pip|bun|git|docker|kubectl|cd|ls|echo|curl)\s/,
  /^\s*<\/?[a-zA-Z][^>]*>/,
  /^\s*(\/\/|\/\*|\*\/|--\s|#!)/,
  /[;{}[\]]\s*$/,
  /^\s*[})\]]/,
  /=>|->|::|:=|===|!==|\+=|-=|==/,
  /^\s*[\w.[\]'"]+\s*=\s*\S/,
  /^\s*[\w.]+\(.*\)\s*$/,
  /^\s*@\w+/,
  /^(\t| {2,})\S/,
];

const isCodeLine = (line: string) => CODE_LINE.some(r => r.test(line));
const isMarkdown = (line: string) => /^\s*(#{1,6}\s|[-*+]\s|\d+[.)]\s|>\s|\|)/.test(line);

function looksLikeCode(lines: string[]) {
  const filled = lines.filter(l => l.trim());
  if (!filled.length || isMarkdown(filled[0])) return false;
  // Prose sentences end with punctuation and contain many words; code rarely does.
  if (filled.length === 1 && /[.!?»]$/.test(filled[0].trim())) return false;
  const hits = filled.filter(isCodeLine).length;
  return hits / filled.length >= 0.6;
}

export function autoFenceCode(markdown: string) {
  const out: string[] = [];
  let block: string[] = [];
  let fenced = false;
  const flush = () => {
    if (!block.length) return;
    if (looksLikeCode(block)) out.push('```', ...block, '```');
    else out.push(...block);
    block = [];
  };
  for (const line of markdown.replace(/\r\n?/g, '\n').split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) { flush(); fenced = !fenced; out.push(line); continue; }
    if (fenced) { out.push(line); continue; }
    if (!line.trim()) { flush(); out.push(line); continue; }
    block.push(line);
  }
  flush();
  return out.join('\n');
}
