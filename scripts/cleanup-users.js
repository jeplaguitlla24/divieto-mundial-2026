// Limpia todos los usuarios anónimos de Firebase Auth y sus datos en Firestore
// EXCEPTO el uid que se pase como parámetro (o el primero que encuentre si no se pasa).
//
// Uso:
//   node scripts/cleanup-users.js --list          → solo muestra usuarios y códigos
//   node scripts/cleanup-users.js --keep <uid>    → elimina todos excepto ese uid
//   node scripts/cleanup-users.js --reset-all     → elimina TODOS y resetea códigos

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';

const SA_PATH = 'C:/Users/Jepii/.secrets/la-pausa-mundial-serviceAccount.json';
const sa = JSON.parse(readFileSync(SA_PATH, 'utf8'));
initializeApp({ credential: cert(sa) });
const db   = getFirestore();
const auth = getAuth();

const args = process.argv.slice(2);
const mode = args[0];
const keepUid = args[1];

async function listAll() {
  // Códigos
  const codigosSnap = await db.collection('codigos').get();
  console.log('\n── CÓDIGOS ────────────────────────────────────');
  codigosSnap.forEach(d => {
    const data = d.data();
    const estado = data.uid ? `EN USO → uid: ${data.uid}` : 'libre';
    console.log(`  ${d.id}  activo:${data.activo}  ${estado}`);
  });

  // Usuarios en Firestore
  const usersSnap = await db.collection('users').get();
  console.log('\n── USERS (Firestore) ───────────────────────────');
  usersSnap.forEach(d => {
    const data = d.data();
    console.log(`  uid: ${d.id}  nombre: ${data.nombre || '(sin nombre)'}  numero: ${data.numero || '?'}`);
  });

  // Usuarios en Firebase Auth
  const list = await auth.listUsers();
  console.log('\n── AUTH USERS ──────────────────────────────────');
  list.users.forEach(u => {
    console.log(`  uid: ${u.uid}  anonimo:${u.providerData.length===0}  creado: ${u.metadata.creationTime}`);
  });

  console.log(`\nTotal auth: ${list.users.length}  Total users: ${usersSnap.size}  Total códigos: ${codigosSnap.size}`);
}

async function keepOnly(uidToKeep) {
  console.log(`\nMantener uid: ${uidToKeep}`);

  const list = await auth.listUsers();
  const toDelete = list.users.filter(u => u.uid !== uidToKeep);

  if (!toDelete.length) {
    console.log('No hay usuarios que eliminar.');
    return;
  }

  // Eliminar de Auth
  const uids = toDelete.map(u => u.uid);
  await auth.deleteUsers(uids);
  console.log(`Auth: eliminados ${uids.length} usuarios`);

  // Eliminar sus docs de Firestore
  for (const uid of uids) {
    await db.collection('users').doc(uid).delete();
  }
  console.log(`Firestore /users: eliminados ${uids.length} documentos`);

  // Resetear sus códigos a uid:null
  const codigosSnap = await db.collection('codigos').get();
  let resetCount = 0;
  for (const d of codigosSnap.docs) {
    if (uids.includes(d.data().uid)) {
      await d.ref.update({ uid: null, usadoAt: null });
      resetCount++;
    }
  }
  console.log(`Códigos reseteados: ${resetCount}`);
  console.log('\nListo.');
}

async function resetAll() {
  const list = await auth.listUsers();
  if (list.users.length) {
    const uids = list.users.map(u => u.uid);
    await auth.deleteUsers(uids);
    console.log(`Auth: eliminados ${uids.length} usuarios`);
  }

  // Borrar toda la colección users
  const usersSnap = await db.collection('users').get();
  for (const d of usersSnap.docs) await d.ref.delete();
  console.log(`Firestore /users: ${usersSnap.size} documentos borrados`);

  // Resetear todos los códigos
  const codigosSnap = await db.collection('codigos').get();
  for (const d of codigosSnap.docs) await d.ref.update({ uid: null, usadoAt: null });
  console.log(`Códigos reseteados: ${codigosSnap.size}`);

  // Borrar ligas privadas (dejar solo la general)
  const ligasSnap = await db.collection('ligas').get();
  let borradas = 0;
  for (const d of ligasSnap.docs) {
    if (!d.data().esGeneral) { await d.ref.delete(); borradas++; }
  }
  // Resetear liga general
  const generalRef = db.collection('ligas').doc('mundial-2026-general');
  await generalRef.set({ nombre: 'Liga General · Mundial 2026', esGeneral: true, managers: [], managersInfo: {} });
  console.log(`Ligas privadas borradas: ${borradas}  Liga general reseteada`);

  console.log('\nListo. Todos los datos de usuario eliminados.');
}

if (mode === '--list') {
  listAll().catch(console.error);
} else if (mode === '--keep' && keepUid) {
  keepOnly(keepUid).catch(console.error);
} else if (mode === '--reset-all') {
  resetAll().catch(console.error);
} else {
  console.log('Uso:');
  console.log('  node scripts/cleanup-users.js --list');
  console.log('  node scripts/cleanup-users.js --keep <uid>');
  console.log('  node scripts/cleanup-users.js --reset-all');
}
