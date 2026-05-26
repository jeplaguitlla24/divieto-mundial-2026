import { execSync } from 'child_process';

const sel = process.argv.slice(2).join(' ') || 'SUECIA';

try {
  execSync('node scripts/sync-overrides-to-jugadores.js', { stdio: 'inherit' });
} catch {}

execSync(`node scripts/generate-squad-image.js "${sel}"`, { stdio: 'inherit' });
