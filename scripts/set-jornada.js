// LA PAUSA — Configura la jornada activa en Firestore
// Uso: node scripts/set-jornada.js J1
// También usado internamente por poller.js al arrancar

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore }        from 'firebase-admin/firestore';
import { readFileSync }        from 'fs';

export const SCHEDULE = {
  // apertura = 3 días antes del deadline (fase de grupos, equipos conocidos)
  J1: { apertura: 1780945200000, deadline: 1781204400000, cierre: 1781668800000, label: 'Jornada 1 — Fase de grupos',     fase: 'grupos'  },
  J2: { apertura: 1781539200000, deadline: 1781798400000, cierre: 1782187200000, label: 'Jornada 2 — Fase de grupos',     fase: 'grupos'  },
  J3: { apertura: 1782068400000, deadline: 1782327600000, cierre: 1782610200000, label: 'Jornada 3 — Fase de grupos',     fase: 'grupos'  },
  // apertura = null → se fija en vivo al terminar la jornada anterior (equipos por confirmar)
  J4: { apertura: null, deadline: 1782673200000, cierre: 1783137600000, label: 'Jornada 4 — Ronda de 32',        fase: 'r32'     },
  J5: { apertura: null, deadline: 1783184400000, cierre: 1783463400000, label: 'Jornada 5 — Octavos de final',   fase: 'octavos' },
  J6: { apertura: null, deadline: 1783627200000, cierre: 1783827000000, label: 'Jornada 6 — Cuartos de final',   fase: 'cuartos' },
  J7: { apertura: null, deadline: 1784055600000, cierre: 1784151000000, label: 'Jornada 7 — Semifinales',        fase: 'semis'   },
  J8: { apertura: null, deadline: 1784408400000, cierre: 1784496600000, label: 'Jornada 8 — 3er puesto y Final', fase: 'final'   },
  TEST: { apertura: 1780094062000, deadline: 1780142100000, cierre: 1780156800000, label: 'TEST — Curaçao vs Escocia', fase: 'grupos' },
};

// overrides permite pasar apertura dinámica desde el poller (eliminatorias)
export async function setJornada(jornada, db, overrides = {}) {
  const cfg = SCHEDULE[jornada];
  if (!cfg) throw new Error(`Jornada desconocida: ${jornada}`);
  await db.collection('config').doc('jornada').set({
    actual:    jornada,
    apertura:  overrides.apertura ?? cfg.apertura ?? null,
    deadline:  cfg.deadline,
    cierre:    cfg.cierre ?? null,
    label:     cfg.label,
    fase:      cfg.fase,
    updatedAt: Date.now(),
  });
  return cfg;
}

// ── Ejecución directa ─────────────────────────────────────────────────────────
if (process.argv[1].endsWith('set-jornada.js')) {
  const JORNADA = process.argv[2];
  if (!JORNADA || !SCHEDULE[JORNADA]) {
    console.error('Uso: node scripts/set-jornada.js <J1|J2|...|J8>');
    process.exit(1);
  }

  const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
    || 'C:/Users/Jepii/.secrets/la-pausa-mundial-serviceAccount.json';
  const sa = JSON.parse(readFileSync(saPath, 'utf8'));
  initializeApp({ credential: cert(sa) });
  const db = getFirestore();

  setJornada(JORNADA, db).then(cfg => {
    console.log(`✅ config/jornada actualizado`);
    console.log(`   actual   : ${JORNADA}`);
    console.log(`   deadline : ${new Date(cfg.deadline).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })} (Madrid)`);
    console.log(`   fase     : ${cfg.fase}`);
    process.exit(0);
  }).catch(e => { console.error('✗', e.message); process.exit(1); });
}
