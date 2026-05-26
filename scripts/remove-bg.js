#!/usr/bin/env node
// Elimina el fondo blanco de todas las fotos de jugadores
// Entrada:  public/assets/img/players/*.webp  (fondo blanco)
// Salida:   public/assets/img/players/*.png   (fondo transparente)

import sharp from 'sharp';
import { readdirSync, unlinkSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = join(__dirname, '..', 'public', 'assets', 'img', 'players');

// Umbral: píxel "blanco" si R>230 && G>230 && B>230
const THRESHOLD_HARD = 245; // blanco puro → transparente
const THRESHOLD_SOFT = 210; // zona de feathering → semi-transparente

async function removeBg(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()          // añade canal alpha si no lo tiene
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info; // channels = 4 (RGBA)
  const buf = Buffer.from(data);

  for (let i = 0; i < buf.length; i += 4) {
    const r = buf[i], g = buf[i + 1], b = buf[i + 2];
    const brightness = (r + g + b) / 3;
    // Solo actuar en píxeles "grises/blancos" (fondo) — el jugador suele tener color
    const colorVariance = Math.max(r, g, b) - Math.min(r, g, b);
    if (brightness > THRESHOLD_SOFT && colorVariance < 40) {
      if (brightness > THRESHOLD_HARD) {
        buf[i + 3] = 0; // blanco puro → totalmente transparente
      } else {
        // Zona de borde → feathering suave
        const ratio = (brightness - THRESHOLD_SOFT) / (THRESHOLD_HARD - THRESHOLD_SOFT);
        buf[i + 3] = Math.round((1 - ratio) * buf[i + 3]);
      }
    }
  }

  await sharp(buf, { raw: { width, height, channels: 4 } })
    .webp({ lossless: false, alphaQuality: 90, quality: 85 })
    .toFile(outputPath);
}

async function main() {
  // Borrar PNGs anteriores si existen
  readdirSync(DIR).filter(f => f.endsWith('.png')).forEach(f => unlinkSync(join(DIR, f)));

  const files = readdirSync(DIR).filter(f => f.endsWith('.webp'));
  console.log(`Procesando ${files.length} imágenes...`);

  let ok = 0, fail = 0;
  for (let i = 0; i < files.length; i++) {
    const name = files[i];
    const id = name.replace('.webp', '');
    const input = join(DIR, name);
    const output = join(DIR, `${id}-t.webp`); // -t = transparent

    if (existsSync(output)) { ok++; continue; }

    try {
      await removeBg(input, output);
      ok++;
      if ((i + 1) % 50 === 0) console.log(`  ${i + 1}/${files.length} ...`);
    } catch (e) {
      console.error(`  ❌ ${name}: ${e.message}`);
      fail++;
    }
  }

  console.log(`✅ ${ok} procesadas · ❌ ${fail} errores`);
  console.log('Ahora actualiza fotos.js: cambia .webp → .png y redeploya.');
}

main().catch(e => { console.error(e); process.exit(1); });
