import http from 'http';
import { createReadStream, writeFileSync, unlinkSync, existsSync } from 'fs';
import { extname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';
import sharp from 'sharp';

const __root     = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const PUBLIC_DIR = join(__root, 'public');
const PORT       = 7658;
const TEMP_FILE  = join(PUBLIC_DIR, 'card-explainer-temp.html');
const OUT_WEBP   = join(PUBLIC_DIR, 'assets/img/onboarding/ob-carta.webp');

const W  = 390;
// Carta grande — ratio real del PNG: canvas 1498×1050, card w=616 h=950
const CW = 230;
const CH = Math.round(CW * 950 / 616);   // 355
const CL = Math.round((W - CW) / 2);     // 80
const CT = 38;
const CR = CL + CW;                       // 310
const CB = CT + CH;                       // 393
const CANVAS_H = CB + 62;                 // 455

const PLAYER = {
  nombre: 'Lionel Messi', overall: 89, tier: 'oro-brillante',
  posicion: 'DL', seleccion: 'ARGENTINA', club: 'Inter Miami CF',
};

const Q = CW / 100; // 2.3

// ── Puntos (py) y posiciones de etiqueta (ly) calculados para cero solapamiento
// left dots:  px = CL (borde izq de carta), círculo hueco no tapa contenido
// right dots: px = CR (borde der de carta)
//
// Bloques verificados (baseline del último texto + ~11px):
//   OVR   ly=88: main y=83, sub1 y=95, sub2 y=108 → bottom 119
//   POS   ly=148: main y=143                       → top 128  gap=9 ✓
//   SEL   ly=175: main y=170                       → top 155  gap=7 ✓
//   CAT   ly=55:  main y=50, sub1 y=62, sub2 y=75  → bottom 75
//   NOM   ly=239: main y=234                       → top 224  gap=149 ✓
//   RIV   ly=282: main y=277                       → top 267  gap=28 ✓
// ─────────────────────────────────────────────────────────────────────────────
const ANNS = [
  { px: CL, py: CT+62,  ly: CT+50,  label:'OVR',       sub:['VALORACIÓN','DEL JUGADOR'], dot:'#f0cc60', side:'left'  },
  { px: CL, py: CT+90,  ly: CT+110, label:'POSICIÓN',  sub:null,                         dot:'#ffffff', side:'left'  },
  { px: CL, py: CT+125, ly: CT+137, label:'SELECCIÓN', sub:null,                         dot:'#ffffff', side:'left'  },
  { px: CR, py: CT+23,  ly: CT+17,  label:'CATEGORÍA', sub:['Oro · Plata','· Bronce'],   dot:'#f0cc60', side:'right' },
  { px: CR, py: CT+201, ly: CT+201, label:'NOMBRE',    sub:null,                         dot:'#c8a84b', side:'right' },
  { px: CR, py: CT+244, ly: CT+244, label:'RIVAL',     sub:null,                         dot:'#9ab8c0', side:'right' },
];

// LIGA / CLUB — centrado debajo de la carta (al nivel de los badges)
const LIGA_Y = CB + 26;

function annSvg() {
  const FS = 15;  // font-size etiquetas
  const SF = 11;  // font-size sub-texto

  const labels = ANNS.map(a => {
    const ex  = a.side === 'left' ? CL - 12 : CR + 12;
    const tx  = a.side === 'left' ? 4 : W - 4;
    const ta  = a.side === 'left' ? 'start' : 'end';
    const lx2 = a.side === 'left' ? tx + 1 : tx - 1;

    const dot  = `<circle cx="${a.px}" cy="${a.py}" r="2.5" fill="none" stroke="${a.dot}" stroke-width="1.4" opacity="0.8"/>`;
    const line = `<line x1="${a.px}" y1="${a.py}" x2="${ex}" y2="${a.ly}"
    stroke="rgba(255,255,255,0.22)" stroke-width="0.9" stroke-dasharray="3,3"/>
  <line x1="${ex}" y1="${a.ly}" x2="${lx2}" y2="${a.ly}"
    stroke="rgba(255,255,255,0.22)" stroke-width="0.9"/>`;

    const mainY  = a.ly - 5;
    const mainEl = `<text x="${tx}" y="${mainY}" text-anchor="${ta}"
    font-family="'Bebas Neue',sans-serif" font-size="${FS + (a.sub ? 2 : 0)}" letter-spacing="1"
    fill="${a.dot === '#f0cc60' ? '#f0cc60' : 'rgba(255,255,255,0.92)'}">${a.label}</text>`;

    const subEls = (a.sub || []).map((s, i) =>
      `<text x="${tx}" y="${a.ly + 8 + i * 13}" text-anchor="${ta}"
    font-family="'Barlow Condensed',sans-serif" font-size="${SF}" font-weight="700"
    letter-spacing="0.3" fill="rgba(255,255,255,${a.dot === '#f0cc60' ? '0.55' : '0.9'})">${s}</text>`
    ).join('\n  ');

    return `\n  ${dot}\n  ${line}\n  ${mainEl}\n  ${subEls}`;
  }).join('\n');

  const ligaLabel = `
  <text x="${W / 2}" y="${LIGA_Y}" text-anchor="middle"
    font-family="'Bebas Neue',sans-serif" font-size="${FS}" letter-spacing="1"
    fill="rgba(255,255,255,0.88)">LIGA / CLUB</text>`;

  return labels + ligaLabel;
}

// ── HTML ──────────────────────────────────────────────────────────────────────
function generateHtml() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
html,body{width:${W}px;background:#000;overflow-x:hidden;}
.wrap{position:relative;width:${W}px;height:${CANVAS_H}px;
  background:radial-gradient(ellipse at 50% 42%,#0f1310 0%,#000 70%);}
.card-el{position:absolute;left:${CL}px;top:${CT}px;width:${CW}px;height:${CH}px;
  z-index:3;container-type:inline-size;overflow:hidden;}
.ann{position:absolute;top:0;left:0;width:100%;height:100%;z-index:5;
  overflow:visible;pointer-events:none;}
</style>
</head>
<body>
<div style="width:${W}px;background:#000;">
  <div class="wrap">
    <div class="card-el" id="card"></div>
    <svg class="ann" viewBox="0 0 ${W} ${CANVAS_H}">${annSvg()}</svg>
  </div>
</div>
<script src="/js/fotos.js"></script>
<script src="/js/club_liga.js"></script>
<script src="/js/cartas.js"></script>
<script>
// Rival de Argentina: Argelia (ISO dz)
window.getNextRivalIso = function(seleccion) {
  return seleccion === 'ARGENTINA' ? 'dz' : null;
};
const p = ${JSON.stringify(PLAYER)};
const foto = (typeof FOTOS_JUGADORES !== 'undefined') ? FOTOS_JUGADORES[p.nombre] : undefined;
document.getElementById('card').innerHTML = cardSVG({ ...p, foto });
</script>
</body>
</html>`;
}

// ── Servidor ──────────────────────────────────────────────────────────────────
const MIME = {
  '.html':'text/html','.js':'application/javascript','.css':'text/css',
  '.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg',
  '.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff',
};
function startServer() {
  const server = http.createServer((req, res) => {
    const pathname = new URL(req.url, `http://localhost:${PORT}`).pathname;
    const filePath = join(PUBLIC_DIR, decodeURIComponent(pathname));
    if (!existsSync(filePath)) { res.writeHead(404); res.end(); return; }
    const ct = MIME[extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': ct });
    createReadStream(filePath).pipe(res);
  });
  return new Promise(ok => server.listen(PORT, () => ok(server)));
}

// ── Main — renderiza a 4× sin reescalar ──────────────────────────────────────
async function main() {
  const SCALE = 4;
  const server = await startServer();
  try {
    const browser = await chromium.launch();
    const context = await browser.newContext({ deviceScaleFactor: SCALE });
    const page    = await context.newPage();
    writeFileSync(TEMP_FILE, generateHtml(), 'utf-8');
    await page.setViewportSize({ width: W, height: 1200 });
    await page.goto(`http://localhost:${PORT}/card-explainer-temp.html`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1200);
    const height = await page.evaluate(() => document.querySelector('body > div').offsetHeight);
    await page.setViewportSize({ width: W, height });
    const tmpPng = OUT_WEBP.replace('.webp', '.png');
    await page.screenshot({ path: tmpPng, clip: { x:0, y:0, width:W, height } });
    await page.close();
    await sharp(tmpPng).webp({ quality: 93 }).toFile(OUT_WEBP);
    try { unlinkSync(tmpPng); } catch {}
    console.log('✅', OUT_WEBP);
    await browser.close();
  } finally {
    server.close();
    try { unlinkSync(TEMP_FILE); } catch {}
  }
}
main().catch(err => { console.error(err); process.exit(1); });
