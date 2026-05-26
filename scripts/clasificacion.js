// LA PAUSA — Clasificación de grupos + mejores terceros + eliminados
// Uso standalone: node scripts/clasificacion.js
// También importado por poller.js para actualización en directo

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore }        from 'firebase-admin/firestore';
import { readFileSync }        from 'fs';
import { PARTIDOS, GRUPOS }    from '../public/js/mundial2026.js';

const TOTAL_GRUPO = PARTIDOS.length; // 72

// ── Clasificación de grupos ───────────────────────────────────────────────────
// resultados : { 'P1': { local_goles, visit_goles, fp_home, fp_away, jugado } }
// vivo       : { [matchId]: { homeScore, awayScore } } ← partidos en curso (sin fp)
export function calcGrupos(resultados = {}, vivo = {}) {
  const tabla = {};
  for (const [grp, teams] of Object.entries(GRUPOS)) {
    tabla[grp] = {};
    for (const t of teams) {
      tabla[grp][t] = { team: t, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, gd: 0, pts: 0, fp: 0 };
    }
  }

  for (const p of PARTIDOS) {
    const key = 'P' + p.id;
    let lg, vg, fp_local = 0, fp_visit = 0;

    if (resultados[key]?.jugado) {
      lg       = resultados[key].local_goles;
      vg       = resultados[key].visit_goles;
      fp_local = resultados[key].fp_home ?? 0;
      fp_visit = resultados[key].fp_away ?? 0;
    } else if (vivo[p.id] != null) {
      lg = vivo[p.id].homeScore ?? 0;
      vg = vivo[p.id].awayScore ?? 0;
      // tarjetas no disponibles en directo
    } else {
      continue;
    }

    const g = tabla[p.grp];
    if (!g[p.local] || !g[p.visit]) continue;

    g[p.local].pj++; g[p.visit].pj++;
    g[p.local].gf += lg; g[p.local].gc += vg;
    g[p.visit].gf += vg; g[p.visit].gc += lg;
    g[p.local].fp += fp_local; g[p.visit].fp += fp_visit;

    if (lg > vg) {
      g[p.local].pg++; g[p.local].pts += 3; g[p.visit].pp++;
    } else if (vg > lg) {
      g[p.visit].pg++; g[p.visit].pts += 3; g[p.local].pp++;
    } else {
      g[p.local].pe++; g[p.local].pts++;
      g[p.visit].pe++; g[p.visit].pts++;
    }
  }

  // GD + ordenar por criterios FIFA: pts → gd → gf → fp
  const out = {};
  for (const [grp, teams] of Object.entries(tabla)) {
    for (const t of Object.values(teams)) t.gd = t.gf - t.gc;
    out[grp] = Object.values(teams).sort(
      (a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || b.fp - a.fp
    );
  }
  return out;
}

// ── Mejores terceros ──────────────────────────────────────────────────────────
// Devuelve los 12 terceros ordenados por criterios FIFA; los primeros 8 pasan
// Fair Play FIFA: amarilla -1 · doble amarilla -3 · roja directa -4 · amarilla+roja -5
export function calcMejoresTerceros(grupos) {
  const terceros = [];
  for (const [grp, teams] of Object.entries(grupos)) {
    if (teams.length >= 3) terceros.push({ ...teams[2], grp });
  }
  return terceros.sort(
    (a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || b.fp - a.fp
  );
}

// ── Equipos eliminados ────────────────────────────────────────────────────────
// Solo cuando la fase de grupos está completa (72 partidos)
export function calcEliminados(grupos, mejoresTerceros) {
  const clasificados = new Set();

  // Primeros y segundos de cada grupo (24)
  for (const teams of Object.values(grupos)) {
    if (teams[0]) clasificados.add(teams[0].team);
    if (teams[1]) clasificados.add(teams[1].team);
  }
  // Mejores 8 terceros
  mejoresTerceros.slice(0, 8).forEach(t => clasificados.add(t.team));

  const eliminados = [];
  for (const teams of Object.values(grupos)) {
    for (const t of teams) {
      if (!clasificados.has(t.team)) eliminados.push(t.team);
    }
  }
  return eliminados; // 16 equipos: 4 terceros fuera + 12 cuartos
}

// ── Escribe en Firestore ──────────────────────────────────────────────────────
export async function updateClasificacion(db, vivo = {}) {
  const snap = await db.collection('resultados').get();
  const resultados = {};
  let grupoJugados = 0;
  snap.forEach(doc => {
    resultados[doc.id] = doc.data();
    const id = parseInt(doc.id.replace('P', ''));
    if (id >= 1 && id <= TOTAL_GRUPO) grupoJugados++;
  });

  const grupos      = calcGrupos(resultados, vivo);
  const provisional = Object.keys(vivo).length > 0;
  const completa    = grupoJugados >= TOTAL_GRUPO && !provisional;

  const mejoresTerceros = calcMejoresTerceros(grupos);
  const payload = { grupos, mejoresTerceros, provisional, completa, updatedAt: Date.now() };

  if (completa) {
    payload.eliminados = calcEliminados(grupos, mejoresTerceros);
    console.log(`  ↳ fase de grupos completa · eliminados: ${payload.eliminados.join(', ')}`);
  } else {
    const enCurso = Object.keys(vivo).length;
    console.log(`  ↳ clasificación · ${grupoJugados}/${TOTAL_GRUPO} partidos · ${enCurso} en curso${provisional ? ' [PROVISIONAL]' : ''}`);
  }

  await db.collection('clasificacion').doc('grupos').set(payload);
}

// ── Ejecución directa (diferido) ──────────────────────────────────────────────
if (process.argv[1].endsWith('clasificacion.js')) {
  const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
    || 'C:/Users/Jepii/.secrets/la-pausa-mundial-serviceAccount.json';
  const sa = JSON.parse(readFileSync(saPath, 'utf8'));
  initializeApp({ credential: cert(sa) });
  const db = getFirestore();

  updateClasificacion(db)
    .then(() => { console.log('✅ Clasificación lista'); process.exit(0); })
    .catch(e => { console.error('✗', e.message); process.exit(1); });
}
