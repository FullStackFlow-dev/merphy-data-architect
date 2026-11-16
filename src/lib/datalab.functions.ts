import { createServerFn } from "@tanstack/react-start";

const demoSchema = [
  "CREATE TABLE employees (name TEXT, department TEXT, salary INTEGER)",
  "INSERT INTO employees VALUES ('Alice', 'Data', 65000), ('Amadou', 'BI', 58000), ('Fatou', 'Data', 72000)",
  "CREATE TABLE departments (name TEXT, budget INTEGER)",
  "INSERT INTO departments VALUES ('Data', 200000), ('BI', 120000)",
].join("; ");

function validateSqlInput(input: unknown) {
  if (!input || typeof input !== "object" || !("code" in input) || typeof input.code !== "string") {
    throw new Error("La requête SQL est invalide.");
  }
  const code = input.code.trim();
  if (!code) throw new Error("Saisissez une requête SQL.");
  if (code.length > 10_000) throw new Error("La requête dépasse la limite de 10 000 caractères.");
  if (code.split(";").filter((statement) => statement.trim()).length > 12) {
    throw new Error("Une exécution est limitée à 12 instructions SQL.");
  }
  if (/\bCOPY\b|\bCREATE\s+EXTENSION\b|\bLOAD\b/i.test(code)) {
    throw new Error("Cette instruction n’est pas autorisée dans la base de démonstration.");
  }
  return { code };
}

function jsonSafeValue(value: unknown): unknown {
  if (typeof value === "bigint") return value.toString();
  if (value instanceof Date) return value.toISOString();
  if (value instanceof Uint8Array) return Array.from(value);
  return value;
}

export const executeDemoSql = createServerFn({ method: "POST" })
  .inputValidator(validateSqlInput)
  .handler(async ({ data }) => {
    const { PGlite } = await import("@electric-sql/pglite");
    const database = new PGlite();
    try {
      await database.exec(demoSchema);
      const startedAt = performance.now();
      const results = await database.exec(data.code);
      const durationMs = Math.round(performance.now() - startedAt);
      const lastResult = results[results.length - 1];
      const rows = (lastResult?.rows ?? []).map((row) =>
        Object.fromEntries(Object.entries(row).map(([column, value]) => [column, jsonSafeValue(value)])),
      );
      const output = results.map((result) => result.rows.length
        ? JSON.stringify(result.rows.map((row) => Object.fromEntries(Object.entries(row).map(([column, value]) => [column, jsonSafeValue(value)]))), null, 2)
        : `${result.affectedRows ?? 0} ligne(s) affectée(s)`,
      ).join("\n");
      return { output: output || "Requête exécutée.", rows, durationMs };
    } finally {
      await database.close();
    }
  });
