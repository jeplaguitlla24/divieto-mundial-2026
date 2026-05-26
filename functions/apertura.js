// LA PAUSA — Cloud Functions: apertura automática J1 / J2 / J3
// Las eliminatorias (J4-J8) se abren desde closeJornada() en poller.js

import { onSchedule }   from 'firebase-functions/v2/scheduler';
import { getFirestore } from 'firebase-admin/firestore';
import { SCHEDULE, setJornada } from '../scripts/set-jornada.js';

// J1: 8 jun 2026 19:00 UTC  (3 días antes del deadline)
export const aperturaJ1 = onSchedule({
  schedule: '0 19 8 6 *',
  timeZone: 'UTC',
}, async () => {
  const db = getFirestore();
  await setJornada('J1', db, { apertura: SCHEDULE.J1.apertura });
  console.log('✅ J1 abierta');
});

// J2: 14 jun 2026 16:00 UTC  (3 días antes del deadline)
export const aperturaJ2 = onSchedule({
  schedule: '0 16 14 6 *',
  timeZone: 'UTC',
}, async () => {
  const db = getFirestore();
  await setJornada('J2', db, { apertura: SCHEDULE.J2.apertura });
  console.log('✅ J2 abierta');
});

// J3: 21 jun 2026 19:00 UTC  (3 días antes del deadline)
export const aperturaJ3 = onSchedule({
  schedule: '0 19 21 6 *',
  timeZone: 'UTC',
}, async () => {
  const db = getFirestore();
  await setJornada('J3', db, { apertura: SCHEDULE.J3.apertura });
  console.log('✅ J3 abierta');
});
