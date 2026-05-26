import http from 'http';
import { createReadStream, writeFileSync, unlinkSync, existsSync } from 'fs';
import { extname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';
import sharp from 'sharp';

const __root     = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const PUBLIC_DIR = join(__root, 'public');
const PORT       = 7656;
const TEMP_FILE  = join(PUBLIC_DIR, 'chem-image-temp.html');

// Dimensiones de carta
const CW = 78, CH = 119;

// ── Layout en rombo — Bellingham en el centro, 4 vecinos en los ejes ─────────
//         [Lamine]
//  [Valverde] [Bell] [MC-2]
//         [Davies]
const POS = {
  'MC-1': { cx: 195, cy: 285 },  // centro
  'DL-0': { cx: 195, cy: 105 },  // arriba
  'MC-0': { cx:  60, cy: 285 },  // izquierda
  'MC-2': { cx: 330, cy: 285 },  // derecha
  'DF-1': { cx: 195, cy: 465 },  // abajo
};

const CANVAS_H = 570;

// ── Variante A: Rice — 2+1+1+0 = 4pts / 4 → ×1.5 VERDE ─────────────────────
const VARIANT_A = {
  outWebp: join(PUBLIC_DIR, 'assets/img/onboarding/ob-quimica-verde.webp'),
  subtitle: 'EJEMPLO A — QUÍMICA COMPLETA',
  players: {
    'MC-1': { nombre: 'Jude Bellingham',   overall: 86, tier: 'oro-brillante', posDraft: 'MC', seleccion: 'INGLATERRA', club: 'Real Madrid CF' },
    'MC-0': { nombre: 'Federico Valverde', overall: 87, tier: 'oro-brillante', posDraft: 'MC', seleccion: 'URUGUAY',    club: 'Real Madrid CF' },
    'MC-2': { nombre: 'Declan Rice',       overall: 88, tier: 'oro-brillante', posDraft: 'MC', seleccion: 'INGLATERRA', club: 'Arsenal FC'     },
    'DL-0': { nombre: 'Lamine Yamal',      overall: 91, tier: 'oro-brillante', posDraft: 'DL', seleccion: 'ESPAÑA',     club: 'FC Barcelona'   },
    'DF-1': { nombre: 'Alphonso Davies',   overall: 82, tier: 'oro-brillante', posDraft: 'DF', seleccion: 'CANADA',     club: 'Bayern Munich'  },
  },
  connections: [
    { from:'MC-0', to:'MC-1', score:2, label:'MISMO CLUB',      sublabel:'2 puntos', lx:  60, ly:358 },
    { from:'MC-2', to:'MC-1', score:1, label:'MISMA SELECCIÓN', sublabel:'1 punto',  lx: 330, ly:358 },
    { from:'DL-0', to:'MC-1', score:1, label:'MISMA LIGA',      sublabel:'1 punto',  lx: 195, ly: 30 },
    { from:'DF-1', to:'MC-1', score:0, label:'SIN CONEXIÓN',    sublabel:'0 puntos', lx: 195, ly:540 },
  ],
  focusGlow: 'filter:drop-shadow(0 0 2px #22c55e) drop-shadow(0 0 2px #22c55e) drop-shadow(0 0 2px #22c55e) drop-shadow(0 0 10px rgba(34,197,94,0.8));',
  calcNums: [
    { val:'2', color:'#2dd55e' },
    { val:'+', color:'rgba(255,255,255,0.25)' },
    { val:'1', color:'#fba733' },
    { val:'+', color:'rgba(255,255,255,0.25)' },
    { val:'1', color:'#fba733' },
    { val:'+', color:'rgba(255,255,255,0.25)' },
    { val:'0', color:'#f05555' },
    { val:'= 4 PTS', color:'#fff' },
    { val:'/ 4 conexiones', color:'rgba(255,255,255,0.3)', small:true },
    { val:'→', color:'rgba(255,255,255,0.2)', small:true },
    { val:'×1.5', color:'#22c55e', big:true },
  ],
  tag: 'QUÍMICA COMPLETA ✓',
  tagColor: '#22c55e',
  resultMultVal: '+50%', resultMultColor: '#22c55e',
  resultOvrVal: '+2',    resultOvrColor: '#f0cc60', resultOvrProg: '86 → 88', resultOvrProgColor: '#22c55e',
  resultEjVal:  '8 pts → 12', resultEjLabel: 'Ejemplo nota 7.4',
  nota: 'Si pierde la conexión verde → 3pts &lt; 4 → <strong style="color:#fba733;">×1.25 (+25%)</strong>. Cada conexión cuenta.',
};

// ── Variante B: Kimmich — 2+0+1+0 = 3pts / 4 → ×1.25 NARANJA ───────────────
const VARIANT_B = {
  outWebp: join(PUBLIC_DIR, 'assets/img/onboarding/ob-quimica-naranja.webp'),
  subtitle: 'EJEMPLO B — QUÍMICA PARCIAL',
  players: {
    'MC-1': { nombre: 'Jude Bellingham',   overall: 86, tier: 'oro-brillante', posDraft: 'MC', seleccion: 'INGLATERRA', club: 'Real Madrid CF' },
    'MC-0': { nombre: 'Federico Valverde', overall: 87, tier: 'oro-brillante', posDraft: 'MC', seleccion: 'URUGUAY',    club: 'Real Madrid CF' },
    'MC-2': { nombre: 'Joshua Kimmich',    overall: 86, tier: 'oro-brillante', posDraft: 'MC', seleccion: 'ALEMANIA',   club: 'Bayern Munich'  },
    'DL-0': { nombre: 'Lamine Yamal',      overall: 91, tier: 'oro-brillante', posDraft: 'DL', seleccion: 'ESPAÑA',     club: 'FC Barcelona'   },
    'DF-1': { nombre: 'Alphonso Davies',   overall: 82, tier: 'oro-brillante', posDraft: 'DF', seleccion: 'CANADA',     club: 'Bayern Munich'  },
  },
  connections: [
    { from:'MC-0', to:'MC-1', score:2, label:'MISMO CLUB',   sublabel:'2 puntos', lx:  60, ly:358 },
    { from:'MC-2', to:'MC-1', score:0, label:'SIN CONEXIÓN', sublabel:'0 puntos', lx: 330, ly:358 },
    { from:'DL-0', to:'MC-1', score:1, label:'MISMA LIGA',   sublabel:'1 punto',  lx: 195, ly: 30 },
    { from:'DF-1', to:'MC-1', score:0, label:'SIN CONEXIÓN', sublabel:'0 puntos', lx: 195, ly:540 },
  ],
  focusGlow: 'filter:drop-shadow(0 0 2px #f59e0b) drop-shadow(0 0 2px #f59e0b) drop-shadow(0 0 2px #f59e0b) drop-shadow(0 0 9px rgba(245,158,11,0.75));',
  calcNums: [
    { val:'2', color:'#2dd55e' },
    { val:'+', color:'rgba(255,255,255,0.25)' },
    { val:'0', color:'#f05555' },
    { val:'+', color:'rgba(255,255,255,0.25)' },
    { val:'1', color:'#fba733' },
    { val:'+', color:'rgba(255,255,255,0.25)' },
    { val:'0', color:'#f05555' },
    { val:'= 3 PTS', color:'#fff' },
    { val:'/ 4 conexiones', color:'rgba(255,255,255,0.3)', small:true },
    { val:'→', color:'rgba(255,255,255,0.2)', small:true },
    { val:'×1.25', color:'#f59e0b', big:true },
  ],
  tag: 'QUÍMICA PARCIAL — FALTA 1 PUNTO',
  tagColor: '#f59e0b',
  resultMultVal: '+25%', resultMultColor: '#f59e0b',
  resultOvrVal: '+1',    resultOvrColor: '#f0cc60', resultOvrProg: '86 → 87', resultOvrProgColor: '#f59e0b',
  resultEjVal:  '8 pts → 10', resultEjLabel: 'Ejemplo nota 7.4',
  nota: 'Con Kimmich no hay liga ni selección compartida con Bellingham → 0 pts. Le falta 1 punto para llegar a ×1.5.',
};

const SCORE_COLOR = { 2:'#2dd55e', 1:'#fba733', 0:'#f05555' };
const SCORE_GLOW  = {
  2:'drop-shadow(0 0 5px rgba(45,213,94,0.7)) drop-shadow(0 0 10px rgba(45,213,94,0.3))',
  1:'drop-shadow(0 0 4px rgba(251,167,51,0.65)) drop-shadow(0 0 8px rgba(251,167,51,0.25))',
  0:'drop-shadow(0 0 3px rgba(240,85,85,0.5))',
};

function generateHtml(v) {
  const W = 390;
  const playersJson = JSON.stringify(v.players);

  const linesHtml = v.connections.map(c => {
    const p1 = POS[c.from], p2 = POS[c.to];
    const col  = SCORE_COLOR[c.score];
    const glow = SCORE_GLOW[c.score];
    const op   = c.score===2?'1':c.score===1?'0.9':'0.65';
    return `<line x1="${p1.cx}" y1="${p1.cy}" x2="${p2.cx}" y2="${p2.cy}"
      stroke="${col}" stroke-width="3" stroke-linecap="round" opacity="${op}"
      style="filter:${glow}"/>`;
  }).join('\n    ');

  const labelsHtml = v.connections.map(c => {
    const col = SCORE_COLOR[c.score];
    return `<div class="conn-label" style="left:${c.lx}px;top:${c.ly}px;transform:translate(-50%,-50%);border-color:${col}33;">
      <span style="color:${col};font-weight:700;">${c.label}</span>
      <span style="color:rgba(255,255,255,0.4);">&nbsp;· ${c.sublabel}</span>
    </div>`;
  }).join('');

  const cardsHtml = Object.entries(v.players).map(([key, p]) => {
    const pos = POS[key];
    const left = pos.cx - CW/2, top = pos.cy - CH/2;
    const isFocus = key === 'MC-1';
    const glowStyle = isFocus ? v.focusGlow : '';
    return `<div class="card-pos" data-key="${key}" style="left:${left}px;top:${top}px;width:${CW}px;height:${CH}px;${glowStyle}"></div>`;
  }).join('');

  const calcHtml = v.calcNums.map(n => {
    const fs  = n.big ? '22px' : n.small ? '12px' : '19px';
    const ff  = (n.val.startsWith('×') || n.val.startsWith('=') || n.val.match(/^\d/)) && !n.small
      ? "'Bebas Neue',sans-serif" : "'Barlow Condensed',sans-serif";
    return `<span style="font-family:${ff};font-size:${fs};color:${n.color};line-height:1;padding:0 2px;letter-spacing:0.3px;${n.big?'text-shadow:0 0 12px '+n.color+';':''}">${n.val}</span>`;
  }).join('');

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
.canvas{position:relative;width:${W}px;height:${CANVAS_H}px;background:radial-gradient(ellipse at 50% 48%,#0a1a0a 0%,#000 68%);}
.lines-svg{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;overflow:visible;}
.card-pos{position:absolute;z-index:3;}
.conn-label{position:absolute;z-index:10;font-family:'Barlow Condensed',sans-serif;font-size:10px;letter-spacing:0.5px;white-space:nowrap;padding:3px 8px;border-radius:4px;border:1px solid;background:rgba(0,0,0,0.85);pointer-events:none;}
</style>
</head>
<body>
<div style="width:${W}px;background:#000;">
  <div class="canvas">
    <svg class="lines-svg">${linesHtml}</svg>
    ${cardsHtml}
    ${labelsHtml}
  </div>
</div>

<script src="/js/fotos.js"></script>
<script src="/js/club_liga.js"></script>
<script src="/js/cartas.js"></script>
<script>
const PLAYERS_DATA = ${playersJson};
const CW = ${CW}, CH = ${CH};
for (const [key, p] of Object.entries(PLAYERS_DATA)) {
  const el = document.querySelector('[data-key="' + key + '"]');
  if (!el) continue;
  const foto = (typeof FOTOS_JUGADORES !== 'undefined') ? FOTOS_JUGADORES[p.nombre] : undefined;
  el.innerHTML = miniCardSVG({ nombre:p.nombre, overall:p.overall, tier:p.tier, posicion:p.posDraft, seleccion:p.seleccion, club:p.club, foto }, CW, CH);
}
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

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const W = 390;
  const SCALE = 3; // renderiza a 3× y luego reescala → supersampling
  const server = await startServer();
  try {
    const browser = await chromium.launch();
    const context = await browser.newContext({ deviceScaleFactor: SCALE });
    for (const variant of [VARIANT_A, VARIANT_B]) {
      writeFileSync(TEMP_FILE, generateHtml(variant), 'utf-8');
      const page = await context.newPage();
      await page.setViewportSize({ width: W, height: 1200 });
      await page.goto(`http://localhost:${PORT}/chem-image-temp.html`, { waitUntil:'networkidle', timeout:30000 });
      await page.waitForTimeout(600);
      const height = await page.evaluate(() => document.querySelector('body > div').offsetHeight);
      await page.setViewportSize({ width: W, height });
      const tmpPng = variant.outWebp.replace('.webp', '.png');
      await page.screenshot({ path: tmpPng, clip:{x:0,y:0,width:W,height} });
      await page.close();
      // PNG sale a W*SCALE px de ancho — reescalar a W con lanczos3 para máxima nitidez
      await sharp(tmpPng)
        .webp({ quality: 92 })
        .toFile(variant.outWebp);
      try { unlinkSync(tmpPng); } catch {}
      console.log('✅', variant.outWebp);
    }
    await browser.close();
  } finally {
    server.close();
    try { unlinkSync(TEMP_FILE); } catch {}
  }
}
main().catch(err => { console.error(err); process.exit(1); });
