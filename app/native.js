/* 謎匣 iOS App 專用：音效、震動與廣告橋接（只在 App 裡載入） */
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
        if (reduce || n.nodeType !== 1 || n.parentNode !== document.body || !n.classList.contains('jump')) return;
        var d = parseFloat(getComputedStyle(n).getPropertyValue('--d')) || 5;
        setTimeout(function () { if (n.isConnected) haptic('scare'); }, d * 1000);
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });

  /* 4. AdMob：測試模式預設開啟；正式上架前將 useTestAds 關閉並替換 ad unit ID。 */
  var ads = cap && cap.Plugins && cap.Plugins.AdMob;
  var adConfig = {
    useTestAds: true,
    nonPersonalized: true,
    rewardedId: 'ca-app-pub-3940256099942544/1712485313',
    interstitialId: 'ca-app-pub-3940256099942544/4411468910',
    interstitialEvery: 2
  };
  var adsReady;

  function prepareRewarded() {
    if (!ads) return Promise.reject(new Error('AdMob unavailable'));
    return ads.prepareRewardVideoAd({ adId: adConfig.rewardedId, isTesting: adConfig.useTestAds, npa: adConfig.nonPersonalized });
  }
  function prepareInterstitial() {
    if (!ads) return Promise.reject(new Error('AdMob unavailable'));
    return ads.prepareInterstitial({ adId: adConfig.interstitialId, isTesting: adConfig.useTestAds, npa: adConfig.nonPersonalized });
  }
  function initAds() {
    if (!native || !ads) return Promise.reject(new Error('Not running natively'));
    if (!adsReady) {
      adsReady = Promise.resolve(ads.initialize()).then(function () {
        return Promise.all([prepareRewarded().catch(function () {}), prepareInterstitial().catch(function () {})]);
      });
    }
    return adsReady;
  }
  function runThenReward(run) {
    initAds().then(prepareRewarded).then(function () {
      return ads.showRewardVideoAd();
    }).then(function () {
      run();
      prepareRewarded().catch(function () {});
    }).catch(function () {
      /* 廣告無法取得時仍提供提示，不能把主線進度鎖在廣告後。 */
      run();
    });
  }
  function runThenInterstitial(run) {
    initAds().then(prepareInterstitial).then(function () {
      return ads.showInterstitial();
    }).catch(function () {}).then(function () {
      run();
      prepareInterstitial().catch(function () {});
    });
  }
  function unlockedHintCount(button) {
    var sheet = button.closest('#sheet');
    return sheet ? sheet.querySelectorAll('li:not(.locked)').length : 0;
  }
  function labelRewardedHints() {
    document.querySelectorAll('#moreHint').forEach(function (button) {
      if (unlockedHintCount(button) >= 1 && !button.dataset.mixiaAdGranted) {
        button.textContent = '觀看短片開啟提示';
      }
    });
  }
  document.addEventListener('click', function (event) {
    var hint = event.target.closest && event.target.closest('#moreHint');
    if (hint) {
      if (hint.dataset.mixiaAdGranted) {
        delete hint.dataset.mixiaAdGranted;
        return;
      }
      if (unlockedHintCount(hint) < 1) return; /* 第一段提示永遠免費 */
      event.preventDefault();
      event.stopImmediatePropagation();
      hint.disabled = true;
      hint.textContent = '正在載入短片…';
      runThenReward(function () {
        hint.dataset.mixiaAdGranted = '1';
        hint.disabled = false;
        hint.click();
      });
      return;
    }

    var next = event.target.closest && event.target.closest('#nextChap');
    if (!next || next.dataset.mixiaAdGranted) {
      if (next && next.dataset.mixiaAdGranted) delete next.dataset.mixiaAdGranted;
      return;
    }
    var transitions = +(localStorage.getItem('mixia_ad_chapter_transitions') || 0) + 1;
    localStorage.setItem('mixia_ad_chapter_transitions', String(transitions));
    if (transitions % adConfig.interstitialEvery !== 0) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    next.disabled = true;
    runThenInterstitial(function () {
      next.dataset.mixiaAdGranted = '1';
      next.disabled = false;
      next.click();
    });
  }, true);
  new MutationObserver(labelRewardedHints).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('pointerdown', function () { initAds().catch(function () {}); }, { once: true, capture: true });
  window.MIXIA_ADS = { config: adConfig, initialize: initAds };
})();
