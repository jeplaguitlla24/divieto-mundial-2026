#!/usr/bin/env node
// Uso: node scripts/bump.js cartas
//       node scripts/bump.js fotos
// Sube en +1 el ?v=N de ese archivo JS en todos los HTML de /public

const fs   = require('fs');
const path = require('path');

const target = process.argv[2];
if (!target) { console.error('Uso: node scripts/bump.js <nombre-archivo>  (sin .js)'); process.exit(1); }

const re = new RegExp(`(${target}\\.js\\?v=)(\\d+)`, 'g');

function walk(dir) {
  return fs.readdirSync(dir).flatMap(f => {
    const full = path.join(dir, f);
    return fs.statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const publicDir = path.join(__dirname, '..', 'public');
const htmlFiles = walk(publicDir).filter(f => f.endsWith('.html'));

let updated = 0;
let newVersion = null;

htmlFiles.forEach(file => {
  const original = fs.readFileSync(file, 'utf8');
  const replaced  = original.replace(re, (_, prefix, v) => {
    newVersion = parseInt(v) + 1;
    return prefix + newVersion;
  });
  if (replaced !== original) {
    fs.writeFileSync(file, replaced, 'utf8');
    updated++;
    console.log('  ✓', path.relative(publicDir, file));
  }
});

if (updated === 0) {
  console.log('No se encontró ninguna referencia a ' + target + '.js?v=N');
} else {
  console.log('\n' + target + '.js → v' + newVersion + ' (' + updated + ' archivos actualizados)');
}
