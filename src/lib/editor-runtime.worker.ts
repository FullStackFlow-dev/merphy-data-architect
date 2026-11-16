/// <reference lib="webworker" />
let database: import("@electric-sql/pglite").PGlite | undefined;

self.onmessage = async (event: MessageEvent<{ editorId: string; code: string }>) => {
  const { editorId, code } = event.data;
  try {
    if (editorId !== "sql" && editorId !== "postgresql") {
      self.postMessage({
        output: "Exécution Python indisponible : un service de bac à sable côté serveur doit être configuré avant d’exécuter du code.",
        done: true,
        error: true,
      });
      return;
    }
    if (!database) {
      self.postMessage({ status: "Initialisation de la base PostgreSQL de démonstration…" });
      const { PGlite } = await import("@electric-sql/pglite");
      database = new PGlite();
      await database.exec("CREATE TABLE employees (name TEXT, department TEXT, salary INTEGER); INSERT INTO employees VALUES ('Alice', 'Data', 65000), ('Amadou', 'BI', 58000), ('Fatou', 'Data', 72000); CREATE TABLE departments (name TEXT, budget INTEGER); INSERT INTO departments VALUES ('Data', 200000), ('BI', 120000);");
    }
    self.postMessage({ status: "Exécution de la requête sur les données synthétiques…" });
    const results = await database.exec(code);
    self.postMessage({
      output: results.map((result) => result.rows.length ? JSON.stringify(result.rows, null, 2) : `${result.affectedRows ?? 0} ligne(s) affectée(s)`).join("\n"),
      done: true,
    });
  } catch (error) {
    self.postMessage({
      output: error instanceof Error ? error.message : String(error),
      done: true,
      error: true,
    });
  }
};