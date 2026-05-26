import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/app/',
  '/app/liga/',
  '/app/draft/formacion/',
  '/app/draft/?formacion=4-3-3',
  '/app/analisis/',
  '/app/jornada/',
  '/app/reglamento/',
];

// UTF-8 bytes mal interpretados como Latin-1 (mojibake)
// Captura: ContraseÃ±a, Â·, âœ", ðŸ"– y variantes similares
// [ÃÂ�] = prefijos típicos de secuencias mal decodificadas
// â[€™œ""] = â seguido de chars de sustitución (comillas, marcas, etc.)
// ðŸ = prefijo de emojis de 4 bytes mal decodificados
const MOJIBAKE_RE = /[ÃÂ�]|â[€™œ""]|ðŸ/u;

// Errores de consola esperados cuando no hay sesión iniciada:
// - Firebase permission / auth errors
// - Network / fetch failures
// - 404 de recursos (avatares, fotos de usuario) que solo existen autenticado
const IGNORABLE_RE =
  /permission|insufficient|failed to fetch|load failed|net::ERR_|firebase|firestore|auth|failed to load resource/i;

for (const route of ROUTES) {
  test(`[smoke] ${route}`, async ({ page }) => {
    const pageErrors    = [];
    const consoleErrors = [];

    page.on('pageerror', err => pageErrors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error' && !IGNORABLE_RE.test(msg.text())) {
        consoleErrors.push(msg.text());
      }
    });

    const response = await page.goto(route, { waitUntil: 'load', timeout: 30_000 });

    // 5xx = error real del servidor
    const status = response?.status() ?? 200;
    expect(status, `${route} devolvió HTTP ${status}`).toBeLessThan(500);

    // El body debe existir y ser visible
    await expect(page.locator('body')).toBeVisible();

    // La página no puede estar completamente en blanco (ni siquiera el HTML)
    const htmlLen = await page.evaluate(() => document.body.innerHTML.trim().length);
    expect(htmlLen, `"${route}" — página completamente en blanco`).toBeGreaterThan(50);

    // Sin mojibake en el texto visible
    const visibleText = await page.evaluate(() => document.body.innerText);
    expect(visibleText, `Mojibake detectado en "${route}"`).not.toMatch(MOJIBAKE_RE);

    // Sin excepciones JS no capturadas
    expect(
      pageErrors,
      `Crash JS en "${route}":\n  ${pageErrors.join('\n  ')}`,
    ).toHaveLength(0);

    // Sin errores de consola inesperados
    expect(
      consoleErrors,
      `Errores de consola en "${route}":\n  ${consoleErrors.join('\n  ')}`,
    ).toHaveLength(0);
  });
}
