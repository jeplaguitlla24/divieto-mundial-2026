// DIVIETO — Servidor de scoring
// Mantiene el poller activo, escucha cambios de jornada en Firestore.
// Deploy: Railway / Render / cualquier plataforma Node.js
//
// Variables de entorno requeridas:
//   SA_JSON   → contenido del serviceAccount.json en base64
//   PORT      → puerto HTTP (Railway lo inyecta automáticamente)

import http        from 'http';
import { spawn }   from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { tmpdir }  from 'os';
import { join }    from 'path';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// ── Service account ───────────────────────────────────────────────────────────
let SA_PATH;
if (process.env.SA_JSON) {
  // En producción: viene en base64 como variable de entorno
  const json = Buffer.from(process.env.SA_JSON, 'base64').toString('utf8');
  SA_PATH = join(tmpdir(), 'sa.json');
  writeFileSync(SA_PATH, json);
} else {
  // Local
  SA_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS
    || 'C:/Users/Jepii/.secrets/la-pausa-mundial-serviceAccount.json';
}

const sa = JSON.parse((await import('fs')).default.readFileSync(SA_PATH, 'utf8'));
if (!getApps().length) initializeApp({ credential: cert(sa) });
const db = getFirestore();

// ── Estado ────────────────────────────────────────────────────────────────────
let currentProc    = null;
let currentJornada = null;
let startTime      = null;
const logs         = [];

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  logs.push(line);
  if (logs.length > 200) logs.shift();
}

// ── Poller ────────────────────────────────────────────────────────────────────
function startPoller(jornada) {
  if (currentProc) {
    log(`Matando poller anterior (${currentJornada})`);
    currentProc.kill();
    currentProc = null;
  }

  log(`Iniciando poller → ${jornada}`);
  currentJornada = jornada;
  startTime      = Date.now();

  // Pasar SA_PATH al subprocess como variable de entorno
  const env = { ...process.env, GOOGLE_APPLICATION_CREDENTIALS: SA_PATH };
  currentProc = spawn('node', ['scripts/poller.js', jornada], {
    stdio: 'inherit',
    env,
  });

  currentProc.on('exit', (code) => {
    log(`Poller ${jornada} terminado (código ${code})`);
    currentProc    = null;
    currentJornada = null;
    startTime      = null;
  });

  currentProc.on('error', (err) => {
    log(`Error en poller: ${err.message}`);
    currentProc = null;
  });
}

// ── Watch Firestore ───────────────────────────────────────────────────────────
db.collection('config').doc('jornada').onSnapshot(snap => {
  const j = snap.data()?.actual;
  if (!j) return;
  if (j !== currentJornada) {
    log(`config/jornada cambió → ${j}`);
    startPoller(j);
  }
}, err => log(`Firestore error: ${err.message}`));

// ── HTTP health check ─────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT) || 8080;

http.createServer((req, res) => {
  const uptime = startTime ? Math.round((Date.now() - startTime) / 1000) : null;
  const body = JSON.stringify({
    status:       'ok',
    jornada:      currentJornada,
    pollerActivo: !!currentProc,
    uptime:       uptime ? `${uptime}s` : null,
    ultimosLogs:  logs.slice(-20),
  }, null, 2);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(body);
}).listen(PORT, () => {
  log(`Health check escuchando en :${PORT}`);
});

log('DIVIETO scoring server arrancado');
