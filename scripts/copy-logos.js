import { copyFileSync } from 'fs';
import { join } from 'path';

const base = 'C:/Users/Jepii/Desktop/la-pausa-mundial';

copyFileSync(
  join(base, 'LOGO/LOGO NUEVO/Diseño sin título (24).png'),
  join(base, 'public/assets/img/logo-icono.png')
);
copyFileSync(
  join(base, 'LOGO/LOGO NUEVO/Diseño sin título (16).png'),
  join(base, 'public/assets/img/logo-texto.png')
);
console.log('Logos copiados OK');
