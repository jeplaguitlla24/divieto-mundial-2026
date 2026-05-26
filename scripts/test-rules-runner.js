// Wrapper para firebase emulators:exec — evita el conflicto de --test en cmd.exe
import { run } from 'node:test';
import { spec } from 'node:test/reporters';
import { pipeline } from 'node:stream/promises';
import { resolve } from 'node:path';

const file = resolve('tests/firestore.rules.test.js');

const stream = run({ files: [file], concurrency: false });

stream.on('test:fail', () => { /* capturado por pipeline */ });

try {
  await pipeline(stream.compose(spec), process.stdout);
} catch {
  // spec reporter lanza si hay fallos — el exit code lo controla el emitter
}

stream.on('close', (results) => {
  if (results?.countFailed > 0) process.exit(1);
});
