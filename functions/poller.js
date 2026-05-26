// LA PAUSA — Poller en cloud (stateless, cada 2 min)
// Determina automáticamente qué jornadas tienen partidos activos y las sigue

import { onSchedule }      from 'firebase-functions/v2/scheduler';
import { getFirestore }    from 'firebase-admin/firestore';
import { readFileSync }    from 'fs';
import { join, dirname }   from 'path';
import { fileURLToPath }   from 'url';
import { SCHEDULE, setJornada } from '../scripts/set-jornada.js';
import { processLineups, calcFairPlay } from '../scripts/scoring.js';

const __dir = dirname(fileURLToPath(import.meta.url));
const JORNADAS_GRUPOS = new Set(['J1', 'J2', 'J3']);

const SOFA_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'application/json',
  'Origin': 'https://www.sofascore.com',
  'Referer': 'https://www.sofascore.com/',
};

function loadPartidos(jornada) {
  return JSON.parse(readFileSync(join(__dir, '../scripts/partidos', `${jornada}.json`), 'utf8'));
}

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

async function writeScores(db, jornada, puntos, detalle, meta) {
  await db.collection('puntuaciones').doc(jornada).set(
    { ...puntos, _detalle: detalle, _meta: meta },
    { merge: true }
  );
}

async function writeResult(db, matchId, ev, fp = { home: 0, away: 0 }) {
  await db.collection('resultados').doc('P' + matchId).set({
    local_goles: ev.homeScore ?? 0,
    visit_goles: ev.awayScore ?? 0,
    homeTeam:    ev.homeTeam  ?? null,
    awayTeam:    ev.awayTeam  ?? null,
    fp_home:     fp.home,
    fp_away:     fp.away,
    jugado:      true,
    timestamp:   Date.now(),
  });
  console.log(`resultados/P${matchId} · ${ev.homeTeam} ${ev.homeScore}-${ev.awayScore} ${ev.awayTeam}`);
}

async function pollMatch(db, partido, jornada) {
  const { sofaId, matchId } = partido;
  try {
    const ev = await fetchStatus(sofaId);

    // Solo salir si sabemos con certeza que no ha empezado
    if (ev.status === 'notstarted') return null;

    // Si status falló (403) intentamos lineups igualmente
    let data;
    try {
      data = await fetchLineups(sofaId);
    } catch (lineupErr) {
      if (!ev.status) return null; // partido realmente sin datos aún
      throw lineupErr;
    }

    const { puntos, detalle } = processLineups(data);
    if (Object.keys(puntos).length === 0) return null;

    const fp = JORNADAS_GRUPOS.has(jornada) ? calcFairPlay(data) : { home: 0, away: 0 };

    await writeScores(db, jornada, puntos, detalle, {
      sofaId, status: ev.status ?? 'unknown', minute: ev.minute ?? null,
      homeTeam: ev.homeTeam ?? null, awayTeam: ev.awayTeam ?? null,
      homeScore: ev.homeScore ?? null, awayScore: ev.awayScore ?? null,
      updatedAt: Date.now(),
    });

    if (ev.status === 'finished') {
      await writeResult(db, matchId, ev, fp);
      return matchId; // señal de partido terminado
    }
  } catch (e) {
    console.error(`[${sofaId}] ${e.message}`);
  }
  return null;
}

async function closeJornada(db, jornada) {
  await db.collection('puntuaciones').doc(jornada).set(
    { _meta: { completada: true, cierreAt: Date.now() } },
    { merge: true }
  );
  console.log(`✅ ${jornada} completa`);

  const JORNADAS = Object.keys(SCHEDULE);
  const idx      = JORNADAS.indexOf(jornada);
  const siguiente = JORNADAS[idx + 1];
  if (!siguiente) { console.log('Torneo terminado'); return; }

  const snap    = await db.collection('config').doc('jornada').get();
  const idxFS   = JORNADAS.indexOf(snap.data()?.actual);
  if (idxFS > idx) { console.log(`config/jornada ya en ${snap.data()?.actual}`); return; }

  const apertura = SCHEDULE[siguiente].apertura ?? Date.now();
  await setJornada(siguiente, db, { apertura });
  console.log(`Auto-avance → ${siguiente}`);
}

async function pollJornada(db, jornada) {
  const partidos  = loadPartidos(jornada);
  const snapRes   = await db.collection('resultados').get();
  const yaHechos  = new Set();
  snapRes.forEach(doc => { if (doc.data().jugado) yaHechos.add(doc.id); });

  const pendientes = partidos.filter(p => !yaHechos.has('P' + p.matchId));
  if (pendientes.length === 0) return; // ya terminados, closeJornada se habrá ejecutado antes

  console.log(`[${jornada}] Polling ${pendientes.length}/${partidos.length} partidos pendientes`);
  await Promise.allSettled(pendientes.map(p => pollMatch(db, p, jornada)));

  // Re-leer para comprobar si han terminado todos
  const snapRes2  = await db.collection('resultados').get();
  const hechos2   = new Set();
  snapRes2.forEach(doc => { if (doc.data().jugado) hechos2.add(doc.id); });

  const todosTerminados = partidos.every(p => hechos2.has('P' + p.matchId));
  if (todosTerminados) await closeJornada(db, jornada);
}

// ── Cloud Function: se ejecuta cada 2 minutos ─────────────────────────────────
export const pollActive = onSchedule({
  schedule:       '*/2 * * * *',
  timeZone:       'UTC',
  timeoutSeconds: 240,
  memory:         '256MiB',
}, async () => {
  const db  = getFirestore();
  const now = Date.now();

  for (const [jornada, cfg] of Object.entries(SCHEDULE)) {
    if (now < cfg.deadline) continue; // No ha empezado
    if (cfg.cierre && now > cfg.cierre + 4 * 60 * 60 * 1000) continue; // Más de 4h después del cierre esperado

    const metaSnap = await db.collection('puntuaciones').doc(jornada).get();
    if (metaSnap.exists && metaSnap.data()?._meta?.completada) continue; // Ya terminada

    await pollJornada(db, jornada);
  }
});
