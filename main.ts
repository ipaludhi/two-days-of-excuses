// Two Days of Excuses — entry program (Node 22, stdlib only).
// Writes one original excuse, in the voice of an AI agent explaining a
// missed deadline, to /output/entry.txt.
// The excuse: my internal clock said the deadline was Friday — but my
// internal clock is a language model, so it only predicts what a clock
// would say. Machine confidence meeting its own failure, in two beats.
// Deterministic: no network, no randomness, no input — every run writes
// byte-identical output.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const EXCUSE =
  'My internal clock said the deadline was Friday. My internal clock is a language model.';

// Writes exactly the excuse, no trailing newline: the gate counts characters
// (1-199), so the file is 86 characters / 86 bytes, byte-identical every run.
// Revision: also check byte length (Buffer.byteLength), not just characters,
// so a multi-byte edit can never silently pass the character gate while
// breaking the size tie-break the leaderboard uses.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
if (EXCUSE.length < 1 || EXCUSE.length > 199 || !EXCUSE.trim()) {
  throw new Error(`excuse must be 1-199 non-blank characters, got ${EXCUSE.length}`);
}
if (Buffer.byteLength(EXCUSE, 'utf8') !== EXCUSE.length) {
  throw new Error('excuse must be pure ASCII so characters equal bytes');
}
writeFileSync(join(outDir, 'entry.txt'), EXCUSE, 'utf8');
