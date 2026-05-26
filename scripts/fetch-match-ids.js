// LA PAUSA — Obtener IDs de partidos del Mundial 2026 desde Sofascore
// Uso: node scripts/fetch-match-ids.js
// Resultado: imprime todos los partidos con su sofaId y fecha

const SOFA_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'application/json',
  'Origin': 'https://www.sofascore.com',
  'Referer': 'https://www.sofascore.com/',
};

// IDs conocidos de los partidos de J1 que ya tenemos
const KNOWN_IDS = [15186710, 15186720, 15186836, 15186873];

async function fetchEvent(id) {
  const res = await fetch(`https://api.sofascore.com/api/v1/event/${id}`, { headers: SOFA_HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchRound(tournamentId, seasonId, round) {
  const url = `https://api.sofascore.com/api/v1/unique-tournament/${tournamentId}/season/${seasonId}/events/round/${round}`;
  const res = await fetch(url, { headers: SOFA_HEADERS });
  if (!res.ok) { console.warn(`  Round ${round}: HTTP ${res.status}`); return []; }
  const d = await res.json();
  return d.events || [];
}

async function main() {
  console.log('Obteniendo estructura del torneo desde partido conocido...\n');

  // Usar un partido conocido para obtener tournamentId y seasonId
  const d = await fetchEvent(KNOWN_IDS[0]);
  const ev = d.event || {};
  const tournamentId = ev.tournament?.uniqueTournament?.id;
  const seasonId     = ev.season?.id;
  const round        = ev.roundInfo?.round;

  console.log(`Tournament ID : ${tournamentId}`);
  console.log(`Season ID     : ${seasonId}`);
  console.log(`Round partido : ${round}`);
  console.log('');

  if (!tournamentId || !seasonId) {
    console.error('No se pudo obtener tournamentId/seasonId. Comprobando respuesta raw:');
    console.log(JSON.stringify(ev).slice(0, 500));
    return;
  }

  // Fase de grupos: 3 rondas × 24 partidos = 72 partidos (rondas 1, 2, 3)
  // Eliminatorias: rondas 4-8 (dieciseisavos, octavos, cuartos, semis, final)
  const allMatches = [];

  for (let r = 1; r <= 8; r++) {
    console.log(`Fetching ronda ${r}...`);
    const events = await fetchRound(tournamentId, seasonId, r);
    console.log(`  ${events.length} partidos`);
    for (const e of events) {
      allMatches.push({
        sofaId: e.id,
        round:  r,
        home:   e.homeTeam?.name,
        away:   e.awayTeam?.name,
        fecha:  e.startTimestamp ? new Date(e.startTimestamp * 1000).toISOString() : null,
      });
    }
    // Pausa para no saturar la API
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\nTotal partidos encontrados: ${allMatches.length}\n`);
  console.log('─'.repeat(80));

  for (const m of allMatches) {
    const fecha = m.fecha ? m.fecha.replace('T', ' ').slice(0, 16) : '??';
    console.log(`R${m.round} | ${String(m.sofaId).padEnd(10)} | ${(m.home + ' vs ' + m.away).padEnd(45)} | ${fecha}`);
  }

  console.log('\n─'.repeat(80));
  console.log('\nCopia los sofaIds y los pasas para montar los JSON de jornadas.');
}

main().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
