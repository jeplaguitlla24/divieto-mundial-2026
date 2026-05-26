// Sincroniza overrides de Firestore → jugadores.js
// Uso: node scripts/sync-overrides-to-jugadores.js
// Actualiza overall y tier en jugadores.js con los valores del admin

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { GoogleAuth } from 'google-auth-library';

const __dirname = dirname(fileURLToPath(import.meta.url));
const JUGADORES_PATH = join(__dirname, '../public/js/jugadores.js');

// ── Credenciales ──────────────────────────────────────────────────────────────
const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
  || 'C:/Users/Jepii/.secrets/la-pausa-mundial-serviceAccount.json';
const sa = JSON.parse(readFileSync(saPath, 'utf8'));
const projectId = sa.project_id;

// ── Leer jugadores.js ─────────────────────────────────────────────────────────
const raw = readFileSync(JUGADORES_PATH, 'utf8');

const headerMatch = raw.match(/^([\s\S]*?const JUGADORES_MUNDIAL = )/);
const header = headerMatch ? headerMatch[1] : 'const JUGADORES_MUNDIAL = ';
const footer = ';\n';

const jsonStart = raw.indexOf('[');
const jsonEnd   = raw.lastIndexOf(']') + 1;
const jugadores = JSON.parse(raw.slice(jsonStart, jsonEnd));

// ── Leer overrides via REST API ───────────────────────────────────────────────
const auth = new GoogleAuth({ credentials: sa, scopes: ['https://www.googleapis.com/auth/datastore'] });
const token = await auth.getAccessToken();

const baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/overrides?pageSize=300`;
const allDocs = [];
let pageToken = '';
try {
  do {
    const url = pageToken ? `${baseUrl}&pageToken=${pageToken}` : baseUrl;
    const res  = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const body = await res.json();
    if (!res.ok) {
      console.warn(`⚠ Firestore REST error ${res.status}: ${JSON.stringify(body)}`);
      console.warn('  Usando jugadores.js sin cambios.');
      process.exit(0);
    }
    for (const d of (body.documents || [])) allDocs.push(d);
    pageToken = body.nextPageToken || '';
  } while (pageToken);
} catch (e) {
  console.warn(`⚠ No se pudo conectar con Firestore: ${e.message}`);
  console.warn('  Usando jugadores.js sin cambios.');
  process.exit(0);
}

const overrides = {};
for (const doc of allDocs) {
  const f = doc.fields || {};
  const nombre = f.nombre?.stringValue;
  if (!nombre) continue;
  overrides[nombre] = {
    overall: f.overall?.integerValue != null ? Number(f.overall.integerValue) : null,
    tier:    f.tier?.stringValue || null,
  };
}

console.log(`\n✓ ${Object.keys(overrides).length} overrides cargados de Firestore (REST)`);

// ── Aplicar overrides a jugadores ─────────────────────────────────────────────
let updated = 0;
let skipped = 0;
const matched = new Set();

for (const sel of jugadores) {
  for (const j of sel.jugadores) {
    const ov = overrides[j.nombre];
    if (!ov) continue;
    matched.add(j.nombre);

    let changed = false;
    if (ov.overall != null && ov.overall !== j.overall) {
      j.overall = ov.overall;
      changed = true;
    }
    if (ov.tier && ov.tier !== j.tier) {
      j.tier = ov.tier;
      changed = true;
    }

    if (changed) {
      console.log(`  ↺  ${j.nombre}: overall=${j.overall} tier=${j.tier}`);
      updated++;
    } else {
      skipped++;
    }
  }
}

const unmatched = Object.keys(overrides).filter(n => !matched.has(n));
if (unmatched.length) {
  console.log(`\n⚠ ${unmatched.length} overrides sin match en jugadores.js:`);
  for (const n of unmatched) console.log(`  ✗  "${n}" (overall=${overrides[n].overall} tier=${overrides[n].tier})`);
}

console.log(`\n✓ ${updated} jugadores actualizados, ${skipped} sin cambios`);

// ── Escribir jugadores.js actualizado ────────────────────────────────────────
const newJson = JSON.stringify(jugadores, null, 2);
writeFileSync(JUGADORES_PATH, header + newJson + footer, 'utf8');

console.log(`✓ jugadores.js guardado\n`);
process.exit(0);
