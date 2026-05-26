#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

FOTOS_JS = r'C:\Users\Jepii\Desktop\la-pausa-mundial\public\js\fotos.js'

FOTOS_NUEVAS = [
    ('Raphinha',              'Raphinha.webp'),
    ('Mohammed Salah',        'Mohammed_Salah.webp'),
    ('William Saliba',        'William_Saliba.webp'),
    ("Lautaro Martínez", 'Lautaro_Martínez.webp'),
    ("Fabián Ruiz",      'Fabián_Ruiz.webp'),
    ('Frenkie De Jong',       'Frenkie_De_Jong.webp'),
    ("Rubén Dias",       'Rubén_Dias.webp'),
    ('Reece James',           'Reece_James.webp'),
    ('Mikel Merino',          'Mikel_Merino.webp'),
    ('Karim Adeyemi',         'Karim_Adeyemi.webp'),
    ("Bruno Guimarães",  'Bruno_Guimarães.webp'),
    ("Sadio Mané",        'Sadio_Mané.webp'),
    ('Jamal Musiala',         'Jamal_Musiala.webp'),
    ("Yan Diomandé",     'Yan_Diomandé.webp'),
    ("Gabriel Magalhães",'Gabriel_Magalhães.webp'),
    ("Lisandro Martínez", 'Lisandro_Martinez.webp'),
    ("Jules Koundé",     'Jules_Koundé.webp'),
    ('Nico Williams',         'Nico_Williams.webp'),
    ('Cristiano Ronaldo',     'Cristiano_Ronaldo.webp'),
    ("Aleksandar Pavlović",'Aleksandar_Pavlović.webp'),
    ('Bernardo Silva',        'Bernardo_Silva.webp'),
    ("Rafael Leão",      'Rafael_Leão.webp'),
    ("Éderson",           'ÉdersonMC.webp'),
    ('Diogo Costa',           'Diogo_Costa.webp'),
    ('Leandro Trossard',      'Leandro_Trossard.webp'),
    ("Lucas Paquetá",         'Lucas_Paquetá.webp'),
    ('Sofyan Amrabat',        'Sofyan_Amrabat.webp'),
    ('Vanderson',             'Vanderson.webp'),
    ('Rodrigo Bentancur',     'Rodrigo_Bentancur.webp'),
    ('Memphis Depay',         'Memphis_Depay.webp'),
    ('Giovani Lo Celso',      'Giovani_Lo_Celso.webp'),
    ('Nadiem Amiri',          'Nadiem_Amiri.webp'),
    ('Hans Vanaken',          'Hans_Vanaken.webp'),
    ('Bradley Barcola',       'Bradley_Barcola.webp'),
    ('Johan Bakayoko',        'Johan_Bakayoko.webp'),
    ('Eliesse Ben Seghir',    'Eliesse_Ben_Seghir.webp'),
    ('Lucas Beraldo',         'Lucas_Beraldo.webp'),
    ('Youssef En-Nesyri',     'Youssef_En-Nesyri.webp'),
    ("Manu Koné",         'Manu_Koné.webp'),
    ('Pablo Gavi',            'Pablo_Gavi.webp'),
    ('Wout Faes',             'Wout_Faes.webp'),
    ('Ilias Akhomach',        'Ilias_Akhomach.webp'),
    ('Craig Gordon',          'Craig_Gordon.webp'),
    ('Gonzalo Montiel',       'Gonzalo_Montiel.webp'),
]

with open(FOTOS_JS, encoding='utf-8') as f:
    text = f.read()

new_lines = []
skipped = []
for nombre, filename in FOTOS_NUEVAS:
    key = "'" + nombre + "'"
    if key in text:
        skipped.append(nombre)
        continue
    line = "  '" + nombre + "': _L + '" + filename + "',"
    new_lines.append(line)

if new_lines:
    block = '\n'.join(new_lines)
    # Insert before closing };
    closing = '\n};'
    idx = text.rfind(closing)
    if idx == -1:
        print('ERROR: closing }; not found')
        sys.exit(1)
    text = text[:idx] + ',\n' + block + text[idx:]
    with open(FOTOS_JS, 'w', encoding='utf-8') as f:
        f.write(text)
    print('OK fotos.js actualizado: +' + str(len(new_lines)) + ' entradas')
else:
    print('Nada que agregar (todo ya existe)')

if skipped:
    print('Ya existian: ' + ', '.join(skipped))
