(function () {
  var DATA = [
    {"id":"argentina","titulos":{"mundial":3,"confederaciones":1,"continentalSinNationsLeague":16,"jjooAbsolutos":0,"otros":3,"totalAjustado":23}},
    {"id":"brasil","titulos":{"mundial":5,"confederaciones":4,"continentalSinNationsLeague":9,"jjooAbsolutos":0,"otros":2,"totalAjustado":20}},
    {"id":"uruguay","titulos":{"mundial":2,"confederaciones":0,"continentalSinNationsLeague":15,"jjooAbsolutos":2,"otros":0,"totalAjustado":19}},
    {"id":"mexico","titulos":{"mundial":0,"confederaciones":1,"continentalSinNationsLeague":13,"jjooAbsolutos":0,"otros":0,"totalAjustado":14}},
    {"id":"alemania","titulos":{"mundial":4,"confederaciones":1,"continentalSinNationsLeague":3,"jjooAbsolutos":0,"otros":0,"totalAjustado":8}},
    {"id":"estados-unidos","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":7,"jjooAbsolutos":0,"otros":0,"totalAjustado":7}},
    {"id":"francia","titulos":{"mundial":2,"confederaciones":2,"continentalSinNationsLeague":2,"jjooAbsolutos":0,"otros":1,"totalAjustado":7}},
    {"id":"egipto","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":7,"jjooAbsolutos":0,"otros":0,"totalAjustado":7}},
    {"id":"japon","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":4,"jjooAbsolutos":0,"otros":3,"totalAjustado":7}},
    {"id":"nueva-zelanda","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":6,"jjooAbsolutos":0,"otros":0,"totalAjustado":6}},
    {"id":"espana","titulos":{"mundial":1,"confederaciones":0,"continentalSinNationsLeague":4,"jjooAbsolutos":0,"otros":0,"totalAjustado":5}},
    {"id":"australia","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":5,"jjooAbsolutos":0,"otros":0,"totalAjustado":5}},
    {"id":"ghana","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":4,"jjooAbsolutos":0,"otros":0,"totalAjustado":4}},
    {"id":"iran","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":3,"jjooAbsolutos":0,"otros":1,"totalAjustado":4}},
    {"id":"inglaterra","titulos":{"mundial":1,"confederaciones":0,"continentalSinNationsLeague":0,"jjooAbsolutos":2,"otros":0,"totalAjustado":3}},
    {"id":"arabia-saudi","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":3,"jjooAbsolutos":0,"otros":0,"totalAjustado":3}},
    {"id":"costa-de-marfil","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":3,"jjooAbsolutos":0,"otros":0,"totalAjustado":3}},
    {"id":"argelia","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":2,"jjooAbsolutos":0,"otros":1,"totalAjustado":3}},
    {"id":"corea-del-sur","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":2,"jjooAbsolutos":0,"otros":1,"totalAjustado":3}},
    {"id":"sudafrica","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":1,"jjooAbsolutos":0,"otros":1,"totalAjustado":2}},
    {"id":"rd-congo","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":2,"jjooAbsolutos":0,"otros":0,"totalAjustado":2}},
    {"id":"paraguay","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":2,"jjooAbsolutos":0,"otros":0,"totalAjustado":2}},
    {"id":"canada","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":2,"jjooAbsolutos":0,"otros":0,"totalAjustado":2}},
    {"id":"catar","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":2,"jjooAbsolutos":0,"otros":0,"totalAjustado":2}},
    {"id":"senegal","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":2,"jjooAbsolutos":0,"otros":0,"totalAjustado":2}},
    {"id":"portugal","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":1,"jjooAbsolutos":0,"otros":0,"totalAjustado":1}},
    {"id":"belgica","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":0,"jjooAbsolutos":1,"otros":0,"totalAjustado":1}},
    {"id":"suecia","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":0,"jjooAbsolutos":1,"otros":0,"totalAjustado":1}},
    {"id":"tunez","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":1,"jjooAbsolutos":0,"otros":0,"totalAjustado":1}},
    {"id":"marruecos","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":1,"jjooAbsolutos":0,"otros":0,"totalAjustado":1}},
    {"id":"haiti","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":1,"jjooAbsolutos":0,"otros":0,"totalAjustado":1}},
    {"id":"republica-checa","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":1,"jjooAbsolutos":0,"otros":0,"totalAjustado":1}},
    {"id":"paises-bajos","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":1,"jjooAbsolutos":0,"otros":0,"totalAjustado":1}},
    {"id":"colombia","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":1,"jjooAbsolutos":0,"otros":0,"totalAjustado":1}},
    {"id":"irak","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":1,"jjooAbsolutos":0,"otros":0,"totalAjustado":1}},
    {"id":"bosnia-y-herzegovina","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":0,"jjooAbsolutos":0,"otros":0,"totalAjustado":0}},
    {"id":"suiza","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":0,"jjooAbsolutos":0,"otros":0,"totalAjustado":0}},
    {"id":"cabo-verde","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":0,"jjooAbsolutos":0,"otros":0,"totalAjustado":0}},
    {"id":"curazao","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":0,"jjooAbsolutos":0,"otros":0,"totalAjustado":0}},
    {"id":"ecuador","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":0,"jjooAbsolutos":0,"otros":0,"totalAjustado":0}},
    {"id":"escocia","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":0,"jjooAbsolutos":0,"otros":0,"totalAjustado":0}},
    {"id":"turquia","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":0,"jjooAbsolutos":0,"otros":0,"totalAjustado":0}},
    {"id":"austria","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":0,"jjooAbsolutos":0,"otros":0,"totalAjustado":0}},
    {"id":"noruega","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":0,"jjooAbsolutos":0,"otros":0,"totalAjustado":0}},
    {"id":"jordania","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":0,"jjooAbsolutos":0,"otros":0,"totalAjustado":0}},
    {"id":"uzbekistan","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":0,"jjooAbsolutos":0,"otros":0,"totalAjustado":0}},
    {"id":"croacia","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":0,"jjooAbsolutos":0,"otros":0,"totalAjustado":0}},
    {"id":"panama","titulos":{"mundial":0,"confederaciones":0,"continentalSinNationsLeague":0,"jjooAbsolutos":0,"otros":0,"totalAjustado":0}}
  ];

  var IDX = {};
  DATA.forEach(function(d) { IDX[d.id] = d.titulos; });

  window.TITULOS2026 = {
    byId: function(id) { return IDX[id] || null; }
  };
})();
