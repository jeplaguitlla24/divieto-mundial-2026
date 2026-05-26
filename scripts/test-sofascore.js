// Test Sofascore API — Partido: Elche vs Atlético de Madrid
// ID evento: 14083306
// Uso: node scripts/test-sofascore.js

const BASE = 'https://api.sofascore.com/api/v1';
const EVENT_ID = 14083306;

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'application/json',
  'Accept-Language': 'es-ES,es;q=0.9',
  'Origin': 'https://www.sofascore.com',
  'Referer': 'https://www.sofascore.com/',
};

async function get(path) {
  const url = BASE + path;
  console.log(`\n→ GET ${url}`);
  const res = await fetch(url, { headers: HEADERS });
  console.log(`  Status: ${res.status}`);
  if (!res.ok) {
    console.log(`  Error: ${await res.text().then(t => t.slice(0, 300))}`);
    return null;
  }
  return res.json();
}

async function main() {

  // ── 1. Info del partido ──────────────────────────────────
  console.log('\n═══ 1. INFO DEL PARTIDO ═══');
  const info = await get(`/event/${EVENT_ID}`);
  if (info?.event) {
    const e = info.event;
    console.log(`  ${e.homeTeam.name} ${e.homeScore?.current ?? '?'} - ${e.awayScore?.current ?? '?'} ${e.awayTeam.name}`);
    console.log(`  Estado: ${e.status?.description}`);
    console.log(`  Torneo: ${e.tournament?.name}`);
    console.log(`  Fecha: ${new Date(e.startTimestamp * 1000).toLocaleString('es-ES')}`);
  }

  // ── 2. Lineups + ratings ─────────────────────────────────
  console.log('\n═══ 2. LINEUPS + RATINGS ═══');
  const lin = await get(`/event/${EVENT_ID}/lineups`);
  if (lin) {
    for (const lado of ['home', 'away']) {
      const team = lin[lado];
      if (!team) continue;
      console.log(`\n  ── ${lado.toUpperCase()}: ${team.teamName || ''} ──`);
      (team.players || []).forEach(p => {
        const s = p.statistics || {};
        const nombre = (p.player?.name || '').padEnd(24);
        const rating  = String(s.rating        ?? '-').padStart(5);
        const mins    = String(s.minutesPlayed  ?? '-').padStart(4);
        const goles   = s.goals           ?? 0;
        const asist   = s.goalAssist      ?? 0;
        const tarjeta = s.yellowCard ? '🟨' : s.redCard ? '🟥' : '';
        console.log(`    ${nombre} | rating:${rating} | min:${mins} | G:${goles} A:${asist} ${tarjeta}`);
      });
    }
  }

  // ── 3. Estadísticas del partido ──────────────────────────
  console.log('\n═══ 3. ESTADÍSTICAS DEL PARTIDO ═══');
  const stats = await get(`/event/${EVENT_ID}/statistics`);
  if (stats?.statistics) {
    stats.statistics.slice(0, 1).forEach(periodo => {
      console.log(`  Periodo: ${periodo.period}`);
      periodo.groups?.slice(0, 2).forEach(g => {
        console.log(`  [${g.groupName}]`);
        g.statisticsItems?.slice(0, 5).forEach(s => {
          console.log(`    ${s.name.padEnd(20)} | Local: ${s.home} | Visitante: ${s.away}`);
        });
      });
    });
  }

  // ── 4. Incidencias (goles, tarjetas, cambios) ─────────────
  console.log('\n═══ 4. INCIDENCIAS ═══');
  const inc = await get(`/event/${EVENT_ID}/incidents`);
  if (inc?.incidents) {
    inc.incidents.slice(0, 10).forEach(i => {
      const min  = i.time ?? '?';
      const tipo = i.incidentType;
      const nombre = i.player?.name || i.playerIn?.name || '';
      console.log(`  ${String(min).padStart(3)}' [${tipo}] ${nombre}`);
    });
  }
}

main().catch(e => console.error('Error:', e.message));
