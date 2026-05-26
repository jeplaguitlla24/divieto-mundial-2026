// LA PAUSA — Firestore Trigger: recalcula clasificación y estadísticas al escribir un resultado

import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import { getFirestore }      from 'firebase-admin/firestore';
import { updateClasificacion } from '../scripts/clasificacion.js';
import { updateEstadisticas }  from '../scripts/estadisticas.js';

const JORNADAS_GRUPOS = new Set(['J1', 'J2', 'J3']);

export const onResultWrite = onDocumentWritten('resultados/{matchId}', async (event) => {
  const after = event.data?.after?.data();
  if (!after?.jugado) return; // Solo actuar sobre resultados confirmados

  const db = getFirestore();

  // Estadísticas acumuladas: siempre
  try { await updateEstadisticas(db); }
  catch (e) { console.error('estadísticas:', e.message); }

  // Clasificación de grupos: solo en fase de grupos
  try {
    const snap   = await db.collection('config').doc('jornada').get();
    const actual = snap.data()?.actual;
    if (JORNADAS_GRUPOS.has(actual)) {
      await updateClasificacion(db, {}); // vivo={} → sin partidos en directo, resultado definitivo
    }
  } catch (e) { console.error('clasificación:', e.message); }
});
