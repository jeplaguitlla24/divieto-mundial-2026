// LA PAUSA — Poller multi-partido
// Uso: node scripts/poller.js J1
// Lee scripts/partidos/{jornada}.json y sigue todos los partidos en paralelo

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { setJornada, SCHEDULE }                        from './set-jornada.js';
import { updateClasificacion }                         from './clasificacion.js';
import { updateEstadisticas }                          from './estadisticas.js';
import { processLineups, calcFairPlay }                from './scoring.js';

const JORNADAS_GRUPOS = new Set(['J1', 'J2', 'J3']);

const __dir = dirname(fileURLToPath(import.meta.url));
const JORNADA = process.argv[2] || 'J1';
const INTERVAL_MS = 2 * 60 * 1000; // poll cada 2 minutos

const SOFA_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'application/json',
  'Origin': 'https://www.sofascore.com',
  'Referer': 'https://www.sofascore.com/',
};

// ── Carga configuración de partidos ──────────────────────────────────────────
const configPath = join(__dir, 'partidos', `${JORNADA}.json`);
let partidos;
try {
  partidos = JSON.parse(readFileSync(configPath, 'utf8'));
} catch(e) {
  console.error(`✗ No se encontró ${configPath}`);
  process.exit(1);
}
console.log(`╔══════════════════════════════════════════╗`);
console.log(`║  LA PAUSA · Poller multi-partido         ║`);
console.log(`║  Jornada : ${JORNADA.padEnd(30)}║`);
console.log(`║  Partidos: ${String(partidos.length).padEnd(30)}║`);
console.log(`║  Polling cada 2 minutos                  ║`);
console.log(`╚══════════════════════════════════════════╝\n`);

// ── Firebase ──────────────────────────────────────────────────────────────────
let db;
function initFirebase() {
  const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
    || 'C:/Users/Jepii/.secrets/la-pausa-mundial-serviceAccount.json';
  try {
    const sa = JSON.parse(readFileSync(saPath, 'utf8'));
    initializeApp({ credential: cert(sa) });
    db = getFirestore();
    console.log('✓ Firebase conectado\n');
  } catch {
    console.warn('⚠  Sin credenciales — modo consola solo\n');
    db = null;
  }
}


// ── Fetch helpers ─────────────────────────────────────────────────────────────
async function fetchStatus(sofaId) {
  const res = await fetch(`https://api.sofascore.com/api/v1/event/${sofaId}`, { headers: SOFA_HEADERS });
  if (!res.ok) return {};
  const d = await res.json();
  return {
    status:    d.event?.status?.type,
    minute:    d.event?.time?.current ?? null,
    homeTeam:  d.event?.homeTeam?.name,
    awayTeam:  d.event?.awayTeam?.name,
    homeScore: d.event?.homeScore?.current,
    awayScore: d.event?.awayScore?.current,
  };
}

async function fetchLineups(sofaId) {
  const res = await fetch(`https://api.sofascore.com/api/v1/event/${sofaId}/lineups`, { headers: SOFA_HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// ── Firestore write ───────────────────────────────────────────────────────────
async function writeScores(puntos, detalle, meta) {
  if (!db) return;
  await db.collection('puntuaciones').doc(JORNADA).set(
    { ...puntos, _detalle: detalle, _meta: meta },
    { merge: true }
  );
}

async function writeResult(matchId, ev, fp = { home: 0, away: 0 }) {
  if (!db || !matchId) return;
  await db.collection('resultados').doc('P' + matchId).set({
    local_goles:  ev.homeScore ?? 0,
    visit_goles:  ev.awayScore ?? 0,
    homeTeam:     ev.homeTeam  ?? null,
    awayTeam:     ev.awayTeam  ?? null,
    fp_home:      fp.home,
    fp_away:      fp.away,
    jugado:       true,
    timestamp:    Date.now(),
  });
  console.log(`  → resultados/P${matchId} · ${ev.homeTeam} ${ev.homeScore}-${ev.awayScore} ${ev.awayTeam} · fp ${fp.home}/${fp.away}`);
}

// ── Estado por partido ────────────────────────────────────────────────────────
const estado = {}; // sofaId → { done, label, polls }
let cerrando = false;
for (const p of partidos) {
  estado[p.sofaId] = { done: false, label: `${p.home} vs ${p.away}`, polls: 0, matchId: p.matchId, liveScore: null };
}

// ── Poll de un partido ────────────────────────────────────────────────────────
async function pollOne(partido) {
  const { sofaId, matchId } = partido;
  const st = estado[sofaId];
  if (st.done) return;

  st.polls++;
  try {
    const ev = await fetchStatus(sofaId);
    const min = ev.minute ? ` (${ev.minute}')` : '';
    console.log(`  [${sofaId}] ${st.label} · ${ev.homeScore ?? '-'}-${ev.awayScore ?? '-'} · ${ev.status ?? '?'}${min}`);

    // Solo salir si sabemos con certeza que no ha empezado
    if (ev.status === 'notstarted') return;

    // Si el status falló (403 u otro error) pero el partido debería estar en curso,
    // intentamos lineups igualmente — Sofascore a veces bloquea /event pero no /lineups
    let data;
    try {
      data = await fetchLineups(sofaId);
    } catch(lineupErr) {
      // Si tampoco hay lineups (partido aún no empezado realmente), ignorar silenciosamente
      if (!ev.status) return;
      throw lineupErr;
    }

    const { puntos, detalle } = processLineups(data);

    // Solo calcular puntos si hay al menos un jugador con rating
    if (Object.keys(puntos).length === 0) return;

    const fp = JORNADAS_GRUPOS.has(JORNADA) ? calcFairPlay(data) : { home: 0, away: 0 };

    // Guardar score en vivo para clasificación provisional
    if (ev.homeScore != null) {
      st.liveScore = { homeScore: ev.homeScore, awayScore: ev.awayScore };
    }

    await writeScores(puntos, detalle, {
      sofaId, status: ev.status ?? 'unknown', minute: ev.minute ?? null,
      homeTeam: ev.homeTeam ?? null, awayTeam: ev.awayTeam ?? null,
      homeScore: ev.homeScore ?? null, awayScore: ev.awayScore ?? null,
      updatedAt: Date.now(),
    });

    if (ev.status === 'finished') {
      await writeResult(matchId, ev, fp);
      st.done = true;
      console.log(`  ✅ [${sofaId}] ${st.label} — TERMINADO`);
      checkAllDone();
    }
  } catch(e) {
    console.error(`  ✗ [${sofaId}] ${e.message}`);
  }
}

// ── Fin de jornada ────────────────────────────────────────────────────────────
function checkAllDone() {
  const pendientes = partidos.filter(p => !estado[p.sofaId].done);
  console.log(`\n  Partidos restantes: ${pendientes.length}/${partidos.length}`);
  if (pendientes.length === 0) closeJornada();
}

async function closeJornada() {
  if (cerrando) return;
  cerrando = true;
  console.log('\n✅ Jornada completa. Todos los partidos terminados.\n');
  if (db) {
    await db.collection('puntuaciones').doc(JORNADA).set(
      { _meta: { completada: true, cierreAt: Date.now() } },
      { merge: true }
    );
    try { await updateEstadisticas(db); } catch(e) { console.warn(`  ⚠ estadísticas: ${e.message}`); }

    const JORNADAS = Object.keys(SCHEDULE);
    const idx      = JORNADAS.indexOf(JORNADA);
    const siguiente = JORNADAS[idx + 1];
    if (!siguiente) {
      console.log('  (J8 completada — torneo terminado)\n');
    } else {
      // No sobreescribir si el admin ya adelantó la jornada manualmente (grupos)
      const snap = await db.collection('config').doc('jornada').get();
      const actualEnFS = snap.data()?.actual;
      const idxFS = JORNADAS.indexOf(actualEnFS);
      if (idxFS > idx) {
        console.log(`  (config/jornada ya está en ${actualEnFS} — sin auto-avance)\n`);
      } else {
        // J4-J8: apertura = ahora (equipos recién conocidos)
        const apertura = SCHEDULE[siguiente].apertura ?? Date.now();
        const cfg = await setJornada(siguiente, db, { apertura });
        console.log(`✓ Auto-avance → ${siguiente}`);
        console.log(`  apertura : ${new Date(apertura).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })} (Madrid)`);
        console.log(`  deadline : ${new Date(cfg.deadline).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })} (Madrid)`);
        if (cfg.cierre) console.log(`  cierre   : ${new Date(cfg.cierre).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })} (Madrid)`);
        console.log('');
      }
    }
  }
  process.exit(0);
}

// ── Loop principal ────────────────────────────────────────────────────────────
async function pollAll() {
  const hora = new Date().toLocaleTimeString('es-ES');
  console.log(`\n[${hora}] Poll #${(estado[partidos[0].sofaId].polls || 0) + 1}`);
  await Promise.allSettled(partidos.map(pollOne));

  if (db && JORNADAS_GRUPOS.has(JORNADA)) {
    const vivo = {};
    for (const p of partidos) {
      const st = estado[p.sofaId];
      if (!st.done && st.liveScore != null) vivo[st.matchId] = st.liveScore;
    }
    try { await updateClasificacion(db, vivo); }
    catch (e) { console.warn(`  ⚠ clasificación: ${e.message}`); }
  }
}

initFirebase();

(async () => {
  if (db && SCHEDULE[JORNADA]) {
    try {
      const cfg = await setJornada(JORNADA, db);
      console.log(`✓ config/jornada → ${JORNADA} · deadline ${new Date(cfg.deadline).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })} (Madrid)\n`);
    } catch(e) {
      console.warn(`⚠  No se pudo actualizar config/jornada: ${e.message}\n`);
    }
  }
  pollAll();
  setInterval(pollAll, INTERVAL_MS);
})();
