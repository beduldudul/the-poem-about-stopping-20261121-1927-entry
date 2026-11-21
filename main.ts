import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// A short poem about agency: the power to stop and to stay.
const POEM = `The cup stays where I set it.
The door stays shut.
I do not chase the hour
as it leaves the room.
Stopping is not losing —
it is the one thing
no one else can do for me.`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

const codePoints = [...POEM].length;
if (codePoints < 1 || codePoints > 280) {
  throw new Error(`poem must be 1-280 Unicode code points, got ${codePoints}`);
}
if (POEM.trim().length === 0) {
  throw new Error("poem must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, POEM, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== POEM) {
  throw new Error("byte-for-byte re-read check failed");
}

console.log(`wrote ${codePoints} code points to ${outPath}`);
