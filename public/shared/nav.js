(function() {
  const NAV_ITEMS = [
    { id: 'inicio',   href: '/app',          label: 'INICIO',
      svg: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>' },
    { id: 'liga',     href: '/app/liga',     label: 'LIGA',
      svg: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>' },
    { id: 'draft',    href: '/app/draft',    label: 'DRAFT',
      svg: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>' },
    { id: 'analisis', href: '/app/analisis', label: 'AN\u00c1LISIS',
      svg: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>' },
    { id: 'jornada',  href: '/app/jornada',  label: 'JORNADA',
      svg: '<circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>' },
  ];

  // ── CSS ──
  const style = document.createElement('style');
  style.textContent = `
.shared-bottom-nav {
  position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 100%; max-width: 430px; height: 76px;
  display: flex; align-items: center; justify-content: space-around;
  padding: 0 8px; padding-bottom: env(safe-area-inset-bottom);
  background: #0a0a0a; border-radius: 28px 28px 0 0;
  border-top: none; z-index: 200;
  font-family: 'Barlow Condensed', sans-serif;
}
.shared-bottom-nav .nav-item {
  display: flex; flex-direction: column; align-items: center; gap: 5px;
  font-size: 7px; letter-spacing: 1.5px;
  color: #ffffff; cursor: pointer; padding: 6px 12px;
  -webkit-tap-highlight-color: transparent; transition: color 0.15s;
  text-transform: uppercase;
}
.shared-bottom-nav .nav-item.active { color: #ffcc00; }
.shared-bottom-nav .nav-item svg { width: 20px; height: 20px; }
@media (min-width:768px) { .shared-bottom-nav { max-width: 100%; border-radius: 0; } }
  `;
  document.head.appendChild(style);

  // ── Detectar página activa ──
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  function isActive(href) {
    const h = href.replace(/\/$/, '');
    if (h === '/app') return path === '/app' || path === '/app/index.html';
    return path === h || path.startsWith(h + '/');
  }

  // ── Construir nav ──
  const nav = document.createElement('nav');
  nav.className = 'shared-bottom-nav';

  NAV_ITEMS.forEach(item => {
    const div = document.createElement('div');
    div.className = 'nav-item' + (isActive(item.href) ? ' active' : '');
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgEl.setAttribute('viewBox', '0 0 24 24');
    svgEl.setAttribute('fill', 'none');
    svgEl.setAttribute('stroke', 'currentColor');
    svgEl.setAttribute('stroke-width', '1.8');
    svgEl.innerHTML = item.svg;
    const label = document.createElement('span');
    label.textContent = item.label;
    div.appendChild(svgEl);
    div.appendChild(label);
    div.addEventListener('click', () => { window.location.href = item.href; });
    nav.appendChild(div);
  });

  document.body.appendChild(nav);
})();
