import http from 'http';
import { createReadStream, readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import { extname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';

const __root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');

function loadJugadoresForSel(seleccion) {
  const raw = readFileSync(join(__root, 'public/js/jugadores.js'), 'utf8');
  const jsonStart = raw.indexOf('[');
  const jsonEnd   = raw.lastIndexOf(']') + 1;
  const data = JSON.parse(raw.slice(jsonStart, jsonEnd));
  const entry = data.find(s => s.seleccion === seleccion);
  if (!entry) return [];
  return [...entry.jugadores].filter(j => !j.suplente).sort((a, b) => b.overall - a.overall);
}

function loadTop26Players() {
  const raw = readFileSync(join(__root, 'public/js/jugadores.js'), 'utf8');
  const jsonStart = raw.indexOf('[');
  const jsonEnd   = raw.lastIndexOf(']') + 1;
  const data = JSON.parse(raw.slice(jsonStart, jsonEnd));
  const all = [];
  for (const sel of data) for (const j of sel.jugadores) all.push({ ...j, seleccion: sel.seleccion });
  return all.sort((a, b) => b.overall - a.overall).slice(0, 26);
}

const __dirname  = fileURLToPath(new URL('.', import.meta.url));
const ROOT        = resolve(__dirname, '..');
const PUBLIC_DIR  = join(ROOT, 'public');
const TWITTER_DIR = join(ROOT, 'TWITTER');
const PORT        = 7654;
const TEMP_FILE   = join(PUBLIC_DIR, 'squad-image-temp.html');

// ── Configuración por selección ───────────────────────────────────────────────
const CONFIGS = {
  SUECIA: {
    outFile: join(TWITTER_DIR, 'LISTA DE SUECIA.png'),
    escudo:  'suecia national team.webp',
    seleccion: 'SUECIA',
    titleHtml: `<div id="title-main">SWEDEN</div>`,
    titleFontSize: '116px',
    bg: 'linear-gradient(175deg,#002855 0%,#001540 35%,#000d28 65%,#000820 100%)',
    glowColor: 'rgba(0,106,167,0.25)',
    topStripeColor: '#FECC02',
    bottomStripeColor: '#006AA7',
    crossH: '33%,42%',  // horizontal band of cross (% of height)
    crossV: '42%,53%',
    accentColor: '#FECC02',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#TREKRONOR',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [
      { nombre: 'Viktor Gyokeres',          overall: 84, tier: 'oro-brillante',   posDraft: 'DL', club: 'Arsenal FC' },
      { nombre: 'Alexander Isak',           overall: 84, tier: 'oro-brillante',   posDraft: 'DL', club: 'Liverpool FC' },
      { nombre: 'Anthony Elanga',           overall: 79, tier: 'oro-brillante',   posDraft: 'DL', club: 'Newcastle United' },
      { nombre: 'Daniel Svensson',          overall: 76, tier: 'oro-brillante',   posDraft: 'DF', club: 'Borussia Dortmund' },
      { nombre: 'Lucas Bergvall',           overall: 75, tier: 'oro-brillante',   posDraft: 'MC', club: 'Tottenham Hotspur' },
      { nombre: 'Yasin Ayari',              overall: 75, tier: 'oro-brillante',   posDraft: 'MC', club: 'Brighton & Hove Albion' },
      { nombre: 'Gabriel Gudmundsson',      overall: 75, tier: 'oro-brillante',   posDraft: 'DF', club: 'Leeds United' },
      { nombre: 'Carl Starfelt',            overall: 75, tier: 'oro-brillante',   posDraft: 'DF', club: 'RC Celta de Vigo' },
      { nombre: 'Gustaf Lagerbielke',       overall: 74, tier: 'plata-brillante', posDraft: 'DF', club: 'SC Braga' },
      { nombre: 'Kristoffer Nordfeldt',     overall: 74, tier: 'plata-brillante', posDraft: 'PT', club: 'AIK' },
      { nombre: 'Benjamin Nygren',          overall: 73, tier: 'plata-brillante', posDraft: 'DL', club: 'Celtic FC' },
      { nombre: 'Victor Lindelof',          overall: 73, tier: 'plata-brillante', posDraft: 'DF', club: 'Aston Villa' },
      { nombre: 'Jesper Karlstrom',         overall: 72, tier: 'plata-brillante', posDraft: 'MC', club: 'Udinese' },
      { nombre: 'Isak Hien',                overall: 71, tier: 'plata-mate',      posDraft: 'DF', club: 'Atalanta de Bergamo' },
      { nombre: 'Mattias Svanberg',         overall: 70, tier: 'plata-mate',      posDraft: 'MC', club: 'VfL Wolfsburgo' },
      { nombre: 'Hjalmar Ekdal',            overall: 70, tier: 'plata-mate',      posDraft: 'DF', club: 'Burnley FC' },
      { nombre: 'Emil Holm',                overall: 70, tier: 'plata-brillante', posDraft: 'DF', club: 'Juventus de Turin' },
      { nombre: 'Besfort Zeneli',           overall: 68, tier: 'plata-mate',      posDraft: 'MC', club: 'Union Saint-Gilloise' },
      { nombre: 'Viktor Johansson',         overall: 68, tier: 'plata-mate',      posDraft: 'PT', club: 'Stoke City' },
      { nombre: 'Eric Smith',               overall: 67, tier: 'plata-mate',      posDraft: 'DF', club: 'FC St. Pauli' },
      { nombre: 'Ken Sema',                 overall: 66, tier: 'plata-mate',      posDraft: 'DL', club: 'Pafos FC' },
      { nombre: 'Gustaf Nilsson',           overall: 64, tier: 'bronce-mate',     posDraft: 'DL', club: 'Club Brujas KV' },
      { nombre: 'Elliot Stroud',            overall: 64, tier: 'bronce-mate',     posDraft: 'MC', club: 'Mjallby AIF' },
      { nombre: 'Jacob Widell Zetterström', overall: 64, tier: 'bronce-mate',     posDraft: 'PT', club: 'Derby County' },
      { nombre: 'Alexander Bernhardsson',   overall: 64, tier: 'bronce-mate',     posDraft: 'MC', club: 'Holstein Kiel' },
      { nombre: 'Taha Ali',                 overall: 58, tier: 'bronce-mate',     posDraft: 'DL', club: 'Malmoe FF' },
    ],
  },

  'JAPON': {
    outFile: join(TWITTER_DIR, 'LISTA DE JAPON.png'),
    escudo:  'japan-national-team-footballlogos-org.webp',
    seleccion: 'JAPON',
    titleHtml: `<div id="title-main">JAPAN</div>`,
    titleFontSize: '116px',
    bg: 'linear-gradient(175deg,#1a0005 0%,#2d0008 35%,#1a0005 65%,#0d0003 100%)',
    glowColor: 'rgba(188,0,45,0.22)',
    topStripeColor: '#BC002D',
    bottomStripeColor: '#BC002D',
    accentColor: '#FFFFFF',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#SAMURAI_BLUE',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    bgImagePath: resolve(__dirname, '../TWITTER/LISTAS DE CONVOCADOS/FONDOS VACIOS/GRUPO F/e93c41f4-dd13-4b58-bb45-d14c1253b619.png'),
    cardsTop: 430,
    players: [
      { nombre: 'Takefusa Kubo',      overall: 81, tier: 'oro-brillante',   posDraft: 'DL', club: 'Real Sociedad' },
      { nombre: 'Wataru Endo',        overall: 79, tier: 'oro-brillante',   posDraft: 'MC', club: 'Liverpool FC' },
      { nombre: 'Zion Suzuki',        overall: 78, tier: 'oro-brillante',   posDraft: 'PT', club: 'Parma' },
      { nombre: 'Ritsu Doan',         overall: 78, tier: 'oro-brillante',   posDraft: 'DL', club: 'Eintracht Francfort' },
      { nombre: 'Takehiro Tomiyasu',  overall: 78, tier: 'oro-brillante',   posDraft: 'DF', club: 'Ajax de Amsterdam' },
      { nombre: 'Kaishu Sano',        overall: 77, tier: 'oro-brillante',   posDraft: 'MC', club: '1.FSV Mainz 05' },
      { nombre: 'Daichi Kamada',      overall: 76, tier: 'oro-brillante',   posDraft: 'MC', club: 'Crystal Palace' },
      { nombre: 'Ko Itakura',         overall: 76, tier: 'oro-brillante',   posDraft: 'DF', club: 'Ajax de Amsterdam' },
      { nombre: 'Ayase Ueda',         overall: 75, tier: 'oro-brillante',   posDraft: 'DL', club: 'Feyenoord' },
      { nombre: 'Hiroki Ito',         overall: 74, tier: 'plata-brillante', posDraft: 'DF', club: 'Bayern Munich' },
      { nombre: 'Yuito Suzuki',       overall: 74, tier: 'plata-brillante', posDraft: 'MC', club: 'SC Friburgo' },
      { nombre: 'Junya Ito',          overall: 74, tier: 'plata-brillante', posDraft: 'DL', club: 'KRC Genk' },
      { nombre: 'Shogo Taniguchi',    overall: 73, tier: 'plata-brillante', posDraft: 'DF', club: 'Sint-Truidense VV' },
      { nombre: 'Keito Nakamura',     overall: 73, tier: 'plata-brillante', posDraft: 'DL', club: 'Stade de Reims' },
      { nombre: 'Tsuyoshi Watanabe',  overall: 72, tier: 'plata-brillante', posDraft: 'DF', club: 'Feyenoord' },
      { nombre: 'Ao Tanaka',          overall: 70, tier: 'plata-mate',      posDraft: 'MC', club: 'Leeds United' },
      { nombre: 'Yukinari Sugawara',  overall: 70, tier: 'plata-mate',      posDraft: 'DF', club: 'SV Werder Bremen' },
      { nombre: 'Daizen Maeda',       overall: 69, tier: 'plata-mate',      posDraft: 'DL', club: 'Celtic FC' },
      { nombre: 'Ayumu Seko',         overall: 67, tier: 'plata-brillante', posDraft: 'DF', club: 'Le Havre AC' },
      { nombre: 'Junnosuke Suzuki',   overall: 64, tier: 'bronce-brillante',posDraft: 'DF', club: 'FC Copenhague' },
      { nombre: 'Kento Shiogai',      overall: 64, tier: 'bronce-mate',     posDraft: 'DL', club: 'VfL Wolfsburgo' },
      { nombre: 'Keisuke Osako',      overall: 64, tier: 'bronce-mate',     posDraft: 'PT', club: 'Sanfrecce Hiroshima' },
      { nombre: 'Koki Ogawa',         overall: 63, tier: 'bronce-mate',     posDraft: 'DL', club: 'NEC Nijmegen' },
      { nombre: 'Keisuke Goto',       overall: 62, tier: 'bronce-mate',     posDraft: 'DL', club: 'Sint-Truidense VV' },
      { nombre: 'Tomoki Hayakawa',    overall: 62, tier: 'bronce-mate',     posDraft: 'PT', club: 'Kashima Antlers' },
      { nombre: 'Yuto Nagatomo',      overall: 60, tier: 'bronce-brillante',posDraft: 'DF', club: 'FC Tokyo' },
    ],
  },

  'FRANCIA': {
    outFile: join(TWITTER_DIR, 'LISTA DE FRANCIA.png'),
    escudo:  'france-national-team-footballlogos-org.webp',
    seleccion: 'FRANCIA',
    titleHtml: `<div id="title-main">FRANCE</div>`,
    titleFontSize: '116px',
    bg: 'linear-gradient(175deg,#002395 0%,#001a6e 50%,#001040 100%)',
    glowColor: 'rgba(0,35,149,0.3)',
    topStripeColor: '#002395',
    bottomStripeColor: '#ED2939',
    accentColor: '#002395',
    subColor: 'rgba(0,35,149,0.8)',
    hashtag: '#FIERSDETREBLEUS',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    bgImagePath: resolve(__dirname, '../TWITTER/LISTAS DE CONVOCADOS/FONDOS VACIOS/428ac2ae-f409-4c61-aab2-25bccb936058.png'),
    cardsTop: 430,
    players: [
      { nombre: 'Kylian Mbappe',        overall: 91, tier: 'oro-brillante',   posDraft: 'DL', club: 'Real Madrid CF' },
      { nombre: 'Ousmane Dembele',       overall: 91, tier: 'oro-brillante',   posDraft: 'DL', club: 'Paris Saint-Germain FC' },
      { nombre: 'Michael Olise',         overall: 90, tier: 'oro-brillante',   posDraft: 'DL', club: 'Bayern Munich' },
      { nombre: 'William Saliba',        overall: 86, tier: 'oro-brillante',   posDraft: 'DF', club: 'Arsenal FC' },
      { nombre: 'Rayan Cherki',          overall: 85, tier: 'oro-brillante',   posDraft: 'MC', club: 'Manchester City' },
      { nombre: 'Aurelien Tchouameni',   overall: 84, tier: 'oro-brillante',   posDraft: 'MC', club: 'Real Madrid CF' },
      { nombre: 'Desire Doue',           overall: 84, tier: 'oro-brillante',   posDraft: 'DL', club: 'Paris Saint-Germain FC' },
      { nombre: 'Dayot Upamecano',       overall: 84, tier: 'oro-brillante',   posDraft: 'DF', club: 'Bayern Munich' },
      { nombre: 'Ibrahima Konate',       overall: 83, tier: 'oro-brillante',   posDraft: 'DF', club: 'Liverpool FC' },
      { nombre: 'Mike Maignan',          overall: 83, tier: 'oro-mate',        posDraft: 'PT', club: 'AC Milan' },
      { nombre: 'Jules Koundé',          overall: 82, tier: 'oro-brillante',   posDraft: 'DF', club: 'FC Barcelona' },
      { nombre: 'Theo Hernandez',        overall: 81, tier: 'oro-brillante',   posDraft: 'DF', club: 'Al-Hilal SFC' },
      { nombre: 'Warren Zaire-Emery',    overall: 81, tier: 'oro-brillante',   posDraft: 'MC', club: 'Paris Saint-Germain FC' },
      { nombre: 'Adrien Rabiot',         overall: 81, tier: 'oro-brillante',   posDraft: 'MC', club: 'AC Milan' },
      { nombre: 'N\'Golo Kante',         overall: 79, tier: 'oro-mate',        posDraft: 'MC', club: 'Fenerbahce' },
      { nombre: 'Bradley Barcola',       overall: 79, tier: 'oro-mate',        posDraft: 'DL', club: 'Paris Saint-Germain FC' },
      { nombre: 'Marcus Thuram',         overall: 78, tier: 'oro-brillante',   posDraft: 'DL', club: 'Inter de Milan' },
      { nombre: 'Manu Koné',             overall: 78, tier: 'oro-brillante',   posDraft: 'MC', club: 'AS Roma' },
      { nombre: 'Malo Gusto',            overall: 76, tier: 'oro-brillante',   posDraft: 'DF', club: 'Chelsea FC' },
      { nombre: 'Lucas Digne',           overall: 76, tier: 'oro-brillante',   posDraft: 'DF', club: 'Aston Villa' },
      { nombre: 'Lucas Hernandez',       overall: 75, tier: 'oro-brillante',   posDraft: 'DF', club: 'Paris Saint-Germain FC' },
      { nombre: 'Maxence Lacroix',       overall: 74, tier: 'plata-mate',      posDraft: 'DF', club: 'Crystal Palace' },
      { nombre: 'Maghnes Akliouche',     overall: 73, tier: 'plata-mate',      posDraft: 'DL', club: 'AS Monaco' },
      { nombre: 'Brice Samba',           overall: 73, tier: 'plata-mate',      posDraft: 'PT', club: 'Stade Rennais FC' },
      { nombre: 'Jean-Philippe Mateta',  overall: 73, tier: 'plata-mate',      posDraft: 'DL', club: 'Crystal Palace' },
      { nombre: 'Robin Risser',          overall: 70, tier: 'plata-mate',      posDraft: 'PT', club: 'RC Lens' },
    ],
  },

  'NUEVA ZELANDA': {
    outFile: join(TWITTER_DIR, 'LISTA DE NUEVA ZELANDA.png'),
    escudo:  'new-zealand-national-team-footballlogos-org.webp',
    seleccion: 'NUEVA ZELANDA',
    titleHtml: `<div id="title-main">NEW ZEALAND</div>`,
    titleFontSize: '100px',
    bg: 'linear-gradient(175deg,#0a0a0a 0%,#111111 35%,#0d0d0d 65%,#080808 100%)',
    glowColor: 'rgba(255,255,255,0.08)',
    topStripeColor: '#FFFFFF',
    bottomStripeColor: '#000000',
    accentColor: '#FFFFFF',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#ALLWHITES',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [
      { nombre: 'Joe Bell',             overall: 73, tier: 'plata-brillante',  posDraft: 'MC', club: 'Viking FK' },
      { nombre: 'Chris Wood',           overall: 72, tier: 'plata-brillante',  posDraft: 'DL', club: 'Nottingham Forest' },
      { nombre: 'Marko Stamenic',       overall: 72, tier: 'plata-brillante',  posDraft: 'MC', club: 'Swansea City' },
      { nombre: 'Kosta Barbarouses',    overall: 71, tier: 'plata-brillante',  posDraft: 'DL', club: 'Western Sydney Wanderers' },
      { nombre: 'Callum McCowatt',      overall: 70, tier: 'plata-brillante',  posDraft: 'MC', club: 'Silkeborg IF' },
      { nombre: 'Liberato Cacace',      overall: 70, tier: 'plata-brillante',  posDraft: 'DF', club: 'Wrexham AFC' },
      { nombre: 'Alex Paulsen',         overall: 70, tier: 'plata-brillante',  posDraft: 'PT', club: 'KS Lechia Gdansk' },
      { nombre: 'Ben Old',              overall: 69, tier: 'plata-brillante',  posDraft: 'DF', club: 'AS Saint-Etienne' },
      { nombre: 'Tyler Bindon',         overall: 69, tier: 'plata-brillante',  posDraft: 'DF', club: 'Sheffield United' },
      { nombre: 'Michael Boxall',       overall: 69, tier: 'plata-brillante',  posDraft: 'DF', club: 'Minnesota United FC' },
      { nombre: 'Finn Surman',          overall: 67, tier: 'plata-brillante',  posDraft: 'DF', club: 'Portland Timbers' },
      { nombre: 'Tim Payne',            overall: 66, tier: 'plata-brillante',  posDraft: 'DF', club: 'Wellington Phoenix' },
      { nombre: 'Nando Pijnaker',       overall: 66, tier: 'plata-mate',       posDraft: 'DF', club: 'Auckland FC' },
      { nombre: 'Elijah Just',          overall: 65, tier: 'plata-mate',       posDraft: 'DL', club: 'Motherwell FC' },
      { nombre: 'Sarpreet Singh',       overall: 64, tier: 'bronce-brillante', posDraft: 'MC', club: 'Wellington Phoenix' },
      { nombre: 'Jesse Randall',        overall: 64, tier: 'bronce-brillante', posDraft: 'DL', club: 'Auckland FC' },
      { nombre: 'Ben Waine',            overall: 64, tier: 'bronce-mate',      posDraft: 'DL', club: 'Port Vale FC' },
      { nombre: 'Max Crocombe',         overall: 63, tier: 'bronce-mate',      posDraft: 'PT', club: 'Millwall FC' },
      { nombre: 'Matthew Garbett',      overall: 63, tier: 'bronce-mate',      posDraft: 'MC', club: 'Peterborough United' },
      { nombre: 'Ryan Thomas',          overall: 63, tier: 'bronce-brillante', posDraft: 'MC', club: 'PEC Zwolle' },
      { nombre: 'Callan Elliot',        overall: 60, tier: 'bronce-brillante', posDraft: 'DF', club: 'Auckland FC' },
      { nombre: 'Alex Rufer',           overall: 60, tier: 'bronce-mate',      posDraft: 'MC', club: 'Wellington Phoenix' },
      { nombre: 'Lachlan Bayliss',      overall: 56, tier: 'bronce-mate',      posDraft: 'MC', club: 'Newcastle United Jets' },
      { nombre: 'Michael Woud',         overall: 54, tier: 'bronce-mate',      posDraft: 'PT', club: 'Auckland FC' },
      { nombre: 'Francis de Vries',     overall: 53, tier: 'bronce-mate',      posDraft: 'DF', club: 'Auckland FC' },
      { nombre: 'Tommy Smith',          overall: 50, tier: 'bronce-mate',      posDraft: 'DF', club: 'Braintree Town' },
    ],
  },

  'HAITI': {
    outFile: join(TWITTER_DIR, 'LISTA DE HAITI.png'),
    escudo:  'haiti-national-team-footylogos.webp',
    seleccion: 'HAITI',
    titleHtml: `<div id="title-main">HAITI</div>`,
    titleFontSize: '116px',
    bg: 'linear-gradient(175deg,#000d2e 0%,#001a5e 35%,#000d2e 65%,#00071a 100%)',
    glowColor: 'rgba(0,30,120,0.3)',
    topStripeColor: '#00209F',
    bottomStripeColor: '#D21034',
    accentColor: '#D21034',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#GRENADIERS',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
  },

  'CABO VERDE': {
    outFile: join(TWITTER_DIR, 'LISTA DE CABO VERDE.png'),
    escudo:  'cabo-verde-footballlogos-org.webp',
    seleccion: 'CABO VERDE',
    titleHtml: `<div id="title-main">CAPE VERDE</div>`,
    titleFontSize: '116px',
    bg: 'linear-gradient(175deg,#00112e 0%,#001a47 35%,#00112e 65%,#000b1e 100%)',
    glowColor: 'rgba(0,60,180,0.25)',
    topStripeColor: '#003893',
    bottomStripeColor: '#CF2027',
    accentColor: '#FFFFFF',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#TUBARÕESDOATLÂNTICO',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [],
  },

  'CROACIA': {
    outFile: join(TWITTER_DIR, 'LISTA DE CROACIA.png'),
    escudo:  'croatia-national-team-footballlogos-org.webp',
    seleccion: 'CROACIA',
    titleHtml: `<div id="title-main">CROATIA</div>`,
    titleFontSize: '116px',
    bg: 'linear-gradient(175deg,#1a0003 0%,#2d0005 35%,#1a0003 65%,#0d0002 100%)',
    glowColor: 'rgba(210,0,0,0.25)',
    topStripeColor: '#CC0000',
    bottomStripeColor: '#172BA0',
    accentColor: '#FF2020',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#VATRENI',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [],
  },

  'AUSTRIA': {
    outFile: join(TWITTER_DIR, 'LISTA DE AUSTRIA.png'),
    escudo:  'austria-national-team-footballlogos-org.webp',
    seleccion: 'AUSTRIA',
    titleHtml: `<div id="title-main">AUSTRIA</div>`,
    titleFontSize: '116px',
    bg: 'linear-gradient(175deg,#1a0000 0%,#2d0000 35%,#1a0000 65%,#0d0000 100%)',
    glowColor: 'rgba(200,0,0,0.22)',
    topStripeColor: '#ED2939',
    bottomStripeColor: '#ED2939',
    accentColor: '#FF3333',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#TEAMAUSTRIA',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [],
  },

  'EGIPTO': {
    outFile: join(TWITTER_DIR, 'LISTA DE EGIPTO.png'),
    escudo:  'egypt-national-team-footballlogos-org.webp',
    seleccion: 'EGIPTO',
    titleHtml: `<div id="title-main">EGYPT</div>`,
    titleFontSize: '116px',
    bg: 'linear-gradient(175deg,#1a0000 0%,#2a0000 35%,#1a0000 65%,#0d0000 100%)',
    glowColor: 'rgba(200,0,0,0.25)',
    topStripeColor: '#000000',
    bottomStripeColor: '#CC0000',
    accentColor: '#CC0000',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#PHARAOHS',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
  },

  'PORTUGAL': {
    outFile: join(TWITTER_DIR, 'LISTA DE PORTUGAL.png'),
    escudo:  'portugal-national-team-footballlogos-org.webp',
    seleccion: 'PORTUGAL',
    titleHtml: `<div id="title-main">PORTUGAL</div>`,
    titleFontSize: '100px',
    bg: 'linear-gradient(175deg,#1a0003 0%,#2e0005 35%,#1a0003 65%,#0d0002 100%)',
    glowColor: 'rgba(210,38,48,0.25)',
    topStripeColor: '#006600',
    bottomStripeColor: '#D22630',
    accentColor: '#D22630',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#NAVEGADORES',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
  },

  'CURAZAO': {
    outFile: join(TWITTER_DIR, 'LISTA DE CURAZAO.png'),
    escudo:  'curacao-national-team-footballlogos-org.webp',
    seleccion: 'CURAZAO',
    titleHtml: `<div id="title-main">CURAÇAO</div>`,
    titleFontSize: '116px',
    bg: 'linear-gradient(175deg,#00101a 0%,#001a2e 35%,#00101a 65%,#000810 100%)',
    glowColor: 'rgba(0,100,200,0.22)',
    topStripeColor: '#002B7F',
    bottomStripeColor: '#F9E814',
    accentColor: '#003DA5',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#CURAZAO2026',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [],
  },

  'R.D. CONGO': {
    outFile: join(TWITTER_DIR, 'LISTA DE R.D. CONGO.png'),
    escudo:  'congo national team.webp',
    seleccion: 'R.D. CONGO',
    titleHtml: `<div id="title-main">DR CONGO</div>`,
    titleFontSize: '116px',
    bg: 'linear-gradient(175deg,#001a00 0%,#002800 35%,#001a00 65%,#000d00 100%)',
    glowColor: 'rgba(0,180,0,0.22)',
    topStripeColor: '#007A00',
    bottomStripeColor: '#CE1021',
    accentColor: '#00CC00',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#LÉOPARDS',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [],
  },

  'BELGICA': {
    outFile: join(TWITTER_DIR, 'LISTA DE BELGICA.png'),
    escudo:  'belgium-national-team-footballlogos-org.webp',
    seleccion: 'BELGICA',
    titleHtml: `<div id="title-main">BELGIUM</div>`,
    titleFontSize: '116px',
    bg: 'linear-gradient(175deg,#1a0005 0%,#2a0008 35%,#1a0005 65%,#0d0003 100%)',
    glowColor: 'rgba(255,0,0,0.22)',
    topStripeColor: '#000000',
    bottomStripeColor: '#F00027',
    accentColor: '#F00027',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#REDIABLOS',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [
      { nombre: 'Thibaut Courtois',       overall: 90, tier: 'oro-brillante',   posDraft: 'PT', club: 'Real Madrid CF' },
      { nombre: 'Kevin De Bruyne',        overall: 86, tier: 'oro-brillante',   posDraft: 'MC', club: 'SSC Napoles' },
      { nombre: 'Jeremy Doku',            overall: 84, tier: 'oro-brillante',   posDraft: 'DL', club: 'Manchester City' },
      { nombre: 'Amadou Onana',           overall: 82, tier: 'oro-brillante',   posDraft: 'MC', club: 'Aston Villa' },
      { nombre: 'Leandro Trossard',       overall: 82, tier: 'oro-brillante',   posDraft: 'DL', club: 'Arsenal FC' },
      { nombre: 'Charles De Ketelaere',   overall: 81, tier: 'oro-brillante',   posDraft: 'MC', club: 'Atalanta de Bergamo' },
      { nombre: 'Youri Tielemans',        overall: 79, tier: 'oro-mate',        posDraft: 'MC', club: 'Aston Villa' },
      { nombre: 'Romelu Lukaku',          overall: 79, tier: 'oro-brillante',   posDraft: 'DL', club: 'SSC Napoles' },
      { nombre: 'Alexis Saelemaekers',    overall: 78, tier: 'oro-brillante',   posDraft: 'MC', club: 'AC Milan' },
      { nombre: 'Maxim De Cuyper',        overall: 77, tier: 'oro-brillante',   posDraft: 'DF', club: 'Brighton & Hove Albion' },
      { nombre: 'Matias Fernandez-Pardo', overall: 76, tier: 'oro-brillante',   posDraft: 'DL', club: 'LOSC Lille' },
      { nombre: 'Diego Moreira',          overall: 76, tier: 'oro-brillante',   posDraft: 'DL', club: 'Racing Club de Estrasburgo' },
      { nombre: 'Hans Vanaken',           overall: 76, tier: 'oro-brillante',   posDraft: 'MC', club: 'Club Brujas KV' },
      { nombre: 'Zeno Debast',            overall: 76, tier: 'oro-brillante',   posDraft: 'DF', club: 'Sporting de Lisboa' },
      { nombre: 'Dodi Lukebakio',         overall: 75, tier: 'oro-mate',        posDraft: 'DL', club: 'SL Benfica' },
      { nombre: 'Senne Lammens',          overall: 75, tier: 'oro-mate',        posDraft: 'PT', club: 'Manchester United' },
      { nombre: 'Thomas Meunier',         overall: 74, tier: 'plata-brillante', posDraft: 'DF', club: 'LOSC Lille' },
      { nombre: 'Arthur Theate',          overall: 74, tier: 'plata-brillante', posDraft: 'DF', club: 'Eintracht Francfort' },
      { nombre: 'Koni De Winter',         overall: 74, tier: 'plata-mate',      posDraft: 'DF', club: 'AC Milan' },
      { nombre: 'Nicolas Raskin',         overall: 74, tier: 'plata-brillante', posDraft: 'MC', club: 'Rangers FC' },
      { nombre: 'Axel Witsel',            overall: 73, tier: 'plata-mate',      posDraft: 'MC', club: 'Girona FC' },
      { nombre: 'Timothy Castagne',       overall: 72, tier: 'plata-brillante', posDraft: 'DF', club: 'Fulham FC' },
      { nombre: 'Joaquin Seys',           overall: 70, tier: 'plata-mate',      posDraft: 'DF', club: 'Club Brujas KV' },
      { nombre: 'Mike Penders',           overall: 70, tier: 'plata-mate',      posDraft: 'PT', club: 'Racing Club de Estrasburgo' },
      { nombre: 'Nathan Ngoy',            overall: 69, tier: 'plata-mate',      posDraft: 'DF', club: 'LOSC Lille' },
      { nombre: 'Brandon Mechele',        overall: 60, tier: 'bronce-mate',     posDraft: 'DF', club: 'Club Brujas KV' },
    ],
  },

  'TOP26': {
    outFile: join(TWITTER_DIR, 'TOP 26 MEJORES JUGADORES.png'),
    escudo:  'FIFA-2026-World-Cup-Logo.webp',
    seleccion: 'TOP26',
    titleHtml: `<div id="title-main">TOP 26</div>`,
    titleFontSize: '116px',
    bg: 'linear-gradient(175deg,#0d0a00 0%,#1a1400 35%,#0d0a00 65%,#060500 100%)',
    glowColor: 'rgba(240,185,11,0.3)',
    topStripeColor: '#F0B90B',
    bottomStripeColor: '#c8960a',
    accentColor: '#F0B90B',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#WORLDCUP2026',
    slogan: 'LA PAUSA MUNDIAL · LOS MEJORES DEL TORNEO',
    players: [],
  },

  'COREA DEL SUR': {
    outFile: join(TWITTER_DIR, 'LISTA DE COREA DEL SUR.png'),
    escudo:  'south-korea-national-team-footballlogos-org.webp',
    seleccion: 'COREA DEL SUR',
    titleHtml: `<div id="title-main">SOUTH KOREA</div>`,
    titleFontSize: '100px',
    bg: 'linear-gradient(175deg,#1a0005 0%,#2a0008 35%,#1a0005 65%,#0d0003 100%)',
    glowColor: 'rgba(198,12,48,0.25)',
    topStripeColor: '#C60C30',
    bottomStripeColor: '#003478',
    accentColor: '#C60C30',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#TAEGEUKWARRIORS',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [],
  },

  'TUNEZ': {
    outFile: join(TWITTER_DIR, 'LISTA DE TUNEZ.png'),
    escudo:  'tunisia-national-team-footballlogos-org.webp',
    seleccion: 'TUNEZ',
    titleHtml: `<div id="title-main">TUNISIA</div>`,
    titleFontSize: '116px',
    bg: 'linear-gradient(175deg,#1a0005 0%,#2a0008 35%,#1a0005 65%,#0d0003 100%)',
    glowColor: 'rgba(200,0,0,0.22)',
    topStripeColor: '#E70013',
    bottomStripeColor: '#ffffff',
    accentColor: '#E70013',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#LESAIGLESDECARTHAGE',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [],
  },

  'COSTA DE MARFIL': {
    outFile: join(TWITTER_DIR, 'LISTA DE COSTA DE MARFIL.png'),
    escudo:  'cote-d-ivoire-national-team-footballlogos-org.webp',
    seleccion: 'COSTA DE MARFIL',
    titleHtml: `<div id="title-main">IVORY COAST</div>`,
    titleFontSize: '100px',
    bg: 'linear-gradient(175deg,#1a0e00 0%,#2e1a00 35%,#1a0e00 65%,#0d0700 100%)',
    glowColor: 'rgba(240,100,0,0.25)',
    topStripeColor: '#F77F00',
    bottomStripeColor: '#009A44',
    accentColor: '#F77F00',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#ELÉPHANTS',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [],
  },

  'BOSNIA Y HERZEGOVINA': {
    outFile: join(TWITTER_DIR, 'LISTA DE BOSNIA.png'),
    escudo:  'bosnia_herzegovina_national_team.webp',
    seleccion: 'BOSNIA Y HERZEGOVINA',
    titleHtml: `
      <div id="title-line1">BOSNIA</div>
      <div id="title-and">AND</div>
      <div id="title-line2">HERZEGOVINA</div>`,
    titleFontSize: null, // overridden per-line in extraCss
    bg: 'linear-gradient(175deg,#00214a 0%,#001230 35%,#000b22 65%,#000718 100%)',
    glowColor: 'rgba(0,50,160,0.28)',
    topStripeColor: '#FFD700',
    bottomStripeColor: '#003DA5',
    accentColor: '#FFD700',
    subColor: 'rgba(255,255,255,0.75)',
    hashtag: '#ZMAJEVI',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [
      { nombre: 'Ermedin Demirovic',    overall: 79, tier: 'oro-brillante',   posDraft: 'DL', club: 'VfB Stuttgart' },
      { nombre: 'Tarik Muharemovic',    overall: 78, tier: 'oro-brillante',   posDraft: 'DF', club: 'US Sassuolo' },
      { nombre: 'Amar Dedic',           overall: 76, tier: 'oro-brillante',   posDraft: 'DF', club: 'SL Benfica' },
      { nombre: 'Sead Kolasinac',       overall: 76, tier: 'oro-brillante',   posDraft: 'DF', club: 'Atalanta de Bergamo' },
      { nombre: 'Edin Dzeko',           overall: 75, tier: 'oro-brillante',   posDraft: 'DL', club: 'FC Schalke 04' },
      { nombre: 'Nikola Vasilj',        overall: 75, tier: 'oro-brillante',   posDraft: 'PT', club: 'FC St. Pauli' },
      { nombre: 'Kerim Alajbegovic',    overall: 73, tier: 'plata-mate',      posDraft: 'DL', club: 'Red Bull Salzburgo' },
      { nombre: 'Amar Memic',           overall: 73, tier: 'plata-brillante', posDraft: 'MC', club: 'FC Viktoria Plzen' },
      { nombre: 'Esmir Bajraktarevic',  overall: 73, tier: 'plata-brillante', posDraft: 'DL', club: 'PSV Eindhoven' },
      { nombre: 'Nikola Katic',         overall: 73, tier: 'plata-mate',      posDraft: 'DF', club: 'FC Schalke 04' },
      { nombre: 'Benjamin Tahirovic',   overall: 70, tier: 'plata-mate',      posDraft: 'MC', club: 'Brondby IF' },
      { nombre: 'Amir Hadziahmetovic',  overall: 70, tier: 'plata-mate',      posDraft: 'MC', club: 'Hull City' },
      { nombre: 'Ivan Sunjic',          overall: 69, tier: 'plata-brillante', posDraft: 'MC', club: 'Pafos FC' },
      { nombre: 'Nidal Celik',          overall: 68, tier: 'plata-mate',      posDraft: 'DF', club: 'RC Lens' },
      { nombre: 'Armin Gigovic',        overall: 67, tier: 'plata-mate',      posDraft: 'MC', club: 'BSC Young Boys' },
      { nombre: 'Haris Tabakovic',      overall: 67, tier: 'plata-mate',      posDraft: 'DL', club: 'Borussia Monchengladbach' },
      { nombre: 'Stjepan Radeljic',     overall: 66, tier: 'plata-mate',      posDraft: 'DF', club: 'HNK Rijeka' },
      { nombre: 'Dennis Hadžikadunić',  overall: 65, tier: 'plata-mate',      posDraft: 'DF', club: 'Sampdoria' },
      { nombre: 'Martin Zlomislic',     overall: 65, tier: 'plata-mate',      posDraft: 'PT', club: 'HNK Rijeka' },
      { nombre: 'Ivan Basic',           overall: 64, tier: 'bronce-brillante', posDraft: 'MC', club: 'FC Astana' },
      { nombre: 'Samed Bazdar',         overall: 63, tier: 'bronce-mate',     posDraft: 'DL', club: 'Jagiellonia Bialystok' },
      { nombre: 'Nihad Mujakic',        overall: 63, tier: 'bronce-mate',     posDraft: 'DF', club: 'Gaziantep FK' },
      { nombre: 'Dzenis Burnic',        overall: 63, tier: 'bronce-mate',     posDraft: 'MC', club: 'Karlsruher SC' },
      { nombre: 'Jovo Lukic',           overall: 62, tier: 'bronce-mate',     posDraft: 'DL', club: 'FC Universitatea Cluj' },
      { nombre: 'Ermin Mahmić',         overall: 60, tier: 'bronce-mate',     posDraft: 'MC', club: 'Slovan Liberec' },
      { nombre: 'Osman Hadzikic',       overall: 60, tier: 'bronce-mate',     posDraft: 'PT', club: 'Slaven Belupo Koprivnica' },
    ],
  },

  'ESCOCIA': {
    outFile: join(TWITTER_DIR, 'LISTA DE ESCOCIA.png'),
    escudo:  'scotland-national-team-footballlogos-org.webp',
    seleccion: 'ESCOCIA',
    titleHtml: `<div id="title-main">SCOTLAND</div>`,
    titleFontSize: '110px',
    bg: 'linear-gradient(175deg,#000d1a 0%,#001433 35%,#000d1a 65%,#00080f 100%)',
    glowColor: 'rgba(0,100,200,0.22)',
    topStripeColor: '#003087',
    bottomStripeColor: '#FFFFFF',
    accentColor: '#C8A84B',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#SCOTLAND',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [],
  },

  'BRASIL': {
    outFile: join(TWITTER_DIR, 'LISTA DE BRASIL.png'),
    escudo:  'brazil-national-team-footballlogos-org.webp',
    seleccion: 'BRASIL',
    titleHtml: `<div id="title-main">BRAZIL</div>`,
    titleFontSize: '116px',
    bg: 'linear-gradient(175deg,#001a00 0%,#002800 35%,#001a00 65%,#000d00 100%)',
    glowColor: 'rgba(252,190,0,0.28)',
    topStripeColor: '#009C3B',
    bottomStripeColor: '#FCBE00',
    accentColor: '#FCBE00',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#SELECAO',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [],
  },

  'SUIZA': {
    outFile: join(TWITTER_DIR, 'LISTA DE SUIZA.png'),
    escudo:  'swiss-national-team-footballlogos-org.webp',
    seleccion: 'SUIZA',
    titleHtml: `<div id="title-main">SWITZERLAND</div>`,
    titleFontSize: '96px',
    bg: 'linear-gradient(175deg,#1a0000 0%,#2e0000 35%,#1a0000 65%,#0d0000 100%)',
    glowColor: 'rgba(255,0,0,0.28)',
    topStripeColor: '#FF0000',
    bottomStripeColor: '#FF0000',
    accentColor: '#FFFFFF',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#LANATI',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [],
  },

  'NORUEGA': {
    outFile: join(TWITTER_DIR, 'LISTA DE NORUEGA.png'),
    escudo:  'norway-national-team-footballlogos-org.webp',
    seleccion: 'NORUEGA',
    titleHtml: `<div id="title-main">NORWAY</div>`,
    titleFontSize: '116px',
    bg: 'linear-gradient(175deg,#1a0005 0%,#2d0008 35%,#1a0003 65%,#0d0002 100%)',
    glowColor: 'rgba(239,43,45,0.25)',
    topStripeColor: '#EF2B2D',
    bottomStripeColor: '#002868',
    accentColor: '#FFFFFF',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#ULVENE',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [],
  },

  'INGLATERRA': {
    outFile: join(TWITTER_DIR, 'LISTA DE INGLATERRA.png'),
    escudo:  'england-national-team-footballlogos-org.webp',
    seleccion: 'INGLATERRA',
    titleHtml: `<div id="title-main">ENGLAND</div>`,
    titleFontSize: '116px',
    bg: 'linear-gradient(175deg,#0a0a1a 0%,#0d0d2e 35%,#0a0a1a 65%,#060610 100%)',
    glowColor: 'rgba(200,16,46,0.22)',
    topStripeColor: '#C8102E',
    bottomStripeColor: '#00247D',
    accentColor: '#FFFFFF',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#THREELIONS',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [],
  },

  'ALEMANIA': {
    outFile: join(TWITTER_DIR, 'LISTA DE ALEMANIA.png'),
    escudo:  'germany-national-team-footballlogos-org.webp',
    seleccion: 'ALEMANIA',
    titleHtml: `<div id="title-main">GERMANY</div>`,
    titleFontSize: '116px',
    bg: 'linear-gradient(175deg,#0a0a0a 0%,#111111 35%,#0d0d0d 65%,#080808 100%)',
    glowColor: 'rgba(255,205,0,0.22)',
    topStripeColor: '#000000',
    bottomStripeColor: '#FFCD00',
    accentColor: '#FFCD00',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#MANNSCHAFT',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [],
  },

  'SENEGAL': {
    outFile: join(TWITTER_DIR, 'LISTA DE SENEGAL.png'),
    escudo:  'senegal-national-team-footballlogos-org.webp',
    seleccion: 'SENEGAL',
    titleHtml: `<div id="title-main">SENEGAL</div>`,
    titleFontSize: '116px',
    bg: 'linear-gradient(175deg,#001a00 0%,#002800 35%,#001a00 65%,#000d00 100%)',
    glowColor: 'rgba(0,133,63,0.28)',
    topStripeColor: '#00853F',
    bottomStripeColor: '#E31B23',
    accentColor: '#FDEF42',
    subColor: 'rgba(255,255,255,0.78)',
    hashtag: '#TERANGA',
    slogan: 'LA PAUSA MUNDIAL · WORLD CUP 2026',
    players: [],
  },
};

// ── Servidor estático ─────────────────────────────────────────────────────────
const MIME = {
  '.html':'text/html','.js':'application/javascript','.css':'text/css',
  '.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg',
  '.svg':'image/svg+xml','.ico':'image/x-icon','.mp4':'video/mp4',
  '.woff2':'font/woff2','.woff':'font/woff',
};

function startServer() {
  const server = http.createServer((req, res) => {
    const pathname = new URL(req.url, `http://localhost:${PORT}`).pathname;
    const filePath = join(PUBLIC_DIR, decodeURIComponent(pathname));
    if (!existsSync(filePath)) { res.writeHead(404); res.end('Not found'); return; }
    const ct = MIME[extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': ct });
    createReadStream(filePath).pipe(res);
  });
  return new Promise(ok => server.listen(PORT, () => ok(server)));
}

// ── Generador de HTML ─────────────────────────────────────────────────────────
function generateHtml(cfg) {
  const hasBg = !!cfg.bgImagePath;
  const W = hasBg ? 1024 : 1080;
  const H = hasBg ? 1536 : 1350;
  // Narrower cards for the 1024px-wide custom background canvas
  const CW = hasBg ? 131 : 136;

  const isBosniaLongTitle = cfg.seleccion === 'BOSNIA Y HERZEGOVINA';
  const headerHeight = isBosniaLongTitle ? 318 : 298;
  const playersJson  = JSON.stringify(cfg.players);

  let bgCss = '';
  if (hasBg) {
    const b64 = readFileSync(cfg.bgImagePath).toString('base64');
    bgCss = `
#container {
  background-image: url('data:image/png;base64,${b64}') !important;
  background-size: 100% 100% !important;
  background-color: transparent !important;
}
#container::before { display: none !important; }
#top-stripe, #bottom-stripe, #footer { display: none !important; }
#header, #sep-wrap { visibility: hidden !important; }
#cards-area {
  position: absolute !important;
  top: ${cfg.cardsTop ?? 430}px !important;
  left: 0; right: 0;
  padding: 0 30px !important;
}
.cards-row { gap: 7px !important; margin-bottom: 9px !important; }
`;
  }

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
html, body { width:${W}px; height:${H}px; overflow:hidden; background:#000; }
#container {
  width:${W}px; height:${H}px;
  position:relative; overflow:hidden;
  background:${cfg.bg};
  font-family:'Bebas Neue',Impact,sans-serif;
}
#container::before {
  content:''; position:absolute; top:-80px; left:50%; transform:translateX(-50%);
  width:900px; height:550px;
  background:radial-gradient(ellipse at center,${cfg.glowColor} 0%,transparent 65%);
  pointer-events:none; z-index:0;
}
#top-stripe { height:22px; background:${cfg.topStripeColor}; width:100%; position:relative; z-index:10; }
#header {
  position:relative; height:${headerHeight}px;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  z-index:5; padding:0 155px;
}
#divieto-logo { position:absolute; top:20px; left:24px; width:78px; height:78px; object-fit:contain; }
#seleccion-escudo {
  position:absolute; top:14px; right:24px; width:118px; height:118px; object-fit:contain;
  filter:drop-shadow(0 3px 10px rgba(0,0,0,0.7));
}
#title-main { font-size:116px; color:${cfg.accentColor}; line-height:0.88; text-align:center;
  text-shadow:0 4px 24px rgba(0,0,0,0.9), 0 0 50px rgba(254,204,2,0.16); letter-spacing:6px; }
#title-line1 { font-size:96px; color:${cfg.accentColor}; line-height:0.88; text-align:center;
  text-shadow:0 4px 24px rgba(0,0,0,0.9); letter-spacing:5px; }
#title-and   { font-size:28px; color:rgba(255,255,255,0.65); letter-spacing:12px; margin:4px 0 2px; font-style:italic; }
#title-line2 { font-size:68px; color:${cfg.accentColor}; line-height:0.9; text-align:center;
  text-shadow:0 4px 24px rgba(0,0,0,0.9); letter-spacing:3px; }
#title-sub { font-size:25px; color:${cfg.subColor}; letter-spacing:14px; margin-top:9px; }
#title-wc  { font-size:36px; color:#fff; letter-spacing:5px; margin-top:8px; text-shadow:0 2px 8px rgba(0,0,0,0.5); }
#sep-wrap  { margin:0 20px; z-index:5; position:relative; }
#sep-yellow { height:5px; background:linear-gradient(90deg,transparent 4%,${cfg.accentColor} 22%,${cfg.accentColor} 78%,transparent 96%); }
#sep-blue   { height:3px; margin-top:3px; background:linear-gradient(90deg,transparent 4%,${cfg.bottomStripeColor} 22%,${cfg.bottomStripeColor} 78%,transparent 96%); }
#cards-area { padding:20px 40px 16px; position:relative; z-index:5; }
.cards-row  { display:flex; justify-content:center; gap:8px; margin-bottom:12px; }
.cards-row:last-child { margin-bottom:0; }
#footer {
  position:absolute; bottom:26px; left:0; right:0; height:60px;
  display:flex; align-items:center; justify-content:space-between;
  padding:0 30px; border-top:2px solid rgba(255,215,0,0.2); z-index:5;
}
#footer-social  { font-family:'Barlow Condensed',sans-serif; font-size:18px; color:rgba(255,255,255,0.5); letter-spacing:1px; }
#footer-slogan  { font-family:'Barlow Condensed',sans-serif; font-size:13px; color:rgba(255,255,255,0.32); text-transform:uppercase; letter-spacing:2px; text-align:center; }
#footer-hashtag { font-size:33px; color:${cfg.accentColor}; letter-spacing:2px; }
#bottom-stripe  { position:absolute; bottom:0; left:0; right:0; height:26px; background:${cfg.bottomStripeColor}; z-index:10; }
${bgCss}
</style>
</head>
<body>
<div id="container">
  <div id="top-stripe"></div>
  <div id="header">
    <img id="divieto-logo"     src="/assets/img/divieto-completo.webp" onerror="this.style.display='none'">
    <img id="seleccion-escudo" src="/assets/img/escudos/selecciones/${cfg.escudo}" onerror="this.style.display='none'">
    ${cfg.titleHtml}
    <div id="title-sub">— SQUAD CALL-UP —</div>
    <div id="title-wc">WORLD CUP 2026 ⚽</div>
  </div>
  <div id="sep-wrap">
    <div id="sep-yellow"></div>
    <div id="sep-blue"></div>
  </div>
  <div id="cards-area"></div>
  <div id="footer">
    <div id="footer-social">@DIVIET026 · X · TIKTOK</div>
    <div id="footer-slogan">${cfg.slogan}</div>
    <div id="footer-hashtag">${cfg.hashtag}</div>
  </div>
  <div id="bottom-stripe"></div>
</div>
<script src="/js/fotos.js"></script>
<script src="/js/club_liga.js"></script>
<script src="/js/cartas.js"></script>
<script>
const PLAYERS = ${playersJson};
const SEL = ${JSON.stringify(cfg.seleccion)};
const CW = ${CW};
const CH = Math.round(CW * 928 / 594);
const area = document.getElementById('cards-area');
const rows = [PLAYERS.slice(0,7), PLAYERS.slice(7,14), PLAYERS.slice(14,21), PLAYERS.slice(21,26)];
rows.forEach(row => {
  const rowDiv = document.createElement('div');
  rowDiv.className = 'cards-row';
  row.forEach(p => {
    const card = {
      nombre: p.nombre, overall: p.overall, tier: p.tier,
      posDraft: p.posDraft, seleccion: p.seleccion || SEL,
      foto: FOTOS_JUGADORES[p.nombre], club: p.club
    };
    const w = document.createElement('div');
    w.style.cssText = 'width:' + CW + 'px;height:' + CH + 'px;flex-shrink:0;';
    w.innerHTML = miniCardSVG(card, CW, CH);
    rowDiv.appendChild(w);
  });
  area.appendChild(rowDiv);
});
</script>
</body>
</html>`;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const rawArg = process.argv[2] || 'SUECIA';
  const arg = rawArg.toUpperCase();
  const cfg = CONFIGS[arg] || CONFIGS['SUECIA'];
  cfg.players = cfg.seleccion === 'TOP26' ? loadTop26Players() : loadJugadoresForSel(cfg.seleccion);
  if (!cfg.players.length) { console.error(`❌ No se encontraron jugadores para: ${arg}`); process.exit(1); }
  const hasBg = !!cfg.bgImagePath;
  const W = hasBg ? 1024 : 1080;
  const H = hasBg ? 1536 : 1350;

  console.log(`Generando imagen para: ${arg}${hasBg ? ' (fondo personalizado)' : ''}`);
  const server = await startServer();

  try {
    writeFileSync(TEMP_FILE, generateHtml(cfg), 'utf-8');

    await mkdir(TWITTER_DIR, { recursive: true });

    const browser = await chromium.launch();
    const page    = await browser.newPage();
    await page.setViewportSize({ width: W, height: H });

    await page.goto(`http://localhost:${PORT}/squad-image-temp.html`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    await page.waitForTimeout(2500);

    await page.screenshot({
      path: cfg.outFile,
      clip: { x: 0, y: 0, width: W, height: H },
    });

    await browser.close();
    console.log(`✅ Guardada: ${cfg.outFile}`);

  } finally {
    server.close();
    try { unlinkSync(TEMP_FILE); } catch {}
  }
}

main().catch(err => { console.error(err); process.exit(1); });
