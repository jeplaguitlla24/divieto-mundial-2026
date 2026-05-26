const fs = require('fs');

const json = JSON.parse(fs.readFileSync('C:/Users/Jepii/Downloads/overalls_revisados.json', 'utf8'));
const cambios = json; // aplicar todos: overall_nuevo + tier (incluye cambios solo de tier)

// JSON name → exact name in jugadores.js
const ALIAS = {
  'Julian Alvarez':       'Julián Álvarez',
  'Enzo Fernandez':       'Enzo Fernández',
  'Emiliano Martinez':    'Emiliano "Dibu" Martinez',
  'Marcos Acuna':         'Marcos Acuña',
  'Daniel MuÃ±oz': 'Daniel Muñoz',   // corrupted ñ
  'Victor MuÃ±oz':  'Victor Muñoz',
  'Petar Sucic':          'Petar Sučić',
  'Joao Neves':           'João Neves',
  'Goncalo Ramos':        'Gonçalo Ramos',
  'Joao Cancelo':         'João Cancelo',
  'Pedro Goncalves':      'Pedro Gonçalves',
  'Francisco Conceicao':  'Francisco Conceição',
  'Goncalo Guedes':       'Gonçalo Guedes',
  'Rayan Ait-Nouri':      'Rayan Aït-Nouri',
  'Joao Paulo':           'João Paulo',
  'Pervis EstupiÃ±an': 'Pervis Estupiñan',
  'YÃ©remy Pino':      'Yéremy Pino',
  'Neil El Aynaoui':      'El Aynaoui',
  'Jose Cordoba':         'José Córdoba',
  'Francisco Trincao':    'Francisco Trincão',
  'Tomas Araujo':         'Tomás Araújo',
  'Maxi Araujo':          'Maxi Araújo',
  'Ronald Araujo':        'Ronald Araújo',
  'Goncalo Inacio':       'Gonçalo Inacio',
  'Joel OrdoÃ±ez':    'Joel Ordoñez',
  'PathÃ© Ciss':      'Pathé Ciss',
};

let src = fs.readFileSync('./public/js/jugadores.js', 'utf8');

let aplicados = 0;
const noEncontrados = [];

for (const d of cambios) {
  const nombre = ALIAS[d.jugador] || d.jugador;
  const nombreEsc = nombre.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    `("nombre":\\s*"${nombreEsc}"[^}]*?"overall":\\s*)\\d+([^}]*?"tier":\\s*)"[^"]*"`,
    's'
  );

  if (!re.test(src)) {
    noEncontrados.push(`${d.jugador} → ${nombre}`);
    continue;
  }

  src = src.replace(re, `$1${d.overall_nuevo}$2"${d.tier}"`);
  aplicados++;
}

fs.writeFileSync('./public/js/jugadores.js', src);

console.log(`Aplicados: ${aplicados} / ${cambios.length}`);
if (noEncontrados.length) {
  console.log('No encontrados:');
  noEncontrados.forEach(n => console.log(' -', n));
}
