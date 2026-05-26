// Cartas IF activas — sobreescriben automáticamente la carta base del jugador
// Campos que se sobreescriben: tier, overall, foto
// Añadir/quitar entradas aquí para activar/desactivar cartas IF
// Umbrales de tier IF: ≤64 bronce-if | 65-74 plata-if | ≥75 oro-if
var IF_CARDS = {
  // Las IFs se activarán durante el torneo
};

function applyIF(card) {
  if (!card || !card.nombre) return card;
  var override = IF_CARDS[card.nombre];
  if (!override) return card;
  return Object.assign({}, card, override);
}
