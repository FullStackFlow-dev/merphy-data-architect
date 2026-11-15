export type EditorSnapshot = {
  id: string;
  editorId: string;
  code: string;
  name: string;
  rows: string[][];
  savedAt: string;
};

export function encodeWorkspace(value: Pick<EditorSnapshot, "editorId" | "code" | "name" | "rows">) {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  return btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(""));
}

export function decodeWorkspace(value: string) {
  const parsed: unknown = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(value), (c) => c.charCodeAt(0))));
  if (!parsed || typeof parsed !== "object") throw new Error("Document invalide");
  const p = parsed as Record<string, unknown>;
  if (typeof p.editorId !== "string" || typeof p.code !== "string" || typeof p.name !== "string" || !Array.isArray(p.rows) || !p.rows.every((row) => Array.isArray(row) && row.every((cell) => typeof cell === "string"))) throw new Error("Document invalide");
  return { editorId: p.editorId, code: p.code, name: p.name, rows: p.rows as string[][] };
}