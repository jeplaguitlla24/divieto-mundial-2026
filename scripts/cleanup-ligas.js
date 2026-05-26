import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('C:/Users/Jepii/.secrets/la-pausa-mundial-serviceAccount.json', 'utf8'));
initializeApp({ credential: cert(sa) });
const db = getFirestore();

const KEEP_UID = 'GPMkUiRydYZAkdhOTDyisqbKlCS2';

const ligaRef = db.collection('ligas').doc('mundial-2026-general');
const snap = await ligaRef.get();
if (snap.exists) {
  const data = snap.data();
  const managers = (data.managers || []).filter(u => u === KEEP_UID);
  const managersInfo = {};
  if (data.managersInfo?.[KEEP_UID]) managersInfo[KEEP_UID] = data.managersInfo[KEEP_UID];
  await ligaRef.update({ managers, managersInfo });
  console.log('Liga general OK. Managers restantes:', managers.length);
} else {
  console.log('Liga general no existe');
}

const ligasSnap = await db.collection('ligas').get();
let borradas = 0;
for (const d of ligasSnap.docs) {
  if (!d.data().esGeneral) {
    const managers = d.data().managers || [];
    if (!managers.includes(KEEP_UID)) { await d.ref.delete(); borradas++; }
  }
}
console.log(`Ligas privadas huérfanas eliminadas: ${borradas}`);
console.log('Listo.');
