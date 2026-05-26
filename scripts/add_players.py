#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Añade 44 jugadores nuevos a jugadores.js y fotos.js
"""
import json, re

JUGADORES_JS = r'C:\Users\Jepii\Desktop\la-pausa-mundial\public\js\jugadores.js'
FOTOS_JS = r'C:\Users\Jepii\Desktop\la-pausa-mundial\public\js\fotos.js'

# ─── Mapa fotos nuevas (nombre → filename.webp) ──────────────────────────────
FOTOS_NUEVAS = {
    'Raphinha':              'Raphinha.webp',
    'Mohammed Salah':        'Mohammed_Salah.webp',
    'William Saliba':        'William_Saliba.webp',
    'Lautaro Martínez':      'Lautaro_Martínez.webp',
    'Fabián Ruiz':           'Fabián_Ruiz.webp',
    'Frenkie De Jong':       'Frenkie_De_Jong.webp',
    'Rubén Dias':            'Rubén_Dias.webp',
    'Reece James':           'Reece_James.webp',
    'Mikel Merino':          'Mikel_Merino.webp',
    'Karim Adeyemi':         'Karim_Adeyemi.webp',
    'Bruno Guimarães':       'Bruno_Guimarães.webp',
    'Sadio Mané':            'Sadio_Mané.webp',
    'Jamal Musiala':         'Jamal_Musiala.webp',
    'Yan Diomandé':          'Yan_Diomandé.webp',
    'Gabriel Magalhães':     'Gabriel_Magalhães.webp',
    'Lisandro Martínez':     'Lisandro_Martinez.webp',
    'Jules Koundé':          'Jules_Koundé.webp',
    'Nico Williams':         'Nico_Williams.webp',
    'Cristiano Ronaldo':     'Cristiano_Ronaldo.webp',
    'Aleksandar Pavlović':   'Aleksandar_Pavlović.webp',
    'Bernardo Silva':        'Bernardo_Silva.webp',
    'Rafael Leão':           'Rafael_Leão.webp',
    'Éderson':               'ÉdersonMC.webp',
    'Diogo Costa':           'Diogo_Costa.webp',
    'Leandro Trossard':      'Leandro_Trossard.webp',
    'Lucas Paquetá':         'Lucas_Paquetá.webp',
    'Sofyan Amrabat':        'Sofyan_Amrabat.webp',
    'Vanderson':             'Vanderson.webp',
    'Rodrigo Bentancur':     'Rodrigo_Bentancur.webp',
    'Memphis Depay':         'Memphis_Depay.webp',
    'Giovani Lo Celso':      'Giovani_Lo_Celso.webp',
    'Nadiem Amiri':          'Nadiem_Amiri.webp',
    'Hans Vanaken':          'Hans_Vanaken.webp',
    'Bradley Barcola':       'Bradley_Barcola.webp',
    'Johan Bakayoko':        'Johan_Bakayoko.webp',
    'Eliesse Ben Seghir':    'Eliesse_Ben_Seghir.webp',
    'Lucas Beraldo':         'Lucas_Beraldo.webp',
    'Youssef En-Nesyri':     'Youssef_En-Nesyri.webp',
    'Manu Koné':             'Manu_Koné.webp',
    'Pablo Gavi':            'Pablo_Gavi.webp',
    'Wout Faes':             'Wout_Faes.webp',
    'Ilias Akhomach':        'Ilias_Akhomach.webp',
    'Craig Gordon':          'Craig_Gordon.webp',
    'Gonzalo Montiel':       'Gonzalo_Montiel.webp',
}

# ─── Jugadores nuevos por selección ──────────────────────────────────────────
# seleccion: nombre en JS (MAYÚSCULAS, sin acento)
NUEVOS = {
    'INGLATERRA': [
        {'nombre':'Reece James',    'pos':'Lateral derecho',   'club':'Chelsea FC',         'overall':84,'tier':'oro-brillante','posDraft':'DF'},
    ],
    'FRANCIA': [
        {'nombre':'William Saliba', 'pos':'Defensa central',   'club':'Arsenal FC',          'overall':86,'tier':'oro-brillante','posDraft':'DF'},
        {'nombre':'Bradley Barcola','pos':'Extremo izquierdo', 'club':'Paris Saint-Germain FC','overall':79,'tier':'oro-mate','posDraft':'DL'},
        {'nombre':'Manu Koné',      'pos':'Mediocentro',       'club':'AS Roma',             'overall':78,'tier':'oro-mate','posDraft':'MC'},
    ],
    'ESPANA': [
        {'nombre':'Fabián Ruiz',    'pos':'Mediocentro',       'club':'Paris Saint-Germain FC','overall':85,'tier':'oro-brillante','posDraft':'MC'},
        {'nombre':'Mikel Merino',   'pos':'Mediocentro',       'club':'Arsenal FC',          'overall':84,'tier':'oro-brillante','posDraft':'MC'},
        {'nombre':'Jules Koundé',   'pos':'Lateral derecho',   'club':'FC Barcelona',        'overall':82,'tier':'oro-brillante','posDraft':'DF'},
        {'nombre':'Nico Williams',  'pos':'Extremo izquierdo', 'club':'Athletic Club',       'overall':82,'tier':'oro-brillante','posDraft':'DL'},
        {'nombre':'Pablo Gavi',     'pos':'Mediocentro',       'club':'FC Barcelona',        'overall':78,'tier':'oro-mate','posDraft':'MC'},
    ],
    'PORTUGAL': [
        {'nombre':'Rubén Dias',     'pos':'Defensa central',   'club':'Manchester City',     'overall':85,'tier':'oro-brillante','posDraft':'DF'},
        {'nombre':'Cristiano Ronaldo','pos':'Delantero centro','club':'Al-Nassr FC',         'overall':82,'tier':'oro-brillante','posDraft':'DL'},
        {'nombre':'Bernardo Silva', 'pos':'Mediapunta',        'club':'Manchester City',     'overall':81,'tier':'oro-mate','posDraft':'MC'},
        {'nombre':'Rafael Leão',    'pos':'Extremo izquierdo', 'club':'AC Milan',            'overall':81,'tier':'oro-mate','posDraft':'DL'},
        {'nombre':'Diogo Costa',    'pos':'Portero',           'club':'FC Oporto',           'overall':81,'tier':'oro-brillante','posDraft':'PT'},
    ],
    'BRASIL': [
        {'nombre':'Raphinha',           'pos':'Extremo derecho',   'club':'FC Barcelona',        'overall':88,'tier':'oro-brillante','posDraft':'DL'},
        {'nombre':'Bruno Guimarães',    'pos':'Mediocentro',       'club':'Newcastle United',    'overall':83,'tier':'oro-brillante','posDraft':'MC'},
        {'nombre':'Gabriel Magalhães',  'pos':'Defensa central',   'club':'Arsenal FC',          'overall':83,'tier':'oro-brillante','posDraft':'DF'},
        {'nombre':'Éderson',            'pos':'Mediocentro',       'club':'Atalanta de Bergamo', 'overall':81,'tier':'oro-mate','posDraft':'MC'},
        {'nombre':'Lucas Paquetá',      'pos':'Mediocentro',       'club':'CR Flamengo',         'overall':81,'tier':'oro-brillante','posDraft':'MC'},
        {'nombre':'Vanderson',          'pos':'Lateral derecho',   'club':'AS Monaco',           'overall':80,'tier':'oro-brillante','posDraft':'DF'},
        {'nombre':'Lucas Beraldo',      'pos':'Defensa central',   'club':'Paris Saint-Germain FC','overall':78,'tier':'oro-mate','posDraft':'DF'},
    ],
    'ALEMANIA': [
        {'nombre':'Jamal Musiala',      'pos':'Mediocentro ofensivo','club':'Bayern Munich',     'overall':83,'tier':'oro-brillante','posDraft':'MC'},
        {'nombre':'Karim Adeyemi',      'pos':'Extremo izquierdo', 'club':'Borussia Dortmund',  'overall':84,'tier':'oro-brillante','posDraft':'DL'},
        {'nombre':'Aleksandar Pavlović','pos':'Mediocentro',       'club':'Bayern Munich',      'overall':82,'tier':'oro-brillante','posDraft':'MC'},
        {'nombre':'Nadiem Amiri',       'pos':'Mediocentro',       'club':'1.FSV Mainz 05',     'overall':80,'tier':'oro-mate','posDraft':'MC'},
    ],
    'PAISES BAJOS': [
        {'nombre':'Frenkie De Jong',    'pos':'Mediocentro',       'club':'FC Barcelona',        'overall':85,'tier':'oro-brillante','posDraft':'MC'},
        {'nombre':'Memphis Depay',      'pos':'Delantero centro',  'club':'SC Corinthians',      'overall':80,'tier':'oro-brillante','posDraft':'DL'},
    ],
    'ARGENTINA': [
        {'nombre':'Lautaro Martínez',   'pos':'Delantero centro',  'club':'Inter de Milan',      'overall':86,'tier':'oro-brillante','posDraft':'DL'},
        {'nombre':'Lisandro Martínez',  'pos':'Defensa central',   'club':'Manchester United',   'overall':82,'tier':'oro-brillante','posDraft':'DF'},
        {'nombre':'Giovani Lo Celso',   'pos':'Mediocentro',       'club':'Villarreal CF',       'overall':80,'tier':'oro-mate','posDraft':'MC'},
        {'nombre':'Gonzalo Montiel',    'pos':'Lateral derecho',   'club':'CA River Plate',      'overall':72,'tier':'plata-mate','posDraft':'DF'},
    ],
    'BELGICA': [
        {'nombre':'Leandro Trossard',   'pos':'Extremo izquierdo', 'club':'Arsenal FC',          'overall':81,'tier':'oro-brillante','posDraft':'DL'},
        {'nombre':'Hans Vanaken',       'pos':'Mediocentro',       'club':'Club Brugge',         'overall':79,'tier':'oro-brillante','posDraft':'MC'},
        {'nombre':'Johan Bakayoko',     'pos':'Extremo derecho',   'club':'RB Leipzig',          'overall':78,'tier':'oro-mate','posDraft':'DL'},
        {'nombre':'Wout Faes',          'pos':'Defensa central',   'club':'Leicester City',      'overall':77,'tier':'oro-mate','posDraft':'DF'},
    ],
    'SENEGAL': [
        {'nombre':'Sadio Mané',         'pos':'Extremo izquierdo', 'club':'Al-Nassr FC',         'overall':83,'tier':'oro-brillante','posDraft':'DL'},
    ],
    'MARRUECOS': [
        {'nombre':'Sofyan Amrabat',     'pos':'Mediocentro',       'club':'Real Betis Balompie', 'overall':80,'tier':'oro-brillante','posDraft':'MC'},
        {'nombre':'Eliesse Ben Seghir', 'pos':'Mediapunta',        'club':'AS Monaco',           'overall':78,'tier':'oro-brillante','posDraft':'MC'},
        {'nombre':'Youssef En-Nesyri',  'pos':'Delantero centro',  'club':'Fenerbahce',          'overall':78,'tier':'oro-mate','posDraft':'DL'},
        {'nombre':'Ilias Akhomach',     'pos':'Extremo derecho',   'club':'Rayo Vallecano',      'overall':77,'tier':'oro-mate','posDraft':'DL'},
    ],
    'COSTA DE MARFIL': [
        {'nombre':'Yan Diomandé',       'pos':'Delantero centro',  'club':'RB Leipzig',          'overall':83,'tier':'oro-brillante','posDraft':'DL'},
    ],
    'ESCOCIA': [
        {'nombre':'Craig Gordon',       'pos':'Portero',           'club':'Newcastle United',    'overall':76,'tier':'oro-brillante','posDraft':'PT'},
    ],
    'EGIPTO': [
        {'nombre':'Mohammed Salah',     'pos':'Extremo derecho',   'club':'Liverpool FC',        'overall':86,'tier':'oro-brillante','posDraft':'DL'},
    ],
    'URUGUAY': [
        {'nombre':'Rodrigo Bentancur',  'pos':'Mediocentro',       'club':'Tottenham Hotspur',   'overall':80,'tier':'oro-brillante','posDraft':'MC'},
    ],
}

def fmt_player(p):
    return (
        '      {\n'
        f'        "nombre": "{p["nombre"]}",\n'
        f'        "pos": "{p["pos"]}",\n'
        f'        "club": "{p["club"]}",\n'
        f'        "overall": {p["overall"]},\n'
        f'        "tier": "{p["tier"]}",\n'
        f'        "posDraft": "{p["posDraft"]}"\n'
        '      }'
    )

# ─── Modificar jugadores.js ──────────────────────────────────────────────────

with open(JUGADORES_JS, encoding='utf-8') as f:
    text = f.read()

# The seleccion keys in JS vs our dict keys:
# ESPAÑA → "ESPAÑA" in file, but searching as literal "ESPAÑA" in utf-8 text
# Let's normalise – the file is utf-8 so we'll find them as-is
SEL_MAP = {
    'ESPANA': 'ESPA\\u00d1A',   # jugadores.js stores it as literal \u escape
    'PAISES BAJOS': 'PAISES BAJOS',
}

def get_sel_str(key):
    return SEL_MAP.get(key, key)

for sel_key, players in NUEVOS.items():
    sel_str = get_sel_str(sel_key)
    # Find the seleccion block
    marker = f'"seleccion": "{sel_str}"'
    pos = text.find(marker)
    if pos == -1:
        print(f'  !! seleccion not found: {sel_str!r}')
        continue

    # Find the closing ]\n  }, (or ];\n for last)
    # Starting from after the marker, find '    ]\n'
    # The jugadores array closes with:  "    ]\n"  (4 spaces + ])
    search_start = pos
    bracket_pos = text.find('\n    ]\n', search_start)
    if bracket_pos == -1:
        print(f'  !! closing ] not found for {sel_str}')
        continue

    # The text at bracket_pos is:  \n    ]\n
    # We want to insert before \n    ]
    # i.e., after the last player's }
    # Current text at that position: ...      }\n    ]\n
    # We want:                       ...      },\n      {NEW}\n    ]\n

    # Find the last '      }' before bracket_pos
    last_brace = text.rfind('      }', search_start, bracket_pos)
    if last_brace == -1:
        print(f'  !! last }} not found for {sel_str}')
        continue

    # The last brace ends at last_brace + 7
    insertion_point = last_brace + 7  # right after '      }'

    new_player_text = ''
    for p in players:
        new_player_text += ',\n' + fmt_player(p)

    text = text[:insertion_point] + new_player_text + text[insertion_point:]
    print(f'  + {len(players)} jugador(es) -> {sel_str}')

with open(JUGADORES_JS, 'w', encoding='utf-8') as f:
    f.write(text)

print('  OK jugadores.js actualizado')

# ─── Modificar fotos.js ──────────────────────────────────────────────────────

with open(FOTOS_JS, encoding='utf-8') as f:
    fotos_text = f.read()

# Build the new entries string
L = "_L + '"
new_entries = ''
for nombre, filename in FOTOS_NUEVAS.items():
    # Skip if already present
    if f"'{nombre}'" in fotos_text:
        print(f'  ~ ya existe en fotos.js: {nombre}')
        continue
    new_entries += f"  '{nombre}': _L + '{filename}',\n"

# Insert before the closing };
closing = '\n};'
idx = fotos_text.rfind(closing)
if idx == -1:
    print('  !! closing }; not found in fotos.js')
else:
    fotos_text = fotos_text[:idx] + ',\n' + new_entries.rstrip(',\n') + fotos_text[idx:]

with open(FOTOS_JS, 'w', encoding='utf-8') as f:
    f.write(fotos_text)

print('  OK fotos.js actualizado')
print(f'  + {len(FOTOS_NUEVAS)} entradas de fotos')
