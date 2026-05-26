// LA PAUSA — Sync Mundial 2026 desde Sofascore
// Uso: node scripts/sync-sofascore-worldcup.js
// Genera scripts/partidos/worldcup-2026.json

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join }           from 'path';
import { fileURLToPath }           from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const TOURNAMENT_ID = 16;
const SEASON_ID     = 58210;

const SOFA_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept':     'application/json',
  'Origin':     'https://www.sofascore.com',
  'Referer':    'https://www.sofascore.com/',
};

// ── Datos de grupos (mirror de public/js/grupos.js) ───────────────────────────

// Sofascore team name → 3-letter FIFA code
// Mantener variantes porque Sofascore cambia nombres entre fases
const SOFA_TO_CODE = {
  'Mexico':                         'MEX',
  'South Africa':                   'RSA',
  'South Korea':                    'KOR',
  'Korea Republic':                 'KOR',
  'Czech Republic':                 'CZE',
  'Czechia':                        'CZE',
  'Canada':                         'CAN',
  'Bosnia and Herzegovina':         'BIH',
  'Bosnia & Herzegovina':           'BIH',
  'Qatar':                          'QAT',
  'Switzerland':                    'SUI',
  'Brazil':                         'BRA',
  'Morocco':                        'MAR',
  'Haiti':                          'HAI',
  'Scotland':                       'SCO',
  'USA':                            'USA',
  'United States':                  'USA',
  'Paraguay':                       'PAR',
  'Australia':                      'AUS',
  'Turkey':                         'TUR',
  'Türkiye':                        'TUR',
  'Germany':                        'GER',
  'Curaçao':                        'CUW',
  'Curacao':                        'CUW',
  "Côte d'Ivoire":                  'CIV',
  "Cote d'Ivoire":                  'CIV',
  'Ivory Coast':                    'CIV',
  'Ecuador':                        'ECU',
  'Netherlands':                    'NED',
  'Japan':                          'JPN',
  'Sweden':                         'SWE',
  'Tunisia':                        'TUN',
  'Belgium':                        'BEL',
  'Egypt':                          'EGY',
  'Iran':                           'IRN',
  'New Zealand':                    'NZL',
  'Spain':                          'ESP',
  'Cape Verde':                     'CPV',
  'Cabo Verde':                     'CPV',
  'Saudi Arabia':                   'KSA',
  'Uruguay':                        'URU',
  'France':                         'FRA',
  'Senegal':                        'SEN',
  'Iraq':                           'IRQ',
  'Norway':                         'NOR',
  'Argentina':                      'ARG',
  'Algeria':                        'ALG',
  'Austria':                        'AUT',
  'Jordan':                         'JOR',
  'Portugal':                       'POR',
  'DR Congo':                       'COD',
  'Congo DR':                       'COD',
  'Democratic Republic of Congo':   'COD',
  'Republic of Congo':              'COD',
  'Uzbekistan':                     'UZB',
  'Colombia':                       'COL',
  'England':                        'ENG',
  'Croatia':                        'CRO',
  'Ghana':                          'GHA',
  'Panama':                         'PAN',
};

// 72 partidos de fase de grupos (id 1-72)
const PARTIDOS = [
  {id:1, local:'MEX',visit:'RSA'}, {id:2, local:'KOR',visit:'CZE'},
  {id:3, local:'CZE',visit:'RSA'}, {id:4, local:'MEX',visit:'KOR'},
  {id:5, local:'CZE',visit:'MEX'}, {id:6, local:'RSA',visit:'KOR'},
  {id:7, local:'CAN',visit:'BIH'}, {id:8, local:'QAT',visit:'SUI'},
  {id:9, local:'SUI',visit:'BIH'}, {id:10,local:'CAN',visit:'QAT'},
  {id:11,local:'SUI',visit:'CAN'}, {id:12,local:'BIH',visit:'QAT'},
  {id:13,local:'BRA',visit:'MAR'}, {id:14,local:'HAI',visit:'SCO'},
  {id:15,local:'SCO',visit:'MAR'}, {id:16,local:'BRA',visit:'HAI'},
  {id:17,local:'SCO',visit:'BRA'}, {id:18,local:'MAR',visit:'HAI'},
  {id:19,local:'USA',visit:'PAR'}, {id:20,local:'AUS',visit:'TUR'},
  {id:21,local:'USA',visit:'AUS'}, {id:22,local:'TUR',visit:'PAR'},
  {id:23,local:'TUR',visit:'USA'}, {id:24,local:'PAR',visit:'AUS'},
  {id:25,local:'GER',visit:'CUW'}, {id:26,local:'CIV',visit:'ECU'},
  {id:27,local:'GER',visit:'CIV'}, {id:28,local:'ECU',visit:'CUW'},
  {id:29,local:'CUW',visit:'CIV'}, {id:30,local:'ECU',visit:'GER'},
  {id:31,local:'NED',visit:'JPN'}, {id:32,local:'SWE',visit:'TUN'},
  {id:33,local:'NED',visit:'SWE'}, {id:34,local:'TUN',visit:'JPN'},
  {id:35,local:'JPN',visit:'SWE'}, {id:36,local:'TUN',visit:'NED'},
  {id:37,local:'BEL',visit:'EGY'}, {id:38,local:'IRN',visit:'NZL'},
  {id:39,local:'BEL',visit:'IRN'}, {id:40,local:'NZL',visit:'EGY'},
  {id:41,local:'EGY',visit:'IRN'}, {id:42,local:'NZL',visit:'BEL'},
  {id:43,local:'ESP',visit:'CPV'}, {id:44,local:'KSA',visit:'URU'},
  {id:45,local:'ESP',visit:'KSA'}, {id:46,local:'URU',visit:'CPV'},
  {id:47,local:'CPV',visit:'KSA'}, {id:48,local:'URU',visit:'ESP'},
  {id:49,local:'FRA',visit:'SEN'}, {id:50,local:'IRQ',visit:'NOR'},
  {id:51,local:'FRA',visit:'IRQ'}, {id:52,local:'NOR',visit:'SEN'},
  {id:53,local:'NOR',visit:'FRA'}, {id:54,local:'SEN',visit:'IRQ'},
  {id:55,local:'ARG',visit:'ALG'}, {id:56,local:'AUT',visit:'JOR'},
  {id:57,local:'ARG',visit:'AUT'}, {id:58,local:'JOR',visit:'ALG'},
  {id:59,local:'ALG',visit:'AUT'}, {id:60,local:'JOR',visit:'ARG'},
  {id:61,local:'POR',visit:'COD'}, {id:62,local:'UZB',visit:'COL'},
  {id:63,local:'POR',visit:'UZB'}, {id:64,local:'COL',visit:'COD'},
  {id:65,local:'COL',visit:'POR'}, {id:66,local:'COD',visit:'UZB'},
  {id:67,local:'ENG',visit:'CRO'}, {id:68,local:'GHA',visit:'PAN'},
  {id:69,local:'ENG',visit:'GHA'}, {id:70,local:'PAN',visit:'CRO'},
  {id:71,local:'PAN',visit:'ENG'}, {id:72,local:'CRO',visit:'GHA'},
];

// Build lookup (homeCode-awayCode) → partido
const PAIR_TO_PARTIDO = {};
for (const p of PARTIDOS) {
  PAIR_TO_PARTIDO[`${p.local}-${p.visit}`] = p;
}

// Set of valid codes for fast filtering
const VALID_CODES = new Set(Object.values(SOFA_TO_CODE));

// ── Sofascore fetch ───────────────────────────────────────────────────────────

function resolveCode(teamName) {
  if (!teamName) return null;
  if (SOFA_TO_CODE[teamName]) return SOFA_TO_CODE[teamName];
  // Case-insensitive fallback
  const lower = teamName.toLowerCase();
  for (const [key, code] of Object.entries(SOFA_TO_CODE)) {
    if (key.toLowerCase() === lower) return code;
  }
  return null;
}

async function fetchPage(endpoint, page) {
  const url = `https://api.sofascore.com/api/v1/unique-tournament/${TOURNAMENT_ID}/season/${SEASON_ID}/events/${endpoint}/${page}`;
  const res = await fetch(url, { headers: SOFA_HEADERS });
  if (res.status === 404) return { events: [], hasNextPage: false };
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${endpoint} page ${page}`);
  return res.json();
}

async function fetchAllEvents() {
  const events = [];

  // Upcoming events
  for (let page = 0; ; page++) {
    process.stdout.write(`  next/${page}...`);
    const data = await fetchPage('next', page);
    const n = (data.events || []).length;
    process.stdout.write(` ${n} eventos\n`);
    events.push(...(data.events || []));
    if (!data.hasNextPage) break;
  }

  // Past events (needed once matches start being played)
  for (let page = 0; ; page++) {
    process.stdout.write(`  last/${page}...`);
    const data = await fetchPage('last', page);
    const n = (data.events || []).length;
    process.stdout.write(` ${n} eventos\n`);
    events.push(...(data.events || []));
    if (!data.hasNextPage) break;
  }

  return events;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  console.log('╔══════════════════════════════════════╗');
  console.log('║  LA PAUSA · Sync WC 2026 Sofascore  ║');
  console.log(`║  tournament=${TOURNAMENT_ID}  season=${SEASON_ID}      ║`);
  console.log('╚══════════════════════════════════════╝\n');

  const allEvents = await fetchAllEvents();
  console.log(`\n  Total eventos descargados: ${allEvents.length}`);

  // Deduplicate by event id (next + last can overlap on match day)
  const seen = new Set();
  const uniqueEvents = allEvents.filter(ev => {
    if (seen.has(ev.id)) return false;
    seen.add(ev.id);
    return true;
  });

  const result   = [];
  const badTeams = []; // eventos con nombre de equipo irreconocible

  for (const ev of uniqueEvents) {
    const homeName = ev.homeTeam?.name;
    const awayName = ev.awayTeam?.name;

    const homeCode = resolveCode(homeName);
    const awayCode = resolveCode(awayName);

    // Si algún equipo no está en nuestros 48, no es partido de grupos → skip
    if (!homeCode || !awayCode) {
      // Solo marcar error si ambos nombres suenan a selección nacional pero no se reconocen
      // (Sofascore incluye también equipos de otros torneos si la API devuelve más eventos)
      if (homeCode === null && awayCode === null) {
        // Ambos desconocidos → probablemente evento de otro torneo, ignorar
      } else {
        // Uno reconocido, el otro no → equipo de nuestro torneo sin mapeo → problema
        badTeams.push({ eventId: ev.id, home: homeName, away: awayName, homeCode, awayCode });
      }
      continue;
    }

    if (!VALID_CODES.has(homeCode) || !VALID_CODES.has(awayCode)) continue;

    const partido = PAIR_TO_PARTIDO[`${homeCode}-${awayCode}`];
    if (!partido) {
      // Par de equipos conocidos pero no en fase de grupos → knockout, saltar
      continue;
    }

    // Evitar duplicados (si next y last solaparan)
    if (result.some(r => r.matchId === partido.id)) continue;

    result.push({
      matchId:          partido.id,
      sofascoreEventId: ev.id,
      local:            partido.local,
      visit:            partido.visit,
      startTimestamp:   ev.startTimestamp ?? null,
      homeTeamName:     homeName,
      awayTeamName:     awayName,
      status:           ev.status?.type ?? 'notstarted',
    });
  }

  // ── Validación ────────────────────────────────────────────────────────────

  if (badTeams.length) {
    console.error('\n  UNMATCHED — equipo reconocido pero pareja sin mapeo:');
    for (const b of badTeams) {
      console.error(`    eventId=${b.eventId}  home="${b.home}" (${b.homeCode ?? '?'})  away="${b.away}" (${b.awayCode ?? '?'})`);
    }
    process.exit(1);
  }

  const foundIds = new Set(result.map(r => r.matchId));
  const missing  = PARTIDOS.filter(p => !foundIds.has(p.id));

  if (missing.length) {
    console.error('\n  UNMATCHED — partidos no encontrados en Sofascore:');
    for (const m of missing) {
      console.error(`    matchId=${m.id}  ${m.local} vs ${m.visit}`);
    }
    process.exit(1);
  }

  // ── Salida ────────────────────────────────────────────────────────────────

  result.sort((a, b) => a.matchId - b.matchId);

  const outDir  = join(__dirname, 'partidos');
  const outPath = join(outDir, 'worldcup-2026.json');
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');

  console.log(`\n  ✅ ${result.length}/72 partidos mapeados\n`);
  const colW = 26;
  for (const r of result) {
    const fecha = r.startTimestamp
      ? new Date(r.startTimestamp * 1000).toISOString().slice(0, 16).replace('T', ' ')
      : '—';
    console.log(
      `  P${String(r.matchId).padStart(2,'0')}  sofa:${r.sofascoreEventId}  ` +
      `${r.local}-${r.visit}  ` +
      `${fecha}  ${r.status}`
    );
  }

  console.log(`\n  → ${outPath}`);
  process.exit(0);
}

run().catch(e => { console.error('  ✗', e.message); process.exit(1); });
