/**
 * Web Worker PGlite — point d'entrée isolé.
 * Ce fichier est chargé dans un Worker dédié via :
 *   new Worker(new URL('./pglite-worker.ts', import.meta.url), { type: 'module' })
 *
 * Il expose le moteur PostgreSQL (via PGlite + WebAssembly) dans un thread
 * séparé afin de ne pas bloquer le thread principal pendant l'exécution des
 * requêtes.
 */

import { PGlite } from "@electric-sql/pglite";
import { worker } from "@electric-sql/pglite/worker";

worker({
  async init() {
    return new PGlite();
  },
});
