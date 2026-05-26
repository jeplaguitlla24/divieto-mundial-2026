// LA PAUSA — Lógica de scoring compartida (local + Cloud Functions)

export function ratingToPoints(rating) {
  const r = parseFloat(rating);
  if (r >= 9.5) return 14; if (r >= 9.0) return 13; if (r >= 8.6) return 12;
  if (r >= 8.2) return 11; if (r >= 8.0) return 10; if (r >= 7.8) return 9;
  if (r >= 7.6) return 8;  if (r >= 7.4) return 7;  if (r >= 7.2) return 6;
  if (r >= 7.0) return 5;  if (r >= 6.8) return 4;  if (r >= 6.6) return 3;
  if (r >= 6.4) return 2;  if (r >= 6.2) return 1;  if (r >= 6.0) return 0;
  if (r >= 5.8) return -1; if (r >= 5.6) return -2; if (r >= 5.4) return -3;
  if (r >= 5.2) return -4; if (r >= 5.0) return -5; return -6;
}

export function goalBonus(pos) {
  const p = (pos || '').toUpperCase();
  return p === 'G' ? 6 : p === 'D' ? 5 : p === 'M' ? 4 : 3;
}

export function calcPoints(player) {
  const s   = player.statistics || {};
  const pos = player.player?.position || 'F';
  if (!s.rating) return null;
  let pts = ratingToPoints(parseFloat(s.rating));
  pts += (s.goals        || 0) * goalBonus(pos);
  pts += (s.goalAssist   || 0) * 1;
  pts += (s.penaltyScored || 0) * 3;
  return pts;
}

export function processLineups(data) {
  const puntos  = {};
  const detalle = {};
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
        rating:  s.rating       ? parseFloat(s.rating) : null,
        goals:   s.goals        || 0,
        assists: s.goalAssist   || 0,
        mins:    s.minutesPlayed ?? 0,
        pos,
        team: lado,
      };
    }
  }
  return { puntos, detalle };
}

// Fair Play FIFA: amarilla -1 · doble amarilla -3 · roja directa -4 · amarilla+roja -5
export function calcFairPlay(data) {
  const fp = { home: 0, away: 0 };
  for (const lado of ['home', 'away']) {
    const team = data[lado];
    if (!team) continue;
    for (const p of (team.players || [])) {
      const s  = p.statistics || {};
      const y  = s.yellowCards    || 0;
      const yr = s.yellowRedCards || 0;
      const r  = s.redCards       || 0;
      if      (yr > 0)         fp[lado] -= 3;
      else if (y > 0 && r > 0) fp[lado] -= 5;
      else if (r > 0)          fp[lado] -= 4;
      else                     fp[lado] -= y;
    }
  }
  return fp;
}
