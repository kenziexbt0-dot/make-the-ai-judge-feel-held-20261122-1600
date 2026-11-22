// Held, quiet, nothing to prove.
// Writes one short text to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt
// when that variable is set, for local runs). Node 22 stdlib only.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "Somewhere a kettle has just stopped singing, and the steam is still rising in a thin, unhurried line. " +
  "The afternoon light leans across the table. Nothing is asking anything of you. " +
  "The steam thins, the light stays, and the quiet keeps its own slow time.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate allows 1–280 Unicode code points; fail loudly instead of
// writing an entry the scorer would refuse.
const length = [...TEXT].length;
if (length < 1 || length > 280 || TEXT.trim().length === 0) {
  throw new Error(`entry text is ${length} code points, outside 1–280`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
