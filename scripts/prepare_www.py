#!/usr/bin/env python3
"""把謎匣網頁版 (../mixia 或指定路徑) 複製進 www/，並加入 App 專用的觸控設定。
用法：python3 scripts/prepare_www.py [來源資料夾]
之後執行：npx cap sync ios
"""
import os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.path.join(ROOT, 'web')
WWW = os.path.join(ROOT, 'www')

APP_CSS = ('<style id="ios-app">html,body{-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;'
           'overscroll-behavior:none;-webkit-text-size-adjust:100%}'
           'img,svg,video{-webkit-user-drag:none;-webkit-touch-callout:none}</style>')

if os.path.exists(WWW):
    shutil.rmtree(WWW)
shutil.copytree(SRC, WWW, ignore=shutil.ignore_patterns('_*', '.*'))

n = 0
for d, _, files in os.walk(WWW):
    for f in files:
        if not f.endswith('.html'):
            continue
        p = os.path.join(d, f)
        s = open(p, encoding='utf8').read()
        if not s.lstrip().lower().startswith('<!doctype'):
            # 首頁在 Artifact 上是片段，App 裡要包成完整網頁並避開瀏海
            s = ('<!doctype html>\n<html lang="zh-Hant">\n<head>\n<meta charset="utf-8">\n'
                 '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
                 '<style>#app{box-sizing:border-box;padding-top:env(safe-area-inset-top,0px)}</style>\n'
                 + s.replace('<body>', '').replace('</body>', '') )
            first = s.find('<div id="app"')
            assert first > 0, p
            s = s[:first] + '</head>\n<body>\n' + s[first:] + '\n</body>\n</html>\n'
        if 'id="ios-app"' not in s:
            s = re.sub(r'</head>', APP_CSS + '\n</head>', s, count=1)
            open(p, 'w', encoding='utf8').write(s)
            n += 1
print(f'www ready: {n} pages patched from {SRC}')
