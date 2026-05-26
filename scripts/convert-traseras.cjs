const sharp = require('sharp');
const path = require('path');

const SRC = 'C:/Users/Jepii/Desktop/la-pausa-mundial/public/assets/img/CARTAS PNG';
const OUT = SRC;

const cards = [
  'ORO BRILLANTE TRASERA',
  'ORO MATE TRASERA',
  'PLATA BRILLANTE TRASERA',
  'PLATA MATE TRASERA',
  'BRONCE BRILLANTE TRASERA',
  'BRONCE MATE TRASERA',
];

(async () => {
  for (const name of cards) {
    await sharp(`${SRC}/${name}.png`)
      .webp({ quality: 92 })
      .toFile(`${OUT}/${name}.webp`);
    console.log('OK:', name + '.webp');
  }
  // Logo Dv negro
  await sharp('C:/Users/Jepii/Downloads/Texto.png')
    .webp({ quality: 92 })
    .toFile('C:/Users/Jepii/Desktop/la-pausa-mundial/public/assets/img/dv-logo-trasera.webp');
  console.log('OK: dv-logo-trasera.webp');
})();
