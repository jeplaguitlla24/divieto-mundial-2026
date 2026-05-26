import { auth, db } from '/js/config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

export function requireAuth() {
  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(auth, async user => {
      unsub();
      if (!user) { window.location.href = '/'; return; }
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (!snap.exists() || !snap.data().nombre) {
          window.location.href = '/app/setup/';
          return;
        }
        resolve({ user, userData: snap.data() });
      } catch(e) {
        reject(e);
      }
    });
  });
}

export function getUser() {
  return new Promise(resolve => {
    const unsub = onAuthStateChanged(auth, user => {
      unsub();
      resolve(user);
    });
  });
}
