// ── cartas.js — shared card rendering ─────────────────────────────────────
// Depende de: fotos.js, club_liga.js, ifs.js, rival.js (cargados antes)

function getFlag(sel) {
  if (sel === 'ESCOCIA')   return '\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74\uDB40\uDC7F';
  if (sel === 'INGLATERRA') return '\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F';
  const MAP = {
    'ALEMANIA':'DE','ARABIA SAUDI':'SA','ARGELIA':'DZ','ARGENTINA':'AR',
    'AUSTRALIA':'AU','AUSTRIA':'AT','BELGICA':'BE','BOSNIA Y HERZEGOVINA':'BA',
    'BRASIL':'BR','CABO VERDE':'CV','CANADA':'CA','COLOMBIA':'CO',
    'COREA DEL SUR':'KR','COSTA DE MARFIL':'CI','CROACIA':'HR','CURAZAO':'CW',
    'ECUADOR':'EC','EGIPTO':'EG','ESPA\u00d1A':'ES','ESTADOS UNIDOS':'US',
    'FRANCIA':'FR','GHANA':'GH','HAITI':'HT','IRAK':'IQ','IRAN':'IR',
    'JAPON':'JP','JORDANIA':'JO','MARRUECOS':'MA','MEXICO':'MX',
    'NORUEGA':'NO','NUEVA ZELANDA':'NZ','PAISES BAJOS':'NL','PANAMA':'PA',
    'PARAGUAY':'PY','PORTUGAL':'PT','QATAR':'QA','R.D. CONGO':'CD',
    'REPUBLICA CHECA':'CZ','SENEGAL':'SN','SUDAFRICA':'ZA','SUECIA':'SE',
    'SUIZA':'CH','TUNEZ':'TN','TURQUIA':'TR','URUGUAY':'UY','UZBEKISTAN':'UZ'
  };
  const iso = MAP[sel];
  if (!iso) return '';
  const O = 0x1F1E6 - 65;
  return String.fromCodePoint(O + iso.charCodeAt(0)) + String.fromCodePoint(O + iso.charCodeAt(1));
}

const ESCUDOS_SEL = {
  'ALEMANIA':'germany-national-team-footballlogos-org.webp',
  'ARABIA SAUDI':'saudi-arabia-national-team-footballlogos-org.webp',
  'ARGELIA':'algeria-national-team-footballlogos-org.webp',
  'ARGENTINA':'argentina-national-team-footballlogos-org.webp',
  'AUSTRALIA':'australia-national-team-footylogos.webp',
  'AUSTRIA':'austria-national-team-footballlogos-org.webp',
  'BELGICA':'belgium-national-team-footballlogos-org.webp',
  'BRASIL':'brazil-national-team-footballlogos-org.webp',
  'CABO VERDE':'cabo-verde-footballlogos-org.webp',
  'CANADA':'canada-national-team-footballlogos-org.webp',
  'COLOMBIA':'colombia-national-team-footballlogos-org.webp',
  'COREA DEL SUR':'south-korea-national-team-footballlogos-org.webp',
  'COSTA DE MARFIL':'cote-d-ivoire-national-team-footballlogos-org.webp',
  'CROACIA':'croatia-national-team-footballlogos-org.webp',
  'CURAZAO':'curacao-national-team-footballlogos-org.webp',
  'ECUADOR':'ecuador-national-team-footballlogos-org.webp',
  'EGIPTO':'egypt-national-team-footballlogos-org.webp',
  'ESCOCIA':'scotland-national-team-footballlogos-org.webp',
  'ESPA\u00d1A':'spain-national-team-footballlogos-org.webp',
  'ESTADOS UNIDOS':'usa-national-team-footballlogos-org.webp',
  'FRANCIA':'france-national-team-footballlogos-org.webp',
  'GHANA':'ghana-footballlogos-org.webp',
  'HAITI':'haiti-national-team-footylogos.webp',
  'INGLATERRA':'england-national-team-footballlogos-org.webp',
  'IRAN':'iran-national-team-footballlogos-org.webp',
  'JAPON':'japan-national-team-footballlogos-org.webp',
  'JORDANIA':'jordan-footballlogos-org.webp',
  'NORUEGA':'norway-national-team-footballlogos-org.webp',
  'NUEVA ZELANDA':'new-zealand-national-team-footballlogos-org.webp',
  'PAISES BAJOS':'netherlands-dutch-national-team-footballlogos-org.webp',
  'PARAGUAY':'paraguay-national-team-footballlogos-org.webp',
  'PORTUGAL':'portugal-national-team-footballlogos-org.webp',
  'QATAR':'qatar-national-team-footballlogos-org.webp',
  'SENEGAL':'senegal-national-team-footballlogos-org.webp',
  'SUIZA':'swiss-national-team-footballlogos-org.webp',
  'TUNEZ':'tunisia-national-team-footballlogos-org.webp',
  'URUGUAY':'uruguay-national-team-footballlogos-org.webp',
  'UZBEKISTAN':'uzbekistan-national-team-footballlogos-org.webp',
  'PANAMA':'panama national team.webp',
  'TURQUIA':'turquia national team.webp',
  'SUDAFRICA':'sudafrica national team.webp',
  'SUECIA':'suecia national team.webp',
  'MEXICO':'mexico national team.webp',
  'REPUBLICA CHECA':'republica checa national team.webp',
  'BOSNIA Y HERZEGOVINA':'bosnia_herzegovina_national_team.webp',
  'MARRUECOS':'marruecos national team.webp',
  'IRAK':'iraq national team.webp',
  'R.D. CONGO':'congo national team.webp',
};

const ESCUDOS_STYLE = {
  'MEXICO':        'transform:scale(1.7) translateY(5px)',
  'SUIZA':         'transform:scale(2.4) translateY(4px)',
  'COREA DEL SUR': 'transform:scale(1.35) translateY(6px)',
  'ALEMANIA':      'transform:scale(1.35) translateY(3px)',
  'BELGICA':       'transform:scale(1.5) translateY(6px)',
  'ESPA\u00d1A':   'transform:scale(1.35) translateY(5px)',
  'FRANCIA':       'transform:scale(1.35) translateY(6px)',
  'R.D. CONGO':    'transform:scale(1.25) translateY(5px)',
  'BRASIL':        'transform:scale(1.35) translateY(5px)',
  'ESTADOS UNIDOS': 'transform:scale(1.25) translateY(5px)',
  'TURQUIA':        'transform:scale(1.25) translateY(5px)',
  'TUNEZ':          'transform:scale(1.25) translateY(5px)',
  'PORTUGAL':       'transform:scale(0.9)',
  'HAITI':          'transform:scale(1.25) translateY(5px)',
  'PARAGUAY':       'transform:scale(1.25) translateY(5px)',
  'URUGUAY':        'transform:scale(1.25) translateY(5px)',
  'ECUADOR':        'transform:scale(1.25) translateY(5px)',
  'CANADA':         'transform:scale(1.25) translateY(5px)',
  'PAISES BAJOS':   'transform:scale(1.25) translateY(5px)',
  'IRAN':           'transform:scale(1.25) translateY(5px)',
  'MARRUECOS':      'transform:scale(1.25) translateY(5px)',
  'COSTA DE MARFIL':'transform:scale(1.25) translateY(5px)',
  'REPUBLICA CHECA':'transform:scale(1.25) translateY(5px)',
  'ARABIA SAUDI':   'transform:scale(1.25) translateY(5px)',
  'CURAZAO':        'transform:scale(1.25) translateY(5px)',
  'SENEGAL':        'transform:scale(1.25) translateY(5px)',
  'GHANA':          'transform:scale(1.25) translateY(5px)',
  'NUEVA ZELANDA':  'transform:scale(1.25) translateY(5px)',
  'INGLATERRA':     'transform:scale(1.25) translateY(5px)',
  'ARGENTINA':      'transform:scale(1.25) translateY(5px)',
  'CROACIA':        'transform:scale(1.25) translateY(5px)',
  'NORUEGA':        'transform:scale(1.25) translateY(5px)',
  'AUSTRIA':        'transform:scale(1.25) translateY(5px)',
  'COLOMBIA':       'transform:scale(1.25) translateY(5px)',
  'JAPON':          'transform:scale(1.25) translateY(5px)',
  'JORDANIA':       'transform:scale(1.25) translateY(5px)',
  'AUSTRALIA':      'transform:scale(1.25) translateY(5px)',
  'CABO VERDE':     'transform:scale(1.25) translateY(5px)',
  'UZBEKISTAN':     'transform:scale(1.25) translateY(5px)',
  'BOSNIA Y HERZEGOVINA': 'transform:scale(1.25) translateY(5px)',
  'QATAR':          'transform:scale(1.25) translateY(5px)',
  'EGIPTO':         'transform:scale(1.25) translateY(5px)',
  'ARGELIA':        'transform:scale(1.25) translateY(5px)',
  'ESCOCIA':        'transform:scale(1.25) translateY(5px)',
};

const ESCUDOS_MINI_STYLE = {
  'MEXICO':        'transform:scale(1.55)',
  'SUIZA':         'transform:scale(2.0)',
  'COREA DEL SUR': 'transform:scale(1.25) translateY(2px)',
  'ALEMANIA':      'transform:scale(1.35)',
  'BELGICA':       'transform:scale(1.25) translateY(2px)',
  'ESPA\u00d1A':   'transform:scale(1.25) translateY(2px)',
  'FRANCIA':       'transform:scale(1.35) translateY(2px)',
  'R.D. CONGO':    'transform:scale(1.25) translateY(2px)',
  'BRASIL':        'transform:scale(1.25) translateY(2px)',
};

const TIER_CFG = {
  'oro-if':          { g0:'#030200', g1:'#0c0800', g2:'#060400', border:'#f0c830', texto:'#fff8c0' },
  'oro-brillante':   { g0:'#c88000', g1:'#fffac0', g2:'#a86800', border:'#000000', texto:'#1a1000' },
  'oro-mate':        { g0:'#7a5000', g1:'#d4a820', g2:'#7a5000', border:'#000000', texto:'#1a1000' },
  'plata-if':        { g0:'#050505', g1:'#0e0e0e', g2:'#080808', border:'#c8c8c8', texto:'#c8c8c8' },
  'plata-brillante': { g0:'#686868', g1:'#f0f0f0', g2:'#606060', border:'#000000', texto:'#1a1000' },
  'plata-mate':      { g0:'#505050', g1:'#989898', g2:'#484848', border:'#000000', texto:'#1a1000' },
  'bronce-if':       { g0:'#030100', g1:'#080400', g2:'#040200', border:'#d08040', texto:'#ffe8c0' },
  'bronce-brillante':{ g0:'#903010', g1:'#ffc888', g2:'#7c2c08', border:'#000000', texto:'#1a1000' },
  'bronce-mate':     { g0:'#5a2800', g1:'#c06828', g2:'#5a2800', border:'#000000', texto:'#1a1000' },
};

const _NOM_OVR = {'Vinicius Junior':'Vinicius Jr.','Brahim Diaz':'Brahim','Joan Garcia':'Joan Garcia','Luis Diaz':'Luis Diaz','Malo Gusto':'Malo Gusto','Lucas Hernandez':'Lucas','Theo Hernandez':'Theo','João Pedro':'João Pedro','Andrey Santos':'Andrey Santos','Leo Pereira':'Leo Pereira','Arda Guler':'Arda Güler','Micky van de Ven':'van de Ven','Xavi Simons':'Xavi Simons','Andre de Jong':'de Jong','Randal Kolo Muani':'Kolo Muani','Julián Álvarez':'Julián Álvarez','Fermin Lopez':'Fermín','Enzo Fernández':'Enzo Fernández','Alexis Mac Allister':'Mac Allister','Nuno Mendes':'Nuno Mendes','Kang-in Lee':'Kang In Lee','Virgil van Dijk':'Van Dijk','Nico Paz':'Nico Paz','Min-jae Kim':'Kim Min-Jae','Ferran Torres':'Ferran Torres','Kevin De Bruyne':'De Bruyne','Gonçalo Ramos':'Gonçalo Ramos','Emiliano "Dibu" Martinez':'Dibu Martinez','Emi Martinez':'Emi Martinez','Daniel Muñoz':'Daniel Muñoz','Rodrigo De Paul':'De Paul','Pape Gueye':'Pape Gueye','Bilal El Khannouss':'El Khannouss','Charles De Ketelaere':'De Ketelaere','Darwin Nunez':'Darwin Nuñez','Ismael Kone':'Ismael Kone','Yeremi Pino':'Yeremi Pino','Antonio Silva':'Antonio Silva','Ismaila Sarr':'Ismaïla Sarr','Giorgian de Arrascaeta':'De Arrascaeta','Maxi Araújo':'Maxi Araújo','Unai Simon':'Unai Simón','João Felix':'João Félix','Nico González':'Nico González','Abde Ezzalzouli':'Ez Abde','Richard Rios':'Richard Rios','João Neves':'João Neves','Ruben Neves':'Ruben Neves','Mamadou Sarr':'Mamadou Sarr','Kendry Paez':'Kendry Paez','Rui Silva':'Rui Silva','James Rodriguez':'James Rodriguez','Samu Costa':'Samu Costa','Ruben Vargas':'Ruben Vargas','Victor Muñoz':'Victor Muñoz','Jose Manuel Lopez':'Flaco López','Santiago Bueno':'Santi Bueno','Jose Sa':'José Sá','Idrissa Gueye':'Idrissa Gueye','Stefan de Vrij':'De Vrij','Pathé Ciss':'Pathé Ciss','Edouard Mendy':'Edouard Mendy','Alvyn Sanches':'Alvyn Sanches','Ismael Diaz':'Ismael Diaz','Andres Gomez':'Andrés Gómez','Lamine Yamal':'Lamine Yamal','Borja Iglesias':'Borja Iglesias','Heung-min Son':'Heung-min Son','Hyeon-gyu Oh':'Hyeon-gyu Oh','Hwang In-beom':'Hwang In-beom','Hee-chan Hwang':'Hee-chan Hwang','Jae-sung Lee':'Jae-sung Lee','Young-woo Seol':'Young-woo Seol','Jun-ho Bae':'Jun-ho Bae','Seung-ho Paik':'Seung-ho Paik','Bum-keun Song':'Bum-keun Song','Hyun-seok Hong':'Hyun-seok Hong','Gue-sung Cho':'Gue-sung Cho','Tae-seok Lee':'Tae-seok Lee','Hyun-jun Yang':'Hyun-jun Yang','Hyeon-woo Jo':'Hyeon-woo Jo','Seung-gyu Kim':'Seung-gyu Kim','Moon-hwan Kim':'Moon-hwan Kim','Yu-min Cho':'Yu-min Cho','Han-beom Lee':'Han-beom Lee','Hyeok-kyu Kwon':'Hyeok-kyu Kwon','Ji-sung Eom':'Ji-sung Eom','Jin-seob Park':'Jin-seob Park','Jin-gyu Kim':'Jin-gyu Kim','Ju-sung Kim':'Ju-sung Kim','Tae-hyeon Kim':'Tae-hyeon Kim','Matheus Nunes':'Matheus Nunes','Renato Veiga':'Renato Veiga','Tomás Araújo':'Tomás Araújo','Zion Suzuki':'Zion Suzuki','Yuito Suzuki':'Yuito Suzuki','Junnosuke Suzuki':'Junnosuke Suzuki','Cristian Romero':'Cuti Romero','Lucas Martinez Quarta':'Martinez Quarta','Leandro Paredes':'Leo Paredes','Giuliano Simeone':'Giuliano','Exequiel Palacios':'Exequiel Palacios','Tomás Palacios':'Tomás Palacios','Luiz Henrique':'Luiz Henrique','Nicolas de la Cruz':'De La Cruz','Alan Franco':'Alan Franco','Ahmed Al-Kassar':'Al Kassar','Danley Jean Jacques':'Jean-Jacques','Alexandre Pierre':'Alexandre Pierre','Leverton Pierre':'Leverton Pierre','Woodensky Pierre':'Woodensky Pierre','Louey Ben Farhat':'Ben Farhat','Bruno Fernandes':'Bruno Fernandes','Leroy Sane':'Sané','Maxim De Cuyper':'De Cuyper','Kylian Mbappe':'Mbappé','Zeki Celik':'Çelik','Sidny Lopes Cabral':'Lopes Cabral','Ozan Kabak':'Ozan Kabak','Desire Doue':'Doué','Jhon Arias':'Jhon Arias','Orkun Kokcu':'Orkun Kökçü','N\'Golo Kante':'Kanté','Aurelien Tchouameni':'Tchouaméni','Ousmane Dembele':'Dembélé','Ibrahima Konate':'Konaté','Kenan Yildiz':'Yıldız','Hakan Calhanoglu':'Çalhanoğlu','Ferdi Kadioglu':'Kadıoğlu','Baris Alper Yilmaz':'Yılmaz','Yunus Akgun':'Akgün','Ugurcan Cakir':'Çakır','Kerem Akturkoglu':'Aktürkoğlu','Ismail Yuksek':'Yüksek','Altay Bayindir':'Bayındır','Mert Muldur':'Müldür','Deniz Gul':'Gül','Abdulkerim Bardakci':'Bardakçı','Oguz Aydin':'Aydın','Salih Ozcan':'Özcan','Fares Chaibi':'Chaïbi','Joel Ordoñez':'Ordóñez','Moussa Niakhate':'Niakhaté','Ousmane Diomande':'Diomandé','Ibrahim Sangare':'Sangaré','Franck Kessie':'Kessié','Guela Doue':'Doué','Nicolas Pepe':'Pépé','Bénie Traore':'Traoré','Mohamed Kone':'Koné','Ramy Bensebaini':'Bensebaïni','Yan Valery':'Valéry',
'Alexander Sorloth':'Sørloth','Leo Ostigard':'Østigård','Fredrik Bjorkan':'Bjørkan','Odin Bjortuft':'Bjørtuft',
'Gonzalo Plata':'Gonzalo Plata','Jhon Cordoba':'Jhon Córdoba',
'Pau Cubarsi':'Cubarsí',
'Piero Hincapie':'Hincapié','Kendry Paez':'Páez','Kevin Rodriguez':'Rodríguez','Moises Ramirez':'Ramírez',
'Jose Maria Gimenez':'Giménez','Brian Rodriguez':'Rodríguez','Sebastian Caceres':'Cáceres','Agustin Alvarez':'Álvarez','Federico Vinas':'Viñas','Matias Vina':'Viña',
'Jhon Lucumi':'Lucumí','Davinson Sanchez':'Sánchez','Kevin Castano':'Castaño',
'Julian Quinones':'Quiñones','Armando Gonzalez':'González','Raul Jimenez':'Jiménez','Brian Gutierrez':'Gutiérrez','Guillermo Martinez':'Martínez','Everardo Lopez':'López','Carlos Rodriguez':'Rodríguez','Erick Sanchez':'Sánchez','Jorge Sanchez':'Sánchez',
'Miguel Almiron':'Almirón','Gustavo Velazquez':'Velázquez','Roberto Fernandez':'Fernández',
'Jose Luis Rodriguez':'Rodríguez','Jorge Gutierrez':'Gutiérrez','Yoel Barcenas':'Bárcenas','Trezeguet':'Trézéguet','Alexander Nubel':'Alexander Nübel',
'Antonio Rudiger':'Rüdiger','Chris Fuhrich':'Führich','Pascal Gross':'Groß',
'Gonçalo Inacio':'Inácio',
'Eder Militao':'Militão','Roger Ibanez':'Roger Ibáñez','Neymar Jr':'Neymar Jr.','Danilo Santos':'Danilo Santos','Douglas Santos':'Douglas Santos','Alex Sandro':'Alex Sandro','Bruno Guimarães':'Bruno Guimarães','Matheus Cunha':'Matheus Cunha','Igor Thiago':'Igor Thiago'};
function formatNombre(n) {
  if (_NOM_OVR[n]) return _NOM_OVR[n];
  const PREF = new Set(['DE','VAN','DEL','DA','DOS','DAS','DI','EL','AL','BIN','IBN','LE','LA','LOS','LAS','SAN','DOS','MC']);
  const w = n.trim().split(/\s+/);
  if (w.length <= 1) return n;
  if (w.length >= 2 && PREF.has(w[w.length - 2])) return w.slice(-2).join(' ');
  return w[w.length - 1];
}

function cardSVG(card, uid) {
  uid = uid || ('cg-' + Math.random().toString(36).slice(2,7));
  card = (typeof applyIF !== 'undefined') ? applyIF(card) : card;
  const t = TIER_CFG[card.tier] || TIER_CFG['bronce-if'];
  const fotoImg = card.foto ? `<img src="${card.foto}" onerror="this.style.display='none'" style="position:absolute;left:31.5%;top:5.8%;width:60%;height:42%;object-fit:cover;object-position:top center;pointer-events:none;display:block"/>` : '';
  const escudoFile = ESCUDOS_SEL[card.seleccion];
  const escudoExtraStyle = escudoFile ? (ESCUDOS_STYLE[card.seleccion] || '') : '';
  const escudoHtml = escudoFile ? `<img src="/assets/img/escudos/selecciones/${escudoFile}" style="position:absolute;left:8%;top:26%;width:17%;height:auto;object-fit:contain;pointer-events:none;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.4));${escudoExtraStyle}">` : '';
  const flag = (!escudoFile && card.seleccion) ? getFlag(card.seleccion) : '';
  const flagEl = flag ? `<text x="12" y="132" font-size="52" dominant-baseline="auto">${flag}</text>` : '';
  const rivalFlag = (typeof getNextRivalFlag !== 'undefined') ? getNextRivalFlag(card.seleccion) : '';
  const _club = card.club || ((typeof JUGADOR_CLUB !== 'undefined') ? JUGADOR_CLUB[card.nombre] : null);
  const _ligaFile = _club && typeof CLUB_LIGA !== 'undefined' ? CLUB_LIGA[_club] : null;
  const _escudoClubFile = _club && typeof CLUB_ESCUDO !== 'undefined' ? CLUB_ESCUDO[_club] : null;
  const _ligaImg = _ligaFile ? `<img src="/assets/img/escudos/ligas/${_ligaFile}" style="height:100%;width:auto;object-fit:contain;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.5))">` : '';
  const _clubImg = _escudoClubFile ? `<img src="/assets/img/escudos/${_escudoClubFile}" style="height:100%;width:auto;object-fit:contain;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.5))">` : '';
  const logosHtml = (_ligaImg || _clubImg) ? `<div style="position:absolute;bottom:12%;left:0;right:0;height:7.5%;display:flex;align-items:center;justify-content:center;gap:4px;pointer-events:none;">${_ligaImg}${_clubImg}</div>` : '';
  return `<div style="position:relative;width:100%;height:100%">
<svg viewBox="0 -22 260 417" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
<defs>
  <linearGradient id="cg${uid}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${t.g0}"/>
    <stop offset="50%" stop-color="${t.g1}"/>
    <stop offset="100%" stop-color="${t.g2}"/>
  </linearGradient>
  <clipPath id="cc${uid}">
    <path d="M 0,20 L 20,0 C 80,-12 180,-12 240,0 L 260,20 L 260,308 C 252,330 188,346 130,370 C 72,346 8,330 0,308 Z"/>
  </clipPath>
</defs>
<path d="M 0,20 L 20,0 C 80,-12 180,-12 240,0 L 260,20 L 260,308 C 252,330 188,346 130,370 C 72,346 8,330 0,308 Z" fill="url(#cg${uid})" stroke="${t.border}" stroke-width="2.5"/>
<path d="M 5,22 L 23,4 C 82,-8 178,-8 237,4 L 255,22 L 255,306 C 247,327 186,342 130,364 C 74,342 13,327 5,306 Z" fill="none" stroke="${t.border}" stroke-width="1" opacity="0.25"/>
<text x="16" y="56" font-family="'Bebas Neue',sans-serif" font-size="52" fill="${t.border}" opacity="0.35" dx="2" dy="2">${card.overall}</text>
<text x="16" y="56" font-family="'Bebas Neue',sans-serif" font-size="52" fill="${t.border}">${card.overall}</text>
<text x="22" y="80" font-family="'Bebas Neue',sans-serif" font-size="26" fill="${t.border}" opacity="0.35" dx="2" dy="2" letter-spacing="2">${card.posicion || card.posDraft || ''}</text>
<text x="22" y="80" font-family="'Bebas Neue',sans-serif" font-size="26" fill="${t.border}" letter-spacing="2">${card.posicion || card.posDraft || ''}</text>
${flagEl}
<line x1="5" y1="178" x2="255" y2="178" stroke="${t.border}" stroke-width="1" opacity="0.9"/>
<line x1="5" y1="216" x2="255" y2="216" stroke="${t.border}" stroke-width="1" opacity="0.9"/>
<text x="130" y="197" text-anchor="middle" dominant-baseline="central" font-family="'Barlow Condensed',sans-serif" font-weight="400" font-size="30" fill="${t.texto}" letter-spacing="-1">${formatNombre(card.nombre)}</text>
<g clip-path="url(#cc${uid})">
<text x="44" y="251" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="24" fill="${t.texto}">26</text>
<text x="44" y="263" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-size="7.5" fill="${t.texto}" opacity="0.5">PUNTOS</text>
<text x="130" y="251" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="24" fill="${t.texto}">5.2</text>
<text x="130" y="263" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-size="7.5" fill="${t.texto}" opacity="0.5">MEDIA</text>
<text x="210" y="254" text-anchor="middle" dominant-baseline="auto" font-size="28">${rivalFlag}</text>
<text x="210" y="263" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-size="7.5" fill="${t.texto}" opacity="0.5">RIVAL</text>
<rect x="30" y="274" width="36" height="22" rx="3" fill="#ef4444"/>
<text x="48" y="289" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="13" fill="white">-2</text>
<rect x="71" y="274" width="36" height="22" rx="3" fill="#888888"/>
<text x="89" y="289" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="13" fill="white">0</text>
<rect x="112" y="274" width="36" height="22" rx="3" fill="#f59e0b"/>
<text x="130" y="289" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="13" fill="white">4</text>
<rect x="153" y="274" width="36" height="22" rx="3" fill="#22c55e"/>
<text x="171" y="289" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="13" fill="white">7</text>
<rect x="194" y="274" width="36" height="22" rx="3" fill="#3b82f6"/>
<text x="212" y="289" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="13" fill="white">15</text>
</g>
</svg>
${fotoImg}${escudoHtml}${logosHtml}
</div>`;
}

function cardBackSVG(card, uid) {
  uid = uid || ('cb-' + Math.random().toString(36).slice(2,7));
  card = (typeof applyIF !== 'undefined') ? applyIF(card) : card;
  const t = TIER_CFG[card.tier] || TIER_CFG['bronce-mate'];
  const isIf = card.tier && card.tier.includes('if');
  const textColor = isIf ? t.texto : '#1a1000';
  const nombre = formatNombre(card.nombre);

  const isPT = (card.posicion || card.posDraft) === 'PT';
  const rows = [
    { label: 'PARTIDOS',                           value: '0', y: 52  },
    { label: isPT ? 'G. RECIBIDOS' : 'GOLES',      value: '0', y: 80  },
    { label: isPT ? 'PORT. A CERO' : 'ASISTENCIAS', value: '0', y: 108 },
    { label: 'T.AMARILLAS',                         value: '0', y: 136 },
    { label: 'T.ROJAS',                             value: '0', y: 164 },
    { label: 'INTERNAC.',                           value: '—', y: 192 },
    { label: 'GOLES SEL.',                          value: '0', y: 220 },
  ];

  const rowsHTML = rows.map(r => `
<text x="20" y="${r.y}" font-family="'JetBrains Mono',monospace" font-size="9" fill="${textColor}" opacity="0.55">${r.label}</text>
<text x="240" y="${r.y}" text-anchor="end" font-family="'Bebas Neue',sans-serif" font-size="18" fill="${textColor}">${r.value}</text>
<line x1="15" y1="${r.y+12}" x2="245" y2="${r.y+12}" stroke="${textColor}" stroke-width="0.5" opacity="0.12"/>`).join('');

  const selEscudoFile = (typeof ESCUDOS_SEL !== 'undefined' && ESCUDOS_SEL[card.seleccion]) ? ESCUDOS_SEL[card.seleccion] : null;
  const clubLigaFile  = (typeof CLUB_LIGA    !== 'undefined' && CLUB_LIGA[card.club])        ? CLUB_LIGA[card.club]        : null;
  const clubEscFile   = (typeof CLUB_ESCUDO  !== 'undefined' && CLUB_ESCUDO[card.club])       ? CLUB_ESCUDO[card.club]       : null;
  const ligaLabel = clubLigaFile ? clubLigaFile.replace('.png','') : '—';
  const infoRows = [
    { value: card.seleccion || '—', y: 262, icon: selEscudoFile ? `/assets/img/escudos/selecciones/${selEscudoFile}` : null },
    { value: ligaLabel,             y: 292, icon: clubLigaFile  ? `/assets/img/escudos/ligas/${clubLigaFile}`         : null },
    { value: card.club || '—',      y: 322, icon: clubEscFile   ? `/assets/img/escudos/${clubEscFile}`                : null },
  ];
  const infoFs = v => Math.max(9, Math.min(15, Math.floor(380 / v.length)));
  const sepColor = isIf ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)';
  const iconTops = ['calc(68.1% - 12px)', 'calc(75.3% - 12px)', 'calc(82.5% - 12px)'];
  const iconOverlays = infoRows.map((r, i) => `
<div style="position:absolute;left:15px;right:15px;top:${iconTops[i]};height:24px;display:flex;align-items:center;justify-content:center;gap:5px;border-bottom:0.5px solid ${sepColor};">
  ${r.icon ? `<img src="${r.icon}" style="height:18px;width:18px;object-fit:contain;flex-shrink:0;">` : ''}
  <span style="font-family:'Bebas Neue',sans-serif;font-size:${infoFs(r.value)}px;color:${textColor};line-height:1;letter-spacing:1px;">${r.value}</span>
</div>`).join('');

  return `<div style="position:relative;width:100%;height:100%">
<svg viewBox="0 -22 260 417" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
<defs>
  <linearGradient id="cb${uid}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${t.g0}"/>
    <stop offset="50%" stop-color="${t.g1}"/>
    <stop offset="100%" stop-color="${t.g2}"/>
  </linearGradient>
</defs>
<path d="M 0,20 L 20,0 C 80,-12 180,-12 240,0 L 260,20 L 260,308 C 252,330 188,346 130,370 C 72,346 8,330 0,308 Z" fill="url(#cb${uid})" stroke="${t.border}" stroke-width="2.5"/>
<path d="M 5,22 L 23,4 C 82,-8 178,-8 237,4 L 255,22 L 255,306 C 247,327 186,342 130,364 C 74,342 13,327 5,306 Z" fill="none" stroke="${t.border}" stroke-width="1" opacity="0.25"/>
<text x="130" y="12" text-anchor="middle" dominant-baseline="central" font-family="'Bebas Neue',sans-serif" font-size="24" fill="${textColor}" letter-spacing="2">${nombre} · ${card.overall}</text>
<line x1="15" y1="30" x2="245" y2="30" stroke="${textColor}" stroke-width="0.5" opacity="0.3"/>
${rowsHTML}
<line x1="15" y1="244" x2="245" y2="244" stroke="${textColor}" stroke-width="0.8" opacity="0.25"/>
</svg>
${iconOverlays}
</div>`;
}

function miniCardSVG(card, cw, ch) {
  cw = cw || 65; ch = ch || 99;
  card = (typeof applyIF !== 'undefined') ? applyIF(card) : card;
  const escudoSz = Math.round(cw * 0.246);
  const logoH = Math.round(cw * 0.185);
  const t = TIER_CFG[card.tier] || TIER_CFG['bronce-mate'];
  const uid = 'mc-' + Math.random().toString(36).slice(2,7);
  const nombre = formatNombre(card.nombre || '');
  const textLen = nombre.length > 16 ? ' textLength="230" lengthAdjust="spacingAndGlyphs"' : '';
  const fotoImg = card.foto ? `<img src="${card.foto}" onerror="this.style.display='none'" style="position:absolute;left:38%;top:10.5%;width:51%;height:49%;object-fit:cover;object-position:top center;pointer-events:none;display:block"/>` : '';
  const escudoFile = ESCUDOS_SEL[card.seleccion];
  const escudoExtraStyle = escudoFile ? (ESCUDOS_MINI_STYLE[card.seleccion] || '') : '';
  const escudoHtml = escudoFile ? `<img src="/assets/img/escudos/selecciones/${escudoFile}" style="position:absolute;left:8%;top:36%;width:${escudoSz}px;height:${escudoSz}px;object-fit:contain;pointer-events:none;filter:drop-shadow(0 0px 2px rgba(0,0,0,0.5));${escudoExtraStyle}">` : '';
  const flag = (!escudoFile && card.seleccion) ? getFlag(card.seleccion) : '';
  const flagEl = flag ? `<text x="12" y="171" font-size="72" dominant-baseline="auto">${flag}</text>` : '';
  const _club = card.club || ((typeof JUGADOR_CLUB !== 'undefined') ? JUGADOR_CLUB[card.nombre] : null);
  const _ligaFile = _club && typeof CLUB_LIGA !== 'undefined' ? CLUB_LIGA[_club] : null;
  const _escudoClubFile = _club && typeof CLUB_ESCUDO !== 'undefined' ? CLUB_ESCUDO[_club] : null;
  const _ligaImg = _ligaFile ? `<img src="/assets/img/escudos/ligas/${_ligaFile}" style="height:${logoH}px;object-fit:contain;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.5))">` : '';
  const _clubImg = _escudoClubFile ? `<img src="/assets/img/escudos/${_escudoClubFile}" style="height:${logoH}px;object-fit:contain;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.5))">` : '';
  const _logosHtml = (_ligaImg || _clubImg) ? `<div style="position:absolute;bottom:14%;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:1px;pointer-events:none">${_ligaImg}${_clubImg}</div>` : '';
  return `<div style="position:relative;width:${cw}px;height:${ch}px">
  ${escudoHtml}
  <svg width="${cw}" height="${ch}" viewBox="0 -22 260 417" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${uid}-g" x1="0.15" y1="0" x2="0.85" y2="1">
      <stop offset="0%" stop-color="${t.g0}"/>
      <stop offset="50%" stop-color="${t.g1}"/>
      <stop offset="100%" stop-color="${t.g2}"/>
    </linearGradient>
  </defs>
  <path d="M 0,20 L 20,0 C 80,-12 180,-12 240,0 L 260,20 L 260,308 C 252,330 188,346 130,370 C 72,346 8,330 0,308 Z" fill="url(#${uid}-g)"/>
  <path d="M 0,20 L 20,0 C 80,-12 180,-12 240,0 L 260,20 L 260,308 C 252,330 188,346 130,370 C 72,346 8,330 0,308 Z" fill="none" stroke="${t.border}" stroke-width="4" opacity="0.65"/>
  <path d="M 5,22 L 23,4 C 82,-8 178,-8 237,4 L 255,22 L 255,306 C 247,327 186,342 130,364 C 74,342 13,327 5,306 Z" fill="none" stroke="${t.border}" stroke-width="1.5" opacity="0.65"/>
  <text x="16" y="78" font-family="'Bebas Neue',cursive" font-size="78" fill="${t.texto}" opacity="0.4" dx="2" dy="2">${card.overall}</text>
  <text x="16" y="78" font-family="'Bebas Neue',cursive" font-size="78" fill="${t.texto}">${card.overall}</text>
  <text x="22" y="115" font-family="'Bebas Neue',cursive" font-size="42" fill="${t.texto}" opacity="0.4" dx="2" dy="2" letter-spacing="2">${card.posicion || card.posDraft || ''}</text>
  <text x="22" y="115" font-family="'Bebas Neue',cursive" font-size="42" fill="${t.texto}" letter-spacing="2">${card.posicion || card.posDraft || ''}</text>
  ${flagEl}
  <line x1="5" y1="226" x2="255" y2="226" stroke="${t.border}" stroke-width="4" opacity="0.65"/>
  <line x1="5" y1="274" x2="255" y2="274" stroke="${t.border}" stroke-width="4" opacity="0.65"/>
  <text x="130" y="248" text-anchor="middle" dominant-baseline="central" font-family="'Barlow Condensed', sans-serif" font-weight="400" font-size="38" fill="${t.texto}" letter-spacing="-1"${textLen}>${nombre}</text>
</svg>
${fotoImg}
${_logosHtml}
</div>`;
}
