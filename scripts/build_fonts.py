#!/usr/bin/env python3
"""把謎匣用到的字型打包進 web/fonts/：每個字重只留遊戲裡出現過的字，合併成一個 woff2。
App 離線時也會顯示原本的恐怖字體，而且不用連 Google Fonts。

用法：
  npm i @fontsource/noto-sans-tc @fontsource/noto-serif-tc @fontsource/lxgw-wenkai-tc @fontsource/ibm-plex-mono
  pip install fonttools brotli
  python3 scripts/build_fonts.py node_modules/@fontsource
新增故事或改文字後重跑一次，再 commit web/fonts/。
"""
import glob, os, shutil, sys, tempfile
from fontTools.ttLib import TTFont
from fontTools import subset
from fontTools.merge import Merger

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WEB = os.path.join(ROOT, 'web')
OUT = os.path.join(WEB, 'fonts')
FS = sys.argv[1]

FACES = [('Noto Sans TC', 'noto-sans-tc', [400, 500, 700, 900]),
         ('Noto Serif TC', 'noto-serif-tc', [600, 900]),
         ('LXGW WenKai TC', 'lxgw-wenkai-tc', [400, 700]),
         ('IBM Plex Mono', 'ibm-plex-mono', [500, 600])]

used = set()
for p in glob.glob(os.path.join(WEB, '**', '*.*'), recursive=True):
    if p.endswith(('.html', '.js')) and os.sep + 'fonts' + os.sep not in p:
        used.update(ord(c) for c in open(p, encoding='utf8').read())
used |= set(range(0x20, 0x7f))  # 英數字一律保留

if os.path.exists(OUT):
    shutil.rmtree(OUT)
os.makedirs(OUT)
css, total = [], 0
with tempfile.TemporaryDirectory() as tmp:
    for name, slug, weights in FACES:
        for w in weights:
            parts = []
            for f in sorted(glob.glob(os.path.join(FS, slug, 'files', f'{slug}-*-{w}-normal.woff2'))):
                t = TTFont(f)
                need = used & set(t.getBestCmap())
                if not need:
                    continue
                opt = subset.Options(); opt.layout_features = ['*']; opt.notdef_outline = True
                s = subset.Subsetter(opt); s.populate(unicodes=need); s.subset(t)
                t.flavor = None
                out = os.path.join(tmp, f'{len(parts)}.ttf'); t.save(out); parts.append(out)
            font = TTFont(parts[0]) if len(parts) == 1 else Merger().merge(parts)
            font.flavor = 'woff2'
            fn = f'{slug}-{w}.woff2'
            font.save(os.path.join(OUT, fn))
            size = os.path.getsize(os.path.join(OUT, fn)); total += size
            css.append("@font-face{font-family:'%s';font-style:normal;font-weight:%d;font-display:swap;"
                       "src:url(./%s) format('woff2')}" % (name, w, fn))
            print(f'{fn}: {size/1e3:.0f} KB')
open(os.path.join(OUT, 'fonts.css'), 'w', encoding='utf8').write('\n'.join(css) + '\n')
print(f'{len(used)} chars -> {total/1e6:.2f} MB')
