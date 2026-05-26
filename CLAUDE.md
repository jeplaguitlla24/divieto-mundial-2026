# LA PAUSA — Contexto maestro para Claude
> Este archivo es la fuente de verdad del proyecto. Léelo entero antes de tocar cualquier cosa.

---

## CAPA 1 — PROTOCOLO DE ACTUALIZACIÓN

> El CLAUDE.md es la única fuente de verdad del proyecto. Toda decisión de producto, diseño o arquitectura debe quedar registrada aquí antes de darse por cerrada. Esta estructura es sagrada — cualquier modificación debe respetar el orden, las secciones y el criterio de separación entre lo cerrado, lo pendiente y lo histórico. Lo que se elimina del proyecto no se tacha ni se mezcla con lo vigente — va a la sección de contexto histórico.

### Cuándo actualizar este archivo
- Cada vez que se cierra una decisión de producto (regla, diseño, mecánica)
- Cuando cambia el estado de un archivo (nuevo, activo, eliminado)
- Cuando se resuelve un pendiente o aparece uno nuevo
- Cuando se corrige un bug o aparece uno nuevo

### Qué sección tocar según el cambio
| Tipo de cambio | Sección |
|----------------|---------|
| Regla de producto nueva o cerrada | CAPA 2 — sección correspondiente |
| SVG, colores, tipografía, flip CSS | CAPA 3 — solo si hay corrección explícita del autor |
| Archivo nuevo o estado actualizado | CAPA 4 — tabla de archivos activos |
| Bug nuevo o resuelto | CAPA 4 — bugs conocidos |
| Decisión pendiente resuelta | Mover de CAPA 5 a CAPA 2, marcar ✅ |

### Cómo hacerlo sin romper nada
1. Leer el archivo completo antes de editar
2. No cambiar lo que está marcado ✅ sin confirmación explícita del autor
3. No tocar los SVG paths del blasón bajo ningún concepto
4. No inventar colores — solo los de la tabla de tiers
5. Añadir la nueva fecha en "Última actualización" al guardar

---

## CAPA 2 — EL PRODUCTO

### Qué es LA PAUSA
Fantasy football basado en **cartas coleccionables estilo Ultimate Team**.
Lanzamiento: **1 junio 2026** · Torneo: **Mundial 2026** (11 junio – 19 julio)
Modo de juego: **Draft por jornada** — cada jornada drafteas tu XI desde cero con cartas de jugadores reales.
Producto diseñado con **prioridad mobile-first**.

### Mecánica core
- Cada jornada el manager hace un **Draft asíncrono** (ventana de tiempo, no en tiempo real)
- Para cada posición aparecen N cartas de jugadores que juegan esa jornada — elige una
- **Pool independiente por manager** — no hay conflicto entre managers
- Puntuación basada en **escala Sofascore** con tabla propia (ver más abajo)
- **Factor Pausa** = media acumulada de puntos LA PAUSA del jugador en el torneo — es el "overall" de la carta
- **Competición principal:** Liga general de puntos acumulados
- **H2H por jornada:** previsto — pendiente de cierre final

---

### Formato de competición ✅
- Liga de puntos acumulados — todos juegan las 8 jornadas, nadie se elimina
- Gana el manager con más puntos al final de J8
- Pool del Draft = solo jugadores que juegan esa jornada (selecciones eliminadas desaparecen automáticamente)

---

### Sistema de Puntuación ✅

**Escala base Sofascore → Puntos LA PAUSA**

| Rating Sofascore | Puntos | Rating Sofascore | Puntos |
|-----------------|--------|-----------------|--------|
| 9.5 – 10.0 | +14 | 6.2 – 6.3 | +1 |
| 9.0 – 9.4  | +13 | 6.0 – 6.1 | 0  |
| 8.6 – 8.9  | +12 | 5.8 – 5.9 | -1 |
| 8.2 – 8.5  | +11 | 5.6 – 5.7 | -2 |
| 8.0 – 8.1  | +10 | 5.4 – 5.5 | -3 |
| 7.8 – 7.9  | +9  | 5.2 – 5.3 | -4 |
| 7.6 – 7.7  | +8  | 5.0 – 5.1 | -5 |
| 7.4 – 7.5  | +7  | 0.0 – 4.9 | -6 |
| 7.2 – 7.3  | +6  | | |
| 7.0 – 7.1  | +5  | | |
| 6.8 – 6.9  | +4  | | |
| 6.6 – 6.7  | +3  | | |
| 6.4 – 6.5  | +2  | | |

**Bonus por gol**

| Posición | Bonus |
|----------|-------|
| Portero (G) | +6 |
| Defensa (D) | +5 |
| Centrocampista (M) | +4 |
| Delantero (F) | +3 |

**Otras bonificaciones**
- Penalti marcado: +3 (cualquier posición)
- Asistencia: +1
- Autogol: 0 puntos extra
- Tarjetas: penalizadas dentro del algoritmo Sofascore (sin penalización adicional)

**Reglas operativas**
- Nota utilizada: **nota final del partido en Sofascore al momento del cierre** — no se modifica después
- Mínimo para puntuar: el jugador debe haber jugado (cualquier minuto registrado)
- En conflicto sobre un gol o acción, prevalece la decisión del árbitro

**Factor Pausa**
- Media acumulada de puntos LA PAUSA del jugador en el torneo
- Se recalcula tras cada jornada
- Determina el tier: Oro / Plata / Bronce según umbrales por overall (ver sección overalls)

**Multiplicador de puntuación en jornada** ✅
- Los multiplicadores por tier (Oro/Plata/Bronce) han sido **eliminados** — el tier solo afecta al diseño visual y al overall de la carta
- El único multiplicador de puntuación es el **bonus de química** (ver sección de Química)
- Fórmula final: `puntos_finales = puntos_base_sofascore × multiplicador_química`

---

### Reglas del Draft ✅

**Equipo por jornada**
- 11 titulares
- Penalización: -4 puntos por cada posición vacía al cierre (máx. 11 posiciones)
- Si un titular no juega ningún minuto: 0 puntos en ese slot (sin penalización adicional)

**Formaciones disponibles** (se elige antes de draftear, no se puede cambiar):
`4-4-2 · 4-3-3 · 3-4-3`
Siempre con 1 portero fijo.

**Jornadas y cartas por pick**

| # | Fase | Equipos activos | Cartas por pick |
|---|------|----------------|----------------|
| 1 | Grupos J1 | 48 | 5 |
| 2 | Grupos J2 | 48 | 5 |
| 3 | Grupos J3 | 48 | 5 |
| 4 | Dieciseisavos | 32 | 5 |
| 5 | Octavos | 16 | 4 |
| 6 | Cuartos | 8 | 4 |
| 7 | Semis | 4 | 3 |
| 8 | 3º/4º puesto + Final | 4 | 3 |

J8 agrupa 3º/4º y Final para maximizar el pool.

**Flujo del Draft**
1. Manager va a `/app/draft/formacion` → elige formación → **no se puede cambiar** (solo con RESET)
2. Si ya existe un draft guardado en localStorage, la página `/app/draft/formacion` redirige directamente a `/app/draft?formacion=X` (sin mostrar el selector)
3. Redirige a `/app/draft?formacion=X-X-X`
4. XI vacío con huecos (blasones silueta pulsantes) según formación
5. Manager pulsa cualquier hueco en el orden que quiera
6. Picker: carrusel swipeable, carta activa centrada 260×395px, adyacentes asoman
7. El picker tiene botón ✕ para cerrar sin elegir (esquina superior derecha)
8. Confirmación: botón ELEGIR (amarillo) en la parte inferior del picker
9. Al confirmar: hueco sustituido por carta mini con tier y overall

**Persistencia del Draft**
- El estado completo se guarda en `localStorage` con clave `lp_draft_{formacion}` (e.g., `lp_draft_4-3-3`)
- Se persisten: cartas seleccionadas por slot, carruseles generados, jugadores vistos, suma de overall, **jornada activa**
- Al volver a `/app/draft` sin parámetro, se detecta la formación guardada en localStorage y se restaura el estado completo
- **Reset automático por jornada:** si el documento `config/jornada` cambia de jornada (e.g., `J1` → `J2`), el draft se resetea automáticamente via `_hardReset()` sin que el manager tenga que hacer nada. El localStorage y Firestore se limpian.
- Manual: botón RESET → `_hardReset()` + redirect a `/app/draft/formacion`
- **Firestore:** el mismo estado se sincroniza en `drafts/{uid}` vía `setDoc` con debounce de 1s. Incluye campo `jornada`. Al cargar, Firestore solo sobreescribe localStorage si `data.savedAt > local.savedAt` Y `data.jornada === _jornadaActual`.
- **Módulo Firebase en draft:** `import { auth, db } from '/js/config.js'`. Expuesto en `window._saveToFirestore` / `window._applyFirestoreState` / `window._clearFirestore`.
- **`_hardReset()`** — función centralizada que limpia todo el estado (slotCards, slotCarousels, draftState, localStorage, Firestore) y re-renderiza los slots vacíos. Usada por el botón RESET y por el cambio automático de jornada.

**Cierre automático del Draft (deadline) ✅ implementado 2026-05-18**
- El draft se cierra automáticamente cuando llega la hora del primer partido de la jornada
- Fuente: `config/jornada.deadline` — timestamp Unix en milisegundos
- Lógica: `onSnapshot(config/jornada)` → si `deadline - Date.now() <= 0` bloquea inmediatamente; si no, `setTimeout` hasta el momento exacto
- Al bloquearse: picker se cierra, botón GUARDAR se deshabilita, toast "DRAFT CERRADO · JORNADA EN CURSO"
- Bloqueo manual de emergencia: `torneo/estado.jornada_bloqueada = true` (Admin SDK o consola)
- **Documento Firestore necesario antes del 11 jun:**
  ```json
  config/jornada → { "actual": "J1", "deadline": 1749668400000 }
  ```
  (`1749668400000` = 11 jun 2026 21:00 Madrid UTC+2)

**Límite de 900 Overall (titulares)**
- La suma de los overalls de los 11 titulares no puede superar 900 al guardar
- Sobrepasar 900 **permite seguir seleccionando** (no bloquea el picker) pero **deshabilita el botón GUARDAR**
- El contador `X / 900` en la topbar se pone en rojo al superar el límite

**Regla de carruseles (3.3 / 3.4 del reglamento)**
- Cada slot tiene su **carrusel fijo y propio** — se genera la primera vez que se abre y no cambia
- Los jugadores ya asignados a otro carrusel no aparecen en nuevos carruseles (unicidad entre carruseles)
- Los carruseles se identifican por clave estable (`T-DL-0`, `T-MC-1`, etc.) almacenada en `data-slot-key`
- Internamente: `slotCarousels = new Map()` · `draftState.carouselPlayers = new Set()`

**Ventana de Draft**
- Se abre cuando termina el último partido de la jornada anterior
- Se cierra cuando empieza el primer partido de la jornada siguiente

**Descartado para v1:** Suplentes

---

### Sistema IF — base cerrada ✅

- Cada jornada: **26 convocados** (como convocatoria real del Mundial)
- 11 titulares + 15 suplentes por posición: **3 PT · 8 DF · 8 MC · 7 DL**
- Criterio: mejores puntuadores LA PAUSA de esa jornada por posición
- Los 26 reciben carta IF negra **permanente** para el resto del torneo
- Si un jugador repite → se actualiza a la carta de la jornada más reciente

**Badge por jornada**

| Jornada | Fase | Badge | Color base |
|---------|------|-------|-----------|
| J1 | Grupos J1 | 1 | México #006847 / #CE1126 |
| J2 | Grupos J2 | 2 | Canadá #FF0000 |
| J3 | Grupos J3 | 3 | EE.UU. #3C3B6E / #B22234 |
| J4 | Dieciseisavos | 16 | por definir |
| J5 | Octavos | 8 | por definir |
| J6 | Cuartos | Q | por definir |
| J7 | Semis | S | por definir |
| J8 | Final | F | por definir |

⚠️ Diseño visual de cartas IF lo lleva el autor — no generar código de diseño sin confirmación.

---

### Sistema de Química ✅

**Archivos implicados:** `public/app/draft/index.html`, `public/js/club_liga.js`

**Concepto:** líneas de color entre slots conectados en el campo. La química es el **único multiplicador de puntuación** en jornada — los badges de multiplicador sobre las cartas han sido eliminados.

---

#### Puntuación de enlace (`chemScore`)

| Resultado | Condición |
|-----------|-----------|
| `2` | Mismo club |
| `2` | Misma liga **+** misma selección (ambas a la vez) |
| `1` | Misma liga **o** misma selección (solo una de las dos) |
| `0` | Sin factor común |
| `-1` | Al menos un slot vacío |

Cada factor (liga / selección) aporta 1 punto — se suman hasta máx. 2. Score ≥2 → verde · score 1 → naranja · score 0 → rojo.
Liga del jugador: se obtiene de `CLUB_LIGA[card.club]` (definido en `public/js/club_liga.js`), ya que el objeto `card` no guarda la liga directamente.

---

#### Bonus de overall por química ✅

Cada línea activa suma al contador de overall del equipo y **cuenta para el límite de 900**:

| Línea | Bonus overall |
|-------|--------------|
| Naranja (score 1) | +1 pto |
| Verde (score 2) | +2 pts |

Implementado en `getChemBonus()` — itera sobre `titularSlots` y suma por jugador según su burbuja: `getChemMult(key) >= 2` → +2 · `>= 1.5` → +1 · sin burbuja → +0.
`updateOverallDisplay()` y `updateGuardar()` usan `getTitularOverallSum() + getChemBonus()`.
`renderChemistry()` llama a ambas al terminar para mantener el contador sincronizado.
Leyenda visual debajo del contador: `● +1  ● +2` (naranja / verde). CSS: `.overall-chem-legend`.

---

#### Multiplicadores de puntuación en jornada ✅ Opción A — cerrado 2026-05-06

El bonus de química es el **único** multiplicador de puntuación (tier eliminado). Fórmula: `pts_finales = pts_base × mult_quimica`

| Conexión | Multiplicador | En la práctica |
|----------|--------------|----------------|
| Sin química | ×1 | puntos base sin cambio |
| Naranja | ×1.25 | +25% de los puntos base |
| Verde | ×1.50 | +50% de los puntos base |

**Ejemplo:** Un jugador con 8 pts base → sin química: 8 pts · naranja: 10 pts · verde: 12 pts

**Opción A — regla definitiva:**
- ≥1 verde **o** ≥2 naranjas → ×1.50
- 1 naranja → ×1.25
- Sin conexiones activas → ×1

El toggle A/B y los botones `#chem-opt-a` / `#chem-opt-b` han sido **eliminados del código**. `chemOptMode` es ahora `const chemOptMode = 'A'` — no modificar.

---

#### Colores de línea

| Score | Color | Trazo |
|-------|-------|-------|
| `2` (verde) | `#22c55e` | sólido 3px, opacidad 1.0 |
| `1` (naranja) | `#f59e0b` | sólido 3px, opacidad 0.95 |
| `0` (rojo) | `#ef4444` | sólido 3px, opacidad 0.75 |
| Solo 1 slot relleno | `rgba(255,255,255,0.22)` | gris punteado 2px (`4,5`) |
| Ambos vacíos | sin línea | — |

---

#### Mapas de conexiones (`CHEM_CONNS`)

**4-4-2** (19 conexiones):
```
DL: T-DL-0 ↔ T-DL-1
MC: T-MC-0↔1 · 1↔2 · 2↔3
DF: T-DF-0↔1 · 1↔2 · 2↔3
DL→MC: DL-0↔MC-0 · DL-0↔MC-1 · DL-1↔MC-2 · DL-1↔MC-3
MC→DF: MC-0↔DF-0 · MC-1↔DF-0 · MC-1↔DF-1 · MC-2↔DF-2 · MC-2↔DF-3 · MC-3↔DF-3
DF→PT: DF-1↔PT-0 · DF-2↔PT-0
```

**4-3-3** (18 conexiones):
```
DL: T-DL-0↔1 · 1↔2
MC: T-MC-0↔1 · 1↔2
DF: T-DF-0↔1 · 1↔2 · 2↔3
DL→MC: DL-0↔MC-0 · DL-1↔MC-1 · DL-2↔MC-2
MC→DF: MC-0↔DF-0 · MC-0↔DF-1 · MC-1↔DF-1 · MC-1↔DF-2 · MC-2↔DF-2 · MC-2↔DF-3
DF→PT: DF-1↔PT-0 · DF-2↔PT-0
```

**3-4-3** (18 conexiones — columnas estrictas):
```
DL: T-DL-0↔1 · 1↔2
MC: T-MC-0↔1 · 1↔2 · 2↔3
DF: T-DF-0↔1 · 1↔2
DL→MC (por columna): DL-0↔MC-0 · DL-1↔MC-1 · DL-1↔MC-2 · DL-2↔MC-3
MC→DF (por columna): MC-0↔DF-0 · MC-1↔DF-1 · MC-2↔DF-1 · MC-3↔DF-2
DF→PT: DF-0↔PT-0 · DF-1↔PT-0 · DF-2↔PT-0
```
⚠️ En 3-4-3: los MC de banda (MC-0, MC-3) solo conectan con el DL y DF de su columna. Los MC centrales (MC-1, MC-2) solo conectan con el DL central (DL-1) y el DF central (DF-1). Esto evita que MC centrales tengan 6 conexiones.

---

#### Renderizado SVG — reglas críticas

1. **DOM API obligatoria** — `svgElement.innerHTML = ...` no funciona en iOS Safari para SVG. Usar siempre `createElementNS` + `setAttribute` + `appendChild`.
2. **Sin filtro SVG** — `filter="url(#ch-glow)"` hace que las líneas sean invisibles en iOS Safari. No usar filtros en el SVG de química.
3. **Posición del SVG** — debe estar DENTRO de `.formation` con `z-index:-1`. Colocar como primer hijo de `.formation`. Así queda detrás de las cartas (que están a z-index normal dentro del stacking context de `.formation` que tiene `z-index:10`).
4. **Coordenadas enteras** — usar `Math.round()` en todas las coordenadas. Las subpíxeles hacen que líneas horizontales sean casi invisibles en iPhone.
5. **`shape-rendering:geometricPrecision`** — atributo en el `<svg>` para precisión de trazo en Safari.
6. **`overflow:visible`** — el SVG necesita esto para no recortar líneas que salgan del borde.

---

#### Indicador visual de química en mini carta ⚠️ pendiente test en campo

**Tratamiento elegido (B2) — pendiente de implementación:**
- Banda del nombre (entre `y=226` y `y=274`) → relleno sólido en color de química, opacidad 1.0
- Contorno exterior de la carta (SHAPE stroke) → color de química, `stroke-width="4"` `opacity="0.9"`
- Contorno interior (INNER stroke) → color de química, `stroke-width="1.5"` `opacity="0.75"`
- Texto del nombre y overall → siempre `#1a1000` (negro), independientemente del tier (incluidas IF)
- Sin química activa → diseño estándar sin cambios (colores de tier habituales)

**Colores:** naranja `#f59e0b` · verde `#22c55e`
**Test visual:** `https://la-pausa-mundial-2026.web.app/chem-test.html` → pestaña Naranja / Verde → tratamiento B2

⚠️ Validar visualmente en el campo real antes de implementar — el naranja sobre Oro Brillante/Mate requiere confirmación de que queda bien.

**Badges de química en slot** — posición `top:-6px; right:-6px` sobre el elemento `.slot`. Muestran `+25%` (naranja) y `+50%` (verde). Fondo coloreado, texto negro `#040d1f`, JetBrains Mono 9px. Solo se muestran cuando `m > 1`.

---

#### Cuándo se llama `renderChemistry()`

- `requestAnimationFrame(renderChemistry)` tras confirmar una carta en el picker
- `requestAnimationFrame(renderChemistry)` tras `loadState()` (restaurar desde localStorage)
- `requestAnimationFrame(renderChemistry)` tras `_applyFirestoreState` (restaurar desde Firestore)

---

### Pantalla JORNADA ✅

**Concepto:** vista en tiempo real de la jornada en curso — XI presentado + puntuaciones actualizándose + clasificación de liga.

**Layout:**
- Página scrolleable completa
- Topbar fija 56px (light design estándar)
- Campo con XI read-only (mismo SVG que draft, mismas posiciones de fila: DL 5% · MC 29% · DF 55% · PT 77%) — ocupa `calc(100dvh - 56px - 56px)` para que el campo llene la pantalla inicial
- Debajo: clasificación de la liga privada en esta jornada (scroll para ver)

**Burbuja de puntuación** — overlay sobre cada mini carta:
- Posición: `top:-8px; right:-8px` relativo al contenedor de la carta
- Tamaño: 22px diámetro, círculo
- Sin jugar: fondo gris `#888888` + `?` blanco
- Con puntuación: color según puntos **ya con multiplicador de química aplicado**

| Puntos (con tier) | Color |
|-------------------|-------|
| ≥ 10 | `#3b82f6` azul |
| 6 – 9 | `#22c55e` verde |
| 1 – 5 | `#f59e0b` naranja |
| 0 | `#888888` gris |
| negativo | `#ef4444` rojo |

**Datos:**
- XI del manager: `drafts/{uid}` en Firestore (la alineación guardada al inicio de jornada se congela — la última guardada antes del primer partido es la definitiva)
- Puntuaciones: `puntuaciones/{jornada}` — escuchado con `onSnapshot`, estructura detallada abajo
- Jornada activa: `config/jornada` → campo `actual: "J1"`
- Manager sin draft presentado: puntúa **0** (no aparece con -44)

**Clasificación liga:**
- Muestra todos los managers de la liga privada del usuario
- Puntos = suma de `pts_base × mult_quimica` de cada jugador del XI (tier eliminado)
- Ordenados por puntos desc · actualización en tiempo real vía `onSnapshot`
- Liga general (todos los managers del juego): misma lógica, una sola colección compartida de puntuaciones

**Estrategia de implementación (pendiente) ⚠️**

*Flujo de datos cliente:*
1. `getDoc(config/jornada)` → `data.actual` → jornada activa (e.g. `"J1"`)
2. `getDoc(drafts/{uid})` → `data.slotCards` (mapa `"T-DL-0"→carta`) + `data.formacion` → XI del manager
3. `onSnapshot(puntuaciones/{jornada})` → `data._detalle` con pts base por jugador · se actualiza automáticamente
4. Liga: `users/{uid}.ligaId` → `ligas/{ligaId}.managers[]` → para cada uid: `getDoc(drafts/{uid})`

*Matching de nombres Sofascore ↔ jugadores.js:*
- Normalizar antes de buscar: `toLowerCase() + normalize('NFD') + quitar diacríticos + trim()`
- Si no matchea: editar manualmente el doc Firestore `puntuaciones/{jornada}`

*Fórmula de puntos (client-side):*
```
pts_finales = pts_base × mult_quimica(slotCards, formacion)
```
La química se recalcula en cliente desde `slotCards` (contienen `club` y `seleccion`) + `CLUB_LIGA`.

*Estructura del documento `puntuaciones/{jornada}`:*
```
{
  "NombreJugador": pts_base,        ← flat map para lookup rápido
  "_meta": { updatedAt, status, jornada, matchCount, finishedCount },
  "_detalle": {
    "NombreJugador": { pts, rating, goals, assists, mins, pos, team }
  }
}
```

*Script de escritura:* `scripts/live-scoring.js` (1 partido, ya funciona) → **pendiente** `scripts/poller.js` (N partidos por jornada).
Config por jornada: `scripts/partidos/{jornada}.json` → array `[{ sofaId, home, away }, ...]`.
Usa `firebase-admin` + credenciales Admin SDK (ver sección Seguridad — Admin SDK). Acumula jugadores en memoria, restaura estado desde Firestore al reiniciar. Sale automáticamente cuando todos los partidos están finalizados.

---

### Pantalla INICIO (INDEX) — Estructura actual ✅

`public/app/index.html` — actualizado 2026-05-06

| Sección | Descripción |
|---------|-------------|
| **HERO** | Fondo negro (`#0a0a0a → #1a1a1a`). Cuenta atrás al 11 jun. CTAs: "CREAR MI EQUIPO" (`/app/draft/`) + "EXPLORAR JUGADORES" (`/app/analisis/?tab=moscas`) |
| **PRÓXIMOS PARTIDOS** | Carrusel horizontal, 6 cards. Escudos webp + fecha y hora en Madrid. Datos de `mundial2026.js` + `onSnapshot(resultados)`. Llama `renderMatches({})` inmediatamente + actualiza al llegar Firestore. Fondo blanco `#ffffff` sin imagen. |
| **NOVEDADES** | Carrusel horizontal de mini cartas (86×131px). Status badges circulares flotantes (top:-7px right:-6px, 24px, icon-only: 🔥⚠️🩹). Tap en carta → bottom sheet modal con carta más grande (110px) + badge + tag + nombre + título + resumen. Modal: cierre por backdrop, botón ✕ y swipe ↓. Sin enlace externo. 9 jugadores hardcoded (5 en duda, 4 lesionados). |
| **ALERTAS FANTASY** | Grid 2×3 con datos hardcoded: tendencia, bajas, más fichados, debut, top selección, cuenta atrás. |

**Background:** `#ffffff` puro — `fondo-index.webp` eliminado de INICIO y LIGA.
**Section labels** (PRÓXIMOS PARTIDOS, NOVEDADES, etc.): `color:#1a1000` (antes `rgba(26,16,0,0.4)`).

---

### Selecciones — Mundial 2026 ✅

48 selecciones · 26 jugadores por selección · **1.248 cartas en total** (listas definitivas: 30 mayo 2026)

La distribución de tiers por equipo no es fija — se determina por el overall calculado con la fórmula matemática. Ver sección de overalls.

---

### Sistema de Overalls ⚠️ fórmula en revisión

El overall de cada jugador determina su tier visual (Oro / Plata / Bronce) y es el número grande de la carta.

**Escala base**
- Rango: `45 a 91`
- Ninguna carta base supera `91`
- Las cartas IF crecen sobre esta base después

**Umbrales de tier ✅ CERRADO**

| Overall | Metal |
|---------|-------|
| 75 - 91 | 🥇 Oro |
| 65 - 74 | 🥈 Plata |
| 45 - 64 | 🥉 Bronce |

Subdivisión Brillante / Mate dentro de cada metal:

| Overall | Tier inicial |
|---------|-------------|
| 84 - 91 | Oro Brillante |
| 75 - 83 | Oro Mate |
| 70 - 74 | Plata Brillante |
| 65 - 69 | Plata Mate |
| 55 - 64 | Bronce Brillante |
| 45 - 54 | Bronce Mate |

**Overalls iniciales** — se asignan manualmente. Ver `OVERALLS_INICIALES_MUNDIAL_2026.md` como base de referencia.

**Gestión de overalls en producción — flujo obligatorio ✅**

`jugadores.js` es la **única fuente de verdad** para overalls y tiers. Firestore `/overrides/` solo se usa en runtime para `estado` (lesión/duda), nunca para overall/tier.

Cuando se edita un overall desde `/admin` (que escribe en Firestore `/overrides/`), hay que sincronizar esos valores de vuelta a `jugadores.js`:

1. Editar overalls en `/admin` → se guardan en Firestore `/overrides/{nombre}`
2. Correr: `node scripts/sync-overrides-to-jugadores.js` → actualiza `jugadores.js` con esos valores
3. Subir versión del script: `?v=8` → `?v=9` en todas las páginas que referencian `jugadores.js`
4. `firebase deploy --only hosting`

`applyOverrides(db)` en runtime **solo aplica `estado`** — no toca overall ni tier. Esto elimina el flash de overalls al cargar la página.

---

## CAPA 3 — IDENTIDAD VISUAL Y SISTEMA DE CARTAS

### Tema de la app — Black & White Design ✅
> Actualizado 2026-04-23. El light design anterior (fondo crema, topbar blanca) queda archivado en CAPA 6.

**Fondo de páginas**
- Color base: `#ffffff` en `html, body`
- Imagen de fondo (INICIO, LIGA, DRAFT/formacion): `/assets/img/fondo-index.png`
  - Técnica iOS-compatible: `<div class="bg-layer">` con `position:fixed` fuera de `.app`
  - CSS: `background:#ffffff url('/assets/img/fondo-index.png') center top / contain no-repeat`
  - Resto de páginas (analisis, jornada, draft campo): solo `background:#ffffff`, sin imagen

**Cards / recuadros**
- Fondo: `rgba(255,255,255,0.93)` — semitransparente sobre imagen de fondo
- Borde: `1px solid rgba(0,0,0,0.12)`
- Radios: `14px` pequeños · `18px` grandes

**Topbar estándar ✅**
- `position:fixed; top:0; left:50%; transform:translateX(-50%); width:100%; max-width:430px`
- `height:56px` · `background:#ffffff url('/assets/img/topbar.png') center/100% 100% no-repeat`
- `z-index:100`
- La imagen `topbar.png` ya lleva fondo negro y diseño visual completo (Estatua Libertad, hoja canadiense, emblema mexicano izq; logo circular + "LA PAUSA" centro; dos hombres der)
- `.topbar-logo` y `.topbar-center`: `display:none` — el diseño va en la imagen
- Avatar der: `position:absolute; right:28px; top:50%; transform:translateY(-50%)` — `32px`, fondo sólido `#c8a84b`, borde `1.5px solid #f0cc60`, texto `color:#000000`, `opacity:0` → fade-in tras auth
- Dropdown `.umenu`: fondo `#ffffff`, texto `#1a1000`, separadores `rgba(0,0,0,0.06)`
- Ítems dropdown: `📖 Reglamento` → `/app/reglamento/` · `→ Cerrar sesión` en `#ef4444`
- Todas las páginas necesitan `padding-top:56px` en `.app` para compensar el fixed
- ⚠️ NO tocar el CSS del topbar ni reemplazar `topbar.png` sin instrucción explícita del autor

**Bottom nav estándar ✅** (`public/shared/nav.js`)
- `position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:430px`
- `height:76px` · `background:#0a0a0a` · `border-radius:28px 28px 0 0`
- `padding-bottom:env(safe-area-inset-bottom)`
- Ítems: SVG icons 20×20px (stroke currentColor 1.8) + label 7px Barlow Condensed uppercase
- Color inactivo: `#ffffff` · Activo: `#ffcc00`
- 5 pestañas: INICIO (casa) · LIGA (personas) · DRAFT (cuadros) · ANÁLISIS (lupa) · JORNADA (reloj)
- Páginas con `nav.js` (automático): **todas** — index, liga/index, draft/index, draft/formacion, analisis, jornada, reglamento, moscas, equipos, equipo, calendario

**App container**
- `.app`: `background:transparent` · `height:100dvh` · `overflow-y:auto` · `padding-top:56px`
- En draft campo: `overflow:hidden` (layout fijo)

**Textos en tema claro**
- Principal: `#1a1000` · Secundario: `rgba(26,16,0,0.4)` · Muy tenue: `rgba(26,16,0,0.25)`
- Dorado activo: `#c8a84b` · Peligro: `#ef4444`

**Splash de entrada ✅**
- Video MP4: `public/assets/logo/splash-entrada.mp4`
- `#splash`: `position:fixed; inset:0; z-index:9999; background:#000`
- `<video>` con `autoplay muted playsinline preload="auto"` + `video.muted = true` via JS
- iOS fallback: si `play()` rechaza, se muestra overlay "TOCA PARA CONTINUAR" al fondo del splash; al tocar, se llama `play()` y se elimina el overlay
- Ocultación: `splashDone` Promise resolves en `video.ended` (o fallback `setTimeout(8000)`) → `#splash.classList.add('hide')` → fade 0.6s → `s.remove()`
- Controles webkit ocultos: `video::-webkit-media-controls{display:none!important}`

**Login ✅ (acceso por código)**
- Fondo: `#000` puro · Logo: `/assets/img/divieto-completo.webp` · Card: `rgba(255,255,255,0.05)` borde `rgba(255,255,255,0.1)` · dark design
- Input de 6 dígitos numéricos (Bebas Neue 2rem, letter-spacing 8px)
- Splash de entrada: `splash-divieto.mp4` (10s max, fade out al terminar)
- Flujo: introduce código → valida en `codigos/{codigo}` → `signInAnonymously` → marca código como usado → redirect a `/app/setup/`
- Si ya hay sesión activa con nombre → redirect a `/app/` · Si sesión sin nombre → redirect a `/app/setup/`

---

### Paleta general
```
--night:#040d1f   --deep:#060f26    --blue:#0b1e3e
--gold:#c8a84b    --gold2:#f0cc60   --white:#f0ede6
--green:#22c55e   --red:#ef4444     --orange:#f59e0b
--cream:#f5f0e8   (fondo base app)
```

### Tipografía
- **Bebas Neue** — overall, posición, stats y labels
- **Barlow Condensed** weight 400 — nombre del jugador (carta mini y carta grande) · SVG: `font-family="'Barlow Condensed', sans-serif" font-weight="400" letter-spacing="-1"` · Google Fonts: `Barlow+Condensed:wght@400`
- **JetBrains Mono** — labels, etiquetas, datos pequeños
- **Love Ya Like A Sister** — solo el logo "La Pausa."
- Nombre del jugador en carta: `#fff8c0` (IF) · `#1a1000` (no-IF)
- **Nunca `#ffffff` puro** en nombres de jugadores

### SVG paths del blasón — NO CAMBIAR
```
SHAPE (exterior):
M 0,20 L 20,0 C 80,-12 180,-12 240,0 L 260,20 L 260,308 C 252,330 188,346 130,370 C 72,346 8,330 0,308 Z

INNER (borde interior):
M 5,22 L 23,4 C 82,-8 178,-8 237,4 L 255,22 L 255,306 C 247,327 186,342 130,364 C 74,342 13,327 5,306 Z

ViewBox: 0 -22 260 417  |  Rendered: width=260 height=395
```

### Sistema de cartas — 9 Tiers

**Regla general**
- IF (fondo negro): texto y líneas en el COLOR DEL METAL (dorado / gris / cobre)
- Mate y Brillante (fondo claro): texto y líneas en negro `#1a1000`
- Borde exterior: color del metal en IF / negro en no-IF
- Borde interior: misma regla, opacidad 0.2–0.3

**Colores exactos por tier**

| Tier | Gradiente principal | Border/acento | Texto |
|------|--------------------|--------------:|-------|
| **Oro IF** | `#030200 → #0c0800 → #060400` | `#f0c830` | `#fff8c0` |
| **Oro Brillante** | `#c88000 → #fffac0 → #a86800` | `#000000` | `#1a1000` |
| **Oro Mate** | `#7a5000 → #d4a820 → #7a5000` | `#000000` | `#1a1000` |
| **Plata IF** | `#050505 → #0e0e0e → #080808` | `#c8c8c8` | `#c8c8c8` |
| **Plata Brillante** | `#686868 → #f0f0f0 → #606060` | `#000000` | `#1a1000` |
| **Plata Mate** | `#505050 → #989898 → #484848` | `#000000` | `#1a1000` |
| **Bronce IF** | `#030100 → #080400 → #040200` | `#d08040` | `#ffe8c0` |
| **Bronce Brillante** | `#903010 → #ffc888 → #7c2c08` | `#000000` | `#1a1000` |
| **Bronce Mate** | `#5a2800 → #c06828 → #5a2800` | `#000000` | `#1a1000` |

**Shimmer Brillantes** — gradiente diagonal, no tocar:
```
x1="0" y1="0" x2="1" y2="1"
stops: 0% transparent → 38% 0.03 → 50% 0.26 → 60% 0.05 → 100% transparent
```

### Estructura de la carta grande ✅

> Fuente de verdad: `public/card-test.html`. `CARTA_TIERS_9.html` es referencia histórica — en caso de conflicto prevalece card-test.

**ViewBox: `0 -22 260 417` | Rendered: `260×395px`**

**Overlays HTML** (position:absolute sobre el SVG, dentro de un div position:relative):
```
Foto jugador:   left:31.5%; top:5.8%; width:60%; height:42%; object-fit:cover; object-position:top center
Escudo sel.:    left:8%; top:26%; width:45px; height:45px; object-fit:contain
                → <img src="/assets/img/escudos/selecciones/{archivo}">
                → Fallback emoji getFlag() si no hay archivo
Logos liga+club: bottom:12%; left:0; right:0; display:flex; justify-content:center; gap:4px
                → height:30px cada logo
```

**SVG elementos zona foto (y=-22 a y=178):**
```
Overall:   x=16, y=56, font-size=52, Bebas Neue, fill=t.border
           Sombra: mismo elemento con opacity=0.35, dx=2, dy=2
Posición:  x=22, y=80, font-size=26, letter-spacing=2, Bebas Neue, fill=t.border
           Sombra: mismo elemento con opacity=0.35, dx=2, dy=2
```

**Franja nombre:**
```
y=178   LÍNEA SUPERIOR — x1=5 x2=255, stroke=t.border, stroke-width=1, opacity=0.9
y=216   LÍNEA INFERIOR — x1=5 x2=255
Nombre: x=130, y=197, dominant-baseline="central", font-size=30
        Barlow Condensed 400, letter-spacing="-1", fill=t.texto
        ⚠️ NO usar textLength — deforma nombres. Barlow Condensed cabe sin ajuste.
```

**Zona stats (dentro de clipPath):**
```
FILA (y=251 valor / y=263 label):
  Col1 x=44:   PUNTOS   — font-size=24 Bebas Neue
  Col2 x=130:  MEDIA    — font-size=24 Bebas Neue
  Col3 x=210:  RIVAL    — emoji bandera font-size=28, y=254
  Labels: JetBrains Mono font-size=7.5, opacity=0.5

RACHA (5 píldoras):
  Rects: x=30,71,112,153,194 · y=274 · width=36 height=22 rx=3
  Texto: x=48,89,130,171,212 · y=289 · Bebas Neue font-size=13 fill=white
  Colores: ≥10→#3b82f6 · 6-9→#22c55e · 1-5→#f59e0b · 0→#888 · neg→#ef4444
```

**Imágenes de escudos — carpetas en public:**
```
/assets/img/escudos/           → 495 escudos de clubes (PNG)
/assets/img/escudos/ligas/     → 80 logos de ligas (PNG)
/assets/img/escudos/selecciones/ → 38 escudos de selecciones WC2026 (PNG)
```

**ESCUDOS_SEL — mapa seleccion→archivo** (definido en card-test.html y a replicar en cada página):
```
ALEMANIA→germany · ARABIA SAUDI→saudi-arabia · ARGELIA→algeria · ARGENTINA→argentina
AUSTRALIA→australia · AUSTRIA→austria · BELGICA→belgium · BRASIL→brazil
CABO VERDE→cabo-verde · CANADA→canada · COLOMBIA→colombia · COREA DEL SUR→south-korea
COSTA DE MARFIL→cote-d-ivoire · CROACIA→croatia · CURAZAO→curacao · ECUADOR→ecuador
EGIPTO→egypt · ESCOCIA→scotland · ESPAÑA→spain · ESTADOS UNIDOS→usa · FRANCIA→france
GHANA→ghana · HAITI→haiti · INGLATERRA→england · IRAN→iran · JAPON→japan
JORDANIA→jordan · NORUEGA→norway · NUEVA ZELANDA→new-zealand · PAISES BAJOS→netherlands-dutch
PARAGUAY→paraguay · PORTUGAL→portugal · QATAR→qatar · SENEGAL→senegal · SUIZA→swiss
TUNEZ→tunisia · URUGUAY→uruguay · UZBEKISTAN→uzbekistan
(sufijo común: -national-team-footballlogos-org.png, excepciones: australia/haiti→-footylogos.png,
cabo-verde/ghana/jordan→-footballlogos-org.png sin "national-team")
```

y=370   PUNTA DEL BLASÓN

**Carta Mini** — `width="65" height="99"` · `viewBox="0 -22 260 417"`
```
  Overall:    x=16, y=78, font-size=78 (sombra dx=2 dy=2 opacity=0.4)
  Posición:   x=22, y=115, font-size=42, Bebas Neue, letter-spacing=2 (sombra dx=2 dy=2 opacity=0.4)
  Bandera:    x=12, y=171, font-size=72 (emoji via getFlag(seleccion))
  Bordes:     exterior stroke-width=4 opacity=0.65 · interior stroke-width=1.5 opacity=0.65
  Líneas:     y=226 y y=274 · x1=5 x2=255 · stroke-width=4 opacity=0.65
  Nombre:     x=130, y=248, dominant-baseline="central", Barlow Condensed 400, font-size=38
              letter-spacing="-1" · via formatNombre()
              Nombres >16 chars: textLength="230" lengthAdjust="spacingAndGlyphs"
```
**Foto en carta mini** — `<img>` HTML overlay:
```
left:38%; top:10.5%; width:51%; height:49%; object-fit:cover; object-position:top center
```
Nota: la foto se desplaza hacia la derecha del blasón (zona overall+bandera). Borde izquierdo a 38% para evitar corte de cabeza/orejas.

> ⚠️ MEDIDAS ANTERIORES — POSIBLE VUELTA ATRÁS — DECISIÓN PENDIENTE
> ```
> Bandera:    y=183
> Bordes:     exterior stroke-width=5 opacity=0.85 · interior stroke-width=2 opacity=0.22
> Líneas:     y=260 y y=308
> Nombre:     y=284
> Foto:       top:18.5%
> Posición:   sin sombra (un solo elemento text)
> ```

**Badge de lesión en carta mini** — SVG superpuesto, zona inferior (debajo de línea del nombre):
```
Cuadrado rojo:   <rect x="107" y="293" width="46" height="46" rx="3" fill="#ef4444" stroke="#000000" stroke-width="1.5"/>
Cruz vertical:   <rect x="124" y="301" width="12" height="30" fill="#ffffff"/>
Cruz horizontal: <rect x="115" y="310" width="30" height="12" fill="#ffffff"/>
```
Solo se muestra cuando el jugador tiene estado `'lesion'`. Los estados `'duda'` y `'sancion'` tienen badge pendiente de diseño.

**Trasera (flip) `cardBackSVG`** — carta reverso en picker draft:
```
Header:  Nombre·Overall centrado (x=130, y=17, Bebas Neue font-size=24, letter-spacing=2)
Sep:     y=30

7 filas verticales (y=58,96,134,172,210,248,286 · spacing=38px):
  Label izq: x=20, JetBrains Mono font-size=12, opacity=0.6
  Valor der: x=240, text-anchor=end, Bebas Neue font-size=22
  Sep:       y+15, stroke=textColor, opacity=0.15

Estadísticas (no PT):  PARTIDOS / GOLES / ASISTENCIAS / T.AMARILLAS / T.ROJAS / INTERNAC. / GOLES SEL.
Estadísticas (PT):     PARTIDOS / G. RECIBIDOS / PORT. A CERO / T.AMARILLAS / T.ROJAS / INTERNAC. / GOLES SEL.

Color texto: #1a1000 para tiers no-IF · t.texto para tiers IF (tier.includes('if'))
Gradiente:  url(#cb{uid}) — mismos colores de tier que el anverso
```

### Flip CSS — dos técnicas según contexto

**Modales y páginas de carta grande** (analisis, moscas, equipo): usar **3D transform** (`perspective`, `preserve-3d`, `rotateY`) — funciona porque no hay `overflow:hidden` en ancestros problemáticos.
```css
.modal-card { perspective: 1200px; cursor: pointer; }
.modal-card-inner { transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.4,0.2,0.2,1); }
.modal-card-inner.flipped { transform: rotateY(180deg); }
.modal-face { position:absolute; top:0; left:0; width:100%; height:100%; backface-visibility: hidden; }
.modal-face-back { transform: rotateY(180deg); }
```
Click en carta → `flipper.classList.toggle('flipped')`

### Flip CSS — scaleX (no usar 3D transforms en picker)

> ⚠️ Los CSS 3D transforms (`preserve-3d`, `backface-visibility`, `rotateY`) dan problemas en iOS Safari cuando hay `overflow:hidden` en ancestros y transforms de escala en el mismo elemento. En el picker del draft se usa **scaleX** como técnica de flip — más fiable en todos los browsers.

```css
.card-flipper { width:100%; height:100%; position:relative; }
.card-face { position:absolute; top:0; left:0; width:100%; height:100%; }
@keyframes flipOut { from{transform:scaleX(1);} to{transform:scaleX(0);} }
@keyframes flipIn  { from{transform:scaleX(0);} to{transform:scaleX(1);} }
.card-flipper.flipping-out { animation:flipOut 0.18s ease-in forwards; }
.card-flipper.flipping-in  { animation:flipIn  0.18s ease-out forwards; }
```

```js
// Cara trasera empieza oculta: back.style.display = 'none'; flipper.dataset.side = 'front'
// Al tap en carta activa del carrusel:
function flipCarouselCard(item) {
  const flipper = item.querySelector('.card-flipper');
  if (flipper.classList.contains('flipping-out') || flipper.classList.contains('flipping-in')) return;
  const showingFront = flipper.dataset.side !== 'back';
  flipper.classList.add('flipping-out');
  flipper.addEventListener('animationend', function step1() {
    flipper.removeEventListener('animationend', step1);
    flipper.classList.remove('flipping-out');
    // swap caras visibles
    flipper.classList.add('flipping-in');
    flipper.addEventListener('animationend', function step2() {
      flipper.removeEventListener('animationend', step2);
      flipper.classList.remove('flipping-in');
    });
  });
}
// Touch en carrusel: manejado en touchend (no click) para evitar problemas con SVG en iOS
// Flag _touchHandled para evitar doble disparo touchend + click en desktop
```

### Reglas de código (obligatorias)

**Antes de tocar cualquier archivo:**
1. Leer el archivo completo — nunca asumir
2. Verificar el fragmento exacto antes de hacer replace
3. No cambiar SVG paths del blasón
4. No reinventar colores — solo los de la tabla de tiers

**Rendimiento:**
- Máximo 100KB por archivo HTML
- No incrustar imágenes base64 más de una vez — usar `<symbol>` o referencia compartida

**Mobile-first:**
- Todo funciona en iPhone (375px) y iPad (768px)
- Flip con `touchend` siempre + `click` para web
- Todos los prefijos `-webkit-` en transforms y transitions

**Estructura de nuevas pantallas (black & white design):**
- Fondo: `html,body{background:#ffffff}` · `.app{background:transparent}`
- Si la página lleva imagen de fondo: `<div class="bg-layer">` con `position:fixed` antes de `.app`
  - CSS bg-layer: `background:#ffffff url('/assets/img/fondo-index.png') center top / contain no-repeat`
- Topbar: `position:fixed` 56px, negra con topbar.png — ver sección "Tema de la app"
- `.app`: `height:100dvh; overflow-y:auto; padding-top:56px`
- Bottom nav: `position:fixed` 56px, negra, SVG icons blancos — ver sección "Tema de la app"
- Scroll area con `-webkit-overflow-scrolling:touch`
- `padding-bottom:env(safe-area-inset-bottom)` en bottom nav

**Topbar estándar (todas las páginas) ✅**
- `position:fixed` · `height:56px` · `background:#000000 url('/assets/img/topbar.png') center/100% 100% no-repeat`
- `.topbar-logo` y `.topbar-center` con `display:none` — la imagen topbar.png lleva el diseño
- Avatar: `position:absolute; right:28px; top:50%; transform:translateY(-50%)` · `opacity:0` en HTML, fade-in tras auth
- Menú dropdown: 📖 Reglamento · → Cerrar sesión (en rojo)
- Módulo Firebase en `<script type="module">`: importa `auth, db, onAuthStateChanged, signOut, doc, getDoc`

---

## CAPA 4 — ESTADO ACTUAL DEL DESARROLLO

### Stack técnico
- **Frontend:** HTML/CSS/JS puro, sin framework — app solo móvil
- **Carta mini en campo:** `width="65" height="99"` · `viewBox="0 -22 260 417"`
- **Foto en cartas — sistema actual:** `<img>` HTML con `position:absolute` sobre el SVG, dentro de un `<div style="position:relative">` que envuelve el SVG. **NUNCA usar SVG `<image>` — no funciona en este contexto (Chrome iOS lo bloquea).**
- **Foto carta grande (picker):** `left:31.5%; top:5.8%; width:60%; height:42%; object-fit:cover; object-position:top center`
- **Foto carta mini (campo):** generada en `miniCardSVG` · `photoH = 0.605 * ch` (contenedor top:0, altura 60.5% de ch, foto bottom:0 dentro) · `imgSz = 97*s` · offset derecho `photoR = 9*s`. Anterior photoH: 0.615.
- **Archivos de foto:** Mezcla de dos formatos: `{sofaId}-t.webp` (WebP con alpha, generados con `remove-bg.js`) y `{Nombre_Apellido}.png` (PNG de calidad para jugadores Premier League y añadidos manualmente). Ambos en `public/assets/img/players/`.
- **`FOTOS_JUGADORES`** en `public/js/fotos.js` — mapa `nombre → ruta`. Locales usan `_L = '/assets/img/players/'`, las antiguas de liga usan `_B` (GitHub raw). 1200+ jugadores cubiertos. Los PNG nuevos (SoFIFA con fondo transparente) usan `{Nombre_Apellido}.PNG` — no aplicar filtros, ya tienen alpha correcto. Alias con acento añadidos junto al nombre sin acento (ej: `'Josué Duverger'` y `'Josue Duverger'` apuntan al mismo PNG).
- **Chrome iOS y caché:** puede mostrar fondo blanco por caché antigua — el usuario debe refrescar o usar incógnito. En producción se resuelve solo.
- **Líneas nombre carta mini:** `y=226` y `y=274` · texto `y=248 dominant-baseline="central"` ⚠️ POSIBLE VUELTA ATRÁS (anterior: `y=260` / `y=308` / texto `y=284`)
- **`getFlag(sel)`** — convierte nombre de selección en emoji bandera · Regional Indicators para 46 selecciones · surrogate pairs para Escocia e Inglaterra · MAP cubre las 48 selecciones del archivo
- **`formatNombre(nombre)`** — muestra solo apellido; conserva prefijos `DE/VAN/DEL/DA/DOS/DI/EL/AL...`; jugadores de 1 palabra se muestran tal cual (RODRI, VINICIUS...)
- **Encoding special chars** — usar HTML entities (`&Aacute;`, `&Oacute;`) en HTML y unicode escapes (`\u00d1`, `\u00e1`) en JS/jugadores.js — nunca confiar en charset del servidor
- **Multiplicadores de puntuación:** solo química — `TIER_MULT` y `aplicarMultiplicador()` **eliminados** (2026-04-27). Ver fórmula en sección Química.
- **Análisis — vista lista:** lista de jugadores ordenada por overall con overall pill, nombre, selección·club, tag de posición. Click en fila → modal carta grande
- **Análisis — vista cartas:** toggle "CARTAS" (dorado, barra encima del listado) → grid 4 columnas de mini cartas escaladas al ancho de pantalla. Click en carta → modal carta grande
- **Análisis — modal:** overlay `rgba(0,0,0,0.88)` con carta grande 260×395px + club y selección debajo. Toca fuera para cerrar. **Flip 3D** al pulsar la carta (`.modal-card-inner.flipped`).
- **Análisis — input búsqueda:** `font-size: 16px` — obligatorio para evitar auto-zoom de iOS Safari (cualquier input < 16px hace zoom al enfocar)
- **Análisis — fotos:** carga `FOTOS_JUGADORES` desde `/js/fotos.js`, mismas funciones `getFlag`/`formatNombre`/`TIER_CFG` que el draft
- **PALCO — sistema de mini cartas:** carrusel igual que MOSCAS (2 cartas a la vez, fade 250ms, intervalo 2500ms). Estructura: `#palco-body → #palco-pair`. Función `_palcoMini(p, i)` genera mini carta con badge de lesión superpuesto. Click en carta → `#palco-overlay` con carta grande `_palcoCard(p)`. Click fuera → cierra overlay. En producción los datos vendrán de Firestore `enfermeria`.
- **PALCO — badge de lesión (cruz roja):** SVG superpuesto en la zona inferior de la carta mini, debajo de la línea del nombre.
  ```
  Cuadrado: <rect x="107" y="293" width="46" height="46" rx="3" fill="#ef4444" stroke="#000000" stroke-width="1.5"/>
  Cruz vertical:   <rect x="124" y="301" width="12" height="30" fill="#ffffff"/>
  Cruz horizontal: <rect x="115" y="310" width="30" height="12" fill="#ffffff"/>
  ```
  Se activa cuando el jugador tiene estado `'lesion'` — los estados `'duda'` y `'sancion'` tienen diseño pendiente de definir.
- **PALCO (Firestore `enfermeria`)** — colección para jugadores fuera de forma. Cada doc: `{ nombre, overall, tier, pos, seleccion, foto, estado }`. `estado` acepta: `'lesion'` / `'duda'` / `'sancion'`. Añadir manualmente desde consola Firestore. En producción se escuchará con `onSnapshot` en home.
- **Auth + DB:** Firebase Auth + Firestore · Proyecto: `la-pausa-mundial-2026` · **Plan: Blaze** · URL: https://la-pausa-mundial-2026.web.app/app/
- **Auth actual: Firebase Anonymous Auth** — sin email ni contraseña. Acceso por código de 6 dígitos numéricos. Ver sección "Sistema de usuarios" debajo.
- Firestore rules desplegadas: `drafts/{uid}` bloqueados server-side cuando `request.time >= deadline`
- Config: `public/js/config.js`
- Nav compartido: `public/shared/nav.js` — inyectado en **todas** las páginas de la app. SVG icons, `background:#ffffff`, misma altura 56px que topbar. Activo detectado automáticamente por `pathname`. Antes index, liga y draft tenían nav inline — unificados en 2026-04-20.
- Layout: `max-width: 430px` centrado, full width móvil
- **Splash screen:** video MP4 a pantalla completa (`splash-entrada.mp4`) con `object-fit:cover`. Fondo `#000`. Se descarta al terminar el video (`video.ended` event) con fallback `setTimeout(8000)`. Si `play()` falla (iOS incognito), muestra overlay "TOCA PARA CONTINUAR" y reproduce al primer tap.
- **Login:** fondo `#ffffff` puro. Logo: dos PNG (`logo-icono.png` círculo + `logo-titulo.png` texto). Card `rgba(255,255,255,0.93)`. Post-login redirige a `./app/`.
- **Huecos vacíos draft:** blasón silueta (fill `rgba(255,255,255,0.62)`, stroke dorado `#c8a84b`, borde interior `rgba(200,168,75,0.4)`) + imagen logo `.slot-logo` centrada encima. CSS: `position:absolute; left:50%; top:48%; transform:translate(-50%,-50%); width:110%; height:auto; pointer-events:none`. Imagen: `/assets/logo/logo-completo.png`.
- Campo Draft: franjas verdes alternadas, líneas blancas, viñeta oscura. Layout sin scroll: `.field-wrap` height `calc(100dvh - 56px - 73px - 56px)` · botón GUARDAR `position:fixed;bottom:56px` encima del nav
- Filas del campo (posición % sobre `.field-wrap`): DL `5%` · MC `29%` · DF `55%` · PT `77%`
- Huecos vacíos: blasón LA PAUSA silueta con pulse dorado
- **Overall badge (draft):** posicionado en el hueco entre el área inferior y la línea de banda derecha. SVG viewBox `0 0 390 580` → área inferior `x=89,y=482,w=212,h=88` → hueco derecho `x=301–375, y=482–570`. CSS: `right:3.85%; bottom:1.72%; width:18.97%; height:15.17%` (porcentajes sobre `.field-wrap`). Fondo `rgba(255,255,255,0.92)`.
- **Reset button (draft):** hueco simétrico izquierdo `x=15–89, y=482–570`. CSS: `left:3.85%; bottom:1.72%; width:18.97%; height:15.17%`.
- **GUARDAR button:** siempre habilitado · solo `disabled` cuando overall total > 900 · texto estado muestra `X/11 titulares` o aviso de límite

### Archivos activos

| Archivo | Descripción | Estado |
|---------|-------------|--------|
| `public/index.html` | Login por **código de 6 dígitos** (dark design, fondo #000) · splash `splash-divieto.mp4` · `signInAnonymously` → setup o home · si sesión activa con nombre → `/app/` directo | ✅ |
| `public/app/setup/index.html` | Onboarding en **3 pasos**: (1) elegir nombre de usuario, (2) tipo de liga (solo general o general + privada), (3) crear liga privada (genera código `LIGA_XXXXXX`) o unirse con código. Guarda perfil en `users/{uid}` y añade a `ligas/mundial-2026-general`. Redirige a `/app/` al terminar. | ✅ |
| `public/js/auth.js` | Módulo de guard compartido: `requireAuth()` → redirige a `/` si no hay sesión, a `/app/setup/` si falta nombre · `getUser()` resuelve la promesa con el user actual | ✅ |
| `public/assets/img/topbar.png` | Imagen del topbar negro (diseño con Estatua Libertad, hoja canadiense, emblema mexicano, círculo dorado) | ✅ |
| `public/assets/img/fondo-index.png` | Fondo decorativo con líneas curvas de colores (rojo/azul/verde — Canadá/USA/México) — fondo blanco, usado en INICIO, LIGA, DRAFT/formacion | ✅ |
| `public/assets/logo/splash-entrada.mp4` | Video de entrada animado (pantalla negra con animación de marca) | ✅ |
| `public/assets/logo/logo-completo.png` | Logo completo (icono pausa dorado + "LA PAUSA") con fondo oscuro — usado en login y huecos vacíos del draft | ✅ |
| `public/assets/logo/logo-icono.png` | Círculo pincelada dorada/verde — reservado, no usado actualmente | ✅ |
| `public/assets/logo/logo-titulo.png` | Texto "LA PAUSA" en negro — reservado, no usado actualmente | ✅ |
| `public/app/draft/index.html` | Campo + XI + picker + carta mini + flip anverso/reverso (scaleX). Toggle QUÍM A/B eliminado — Opción A hardcodeada. Draft consciente de jornada: se resetea automáticamente al cambiar `config/jornada.actual`, se cierra solo al llegar `config/jornada.deadline`. | ✅ |
| `public/app/draft/formacion/index.html` | Elección de formación (3 opciones) | ✅ |
| `public/app/index.html` | Home: HERO negro + PRÓXIMOS PARTIDOS carrusel + NOVEDADES carrusel mini cartas con badges y bottom sheet modal + ALERTAS FANTASY grid. Fondo `#ffffff` sin imagen. | ✅ |
| `public/app/equipos/index.html` | Sub-página: 12 grupos con equipos · click en equipo → `/app/equipo/?sel=` · light design · nav.js | ✅ |
| `public/app/calendario/index.html` | Calendario del Mundial · tab PARTIDOS primero, GRUPOS segundo | ✅ |
| `public/shared/nav.js` | Nav compartido | ✅ |
| `public/app/liga/onboarding.html` | Crear / unirse a liga | ✅ |
| `public/app/liga/config.html` | Gestión de liga | ✅ |
| `public/app/jornada/index.html` | Campo read-only · burbujas de puntuación · clasificación liga · topbar estándar con avatar | ✅ |
| `public/app/liga/index.html` | Dos pestañas: **LIGA PRIVADA** (clasificación de la liga del usuario, nombre editable inline) y **LIGA GENERAL** (todos los managers). Hero con stats. Sticky bar con posición y puntos del usuario. `onSnapshot` en tiempo real. Si el usuario no tiene liga privada → muestra "Sin liga privada" con botón a setup. | ✅ |
| `public/app/moscas/index.html` | Test visual cartas IF · grid 2 columnas · flip 3D · back button topbar · banner "prueba" · light design · nav.js | ✅ |
| `public/app/analisis/index.html` | Hub de análisis · pestañas GRUPOS (clasificaciones en tiempo real, click en equipo → `/app/seleccion/?s=`) y **JUGADORES** (antes MOSCAS — `data-view="moscas"` invariante, label UI cambió). Deep-link: `?tab=moscas`. Banderas via `flagcdn.com` con `SELECCIONES_DATA[sel].iso`. Modal flip 3D. Topbar estándar con avatar. | ✅ |
| `public/app/equipo/index.html` | Plantilla de selección · grid mini cartas + modal carousel con flechas y swipe · filtro por posición · light design · nav.js | ✅ |
| `public/app/reglamento/index.html` | Reglamento completo · topbar estándar con avatar | ✅ |
| `public/js/rival.js` | `getNextRivalFlag(seleccion)` (emoji) + `getNextRivalIso(seleccion)` (ISO code para flagcdn) — próximo rival de cada selección usando PARTIDOS. `CODE_ISO` map 48 entradas. | ✅ |
| `public/CARTA_MINI_9.html` | Carta mini 9 tiers, diseño validado | ✅ |
| `public/CARTA_TIERS_9.html` | Carta grande 9 tiers, diseño validado | ✅ |
| `public/js/fotos.js` | Mapa nombre→ruta foto · 1200+ jugadores · `_L` local + `_B` GitHub · referenciado con `?v=28` en páginas de producción · bumpeado con `scripts/bump.cjs fotos` | ✅ |
| `public/js/cartas.js` | Funciones unificadas de renderizado de cartas: `cardSVG`, `cardBackSVG`, `miniCardSVG`, `getFlag`, `formatNombre`, `_NOM_OVR`, `TIER_CFG`, `ESCUDOS_SEL`, `ESCUDOS_STYLE` · único punto de verdad para todas las páginas · bumpeado con `scripts/bump.cjs cartas` · v=34. Rival en carta grande usa `getNextRivalIso()` + `flagcdn.com/w40/{iso}.png` (no emoji). | ✅ |
| `public/js/jugadores.js` | Plantillas de las 48 selecciones · overalls/tiers sincronizados desde Firestore via `sync-overrides-to-jugadores.js` · bumpeado manualmente al hacer deploy tras sync | ✅ |
| `scripts/sync-overrides-to-jugadores.js` | Sincroniza overalls y tiers desde Firestore `/overrides/` → `jugadores.js`. Correr con `node scripts/sync-overrides-to-jugadores.js` tras editar overalls en `/admin`. Requiere service account en `C:/Users/Jepii/.secrets/la-pausa-mundial-serviceAccount.json` | ✅ |
| `scripts/cleanup-users.js` | Gestión de usuarios del sistema. `--list` muestra todos los usuarios (Auth + Firestore) y códigos activos. `--keep <uid>` elimina todos los usuarios de Auth y Firestore excepto el uid indicado, y resetea sus códigos a `uid:null`. `--reset-all` limpia todo (usuarios, códigos, ligas privadas, liga general). | ✅ |
| `scripts/cleanup-ligas.js` | Limpieza puntual de ligas: filtra `managers[]` de `mundial-2026-general` dejando solo un uid válido, y borra ligas privadas huérfanas (sin managers válidos). | ✅ |
| `public/js/overrides-merge.js` | `applyOverrides(db)` — aplica **solo `estado`** (lesión/duda) desde Firestore `/overrides/` en runtime. No toca overall ni tier. Llamado en todas las páginas antes de renderizar. | ✅ |
| `public/js/grupos.js` | Global `GRUPOS_DATA`: 48 equipos, 72 partidos (IDs 1-72), `codeToS` (3 letras FIFA → `s` key uppercase), `baseEsc`, helpers `getGrupo` / `getGrupoDePartido` | ✅ |
| `public/js/selecciones-data.js` | Global `SELECCIONES_DATA`: datos por `s` key (iso, fifa, mundiales, mejor, titulos[], stats{pj/pg/pe/pp/gf/gc}, historia, clasificacion) · 47 selecciones cubiertas | ✅ |
| `public/js/selecciones2026.js` | Global `SEL26`: 48 equipos con historial mundialista (PJ/PG/PE/PP/GF/GC/DG, rankingHistorico, puntosHistoricos, campeonatos, subcampeonatos) · `MUNDIAL_YEARS` (7 campeones con años) · `S_TO_ID` (s key → id lowercase-hyphen) · `SEL26.byS(s)` devuelve equipo con `mundialYears` adjunto · `SEL26.escudoUrl(id)` | ✅ |
| `public/js/titulos2026.js` | Global `TITULOS2026`: 48 selecciones con desglose de títulos oficiales (mundial, confederaciones, continentalSinNationsLeague, jjooAbsolutos, otros, totalAjustado) · `TITULOS2026.byId(id)` | ✅ |
| `public/app/seleccion/index.html` | Perfil de selección · cabecera (bandera + nombre + grupo, **sin escudo**) · pestañas INFO / PLANTILLA · INFO: partidos carrusel, PALMARÉS (Copa Mundo con años + títulos continentales, **sin "Otros títulos"**), HISTORIAL MUNDIALISTA (label "Participaciones en Mundiales", "Ranking histórico en Mundiales", badges, stats, tabla PJ/PG/PE/PP/GF/GC/DG), ligas representadas, historia · PLANTILLA: mini cartas por posición | ✅ |
| `public/js/sofa-ids.js` | Mapa nombre→sofaId para todos los jugadores encontrados | ✅ |
| `public/assets/img/players/` | Fotos WebP con alpha `{sofaId}-t.webp` (~940) + 99 PNG `{Nombre_Apellido}.png` — Premier League, Bundesliga, Ligue 1, Portugal, Marruecos, Senegal y otros | ✅ |
| `public/OVERALLS/OVERALLS_INICIALES_MUNDIAL_2026.md` | Rankings iniciales · Militão añadido a Brasil (overall 85) · Courtois añadido a Bélgica (overall 85) | ✅ |
| `package.json` | `type:module` · dependencia `sharp` para procesado de imágenes · scripts `smoke` y `test:rules` | ✅ |
| `playwright.config.js` | Configuración Playwright: chromium, baseURL configurable via `BASE_URL`, timeout 30s, 1 retry | ✅ |
| `tests/smoke.spec.js` | 8 smoke tests automatizados — una ruta por test | ✅ |
| `tests/firestore.rules.test.js` | 13 tests de seguridad Firestore (users, drafts, ligas) — requiere emulador Java | ✅ |
| `scripts/test-rules.cmd` | Wrapper Windows para `firebase emulators:exec` — evita conflicto de `--test` en cmd.exe | ✅ |
| `scripts/test-rules-runner.js` | Runner ESM alternativo para `node:test` | ✅ |
| `scripts/fetch-fotos.js` | Descarga fotos de Sofascore por nombre de jugador | ✅ |
| `scripts/merge-fotos.js` | Regenera `fotos.js` desde `fotos-encontradas.json` | ✅ |
| `scripts/remove-bg.js` | Elimina fondo blanco de WebPs → guarda `{id}-t.webp` con alpha | ✅ |
| `scripts/bump.cjs` | Sube `?v=N` en todos los HTML que referencian un JS compartido · uso: `node scripts/bump.cjs cartas` / `node scripts/bump.cjs fotos` | ✅ |
| `functions/index.js` | Entry point Cloud Functions · `initializeApp()` + re-exporta `pollActive`, `aperturaJ1/J2/J3`, `onResultWrite` | ✅ |
| `functions/poller.js` | Cloud Function `pollActive` · scheduled cada 2 min · stateless (lee estado de Firestore) · soporta hasta 24 partidos simultáneos · escribe `puntuaciones/` y `resultados/` · auto-avanza jornada cuando todos los partidos terminan | ✅ |
| `functions/apertura.js` | Cloud Functions `aperturaJ1/J2/J3` · scheduled (cron UTC) · llaman a `setJornada()` · J1: `0 19 8 6 *` · J2: `0 16 14 6 *` · J3: `0 19 21 6 *` | ✅ |
| `functions/triggers.js` | Cloud Function `onResultWrite` · Firestore trigger `resultados/{matchId}` · al terminar un partido llama `updateEstadisticas()` + `updateClasificacion()` si estamos en fase de grupos | ✅ |
| `scripts/scoring.js` | Lógica de puntuación compartida (local + Cloud): `ratingToPoints`, `goalBonus`, `calcPoints`, `processLineups`, `calcFairPlay` · Fair Play: amarilla −1 · doble amarilla −3 · roja directa −4 · amarilla+roja −5 | ✅ |
| `scripts/set-jornada.js` | `SCHEDULE` (timestamps de J1–J8: apertura/deadline/cierre/label/fase) + `setJornada(jornada, db)` · escribe `config/jornada` · uso CLI: `node scripts/set-jornada.js J1` | ✅ |
| `scripts/clasificacion.js` | `calcGrupos(resultados, vivo)` + `updateClasificacion(db)` · calcula clasificación de grupos del Mundial real y escribe `clasificacion/grupos` · criterios FIFA: pts → GD → GF → FP | ✅ |
| `scripts/estadisticas.js` | `calcEstadisticas(jornadasData)` + `updateEstadisticas(db)` · agrega `_detalle` de todas las jornadas y escribe `estadisticas/jugadores` | ✅ |
| `scripts/partidos/J1.json` | IDs de Sofascore para los partidos de J1–J3 · formato `[{ sofaId, matchId, local, visit, grp }]` · J4–J8 se rellenan cuando se confirmen los equipos | ✅ (J1–J3) |
| `firebase.json` | Config Firebase · functions `source: "."` (raíz) con `runtime: nodejs22` · hosting con predeploy `convert-to-webp.js` · reglas CORS y caché por tipo de asset | ✅ |
| `firestore.rules` | Reglas de seguridad Firestore · `drafts/{uid}`: write solo si `apertura ≤ request.time < deadline` (leído de `config/jornada`) · `config/jornada`: solo lectura pública · Admin SDK bypasea todas las reglas | ✅ |
| `.funcignore` | Excluye assets, tests y secretos del bundle de Cloud Functions (limitación: Firebase CLI v2 con `source: "."` no lo respeta totalmente → bundle ~411 MB incluyendo `node_modules`) | ✅ |
| `package.json` | `type:module` · `main: functions/index.js` · `firebase-admin ^13.8.0` · `firebase-functions ^7.2.5` (Node 22) · `sharp` movido a devDependencies | ✅ |

### Testing — Smoke Tests

Smoke test automatizado con Playwright. Cubre las 8 rutas principales sin necesidad de login.

**Instalación (solo primera vez):**
```bash
npm install
npx playwright install chromium
```

**Ejecución:**
```bash
# Contra producción (por defecto)
npm run smoke

# Contra servidor local — bash/macOS/Linux
BASE_URL=http://localhost:5002 npm run smoke

# Contra servidor local — PowerShell (Windows)
$env:BASE_URL="http://localhost:5002"; npm run smoke

# Levantar servidor local (Firebase Hosting emulado)
firebase serve --only hosting --port 5002
```

**Rutas cubiertas:**
| Ruta | Notas |
|------|-------|
| `/` | Login / splash |
| `/app/` | Home |
| `/app/liga/` | Clasificación |
| `/app/draft/formacion/` | Selector de formación |
| `/app/draft/?formacion=4-3-3` | Campo de draft |
| `/app/analisis/` | Hub de análisis |
| `/app/jornada/` | Jornada en curso |
| `/app/reglamento/` | Reglamento |

**Qué comprueba cada ruta:**
- HTTP status < 500 (4xx y redirects al login son aceptables)
- `body` visible
- HTML > 50 caracteres (no pantalla en blanco total)
- Sin mojibake en texto visible (`Ã±`, `Â·`, `â€™`, emojis mal decodificados, etc.)
- Sin `pageerror` — excepciones JS no capturadas (crashes reales)
- Sin `console.error` inesperados

**Errores ignorados (`IGNORABLE_RE`) y por qué:**

| Patrón | Razón |
|--------|-------|
| `permission`, `insufficient`, `firestore`, `firebase`, `auth` | Errores de permisos de Firestore esperables sin sesión iniciada |
| `failed to fetch`, `load failed`, `net::ERR_` | Fallos de red al intentar conectar sin auth |
| `failed to load resource` | 404/500 en imágenes y assets que solo existen para usuarios autenticados (avatares, fotos de perfil) — nota: los fallos JS de módulos generan también `pageerror` que SÍ se captura |

**Archivos:**
- `playwright.config.js` — configuración (baseURL, browser, timeout, retries)
- `tests/smoke.spec.js` — los 8 tests

---

### Testing — Firestore Rules

Tests automáticos de las `firestore.rules` usando el emulador local de Firebase. **Requiere Java 11+ en PATH.**

**Instalación Java (solo una vez):**
Eclipse Temurin 21 desde `https://adoptium.net` o via winget:
```
winget install EclipseAdoptium.Temurin.21.JDK
```
Verificar: `java -version` debe mostrar `openjdk version "21.x.x"`.

**Ejecución:**
```bash
npm run test:rules
```

**Colecciones cubiertas y casos:**

| Colección | Test | Esperado |
|-----------|------|----------|
| `users/{uid}` | actualizar nombre válido (1–40 chars string) | ✅ permitido |
| `users/{uid}` | nombre vacío / >40 chars / no-string / campo extra | ❌ denegado |
| `users/{uid}` | modificar perfil ajeno | ❌ denegado |
| `drafts/{uid}` | escribir draft propio | ✅ permitido |
| `drafts/{uid}` | escribir draft ajeno | ❌ denegado |
| `ligas/{ligaId}` | manager actualiza su propio `managersInfo` | ✅ permitido |
| `ligas/{ligaId}` | manager toca `managersInfo` de otro uid | ❌ denegado |
| `ligas/{ligaId}` | manager borra `managers[]` | ❌ denegado |
| `ligas/{ligaId}` | join: usuario se añade a sí mismo | ✅ permitido |
| `ligas/{ligaId}` | join: usuario añade a un tercero | ❌ denegado |

**Nota sobre los logs:** Durante `npm run test:rules` aparecen líneas `PERMISSION_DENIED` en la consola — son **normales**. Las genera el SDK de Firebase cuando `assertFails()` verifica que una operación es correctamente denegada. No indican ningún error.

**Archivos:**
- `tests/firestore.rules.test.js` — los 13 tests (node:test)
- `scripts/test-rules.cmd` — wrapper Windows; `firebase emulators:exec` requiere un solo token sin flags `--`, este `.cmd` lo encapsula
- `firebase.json` — bloque `emulators.firestore` en puerto 8080

---

### Seguridad — Admin SDK (serviceAccount)

El script `scripts/live-scoring.js` necesita credenciales de Firebase Admin para escribir en Firestore. **Estas credenciales bypasean todas las Firestore rules** — nunca deben estar dentro del repositorio ni en `public/`.

**Ubicación activa local:**
```
C:\Users\Jepii\.secrets\la-pausa-mundial-serviceAccount.json
```

**El fichero original `serviceAccount.json` fue eliminado de la raíz del proyecto** (2026-05-03). Ya no existe en el directorio del proyecto.

**Orden de resolución de credenciales en `live-scoring.js`:**
1. Variable de entorno `GOOGLE_APPLICATION_CREDENTIALS` (ruta al fichero)
2. Fallback hardcoded: `C:/Users/Jepii/.secrets/la-pausa-mundial-serviceAccount.json`

**Reglas:**
- No mostrar, copiar ni commitear el contenido del JSON de credenciales.
- `serviceAccount.json` permanece en `.gitignore` como protección ante recreación accidental del fichero en la raíz.
- Si en el futuro se usa CI/CD, usar `GOOGLE_APPLICATION_CREDENTIALS` apuntando a un Secret Manager de GCP o a una variable de entorno inyectada por el pipeline — nunca un fichero dentro del repo.

---

### Backend — Cloud Functions ✅ desplegadas 2026-05-21

**Runtime:** Node.js 22 · `firebase-functions ^7.2.5` · `firebase-admin ^13.8.0`
**Entry point:** `functions/index.js` · `package.json → "main": "functions/index.js"` · `source: "."` en `firebase.json`

**5 funciones activas (us-central1):**

| Función | Tipo | Trigger | Qué hace |
|---------|------|---------|----------|
| `pollActive` | Scheduled | Cada 2 min (`*/2 * * * *`) | Lee SofaScore, calcula puntos, escribe `puntuaciones/{J}` y `resultados/P{id}`, cierra jornada y avanza a la siguiente al terminar todos los partidos |
| `aperturaJ1` | Scheduled | 8 jun 19:00 UTC | Escribe `config/jornada` → abre draft J1 |
| `aperturaJ2` | Scheduled | 14 jun 16:00 UTC | Escribe `config/jornada` → abre draft J2 |
| `aperturaJ3` | Scheduled | 21 jun 19:00 UTC | Escribe `config/jornada` → abre draft J3 |
| `onResultWrite` | Firestore trigger | `resultados/{matchId}` | Recalcula `estadisticas/jugadores` + `clasificacion/grupos` al escribir un resultado |

**SCHEDULE — timestamps exactos (ms UTC):**

| Jornada | apertura | deadline (= kick-off 1er partido) | cierre esperado | fase |
|---------|----------|-----------------------------------|-----------------|------|
| J1 | `1781031600000` — 8 jun 21:00 Madrid | `1781290800000` — 11 jun 21:00 Madrid | `1781755200000` | grupos |
| J2 | `1781539200000` — 14 jun 18:00 Madrid | `1781798400000` — 17 jun | `1782273600000` | grupos |
| J3 | `1782068400000` — 21 jun 21:00 Madrid | `1782327600000` — 24 jun 21:00 Madrid | `1782610200000` | grupos |
| J4 | `null` → se fija al terminar J3 | `1782673200000` — 28 jun 21:00 Madrid | `1783137600000` | r32 |
| J5 | `null` → al terminar J4 | `1783184400000` | `1783463400000` | octavos |
| J6 | `null` → al terminar J5 | `1783627200000` | `1783827000000` | cuartos |
| J7 | `null` → al terminar J6 | `1784055600000` | `1784151000000` | semis |
| J8 | `null` → al terminar J7 | `1784408400000` | `1784496600000` | final |

**Lógica de auto-avance:**
- J1-J3: apertura fija por cron (`aperturaJ1/J2/J3`); J4-J8 se abren con `apertura = Date.now()` al cerrar la jornada anterior
- `closeJornada` comprueba Firestore antes de avanzar — no sobreescribe si el admin ya adelantó manualmente
- `pollActive` filtra jornadas: `now >= deadline` AND `now <= cierre + 4h` AND `!_meta.completada`
- Cierre de jornada: marca `_meta.completada: true` → escribe clasificación + estadísticas → avanza

**Código compartido local ↔ cloud:**
- `scripts/scoring.js` — `ratingToPoints`, `goalBonus`, `calcPoints`, `processLineups`, `calcFairPlay`
- `scripts/set-jornada.js` — `SCHEDULE` + `setJornada(jornada, db, overrides)`
- `scripts/clasificacion.js` — `updateClasificacion(db, vivo)` · importa `PARTIDOS/GRUPOS` de `public/js/mundial2026.js`
- `scripts/estadisticas.js` — `updateEstadisticas(db)` · acumula `_detalle` de todos los `puntuaciones/J*`
- `scripts/partidos/{J1..J8}.json` — arrays `[{ sofaId, matchId, home, away }]`

**Fair Play (fase de grupos únicamente):**
- `calcFairPlay(lineups)` → `{ home: N, away: N }` acumulado por tarjetas de todos los jugadores
- Escala: amarilla −1 · doble amarilla −3 · roja directa −4 · amarilla+roja −5
- Se guarda en `resultados/P{id}` como `fp_home` / `fp_away`
- Usado en `clasificacion.js` para desempate de mejores terceros

---

### Optimización de assets y deploy

**Deploy efectivo:** ~98 MB antes → **~50 MB después** (la otra mitad era peso muerto).

#### PNG muertos excluidos del deploy (`firebase.json` › `ignore`)
El código usa exclusivamente `.webp` para escudos y cartas. Los PNG originales siguen en disco como fuente, pero no se despliegan:

| Patrón ignorado | MB ahorrados | Motivo |
|---|---|---|
| `assets/img/escudos/**/*.png` | ~33 MB | Clubs + selecciones + ligas: JS usa `.webp` en exclusiva |
| `assets/img/CARTAS PNG/*.png` | ~9 MB | `cartas.js` referencia las `.webp` del mismo directorio |
| `assets/logo/splash2.mp4` | 3.3 MB | No referenciado en ningún HTML/JS |
| `assets/logo/splash2.png` | 1 MB | No referenciado en ningún HTML/JS |
| `assets/img/players/**/*.png/jpg` | ~1 MB | Fuentes originales; se sirven los `.avif` generados |

#### Cache-Control immutable para MP4
`splash-entrada.mp4` (4.8 MB) tenía por defecto `max-age=3600` → se re-descargaba cada hora. Añadida regla en `firebase.json`:
```json
{ "source": "**/*.mp4", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }
```
**⚠ Advertencia:** `immutable` significa que los navegadores no revalidan el fichero durante 1 año. Si se quiere cambiar el splash, **hay que renombrar el fichero** (ej. `splash-entrada-v2.mp4`) y actualizar el `<source>` en `index.html:182`. Cambiar el contenido sin renombrar no tiene efecto en navegadores que ya lo cachearon.

#### logo-completo.webp
Conversión del logo principal (RGBA, 1536×1024) que se usa en 9 ficheros de producción:

| Fichero | Tamaño |
|---|---|
| `assets/logo/logo-completo.png` (conservado) | 2,148 KB |
| `assets/logo/logo-completo.webp` (servido) | 112 KB |
| **Ahorro por visita** | **−2,036 KB (−95%)** |

Referencias sustituidas: `index.html`, `app/draft/index.html`, `app/equipos/index.html`, `app/liga/config.html`, `app/liga/onboarding.html` (×2), `app/moscas/index.html`, `app/reglamento/index.html`, `app/setup/index.html`.

#### fondo-index.webp
Fondo del campo (1080×1920 RGBA), usado como `background-image` CSS en 3 rutas (móvil + media query desktop en cada una):

| Fichero | Tamaño |
|---|---|
| `assets/img/fondo-index.png` (conservado, ignorado en deploy) | 796 KB |
| `assets/img/fondo-index.webp` (servido) | 194 KB |
| **Ahorro por visita** | **−602 KB (−75%)** |

Referencias sustituidas: `app/index.html` (×2), `app/liga/index.html` (×2), `app/draft/formacion/index.html` (×2). PNG añadido al `ignore` de `firebase.json`.

---

### Bugs conocidos
- [x] Botón ⚙ en menú apunta a `/liga/config` en vez de `/app/liga/config.html` — ✅ corregido
- [x] `cardSVG` en analisis y equipo tenía `textLength="240"` para nombres > 10 chars — deformaba apellidos como "Gravenberch" — ✅ eliminado. Regla: **nunca usar `textLength` en carta grande**, Barlow Condensed cabe sin ajuste.
- [x] iOS Safari hace auto-zoom al enfocar inputs con `font-size < 16px` — ✅ corregido en analisis search input (16px). Aplicar siempre a cualquier `<input>` nuevo.
- [x] Draft: Firestore sobreescribía localStorage al volver al draft aunque localStorage tuviese progreso más reciente — carruseles se regeneraban con jugadores distintos — ✅ corregido añadiendo `savedAt: Date.now()` en `saveState()` y guard en `_applyFirestoreState`: Firestore solo se aplica si `data.savedAt > local.savedAt`.
- [x] `/app/jornada/`: crash JS `Cannot set properties of null (setting 'textContent')` al cargar la página — el elemento `#topbar-total` estaba referenciado en JS (línea 308) pero no existía en el HTML — ✅ corregido añadiendo `<span class="topbar-total" id="topbar-total"></span>` en el topbar con su CSS (posición absoluta izquierda). Detectado mediante smoke test automatizado.
- [x] `tests/firestore.rules.test.js`: error `Firestore has already been started` en los 6 tests de `users/{uid}` — ocurría porque `ctx.firestore()` se llamaba dos veces dentro del mismo callback de `withSecurityRulesDisabled`, lo que intentaba reconectar el emulador sobre una instancia ya iniciada — ✅ corregido cacheando `const db = ctx.firestore()` y reutilizando la referencia para todos los `setDoc` del mismo callback.
- [x] `scripts/live-scoring.js`: al escribir en Firestore, el campo `_meta.status` (y otros campos de `ev`) llegaba como `undefined` cuando Sofascore no devolvía ese campo → error `Cannot use "undefined" as a Firestore value` → la escritura fallaba silenciosamente. ✅ corregido: todos los campos del objeto `meta` usan `?? null` explícito (`status ?? null`, `minute ?? null`, `homeTeam ?? null`, etc.).

### QA Draft — 2026-05-03

**Estado: técnicamente estable para pre-release.**

- Smoke tests: **8/8 passed**
- Firestore rules tests: **16/16 passed**

**Drag & swap validado:**
- Solo se permite swap entre slots de la misma posición (`dataset.pos` iguales); drops en posición distinta se ignoran silenciosamente.
- El swap es atómico: se intercambian tanto `slotCards` (estado de carta) como `slotCarousels` (carrusel per-slot) en una sola operación sin pérdida ni duplicación.
- Tras cada swap: `updateOverallDisplay()` recalcula desde `dataset.overall` de los 11 titulares (no acumulativo), `renderChemistry()` repinta las líneas SVG de química, `saveState()` persiste en localStorage + Firestore.
- `dragState.active` como guard previene doble-drag simultáneo.
- `ghost.style.display = 'none'` antes de `elementFromPoint` evita que el ghost intercepte el hit test.
- `pointer-events: none` en imágenes hace que `elementFromPoint` aterrice en el slot div, no en el `<img>` interno.

**Bugs corregidos en esta sesión:**
- **Imagen arrastrada por el navegador:** al pulsar sobre el escudo o foto del jugador, el browser detectaba un `<img>` y lo arrastraba en vez de la carta. Fix: `.slot img, #drag-ghost img { -webkit-user-drag: none; user-drag: none; pointer-events: none; }`.
- **`sumFinal` sin bonus de química:** el handler del botón GUARDAR usaba `getTitularOverallSum()` en vez de `getTitularOverallSum() + getChemBonus()`. La alineación guardada en `lp_alineacion_jornada` tenía el overall incorrecto. Fix aplicado en `draft/index.html`.
- **`_applyFirestoreState` con SVG de texto:** los slots vacíos se reseteaban con un SVG con `<text>LA PAUSA</text>` en vez de `EMPTY_SLOT_HTML` (logo webp). Fix: `replace_all:true` en todos los usos dentro de `_applyFirestoreState`.
- **Click sintético tras drag:** `touchend` cuando `_isDragging = true` no llamaba `e.preventDefault()`, arriesgando que el browser disparara un `click` sintético que abriría el picker. Fix: `e.preventDefault()` añadido antes de `endDrag()` en esa rama.

**Viewport actualizado en 5 pantallas de juego** (añadido `maximum-scale=1.0, user-scalable=no`):
- `public/app/liga/index.html`
- `public/app/equipos/index.html`
- `public/app/calendario/index.html`
- `public/app/draft/formacion/index.html`
- `public/app/index.html`

**No tocado:** `public/app/reglamento/index.html`, `public/app/setup/index.html`.

### Sistema de Grupos y Eliminación — 2026-05-04

**Archivos nuevos/modificados:**
- `public/js/grupos.js` — global `GRUPOS_DATA` con los 48 equipos, 72 partidos (IDs 1-72), mapeo `codeToS` (3 letras FIFA → nombre en mayúsculas), y helpers `getGrupo(g)` / `getGrupoDePartido(id)`.
- `public/app/analisis/index.html` — reestructurado con dos pestañas: **GRUPOS** (portada, clasificaciones en tiempo real) y **MOSCAS** (lista de jugadores, antes era la portada).
- `scripts/live-scoring.js` — nuevo 4º argumento `matchId` (1-72). Al terminar el partido (`status === 'finished'`) escribe `resultados/P{matchId}` con `{local_code, visit_code, local_goles, visit_goles, jugado: true}`. Uso: `node scripts/live-scoring.js <sofascore_eventId> <jornada> <matchId>`.
- `scripts/cierre-grupos.js` — script manual post-grupos. Requiere los **72 partidos con `jugado=true`** en Firestore (aborta si faltan). Calcula top 2 de cada grupo + 8 mejores terceros → escribe `torneo/estado.equipos_eliminados` y `draft_disponible: true`. Uso: `node scripts/cierre-grupos.js`.

**Colecciones Firestore nuevas:**

| Colección | Doc ejemplo | Campos | Leer | Escribir |
|---|---|---|---|---|
| `resultados/` | `P1` | `local_code, visit_code, local_goles, visit_goles, jugado, timestamp` | auth | Admin SDK only |
| `torneo/` | `estado` | `equipos_eliminados[], clasificados[], fase, draft_disponible, updatedAt` | auth | Admin SDK only |

**Clasificación de grupos:**
- Tiebreaker: `Pts → DG → GF`. Head-to-head (criterio FIFA 4-6) **no implementado** — simplificación aceptada para v1. Si dos equipos empatan en los tres criterios, el orden depende de la estabilidad del sort de JS.
- Fórmula grupo por partido: `grupo = String.fromCharCode(65 + Math.floor((matchId - 1) / 6))` (IDs 1-6 → A, 7-12 → B, …, 67-72 → L).

**Comportamiento del draft con eliminados:**
- `buildCarousel` excluye jugadores cuya `seleccion` esté en `window._equiposEliminados` (Set actualizado via `onSnapshot` en `torneo/estado`).
- Jugadores de equipos eliminados **ya colocados en slots no se eliminan**; solo se filtran de nuevos carruseles. Sin badge visual en v1 (pendiente).
- `#draft-bloqueado` está visible **por defecto** (CSS `display:flex`). Solo se oculta cuando Firestore confirma `draft_disponible === true`. Si el `onSnapshot` falla (permisos, red), el draft permanece bloqueado — fallo seguro.
- `draft_disponible` lo pone a `true` el script `cierre-grupos.js`. Para bloquear entre fases, poner a `false` manualmente en Firestore Console o via script.
- **Requisito de seed:** el documento `torneo/estado` debe existir antes de abrir el draft a los managers. Si no existe, el `onSnapshot` del draft no recibe datos y el overlay de bloqueo permanece visible indefinidamente. Crear manualmente antes del primer testing real: `torneo/estado = { draft_disponible: true, equipos_eliminados: [], fase: "grupos" }`. Durante la fase de grupos (jornadas 1-3) no hay eliminados y el draft debe estar abierto, así que este seed es suficiente hasta ejecutar `cierre-grupos.js`.

---

## SISTEMA DE USUARIOS ✅ implementado 2026-05-26

### Arquitectura general

El sistema de acceso se basa en **Firebase Anonymous Auth + códigos de invitación**. No hay email ni contraseña. El administrador genera los códigos y se los entrega a cada manager.

---

### Flujo completo de un usuario nuevo

```
1. Admin genera código numérico de 6 dígitos en /admin → pestaña "Usuarios"
   └─ Se crea en Firestore: codigos/{codigo} = { activo: true, uid: null, creadoAt: ... }

2. Manager abre la app → /  (login)
   └─ Introduce el código de 6 dígitos
   └─ Se valida: codigos/{codigo} existe + activo:true + uid:null
   └─ Firebase: signInAnonymously() → obtiene uid
   └─ Se marca el código: codigos/{codigo}.uid = uid, usadoAt = timestamp
   └─ Redirect → /app/setup/

3. Manager llega a /app/setup/  (onboarding 3 pasos)
   Paso 1 — Nombre:
     └─ Escribe su nombre de usuario (2–20 chars)
     └─ runTransaction: crea users/{uid} + añade a ligas/mundial-2026-general
     └─ users/{uid} = { uid, nombre, numero, ligaGeneralId, enLigaGeneral:true }
   Paso 2 — Tipo de liga:
     └─ "Solo liga general" → salta al paso final
     └─ "Liga privada + general" → va al paso 3
   Paso 3 — Liga privada:
     └─ CREAR: genera código LIGA_XXXXXX → setDoc(ligas/{ligaId})
              + updateDoc(users/{uid}, { ligaPrivadaId })
     └─ UNIRSE: introduce código LIGA_XXXXXX → updateDoc(ligas/{ligaId}, { managers, managersInfo })
               + updateDoc(users/{uid}, { ligaPrivadaId })
   └─ Redirect → /app/

4. Siguientes visitas:
   └─ Firebase recuerda la sesión anónima en el dispositivo (IndexedDB)
   └─ onAuthStateChanged → user con nombre → va directamente a /app/
```

---

### Colecciones Firestore del sistema de usuarios

**`codigos/{6digits}`** — cada código es el ID del documento
```
{
  activo:   boolean   // false = código bloqueado (admin puede desactivar)
  uid:      string|null  // null = disponible · string = ya usado por ese uid
  creadoAt: ISO string
  usadoAt:  ISO string|null
}
```
Reglas: lectura pública · escritura solo para marcar como usado (uid null→uid propio, campos: uid + usadoAt)

**`users/{uid}`** — perfil del manager
```
{
  uid:           string   // duplicado para conveniencia
  nombre:        string   // nombre elegido en setup (2–20 chars)
  numero:        number   // posición en el orden de registro (1, 2, 3…)
  ligaGeneralId: string   // siempre 'mundial-2026-general'
  ligaPrivadaId: string|null  // null si solo está en liga general
}
```
Reglas: lectura cualquier autenticado · create/update solo el propio uid

**`ligas/{ligaId}`** — cada liga (general o privada)
```
{
  nombre:       string   // ej: "Liga de JepLaGuitlla" o "Liga General · Mundial 2026"
  esGeneral:    boolean
  codigo:       string   // solo ligas privadas: el código LIGA_XXXXXX
  managers:     string[] // array de uids
  managersInfo: {        // mapa uid → datos del manager en esta liga
    [uid]: { nombre: string, numero?: number, pts?: number }
  }
  creadoAt:     ISO string  // solo ligas privadas
}
```
Liga general ID fija: `mundial-2026-general`
Reglas de update: manager puede editar `nombre` o su propio `managersInfo[uid]` · join: añadirse a sí mismo con arrayUnion

---

### Guard de autenticación

Todas las páginas de `/app/*` tienen esta lógica en su `onAuthStateChanged`:
```js
if (!user)                              → redirect '/'           (no hay sesión)
if (!userSnap.data().nombre)            → redirect '/app/setup/' (sesión sin perfil)
// else: acceso permitido
```

El módulo `/js/auth.js` exporta `requireAuth()` para páginas que usen este guard centralizado.

**Regla crítica:** ninguna página de `/app/*` puede quedar accesible sin sesión. El `onAuthStateChanged` debe tener siempre el redirect a `/` en el caso `!user`.

---

### Panel de administración — pestaña "Usuarios"

`/admin/` → pestaña **USUARIOS**:
- Botón "Generar código" → crea código numérico de 6 dígitos aleatorio (único, verifica contra Firestore)
- Lista en tiempo real de todos los códigos (`onSnapshot` en `codigos/`) con estado libre/usado, nombre del manager y fecha
- Botón copiar en cada código libre

---

### Scripts de mantenimiento de usuarios

```bash
# Ver estado del sistema (usuarios Auth + Firestore + códigos)
node scripts/cleanup-users.js --list

# Eliminar todos los usuarios EXCEPTO uno (mantiene su código y datos)
node scripts/cleanup-users.js --keep <uid>

# Reset completo: borra todo (Auth, users, ligas privadas, liga general)
node scripts/cleanup-users.js --reset-all

# Limpiar ligas huérfanas tras borrar usuarios
node scripts/cleanup-ligas.js
```

---

## SISTEMA DE JUEGO — DISEÑO COMPLETO ✅ cerrado 2026-05-18

### Acceso — códigos de invitación

- Códigos numéricos de 6 dígitos, uno por manager — generados desde `/admin` pestaña "Usuarios"
- Firestore: `codigos/{codigo}` → `{ activo: true, uid: null, creadoAt: ... }`
- Flujo de entrada: manager introduce su código → Firebase crea cuenta anónima → elige nombre y liga en setup
- Sin email — solo código + nombre elegido
- La sesión anónima persiste en el dispositivo; en siguientes visitas va directamente a `/app/`

---

### Dos líneas de competición

**1. TORNEO (réplica del Mundial)**

- 48 managers en 12 grupos de 4, asignados por sorteo aleatorio al inicio
- Fase de grupos (J1–J3): cada manager juega un duelo por jornada contra uno de los otros 3 de su grupo
- Un duelo = quien hace más puntos Sofascore (con química aplicada) esa jornada
- Resultado del duelo: victoria = 3 pts · empate (mismos puntos) = 1 pt cada uno · derrota = 0 pts
- **Desempate en clasificación de grupo** (por este orden):
  1. Puntos en la fase de grupos
  2. Duelo directo entre los empatados (quién ganó el enfrentamiento entre ellos)
  3. Mayor puntuación Sofascore total acumulada en la fase de grupos
  4. Mayor puntuación recibida por los rivales (equivalente a "goles en contra" — más = peor)
  5. Overall medio del XI más bajo (máximo 900)
  6. Sorteo
- Clasifican: 1º y 2º de cada grupo (24) + 8 mejores terceros = **32 managers a dieciseisavos**
- Fase eliminatoria: cuadro réplica exacta del Mundial 2026
  - J4: Dieciseisavos (32 → 16)
  - J5: Octavos (16 → 8)
  - J6: Cuartos (8 → 4)
  - J7: Semis (4 → 2) + Tercer y cuarto puesto
  - J8: Final

**2. LIGA (acumulada)**

- Los mismos 48 managers, compiten en paralelo al torneo
- Se suman los puntos Sofascore (con química) de las 8 jornadas
- No hay eliminación — todos juegan las 8 jornadas
- Gana quien más puntos acumule al final

---

### Draft — reglas por fase

- Cada jornada el manager forma su XI desde cero (no se hereda del anterior)
- Límite: máximo **900 de overall** total sumando los 11 titulares
- Deadline: hora exacta del primer partido de cada jornada — el draft se cierra automáticamente
- Manager que no presenta equipo → **0 puntos** esa jornada
- Jugadores de equipos del Mundial ya eliminados → **desaparecen del draft automáticamente** en tiempo real

**Tamaño del carrusel por fase:**

| Fase | Jornada | Cartas por slot |
|------|---------|-----------------|
| Grupos | J1–J3 | 5 |
| Dieciseisavos | J4 | 5 |
| Octavos | J5 | 4 |
| Cuartos | J6 | 3 |
| Semis + Final | J7–J8 | 2 |

---

### Cartas IF — los 26 mejores de cada jornada

Al terminar cada jornada se identifican los **26 jugadores** con más puntos Sofascore del mundo real:
- 3 Porteros · 8 Defensas · 8 Mediocentros · 7 Delanteros

Esos 26 reciben una versión mejorada de su carta (IF) con overall aumentado:
- La subida es inversamente proporcional al overall actual: peor carta base = mayor subida
- Ninguna carta base supera 91 — las IF crecen sobre esa base
- La carta IF es **permanente** para el resto del torneo
- Cada jornada tiene su propio diseño IF (se encarga el autor del proyecto)
- La mejora se aplica automáticamente para todos los managers que tengan ese jugador

---

### Automatización — partidos en tiempo real

- 104 partidos en total (72 grupos + 16 dieciseisavos + 8 octavos + 4 cuartos + 2 semis + 1 tercer puesto + 1 final)
- Los IDs de Sofascore de cada partido se guardan en `scripts/partidos/{jornada}.json` antes de cada fase
- `scripts/poller.js` gestiona N partidos en paralelo (hasta 24 simultáneos en jornada 3 de grupos)
- Al terminar cada partido, resultados y puntuaciones se escriben en Firestore automáticamente
- Los equipos del Mundial eliminados se propagan a `torneo/estado.equipos_eliminados` → el draft los filtra vía `onSnapshot`

---

### Firestore — colecciones del sistema de juego

| Colección | Descripción |
|-----------|-------------|
| `invites/{codigo}` | Códigos de acceso · `{ usado, uid, username }` |
| `users/{uid}` | Perfil · `{ username, codigo, grupoTorneo }` |
| `drafts/{uid}` | XI por jornada · subcampos `{ J1: [...], J2: [...], ... }` · se bloquea al llegar el deadline via Firestore rules |
| `puntuaciones/{jornada}` | Puntos base por jugador: `{ "Messi": 8, "Mbappé": 11, ... }` + `_detalle: { "Messi": { pts, rating, goals, assists, mins, pos, team } }` + `_meta: { sofaId, status, minute, homeTeam, awayTeam, homeScore, awayScore, updatedAt, completada?, cierreAt? }` · escrito en tiempo real por `poller.js` |
| `resultados/P{matchId}` | Resultado oficial: `{ local_goles, visit_goles, homeTeam, awayTeam, fp_home, fp_away, jugado:true, timestamp }` · `fp_home`/`fp_away` = puntos Fair Play (tarjetas) · solo fase de grupos |
| `clasificacion/grupos` | Tabla de los 12 grupos · escrito por `clasificacion.js` al terminar cada partido de grupos: `{ A: [ { team, pj, pg, pe, pp, gf, gc, gd, pts, fp }, ... ], B: [...], ... }` |
| `estadisticas/jugadores` | Acumulado por jugador de todas las jornadas completadas · `{ "Messi": { pj, totalPts, goals, assists, avgRating, jornadas: { J1: { pts, rating, goals, assists, mins, pos, team } } } }` · escrito por `estadisticas.js` al terminar cada jornada |
| `torneo/grupos` | Clasificación de los 12 grupos de managers del fantasy · pts, victorias, empates, derrotas, puntosHechos, puntosRecibidos |
| `torneo/cuadro` | Bracket eliminatorio · 32 managers y sus enfrentamientos por ronda |
| `torneo/estado` | Fase actual · `draft_disponible` · `equipos_eliminados[]` |
| `liga/clasificacion` | Puntos acumulados de los 48 managers |
| `config/jornada` | `{ actual: "J1", apertura: <ms>, deadline: <ms>, cierre: <ms>, label: "Jornada 1 — Fase de grupos", fase: "grupos", updatedAt: <ms> }` · readable por todos · writable solo Admin SDK · regla Firestore: `apertura ≤ request.time < deadline` para escribir drafts |

---

## CAPA 5 — PENDIENTES ABIERTOS

Decisiones de producto que faltan. Cuando se cierren, mover a CAPA 2 con ✅.

- [x] Formaciones — cerrado: `4-4-2`, `4-3-3`, `3-4-3`
- [x] Tamaño carta mini en campo — cerrado: `65×99px`
- [x] Tipografía nombre carta — cerrado: Barlow Condensed 400, `letter-spacing="-1"`
- [x] Foto carta mini — cerrado: `<img>` overlay `left:38% top:10.5% width:51% height:49%`, fondo eliminado con `remove-bg.js` o PNG directo
- [x] Foto carta grande — cerrado: `<img>` overlay `left:31.5% top:5.8% width:60% height:42%`
- [x] Bandera de selección en carta mini — implementada via `getFlag()` en carta grande y mini
- [ ] Aplicar valores definitivos de miniCardSVG a CARTA_MINI_9.html (foto: `left:38% top:10.5% width:51% height:49%`) — pendiente de confirmar que el diseño actual es definitivo
- [x] **Química A vs B** — Cerrado 2026-05-06: Opción A. ≥1 verde o ≥2 naranjas → ×1.50 · 1 naranja → ×1.25. Toggle eliminado del código.
- [ ] **Visual química en campo** — Validar tratamiento B2 (banda sólida + contorno de carta en color química) en campo real con jugadores reales antes de implementar. Test: `chem-test.html`
- [ ] **Pantalla Jornada con datos reales** — Implementar según estrategia documentada en CAPA 2 y SISTEMA DE JUEGO: `onSnapshot(puntuaciones/{jornada})` + `drafts/{uid}/{jornada}` + química client-side
- [ ] **`scripts/poller.js`** — Script multi-partido para automatizar puntuaciones en vivo. Config: `scripts/partidos/{jornada}.json`. Extiende `live-scoring.js`. Hasta 24 partidos simultáneos.
- [ ] **Lista debajo de GUARDAR** — Sección scrolleable debajo del botón GUARDAR ALINEACIÓN con el XI completo y el multiplicador de química de cada jugador
- [x] Criterio exacto de activación IF — cerrado: top 26 por jornada (3 PT · 8 DF · 8 MC · 7 DL), subida inversamente proporcional al overall actual
- [x] Número de managers — cerrado: 48 en total, mismos para torneo y liga
- [x] Formato eliminatoria — cerrado: réplica exacta cuadro Mundial 2026
- [x] H2H por jornada — cerrado: más puntos Sofascore (con química) gana el duelo. Empate → 1 pt cada uno. Ver desempate en SISTEMA DE JUEGO.
- [ ] Colores cartas IF para fases J4–J8 (badge de Dieciseisavos, Octavos, Cuartos, Semis, Final) — diseño a cargo del autor
- [ ] Umbral INFRAS (¿top N fuera de los 26 convocados?)
- [x] **Ajuste fórmula aleatoriedad draft** — Implementado 2026-05-26. Contexto completo:
  - **Problema:** siempre salen los mismos jugadores, falta profundidad y variedad entre sesiones
  - **Objetivo:** variabilidad de carruseles con personalidad propia (un carrusel todo cracks, otro todo intermedios, otro mixto). El draft es un puzzle: el usuario entra y sale hasta el deadline probando combinaciones de overall + química. Siempre tiene que haber suficientes cracks para poder pasarse del límite de overall y tener que hacer descartes — esa tensión ES el juego
  - **Reglas de producto cerradas:**
    - Brillante = titular (cualquier metal). Mate = rotacional/suplente
    - Bronce brillante tiene valor táctico real (química, gestión overall) — presente pero con peso bajo
    - La penalización de repetición (×0.25) se deja como está — en producción no habrá botón de reset, los carruseles son fijos por jornada
  - **Cambios implementados en `public/app/draft/index.html`:**
    1. Filtro de pool: excluir `bronce-mate` y `mate overall < 70` en `buildCarousel`
    2. Factor rank aplanado: `1.00/0.85/0.60/0.30/0.10` → `1.00/0.80/0.65/0.50/0.35`
    3. Factor selección más agresivo: `0.15` → `0.20`
  - **Lo que NO se tocó:** factor overall, factor repetición, lógica de composición de carruseles

---

### Autenticación — acceso por código (pendiente de implementar)

El usuario no quiere login por email. El sistema usará **códigos de invitación** que emiten un Firebase custom token.

**Arquitectura planificada:**

| Archivo | Función |
|---------|---------|
| `firestore.rules` | `codigos/{codigo}` → solo lectura pública (para validar) |
| `scripts/generar-codigos.js` | Script admin: genera N documentos en `codigos/` con formato `{ uid, nombre: null, usado: false }` |
| `functions/entrarConCodigo.js` | Callable Cloud Function · recibe `{ codigo, nombre }` · valida en `codigos/` · crea usuario Firebase Auth si no existe · emite custom token · marca código como `{ usado: true, uid, nombre }` |
| `functions/index.js` | Exportar `entrarConCodigo` |
| `public/index.html` | Reemplazar formulario email/pass por un único input de código + input de nombre (solo primera vez) |
| `public/js/auth.js` | `requireAuth()` — redirige a `/` si no hay sesión Firebase Auth activa · llamar al inicio de cada página `/app/` |

**Flujo de usuario:**
1. Manager recibe código (por WhatsApp, DM, etc.) — 48 códigos totales
2. Entra en la app, introduce el código
3. Si es primera vez: elige nombre de usuario → cuenta creada
4. Si ya tiene cuenta: entra directamente con el custom token
5. `signInWithCustomToken(token)` → sesión Firebase Auth estándar
6. `request.auth.uid` disponible en Firestore rules para proteger `drafts/{uid}`

**Colección Firestore `codigos/{codigo}`:**
```
{ uid: "abc123", nombre: null, usado: false }
```
Writable solo via Admin SDK (en la Cloud Function). Readable públicamente para que el frontend valide.

---

---

## CAPA 6 — CONTEXTO HISTÓRICO

Decisiones descartadas. No mezclar con lo vigente.

### Light design (reemplazado 2026-04-23)
Fondo crema `#f5f0e8` + imagen `fondo-app-vivos.jpg` · topbar blanca `rgba(255,255,255,0.95)` con blur · nav blanco · avatar semitransparente · splash blasón SVG. Sustituido por Black & White design (ver CAPA 3).

### Tema oscuro original (reemplazado 2026-04-18)
El diseño original de la app usaba tema oscuro en todas las páginas. Sustituido por el light design, y luego por el B&W design.
- `html,body { background:#02070f }` · `.app { background:#040d1f; box-shadow:0 0 80px rgba(0,0,0,0.8) }`
- Topbar: `position:sticky; height:50px; background:rgba(4,13,31,0.98); border-bottom:1px solid rgba(200,168,75,0.12)`
- Logo: `color:#f0ede6` · avatar: `background:#0b1e3e; border:1px solid rgba(200,168,75,0.3); color:#c8a84b`
- Dropdown: `background:#060f26; border:1px solid rgba(200,168,75,0.2)`
- Overall badge draft: `position:absolute;bottom:0;right:0;width:84px; background:rgba(4,13,31,0.88); border-top/left:rgba(255,255,255,0.5)` — número en `#f0cc60`
- nav.js original: iconos Unicode (`⌂ ◎ ✦ ▦ ◷`), `background:#060f26`, activo `color:#f0cc60`
- GUARDAR button: deshabilitado hasta completar los 11 titulares (ahora solo se deshabilita con overall > 900)

### Multiplicadores de tier en puntuación (eliminados 2026-04-27)
Oro ×1 · Plata ×1.25 · Bronce ×1.5 → descartados. El tier solo define el diseño visual y el overall. El único multiplicador de puntuación en jornada es la química. `TIER_MULT` y `aplicarMultiplicador()` a eliminar del código de jornada al implementar.

### Otros descartados
- **Formaciones descartadas:** `5-4-1`, `5-3-2`, `4-5-1`, `3-5-2` — con carta mini de 65px no caben 5 jugadores en una línea
- **SVG `<image>` descartado para fotos:** no funciona en Chrome iOS cuando el SVG se inserta via `innerHTML`. Solución actual: `<img>` HTML con `position:absolute` encima del SVG.
- **`mix-blend-mode: multiply` descartado:** distorsiona los colores del jugador sobre gradientes de carta. Se optó por eliminar el fondo blanco en origen con `sharp`.
- **PNG descartado para fotos:** 56MB totales para 940 imágenes superaba los límites de upload de Firebase. Se usa WebP con alpha (`-t.webp`) que pesa ~8KB por archivo.
- **Suplentes descartados para v1:** 4 suplentes (1 PT · 1 DF · 1 MC · 1 DL) con multiplicador ×0.5 eliminados por complejidad innecesaria. El draft es de 11 titulares. Si un titular no juega, ese slot puntúa 0.
- **Slides retirados temporalmente (2026-04-19):** pantalla de onboarding/bienvenida con cartas animadas que aparecía tras el login. Eliminada del flujo porque el diseño debe rehacerse adaptado al light design. Archivo: `public/app/slides/index.html` — conservado en disco, NO borrar. Cuando se retome: revisar el light design vigente en CAPA 3 y rediseñar desde cero usando los mismos componentes (carta mini, paleta `#f5f0e8`, blasón blanco/dorado). El flujo post-login va ahora directamente a `./app/`.

---

---

## PENDIENTE — Fotos en GitHub raw (65 jugadores)

Las siguientes fotos no están en Firebase Hosting sino en un repo externo de GitHub (`raw.githubusercontent.com/JepLaGuitlla/tomaquet`). Si ese repo se borra o se hace privado, estas fotos dejan de verse. **Pendiente: descargar cada foto como PNG/WebP y colocarla en `public/assets/img/players/`** — el predeploy convertirá automáticamente a WebP y actualizará `fotos.js`.

| Jugador | Archivo actual |
|---------|---------------|
| Alex Baena | 19547.avif |
| Alex Freeman | 39901.avif |
| Alex Remiro | 7003.avif |
| Alvaro Fidalgo | 39966.avif |
| Ander Barrenetxea | 2602.avif |
| Ante Budimir | 18398.avif |
| Antonio Rudiger | 2253.avif |
| Arda Guler | 31027.avif |
| Aurelien Tchouameni | 26048.avif |
| Axel Witsel | 26697.avif |
| Aymeric Laporte | 1613.avif |
| Azzedine Ounahi | 38867.avif |
| Borja Iglesias | 2009.avif |
| Brahim Diaz | 129.avif |
| Carl Starfelt | 31321.avif |
| Carlos Soler | 6837.avif |
| Cedric Bakambu | 2219.avif |
| Charles Pickel | 38528.avif |
| Dani Olmo | 34527.avif |
| David Affengruber | 37725.avif |
| David Alaba | 21.avif |
| Dean Huijsen | 37495.avif |
| Djibril Sow | 31267.avif |
| Duje Caleta-Car | 37399.avif |
| Eduardo Camavinga | 1733.avif |
| Eray Comert | 25592.avif |
| Federico Valverde | 9402.avif |
| Federico Vinas | 37451.avif |
| Fermin Lopez | 31243.avif |
| Ferran Torres | 12526.avif |
| Giuliano Simeone | 30789.avif |
| Gonçalo Guedes | 10745.avif |
| Grady Diangana | 38875.avif |
| Haissem Hassan | 29907.avif |
| Joan Garcia | 15430.avif |
| Johnny Cardoso | 32120.avif |
| Jose Maria Gimenez | 1676.avif |
| Juan Musso | 34805.avif |
| Jude Bellingham | 30477.avif |
| Julián Álvarez | 34557.avif |
| Kwasi Sibo | 37453.avif |
| Lamine Yamal | 26271.avif |
| Luka Sucic | 34469.avif |
| Marcos Llorente | 2600.avif |
| Marcus Rashford | 38289.avif |
| Mikel Oyarzabal | 2603.avif |
| Nahuel Molina | 27059.avif |
| Nico González | 38966.avif |
| Nicolas Pepe | 34479.avif |
| Nobel Mendy | 37467.avif |
| Pablo Fornals | 2597.avif |
| Pau Cubarsi | 32440.avif |
| Pedri | 19441.avif |
| Renato Veiga | 38493.avif |
| Ricardo Rodriguez | 34488.avif |
| Ronald Araújo | 20702.avif |
| Ruben Vargas | 35615.avif |
| Samu Costa | 26068.avif |
| Tajon Buchanan | 35344.avif |
| Tani Oluwaseyi | 38854.avif |
| Thiago Almada | 35901.avif |
| Unai Simon | 17021.avif |
| Vinicius Junior | 15568.avif |
| Vitor Reis | 38369.avif |
| Williot Swedberg | 26879.avif |

---

---

### Status badges (NOVEDADES / cartas en HOME)

Diseño definitivo implementado 2026-05-06:
- **Posición:** `position:absolute; top:-7px; right:-7px` — flota sobre la esquina superior derecha de la carta
- **Tamaño:** 24×24px, `border-radius:50%`
- **Contenido:** solo icono (sin texto). 🔥 en forma · ⚠️ duda · 🩹 lesión
- **Visibilidad:** `overflow:visible` en `.news-card-wrap` + `padding-top:8px` en `.news-cards-scroll` para compensar el `overflow-y:hidden` forzado por `overflow-x:auto`
- **Colores:** in-form `rgba(235,110,20,0.82)` · doubt `rgba(200,148,30,0.85)` · injured `rgba(130,50,50,0.85)`
- **Shadow:** `0 2px 8px rgba(0,0,0,0.32), 0 0 0 1.5px rgba(255,255,255,0.24)` (anillo blanco semitransparente como borde)
- En el modal bottom sheet: badge se hereda en `.news-modal-card-col` (mismo CSS, `overflow:visible` implícito)

---

*Última actualización: 2026-05-06 · v4.6*
