#!/usr/bin/env python3
import os

files = [
    r'C:\Users\Jepii\Desktop\la-pausa-mundial\public\app\equipos\index.html',
    r'C:\Users\Jepii\Desktop\la-pausa-mundial\public\app\equipo\index.html',
    r'C:\Users\Jepii\Desktop\la-pausa-mundial\public\app\slides\index.html',
    r'C:\Users\Jepii\Desktop\la-pausa-mundial\public\app\analisis\index.html',
    r'C:\Users\Jepii\Desktop\la-pausa-mundial\public\app\draft\index.html',
    r'C:\Users\Jepii\Desktop\la-pausa-mundial\public\app\draft-ipad\index.html',
]

for f in files:
    with open(f, encoding='utf-8') as fh:
        text = fh.read()
    new = text.replace('jugadores.js?v=5', 'jugadores.js?v=6')
    if new != text:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(new)
        print('OK ' + os.path.basename(os.path.dirname(f)) + '/index.html')
    else:
        print('NO CHANGE ' + f)
