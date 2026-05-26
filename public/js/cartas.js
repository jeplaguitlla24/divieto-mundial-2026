// ── cartas.js — shared card rendering ─────────────────────────────────────
// Depende de: fotos.js, club_liga.js, ifs.js, rival.js (cargados antes)

function getFlag(sel) {
  if (sel === 'ESCOCIA')   return '🏴󠁧󠁢󠁳󠁣󠁴󠁿';
  if (sel === 'INGLATERRA') return '🏴󠁧󠁢󠁥󠁮󠁧󠁿';
  const MAP = {
    'ALEMANIA':'DE','ARABIA SAUDI':'SA','ARGELIA':'DZ','ARGENTINA':'AR',
    'AUSTRALIA':'AU','AUSTRIA':'AT','BELGICA':'BE','BOSNIA Y HERZEGOVINA':'BA',
    'BRASIL':'BR','CABO VERDE':'CV','CANADA':'CA','COLOMBIA':'CO',
    'COREA DEL SUR':'KR','COSTA DE MARFIL':'CI','CROACIA':'HR','CURAZAO':'CW',
    'ECUADOR':'EC','EGIPTO':'EG','ESPAÑA':'ES','ESTADOS UNIDOS':'US',
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
  'ESPAÑA':'spain-national-team-footballlogos-org.webp',
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
  'SUIZA':         'transform:scale(1.25) translateY(5px)',
  'COREA DEL SUR': 'transform:scale(1.35) translateY(6px)',
  'ALEMANIA':      'transform:scale(1.35) translateY(3px)',
  'BELGICA':       'transform:scale(1.5) translateY(6px)',
  'ESPAÑA':   'transform:scale(1.35) translateY(5px)',
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
  'SUIZA':         'transform:scale(1.25) translateY(2px)',
  'COREA DEL SUR': 'transform:scale(1.25) translateY(2px)',
  'ALEMANIA':      'transform:scale(1.35)',
  'BELGICA':       'transform:scale(1.25) translateY(2px)',
  'ESPAÑA':   'transform:scale(1.25) translateY(2px)',
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
'Eder Militao':'Militão','Roger Ibanez':'Ibáñez',
// Haití
'Derrick Etienne Jr.':'Etienne Jr.',
// Túnez — artículo Ben
'Anis Ben Slimane':'Ben Slimane','Mohamed Amine Ben Hamida':'Ben Hamida',
'Mortadha Ben Ouanes':'Ben Ouanes','Omar Ben Ali':'Ben Ali','Sabri Ben Hessen':'Ben Hessen',
// Croacia
'Luka Vuskovic':'Vušković','Josip Stanisic':'Stanišić','Luka Modric':'Modrić',
'Petar Sucic':'Sučić','Luka Sucic':'Sučić','Dominik Livakovic':'Livaković',
'Josip Sutalo':'Šutalo','Andrej Kramaric':'Kramarić','Ivan Perisic':'Perišić',
'Mario Pasalic':'Pašalić','Marco Pasalic':'Pašalić','Nikola Vlasic':'Vlašić',
'Igor Matanovic':'Matanović','Marin Pongracic':'Pongračić','Kristijan Jakic':'Jakić',
'Martin Erlic':'Erlić','Ivan Smolcic':'Smolčić',
// Bosnia
'Ermedin Demirovic':'Demirović','Tarik Muharemovic':'Muharemović','Amar Dedic':'Dedić',
'Kerim Alajbegovic':'Alajbegović','Sead Kolasinac':'Kolašinac','Edin Dzeko':'Džeko',
'Benjamin Tahirovic':'Tahirović','Amar Memic':'Memić','Amir Hadziahmetovic':'Hadžiahmetović',
'Esmir Bajraktarevic':'Bajraktarević','Nidal Celik':'Čelić','Armin Gigovic':'Gigović',
'Haris Tabakovic':'Tabaković','Ivan Sunjic':'Šunjić','Stjepan Radeljic':'Radeljić',
'Martin Zlomislic':'Zlomislić','Nikola Katic':'Katić','Nihad Mujakic':'Mujakić',
'Dzenis Burnic':'Burnić','Ivan Basic':'Bašić','Jovo Lukic':'Lukić','Osman Hadzikic':'Hadžikić',
// Australia — apellidos balcánicos
'Ajdin Hrustic':'Hrustić','Deni Juric':'Jurić',
// Austria — apellidos balcánicos
'Marko Arnautovic':'Arnautović','Sasa Kalajdzic':'Kalajdžić',
// República Checa
'Ladislav Krejci':'Krejčí','Pavel Sulc':'Šulc','Tomas Soucek':'Souček',
'Lukas Hornicek':'Horníček','Martin Vitik':'Vitík','Robin Hranac':'Hranáč',
'Michal Sadilek':'Sadílek','Matej Kovar':'Kovář','David Jurasek':'Jurásek',
'Tomas Chory':'Chorý','Tomas Holes':'Holeš','Martin Jedlicka':'Jedlička',
'Jaroslav Zeleny':'Zelený',
'Neymar Jr':'Neymar Jr.','Danilo Santos':'Danilo Santos','Douglas Santos':'Douglas Santos','Alex Sandro':'Alex Sandro','Roger Ibanez':'Roger Ibáñez','Bruno Guimarães':'Bruno Guimarães','Matheus Cunha':'Matheus Cunha','Igor Thiago':'Igor Thiago'};

function formatNombre(n) {
  if (_NOM_OVR[n]) return _NOM_OVR[n];
  const PREF = new Set(['DE','VAN','DEL','DA','DOS','DAS','DI','EL','AL','BEN','BIN','IBN','LE','LA','LOS','LAS','SAN','MC']);
  const w = n.trim().split(/\s+/);
  if (w.length <= 1) return n;
  if (w.length >= 2 && PREF.has(w[w.length - 2].toUpperCase())) return w.slice(-2).join(' ');
  return w[w.length - 1];
}

// ── PNG asset map ──────────────────────────────────────────────────────────
// Canvas 1498×1050. Large card: x=446 y=58 w=616 h=950. Mini: x=455 y=62 w=594 h=928.
const _PNG_LG = {
  'oro-brillante':    '/assets/img/CARTAS%20PNG/CARTA%20ORO%20BRILLANTE.webp',
  'oro-mate':         '/assets/img/CARTAS%20PNG/CARTA%20ORO%20MATE.webp',
  'plata-brillante':  '/assets/img/CARTAS%20PNG/CARTA%20PLATA%20BRILLANTE.webp',
  'plata-mate':       '/assets/img/CARTAS%20PNG/CARTA%20PLATA%20MATE.webp',
  'bronce-brillante': '/assets/img/CARTAS%20PNG/CARTA%20BRONCE%20BRILLANTE.webp',
  'bronce-mate':      '/assets/img/CARTAS%20PNG/CARTA%20BRONCE%20MATE.webp',
};
const _PNG_MINI = {
  'oro-brillante':    '/assets/img/CARTAS%20PNG/CARTA%20MINI%20ORO%20BRILLANTE.webp',
  'oro-mate':         '/assets/img/CARTAS%20PNG/CARTA%20MINI%20ORO%20MATE.webp',
  'plata-brillante':  '/assets/img/CARTAS%20PNG/CARTA%20MINI%20PLATA%20BRILLANTE.webp',
  'plata-mate':       '/assets/img/CARTAS%20PNG/CARTA%20MINI%20PLATA%20MATE.webp',
  'bronce-brillante': '/assets/img/CARTAS%20PNG/CARTA%20MINI%20BRONCE%20BRILLANTE.webp',
  'bronce-mate':      '/assets/img/CARTAS%20PNG/CARTA%20MINI%20BRONCE%20MATE.webp',
};

// Preload all card WebPs so they're ready before the user interacts
(function() {
  const all = Object.values(_PNG_LG).concat(Object.values(_PNG_MINI));
  all.forEach(src => { const img = new Image(); img.src = src; });
})();

// ── Legacy SVG rendering (used for IF tiers only) ──────────────────────────
function _cardSVGlegacy(card, uid) {
  const t = TIER_CFG[card.tier] || TIER_CFG['bronce-if'];
  const fotoImg = card.foto ? `<img src="${card.foto}" onerror="this.style.display='none'" loading="lazy" style="position:absolute;left:31.5%;top:5.8%;width:60%;height:42%;object-fit:cover;object-position:top center;pointer-events:none;display:block"/>` : '';
  const escudoFile = ESCUDOS_SEL[card.seleccion];
  const escudoExtraStyle = escudoFile ? (ESCUDOS_STYLE[card.seleccion] || '') : '';
  const escudoHtml = escudoFile ? `<img src="/assets/img/escudos/selecciones/${escudoFile}" style="position:absolute;left:8%;top:26%;width:17%;height:auto;object-fit:contain;pointer-events:none;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.4));${escudoExtraStyle}">` : '';
  const flag = (!escudoFile && card.seleccion) ? getFlag(card.seleccion) : '';
  const flagEl = flag ? `<text x="12" y="132" font-size="52" dominant-baseline="auto">${flag}</text>` : '';
  const rivalIsoSvg = (typeof getNextRivalIso !== 'undefined') ? getNextRivalIso(card.seleccion) : null;
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
<text x="22" y="80" font-family="'Bebas Neue',sans-serif" font-size="26" fill="${t.border}" opacity="0.35" dx="2" dy="2">${(card.posicion||card.posDraft||'').trim().replace(/[^A-Za-z]/g,'')}</text>
<text x="22" y="80" font-family="'Bebas Neue',sans-serif" font-size="26" fill="${t.border}">${(card.posicion||card.posDraft||'').trim().replace(/[^A-Za-z]/g,'')}</text>
${flagEl}
<line x1="5" y1="178" x2="255" y2="178" stroke="${t.border}" stroke-width="1" opacity="0.9"/>
<line x1="5" y1="216" x2="255" y2="216" stroke="${t.border}" stroke-width="1" opacity="0.9"/>
<text x="130" y="197" text-anchor="middle" dominant-baseline="central" font-family="'Barlow Condensed',sans-serif" font-weight="400" font-size="30" fill="${t.texto}" letter-spacing="-1">${formatNombre(card.nombre)}</text>
<g clip-path="url(#cc${uid})">
<text x="44" y="251" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="24" fill="${t.texto}">—</text>
<text x="44" y="263" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-size="7.5" fill="${t.texto}" opacity="0.5">PUNTOS</text>
<text x="130" y="251" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="24" fill="${t.texto}">—</text>
<text x="130" y="263" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-size="7.5" fill="${t.texto}" opacity="0.5">MEDIA</text>
${rivalIsoSvg ? `<image href="/assets/img/flags/${rivalIsoSvg}.webp" x="196" y="236" width="28" height="19" preserveAspectRatio="xMidYMid meet"/>` : `<text x="210" y="254" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="24" fill="${t.texto}">—</text>`}
<text x="210" y="263" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-size="7.5" fill="${t.texto}" opacity="0.5">RIVAL</text>
</g>
</svg>
${fotoImg}${escudoHtml}${logosHtml}
</div>`;
}

function _miniCardSVGlegacy(card, cw, ch) {
  const escudoSz = Math.round(cw * 0.246);
  const logoH = Math.round(cw * 0.185);
  const t = TIER_CFG[card.tier] || TIER_CFG['bronce-mate'];
  const uid = 'mc-' + Math.random().toString(36).slice(2,7);
  const nombre = formatNombre(card.nombre || '');
  const textLen = nombre.length > 16 ? ' textLength="230" lengthAdjust="spacingAndGlyphs"' : '';
  const fotoImg = card.foto ? `<img src="${card.foto}" onerror="this.style.display='none'" loading="lazy" style="position:absolute;left:38%;top:10.5%;width:51%;height:49%;object-fit:cover;object-position:top center;pointer-events:none;display:block"/>` : '';
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
  <text x="22" y="115" font-family="'Bebas Neue',cursive" font-size="42" fill="${t.texto}" opacity="0.4" dx="2" dy="2">${(card.posicion||card.posDraft||'').trim().replace(/[^A-Za-z]/g,'')}</text>
  <text x="22" y="115" font-family="'Bebas Neue',cursive" font-size="42" fill="${t.texto}">${(card.posicion||card.posDraft||'').trim().replace(/[^A-Za-z]/g,'')}</text>
  ${flagEl}
  <line x1="5" y1="226" x2="255" y2="226" stroke="${t.border}" stroke-width="4" opacity="0.65"/>
  <line x1="5" y1="274" x2="255" y2="274" stroke="${t.border}" stroke-width="4" opacity="0.65"/>
  <text x="130" y="248" text-anchor="middle" dominant-baseline="central" font-family="'Barlow Condensed', sans-serif" font-weight="400" font-size="38" fill="${t.texto}" letter-spacing="-1"${textLen}>${nombre}</text>
</svg>
${fotoImg}
${_logosHtml}
</div>`;
}

// ── PNG cardSVG ────────────────────────────────────────────────────────────
// Positions in cqw (container query width units) — scales with any container size.
// Requires container-type:inline-size on parent OR on this div (set here).
// Canvas: large card x=446 y=58 w=616 h=950.
// All cqw values derived from test at 268px: value = test_px / 268 * 100.
function cardSVG(card, uid) {
  uid = uid || ('cp-' + Math.random().toString(36).slice(2,7));
  card = (typeof applyIF !== 'undefined') ? applyIF(card) : card;
  if (card.tier && card.tier.endsWith('-if')) return _cardSVGlegacy(card, uid);

  const tier = card.tier || 'bronce-mate';
  const pngSrc = _PNG_LG[tier] || _PNG_LG['bronce-mate'];
  const txt = '#1a1000';
  const txtMuted = 'rgba(26,16,0,0.5)';

  // Photo
  const fotoHtml = card.foto
    ? `<div style="position:absolute;left:0;right:0;top:0;height:79.0cqw;overflow:hidden;z-index:1;pointer-events:none;">
         <img src="${card.foto}" onerror="this.style.display='none'" loading="lazy" style="position:absolute;right:4.88cqw;bottom:0;width:68cqw;height:68cqw;object-fit:contain;object-position:bottom center;">
       </div>`
    : '';

  // Escudo selección
  const escudoFile = ESCUDOS_SEL[card.seleccion];
  const escudoStyle = escudoFile ? (ESCUDOS_STYLE[card.seleccion] || '') : '';
  const escudoHtml = escudoFile
    ? `<div style="position:absolute;left:7cqw;top:45.15cqw;width:18cqw;height:18cqw;display:flex;align-items:center;justify-content:center;z-index:3;">
         <img src="/assets/img/escudos/selecciones/${escudoFile}" onerror="this.style.display='none'" style="width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.3));${escudoStyle}">
       </div>`
    : '';

  // Liga + club badges
  const _club = card.club || ((typeof JUGADOR_CLUB !== 'undefined') ? JUGADOR_CLUB[card.nombre] : null);
  const _ligaFile = _club && typeof CLUB_LIGA !== 'undefined' ? CLUB_LIGA[_club] : null;
  const _clubFile = _club && typeof CLUB_ESCUDO !== 'undefined' ? CLUB_ESCUDO[_club] : null;
  const _mkBadge = src =>
    `<div style="width:13cqw;height:13cqw;display:flex;align-items:center;justify-content:center;margin:0 0.5cqw;">
       <img src="${src}" onerror="this.style.display='none'" style="width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.5));">
     </div>`;
  const badgesHtml = (_ligaFile || _clubFile)
    ? `<div style="position:absolute;left:0;right:0;top:127.24cqw;height:14.93cqw;display:flex;align-items:center;justify-content:center;z-index:3;">
         ${_ligaFile ? _mkBadge('/assets/img/escudos/ligas/' + _ligaFile) : ''}
         ${_clubFile ? _mkBadge('/assets/img/escudos/' + _clubFile) : ''}
       </div>`
    : '';

  // Stats
  const puntos = card.puntos !== undefined ? card.puntos : '—';
  const media  = card.media  !== undefined ? card.media  : '—';
  const rivalIso = (typeof getNextRivalIso !== 'undefined') ? getNextRivalIso(card.seleccion) : null;
  const rivalHtml = rivalIso
    ? `<div style="width:13cqw;height:9cqw;display:flex;align-items:center;justify-content:center;"><img src="/assets/img/flags/${rivalIso}.webp" style="max-width:100%;max-height:100%;object-fit:contain;" onerror="this.parentNode.style.display='none'"></div>`
    : (card.rival || '—');
  const statStyle = `display:flex;flex-direction:column;align-items:center;gap:0.75cqw;`;
  const valStyle  = `font-family:'Bebas Neue',Impact,sans-serif;font-size:8.21cqw;color:${txt};line-height:1;`;
  const lblStyle  = `font-family:'JetBrains Mono',monospace;font-size:2.61cqw;color:${txtMuted};letter-spacing:0.37cqw;text-transform:uppercase;line-height:1;`;
  const statsHtml = `<div style="position:absolute;left:0;right:0;top:97.01cqw;height:18.66cqw;display:flex;align-items:center;justify-content:space-around;padding:0 5.97cqw;z-index:3;">
    <div style="${statStyle}"><div style="${valStyle}">${puntos}</div><div style="${lblStyle}">PUNTOS</div></div>
    <div style="${statStyle}"><div style="${valStyle}">${media}</div><div style="${lblStyle}">MEDIA</div></div>
    <div style="${statStyle}"><div style="line-height:1;">${rivalHtml}</div><div style="${lblStyle}">RIVAL</div></div>
  </div>`;

  // Pills (optional — only if card.pills array is provided)
  const PILL_C = { verde:'#2e7d32', gris:'#546e7a', naranja:'#e65100', azul:'#1565c0', rojo:'#c62828' };
  const pillsArr = Array.isArray(card.pills) ? card.pills : [];
  const pillsHtml = pillsArr.length
    ? `<div style="position:absolute;left:0;right:0;top:114.93cqw;height:7.46cqw;display:flex;align-items:center;justify-content:center;gap:1.12cqw;padding:0 2.99cqw;z-index:3;">
         ${pillsArr.map(p => `<div style="display:flex;align-items:center;justify-content:center;min-width:14.93cqw;height:7.09cqw;border-radius:1.12cqw;background:${PILL_C[p.color]||'#546e7a'};font-family:'Bebas Neue',Impact,sans-serif;font-size:5.22cqw;color:#fff;padding:0 2.24cqw;">${p.value}</div>`).join('')}
       </div>
       <div style="position:absolute;left:6%;right:6%;top:125cqw;height:1px;background:rgba(26,16,0,0.18);z-index:3;"></div>`
    : '';

  return `<div style="position:relative;width:100%;height:100%;overflow:hidden;container-type:inline-size;">
  <div style="position:absolute;inset:0;transform:scale(0.985);transform-origin:top left;">
    <img src="${pngSrc}" alt="" style="position:absolute;top:0;margin-top:-9.42cqw;left:-72.40cqw;width:243.18cqw;height:auto;pointer-events:none;z-index:0;display:block;">
    ${fotoHtml}
    <div style="position:absolute;left:5.97cqw;top:15.5cqw;font-family:'Bebas Neue',Impact,sans-serif;font-size:23cqw;color:${txt};line-height:1;z-index:3;text-shadow:1px 1px 0 rgba(0,0,0,0.25),0 2px 6px rgba(0,0,0,0.35);">${card.overall}</div>
    <div style="position:absolute;left:8.21cqw;top:35.07cqw;font-family:'Bebas Neue',Impact,sans-serif;font-size:8.21cqw;color:${txt};line-height:1;letter-spacing:0;z-index:3;">${(card.posicion||card.posDraft||'').trim().replace(/[^A-Za-z]/g,'')}</div>
    ${escudoHtml}
    <div style="position:absolute;left:0;right:0;top:79.48cqw;height:16.04cqw;display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed','Arial Narrow',sans-serif;font-size:12.69cqw;font-weight:400;color:${txt};letter-spacing:0;z-index:3;">${formatNombre(card.nombre)}</div>
    ${statsHtml}
    ${pillsHtml}
    ${badgesHtml}
  </div>
</div>`;
}

// src + posicionamiento y escala calculados del canvas real de cada PNG
const _PNG_BACK = {
  'oro-brillante':    { src:'/assets/img/CARTAS%20PNG/ORO%20BRILLANTE%20TRASERA.webp',    w:'242.39cqw', mt:'-8.58cqw', l:'-71.84cqw', s:0.9816 },
  'oro-mate':         { src:'/assets/img/CARTAS%20PNG/ORO%20MATE%20TRASERA.webp',         w:'237.03cqw', mt:'-4.91cqw', l:'-68.20cqw', s:0.9723 },
  'plata-brillante':  { src:'/assets/img/CARTAS%20PNG/PLATA%20BRILLANTE%20TRASERA.webp',  w:'238.16cqw', mt:'-4.61cqw', l:'-68.68cqw', s:0.9687 },
  'plata-mate':       { src:'/assets/img/CARTAS%20PNG/PLATA%20MATE%20TRASERA.webp',       w:'238.54cqw', mt:'-6.37cqw', l:'-69.27cqw', s:0.9711 },
  'bronce-brillante': { src:'/assets/img/CARTAS%20PNG/BRONCE%20BRILLANTE%20TRASERA.webp', w:'243.58cqw', mt:'-6.02cqw', l:'-72.03cqw', s:0.9519 },
  'bronce-mate':      { src:'/assets/img/CARTAS%20PNG/BRONCE%20MATE%20TRASERA.webp',      w:'232.97cqw', mt:'-3.42cqw', l:'-66.41cqw', s:0.9648 },
};

function cardBackSVG(card) {
  const tier = card.tier || 'bronce-mate';
  const key = tier.endsWith('-if') ? tier.replace(/-if$/, '') : tier;
  const { src, w, mt, l, s } = _PNG_BACK[key] || _PNG_BACK['bronce-mate'];
  return `<div style="position:relative;width:100%;height:100%;overflow:hidden;container-type:inline-size;">
  <div style="position:absolute;inset:0;transform:scale(${s});transform-origin:top center;">
    <img src="${src}" alt="" style="position:absolute;top:0;margin-top:${mt};left:${l};width:${w};height:auto;pointer-events:none;display:block;z-index:0;" draggable="false">
    <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:1;pointer-events:none;">
      <img src="/assets/img/dv-logo-trasera.webp" alt="" style="width:38cqw;height:38cqw;object-fit:contain;mix-blend-mode:multiply;" draggable="false">
    </div>
  </div>
</div>`;
}

// ── PNG miniCardSVG ────────────────────────────────────────────────────────
// Canvas: mini card x=455 y=62 w=594 h=928.
// All positions computed from cw parameter (pixels, not cqw).
function miniCardSVG(card, cw, ch) {
  cw = cw || 130;
  ch = ch || Math.round(cw * 928 / 594);
  card = (typeof applyIF !== 'undefined') ? applyIF(card) : card;
  if (card.tier && card.tier.endsWith('-if')) return _miniCardSVGlegacy(card, cw, ch);

  const tier = card.tier || 'bronce-mate';
  const pngSrc = _PNG_MINI[tier] || _PNG_MINI['bronce-mate'];

  // Scale by whichever dimension is more constrained (width or height)
  const ch_natural = cw * 928 / 594;
  const eff = ch < ch_natural ? Math.round(ch * 594 / 928) : cw;
  const s = eff / 130;

  // PNG background positioning (based on effective width)
  const bgW  = Math.round(1498 * eff / 594);
  const bgX  = Math.round(-455 * eff / 594);
  const bgMT = Math.round(-62  * eff / 594);

  // Computed sizes
  const photoH  = Math.round(0.605 * ch);
  const photoR  = Math.round(9  * s);
  const imgSz   = Math.round(97  * s);
  const ovrFont = Math.round(38  * s);
  const ovrTop  = Math.round(18  * s);
  const ovrLeft = Math.round(8   * s);
  const posFont = Math.round(16  * s);
  const posTop  = Math.round(49  * s);
  const posLeft = Math.round(11  * s);
  const escSz   = Math.round(32  * s);
  const escTop  = Math.round(69  * s);
  const escLeft = Math.round(5.5 * s);
  const nomFont = Math.round(19  * s);
  const nomTop  = Math.round(0.610 * ch);
  const nomH    = Math.round(0.093 * ch);
  const badgeSz = Math.round(26  * s);
  const badgesTop    = Math.round(0.668 * ch);
  const badgesBottom = Math.round(0.04 * ch);
  const badgeMargin  = Math.round(3 * s);

  const txt = '#1a1000';

  // Photo
  const fotoHtml = card.foto
    ? `<div style="position:absolute;left:0;right:${photoR}px;top:0;height:${photoH}px;overflow:hidden;z-index:1;pointer-events:none;">
         <img src="${card.foto}" onerror="this.style.display='none'" loading="lazy" style="position:absolute;right:0;bottom:0;width:${imgSz}px;height:${imgSz}px;object-fit:contain;object-position:bottom center;">
       </div>`
    : '';

  // Escudo selección
  const escudoFile = ESCUDOS_SEL[card.seleccion];
  const escudoStyle = escudoFile ? (ESCUDOS_MINI_STYLE[card.seleccion] || '') : '';
  const escudoHtml = escudoFile
    ? `<div style="position:absolute;left:${escLeft}px;top:${escTop}px;width:${escSz}px;height:${escSz}px;display:flex;align-items:center;justify-content:center;z-index:3;">
         <img src="/assets/img/escudos/selecciones/${escudoFile}" onerror="this.style.display='none'" style="width:100%;height:100%;object-fit:contain;${escudoStyle}">
       </div>`
    : '';

  // Liga + club badges
  const _club = card.club || ((typeof JUGADOR_CLUB !== 'undefined') ? JUGADOR_CLUB[card.nombre] : null);
  const _ligaFile = _club && typeof CLUB_LIGA !== 'undefined' ? CLUB_LIGA[_club] : null;
  const _clubFile = _club && typeof CLUB_ESCUDO !== 'undefined' ? CLUB_ESCUDO[_club] : null;
  const _mkBadge = src =>
    `<div style="width:${badgeSz}px;height:${badgeSz}px;display:flex;align-items:center;justify-content:center;margin:0 ${badgeMargin}px;">
       <img src="${src}" onerror="this.style.display='none'" style="width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.5));">
     </div>`;
  const badgesHtml = (_ligaFile || _clubFile)
    ? `<div style="position:absolute;left:0;right:0;top:${badgesTop}px;bottom:${badgesBottom}px;display:flex;align-items:center;justify-content:center;z-index:3;">
         ${_ligaFile ? _mkBadge('/assets/img/escudos/ligas/' + _ligaFile) : ''}
         ${_clubFile ? _mkBadge('/assets/img/escudos/' + _clubFile) : ''}
       </div>`
    : '';

  const nombre = formatNombre(card.nombre || '');

  return `<div style="position:relative;width:${cw}px;height:${ch}px;overflow:hidden;">
  <img src="${pngSrc}" alt="" style="position:absolute;top:0;margin-top:${bgMT}px;left:${bgX}px;width:${bgW}px;height:auto;pointer-events:none;z-index:0;display:block;">
  ${fotoHtml}
  <div style="position:absolute;left:${ovrLeft}px;top:${ovrTop}px;font-family:'Bebas Neue',Impact,sans-serif;font-size:${ovrFont}px;color:${txt};line-height:1;z-index:3;text-shadow:1px 1px 0 rgba(0,0,0,0.25),0 2px 4px rgba(0,0,0,0.3);">${card.overall}</div>
  <div style="position:absolute;left:${posLeft}px;top:${posTop}px;font-family:'Bebas Neue',Impact,sans-serif;font-size:${posFont}px;color:${txt};line-height:1;letter-spacing:0;z-index:3;">${(card.posicion||card.posDraft||'').trim().replace(/[^A-Za-z]/g,'')}</div>
  ${escudoHtml}
  <div style="position:absolute;left:0;right:0;top:${nomTop}px;height:${nomH}px;display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed','Arial Narrow',sans-serif;font-size:${nomFont}px;font-weight:400;color:${txt};letter-spacing:-0.5px;z-index:3;">${nombre}</div>
  ${badgesHtml}
</div>`;
}
