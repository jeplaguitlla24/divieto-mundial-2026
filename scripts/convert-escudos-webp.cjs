const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '../public/assets/img/escudos');
const FOLDERS = [
  BASE,
  path.join(BASE, 'ligas'),
  path.join(BASE, 'selecciones'),
];

async function convertFolder(dir) {
  const files = fs.readdirSync(dir).filter(f => /\.png$/i.test(f));
  let totalIn = 0, totalOut = 0;
  for (const file of files) {
    const input = path.join(dir, file);
    const output = path.join(dir, file.replace(/\.png$/i, '.webp'));
    if (fs.existsSync(output)) { console.log(`  skip (exists): ${file}`); continue; }
    const result = await sharp(input).webp({ lossless: true }).toFile(output);
    const inSize = fs.statSync(input).size;
    totalIn += inSize;
    totalOut += result.size;
    console.log(`  ${file}: ${Math.round(inSize/1024)}KB → ${Math.round(result.size/1024)}KB`);
  }
  return { totalIn, totalOut, count: files.length };
}

async function main() {
  let grandIn = 0, grandOut = 0, grandCount = 0;
  for (const folder of FOLDERS) {
    console.log(`\n=== ${path.relative(BASE, folder) || 'escudos/clubs'} ===`);
    const { totalIn, totalOut, count } = await convertFolder(folder);
    grandIn += totalIn; grandOut += totalOut; grandCount += count;
  }
  console.log(`\nTotal: ${grandCount} archivos, ${Math.round(grandIn/1024)}KB → ${Math.round(grandOut/1024)}KB (${Math.round((1-grandOut/grandIn)*100)}% menos)`);

  // Update club_liga.js — all .png' references are escudo filenames
  const clubLigaPath = path.join(__dirname, '../public/js/club_liga.js');
  const clubLiga = fs.readFileSync(clubLigaPath, 'utf8');
  const clubLigaNew = clubLiga.replace(/\.png'/g, ".webp'");
  fs.writeFileSync(clubLigaPath, clubLigaNew);
  console.log('\nActualizado: club_liga.js');

  // Update cartas.js — only ESCUDOS_SEL block (.png' in that block)
  const cartasPath = path.join(__dirname, '../public/js/cartas.js');
  let cartas = fs.readFileSync(cartasPath, 'utf8');
  // Replace .png' only inside the ESCUDOS_SEL = { ... } block
  cartas = cartas.replace(
    /(const ESCUDOS_SEL\s*=\s*\{[^}]+\})/,
    m => m.replace(/\.png'/g, ".webp'")
  );
  fs.writeFileSync(cartasPath, cartas);
  console.log('Actualizado: cartas.js');

  // Update cartas-svg.js — same ESCUDOS_SEL block
  const cartasSvgPath = path.join(__dirname, '../public/js/cartas-svg.js');
  let cartasSvg = fs.readFileSync(cartasSvgPath, 'utf8');
  cartasSvg = cartasSvg.replace(
    /(const ESCUDOS_SEL\s*=\s*\{[^}]+\})/,
    m => m.replace(/\.png'/g, ".webp'")
  );
  fs.writeFileSync(cartasSvgPath, cartasSvg);
  console.log('Actualizado: cartas-svg.js');
}

main().catch(console.error);
