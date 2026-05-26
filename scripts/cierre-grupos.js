// LA PAUSA — Cierre de fase de grupos
// Uso: node scripts/cierre-grupos.js
// Lee resultados/ en Firestore, calcula clasificados/eliminados y actualiza torneo/estado.

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore }        from 'firebase-admin/firestore';
import { readFileSync }        from 'fs';

// ── Datos (mirror de grupos.js) ───────────────────────────────────────────────
const EQUIPOS = [
  {s:'MEXICO',               g:'A'}, {s:'SUDAFRICA',             g:'A'},
  {s:'COREA DEL SUR',        g:'A'}, {s:'REPUBLICA CHECA',       g:'A'},
  {s:'CANADA',               g:'B'}, {s:'BOSNIA Y HERZEGOVINA',  g:'B'},
  {s:'QATAR',                g:'B'}, {s:'SUIZA',                 g:'B'},
  {s:'BRASIL',               g:'C'}, {s:'MARRUECOS',             g:'C'},
  {s:'HAITI',                g:'C'}, {s:'ESCOCIA',               g:'C'},
  {s:'ESTADOS UNIDOS',       g:'D'}, {s:'PARAGUAY',              g:'D'},
  {s:'AUSTRALIA',            g:'D'}, {s:'TURQUIA',               g:'D'},
  {s:'ALEMANIA',             g:'E'}, {s:'CURAZAO',               g:'E'},
  {s:'COSTA DE MARFIL',      g:'E'}, {s:'ECUADOR',               g:'E'},
  {s:'PAISES BAJOS',         g:'F'}, {s:'JAPON',                 g:'F'},
  {s:'SUECIA',               g:'F'}, {s:'TUNEZ',                 g:'F'},
  {s:'BELGICA',              g:'G'}, {s:'EGIPTO',                g:'G'},
  {s:'IRAN',                 g:'G'}, {s:'NUEVA ZELANDA',         g:'G'},
  {s:'ESPAÑA',          g:'H'}, {s:'CABO VERDE',            g:'H'},
  {s:'ARABIA SAUDI',         g:'H'}, {s:'URUGUAY',               g:'H'},
  {s:'FRANCIA',              g:'I'}, {s:'SENEGAL',               g:'I'},
  {s:'IRAK',                 g:'I'}, {s:'NORUEGA',               g:'I'},
  {s:'ARGENTINA',            g:'J'}, {s:'ARGELIA',               g:'J'},
  {s:'AUSTRIA',              g:'J'}, {s:'JORDANIA',              g:'J'},
  {s:'PORTUGAL',             g:'K'}, {s:'R.D. CONGO',            g:'K'},
  {s:'UZBEKISTAN',           g:'K'}, {s:'COLOMBIA',              g:'K'},
  {s:'INGLATERRA',           g:'L'}, {s:'CROACIA',               g:'L'},
  {s:'GHANA',                g:'L'}, {s:'PANAMA',                g:'L'},
];

const CODE_TO_S = {
  MEX:'MEXICO',RSA:'SUDAFRICA',KOR:'COREA DEL SUR',CZE:'REPUBLICA CHECA',
  CAN:'CANADA',BIH:'BOSNIA Y HERZEGOVINA',QAT:'QATAR',SUI:'SUIZA',
  BRA:'BRASIL',MAR:'MARRUECOS',HAI:'HAITI',SCO:'ESCOCIA',
  USA:'ESTADOS UNIDOS',PAR:'PARAGUAY',AUS:'AUSTRALIA',TUR:'TURQUIA',
  GER:'ALEMANIA',CUW:'CURAZAO',CIV:'COSTA DE MARFIL',ECU:'ECUADOR',
  NED:'PAISES BAJOS',JPN:'JAPON',SWE:'SUECIA',TUN:'TUNEZ',
  BEL:'BELGICA',EGY:'EGIPTO',IRN:'IRAN',NZL:'NUEVA ZELANDA',
  ESP:'ESPAÑA',CPV:'CABO VERDE',KSA:'ARABIA SAUDI',URU:'URUGUAY',
  FRA:'FRANCIA',SEN:'SENEGAL',IRQ:'IRAK',NOR:'NORUEGA',
  ARG:'ARGENTINA',ALG:'ARGELIA',AUT:'AUSTRIA',JOR:'JORDANIA',
  POR:'PORTUGAL',COD:'R.D. CONGO',UZB:'UZBEKISTAN',COL:'COLOMBIA',
  ENG:'INGLATERRA',CRO:'CROACIA',GHA:'GHANA',PAN:'PANAMA',
};

const PARTIDOS = [
  {id:1,l:'MEX',v:'RSA'},{id:2,l:'KOR',v:'CZE'},{id:3,l:'CZE',v:'RSA'},{id:4,l:'MEX',v:'KOR'},{id:5,l:'CZE',v:'MEX'},{id:6,l:'RSA',v:'KOR'},
  {id:7,l:'CAN',v:'BIH'},{id:8,l:'QAT',v:'SUI'},{id:9,l:'SUI',v:'BIH'},{id:10,l:'CAN',v:'QAT'},{id:11,l:'SUI',v:'CAN'},{id:12,l:'BIH',v:'QAT'},
  {id:13,l:'BRA',v:'MAR'},{id:14,l:'HAI',v:'SCO'},{id:15,l:'SCO',v:'MAR'},{id:16,l:'BRA',v:'HAI'},{id:17,l:'SCO',v:'BRA'},{id:18,l:'MAR',v:'HAI'},
  {id:19,l:'USA',v:'PAR'},{id:20,l:'AUS',v:'TUR'},{id:21,l:'USA',v:'AUS'},{id:22,l:'TUR',v:'PAR'},{id:23,l:'TUR',v:'USA'},{id:24,l:'PAR',v:'AUS'},
  {id:25,l:'GER',v:'CUW'},{id:26,l:'CIV',v:'ECU'},{id:27,l:'GER',v:'CIV'},{id:28,l:'ECU',v:'CUW'},{id:29,l:'CUW',v:'CIV'},{id:30,l:'ECU',v:'GER'},
  {id:31,l:'NED',v:'JPN'},{id:32,l:'SWE',v:'TUN'},{id:33,l:'NED',v:'SWE'},{id:34,l:'TUN',v:'JPN'},{id:35,l:'JPN',v:'SWE'},{id:36,l:'TUN',v:'NED'},
  {id:37,l:'BEL',v:'EGY'},{id:38,l:'IRN',v:'NZL'},{id:39,l:'BEL',v:'IRN'},{id:40,l:'NZL',v:'EGY'},{id:41,l:'EGY',v:'IRN'},{id:42,l:'NZL',v:'BEL'},
  {id:43,l:'ESP',v:'CPV'},{id:44,l:'KSA',v:'URU'},{id:45,l:'ESP',v:'KSA'},{id:46,l:'URU',v:'CPV'},{id:47,l:'CPV',v:'KSA'},{id:48,l:'URU',v:'ESP'},
  {id:49,l:'FRA',v:'SEN'},{id:50,l:'IRQ',v:'NOR'},{id:51,l:'FRA',v:'IRQ'},{id:52,l:'NOR',v:'SEN'},{id:53,l:'NOR',v:'FRA'},{id:54,l:'SEN',v:'IRQ'},
  {id:55,l:'ARG',v:'ALG'},{id:56,l:'AUT',v:'JOR'},{id:57,l:'ARG',v:'AUT'},{id:58,l:'JOR',v:'ALG'},{id:59,l:'ALG',v:'AUT'},{id:60,l:'JOR',v:'ARG'},
  {id:61,l:'POR',v:'COD'},{id:62,l:'UZB',v:'COL'},{id:63,l:'POR',v:'UZB'},{id:64,l:'COL',v:'COD'},{id:65,l:'COL',v:'POR'},{id:66,l:'COD',v:'UZB'},
  {id:67,l:'ENG',v:'CRO'},{id:68,l:'GHA',v:'PAN'},{id:69,l:'ENG',v:'GHA'},{id:70,l:'PAN',v:'CRO'},{id:71,l:'PAN',v:'ENG'},{id:72,l:'CRO',v:'GHA'},
];

// ── Firebase ──────────────────────────────────────────────────────────────────
const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
  || 'C:/Users/Jepii/.secrets/la-pausa-mundial-serviceAccount.json';
const sa = JSON.parse(readFileSync(saPath, 'utf8'));
initializeApp({ credential: cert(sa) });
const db = getFirestore();

// ── Lógica ────────────────────────────────────────────────────────────────────
function calcStandings(resultados) {
  const GRUPOS = 'ABCDEFGHIJKL'.split('');
  const standings = {};

  for (const g of GRUPOS) {
    const equipos  = EQUIPOS.filter(e => e.g === g);
    const matchIds = equipos.length
      ? Array.from({length: 6}, (_, i) => GRUPOS.indexOf(g) * 6 + i + 1)
      : [];

    const stats = {};
    equipos.forEach(e => { stats[e.s] = {pj:0,pg:0,pe:0,pp:0,gf:0,gc:0}; });

    matchIds.forEach(id => {
      const res = resultados['P' + id];
      if (!res?.jugado) return;
      const ls = CODE_TO_S[PARTIDOS.find(p => p.id === id).l];
      const vs = CODE_TO_S[PARTIDOS.find(p => p.id === id).v];
      if (!stats[ls] || !stats[vs]) return;
      const lg = res.local_goles || 0, vg = res.visit_goles || 0;
      stats[ls].pj++; stats[vs].pj++;
      stats[ls].gf += lg; stats[ls].gc += vg;
      stats[vs].gf += vg; stats[vs].gc += lg;
      if (lg > vg)      { stats[ls].pg++; stats[vs].pp++; }
      else if (lg < vg) { stats[vs].pg++; stats[ls].pp++; }
      else              { stats[ls].pe++; stats[vs].pe++; }
    });

    standings[g] = equipos.map(e => {
      const st = stats[e.s];
      return { s:e.s, g, pts:st.pg*3+st.pe, dg:st.gf-st.gc, gf:st.gf, pj:st.pj };
    }).sort((a,b) => (b.pts-a.pts) || (b.dg-a.dg) || (b.gf-a.gf));
  }
  return standings;
}

async function run() {
  console.log('╔══════════════════════════════════════╗');
  console.log('║  LA PAUSA · Cierre fase de grupos    ║');
  console.log('╚══════════════════════════════════════╝\n');

  // Leer resultados
  const snap = await db.collection('resultados').get();
  const resultados = {};
  snap.forEach(d => { resultados[d.id] = d.data(); });
  console.log(`  Documentos en resultados/: ${snap.size}`);

  const jugados = Object.values(resultados).filter(r => r.jugado === true).length;
  console.log(`  Partidos con jugado=true:  ${jugados}/72\n`);

  if (jugados < 72) {
    console.error(`  ❌ Faltan ${72 - jugados} partidos por jugar. Abortando sin escribir en Firestore.`);
    console.error(`     Ejecuta este script solo cuando los 72 partidos de grupos estén completos.`);
    process.exit(1);
  }

  const standings = calcStandings(resultados);

  const eliminados   = [];
  const terceros     = [];
  const clasificados = new Set();

  for (const g of 'ABCDEFGHIJKL'.split('')) {
    const sorted = standings[g];
    console.log(`  Grupo ${g}:`);
    sorted.forEach((e, i) => {
      console.log(`    ${i+1}. ${e.s.padEnd(26)} ${e.pts}pts  DG${e.dg>0?'+':''}${e.dg}  GF${e.gf}`);
    });

    if (sorted[0]) clasificados.add(sorted[0].s);
    if (sorted[1]) clasificados.add(sorted[1].s);
    if (sorted[2]) terceros.push(sorted[2]);
    if (sorted[3]) eliminados.push(sorted[3].s);
  }

  // 8 mejores terceros clasifican
  terceros.sort((a,b) => (b.pts-a.pts) || (b.dg-a.dg) || (b.gf-a.gf));
  console.log('\n  Ranking 3os puestos:');
  terceros.forEach((t, i) => {
    const pasa = i < 8;
    console.log(`    ${i+1}. ${t.s.padEnd(26)} ${t.pts}pts  ${pasa ? '→ PASA' : '→ ELIMINADO'}`);
    if (pasa) clasificados.add(t.s);
    else      eliminados.push(t.s);
  });

  console.log(`\n  ✅ Clasificados: ${clasificados.size}`);
  console.log(`  ❌ Eliminados:   ${eliminados.length}\n`);

  await db.collection('torneo').doc('estado').set({
    equipos_eliminados: eliminados,
    clasificados:       Array.from(clasificados),
    fase:               'grupos',
    draft_disponible:   true,
    updatedAt:          Date.now(),
  }, { merge: true });

  console.log('  → torneo/estado actualizado en Firestore.');
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
