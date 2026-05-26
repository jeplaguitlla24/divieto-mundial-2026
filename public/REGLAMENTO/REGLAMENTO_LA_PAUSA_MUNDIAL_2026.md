# REGLAMENTO DIVIETO · MUNDIAL 2026

---

## 1. Descripción del juego

DIVIETO es un fantasy football del Mundial 2026 basado en un sistema de cartas y draft por jornada. Cada manager construye su XI desde cero en cada jornada eligiendo jugadores a través de carruseles de cartas por posición. La competición dura 8 jornadas correspondientes a las fases del torneo.

---

## 2. Estructura de la competición

### 2.1 Jornadas

| # | Fase | Cartas por posición |
|---|------|---------------------|
| 1 | Grupos J1 | 5 |
| 2 | Grupos J2 | 5 |
| 3 | Grupos J3 | 5 |
| 4 | Dieciseisavos | 5 |
| 5 | Octavos | 4 |
| 6 | Cuartos | 4 |
| 7 | Semis | 3 |
| 8 | 3º/4º puesto + Final | 3 |

### 2.2 Formato

- Liga de puntos acumulados — nadie se elimina
- 8 jornadas totales
- Gana el manager con más puntos al final de J8

### 2.3 Criterios de desempate

1. **Overall medio más bajo** de todos los titulares utilizados a lo largo del torneo
2. **Mayor puntuación en la última jornada jugada**
3. **Mayor puntuación en la penúltima jornada** — y así hacia atrás
4. **Registro más antiguo en la liga**

---

## 3. El Draft

### 3.1 Equipo

Cada jornada el manager completa un draft de **11 titulares**. No hay suplentes.

### 3.2 Formaciones disponibles

- **4-4-2** — 4 defensas · 4 medios · 2 delanteros
- **4-3-3** — 4 defensas · 3 medios · 3 delanteros
- **3-4-3** — 3 defensas · 4 medios · 3 delanteros

Siempre con 1 portero fijo. La formación se elige antes de empezar y no se puede cambiar.

### 3.3 Funcionamiento del carrusel

Al pulsar por primera vez una posición vacía, se genera un carrusel con N cartas para esa posición. Ese carrusel queda fijado para toda la ventana de draft.

- Las cartas no se regeneran ni cambian durante la jornada
- Al volver a la pantalla se ven exactamente las mismas cartas
- Un jugador que aparece en un carrusel no puede aparecer en otro del mismo draft

### 3.4 Regla de unicidad

Un jugador solo puede aparecer una vez por jornada por manager. El carrusel filtra por posición (solo MCs en el carrusel de MC, etc.). Un mismo jugador sí puede estar en equipos de distintos managers.

### 3.5 Reinicio por jornada

Al abrirse una nueva jornada el equipo vuelve vacío. Los carruseles de una jornada no se arrastran a la siguiente.

---

## 4. Ventana de Draft

- Se abre cuando termina el último partido de la jornada anterior
- Se cierra cuando empieza el primer partido de la jornada siguiente
- El cierre es global — aplica a todos los managers por igual

---

## 5. Guardar alineación

- Se puede modificar el equipo mientras la ventana esté abierta
- Para presentar la alineación hay que pulsar **Guardar alineación**
- La última alineación guardada antes del cierre es la que puntúa
- Si la alineación supera 900 de overall, el sistema no permite guardar

---

## 6. Límite de overall

Los 11 titulares deben sumar como máximo **900 puntos de overall**. La química suma +1 o +2 al overall de cada jugador, lo que puede hacer que un equipo supere el límite aunque individualmente cada carta esté por debajo.

---

## 7. Penalización por draft incompleto

- **−4 puntos por cada posición vacía** al cierre de la ventana (máximo 11 posiciones)
- Si no se guardó ninguna alineación: 0 puntos esa jornada

---

## 8. Sistema de puntuación

### 8.1 Tabla base Sofascore → Puntos DIVIETO

| Rating Sofascore | Puntos |
|-----------------|--------|
| 9.5 – 10.0 | +14 |
| 9.0 – 9.4 | +13 |
| 8.6 – 8.9 | +12 |
| 8.2 – 8.5 | +11 |
| 8.0 – 8.1 | +10 |
| 7.8 – 7.9 | +9 |
| 7.6 – 7.7 | +8 |
| 7.4 – 7.5 | +7 |
| 7.2 – 7.3 | +6 |
| 7.0 – 7.1 | +5 |
| 6.8 – 6.9 | +4 |
| 6.6 – 6.7 | +3 |
| 6.4 – 6.5 | +2 |
| 6.2 – 6.3 | +1 |
| 6.0 – 6.1 | 0 |
| 5.8 – 5.9 | −1 |
| 5.6 – 5.7 | −2 |
| 5.4 – 5.5 | −3 |
| 5.2 – 5.3 | −4 |
| 5.0 – 5.1 | −5 |
| 0.0 – 4.9 | −6 |

### 8.2 Bonus

| Acción | Bonus |
|--------|-------|
| Gol de portero | +6 |
| Gol de defensa | +5 |
| Gol de centrocampista | +4 |
| Gol de delantero | +3 |
| Penalti marcado | +3 |
| Asistencia | +1 |
| Autogol | 0 |

### 8.3 Fórmula final

**Puntos finales = (puntos base + bonus) × multiplicador de química**

El único multiplicador de puntuación es la química. Los tiers (Oro, Plata, Bronce) solo afectan al diseño visual de la carta.

### 8.4 Reglas operativas

- Se usa la nota final del partido en Sofascore al momento del cierre — no se modifica después
- El jugador debe haber jugado al menos 1 minuto para puntuar
- Las tarjetas no tienen penalización adicional fuera de la que ya refleje Sofascore
- En conflicto sobre una acción de partido, prevalece la decisión arbitral

---

## 9. Química

### 9.1 Conexiones entre jugadores

Cada titular está conectado a sus vecinos en el campo. El color depende de lo que comparten:

| Condición | Conexión |
|-----------|----------|
| Mismo club | Verde |
| Misma liga **y** misma selección | Verde |
| Misma liga **o** misma selección | Naranja |
| Sin factor común | Rojo |

### 9.2 Multiplicadores

Cada jugador tiene un número fijo de conexiones según su posición. Verde = 2 pts, Naranja = 1 pt, Rojo = 0 pts:

| Puntos acumulados | Multiplicador | OVR extra |
|-------------------|--------------|-----------|
| Suma ≥ nº de conexiones | ×1.50 | +2 |
| Al menos 1 punto | ×1.25 | +1 |
| 0 puntos | ×1.00 | — |

El OVR extra cuenta para el límite de 900 al guardar la alineación.

---

## 10. Sistema de cartas

### 10.1 Tiers y overall

| Tier | Rango de overall |
|------|-----------------|
| Oro | 75 – 99 |
| Plata | 65 – 74 |
| Bronce | 64 o menos |

El tier solo afecta al diseño visual. Overall máximo absoluto: 99.

### 10.2 Cartas IF

Al terminar cada jornada, los 26 jugadores con más puntos Sofascore reciben una carta IF:

- 3 PT · 8 DF · 8 MC · 7 DL
- La carta IF tiene el overall aumentado y es permanente para el resto del torneo
- Si un jugador repite, su carta se actualiza a la IF más reciente

### 10.3 Subida de overall por IF

| Aparición IF | Oro | Plata | Bronce |
|-------------|-----|-------|--------|
| 1ª | +1 | +2 | +3 |
| 2ª | +2 | +3 | +5 |
| 3ª | +3 | +4 | reglas Plata |
| 4ª | +1* | +5 | — |
| 5ª+ | +1* | +6 | — |

*Oro a partir de overall 85 siempre +1.

**Cambio de tier:** Bronce que supera 64 → pasa a Plata. Plata que supera 74 → pasa a Oro. La carta adopta las reglas del nuevo tier.

---

*DIVIETO · Draft · Mundial 2026 · v2.0 · Mayo 2026*
