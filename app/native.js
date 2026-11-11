/* 謎匣 iOS App 專用：音效與震動（只在 App 裡載入，網頁版不會用到） */
(function () {
  'use strict';
  var cap = window.Capacitor;
  var native = !!(cap && cap.isNativePlatform && cap.isNativePlatform());

  /* 1. 靜音鍵開著也有聲音：遊戲裡已有自己的「音效」開關 */
  try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}

  /* 2. 記住每個 AudioContext：切到背景時暫停，回來時恢復 */
  var ctxs = [];
  window.__mixiaCtxs = ctxs;
  var Base = window.AudioContext || window.webkitAudioContext;
  if (Base) {
    var Tracked = function () {
      var c = new (Function.prototype.bind.apply(Base, [null].concat([].slice.call(arguments))))();
      ctxs.push(c);
      return c;
    };
    Tracked.prototype = Base.prototype;
    window.AudioContext = Tracked;
    window.webkitAudioContext = Tracked;
  }
  function resumeAll() {
    ctxs.forEach(function (c) { if (c.state !== 'running' && c.state !== 'closed') { try { c.resume(); } catch (e) {} } });
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) ctxs.forEach(function (c) { if (c.state === 'running') { try { c.suspend(); } catch (e) {} } });
    else resumeAll();
  });
  /* 來電或鬧鐘打斷後，iOS 會讓聲音停在 interrupted，下一次點擊時接回來 */
  ['touchend', 'click'].forEach(function (ev) { document.addEventListener(ev, resumeAll, true); });

  /* 3. 驚嚇點與死亡時震動 */
  function haptic(kind) {
    if (!native) return;
    var st = window.__mixiaSettings ? window.__mixiaSettings() : {};
    if (st.haptics === false) return;
    if (kind === 'scare' && st.scare === 'soft') return;
    var H = cap.Plugins && cap.Plugins.Haptics;
    if (!H) return;
    try {
      if (kind === 'scare') { H.impact({ style: 'HEAVY' }); setTimeout(function () { H.impact({ style: 'HEAVY' }); }, 140); }
      else H.notification({ type: 'ERROR' });
    } catch (e) {}
  }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  new MutationObserver(function (list) {
    list.forEach(function (m) {
      if (m.type === 'attributes') {
        if (m.target.id === 'death' && !m.target.hidden) haptic('death');
        return;
      }
      m.addedNodes.forEach(function (n) {
        /* 驚嚇畫面會被移到 body 底下，依它的 --d 延遲時間在畫面跳出的瞬間震動 */
        if (reduce || n.nodeType !== 1 || n.parentNode !== document.body || !n.classList.contains('jump')) return;
        var d = parseFloat(getComputedStyle(n).getPropertyValue('--d')) || 5;
        setTimeout(function () { if (n.isConnected) haptic('scare'); }, d * 1000);
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });
})();
