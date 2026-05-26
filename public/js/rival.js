// rival.js — expone getNextRivalFlag(seleccion) como global
// seleccion: nombre en mayúsculas tal como está en jugadores.js (ej: "ESPAÑA", "FRANCIA")

(function(){
  var PARTIDOS = [
    {id:1,  fecha:"2026-06-11",hora:"19:00",local:"MEX",visit:"RSA"},
    {id:2,  fecha:"2026-06-12",hora:"02:00",local:"KOR",visit:"CZE"},
    {id:3,  fecha:"2026-06-18",hora:"16:00",local:"CZE",visit:"RSA"},
    {id:4,  fecha:"2026-06-19",hora:"01:00",local:"MEX",visit:"KOR"},
    {id:5,  fecha:"2026-06-25",hora:"01:00",local:"CZE",visit:"MEX"},
    {id:6,  fecha:"2026-06-25",hora:"01:00",local:"RSA",visit:"KOR"},
    {id:7,  fecha:"2026-06-12",hora:"19:00",local:"CAN",visit:"BIH"},
    {id:8,  fecha:"2026-06-13",hora:"19:00",local:"QAT",visit:"SUI"},
    {id:9,  fecha:"2026-06-18",hora:"19:00",local:"SUI",visit:"BIH"},
    {id:10, fecha:"2026-06-18",hora:"22:00",local:"CAN",visit:"QAT"},
    {id:11, fecha:"2026-06-24",hora:"19:00",local:"SUI",visit:"CAN"},
    {id:12, fecha:"2026-06-24",hora:"19:00",local:"BIH",visit:"QAT"},
    {id:13, fecha:"2026-06-13",hora:"22:00",local:"BRA",visit:"MAR"},
    {id:14, fecha:"2026-06-14",hora:"01:00",local:"HAI",visit:"SCO"},
    {id:15, fecha:"2026-06-19",hora:"22:00",local:"SCO",visit:"MAR"},
    {id:16, fecha:"2026-06-20",hora:"00:30",local:"BRA",visit:"HAI"},
    {id:17, fecha:"2026-06-24",hora:"22:00",local:"SCO",visit:"BRA"},
    {id:18, fecha:"2026-06-24",hora:"22:00",local:"MAR",visit:"HAI"},
    {id:19, fecha:"2026-06-12",hora:"13:00",local:"USA",visit:"PAR"},
    {id:20, fecha:"2026-06-13",hora:"16:00",local:"AUS",visit:"TUR"},
    {id:21, fecha:"2026-06-19",hora:"19:00",local:"USA",visit:"AUS"},
    {id:22, fecha:"2026-06-19",hora:"15:00",local:"TUR",visit:"PAR"},
    {id:23, fecha:"2026-06-25",hora:"14:00",local:"TUR",visit:"USA"},
    {id:24, fecha:"2026-06-25",hora:"14:00",local:"PAR",visit:"AUS"},
    {id:25, fecha:"2026-06-14",hora:"17:00",local:"GER",visit:"CUW"},
    {id:26, fecha:"2026-06-14",hora:"23:00",local:"CIV",visit:"ECU"},
    {id:27, fecha:"2026-06-20",hora:"20:00",local:"GER",visit:"CIV"},
    {id:28, fecha:"2026-06-20",hora:"23:00",local:"ECU",visit:"CUW"},
    {id:29, fecha:"2026-06-25",hora:"20:00",local:"CUW",visit:"CIV"},
    {id:30, fecha:"2026-06-25",hora:"20:00",local:"ECU",visit:"GER"},
    {id:31, fecha:"2026-06-14",hora:"15:00",local:"NED",visit:"JPN"},
    {id:32, fecha:"2026-06-14",hora:"20:00",local:"SWE",visit:"TUN"},
    {id:33, fecha:"2026-06-20",hora:"16:00",local:"NED",visit:"SWE"},
    {id:34, fecha:"2026-06-20",hora:"22:00",local:"TUN",visit:"JPN"},
    {id:35, fecha:"2026-06-25",hora:"22:00",local:"JPN",visit:"SWE"},
    {id:36, fecha:"2026-06-25",hora:"22:00",local:"TUN",visit:"NED"},
    {id:37, fecha:"2026-06-15",hora:"19:00",local:"BEL",visit:"EGY"},
    {id:38, fecha:"2026-06-15",hora:"23:00",local:"IRN",visit:"NZL"},
    {id:39, fecha:"2026-06-21",hora:"19:00",local:"BEL",visit:"IRN"},
    {id:40, fecha:"2026-06-21",hora:"23:00",local:"NZL",visit:"EGY"},
    {id:41, fecha:"2026-06-27",hora:"03:00",local:"EGY",visit:"IRN"},
    {id:42, fecha:"2026-06-27",hora:"03:00",local:"NZL",visit:"BEL"},
    {id:43, fecha:"2026-06-15",hora:"16:00",local:"ESP",visit:"CPV"},
    {id:44, fecha:"2026-06-15",hora:"22:00",local:"KSA",visit:"URU"},
    {id:45, fecha:"2026-06-21",hora:"16:00",local:"ESP",visit:"KSA"},
    {id:46, fecha:"2026-06-21",hora:"22:00",local:"URU",visit:"CPV"},
    {id:47, fecha:"2026-06-26",hora:"23:00",local:"CPV",visit:"KSA"},
    {id:48, fecha:"2026-06-26",hora:"23:00",local:"URU",visit:"ESP"},
    {id:49, fecha:"2026-06-16",hora:"19:00",local:"FRA",visit:"SEN"},
    {id:50, fecha:"2026-06-16",hora:"22:00",local:"IRQ",visit:"NOR"},
    {id:51, fecha:"2026-06-22",hora:"21:00",local:"FRA",visit:"IRQ"},
    {id:52, fecha:"2026-06-23",hora:"00:00",local:"NOR",visit:"SEN"},
    {id:53, fecha:"2026-06-26",hora:"19:00",local:"NOR",visit:"FRA"},
    {id:54, fecha:"2026-06-26",hora:"19:00",local:"SEN",visit:"IRQ"},
    {id:55, fecha:"2026-06-16",hora:"01:00",local:"ARG",visit:"ALG"},
    {id:56, fecha:"2026-06-16",hora:"02:00",local:"AUT",visit:"JOR"},
    {id:57, fecha:"2026-06-22",hora:"17:00",local:"ARG",visit:"AUT"},
    {id:58, fecha:"2026-06-23",hora:"01:00",local:"JOR",visit:"ALG"},
    {id:59, fecha:"2026-06-27",hora:"01:00",local:"ALG",visit:"AUT"},
    {id:60, fecha:"2026-06-27",hora:"01:00",local:"JOR",visit:"ARG"},
    {id:61, fecha:"2026-06-17",hora:"17:00",local:"POR",visit:"COD"},
    {id:62, fecha:"2026-06-18",hora:"02:00",local:"UZB",visit:"COL"},
    {id:63, fecha:"2026-06-23",hora:"16:00",local:"POR",visit:"UZB"},
    {id:64, fecha:"2026-06-24",hora:"02:00",local:"COL",visit:"COD"},
    {id:65, fecha:"2026-06-27",hora:"23:30",local:"COL",visit:"POR"},
    {id:66, fecha:"2026-06-27",hora:"23:30",local:"COD",visit:"UZB"},
    {id:67, fecha:"2026-06-17",hora:"20:00",local:"ENG",visit:"CRO"},
    {id:68, fecha:"2026-06-17",hora:"23:00",local:"GHA",visit:"PAN"},
    {id:69, fecha:"2026-06-23",hora:"20:00",local:"ENG",visit:"GHA"},
    {id:70, fecha:"2026-06-23",hora:"23:00",local:"PAN",visit:"CRO"},
    {id:71, fecha:"2026-06-27",hora:"21:00",local:"PAN",visit:"ENG"},
    {id:72, fecha:"2026-06-27",hora:"21:00",local:"CRO",visit:"GHA"}
  ];

  var SEL_CODE = {
    'MEXICO':'MEX','SUDAFRICA':'RSA','COREA DEL SUR':'KOR','REPUBLICA CHECA':'CZE',
    'CANADA':'CAN','BOSNIA Y HERZEGOVINA':'BIH','QATAR':'QAT','SUIZA':'SUI',
    'BRASIL':'BRA','MARRUECOS':'MAR','HAITI':'HAI','ESCOCIA':'SCO',
    'ESTADOS UNIDOS':'USA','PARAGUAY':'PAR','AUSTRALIA':'AUS','TURQUIA':'TUR',
    'ALEMANIA':'GER','CURAZAO':'CUW','COSTA DE MARFIL':'CIV','ECUADOR':'ECU',
    'PAISES BAJOS':'NED','JAPON':'JPN','SUECIA':'SWE','TUNEZ':'TUN',
    'BELGICA':'BEL','EGIPTO':'EGY','IRAN':'IRN','NUEVA ZELANDA':'NZL',
    'ESPA\u00d1A':'ESP','CABO VERDE':'CPV','ARABIA SAUDI':'KSA','URUGUAY':'URU',
    'FRANCIA':'FRA','SENEGAL':'SEN','IRAK':'IRQ','NORUEGA':'NOR',
    'ARGENTINA':'ARG','ARGELIA':'ALG','AUSTRIA':'AUT','JORDANIA':'JOR',
    'PORTUGAL':'POR','R.D. CONGO':'COD','UZBEKISTAN':'UZB','COLOMBIA':'COL',
    'INGLATERRA':'ENG','CROACIA':'CRO','GHANA':'GHA','PANAMA':'PAN'
  };

  var CODE_FLAG = {
    MEX:'\uD83C\uDDF2\uD83C\uDDFD', RSA:'\uD83C\uDDFF\uD83C\uDDE6',
    KOR:'\uD83C\uDDF0\uD83C\uDDF7', CZE:'\uD83C\uDDE8\uD83C\uDDFF',
    CAN:'\uD83C\uDDE8\uD83C\uDDE6', BIH:'\uD83C\uDDE7\uD83C\uDDE6',
    QAT:'\uD83C\uDDF6\uD83C\uDDE6', SUI:'\uD83C\uDDE8\uD83C\uDDED',
    BRA:'\uD83C\uDDE7\uD83C\uDDF7', MAR:'\uD83C\uDDF2\uD83C\uDDE6',
    HAI:'\uD83C\uDDED\uD83C\uDDF9',
    SCO:'\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74\uDB40\uDC7F',
    USA:'\uD83C\uDDFA\uD83C\uDDF8', PAR:'\uD83C\uDDF5\uD83C\uDDFE',
    AUS:'\uD83C\uDDE6\uD83C\uDDFA', TUR:'\uD83C\uDDF9\uD83C\uDDF7',
    GER:'\uD83C\uDDE9\uD83C\uDDEA', CUW:'\uD83C\uDDE8\uD83C\uDDFC',
    CIV:'\uD83C\uDDE8\uD83C\uDDEE', ECU:'\uD83C\uDDEA\uD83C\uDDE8',
    NED:'\uD83C\uDDF3\uD83C\uDDF1', JPN:'\uD83C\uDDEF\uD83C\uDDF5',
    SWE:'\uD83C\uDDF8\uD83C\uDDEA', TUN:'\uD83C\uDDF9\uD83C\uDDF3',
    BEL:'\uD83C\uDDE7\uD83C\uDDEA', EGY:'\uD83C\uDDEA\uD83C\uDDEC',
    IRN:'\uD83C\uDDEE\uD83C\uDDF7', NZL:'\uD83C\uDDF3\uD83C\uDDFF',
    ESP:'\uD83C\uDDEA\uD83C\uDDF8', CPV:'\uD83C\uDDE8\uD83C\uDDFB',
    KSA:'\uD83C\uDDF8\uD83C\uDDE6', URU:'\uD83C\uDDFA\uD83C\uDDFE',
    FRA:'\uD83C\uDDEB\uD83C\uDDF7', SEN:'\uD83C\uDDF8\uD83C\uDDF3',
    IRQ:'\uD83C\uDDEE\uD83C\uDDF6', NOR:'\uD83C\uDDF3\uD83C\uDDF4',
    ARG:'\uD83C\uDDE6\uD83C\uDDF7', ALG:'\uD83C\uDDE9\uD83C\uDDFF',
    AUT:'\uD83C\uDDE6\uD83C\uDDF9', JOR:'\uD83C\uDDEF\uD83C\uDDF4',
    POR:'\uD83C\uDDF5\uD83C\uDDF9', COD:'\uD83C\uDDE8\uD83C\uDDE9',
    UZB:'\uD83C\uDDFA\uD83C\uDDFF', COL:'\uD83C\uDDE8\uD83C\uDDF4',
    ENG:'\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F',
    CRO:'\uD83C\uDDED\uD83C\uDDF7', GHA:'\uD83C\uDDEC\uD83C\uDDED',
    PAN:'\uD83C\uDDF5\uD83C\uDDE6'
  };

  var CODE_ISO = {
    MEX:'mx', RSA:'za', KOR:'kr', CZE:'cz', CAN:'ca', BIH:'ba', QAT:'qa', SUI:'ch',
    BRA:'br', MAR:'ma', HAI:'ht', SCO:'gb-sct', USA:'us', PAR:'py', AUS:'au', TUR:'tr',
    GER:'de', CUW:'cw', CIV:'ci', ECU:'ec', NED:'nl', JPN:'jp', SWE:'se', TUN:'tn',
    BEL:'be', EGY:'eg', IRN:'ir', NZL:'nz', ESP:'es', CPV:'cv', KSA:'sa', URU:'uy',
    FRA:'fr', SEN:'sn', IRQ:'iq', NOR:'no', ARG:'ar', ALG:'dz', AUT:'at', JOR:'jo',
    POR:'pt', COD:'cd', UZB:'uz', COL:'co', ENG:'gb-eng', CRO:'hr', GHA:'gh', PAN:'pa'
  };

  window.getSelIso = function(sel) {
    var code = SEL_CODE[sel];
    return code ? (CODE_ISO[code] || null) : null;
  };

  window.getNextRivalIso = function(sel) {
    var code = SEL_CODE[sel];
    if (!code) return null;
    var now = new Date();
    var matches = PARTIDOS.filter(function(p){ return p.local===code || p.visit===code; });
    matches.sort(function(a,b){ return (a.fecha+' '+a.hora) < (b.fecha+' '+b.hora) ? -1 : 1; });
    var next = null;
    for (var i=0; i<matches.length; i++) {
      if (new Date(matches[i].fecha + 'T' + matches[i].hora + ':00Z') > now) { next = matches[i]; break; }
    }
    if (!next) next = matches[matches.length-1];
    if (!next) return null;
    var opp = next.local===code ? next.visit : next.local;
    return CODE_ISO[opp] || null;
  };

  window.getNextRivalFlag = function(sel) {
    var code = SEL_CODE[sel];
    if (!code) return '';
    var now = new Date();
    var matches = PARTIDOS.filter(function(p){ return p.local===code || p.visit===code; });
    matches.sort(function(a,b){
      var da = a.fecha+' '+a.hora, db = b.fecha+' '+b.hora;
      return da < db ? -1 : da > db ? 1 : 0;
    });
    var next = null;
    for (var i=0; i<matches.length; i++) {
      var dt = new Date(matches[i].fecha + 'T' + matches[i].hora + ':00Z');
      if (dt > now) { next = matches[i]; break; }
    }
    if (!next) next = matches[matches.length-1];
    if (!next) return '';
    var opp = next.local===code ? next.visit : next.local;
    return CODE_FLAG[opp] || '';
  };
})();
