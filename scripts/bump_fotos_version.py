#!/usr/bin/env python3
import os

files_v48 = [
    r'C:\Users\Jepii\Desktop\la-pausa-mundial\public\app\analisis\index.html',
    r'C:\Users\Jepii\Desktop\la-pausa-mundial\public\app\draft\index.html',
    r'C:\Users\Jepii\Desktop\la-pausa-mundial\public\app\equipo\index.html',
    r'C:\Users\Jepii\Desktop\la-pausa-mundial\public\app\draft-ipad\index.html',
    r'C:\Users\Jepii\Desktop\la-pausa-mundial\public\app\slides\index.html',
    r'C:\Users\Jepii\Desktop\la-pausa-mundial\public\app\jornada\index.html',
]

for f in files_v48:
    with open(f, encoding='utf-8') as fh:
        text = fh.read()
    new = text.replace('fotos.js?v=48', 'fotos.js?v=49')
    if new != text:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(new)
        print('OK ' + os.path.basename(os.path.dirname(f)) + '/index.html')
    else:
        print('NO CHANGE ' + f)
