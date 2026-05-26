import sharp from 'sharp';
import { readdir, readFile, writeFile, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const PLAYERS_DIR = './public/assets/img/players';
const FOTOS_JS    = './public/js/fotos.js';
const QUALITY     = 85;

async function convert() {
  const files = await readdir(PLAYERS_DIR);
  const toConvert = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));

  if (toConvert.length === 0) {
    console.log('convert-to-webp: sin archivos nuevos que convertir.');
    return;
  }

  console.log(`convert-to-webp: convirtiendo ${toConvert.length} archivo(s)...`);

  let fotos = await readFile(FOTOS_JS, 'utf-8');
  let count = 0;

  for (const file of toConvert) {
    const inputPath  = join(PLAYERS_DIR, file);
    const webpName   = basename(file, extname(file)) + '.webp';
    const outputPath = join(PLAYERS_DIR, webpName);

    try {
      await sharp(inputPath).webp({ quality: QUALITY }).toFile(outputPath);
      await unlink(inputPath);
      const escaped = file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      fotos = fotos.replace(new RegExp(escaped, 'g'), webpName);
      count++;
      process.stdout.write(`\r  ${count}/${toConvert.length} — ${file} → ${webpName}  `);
    } catch (e) {
      console.error(`\nError con ${file}:`, e.message);
    }
  }

  await writeFile(FOTOS_JS, fotos, 'utf-8');
  console.log(`\nconvert-to-webp: ${count} convertidos, fotos.js actualizado.`);
}

convert();
