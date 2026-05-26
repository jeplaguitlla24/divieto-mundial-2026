(function () {
  var BASE = '/assets/img/escudos/selecciones/';
  var E = {
    'mexico':              'mexico national team.webp',
    'sudafrica':           'sudafrica national team.webp',
    'corea-del-sur':       'south-korea-national-team-footballlogos-org.webp',
    'republica-checa':     'republica checa national team.webp',
    'canada':              'canada-national-team-footballlogos-org.webp',
    'bosnia-y-herzegovina':'bosnia_herzegovina_national_team.webp',
    'catar':               'qatar-national-team-footballlogos-org.webp',
    'suiza':               'swiss-national-team-footballlogos-org.webp',
    'brasil':              'brazil-national-team-footballlogos-org.webp',
    'marruecos':           'marruecos national team.webp',
    'haiti':               'haiti-national-team-footylogos.webp',
    'escocia':             'scotland-national-team-footballlogos-org.webp',
    'estados-unidos':      'usa-national-team-footballlogos-org.webp',
    'paraguay':            'paraguay-national-team-footballlogos-org.webp',
    'australia':           'australia-national-team-footylogos.webp',
    'turquia':             'turquia national team.webp',
    'alemania':            'germany-national-team-footballlogos-org.webp',
    'curazao':             'curacao-national-team-footballlogos-org.webp',
    'costa-de-marfil':     'cote-d-ivoire-national-team-footballlogos-org.webp',
    'ecuador':             'ecuador-national-team-footballlogos-org.webp',
    'paises-bajos':        'netherlands-dutch-national-team-footballlogos-org.webp',
    'japon':               'japan-national-team-footballlogos-org.webp',
    'suecia':              'suecia national team.webp',
    'tunez':               'tunisia-national-team-footballlogos-org.webp',
    'belgica':             'belgium-national-team-footballlogos-org.webp',
    'egipto':              'egypt-national-team-footballlogos-org.webp',
    'iran':                'iran-national-team-footballlogos-org.webp',
    'nueva-zelanda':       'new-zealand-national-team-footballlogos-org.webp',
    'espana':              'spain-national-team-footballlogos-org.webp',
    'cabo-verde':          'cabo-verde-footballlogos-org.webp',
    'arabia-saudi':        'saudi-arabia-national-team-footballlogos-org.webp',
    'uruguay':             'uruguay-national-team-footballlogos-org.webp',
    'francia':             'france-national-team-footballlogos-org.webp',
    'senegal':             'senegal-national-team-footballlogos-org.webp',
    'irak':                'iraq national team.webp',
    'noruega':             'norway-national-team-footballlogos-org.webp',
    'argentina':           'argentina-national-team-footballlogos-org.webp',
    'argelia':             'algeria-national-team-footballlogos-org.webp',
    'austria':             'austria-national-team-footballlogos-org.webp',
    'jordania':            'jordan-footballlogos-org.webp',
    'portugal':            'portugal-national-team-footballlogos-org.webp',
    'rd-congo':            'congo national team.webp',
    'uzbekistan':          'uzbekistan-national-team-footballlogos-org.webp',
    'colombia':            'colombia-national-team-footballlogos-org.webp',
    'inglaterra':          'england-national-team-footballlogos-org.webp',
    'croacia':             'croatia-national-team-footballlogos-org.webp',
    'ghana':               'ghana-footballlogos-org.webp',
    'panama':              'panama national team.webp'
  };

  var TEAMS = [
    {"id":"mexico","nombre":"Mexico","nombreFIFA":"Mexico","grupo":"A","confederacion":"CONCACAF","clasificacion":"Anfitrion","anfitrion":true,"rankingHistorico":13,"mundiales":18,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":66,"partidosJugados":60,"ganados":17,"empatados":15,"perdidos":28,"golesFavor":62,"golesContra":101,"diferenciaGol":-39},
    {"id":"sudafrica","nombre":"Sudafrica","nombreFIFA":"South Africa","grupo":"A","confederacion":"CAF","clasificacion":"CAF directo","anfitrion":false,"rankingHistorico":49,"mundiales":4,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":10,"partidosJugados":9,"ganados":2,"empatados":4,"perdidos":3,"golesFavor":11,"golesContra":16,"diferenciaGol":-5},
    {"id":"corea-del-sur","nombre":"Corea del Sur","nombreFIFA":"Korea Republic","grupo":"A","confederacion":"AFC","clasificacion":"AFC directo","anfitrion":false,"rankingHistorico":26,"mundiales":12,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":31,"partidosJugados":38,"ganados":7,"empatados":10,"perdidos":21,"golesFavor":39,"golesContra":78,"diferenciaGol":-39},
    {"id":"republica-checa","nombre":"Republica Checa","nombreFIFA":"Czechia","grupo":"A","confederacion":"UEFA","clasificacion":"UEFA playoff","anfitrion":false,"rankingHistorico":20,"mundiales":10,"campeonatos":0,"subcampeonatos":2,"puntosHistoricos":41,"partidosJugados":33,"ganados":12,"empatados":5,"perdidos":16,"golesFavor":47,"golesContra":49,"diferenciaGol":-2},
    {"id":"canada","nombre":"Canada","nombreFIFA":"Canada","grupo":"B","confederacion":"CONCACAF","clasificacion":"Anfitrion","anfitrion":true,"rankingHistorico":81,"mundiales":3,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":0,"partidosJugados":6,"ganados":0,"empatados":0,"perdidos":6,"golesFavor":2,"golesContra":12,"diferenciaGol":-10},
    {"id":"bosnia-y-herzegovina","nombre":"Bosnia-Herzegovina","nombreFIFA":"Bosnia and Herzegovina","grupo":"B","confederacion":"UEFA","clasificacion":"UEFA playoff","anfitrion":false,"rankingHistorico":59,"mundiales":2,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":3,"partidosJugados":3,"ganados":1,"empatados":0,"perdidos":2,"golesFavor":4,"golesContra":4,"diferenciaGol":0},
    {"id":"catar","nombre":"Catar","nombreFIFA":"Qatar","grupo":"B","confederacion":"AFC","clasificacion":"AFC directo","anfitrion":false,"rankingHistorico":76,"mundiales":2,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":0,"partidosJugados":3,"ganados":0,"empatados":0,"perdidos":3,"golesFavor":1,"golesContra":7,"diferenciaGol":-6},
    {"id":"suiza","nombre":"Suiza","nombreFIFA":"Switzerland","grupo":"B","confederacion":"UEFA","clasificacion":"UEFA directo","anfitrion":false,"rankingHistorico":17,"mundiales":13,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":50,"partidosJugados":41,"ganados":14,"empatados":8,"perdidos":19,"golesFavor":55,"golesContra":73,"diferenciaGol":-18},
    {"id":"brasil","nombre":"Brasil","nombreFIFA":"Brazil","grupo":"C","confederacion":"CONMEBOL","clasificacion":"CONMEBOL directo","anfitrion":false,"rankingHistorico":1,"mundiales":23,"campeonatos":5,"subcampeonatos":2,"puntosHistoricos":247,"partidosJugados":114,"ganados":76,"empatados":19,"perdidos":19,"golesFavor":237,"golesContra":108,"diferenciaGol":129},
    {"id":"marruecos","nombre":"Marruecos","nombreFIFA":"Morocco","grupo":"C","confederacion":"CAF","clasificacion":"CAF directo","anfitrion":false,"rankingHistorico":32,"mundiales":7,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":22,"partidosJugados":23,"ganados":5,"empatados":7,"perdidos":11,"golesFavor":20,"golesContra":27,"diferenciaGol":-7},
    {"id":"haiti","nombre":"Haiti","nombreFIFA":"Haiti","grupo":"C","confederacion":"CONCACAF","clasificacion":"CONCACAF directo","anfitrion":false,"rankingHistorico":82,"mundiales":2,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":0,"partidosJugados":3,"ganados":0,"empatados":0,"perdidos":3,"golesFavor":2,"golesContra":14,"diferenciaGol":-12},
    {"id":"escocia","nombre":"Escocia","nombreFIFA":"Scotland","grupo":"C","confederacion":"UEFA","clasificacion":"UEFA directo","anfitrion":false,"rankingHistorico":34,"mundiales":9,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":19,"partidosJugados":23,"ganados":4,"empatados":7,"perdidos":12,"golesFavor":25,"golesContra":41,"diferenciaGol":-16},
    {"id":"estados-unidos","nombre":"Estados Unidos","nombreFIFA":"USA","grupo":"D","confederacion":"CONCACAF","clasificacion":"Anfitrion","anfitrion":true,"rankingHistorico":23,"mundiales":12,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":35,"partidosJugados":37,"ganados":9,"empatados":8,"perdidos":20,"golesFavor":40,"golesContra":66,"diferenciaGol":-26},
    {"id":"paraguay","nombre":"Paraguay","nombreFIFA":"Paraguay","grupo":"D","confederacion":"CONMEBOL","clasificacion":"CONMEBOL directo","anfitrion":false,"rankingHistorico":25,"mundiales":9,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":31,"partidosJugados":27,"ganados":7,"empatados":10,"perdidos":10,"golesFavor":30,"golesContra":38,"diferenciaGol":-8},
    {"id":"australia","nombre":"Australia","nombreFIFA":"Australia","grupo":"D","confederacion":"AFC","clasificacion":"AFC directo","anfitrion":false,"rankingHistorico":41,"mundiales":7,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":16,"partidosJugados":20,"ganados":4,"empatados":4,"perdidos":12,"golesFavor":17,"golesContra":37,"diferenciaGol":-20},
    {"id":"turquia","nombre":"Turquia","nombreFIFA":"Turkiye","grupo":"D","confederacion":"UEFA","clasificacion":"UEFA playoff","anfitrion":false,"rankingHistorico":40,"mundiales":3,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":16,"partidosJugados":10,"ganados":5,"empatados":1,"perdidos":4,"golesFavor":20,"golesContra":17,"diferenciaGol":3},
    {"id":"alemania","nombre":"Alemania","nombreFIFA":"Germany","grupo":"E","confederacion":"UEFA","clasificacion":"UEFA directo","anfitrion":false,"rankingHistorico":2,"mundiales":21,"campeonatos":4,"subcampeonatos":4,"puntosHistoricos":225,"partidosJugados":112,"ganados":68,"empatados":21,"perdidos":23,"golesFavor":232,"golesContra":130,"diferenciaGol":102},
    {"id":"curazao","nombre":"Curazao","nombreFIFA":"Curacao","grupo":"E","confederacion":"CONCACAF","clasificacion":"CONCACAF directo","anfitrion":false,"rankingHistorico":70,"mundiales":1,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":0,"partidosJugados":0,"ganados":0,"empatados":0,"perdidos":0,"golesFavor":0,"golesContra":0,"diferenciaGol":0},
    {"id":"costa-de-marfil","nombre":"Costa de Marfil","nombreFIFA":"Cote d'Ivoire","grupo":"E","confederacion":"CAF","clasificacion":"CAF directo","anfitrion":false,"rankingHistorico":48,"mundiales":4,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":10,"partidosJugados":9,"ganados":3,"empatados":1,"perdidos":5,"golesFavor":13,"golesContra":14,"diferenciaGol":-1},
    {"id":"ecuador","nombre":"Ecuador","nombreFIFA":"Ecuador","grupo":"E","confederacion":"CONMEBOL","clasificacion":"CONMEBOL directo","anfitrion":false,"rankingHistorico":38,"mundiales":5,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":17,"partidosJugados":13,"ganados":5,"empatados":2,"perdidos":6,"golesFavor":14,"golesContra":14,"diferenciaGol":0},
    {"id":"paises-bajos","nombre":"Paises Bajos","nombreFIFA":"Netherlands","grupo":"F","confederacion":"UEFA","clasificacion":"UEFA directo","anfitrion":false,"rankingHistorico":8,"mundiales":12,"campeonatos":0,"subcampeonatos":3,"puntosHistoricos":104,"partidosJugados":55,"ganados":30,"empatados":14,"perdidos":11,"golesFavor":96,"golesContra":52,"diferenciaGol":44},
    {"id":"japon","nombre":"Japon","nombreFIFA":"Japan","grupo":"F","confederacion":"AFC","clasificacion":"AFC directo","anfitrion":false,"rankingHistorico":29,"mundiales":8,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":27,"partidosJugados":25,"ganados":7,"empatados":6,"perdidos":12,"golesFavor":25,"golesContra":33,"diferenciaGol":-8},
    {"id":"suecia","nombre":"Suecia","nombreFIFA":"Sweden","grupo":"F","confederacion":"UEFA","clasificacion":"UEFA playoff","anfitrion":false,"rankingHistorico":11,"mundiales":13,"campeonatos":0,"subcampeonatos":1,"puntosHistoricos":70,"partidosJugados":51,"ganados":19,"empatados":13,"perdidos":19,"golesFavor":80,"golesContra":73,"diferenciaGol":7},
    {"id":"tunez","nombre":"Tunez","nombreFIFA":"Tunisia","grupo":"F","confederacion":"CAF","clasificacion":"CAF directo","anfitrion":false,"rankingHistorico":44,"mundiales":7,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":14,"partidosJugados":18,"ganados":3,"empatados":5,"perdidos":10,"golesFavor":14,"golesContra":26,"diferenciaGol":-12},
    {"id":"belgica","nombre":"Belgica","nombreFIFA":"Belgium","grupo":"G","confederacion":"UEFA","clasificacion":"UEFA directo","anfitrion":false,"rankingHistorico":10,"mundiales":15,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":73,"partidosJugados":51,"ganados":21,"empatados":10,"perdidos":20,"golesFavor":69,"golesContra":74,"diferenciaGol":-5},
    {"id":"egipto","nombre":"Egipto","nombreFIFA":"Egypt","grupo":"G","confederacion":"CAF","clasificacion":"CAF directo","anfitrion":false,"rankingHistorico":65,"mundiales":4,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":2,"partidosJugados":7,"ganados":0,"empatados":2,"perdidos":5,"golesFavor":5,"golesContra":12,"diferenciaGol":-7},
    {"id":"iran","nombre":"Iran","nombreFIFA":"IR Iran","grupo":"G","confederacion":"AFC","clasificacion":"AFC directo","anfitrion":false,"rankingHistorico":46,"mundiales":7,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":13,"partidosJugados":18,"ganados":3,"empatados":4,"perdidos":11,"golesFavor":13,"golesContra":31,"diferenciaGol":-18},
    {"id":"nueva-zelanda","nombre":"Nueva Zelanda","nombreFIFA":"New Zealand","grupo":"G","confederacion":"OFC","clasificacion":"OFC directo","anfitrion":false,"rankingHistorico":61,"mundiales":3,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":3,"partidosJugados":6,"ganados":0,"empatados":3,"perdidos":3,"golesFavor":4,"golesContra":14,"diferenciaGol":-10},
    {"id":"espana","nombre":"Espana","nombreFIFA":"Spain","grupo":"H","confederacion":"UEFA","clasificacion":"UEFA directo","anfitrion":false,"rankingHistorico":7,"mundiales":17,"campeonatos":1,"subcampeonatos":0,"puntosHistoricos":110,"partidosJugados":67,"ganados":31,"empatados":17,"perdidos":19,"golesFavor":108,"golesContra":75,"diferenciaGol":33},
    {"id":"cabo-verde","nombre":"Cabo Verde","nombreFIFA":"Cabo Verde","grupo":"H","confederacion":"CAF","clasificacion":"CAF directo","anfitrion":false,"rankingHistorico":70,"mundiales":1,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":0,"partidosJugados":0,"ganados":0,"empatados":0,"perdidos":0,"golesFavor":0,"golesContra":0,"diferenciaGol":0},
    {"id":"arabia-saudi","nombre":"Arabia Saudita","nombreFIFA":"Saudi Arabia","grupo":"H","confederacion":"AFC","clasificacion":"AFC directo","anfitrion":false,"rankingHistorico":45,"mundiales":7,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":14,"partidosJugados":19,"ganados":4,"empatados":2,"perdidos":13,"golesFavor":14,"golesContra":44,"diferenciaGol":-30},
    {"id":"uruguay","nombre":"Uruguay","nombreFIFA":"Uruguay","grupo":"H","confederacion":"CONMEBOL","clasificacion":"CONMEBOL directo","anfitrion":false,"rankingHistorico":9,"mundiales":15,"campeonatos":2,"subcampeonatos":0,"puntosHistoricos":88,"partidosJugados":59,"ganados":25,"empatados":13,"perdidos":21,"golesFavor":89,"golesContra":76,"diferenciaGol":13},
    {"id":"francia","nombre":"Francia","nombreFIFA":"France","grupo":"I","confederacion":"UEFA","clasificacion":"UEFA directo","anfitrion":false,"rankingHistorico":5,"mundiales":17,"campeonatos":2,"subcampeonatos":2,"puntosHistoricos":131,"partidosJugados":73,"ganados":39,"empatados":14,"perdidos":20,"golesFavor":136,"golesContra":85,"diferenciaGol":51},
    {"id":"senegal","nombre":"Senegal","nombreFIFA":"Senegal","grupo":"I","confederacion":"CAF","clasificacion":"CAF directo","anfitrion":false,"rankingHistorico":35,"mundiales":4,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":18,"partidosJugados":12,"ganados":5,"empatados":3,"perdidos":4,"golesFavor":16,"golesContra":17,"diferenciaGol":-1},
    {"id":"irak","nombre":"Irak","nombreFIFA":"Iraq","grupo":"I","confederacion":"AFC","clasificacion":"FIFA playoff intercontinental","anfitrion":false,"rankingHistorico":74,"mundiales":2,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":0,"partidosJugados":3,"ganados":0,"empatados":0,"perdidos":3,"golesFavor":1,"golesContra":4,"diferenciaGol":-3},
    {"id":"noruega","nombre":"Noruega","nombreFIFA":"Norway","grupo":"I","confederacion":"UEFA","clasificacion":"UEFA directo","anfitrion":false,"rankingHistorico":50,"mundiales":4,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":9,"partidosJugados":8,"ganados":2,"empatados":3,"perdidos":3,"golesFavor":7,"golesContra":8,"diferenciaGol":-1},
    {"id":"argentina","nombre":"Argentina","nombreFIFA":"Argentina","grupo":"J","confederacion":"CONMEBOL","clasificacion":"CONMEBOL directo","anfitrion":false,"rankingHistorico":3,"mundiales":19,"campeonatos":3,"subcampeonatos":3,"puntosHistoricos":158,"partidosJugados":88,"ganados":47,"empatados":17,"perdidos":24,"golesFavor":152,"golesContra":101,"diferenciaGol":51},
    {"id":"argelia","nombre":"Argelia","nombreFIFA":"Algeria","grupo":"J","confederacion":"CAF","clasificacion":"CAF directo","anfitrion":false,"rankingHistorico":47,"mundiales":5,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":12,"partidosJugados":13,"ganados":3,"empatados":3,"perdidos":7,"golesFavor":13,"golesContra":19,"diferenciaGol":-6},
    {"id":"austria","nombre":"Austria","nombreFIFA":"Austria","grupo":"J","confederacion":"UEFA","clasificacion":"UEFA directo","anfitrion":false,"rankingHistorico":21,"mundiales":9,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":40,"partidosJugados":29,"ganados":12,"empatados":4,"perdidos":13,"golesFavor":43,"golesContra":47,"diferenciaGol":-4},
    {"id":"jordania","nombre":"Jordania","nombreFIFA":"Jordan","grupo":"J","confederacion":"AFC","clasificacion":"AFC directo","anfitrion":false,"rankingHistorico":70,"mundiales":1,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":0,"partidosJugados":0,"ganados":0,"empatados":0,"perdidos":0,"golesFavor":0,"golesContra":0,"diferenciaGol":0},
    {"id":"portugal","nombre":"Portugal","nombreFIFA":"Portugal","grupo":"K","confederacion":"UEFA","clasificacion":"UEFA directo","anfitrion":false,"rankingHistorico":15,"mundiales":9,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":57,"partidosJugados":35,"ganados":17,"empatados":6,"perdidos":12,"golesFavor":61,"golesContra":41,"diferenciaGol":20},
    {"id":"rd-congo","nombre":"RD Congo","nombreFIFA":"Congo DR","grupo":"K","confederacion":"CAF","clasificacion":"FIFA playoff intercontinental","anfitrion":false,"rankingHistorico":83,"mundiales":2,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":0,"partidosJugados":3,"ganados":0,"empatados":0,"perdidos":3,"golesFavor":0,"golesContra":14,"diferenciaGol":-14},
    {"id":"uzbekistan","nombre":"Uzbekistan","nombreFIFA":"Uzbekistan","grupo":"K","confederacion":"AFC","clasificacion":"AFC directo","anfitrion":false,"rankingHistorico":70,"mundiales":1,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":0,"partidosJugados":0,"ganados":0,"empatados":0,"perdidos":0,"golesFavor":0,"golesContra":0,"diferenciaGol":0},
    {"id":"colombia","nombre":"Colombia","nombreFIFA":"Colombia","grupo":"K","confederacion":"CONMEBOL","clasificacion":"CONMEBOL directo","anfitrion":false,"rankingHistorico":27,"mundiales":7,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":30,"partidosJugados":22,"ganados":9,"empatados":3,"perdidos":10,"golesFavor":32,"golesContra":30,"diferenciaGol":2},
    {"id":"inglaterra","nombre":"Inglaterra","nombreFIFA":"England","grupo":"L","confederacion":"UEFA","clasificacion":"UEFA directo","anfitrion":false,"rankingHistorico":6,"mundiales":17,"campeonatos":1,"subcampeonatos":0,"puntosHistoricos":118,"partidosJugados":74,"ganados":32,"empatados":22,"perdidos":20,"golesFavor":104,"golesContra":68,"diferenciaGol":36},
    {"id":"croacia","nombre":"Croacia","nombreFIFA":"Croatia","grupo":"L","confederacion":"UEFA","clasificacion":"UEFA directo","anfitrion":false,"rankingHistorico":19,"mundiales":7,"campeonatos":0,"subcampeonatos":1,"puntosHistoricos":47,"partidosJugados":30,"ganados":13,"empatados":8,"perdidos":9,"golesFavor":43,"golesContra":33,"diferenciaGol":10},
    {"id":"ghana","nombre":"Ghana","nombreFIFA":"Ghana","grupo":"L","confederacion":"CAF","clasificacion":"CAF directo","anfitrion":false,"rankingHistorico":36,"mundiales":5,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":18,"partidosJugados":15,"ganados":5,"empatados":3,"perdidos":7,"golesFavor":18,"golesContra":23,"diferenciaGol":-5},
    {"id":"panama","nombre":"Panama","nombreFIFA":"Panama","grupo":"L","confederacion":"CONCACAF","clasificacion":"CONCACAF directo","anfitrion":false,"rankingHistorico":78,"mundiales":2,"campeonatos":0,"subcampeonatos":0,"puntosHistoricos":0,"partidosJugados":3,"ganados":0,"empatados":0,"perdidos":3,"golesFavor":2,"golesContra":11,"diferenciaGol":-9}
  ];

  // Años en que cada selección ganó la Copa del Mundo
  var MUNDIAL_YEARS = {
    'brasil':    [1958, 1962, 1970, 1994, 2002],
    'alemania':  [1954, 1974, 1990, 2014],
    'argentina': [1978, 1986, 2022],
    'uruguay':   [1930, 1950],
    'francia':   [1998, 2018],
    'inglaterra':[1966],
    'espana':    [2010]
  };

  // Maps grupos.js `s` key → SEL26 team id
  var S_TO_ID = {
    'MEXICO':'mexico',               'SUDAFRICA':'sudafrica',
    'COREA DEL SUR':'corea-del-sur', 'REPUBLICA CHECA':'republica-checa',
    'CANADA':'canada',               'BOSNIA Y HERZEGOVINA':'bosnia-y-herzegovina',
    'QATAR':'catar',                 'SUIZA':'suiza',
    'BRASIL':'brasil',               'MARRUECOS':'marruecos',
    'HAITI':'haiti',                 'ESCOCIA':'escocia',
    'ESTADOS UNIDOS':'estados-unidos','PARAGUAY':'paraguay',
    'AUSTRALIA':'australia',         'TURQUIA':'turquia',
    'ALEMANIA':'alemania',           'CURAZAO':'curazao',
    'COSTA DE MARFIL':'costa-de-marfil','ECUADOR':'ecuador',
    'PAISES BAJOS':'paises-bajos',   'JAPON':'japon',
    'SUECIA':'suecia',               'TUNEZ':'tunez',
    'BELGICA':'belgica',             'EGIPTO':'egipto',
    'IRAN':'iran',                   'NUEVA ZELANDA':'nueva-zelanda',
    'ESPAÑA':'espana',          'CABO VERDE':'cabo-verde',
    'ARABIA SAUDI':'arabia-saudi',   'URUGUAY':'uruguay',
    'FRANCIA':'francia',             'SENEGAL':'senegal',
    'IRAK':'irak',                   'NORUEGA':'noruega',
    'ARGENTINA':'argentina',         'ARGELIA':'argelia',
    'AUSTRIA':'austria',             'JORDANIA':'jordania',
    'PORTUGAL':'portugal',           'R.D. CONGO':'rd-congo',
    'UZBEKISTAN':'uzbekistan',       'COLOMBIA':'colombia',
    'INGLATERRA':'inglaterra',       'CROACIA':'croacia',
    'GHANA':'ghana',                 'PANAMA':'panama'
  };

  var idIndex = {};
  TEAMS.forEach(function(t) { idIndex[t.id] = t; });

  window.SEL26 = {
    teams: TEAMS,
    escudoUrl: function (id) {
      var f = E[id];
      return f ? BASE + encodeURIComponent(f) : '';
    },
    byS: function (s) {
      var id = S_TO_ID[s];
      if (!id) return null;
      var t = idIndex[id];
      if (!t) return null;
      // Attach mundialYears if available
      var years = MUNDIAL_YEARS[id] || null;
      return years ? Object.assign({}, t, { mundialYears: years }) : t;
    }
  };
})();
