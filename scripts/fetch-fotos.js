#!/usr/bin/env node
// ─────────────────────────────────────────────
// LA PAUSA — Descarga de fotos desde Sofascore
// Uso: node scripts/fetch-fotos.js
// Salida: public/assets/img/players/{id}.avif
//         scripts/fotos-encontradas.json  ← IDs encontrados
//         scripts/fotos-no-encontradas.txt ← para revisión manual
// ─────────────────────────────────────────────

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── Config ────────────────────────────────────
const OUT_DIR      = join(ROOT, 'public', 'assets', 'img', 'players');
const LOG_FOUND    = join(__dirname, 'fotos-encontradas.json');
const LOG_MISSING  = join(__dirname, 'fotos-no-encontradas.txt');
const DELAY_MS     = 600;   // entre requests — no spamear Sofascore
const SEARCH_DELAY = 800;   // entre búsquedas

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  'Referer': 'https://www.sofascore.com/',
  'Accept': 'image/avif,image/webp,*/*',
  'Accept-Language': 'es-ES,es;q=0.9',
  'Origin': 'https://www.sofascore.com',
};

// ── Leer jugadores.js ─────────────────────────
function extractJugadores() {
  const raw = readFileSync(join(ROOT, 'public', 'js', 'jugadores.js'), 'utf8');
  // Evaluar el array — convertir const X = [...] a JSON
  const match = raw.match(/const JUGADORES_MUNDIAL\s*=\s*(\[[\s\S]*\]);/);
  if (!match) throw new Error('No se encontró JUGADORES_MUNDIAL en jugadores.js');
  const data = eval(match[1]); // safe — archivo local nuestro
  const jugadores = [];
  for (const sel of data) {
    for (const j of sel.jugadores) {
      jugadores.push({ nombre: j.nombre, seleccion: sel.seleccion, club: j.club });
    }
  }
  return jugadores;
}

// ── Leer fotos.js (ya cubiertos) ─────────────
function extractCubiertos() {
  const raw = readFileSync(join(ROOT, 'public', 'js', 'fotos.js'), 'utf8');
  // Extraer claves directamente con regex — evita eval con variables externas
  const matches = [...raw.matchAll(/'([^']+)':\s*_B/g)];
  return new Set(matches.map(m => m[1]));
}

// ── Buscar jugador en Sofascore ───────────────
async function buscarJugador(nombre) {
  const q = encodeURIComponent(nombre);
  const url = `https://api.sofascore.com/api/v1/search/all?q=${q}&page=0`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status} buscando "${nombre}"`);
  const json = await res.json();

  // Filtrar solo jugadores de fútbol (tienen campo "position")
  const players = (json.results || [])
    .map(r => r.entity)
    .filter(e => e && e.position && e.id);

  if (players.length === 0) return null;

  // Match exacto por nombre completo o shortName
  const nombreLower = nombre.toLowerCase();
  const exact = players.find(p =>
    p.name?.toLowerCase() === nombreLower ||
    p.shortName?.toLowerCase() === nombreLower
  );
  if (exact) return exact;

  // Si no, el más relevante (primer resultado de fútbol)
  return players[0];
}

// ── Descargar imagen ──────────────────────────
async function descargarFoto(id, destPath) {
  const url = `https://api.sofascore.com/api/v1/player/${id}/image`;
  const res = await fetch(url, { headers: { ...HEADERS, Accept: 'image/avif,image/webp,*/*' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} descargando foto id=${id}`);
  const buffer = await res.arrayBuffer();
  writeFileSync(destPath, Buffer.from(buffer));
}

// ── Sleep ─────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Main ──────────────────────────────────────
async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const jugadores  = extractJugadores();
  const cubiertos  = extractCubiertos();

  // Cargar progreso anterior si existe
  let encontrados = {};
  if (existsSync(LOG_FOUND)) {
    encontrados = JSON.parse(readFileSync(LOG_FOUND, 'utf8'));
  }
  const yaProcesados = new Set([
    ...Object.keys(encontrados),
    ...cubiertos,
  ]);

  const pendientes = jugadores.filter(j => !yaProcesados.has(j.nombre));
  const noEncontrados = [];

  console.log(`Total jugadores: ${jugadores.length}`);
  console.log(`Ya cubiertos en fotos.js: ${cubiertos.size}`);
  console.log(`Ya procesados en sesiones anteriores: ${Object.keys(encontrados).length}`);
  console.log(`Pendientes esta sesión: ${pendientes.length}`);
  console.log('────────────────────────────────────────');

  let ok = 0, fail = 0;

  for (let i = 0; i < pendientes.length; i++) {
    const { nombre, seleccion, club } = pendientes[i];
    process.stdout.write(`[${i + 1}/${pendientes.length}] ${nombre} (${seleccion}) ... `);

    try {
      // 1. Buscar ID
      const player = await buscarJugador(nombre);
      await sleep(SEARCH_DELAY);

      if (!player || !player.id) {
        console.log('❌ No encontrado');
        noEncontrados.push(`${nombre} | ${seleccion} | ${club}`);
        fail++;
        continue;
      }

      const id = player.id;
      const destPath = join(OUT_DIR, `${id}.webp`);

      // 2. Descargar foto (skip si ya existe en disco)
      // También skip si existe la versión .avif (ya renombrada a .webp)
      if (!existsSync(destPath)) {
        await descargarFoto(id, destPath);
        await sleep(DELAY_MS);
      }

      // 3. Registrar
      encontrados[nombre] = id;
      ok++;
      console.log(`✅ id=${id} (${player.name || player.shortName})`);

    } catch (err) {
      console.log(`⚠️  Error: ${err.message}`);
      noEncontrados.push(`${nombre} | ${seleccion} | ERROR: ${err.message}`);
      fail++;
      await sleep(DELAY_MS);
    }

    // Guardar progreso cada 25 jugadores
    if ((i + 1) % 25 === 0) {
      writeFileSync(LOG_FOUND, JSON.stringify(encontrados, null, 2));
      writeFileSync(LOG_MISSING, noEncontrados.join('\n'));
      console.log(`  → progreso guardado (${i + 1}/${pendientes.length})`);
    }
  }

  // Guardar final
  writeFileSync(LOG_FOUND, JSON.stringify(encontrados, null, 2));
  writeFileSync(LOG_MISSING, noEncontrados.join('\n'));

  // ── Generar fotos-nuevas.js con todos los encontrados ──
  const allIds = { ...encontrados };
  // Añadir los de fotos.js originales (extraer IDs con regex)
  const rawFotos = readFileSync(join(ROOT, 'public', 'js', 'fotos.js'), 'utf8');
  const fotosMatches = [...rawFotos.matchAll(/'([^']+)':\s*_B\s*\+\s*'(\d+)\.avif'/g)];
  for (const [, nombre, id] of fotosMatches) {
    if (!allIds[nombre]) allIds[nombre] = parseInt(id);
  }

  const lines = Object.entries(allIds)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([nombre, id]) => `  '${nombre.replace(/'/g, "\\'")}': ${id},`);

  const output = `// LA PAUSA — IDs de Sofascore por jugador
// Generado: ${new Date().toISOString().split('T')[0]}
// Total: ${lines.length} jugadores
// Uso: fotos en public/assets/img/players/{id}.avif

const SOFA_IDS = {
${lines.join('\n')}
};

if (typeof module !== 'undefined') module.exports = SOFA_IDS;
`;

  writeFileSync(join(ROOT, 'public', 'js', 'sofa-ids.js'), output);

  console.log('\n════════════════════════════════════════');
  console.log(`✅ Encontrados:    ${ok + cubiertos.size}`);
  console.log(`❌ No encontrados: ${fail}`);
  console.log(`📁 Fotos en:       public/assets/img/players/`);
  console.log(`📄 IDs en:         public/js/sofa-ids.js`);
  console.log(`📄 Fallidos en:    scripts/fotos-no-encontradas.txt`);
}

main().catch(err => {
  console.error('Error fatal:', err);
  process.exit(1);
});
