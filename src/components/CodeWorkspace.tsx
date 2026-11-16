import { useEffect, useRef, useState } from "react";
import { Download, History, Play, Plus, Save, Share2, Square, Trash2, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { codeEditors } from "../data/code-editors";
import { decodeWorkspace, encodeWorkspace, type EditorSnapshot } from "../lib/editor-workspace";

const STORAGE = "merphy-editor-history-v1";
const initialRows = [["Ville", "Température", "Humidité"], ["Dakar", "28", "75"], ["Thiès", "30", "65"]];
function sample(id: string) {
  const item = codeEditors.find((e) => e.id === id);
  if (!item) return "";
  if (item.code) return item.code;
  if ("src" in item) {
    const encoded = new URL(item.src).searchParams.get("code");
    if (encoded) return new TextDecoder().decode(Uint8Array.from(atob(encoded.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0)));
  }
  return "";
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function isWordStart(character: string) {
  return (character >= "a" && character <= "z") || (character >= "A" && character <= "Z") || character === "_";
}

function isWordPart(character: string) {
  return isWordStart(character) || (character >= "0" && character <= "9");
}

function highlightCode(source: string, editorId: string) {
  const language = ["sql", "postgresql"].includes(editorId) ? "sql" : editorId === "dax" ? "dax" : "python";
  const keywords = language === "sql"
    ? new Set("select from where and or not like ilike order by desc asc limit offset join inner left right outer on group having count sum avg min max as distinct insert into values update set delete create table drop alter returning null is case when then else end union all with".split(" "))
    : language === "dax"
      ? new Set("calculate sum sumx average averagex count countrows filter all allexcept related relatedtable divide if switch return var true false blank".split(" "))
      : new Set("and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield true false none".split(" "));

  let html = "";
  let index = 0;
  while (index < source.length) {
    const start = index;
    const character = source[index];
    let color = "";

    if ((language !== "python" && character === "-" && source[index + 1] === "-") || character === "#") {
      color = "text-amber-300";
      while (index < source.length && source[index] !== "\n") index += 1;
    } else if (language !== "python" && character === "/" && source[index + 1] === "*") {
      color = "text-amber-300";
      index += 2;
      while (index < source.length && !(source[index] === "*" && source[index + 1] === "/")) index += 1;
      if (index < source.length) index += 2;
    } else if (character === "'" || character === '"') {
      color = "text-emerald-300";
      const delimiter = language === "python" && source.slice(index, index + 3) === character.repeat(3) ? character.repeat(3) : character;
      index += delimiter.length;
      while (index < source.length) {
        if (source[index] === "\\") {
          index += Math.min(2, source.length - index);
        } else if (source.slice(index, index + delimiter.length) === delimiter) {
          index += delimiter.length;
          break;
        } else {
          index += 1;
        }
      }
    } else if (character >= "0" && character <= "9") {
      color = "text-sky-300";
      index += 1;
      while (index < source.length && source[index] >= "0" && source[index] <= "9") index += 1;
      if (source[index] === "." && source[index + 1] >= "0" && source[index + 1] <= "9") {
        index += 1;
        while (index < source.length && source[index] >= "0" && source[index] <= "9") index += 1;
      }
    } else if (isWordStart(character)) {
      index += 1;
      while (index < source.length && isWordPart(source[index])) index += 1;
      const word = source.slice(start, index);
      let next = index;
      while (next < source.length && source[next].trim() === "") next += 1;
      if (keywords.has(word.toLowerCase())) color = "text-purple-300";
      else if (source[next] === "(") color = "text-cyan-300";
    } else {
      index += 1;
    }

    const token = source.slice(start, index);
    const escaped = escapeHtml(token);
    html += color ? \`<span class="\${color}">\${escaped}</span>\` : escaped;
  }

  return html;
}

export function CodeWorkspace() {
  const [editorId, setEditorId] = useState("postgresql");
  const [code, setCode] = useState("");
  const [name, setName] = useState("requete.sql");
  const [rows, setRows] = useState<string[][]>(initialRows);
  const [history, setHistory] = useState<EditorSnapshot[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [output, setOutput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [stdin, setStdin] = useState("Alice\n30");
  const [files, setFiles] = useState<{ name: string; bytes: Uint8Array }[]>([]);
  const worker = useRef<Worker | null>(null);
  const input = useRef<HTMLInputElement | null>(null);
  const drafts = useRef<Record<string, { code: string; name: string }>>({});
  const editor = codeEditors.find((e) => e.id === editorId) ?? codeEditors[0];

  useEffect(() => {
    setCode(sample("postgresql"));
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(STORAGE) ?? "[]");
      if (Array.isArray(saved)) {
        const valid = saved.filter((s): s is EditorSnapshot => {
          try { decodeWorkspace(encodeWorkspace(s)); return typeof s.id === "string" && typeof s.savedAt === "string" && codeEditors.some((e) => e.id === s.editorId); } catch { return false; }
        });
        setHistory(valid);
      }
      const hash = new URLSearchParams(window.location.hash.slice(1)).get("workspace");
      if (hash) {
        const shared = decodeWorkspace(hash);
        if (!codeEditors.some((e) => e.id === shared.editorId)) throw new Error();
        setEditorId(shared.editorId); setCode(shared.code); setName(shared.name); setRows(shared.rows);
        setMessage("Document partagé chargé.");
      }
    } catch { setMessage("La sauvegarde ou le lien partagé est invalide."); }
    return () => worker.current?.terminate();
  }, []);

  function changeEditor(id: string) {
    drafts.current[editorId] = { code, name };
    setEditorId(id);
    const next = codeEditors.find((e) => e.id === id);
    setCode(drafts.current[id]?.code ?? sample(id));
    setName(drafts.current[id]?.name ?? `document.${next?.extension ?? "txt"}`);
    setOutput(""); setImages([]); setMessage("");
  }

  function save() {
    const entry = { id: crypto.randomUUID(), editorId, code, name, rows, savedAt: new Date().toISOString() };
    const next = [entry, ...history];
    try { localStorage.setItem(STORAGE, JSON.stringify(next)); setHistory(next); setMessage("Version enregistrée sur cet appareil."); }
    catch { setMessage("Sauvegarde impossible : stockage local indisponible ou plein. Téléchargez votre fichier."); }
  }

  async function download() {
    try {
      let blob: Blob;
      if (editorId === "excel") {
        const XLSX = await import("xlsx");
        const book = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(book, XLSX.utils.aoa_to_sheet(rows), "Données");
        blob = new Blob([XLSX.write(book, { type: "array", bookType: "xlsx" })], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      } else blob = new Blob([code], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a"); link.href = url;
      link.download = name.replace(/\.[^.]+$/, "") + `.${editor?.extension ?? "txt"}`;
      link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMessage("Fichier téléchargé.");
    } catch { setMessage("Le téléchargement a échoué."); }
  }

  async function share() {
    const url = new URL(window.location.href);
    url.hash = new URLSearchParams({ workspace: encodeWorkspace({ editorId, code, name, rows: editorId === "excel" ? rows : [] }) }).toString();
    try {
      if (navigator.share) await navigator.share({ title: name, url: url.toString() });
      else await navigator.clipboard.writeText(url.toString());
      setMessage(navigator.share ? "Document partagé." : "Lien de partage copié.");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setMessage("Partage indisponible. Téléchargez le document pour le transmettre.");
    }
  }

  async function upload(file: File) {
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      setFiles((current) => [...current.filter((f) => f.name !== file.name), { name: file.name, bytes }]);
      if (/\.(xlsx?|csv)$/i.test(file.name) && editorId === "excel") {
        const XLSX = await import("xlsx");
        const book = XLSX.read(bytes, { type: "array" });
        const sheet = book.Sheets[book.SheetNames[0]];
        if (!sheet) throw new Error();
        const data = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, defval: "", raw: false });
        setRows(data.length ? data.map((r) => r.map(String)) : [[""]]); setName(file.name);
      } else if (/\.(py|sql|dax|txt)$/i.test(file.name)) { setCode(await file.text()); setName(file.name); }
      setMessage(`Fichier chargé : ${file.name}`);
    } catch { setMessage("Impossible de lire ce fichier."); }
  }

  function run() {
    if (!worker.current) {
      worker.current = new Worker(new URL("../lib/editor-runtime.worker.ts", import.meta.url), { type: "module" });
      worker.current.onmessage = (event) => {
        if (event.data.status) setOutput(event.data.status);
        if (event.data.done) { setOutput(event.data.output); setImages(event.data.images ?? []); setBusy(false); }
      };
      worker.current.onerror = () => { setOutput("Le moteur n’a pas pu démarrer. Vérifiez votre connexion et réessayez."); setBusy(false); worker.current?.terminate(); worker.current = null; };
    }
    setBusy(true); setOutput("Exécution…"); setImages([]);
    worker.current.postMessage({ editorId, code, stdin, files });
  }

  return <div className="overflow-hidden rounded-lg border border-border bg-card">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
      <Select value={editorId} onValueChange={changeEditor} disabled={busy}>
        <SelectTrigger aria-label="Langage de l’éditeur" className="w-52 max-w-full bg-background"><SelectValue /></SelectTrigger>
        <SelectContent>{codeEditors.map((e) => <SelectItem key={e.id} value={e.id}>{e.label}</SelectItem>)}</SelectContent>
      </Select>
      <div className="flex flex-wrap gap-1">
        <Button variant="ghost" size="icon" title="Charger un fichier" aria-label="Charger un fichier" onClick={() => input.current?.click()}><Upload /></Button>
        <Button variant="ghost" size="icon" title="Enregistrer" aria-label="Enregistrer" onClick={save}><Save /></Button>
        <Button variant="ghost" size="icon" title="Historique" aria-label="Historique" onClick={() => setHistoryOpen(true)}><History /></Button>
        <Button variant="ghost" size="icon" title="Partager" aria-label="Partager" onClick={share}><Share2 /></Button>
        <Button variant="ghost" size="icon" title="Télécharger sur ma machine" aria-label="Télécharger sur ma machine" onClick={download}><Download /></Button>
      </div>
      <input ref={input} type="file" className="hidden" aria-label="Fichier à charger" onChange={(e) => { const file = e.target.files?.[0]; if (file) void upload(file); e.target.value = ""; }} />
    </div>
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/30 px-4 py-2">
      <input aria-label="Nom du fichier" value={name} onChange={(e) => setName(e.target.value)} className="min-w-0 max-w-full rounded border border-input bg-background px-2 py-1 text-sm" />
      {editorId !== "excel" && editorId !== "dax" && <Button size="sm" onClick={busy ? () => { worker.current?.terminate(); worker.current = null; setBusy(false); setOutput("Exécution arrêtée."); } : run}>{busy ? <Square /> : <Play />}{busy ? "Arrêter" : "Exécuter"}</Button>}
      {editorId === "dax" && <span className="text-xs text-muted-foreground">DAX · édition uniquement, exécution dans Power BI</span>}
    </div>
    {editorId === "excel" ? <div className="p-4">
      <div className="mb-3 flex gap-2"><Button size="sm" variant="outline" onClick={() => setRows([...rows, Array(Math.max(1, ...rows.map((r) => r.length))).fill("")])}><Plus />Ligne</Button><Button size="sm" variant="outline" onClick={() => setRows(rows.map((r) => [...r, ""]))}><Plus />Colonne</Button></div>
      <div className="max-h-[420px] overflow-auto"><table className="w-full border-collapse text-sm"><tbody>{rows.map((row, i) => <tr key={i}><th className="border border-border bg-muted px-2 text-muted-foreground">{i + 1}</th>{row.map((cell, j) => <td key={j} className="min-w-32 border border-border"><input className="w-full bg-background p-2" aria-label={`Cellule ${i + 1}, ${j + 1}`} value={cell} onChange={(e) => setRows(rows.map((r, ri) => ri === i ? r.map((c, ci) => ci === j ? e.target.value : c) : r))} /></td>)}</tr>)}</tbody></table></div>
    </div> : <div className="relative h-[360px] w-full resize-y overflow-hidden bg-background">
      <pre aria-hidden="true" className="pointer-events-none absolute inset-0 m-0 overflow-auto whitespace-pre p-4 font-mono text-sm leading-6 text-foreground"><code dangerouslySetInnerHTML={{ __html: highlightCode(code, editorId) + "\\n" }} /></pre>
      <textarea spellCheck={false} aria-label="Code source" value={code} onChange={(e) => setCode(e.target.value)} onScroll={(e) => { const layer = e.currentTarget.previousElementSibling; if (layer instanceof HTMLElement) { layer.scrollTop = e.currentTarget.scrollTop; layer.scrollLeft = e.currentTarget.scrollLeft; } }} className="absolute inset-0 z-10 block h-full w-full resize-none overflow-auto bg-transparent p-4 font-mono text-sm leading-6 text-transparent caret-foreground selection:bg-primary/25 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-ring" />
    </div>}
    {["python", "pandas", "numpy", "matplotlib"].includes(editorId) && <div className="border-t border-border p-4"><label className="text-xs text-muted-foreground" htmlFor="workspace-stdin">Entrées standard</label><textarea id="workspace-stdin" value={stdin} onChange={(e) => setStdin(e.target.value)} className="mt-1 block h-16 w-full rounded border border-input bg-background px-2 py-1 font-mono text-sm" /></div>}
    {files.length > 0 && <div className="flex flex-wrap gap-2 border-t border-border px-4 py-2">{files.map((f) => <span key={f.name} className="inline-flex max-w-full items-center gap-1 text-xs text-muted-foreground"><span className="truncate">{f.name}</span><Button variant="ghost" size="icon" aria-label={`Retirer ${f.name}`} title="Retirer le fichier" onClick={() => setFiles(files.filter((file) => file.name !== f.name))}><Trash2 /></Button></span>)}</div>}
    {output && <pre aria-label="Résultat d’exécution" aria-live="polite" className="max-h-80 overflow-auto whitespace-pre-wrap break-words border-t border-border bg-muted/30 p-4 font-mono text-sm">{output}</pre>}
    {images.map((image, i) => <img key={i} src={`data:image/png;base64,${image}`} alt={`Graphique ${i + 1}`} className="max-h-96 w-full object-contain" />)}
    {message && <p role="status" className="border-t border-border px-4 py-2 text-sm text-muted-foreground">{message}</p>}
    <div className="border-t border-border bg-muted/30 px-4 py-2 text-right text-xs text-muted-foreground">Propulsé par <span className="font-semibold text-primary">Merphy Mademba</span></div>
    <Dialog open={historyOpen} onOpenChange={setHistoryOpen}><DialogContent className="max-h-[80vh] overflow-auto"><DialogHeader><DialogTitle>Historique</DialogTitle><DialogDescription>Versions enregistrées sur cet appareil. Les fichiers chargés doivent être chargés à nouveau.</DialogDescription></DialogHeader>
      {history.length === 0 ? <p className="text-sm text-muted-foreground">Aucune version enregistrée.</p> : history.map((entry) => <div key={entry.id} className="flex items-center justify-between gap-2 border-b border-border py-3"><div className="min-w-0"><p className="truncate text-sm font-medium">{entry.name}</p><p className="text-xs text-muted-foreground">{new Date(entry.savedAt).toLocaleString("fr-FR")}</p></div><Button size="sm" variant="outline" onClick={() => { drafts.current[editorId] = { code, name }; setEditorId(entry.editorId); setCode(entry.code); setName(entry.name); setRows(entry.rows); setOutput(""); setImages([]); setHistoryOpen(false); setMessage("Version restaurée."); }}>Restaurer</Button><Button variant="ghost" size="icon" title="Supprimer la version" aria-label={`Supprimer ${entry.name}`} onClick={() => { const next = history.filter((e) => e.id !== entry.id); try { localStorage.setItem(STORAGE, JSON.stringify(next)); setHistory(next); } catch { setMessage("Suppression impossible."); } }}><Trash2 /></Button></div>)}
    </DialogContent></Dialog>
  </div>;
}