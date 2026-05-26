// LA PAUSA — Scoring en directo desde Sofascore
// Uso: node scripts/live-scoring.js <eventId> <jornada>
// Ejemplo: node scripts/live-scoring.js 14083306 J1

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const EVENT_ID    = process.argv[2] || '14083306';
const JORNADA     = process.argv[3] || 'J1';
const MATCH_ID    = parseInt(process.argv[4]) || null;   // id en rival.js (1-72)
const INTERVAL_MS = 2 * 60 * 1000;

// Codes para resultados/{matchId} (mismo que grupos.js)
const MATCH_CODES = {
  1:{l:'MEX',v:'RSA'},2:{l:'KOR',v:'CZE'},3:{l:'CZE',v:'RSA'},4:{l:'MEX',v:'KOR'},5:{l:'CZE',v:'MEX'},6:{l:'RSA',v:'KOR'},
  7:{l:'CAN',v:'BIH'},8:{l:'QAT',v:'SUI'},9:{l:'SUI',v:'BIH'},10:{l:'CAN',v:'QAT'},11:{l:'SUI',v:'CAN'},12:{l:'BIH',v:'QAT'},
  13:{l:'BRA',v:'MAR'},14:{l:'HAI',v:'SCO'},15:{l:'SCO',v:'MAR'},16:{l:'BRA',v:'HAI'},17:{l:'SCO',v:'BRA'},18:{l:'MAR',v:'HAI'},
  19:{l:'USA',v:'PAR'},20:{l:'AUS',v:'TUR'},21:{l:'USA',v:'AUS'},22:{l:'TUR',v:'PAR'},23:{l:'TUR',v:'USA'},24:{l:'PAR',v:'AUS'},
  25:{l:'GER',v:'CUW'},26:{l:'CIV',v:'ECU'},27:{l:'GER',v:'CIV'},28:{l:'ECU',v:'CUW'},29:{l:'CUW',v:'CIV'},30:{l:'ECU',v:'GER'},
  31:{l:'NED',v:'JPN'},32:{l:'SWE',v:'TUN'},33:{l:'NED',v:'SWE'},34:{l:'TUN',v:'JPN'},35:{l:'JPN',v:'SWE'},36:{l:'TUN',v:'NED'},
  37:{l:'BEL',v:'EGY'},38:{l:'IRN',v:'NZL'},39:{l:'BEL',v:'IRN'},40:{l:'NZL',v:'EGY'},41:{l:'EGY',v:'IRN'},42:{l:'NZL',v:'BEL'},
  43:{l:'ESP',v:'CPV'},44:{l:'KSA',v:'URU'},45:{l:'ESP',v:'KSA'},46:{l:'URU',v:'CPV'},47:{l:'CPV',v:'KSA'},48:{l:'URU',v:'ESP'},
  49:{l:'FRA',v:'SEN'},50:{l:'IRQ',v:'NOR'},51:{l:'FRA',v:'IRQ'},52:{l:'NOR',v:'SEN'},53:{l:'NOR',v:'FRA'},54:{l:'SEN',v:'IRQ'},
  55:{l:'ARG',v:'ALG'},56:{l:'AUT',v:'JOR'},57:{l:'ARG',v:'AUT'},58:{l:'JOR',v:'ALG'},59:{l:'ALG',v:'AUT'},60:{l:'JOR',v:'ARG'},
  61:{l:'POR',v:'COD'},62:{l:'UZB',v:'COL'},63:{l:'POR',v:'UZB'},64:{l:'COL',v:'COD'},65:{l:'COL',v:'POR'},66:{l:'COD',v:'UZB'},
  67:{l:'ENG',v:'CRO'},68:{l:'GHA',v:'PAN'},69:{l:'ENG',v:'GHA'},70:{l:'PAN',v:'CRO'},71:{l:'PAN',v:'ENG'},72:{l:'CRO',v:'GHA'},
};

const SOFA_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'application/json',
  'Origin': 'https://www.sofascore.com',
  'Referer': 'https://www.sofascore.com/',
};

function ratingToPoints(rating) {
  const r = parseFloat(rating);
  if (r >= 9.5) return 14; if (r >= 9.0) return 13; if (r >= 8.6) return 12;
  if (r >= 8.2) return 11; if (r >= 8.0) return 10; if (r >= 7.8) return 9;
  if (r >= 7.6) return 8;  if (r >= 7.4) return 7;  if (r >= 7.2) return 6;
  if (r >= 7.0) return 5;  if (r >= 6.8) return 4;  if (r >= 6.6) return 3;
  if (r >= 6.4) return 2;  if (r >= 6.2) return 1;  if (r >= 6.0) return 0;
  if (r >= 5.8) return -1; if (r >= 5.6) return -2; if (r >= 5.4) return -3;
  if (r >= 5.2) return -4; if (r >= 5.0) return -5; return -6;
}

function goalBonus(pos) {
  const p = (pos || '').toUpperCase();
  return p === 'G' ? 6 : p === 'D' ? 5 : p === 'M' ? 4 : 3;
}

function calcPoints(player) {
  const s   = player.statistics || {};
  const pos = player.player?.position || 'F';
  if (!s.rating && !s.minutesPlayed) return null;
  const baseRating = s.rating ? parseFloat(s.rating) : null;
  if (baseRating === null) return null;
  let pts = ratingToPoints(baseRating);
  pts += (s.goals || 0) * goalBonus(pos);
  pts += (s.goalAssist || 0) * 1;
  pts += (s.penaltyScored || 0) * 3;
  return pts;
}

async function fetchLineups() {
  const res = await fetch(`https://api.sofascore.com/api/v1/event/${EVENT_ID}/lineups`, { headers: SOFA_HEADERS });
  if (!res.ok) throw new Error(`Sofascore lineups HTTP ${res.status}`);
  return res.json();
}

async function fetchEventStatus() {
  const res = await fetch(`https://api.sofascore.com/api/v1/event/${EVENT_ID}`, { headers: SOFA_HEADERS });
  if (!res.ok) return {};
  const d = await res.json();
  return {
    status:   d.event?.status?.type,
    minute:   d.event?.time?.current ?? null,
    homeTeam: d.event?.homeTeam?.name,
    awayTeam: d.event?.awayTeam?.name,
    homeScore: d.event?.homeScore?.current,
    awayScore: d.event?.awayScore?.current,
  };
}

function processLineups(data) {
  const puntos  = {}; // { nombre: pts }  ← lo que lee la app
  const detalle = {}; // { nombre: { pts, rating, goals, assists, mins, pos } }
  const resumen = [];

  for (const lado of ['home', 'away']) {
    const team = data[lado];
    if (!team) continue;
    for (const p of (team.players || [])) {
      const nombre = p.player?.name;
      if (!nombre) continue;
      const s   = p.statistics || {};
      const pos = p.player?.position || 'F';
      const pts = calcPoints(p);
      if (pts === null) continue;

      puntos[nombre]  = pts;
      detalle[nombre] = {
        pts,
        rating:  s.rating     ? parseFloat(s.rating) : null,
        goals:   s.goals      || 0,
        assists: s.goalAssist  || 0,
        mins:    s.minutesPlayed ?? 0,
        pos,
        team:    lado,
      };
      resumen.push({ nombre, pts, rating: s.rating ?? '-', goals: s.goals ?? 0, assists: s.goalAssist ?? 0 });
    }
  }
  return { puntos, detalle, resumen };
}

// ── Firebase ─────────────────────────────────────────────
let db;
function initFirebase() {
  const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
    || 'C:/Users/Jepii/.secrets/la-pausa-mundial-serviceAccount.json';
  try {
    const sa = JSON.parse(readFileSync(saPath, 'utf8'));
    initializeApp({ credential: cert(sa) });
    db = getFirestore();
    console.log('✓ Firebase conectado\n');
  } catch {
    console.warn('⚠  Sin credenciales en', saPath, '— modo consola solo\n');
    db = null;
  }
}

async function writeToFirestore(puntos, detalle, meta) {
  if (!db) return;
  await db.collection('puntuaciones').doc(JORNADA).set({
    ...puntos,
    _meta:   meta,
    _detalle: detalle,
  }, { merge: true });
  console.log(`  → Firestore: puntuaciones/${JORNADA} · ${Object.keys(puntos).length} jugadores`);
}

// ── Poll ─────────────────────────────────────────────────
let pollCount = 0;

async function poll() {
  pollCount++;
  const hora = new Date().toLocaleTimeString('es-ES');
  console.log(`\n[${hora}] Poll #${pollCount}`);

  try {
    const ev = await fetchEventStatus();
    console.log(`  ${ev.homeTeam ?? '?'} ${ev.homeScore ?? '-'} - ${ev.awayScore ?? '-'} ${ev.awayTeam ?? '?'} | ${ev.status}${ev.minute ? ` (${ev.minute}')` : ''}`);

    if (ev.status === 'notstarted') {
      console.log('  ⏳ No empezado todavía...');
      return;
    }

    const data = await fetchLineups();
    const { puntos, detalle, resumen } = processLineups(data);

    resumen.sort((a, b) => b.pts - a.pts).slice(0, 10).forEach(j => {
      console.log(`    ${j.nombre.padEnd(24)} | ★${String(j.rating).padStart(4)} | ${String(j.pts).padStart(3)} pts | G:${j.goals} A:${j.assists}`);
    });

    await writeToFirestore(puntos, detalle, {
      eventId:   EVENT_ID,
      status:    ev.status    ?? null,
      minute:    ev.minute    ?? null,
      homeTeam:  ev.homeTeam  ?? null,
      awayTeam:  ev.awayTeam  ?? null,
      homeScore: ev.homeScore ?? null,
      awayScore: ev.awayScore ?? null,
      updatedAt: Date.now(),
    });

    if (ev.status === 'finished') {
      if (db && MATCH_ID && MATCH_CODES[MATCH_ID]) {
        const codes = MATCH_CODES[MATCH_ID];
        await db.collection('resultados').doc('P' + MATCH_ID).set({
          local_code:   codes.l,
          visit_code:   codes.v,
          local_goles:  ev.homeScore ?? 0,
          visit_goles:  ev.awayScore ?? 0,
          jugado:       true,
          timestamp:    Date.now(),
        });
        console.log(`  → resultados/P${MATCH_ID} · ${codes.l} ${ev.homeScore}-${ev.awayScore} ${codes.v}`);
      }
      console.log('\n✅ Partido terminado. Cerrando.');
      process.exit(0);
    }
  } catch (e) {
    console.error(`  ✗ ${e.message}`);
  }
}

console.log(`╔══════════════════════════════════════╗
║  LA PAUSA · Scoring en directo       ║
║  Evento : ${EVENT_ID.toString().padEnd(26)}║
║  Jornada: ${JORNADA.padEnd(26)}║
║  Partido: ${(MATCH_ID ? 'P' + MATCH_ID : '—').padEnd(26)}║
║  Polling cada 2 minutos              ║
╚══════════════════════════════════════╝`);

initFirebase();
poll();
setInterval(poll, INTERVAL_MS);
