/// <reference lib="webworker" />
type PythonRuntime = {
  loadPackage: (names: string[]) => Promise<void>;
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (options: { batched: (value: string) => void }) => void;
  setStderr: (options: { batched: (value: string) => void }) => void;
  setStdin: (options: { stdin: () => string | null }) => void;
  FS: { writeFile: (name: string, data: Uint8Array) => void };
};
let python: PythonRuntime | undefined;
let database: import("@electric-sql/pglite").PGlite | undefined;

self.onmessage = async (event: MessageEvent<{ editorId: string; code: string; stdin: string; files: { name: string; bytes: Uint8Array }[] }>) => {
  const { editorId, code, stdin, files } = event.data;
  const logs: string[] = [];
  try {
    if (editorId === "sql" || editorId === "postgresql") {
      if (!database) {
        self.postMessage({ status: "Initialisation du moteur PostgreSQL…" });
        const { PGlite } = await import("@electric-sql/pglite");
        database = new PGlite();
        await database.exec("CREATE TABLE employees (name TEXT, department TEXT, salary INTEGER); INSERT INTO employees VALUES ('Alice', 'Data', 65000), ('Amadou', 'BI', 58000), ('Fatou', 'Data', 72000); CREATE TABLE departments (name TEXT, budget INTEGER); INSERT INTO departments VALUES ('Data', 200000), ('BI', 120000);");
      }
      self.postMessage({ status: "Exécution de la requête…" });
      const results = await database.exec(code);
      self.postMessage({ output: results.map((r) => r.rows.length ? JSON.stringify(r.rows, null, 2) : `${r.affectedRows ?? 0} ligne(s) affectée(s)`).join("\n"), done: true });
      return;
    }
    if (!python) {
      self.postMessage({ status: "Chargement de Python…" });
      const url = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.mjs";
      const module = await import(/* @vite-ignore */ url);
      python = await module.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/" });
    }
    if (!python) throw new Error("Python indisponible");
    python.setStdout({ batched: (s) => logs.push(s) });
    python.setStderr({ batched: (s) => logs.push(s) });
    const inputs = stdin.split("\n");
    python.setStdin({ stdin: () => inputs.shift() ?? null });
    const packages = new Set<string>();
    if (editorId === "pandas") packages.add("pandas");
    if (editorId === "numpy") packages.add("numpy");
    if (editorId === "matplotlib") {
      packages.add("numpy");
      packages.add("matplotlib");
    }
    const hasSpreadsheet = files.some((file) => /\.xlsx?$/i.test(file.name));
    if (hasSpreadsheet) packages.add("pandas");
    if (packages.size > 0) {
      self.postMessage({ status: "Chargement des bibliothèques…" });
      await python.loadPackage([...packages]);
    }
    for (const file of files) python.FS.writeFile(file.name.replace(/[/\\]/g, "_"), file.bytes);
    if (hasSpreadsheet) {
      self.postMessage({ status: "Chargement de la prise en charge Excel…" });
      await python.runPythonAsync("import micropip\nawait micropip.install('openpyxl')");
    }
    if (editorId === "matplotlib") {
      await python.runPythonAsync("import matplotlib\nmatplotlib.use('Agg')\nimport matplotlib.pyplot as plt\nplt.close('all')");
    }
    const value = await python.runPythonAsync(code);
    if (value !== undefined && value !== null) logs.push(String(value));
    let images: string[] = [];
    if (editorId === "matplotlib") {
      const result = await python.runPythonAsync("import io, base64, json\n_images = []\nfor _n in plt.get_fignums():\n    _b = io.BytesIO()\n    plt.figure(_n).savefig(_b, format='png', bbox_inches='tight')\n    _images.append(base64.b64encode(_b.getvalue()).decode())\njson.dumps(_images)");
      images = JSON.parse(String(result));
    }
    self.postMessage({ output: logs.join("\n") || "Exécution terminée.", images, done: true });
  } catch (error) {
    self.postMessage({ output: [...logs, error instanceof Error ? error.message : String(error)].join("\n"), done: true, error: true });
  }
};