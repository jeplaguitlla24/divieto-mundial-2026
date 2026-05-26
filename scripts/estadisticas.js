// LA PAUSA — Estadísticas acumuladas de jugadores
// Agrega los _detalle de puntuaciones/J* y escribe estadisticas/jugadores
// Uso standalone: node scripts/estadisticas.js
// También importado por poller.js al terminar cada jornada

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore }        from 'firebase-admin/firestore';
import { readFileSync }        from 'fs';
import { SCHEDULE }            from './set-jornada.js';

const JORNADAS = Object.keys(SCHEDULE); // ['J1','J2',...,'J8']

// ── Cálculo puro ──────────────────────────────────────────────────────────────
// jornadasData: { J1: { _detalle: { Messi: { pts, rating, goals, ... } } }, ... }
export function calcEstadisticas(jornadasData) {
  const acum = {};

  for (const [jornada, doc] of Object.entries(jornadasData)) {
    const detalle = doc._detalle || {};
    for (const [nombre, d] of Object.entries(detalle)) {
      if (!acum[nombre]) {
        acum[nombre] = { pj: 0, totalPts: 0, goals: 0, assists: 0, sumRating: 0, ratingCount: 0, jornadas: {} };
      }
      const j = acum[nombre];
      j.pj++;
      j.totalPts  += d.pts    || 0;
      j.goals     += d.goals  || 0;
      j.assists   += d.assists || 0;
      if (d.rating != null) { j.sumRating += d.rating; j.ratingCount++; }
      j.jornadas[jornada] = {
        pts:    d.pts    ?? null,
        rating: d.rating ?? null,
        goals:  d.goals  || 0,
        assists:d.assists || 0,
        mins:   d.mins   || 0,
        pos:    d.pos    || null,
        team:   d.team   || null,
      };
    }
  }

  // Calcular avgRating y limpiar campos de cálculo
  for (const j of Object.values(acum)) {
    j.avgRating = j.ratingCount > 0
      ? Math.round((j.sumRating / j.ratingCount) * 100) / 100
      : null;
    delete j.sumRating;
    delete j.ratingCount;
  }

  return acum;
}

// ── Escribe en Firestore ──────────────────────────────────────────────────────
export async function updateEstadisticas(db) {
  // Leer todos los documentos de puntuaciones que existan
  const jornadasData = {};
  for (const jornada of JORNADAS) {
    const snap = await db.collection('puntuaciones').doc(jornada).get();
    if (snap.exists) jornadasData[jornada] = snap.data();
  }

  const jugadores = calcEstadisticas(jornadasData);
  const total = Object.keys(jugadores).length;

  await db.collection('estadisticas').doc('jugadores').set({
    jugadores,
    updatedAt: Date.now(),
  });

  console.log(`  ↳ estadísticas · ${total} jugadores · ${Object.keys(jornadasData).length} jornadas`);
  return jugadores;
}

// ── Ejecución directa ─────────────────────────────────────────────────────────
if (process.argv[1].endsWith('estadisticas.js')) {
  const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
    || 'C:/Users/Jepii/.secrets/la-pausa-mundial-serviceAccount.json';
  const sa = JSON.parse(readFileSync(saPath, 'utf8'));
  initializeApp({ credential: cert(sa) });
  const db = getFirestore();

  updateEstadisticas(db)
    .then(() => { console.log('✅ Estadísticas actualizadas'); process.exit(0); })
    .catch(e => { console.error('✗', e.message); process.exit(1); });
}
