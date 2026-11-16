# 謎匣 Mixia

青少年（13+）恐怖／懸疑解謎 App，十個獨立故事。作者 Susan（邱鈺珊），台灣高雄。
網頁內容用 Capacitor 包成 iOS App，已在 App Store 上架。

**跟 Susan 說話一律用繁體中文，結論先講，句子短。她不是工程師，不要丟程式碼給她看，
講「改了什麼、結果如何、下一步做什麼」就好。**

---

## 專案結構

```
web/            App 的全部內容（會被 prepare_www.py 複製成 www/）
  index.html    首頁。十個抽屜、結局圖鑑、死亡圖鑑。注意：這是「片段」不是完整網頁，
                prepare_www.py 會幫它包上 <html><head>
  trailers.js   每個故事的封面、預告片分鏡、集數資料（DATA 物件）
  g/*.html      十個故事，每個都是獨立的單檔 HTML，自帶劇本與解謎邏輯
  v/            影片與圖片素材（{id}_poster.jpg、{id}_scare.jpg、1996_*.mp4）
  fonts/        子集化過的 woff2（只含遊戲裡出現過的字）
app/            只會注入 App、網頁版不載入的三支腳本
  native.js     音效（iOS audio session）與震動。不要把廣告寫進來。
  ux.js         設定（驚嚇強度、震動、字級、放慢計時）、新手導覽、localStorage 備份
  ads.js        AdMob 獎勵式廣告
scripts/
  prepare_www.py   web/ → www/，注入三支腳本、換掉 Google Fonts、加 iOS 觸控 CSS
  build_fonts.py   重新子集化字型
ios/App/        Xcode 專案（Capacitor 7 + Swift Package Manager）
codemagic.yaml  CI：建置 IPA 並上傳 TestFlight
store/          上架文案、審查備註、截圖
```

十個故事的 id（順序即首頁抽屜順序）：
`1996` `yunding` `metro` `wonders` `live` `seventh` `nightmare` `haunt` `loop` `eighth`

---

## 重要識別碼

| 項目 | 值 |
|---|---|
| Bundle ID | `tw.mixia.riddlebox` |
| App Store Connect Apple ID | `6832249694` |
| 商店頁 | https://apps.apple.com/tw/app/id6832249694 |
| 支援／隱私頁 | https://susan-chiu.github.io/mixia/ |
| AdMob App ID | `ca-app-pub-9380365042342904~6948564955` |
| AdMob Hint Reward | `ca-app-pub-9380365042342904/5617116071` |
| AdMob Story Unlock | `ca-app-pub-9380365042342904/6677102219` |
| Codemagic workflow | `ios-release`（整合 `subverse_asc`） |

姊妹專案：潛境 SubVerse（Apple ID `6830555352`），同一個 Apple 帳號與 Codemagic 金鑰。

---

## 做事規則

**送審前一定要 Susan 明確說「送」。** 沒說就停在「新增以供審查」之前。

**Apple 登入、密碼、法律協議、雙重驗證一律請她自己完成。** 絕不代輸入密碼或金鑰。

**不要把廣告變成阻擋內容的東西。** 廣告載不到、外掛不存在、出錯時一律放行。
審查員那邊常常沒有廣告可播，擋住內容會直接被退件。

**改完一定要實際跑過再說做好了。** 用 Playwright 開 `www/` 的頁面點點看，
至少確認：沒有 console 錯誤、圖片影片載得到、解謎流程走得完。

---

## 開發流程

```bash
npm install
python3 scripts/prepare_www.py     # web/ → www/
npx cap sync ios                   # 同步到 Xcode 專案
```

本機測試直接用瀏覽器開 `www/index.html`（file:// 就可以，不需要起伺服器）。
`www/` 是產出物，已經在 `.gitignore`，只 commit `web/`。

改了遊戲文字之後要重跑 `scripts/build_fonts.py`，否則新字會變成豆腐方塊。

### 版本與建置

- `MARKETING_VERSION` 在 `ios/App/App.xcodeproj/project.pbxproj`，手動改（目前 1.1）
- build 號由 Codemagic 自動抓 TestFlight 最新號 +1，不用手改
- 推上 `main` 之後要**手動到 Codemagic 按建置**（push webhook 沒有生效）
- 建置成功會自動上傳 TestFlight，內部測試群組「自己測試」

### 上架狀態的用詞

App Store Connect 的「已可發佈」是 Ready for Distribution，代表**已經上架**。
等待開發者發佈會寫「等待開發者發佈」。不要搞混，之前誤判過一次。

---

## 遊戲程式的慣例

每個 `g/*.html` 都是獨立單檔，共用同一套結構：

- `SCRIPT`：劇本陣列，每個節點有 `t`（文字）、`options`、`timeoutDie` 等
- `S`：存檔狀態，寫進 localStorage
- `current()` `next()` `render()` `jumpTo(n)`：流程控制，都是頂層宣告
- `die()` 是 function declaration，所以可以用 `window.die` 包起來改寫
- `#moreHint`：提示表單裡的「開啟下一個提示」按鈕，`ads.js` 用捕獲階段攔它
- `.jump`：jump scare 的滿版覆蓋層，`--d` 是延遲秒數

`app/` 底下三支腳本都是**非侵入式**的：用事件攔截、MutationObserver、包裝既有函式來
加功能，不去改十個故事檔。新功能盡量維持這個做法，否則要改十個檔案。

---

## 廣告設計（1.1）

- 提示：免費 3 次，用完看一段獎勵式廣告再換 3 次
- 解鎖：第柒～拾匣（`nightmare` `haunt` `loop` `eighth`）看一段廣告永久開啟
- 第壹～陸匣完全免費
- 沒有插頁廣告、沒有橫幅（Susan 決定的，不要自己加回來）
- ATT：先跳自製說明畫面再跳系統追蹤授權視窗，只問一次

---

## 待辦（1.1 還缺）

- 9 支故事預告片 `v/{id}_trailer.mp4`
- 各章節劇情短片 `v/{id}_ch1.mp4` 與音效
- 素材到齊後：建 1.1 → TestFlight → Susan 試裝確認廣告正常 → 她說「送」才送審
- 送審前要改 App Store Connect 的「App 隱私權」為有追蹤，並填廣告識別碼用途
