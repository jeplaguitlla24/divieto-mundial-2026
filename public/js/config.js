import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBuM2Y9RAASDUL_bn_97T12HQzfjREVvj8",
  authDomain: "la-pausa-mundial-2026.web.app",
  projectId: "la-pausa-mundial-2026",
  storageBucket: "la-pausa-mundial-2026.firebasestorage.app",
  messagingSenderId: "434896019884",
  appId: "1:434896019884:web:2d71a647065c576ca19a09"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
