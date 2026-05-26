// fecha y hora en UTC — la app convierte a Madrid (CEST = UTC+2) automáticamente
export const PAISES = {
  MEX: { n: "México",          f: "🇲🇽" },
  RSA: { n: "Sudáfrica",       f: "🇿🇦" },
  KOR: { n: "Corea del Sur",   f: "🇰🇷" },
  CZE: { n: "Rep. Checa",      f: "🇨🇿" },
  CAN: { n: "Canadá",          f: "🇨🇦" },
  BIH: { n: "Bosnia-Herz.",    f: "🇧🇦" },
  QAT: { n: "Qatar",           f: "🇶🇦" },
  SUI: { n: "Suiza",           f: "🇨🇭" },
  BRA: { n: "Brasil",          f: "🇧🇷" },
  MAR: { n: "Marruecos",       f: "🇲🇦" },
  HAI: { n: "Haití",           f: "🇭🇹" },
  SCO: { n: "Escocia",         f: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  USA: { n: "EE.UU.",          f: "🇺🇸" },
  PAR: { n: "Paraguay",        f: "🇵🇾" },
  AUS: { n: "Australia",       f: "🇦🇺" },
  TUR: { n: "Turquía",         f: "🇹🇷" },
  GER: { n: "Alemania",        f: "🇩🇪" },
  CUW: { n: "Curaçao",         f: "🇨🇼" },
  CIV: { n: "C. de Marfil",    f: "🇨🇮" },
  ECU: { n: "Ecuador",         f: "🇪🇨" },
  NED: { n: "Países Bajos",    f: "🇳🇱" },
  JPN: { n: "Japón",           f: "🇯🇵" },
  SWE: { n: "Suecia",          f: "🇸🇪" },
  TUN: { n: "Túnez",           f: "🇹🇳" },
  BEL: { n: "Bélgica",         f: "🇧🇪" },
  EGY: { n: "Egipto",          f: "🇪🇬" },
  IRN: { n: "Irán",            f: "🇮🇷" },
  NZL: { n: "N. Zelanda",      f: "🇳🇿" },
  ESP: { n: "España",          f: "🇪🇸" },
  CPV: { n: "Cabo Verde",      f: "🇨🇻" },
  KSA: { n: "Arabia Saudí",    f: "🇸🇦" },
  URU: { n: "Uruguay",         f: "🇺🇾" },
  FRA: { n: "Francia",         f: "🇫🇷" },
  SEN: { n: "Senegal",         f: "🇸🇳" },
  IRQ: { n: "Iraq",            f: "🇮🇶" },
  NOR: { n: "Noruega",         f: "🇳🇴" },
  ARG: { n: "Argentina",       f: "🇦🇷" },
  ALG: { n: "Argelia",         f: "🇩🇿" },
  AUT: { n: "Austria",         f: "🇦🇹" },
  JOR: { n: "Jordania",        f: "🇯🇴" },
  POR: { n: "Portugal",        f: "🇵🇹" },
  COD: { n: "Congo RD",        f: "🇨🇩" },
  UZB: { n: "Uzbekistán",      f: "🇺🇿" },
  COL: { n: "Colombia",        f: "🇨🇴" },
  ENG: { n: "Inglaterra",      f: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  CRO: { n: "Croacia",         f: "🇭🇷" },
  GHA: { n: "Ghana",           f: "🇬🇭" },
  PAN: { n: "Panamá",          f: "🇵🇦" },
};

export const GRUPOS = {
  A: ["MEX", "RSA", "KOR", "CZE"],
  B: ["CAN", "BIH", "QAT", "SUI"],
  C: ["BRA", "MAR", "HAI", "SCO"],
  D: ["USA", "PAR", "AUS", "TUR"],
  E: ["GER", "CUW", "CIV", "ECU"],
  F: ["NED", "JPN", "SWE", "TUN"],
  G: ["BEL", "EGY", "IRN", "NZL"],
  H: ["ESP", "CPV", "KSA", "URU"],
  I: ["FRA", "SEN", "IRQ", "NOR"],
  J: ["ARG", "ALG", "AUT", "JOR"],
  K: ["POR", "COD", "UZB", "COL"],
  L: ["ENG", "CRO", "GHA", "PAN"],
};

// fecha = fecha UTC · hora = hora UTC (HH:MM)
// La app convierte a Madrid (Europe/Madrid) para mostrar
export const PARTIDOS = [
  // ── Grupo A ──────────────────────────────────
  { id:1,  grp:"A", fecha:"2026-06-11", hora:"19:00", local:"MEX", visit:"RSA", ciudad:"México" },
  { id:2,  grp:"A", fecha:"2026-06-12", hora:"02:00", local:"KOR", visit:"CZE", ciudad:"Zapopan" },
  { id:3,  grp:"A", fecha:"2026-06-18", hora:"16:00", local:"CZE", visit:"RSA", ciudad:"Atlanta" },
  { id:4,  grp:"A", fecha:"2026-06-19", hora:"01:00", local:"MEX", visit:"KOR", ciudad:"Zapopan" },
  { id:5,  grp:"A", fecha:"2026-06-25", hora:"01:00", local:"CZE", visit:"MEX", ciudad:"México" },
  { id:6,  grp:"A", fecha:"2026-06-25", hora:"01:00", local:"RSA", visit:"KOR", ciudad:"Guadalupe" },
  // ── Grupo B ──────────────────────────────────
  { id:7,  grp:"B", fecha:"2026-06-12", hora:"19:00", local:"CAN", visit:"BIH", ciudad:"Toronto" },
  { id:8,  grp:"B", fecha:"2026-06-13", hora:"19:00", local:"QAT", visit:"SUI", ciudad:"Santa Clara" },
  { id:9,  grp:"B", fecha:"2026-06-18", hora:"19:00", local:"SUI", visit:"BIH", ciudad:"Inglewood" },
  { id:10, grp:"B", fecha:"2026-06-18", hora:"22:00", local:"CAN", visit:"QAT", ciudad:"Vancouver" },
  { id:11, grp:"B", fecha:"2026-06-24", hora:"19:00", local:"SUI", visit:"CAN", ciudad:"Vancouver" },
  { id:12, grp:"B", fecha:"2026-06-24", hora:"19:00", local:"BIH", visit:"QAT", ciudad:"Seattle" },
  // ── Grupo C ──────────────────────────────────
  { id:13, grp:"C", fecha:"2026-06-13", hora:"22:00", local:"BRA", visit:"MAR", ciudad:"E. Rutherford" },
  { id:14, grp:"C", fecha:"2026-06-14", hora:"01:00", local:"HAI", visit:"SCO", ciudad:"Foxborough" },
  { id:15, grp:"C", fecha:"2026-06-19", hora:"22:00", local:"SCO", visit:"MAR", ciudad:"Foxborough" },
  { id:16, grp:"C", fecha:"2026-06-20", hora:"00:30", local:"BRA", visit:"HAI", ciudad:"Philadelphia" },
  { id:17, grp:"C", fecha:"2026-06-24", hora:"22:00", local:"SCO", visit:"BRA", ciudad:"Miami" },
  { id:18, grp:"C", fecha:"2026-06-24", hora:"22:00", local:"MAR", visit:"HAI", ciudad:"Atlanta" },
  // ── Grupo D ──────────────────────────────────
  { id:19, grp:"D", fecha:"2026-06-12", hora:"13:00", local:"USA", visit:"PAR", ciudad:"Inglewood" },
  { id:20, grp:"D", fecha:"2026-06-13", hora:"16:00", local:"AUS", visit:"TUR", ciudad:"Vancouver" },
  { id:21, grp:"D", fecha:"2026-06-19", hora:"19:00", local:"USA", visit:"AUS", ciudad:"Seattle" },
  { id:22, grp:"D", fecha:"2026-06-19", hora:"15:00", local:"TUR", visit:"PAR", ciudad:"Santa Clara" },
  { id:23, grp:"D", fecha:"2026-06-25", hora:"14:00", local:"TUR", visit:"USA", ciudad:"Inglewood" },
  { id:24, grp:"D", fecha:"2026-06-25", hora:"14:00", local:"PAR", visit:"AUS", ciudad:"Santa Clara" },
  // ── Grupo E ──────────────────────────────────
  { id:25, grp:"E", fecha:"2026-06-14", hora:"17:00", local:"GER", visit:"CUW", ciudad:"Houston" },
  { id:26, grp:"E", fecha:"2026-06-14", hora:"23:00", local:"CIV", visit:"ECU", ciudad:"Philadelphia" },
  { id:27, grp:"E", fecha:"2026-06-20", hora:"20:00", local:"GER", visit:"CIV", ciudad:"Toronto" },
  { id:28, grp:"E", fecha:"2026-06-20", hora:"23:00", local:"ECU", visit:"CUW", ciudad:"Kansas City" },
  { id:29, grp:"E", fecha:"2026-06-25", hora:"20:00", local:"CUW", visit:"CIV", ciudad:"Philadelphia" },
  { id:30, grp:"E", fecha:"2026-06-25", hora:"20:00", local:"ECU", visit:"GER", ciudad:"E. Rutherford" },
  // ── Grupo F ──────────────────────────────────
  { id:31, grp:"F", fecha:"2026-06-14", hora:"15:00", local:"NED", visit:"JPN", ciudad:"Arlington" },
  { id:32, grp:"F", fecha:"2026-06-14", hora:"20:00", local:"SWE", visit:"TUN", ciudad:"Guadalupe" },
  { id:33, grp:"F", fecha:"2026-06-20", hora:"16:00", local:"NED", visit:"SWE", ciudad:"Houston" },
  { id:34, grp:"F", fecha:"2026-06-20", hora:"22:00", local:"TUN", visit:"JPN", ciudad:"Guadalupe" },
  { id:35, grp:"F", fecha:"2026-06-25", hora:"22:00", local:"JPN", visit:"SWE", ciudad:"Arlington" },
  { id:36, grp:"F", fecha:"2026-06-25", hora:"22:00", local:"TUN", visit:"NED", ciudad:"Kansas City" },
  // ── Grupo G ──────────────────────────────────
  { id:37, grp:"G", fecha:"2026-06-15", hora:"19:00", local:"BEL", visit:"EGY", ciudad:"Seattle" },
  { id:38, grp:"G", fecha:"2026-06-15", hora:"23:00", local:"IRN", visit:"NZL", ciudad:"Inglewood" },
  { id:39, grp:"G", fecha:"2026-06-21", hora:"19:00", local:"BEL", visit:"IRN", ciudad:"Inglewood" },
  { id:40, grp:"G", fecha:"2026-06-21", hora:"23:00", local:"NZL", visit:"EGY", ciudad:"Vancouver" },
  { id:41, grp:"G", fecha:"2026-06-27", hora:"03:00", local:"EGY", visit:"IRN", ciudad:"Seattle" },
  { id:42, grp:"G", fecha:"2026-06-27", hora:"03:00", local:"NZL", visit:"BEL", ciudad:"Vancouver" },
  // ── Grupo H ──────────────────────────────────
  { id:43, grp:"H", fecha:"2026-06-15", hora:"16:00", local:"ESP", visit:"CPV", ciudad:"Atlanta" },
  { id:44, grp:"H", fecha:"2026-06-15", hora:"22:00", local:"KSA", visit:"URU", ciudad:"Miami" },
  { id:45, grp:"H", fecha:"2026-06-21", hora:"16:00", local:"ESP", visit:"KSA", ciudad:"Atlanta" },
  { id:46, grp:"H", fecha:"2026-06-21", hora:"22:00", local:"URU", visit:"CPV", ciudad:"Miami" },
  { id:47, grp:"H", fecha:"2026-06-26", hora:"23:00", local:"CPV", visit:"KSA", ciudad:"Houston" },
  { id:48, grp:"H", fecha:"2026-06-26", hora:"23:00", local:"URU", visit:"ESP", ciudad:"Zapopan" },
  // ── Grupo I ──────────────────────────────────
  { id:49, grp:"I", fecha:"2026-06-16", hora:"19:00", local:"FRA", visit:"SEN", ciudad:"E. Rutherford" },
  { id:50, grp:"I", fecha:"2026-06-16", hora:"22:00", local:"IRQ", visit:"NOR", ciudad:"Foxborough" },
  { id:51, grp:"I", fecha:"2026-06-22", hora:"21:00", local:"FRA", visit:"IRQ", ciudad:"Philadelphia" },
  { id:52, grp:"I", fecha:"2026-06-23", hora:"00:00", local:"NOR", visit:"SEN", ciudad:"E. Rutherford" },
  { id:53, grp:"I", fecha:"2026-06-26", hora:"19:00", local:"NOR", visit:"FRA", ciudad:"Foxborough" },
  { id:54, grp:"I", fecha:"2026-06-26", hora:"19:00", local:"SEN", visit:"IRQ", ciudad:"Toronto" },
  // ── Grupo J ──────────────────────────────────
  { id:55, grp:"J", fecha:"2026-06-16", hora:"01:00", local:"ARG", visit:"ALG", ciudad:"Kansas City" },
  { id:56, grp:"J", fecha:"2026-06-16", hora:"02:00", local:"AUT", visit:"JOR", ciudad:"Santa Clara" },
  { id:57, grp:"J", fecha:"2026-06-22", hora:"17:00", local:"ARG", visit:"AUT", ciudad:"Arlington" },
  { id:58, grp:"J", fecha:"2026-06-23", hora:"01:00", local:"JOR", visit:"ALG", ciudad:"Santa Clara" },
  { id:59, grp:"J", fecha:"2026-06-27", hora:"01:00", local:"ALG", visit:"AUT", ciudad:"Kansas City" },
  { id:60, grp:"J", fecha:"2026-06-27", hora:"01:00", local:"JOR", visit:"ARG", ciudad:"Arlington" },
  // ── Grupo K ──────────────────────────────────
  { id:61, grp:"K", fecha:"2026-06-17", hora:"17:00", local:"POR", visit:"COD", ciudad:"Houston" },
  { id:62, grp:"K", fecha:"2026-06-18", hora:"02:00", local:"UZB", visit:"COL", ciudad:"México" },
  { id:63, grp:"K", fecha:"2026-06-23", hora:"16:00", local:"POR", visit:"UZB", ciudad:"Houston" },
  { id:64, grp:"K", fecha:"2026-06-24", hora:"02:00", local:"COL", visit:"COD", ciudad:"Zapopan" },
  { id:65, grp:"K", fecha:"2026-06-27", hora:"23:30", local:"COL", visit:"POR", ciudad:"Miami" },
  { id:66, grp:"K", fecha:"2026-06-27", hora:"23:30", local:"COD", visit:"UZB", ciudad:"Atlanta" },
  // ── Grupo L ──────────────────────────────────
  { id:67, grp:"L", fecha:"2026-06-17", hora:"20:00", local:"ENG", visit:"CRO", ciudad:"Arlington" },
  { id:68, grp:"L", fecha:"2026-06-17", hora:"23:00", local:"GHA", visit:"PAN", ciudad:"Toronto" },
  { id:69, grp:"L", fecha:"2026-06-23", hora:"20:00", local:"ENG", visit:"GHA", ciudad:"Foxborough" },
  { id:70, grp:"L", fecha:"2026-06-23", hora:"23:00", local:"PAN", visit:"CRO", ciudad:"Toronto" },
  { id:71, grp:"L", fecha:"2026-06-27", hora:"21:00", local:"PAN", visit:"ENG", ciudad:"E. Rutherford" },
  { id:72, grp:"L", fecha:"2026-06-27", hora:"21:00", local:"CRO", visit:"GHA", ciudad:"Philadelphia" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Devuelve la hora de Madrid (Europe/Madrid) como string "HH:MM" */
export function horaMadrid(fecha, hora) {
  const dt = new Date(`${fecha}T${hora}:00Z`);
  return dt.toLocaleTimeString('es-ES', {
    timeZone: 'Europe/Madrid',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

/** Devuelve la fecha Madrid como "YYYY-MM-DD" (para agrupar por día) */
export function fechaMadrid(fecha, hora) {
  const dt = new Date(`${fecha}T${hora}:00Z`);
  return dt.toLocaleDateString('en-CA', { timeZone: 'Europe/Madrid' });
}

/** Devuelve el Date UTC del partido (para ordenar y comparar con new Date()) */
export function dtUTC(fecha, hora) {
  return new Date(`${fecha}T${hora}:00Z`);
}
