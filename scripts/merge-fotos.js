#!/usr/bin/env node
// Genera fotos.js actualizado con los IDs ya descargados
// Corre en cualquier momento — es seguro, no sobreescribe entradas existentes

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// 1. Leer entradas existentes de fotos.js (GitHub URLs → mantenerlas tal cual)
const rawFotos = readFileSync(join(ROOT, 'public', 'js', 'fotos.js'), 'utf8');
const existing = {};
for (const [, nombre, id] of rawFotos.matchAll(/'([^']+)':\s*_B\s*\+\s*'(\d+)\.avif'/g)) {
  existing[nombre] = { id: parseInt(id), local: false };
}

// 2. Leer progreso del script de descarga
const encontrados = JSON.parse(
  readFileSync(join(__dirname, 'fotos-encontradas.json'), 'utf8')
);

// 3. Merge — los nuevos usan ruta local
const merged = { ...existing };
for (const [nombre, id] of Object.entries(encontrados)) {
  if (!merged[nombre]) {
    merged[nombre] = { id, local: true };
  }
}

// 4. Generar fotos.js
const _B_line = `const _B = 'https://raw.githubusercontent.com/JepLaGuitlla/tomaquet/main/img/players/';`;
const _L_line = `const _L = '/assets/img/players/';`;

const entries = Object.entries(merged)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([nombre, { id, local }]) => {
    const safe = nombre.replace(/'/g, "\\'");
    const prefix = local ? '_L' : '_B';
    return `  '${safe}': ${prefix} + '${id}${local ? '-t' : ''}.${local ? 'webp' : 'avif'}',`;
  });

const output = `// Fotos de jugadores — La Pausa Mundial
// Actualizado: ${new Date().toISOString().split('T')[0]}
// Total: ${entries.length} jugadores
${_B_line}
${_L_line}

const FOTOS_JUGADORES = {
${entries.join('\n')}
};
`;

writeFileSync(join(ROOT, 'public', 'js', 'fotos.js'), output);
console.log(`✅ fotos.js actualizado — ${entries.length} jugadores (${Object.values(merged).filter(v => v.local).length} locales + ${Object.values(merged).filter(v => !v.local).length} GitHub)`);
