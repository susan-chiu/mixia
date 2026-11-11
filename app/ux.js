/* 謎匣 1.1：設定（驚嚇強度／震動／字體／限時加長）、新手引導、進度備份。App 專用，由 prepare_www.py 載入每一頁。 */
(function () {
  'use strict';
  var KEY = 'mixia_settings';
  var cap = window.Capacitor;
  var native = !!(cap && cap.isNativePlatform && cap.isNativePlatform());
  var isHome = !/\/g\/[^/]+\.html/.test(location.pathname);
  var SLOW = 1.8;

  function load() { try { return Object.assign({ scare: 'full', haptics: true, font: 0, slow: false }, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { return { scare: 'full', haptics: true, font: 0, slow: false }; } }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  var S = load();
  window.__mixiaSettings = function () { return S; };

  /* ---------- 進度備份：localStorage 被系統清掉時，從手機正式儲存區還原 ---------- */
  var Pref = native && cap.Plugins && cap.Plugins.Preferences;
  var BK = 'mixia_backup', timer = null;
  function snapshot() { var o = {}; for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); o[k] = localStorage.getItem(k); } return o; }
  function backupNow() { if (!Pref) return; try { Pref.set({ key: BK, value: JSON.stringify(snapshot()) }); } catch (e) {} }
  function backupSoon() { if (!Pref) return; clearTimeout(timer); timer = setTimeout(backupNow, 800); }
  if (Pref) {
    var empty = localStorage.length === 0;
    try {
      Pref.get({ key: BK }).then(function (r) {
        if (!r || !r.value) return;
        var data = JSON.parse(r.value), keys = Object.keys(data);
        if (empty && keys.length && !sessionStorage.getItem('ux_restored')) {
          keys.forEach(function (k) { localStorage.setItem(k, data[k]); });
          sessionStorage.setItem('ux_restored', '1');
          location.reload();
        }
      }).catch(function () {});
    } catch (e) {}
    var set0 = Storage.prototype.setItem, rem0 = Storage.prototype.removeItem;
    Storage.prototype.setItem = function () { var r = set0.apply(this, arguments); if (this === window.localStorage) backupSoon(); return r; };
    Storage.prototype.removeItem = function () { var r = rem0.apply(this, arguments); if (this === window.localStorage) backupSoon(); return r; };
    document.addEventListener('visibilitychange', function () { if (document.hidden) backupNow(); });
    window.addEventListener('pagehide', backupNow);
  }

  /* ---------- 套用設定 ---------- */
  function applyFont() {
    var h = document.documentElement.classList;
    h.toggle('ux-f1', S.font === 1); h.toggle('ux-f2', S.font === 2);
  }
  function applyScare() { document.documentElement.classList.toggle('ux-soft', S.scare === 'soft'); }
  function walk(o, fn, depth) { if (!o || typeof o !== 'object' || depth > 6) return; if (Array.isArray(o)) { o.forEach(function (x) { walk(x, fn, depth + 1); }); return; } fn(o); for (var k in o) if (o[k] && typeof o[k] === 'object') walk(o[k], fn, depth + 1); }
  function applyTimers() {
    var sc; try { sc = (0, eval)('typeof SCRIPT!=="undefined"?SCRIPT:null'); } catch (e) { sc = null; }
    if (!sc) return;
    walk(sc, function (st) {
      if (typeof st.timer === 'number' && st.timer > 0 && (st.options || st.timeoutDie)) {
        if (st._t0 == null) st._t0 = st.timer;
        st.timer = S.slow ? Math.round(st._t0 * SLOW) : st._t0;
      }
    }, 0);
  }
  function applyAll() { applyFont(); applyScare(); applyTimers(); }
  applyFont(); applyScare();

  /* ---------- 樣式 ---------- */
  var css = document.createElement('style');
  css.textContent =
    'html.ux-f1 #stage{-webkit-text-size-adjust:112%!important;text-size-adjust:112%!important}' +
    'html.ux-f2 #stage{-webkit-text-size-adjust:125%!important;text-size-adjust:125%!important}' +
    '@keyframes uxsoft{0%{opacity:0}45%{opacity:.5}100%{opacity:0}}' +
    'html.ux-soft .jump{animation-name:uxsoft!important;animation-duration:2.8s!important}' +
    '.ux-ov{position:fixed;inset:0;z-index:200;background:rgba(6,5,10,.78);display:flex;align-items:flex-end;justify-content:center;font-family:"Noto Sans TC","PingFang TC",sans-serif;color:#e9e4ee}' +
    '.ux-ov.mid{align-items:center}' +
    '.ux-sheet{width:100%;max-width:520px;box-sizing:border-box;background:#1a1726;border:1px solid #342d48;border-radius:18px 18px 0 0;padding:20px 20px calc(20px + env(safe-area-inset-bottom,0px));max-height:88vh;overflow:auto}' +
    '.ux-ov.mid .ux-sheet{border-radius:18px;margin:0 16px;width:auto;flex:1;padding-bottom:20px}' +
    '.ux-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}' +
    '.ux-h b{font-family:"Noto Serif TC",serif;font-weight:900;font-size:20px;letter-spacing:.1em}' +
    '.ux-x{min-width:44px;min-height:44px;border:0;background:none;color:#9a93ad;font-size:22px}' +
    '.ux-row{padding:14px 0;border-top:1px solid #2a2440}' +
    '.ux-row label{display:block;font-size:15px;font-weight:700;margin-bottom:4px}' +
    '.ux-row small{display:block;color:#9a93ad;font-size:12.5px;line-height:1.6;margin-bottom:10px}' +
    '.ux-seg{display:flex;gap:8px}' +
    '.ux-seg button{flex:1;min-height:44px;border-radius:10px;border:1px solid #342d48;background:#14111e;color:#e9e4ee;font-size:14px;font-family:inherit}' +
    '.ux-seg button[aria-pressed=true]{background:#f2ab4c;border-color:#f2ab4c;color:#24180f;font-weight:700}' +
    '.ux-link{margin-top:6px;min-height:44px;width:100%;border:1px dashed #342d48;border-radius:10px;background:none;color:#9a93ad;font-size:14px;font-family:inherit}' +
    '.ux-gear{display:grid;place-items:center;min-width:44px;min-height:44px;border:1px solid rgba(255,255,255,.18);background:rgba(12,10,18,.55);border-radius:8px;color:#e9e4ee;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}' +
    '.ux-ob{text-align:center;padding:10px 4px 0}' +
    '.ux-ob .no{font-family:"IBM Plex Mono",monospace;font-size:12px;letter-spacing:.3em;color:#f2ab4c}' +
    '.ux-ob h2{font-family:"Noto Serif TC",serif;font-weight:900;font-size:24px;letter-spacing:.08em;margin:10px 0 12px}' +
    '.ux-ob p{color:#cfc8dc;font-size:15px;line-height:1.9;margin:0 0 8px}' +
    '.ux-ob p b{color:#f2ab4c}' +
    '.ux-dots{display:flex;gap:6px;justify-content:center;margin:16px 0}' +
    '.ux-dots i{width:7px;height:7px;border-radius:50%;background:#342d48}.ux-dots i.on{background:#f2ab4c}' +
    '.ux-go{width:100%;min-height:48px;border:0;border-radius:12px;background:#f2ab4c;color:#24180f;font-weight:700;font-size:16px;font-family:inherit}' +
    '.ux-skip{width:100%;min-height:44px;border:0;background:none;color:#9a93ad;font-size:13px;font-family:inherit;margin-top:4px}' +
    '.ux-tip{position:fixed;left:16px;right:16px;bottom:calc(20px + env(safe-area-inset-bottom,0px));z-index:210;background:#1a1726;border:1px solid #f2ab4c;border-radius:14px;padding:14px 16px;color:#e9e4ee;font-family:"Noto Sans TC","PingFang TC",sans-serif;font-size:14px;line-height:1.7;box-shadow:0 10px 40px rgba(0,0,0,.6)}' +
    '.ux-tip div{display:flex;gap:8px;margin-top:10px}.ux-tip button{flex:1;min-height:44px;border-radius:10px;border:1px solid #342d48;background:#14111e;color:#e9e4ee;font-family:inherit;font-size:14px}' +
    '.ux-tip button.y{background:#f2ab4c;border-color:#f2ab4c;color:#24180f;font-weight:700}';
  (document.head || document.documentElement).appendChild(css);

  /* ---------- 設定面板 ---------- */
  function seg(name, opts, cur) {
    return '<div class="ux-seg" data-k="' + name + '">' + opts.map(function (o) { return '<button type="button" data-v="' + o[0] + '" aria-pressed="' + (String(cur) === String(o[0])) + '">' + o[1] + '</button>'; }).join('') + '</div>';
  }
  function openSettings() {
    if (document.querySelector('.ux-ov')) return;
    var ov = document.createElement('div'); ov.className = 'ux-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', '設定');
    function draw() {
      ov.innerHTML = '<div class="ux-sheet"><div class="ux-h"><b>設定</b><button class="ux-x" aria-label="關閉">✕</button></div>' +
        '<div class="ux-row"><label>驚嚇畫面</label><small>溫和模式：突然跳出來的畫面改成慢慢淡入，那一下不出聲、不震動。劇情不變。</small>' + seg('scare', [['full', '完整驚嚇'], ['soft', '溫和模式']], S.scare) + '</div>' +
        (native ? '<div class="ux-row"><label>震動</label><small>驚嚇和死亡時，手機會震動。</small>' + seg('haptics', [['true', '開'], ['false', '關']], S.haptics) + '</div>' : '') +
        '<div class="ux-row"><label>字體大小</label><small>故事內文和選項的字會跟著變大。</small>' + seg('font', [[0, '標準'], [1, '大'], [2, '特大']], S.font) + '</div>' +
        '<div class="ux-row"><label>限時選擇</label><small>加長：倒數時間變成 1.8 倍，適合想慢慢讀的人。</small>' + seg('slow', [['false', '標準'], ['true', '加長時間']], S.slow) + '</div>' +
        (isHome ? '<div class="ux-row"><button class="ux-link" data-ob>重看新手引導</button></div>' : '') + '</div>';
    }
    draw();
    ov.addEventListener('click', function (e) {
      var t = e.target;
      if (t === ov || t.closest('.ux-x')) { ov.remove(); return; }
      if (t.closest('[data-ob]')) { ov.remove(); openOnboarding(true); return; }
      var b = t.closest('.ux-seg button'); if (!b) return;
      var k = b.parentNode.getAttribute('data-k'), v = b.getAttribute('data-v');
      S[k] = (k === 'font') ? +v : (k === 'scare') ? v : (v === 'true');
      save(S); applyAll(); draw();
    });
    document.body.appendChild(ov);
  }
  window.__mixiaOpenSettings = openSettings;

  /* ---------- 新手引導（首頁第一次開啟） ---------- */
  function openOnboarding(force) {
    if (!force && localStorage.getItem('mixia_onboarded')) return;
    if (document.querySelector('.ux-ov')) return;
    var i = 0, ov = document.createElement('div'); ov.className = 'ux-ov mid'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', '新手引導');
    var pages = [
      ['01 / 03', '歡迎打開謎匣', '<p>十個抽屜，十個故事。</p><p>讀線索、解謎題、做選擇。<br>選錯了，就<b>重來</b>。</p>'],
      ['02 / 03', '卡關了也不用怕', '<p>畫面上方有<b>「提示」</b>，每一題都有三段提示，最後一段會直接告訴你答案。</p><p><b>「選擇章節」</b>可以回到玩過的章節。</p>'],
      ['03 / 03', '你想要多嚇？', '<p>有些故事會有突然跳出來的畫面。<br>之後隨時可以在首頁右上角的<b>設定</b>裡改。</p>' + '<div style="margin:14px 0 4px">' + seg('scare', [['full', '完整驚嚇'], ['soft', '溫和模式']], S.scare) + '</div><p style="font-size:13px;color:#9a93ad;margin-top:12px">建議戴耳機。第一次玩，可以從<b>參《末班捷運》</b>開始：純推理、不會死亡。</p>']
    ];
    function done() { try { localStorage.setItem('mixia_onboarded', '1'); } catch (e) {} ov.remove(); }
    function draw() {
      var p = pages[i];
      ov.innerHTML = '<div class="ux-sheet"><div class="ux-ob"><div class="no">' + p[0] + '</div><h2>' + p[1] + '</h2>' + p[2] + '</div>' +
        '<div class="ux-dots">' + pages.map(function (_, k) { return '<i class="' + (k === i ? 'on' : '') + '"></i>'; }).join('') + '</div>' +
        '<button class="ux-go">' + (i < pages.length - 1 ? '下一步' : '開始') + '</button>' + (i < pages.length - 1 ? '<button class="ux-skip">跳過</button>' : '') + '</div>';
    }
    draw();
    ov.addEventListener('click', function (e) {
      var t = e.target, b = t.closest('.ux-seg button');
      if (b) { S.scare = b.getAttribute('data-v'); save(S); applyScare(); draw(); return; }
      if (t.closest('.ux-skip')) { done(); return; }
      if (t.closest('.ux-go')) { if (i < pages.length - 1) { i++; draw(); } else done(); }
    });
    document.body.appendChild(ov);
  }

  /* ---------- 首頁：設定按鈕 ---------- */
  var GEAR = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>';
  function ensureGear() {
    var act = document.querySelector('.hero-act');
    if (!act || act.querySelector('.ux-gear')) return;
    var b = document.createElement('button'); b.className = 'ux-gear'; b.type = 'button'; b.setAttribute('aria-label', '設定'); b.innerHTML = GEAR;
    b.addEventListener('click', openSettings);
    act.appendChild(b);
  }

  /* ---------- 遊戲內：限時選擇來不及時，主動提醒可以加長 ---------- */
  var timedAt = 0, timedFor = 0;
  function watchTimed(n) {
    if (n.nodeType !== 1) return;
    var t = n.classList && n.classList.contains('timer') ? n : (n.querySelector && n.querySelector('.timer'));
    if (!t) return;
    var i = t.querySelector('i'); timedFor = i ? parseFloat(i.style.animationDuration) || 0 : 0; timedAt = Date.now();
  }
  function slowTip() {
    if (S.slow || localStorage.getItem('mixia_slow_tip') || document.querySelector('.ux-tip')) return;
    try { localStorage.setItem('mixia_slow_tip', '1'); } catch (e) {}
    var el = document.createElement('div'); el.className = 'ux-tip'; el.setAttribute('role', 'status');
    el.innerHTML = '來不及看完選項嗎？可以把限時選擇的時間<b style="color:#f2ab4c">加長</b>，之後也能在首頁的設定裡改回來。<div><button class="n">不用</button><button class="y">加長時間</button></div>';
    el.addEventListener('click', function (e) {
      if (e.target.closest('.y')) { S.slow = true; save(S); applyTimers(); }
      if (e.target.closest('button')) el.remove();
    });
    document.body.appendChild(el);
  }
  function hookDie() {
    if (typeof window.die !== 'function' || window.die.__ux) return;
    var orig = window.die;
    var w = function (id) {
      var timedOut = timedFor > 0 && (Date.now() - timedAt) >= timedFor * 1000 - 200 && (Date.now() - timedAt) < timedFor * 1000 + 1500;
      var r = orig.apply(this, arguments);
      if (timedOut) setTimeout(slowTip, 1200);
      timedFor = 0;
      return r;
    };
    w.__ux = true; window.die = w;
  }

  /* ---------- 溫和模式：驚嚇那一下靜音 ---------- */
  function softScare(n) {
    if (S.scare !== 'soft' || n.nodeType !== 1 || n.parentNode !== document.body || !n.classList.contains('jump')) return;
    var d = parseFloat(getComputedStyle(n).getPropertyValue('--d')) || 5;
    var ctxs = window.__mixiaCtxs || [];
    setTimeout(function () { ctxs.forEach(function (c) { if (c.state === 'running') { try { c.suspend(); } catch (e) {} } }); }, Math.max(0, d * 1000 - 200));
    setTimeout(function () { if (!document.hidden) ctxs.forEach(function (c) { if (c.state === 'suspended') { try { c.resume(); } catch (e) {} } }); }, d * 1000 + 2200);
  }

  function ready() {
    applyAll(); hookDie();
    new MutationObserver(function (list) {
      if (isHome) ensureGear();
      list.forEach(function (m) { m.addedNodes.forEach(function (n) { watchTimed(n); softScare(n); }); });
    }).observe(document.body, { childList: true, subtree: true });
    if (isHome) { ensureGear(); setTimeout(function () { openOnboarding(false); }, 900); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();
})();
