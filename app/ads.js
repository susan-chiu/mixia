/* 謎匣 1.1：AdMob 獎勵式廣告（App 專用，網頁版不會載入）
   ・提示：免費 3 次；用完後看一段短片再換 3 次
   ・第柒～拾匣：看一段短片永久開啟（存在 localStorage，ux.js 會一起備份）
   ・廣告載不到、外掛不存在、出錯 → 一律放行，不讓廣告擋住內容
   ・ATT：先跳自製說明，再跳系統追蹤授權視窗（只問一次）
   不放插頁廣告。 */
(function () {
  'use strict';
  var cap = window.Capacitor;
  var native = !!(cap && cap.isNativePlatform && cap.isNativePlatform());
  var AdMob = cap && cap.Plugins && cap.Plugins.AdMob;
  if (!native || !AdMob) return;

  var LIVE_IDS = {
    app:    'ca-app-pub-9380365042342904~6948564955',   // 寫在 Info.plist，這裡僅備註
    hint:   'ca-app-pub-9380365042342904/5617116071',   // Hint Reward
    unlock: 'ca-app-pub-9380365042342904/6677102219'    // Story Unlock
  };
  var FREE_HINTS = 3, HINTS_PER_AD = 3;
  var LOCKED = { nightmare: '第零節', haunt: '鬼屋客滿', loop: '重來的星期五', eighth: '第八節課' };
  var K_CREDIT = 'mixia_hint_credits', K_ATT = 'mixia_att_asked', K_UNLOCK = 'mixia_unlock_';

  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* ---------- ATT 與初始化 ---------- */
  function explainATT() {
    return new Promise(function (done) {
      if (get(K_ATT)) return done();
      var ov = document.createElement('div');
      ov.className = 'mx-ad-ov';
      ov.innerHTML = '<div class="mx-ad-card"><b>讓謎匣繼續免費</b>' +
        '<p>謎匣靠「看短片換提示」維持免費。接下來 iPhone 會問你是否允許追蹤，' +
        '允許的話短片會比較貼近你的興趣；不允許也完全可以玩，只是短片比較隨機。</p>' +
        '<button class="mx-ad-ok">知道了</button></div>';
      document.body.appendChild(ov);
      ov.querySelector('.mx-ad-ok').onclick = function () { set(K_ATT, '1'); ov.remove(); done(); };
    });
  }
  var ready = null;
  function init() {
    if (ready) return ready;
    ready = Promise.resolve()
      .then(function () { return AdMob.trackingAuthorizationStatus ? AdMob.trackingAuthorizationStatus() : null; })
      .then(function (st) {
        if (st && st.status === 'notDetermined') {
          return explainATT().then(function () { return AdMob.requestTrackingAuthorization(); });
        }
      })
      .catch(function () {})
      .then(function () { return AdMob.initialize({ initializeForTesting: false }); })
      .catch(function (e) { ready = null; throw e; });
    return ready;
  }

  /* ---------- 播一段獎勵式廣告：resolve(true)=該給獎勵／放行 ---------- */
  var busy = false;
  function rewarded(adId) {
    if (busy) return Promise.resolve(false);
    busy = true;
    var got = false, handles = [];
    function on(ev, fn) { try { var h = AdMob.addListener(ev, fn); handles.push(h); } catch (e) {} }
    on('onRewardedVideoAdReward', function () { got = true; });
    function cleanup() {
      busy = false;
      handles.forEach(function (h) { Promise.resolve(h).then(function (x) { x && x.remove && x.remove(); }).catch(function () {}); });
    }
    var shown = false;
    return init()
      .then(function () { return AdMob.prepareRewardVideoAd({ adId: adId, isTesting: false }); })
      .then(function () { shown = true; return AdMob.showRewardVideoAd(); })
      .then(function (item) {
        if (item && typeof item.amount === 'number') got = true;
        cleanup();
        return got;
      })
      .catch(function () {
        cleanup();
        return !shown || got;   // 載不到廣告 → 放行；看到一半關掉 → 不給
      });
  }

  /* ---------- 樣式 ---------- */
  var css = document.createElement('style');
  css.textContent = '.mx-ad-ov{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;padding:24px}' +
    '.mx-ad-card{max-width:340px;background:#17131c;color:#eee;border:1px solid #3a3242;border-radius:14px;padding:20px;font:15px/1.6 system-ui,sans-serif;text-align:center}' +
    '.mx-ad-card b{display:block;font-size:18px;margin-bottom:8px}.mx-ad-card p{margin:0 0 16px;color:#bbb}' +
    '.mx-ad-card button{display:block;width:100%;margin-top:8px;padding:12px;border-radius:10px;border:0;font-size:16px;background:#c8402e;color:#fff}' +
    '.mx-ad-card .mx-ad-no{background:transparent;color:#999;border:1px solid #444}';
  (document.head || document.documentElement).appendChild(css);

  function ask(title, text, okLabel) {
    return new Promise(function (done) {
      var ov = document.createElement('div');
      ov.className = 'mx-ad-ov';
      ov.innerHTML = '<div class="mx-ad-card"><b></b><p></p><button class="mx-ad-ok"></button><button class="mx-ad-no">先不要</button></div>';
      ov.querySelector('b').textContent = title;
      ov.querySelector('p').textContent = text;
      ov.querySelector('.mx-ad-ok').textContent = okLabel;
      ov.querySelector('.mx-ad-ok').onclick = function () { ov.remove(); done(true); };
      ov.querySelector('.mx-ad-no').onclick = function () { ov.remove(); done(false); };
      document.body.appendChild(ov);
    });
  }

  /* ---------- 提示 ---------- */
  function credits() { var v = get(K_CREDIT); return v === null ? FREE_HINTS : (+v || 0); }
  function label() {
    var b = document.getElementById('moreHint');
    if (b && !b.dataset.mxLabeled && credits() <= 0) { b.dataset.mxLabeled = '1'; b.textContent = '看短片換 ' + HINTS_PER_AD + ' 次提示'; }
  }

  /* ---------- 第柒～拾匣 ---------- */
  function lockedId(a) {
    var m = /g\/([a-z0-9]+)\.html/.exec(a.getAttribute('href') || '');
    return m && LOCKED[m[1]] && !get(K_UNLOCK + m[1]) ? m[1] : null;
  }

  document.addEventListener('click', function (ev) {
    var t = ev.target;
    var hint = t.closest && t.closest('#moreHint');
    if (hint) {
      if (hint.dataset.mxPass) { delete hint.dataset.mxPass; return; }
      var c = credits();
      if (c > 0) { set(K_CREDIT, String(c - 1)); return; }
      ev.preventDefault(); ev.stopImmediatePropagation();
      hint.disabled = true; hint.textContent = '正在載入短片…';
      rewarded(LIVE_IDS.hint).then(function (ok) {
        hint.disabled = false;
        if (!ok) { hint.textContent = '看短片換 ' + HINTS_PER_AD + ' 次提示'; return; }
        set(K_CREDIT, String(HINTS_PER_AD - 1));
        hint.dataset.mxPass = '1';
        hint.click();
      });
      return;
    }
    var a = t.closest && t.closest('a[href]');
    var id = a && lockedId(a);
    if (!id) return;
    ev.preventDefault(); ev.stopImmediatePropagation();
    var href = a.href;
    ask('開啟《' + LOCKED[id] + '》', '看一段短片，這個故事就永久開啟，之後不用再看。', '看短片開啟').then(function (yes) {
      if (!yes) return;
      rewarded(LIVE_IDS.unlock).then(function (ok) {
        if (!ok) return;
        set(K_UNLOCK + id, '1');
        location.href = href;
      });
    });
  }, true);

  new MutationObserver(label).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('pointerdown', function () { init().catch(function () {}); }, { once: true, capture: true });
  window.MIXIA_ADS = { init: init, credits: credits };
})();
