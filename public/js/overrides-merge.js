import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

export async function applyOverrides(db) {
  try {
    const snap = await getDocs(collection(db, 'overrides'));
    const map = {};
    snap.forEach(d => { const v = d.data(); if (v.nombre) map[v.nombre] = v; });
    if (typeof JUGADORES_MUNDIAL !== 'undefined') {
      for (const sel of JUGADORES_MUNDIAL) {
        for (const j of sel.jugadores) {
          const ov = map[j.nombre];
          if (!ov) continue;
          if (ov.estado  !== undefined) j.estado  = ov.estado  || null;
          if (ov.overall != null)       j.overall = ov.overall;
          if (ov.tier    != null)       j.tier    = ov.tier;
        }
      }
    }
    return map;
  } catch(e) {
    console.warn('[overrides] error al cargar:', e);
    return {};
  }
}
