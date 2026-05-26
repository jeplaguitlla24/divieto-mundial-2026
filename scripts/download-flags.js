import sharp from 'sharp';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const OUT_DIR = './public/assets/img/flags';
const CDN = 'https://flagcdn.com/w80';

const ISO_CODES = [
  'mx','za','kr','cz','ca','ba','qa','ch',
  'br','ma','ht','gb-sct','us','py','au','tr',
  'de','cw','ci','ec','nl','jp','se','tn',
  'be','eg','ir','nz','es','cv','sa','uy',
  'fr','sn','iq','no','ar','dz','at','jo',
  'pt','cd','uz','co','gb-eng','hr','gh','pa'
];

async function run() {
  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });

  let ok = 0, fail = 0;
  for (const iso of ISO_CODES) {
    const url = `${CDN}/${iso}.png`;
    const outPath = join(OUT_DIR, `${iso}.webp`);

    if (existsSync(outPath)) {
      console.log(`  skip  ${iso}.webp (ya existe)`);
      ok++;
      continue;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await sharp(buf).webp({ quality: 90 }).toFile(outPath);
      console.log(`  ✓  ${iso}.webp`);
      ok++;
    } catch (e) {
      console.error(`  ✗  ${iso}: ${e.message}`);
      fail++;
    }
  }

  console.log(`\nListo: ${ok} OK, ${fail} errores.`);
}

run();
