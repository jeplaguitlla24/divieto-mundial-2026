import sharp from 'sharp';

await sharp('public/assets/img/logo-icono.png').webp({ quality: 90 }).toFile('public/assets/img/logo-icono.webp');
await sharp('public/assets/img/logo-texto.png').webp({ quality: 90 }).toFile('public/assets/img/logo-texto.webp');
console.log('OK');
