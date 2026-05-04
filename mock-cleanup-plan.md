# モック整理 事前調査レポート（フェーズ2-A）

**このレポートはフェーズ2-A（整理事前調査）の成果物です。調査時点のリポジトリに対する読み取り専用の洗い出しであり、HTML/JS/CSS 等の**ファイル変更は実施していません**（本ドキュメントの新規追加のみ）。**

調査日: 2026-05-02（ツール実行時点）  
対象ルート: `onetechsystem/`

---

## 1. アーカイブ対象ファイルの参照状況

参照の検索対象: `*.html` / `*.js` / `*.css` 内の `href` / `data-href` / `onclick` 内の `location.href` / `fetch()` 引数 / 文字列定数としての `.html` ファイル名、`css/` 内の `url()` / `@import`。  
**結果**: アーカイブ候補10ファイルのうち、**実行系コードからのハイパーリンク参照が検出されたのは `quote-list.html`（`js/layout.js`）と `purchase-detail.html`（`pages/purchase-list.html`）のみ**。その他8ファイルは **HTML/JS/CSS 間リンクとしては他ファイルから未参照**（`mock-audit.md` および `tools/split_pages.py` にメタ情報としての言及あり）。`css/app.css` に対象ページへの `url()` / `@import` は**なし**。

`mock-audit.md` は監査ドキュメントのため参照元に含め、フェーズ2-Bでは **アーカイブ先パスへの追記・一覧表の更新** を想定。`tools/split_pages.py` は過去の分割用スクリプトの **画面キー辞書** に旧ページ名が残存するのみ（現行ナビとは独立）。

---

### 1.1 `pages/dashboard.html`

| アーカイブ対象 | 参照元ファイル:行 | 参照内容(該当行のコード) | 想定処理 |
|----|----|----|----|
| pages/dashboard.html | （なし） | `*.html` / `*.js` / `*.css` で `dashboard.html` を参照するリンク・`fetch` 等は検出されず | 2-B: 特になし（アーカイブ移動のみ可）。導線追加は別判断 |
| pages/dashboard.html | mock-audit.md:35 | `\| \`pages/dashboard.html\` \| HTML \| 月次サマリー…` | 2-B: 監査表のパス・状態をアーカイブ方針に合わせ更新 |
| pages/dashboard.html | mock-audit.md:102 | `dash[dashboard.html]`（Mermaid 等の記述） | 同上 |
| pages/dashboard.html | mock-audit.md:149 | `- \`pages/dashboard.html\`` | 同上 |
| pages/dashboard.html | mock-audit.md:198 | 依存関係表の1行（`orphan` 等） | 同上 |
| pages/dashboard.html | mock-audit.md:215 | 用語指摘で `pages/dashboard.html:37` を引用 | 同上 |
| pages/dashboard.html | tools/split_pages.py:23 | `SCREEN_TITLES` の `"dashboard": "ダッシュボード"` | 2-B: スクリプトを継続利用する場合のみキー説明の更新。未使用ならコメントまたは削除を検討 |

---

### 1.2 `pages/audit-log.html`

| アーカイブ対象 | 参照元ファイル:行 | 参照内容(該当行のコード) | 想定処理 |
|----|----|----|----|
| pages/audit-log.html | （なし） | 他HTML/JS/CSSからのリンク・`fetch` 等なし | 2-B: アーカイブ移動のみ可 |
| pages/audit-log.html | mock-audit.md:31,152,201 | インベントリ・一覧・依存表での言及 | 2-B: ドキュメント更新 |
| pages/audit-log.html | tools/split_pages.py:46 | `"audit-log": "監査ログ"` | 2-B: 同上（split_pages 継続時） |

---

### 1.3 `pages/document-history.html`

| アーカイブ対象 | 参照元ファイル:行 | 参照内容(該当行のコード) | 想定処理 |
|----|----|----|----|
| pages/document-history.html | （なし） | 他HTML/JS/CSSからのリンク・`fetch` 等なし | 2-B: アーカイブ移動のみ可 |
| pages/document-history.html | mock-audit.md:37,150,199,217,261 | インベントリ・用語・所見での言及 | 2-B: ドキュメント更新 |
| pages/document-history.html | tools/split_pages.py:33 | `"document-history": "帳票出力履歴"` | 2-B: split_pages 継続時に辞書更新 |

---

### 1.4 `pages/integration-settings.html`

| アーカイブ対象 | 参照元ファイル:行 | 参照内容(該当行のコード) | 想定処理 |
|----|----|----|----|
| pages/integration-settings.html | （なし） | 他HTML/JS/CSSからのリンク・`fetch` 等なし | 2-B: アーカイブ移動のみ可 |
| pages/integration-settings.html | mock-audit.md:38,151,200 | インベントリ・依存表 | 2-B: ドキュメント更新 |
| pages/integration-settings.html | tools/split_pages.py:45 | `"integration-settings": "連携設定"` | 2-B: split_pages 継続時に辞書更新 |

---

### 1.5 `pages/quote-compare.html`

| アーカイブ対象 | 参照元ファイル:行 | 参照内容(該当行のコード) | 想定処理 |
|----|----|----|----|
| pages/quote-compare.html | （なし） | 他HTML/JS/CSSからの `href` / `data-href` 等なし（mock-audit でも「未リンク」と記載） | 2-B: アーカイブ移動のみ可 |
| pages/quote-compare.html | mock-audit.md:51,103,154,203,229 | インベントリ・課題表での言及 | 2-B: ドキュメント更新 |
| pages/quote-compare.html | tools/split_pages.py:32 | `"quote-compare": "見積バージョン比較"` | 2-B: split_pages 継続時に辞書更新 |

---

### 1.6 `pages/delivery-create.html`

| アーカイブ対象 | 参照元ファイル:行 | 参照内容(該当行のコード) | 想定処理 |
|----|----|----|----|
| pages/delivery-create.html | （なし） | 他HTML/JS/CSSからのリンク・`fetch` 等なし | 2-B: アーカイブ移動のみ可 |
| pages/delivery-create.html | mock-audit.md:36,101,156,205,230 | インベントリ・課題表 | 2-B: ドキュメント更新 |
| pages/delivery-create.html | tools/split_pages.py:41 | `"delivery-create": "納品書作成"` | 2-B: split_pages 継続時に辞書更新 |

---

### 1.7 `pages/purchase-order-create.html`

| アーカイブ対象 | 参照元ファイル:行 | 参照内容(該当行のコード) | 想定処理 |
|----|----|----|----|
| pages/purchase-order-create.html | （なし） | 他HTML/JS/CSSからの一覧導線は未検出（当該ファイル内のキャンセル戻り先のみ） | 2-B: アーカイブ移動のみ可 |
| pages/purchase-order-create.html | mock-audit.md:49,100,155,204,231 | インベントリ・課題表 | 2-B: ドキュメント更新 |
| pages/purchase-order-create.html | tools/split_pages.py:37 | `"purchase-order-create": "注文書作成"` | 2-B: split_pages 継続時に辞書更新 |

---

### 1.8 `pages/quote-edit.html`

| アーカイブ対象 | 参照元ファイル:行 | 参照内容(該当行のコード) | 想定処理 |
|----|----|----|----|
| pages/quote-edit.html | （なし） | 他HTML/JS/CSSからのリンクなし | 2-B: アーカイブ移動のみ可 |
| pages/quote-edit.html | mock-audit.md:56,153,202 | インベントリ・依存表 | 2-B: ドキュメント更新 |
| pages/quote-edit.html | tools/split_pages.py:29 | `"quote-edit": "見積編集"` | 2-B: split_pages 継続時に辞書更新 |
| pages/quote-edit.html | js/layout.js:16 | `TITLES` の `"quote-edit": "見積編集"`（**ファイル名ではなくページID用**。現状ナビ `NAV` には未掲載） | 2-B: アーカイブ後も `data-page-name` が残るならタイトル用に維持／削除は要方針 |

---

### 1.9 `pages/quote-list.html`（リダイレクトスタブ）

| アーカイブ対象 | 参照元ファイル:行 | 参照内容(該当行のコード) | 想定処理 |
|----|----|----|----|
| pages/quote-list.html | js/layout.js:42 | `href: "quote-list.html"`（サイドバー「見積一覧」） | 2-B: **`quote-hub.html` へ書き換え**（確定方針）。スタブをアーカイブする場合は **ブックマーク切れ** に注意 |
| pages/quote-list.html | js/layout.js:12 | `TITLES` の `"quote-list": "見積一覧"` | 2-B: 未使用なら削除検討。`quote-hub` と重複 |
| pages/quote-list.html | mock-audit.md:58,74,82,180,295 | スタブ説明・ナビ5件の記述・所見 | 2-B: ドキュメントを `quote-hub` 基準に更新 |
| pages/quote-list.html | tools/split_pages.py:27 | `"quote-list": "見積一覧"` | 2-B: split_pages 継続時に `quote-hub` への整合 |

---

### 1.10 `pages/purchase-detail.html`

| アーカイブ対象 | 参照元ファイル:行 | 参照内容(該当行のコード) | 想定処理 |
|----|----|----|----|
| pages/purchase-detail.html | pages/purchase-list.html:140 | `data-href="purchase-detail.html?id=PO-2026-0018" ...` | 2-B: **代替詳細ページ**（プレースホルダ完成版・別ハブ等）へ `data-href` 書き換え、または行クリック処理の無効化＋メッセージ |
| pages/purchase-detail.html | pages/purchase-list.html:151 | `data-href="purchase-detail.html?id=PO-2026-0017" ...` | 同上 |
| pages/purchase-detail.html | pages/purchase-list.html:162 | `data-href="purchase-detail.html?id=PO-2026-0016" ...` | 同上 |
| pages/purchase-detail.html | mock-audit.md:47,94,196 | インベントリ・Mermaid・依存表 | 2-B: ドキュメント更新 |
| pages/purchase-detail.html | tools/split_pages.py:36 | `"purchase-detail": "発注詳細"` | 2-B: split_pages 継続時に辞書更新 |

---

## 2. ナビ修正の影響範囲（`quote-list.html` → `quote-hub.html`）

### 2.1 列挙（リポジトリ全体、`*.html` / `*.js` / `*.css`）

| ファイル:行 | 内容 |
|----|----|
| js/layout.js:42 | `href: "quote-list.html"`（サイドバー実URL） |
| js/layout.js:12 | `"quote-list": "見積一覧"`（`TITLES`・ページID `quote-list` 用。現行HTMLに `data-page-name="quote-list"` は**未検出**） |

**その他**: `pages/quote-list.html` 自体が `quote-hub.html#quotes` への meta refresh / `<a href>` を保持（スタブ内部参照。ナビ修正とは別）。

**ドキュメント**: `mock-audit.md:74,82,180,295` 等に `quote-list.html` の説明あり（2-Bで文言更新）。

### 2.2 書き換え後の差分案（確定方針どおり `href` のみ必須）

```diff
--- a/js/layout.js
+++ b/js/layout.js
@@ -39,7 +39,7 @@
         {
             page: "quote-hub",
-            href: "quote-list.html",
+            href: "quote-hub.html",
             icon: "bi-list-ul",
             label: "見積一覧",
             badge: null,
```

**補足（任意・2-B判断）**: `TITLES["quote-list"]` と `TITLES["quote-hub"]` の重複整理、`mock-audit.md` / `tools/split_pages.py` の `quote-list` 記述を `quote-hub` に合わせる。

---

## 3. 用語置換候補（実行しない。監査者推奨と備考）

### 3.1 「見積り」→「見積」

監査方針: 画面ラベル・社内UI用語は「見積」への統一を推奨（**y**）。**お見積り**（敬体・帳票体裁）は商習慣・敬語として残す判断もあり（**?**）。条文・固定条件文で「別途お見積り」等は法務確認推奨（**?**）。

#### 3.1.1 `pages/*.html`

| ファイル:行 | 現在の文字列(該当行抜粋) | 置換後の予定 | 置換すべき? | 備考 |
|----|----|----|----|----|
| pages/quote-create-lab.html:580 | `見積り担当` | `見積担当` | y | UIラベル |
| pages/quote-create-lab.html:1041 | `1.3. お見積り資料・アサイン想定スキル` | `1.3. お見積資料…` 等 | ? | 「お見積り」は敬体・見出し。帳票トーン維持なら **置換しない** 選択肢あり |
| pages/quote-create-lab.html:1047 | `1.3.1 お見積り資料` | 同上 | ? | 同上 |
| pages/quote-create-lab.html:1139 | `別途お見積りとさせてください` | `別途お見積と…` | ? | 条件文面。法務・営業文体の確認推奨 |
| pages/quote-create-maint.html:522 | `見積り担当` | `見積担当` | y | UIラベル |
| pages/master-management.html:90 | `見積りカテゴリ` | `見積カテゴリ` | y | UIナビ文言 |
| pages/master-management.html:138 | `見積りステータス設定` | `見積ステータス設定` | y | UI |
| pages/master-management.html:163 | `請負 — 見積りカテゴリ別マスタ` | `請負 — 見積カテゴリ別マスタ` | y | UI |
| pages/master-management.html:169 | `見積り単価設定` | `見積単価設定` | y | UI |
| pages/master-management.html:196 | `見積り詳細条件設定` | `見積詳細条件設定` | y | UI |
| pages/master-management.html:206 | `見積り固定条件設定` | `見積固定条件設定` | y | UI |
| pages/master-management.html:221 | `保守 — 見積りカテゴリ別マスタ` | 同上系 | y | UI |
| pages/master-management.html:227 | `見積り単価設定` | `見積単価設定` | y | UI |
| pages/master-management.html:228 | 説明文に `見積り単価設定` | 同上 | y | ヘルプ文言 |
| pages/master-management.html:254 | `見積り詳細条件設定` | `見積詳細条件設定` | y | UI |
| pages/master-management.html:264 | `見積り固定条件設定` | `見積固定条件設定` | y | UI |
| pages/master-management.html:279 | `ラボ — 見積りカテゴリ別マスタ` | 同上 | y | UI |
| pages/master-management.html:286 | `見積り単価設定（ラボ）` | `見積単価設定（ラボ）` | y | UI |
| pages/master-management.html:310 | `見積り詳細条件設定` | `見積詳細条件設定` | y | UI |
| pages/master-management.html:320 | `見積り固定条件設定` | `見積固定条件設定` | y | UI |
| pages/master-management.html:548 | `見積りステータス設定（共通）` | `見積ステータス設定（共通）` | y | モーダルタイトル |
| pages/master-management.html:588 | `見積り単価設定（請負）` | `見積単価設定（請負）` | y | モーダルタイトル |
| pages/master-management.html:620 | `見積り単価設定（ラボ）` | `見積単価設定（ラボ）` | y | モーダルタイトル |
| pages/master-management.html:624 | 説明文に `見積り単価設定` | 同上 | y | モーダル説明 |
| pages/master-management.html:653 | `見積り詳細条件設定（請負）` | `見積詳細条件設定（請負）` | y | モーダルタイトル |
| pages/master-management.html:673 | `見積り固定条件設定（請負）` | `見積固定条件設定（請負）` | y | モーダルタイトル |
| pages/master-management.html:740 | `見積り単価設定（保守）` | `見積単価設定（保守）` | y | モーダルタイトル |
| pages/master-management.html:744 | 説明文に `見積り単価設定` | 同上 | y | モーダル説明 |
| pages/master-management.html:792 | `見積り詳細条件設定（保守）` | `見積詳細条件設定（保守）` | y | モーダルタイトル |
| pages/master-management.html:812 | `見積り固定条件設定（保守）` | `見積固定条件設定（保守）` | y | モーダルタイトル |
| pages/master-management.html:832 | `見積り詳細条件設定（ラボ）` | `見積詳細条件設定（ラボ）` | y | モーダルタイトル |
| pages/master-management.html:852 | `見積り固定条件設定（ラボ）` | `見積固定条件設定（ラボ）` | y | モーダルタイトル |
| pages/quote-create.html:487 | `見積り担当` | `見積担当` | y | UIラベル |
| pages/quote-create.html:1961 | `1.1 お見積り資料` | 敬体方針による | ? | 条件ブロック見出し |
| pages/quote-create.html:1962 | `別途お見積り、スケジュール調整` | 同上 | ? | 条件文面 |
| pages/quote-create.html:3165 | JS文字列内 `別途お見積り` | 同上 | ? | デフォルト条件と同期要 |
| pages/quote-update-ver3.html:246 | `見積り担当者` | `見積担当者` | y | UIラベル |
| pages/quote-update-ver3.html:1661 | `1.1 お見積り資料` | 敬体方針による | ? | 同上 |
| pages/quote-update-ver3.html:1662 | `別途お見積り、スケジュール調整` | 同上 | ? | 同上 |
| pages/quote-detail.html:530 | `見積り担当者` | `見積担当者` | y | UIラベル |
| pages/quote-detail.html:2958 | JS文字列 `別途お見積り` | 同上 | ? | quote-create と整合 |
| pages/dashboard.html:37 | `有効見積り件数` | `有効見積件数` | y | KPI表記（アーカイブ対象ファイルだが用語候補として記録） |
| pages/dashboard.html:69 | 同上 | 同上 | y | 同上 |
| pages/dashboard.html:101 | 同上 | 同上 | y | 同上 |

#### 3.1.2 `js/*.js`

| ファイル:行 | 現在の文字列(該当行抜粋) | 置換後の予定 | 置換すべき? | 備考 |
|----|----|----|----|----|
| js/quote-lab-condition-defaults.js:84 | `1.3.1 お見積り資料 行1・資料` | `お見積資料` 等 | ? | マスタラベル。HTML見出しと整合要 |
| js/quote-ukeoi-condition-defaults.js:84 | `1.1 お見積り資料 行1・資料` | 同上 | ? | 同上 |

#### 3.1.3 `mock-audit.md`

| ファイル:行 | 現在の文字列(該当行抜粋) | 置換後の予定 | 置換すべき? | 備考 |
|----|----|----|----|----|
| mock-audit.md:215 | 監査表内「見積**り**」 | 監査用語に合わせて更新 | ? | ドキュメント。2-Bで監査文面を更新するかは別方針 |
| mock-audit.md:299 | 所見内「見積/見積り」 | 同上 | ? | 同上 |

---

### 3.2 自社略称（原価ラベル）

**リポジトリ検索結果**: 文字列 **`VN原価` / `NC原価` / `外注原価` は 0 件**。**`OTA原価`** と **`OTJ原価`（および率）**、**`発注先原価`（および率）** が主な「組織・当事者」を含む原価ラベル。文脈列は **モック上の推測**（推測と明記）。

#### 3.2.1 `OTA原価` 系

| ファイル:行 | 現在の文字列 | 文脈(推測) | 推奨される正規語 | 備考 |
|----|----|----|----|----|
| pages/quote-compare.html:51 | `<th>OTA原価</th>` | 比較表の列。承認画面の OTA 金額と対応する **OTA側コスト** と推測 | 方針: **OTA原価** 維持、または組織定義に合わせ **NC原価** 列への分割はオーナー判断 | アーカイブ対象ファイル |
| pages/quote-approval.html:35 | `OTA原価:` | 承認サマリのキー項目 | 同上 | 現行は OTA のみ明示 |
| pages/quote-approval.html:60 | `OTA原価` | テーブルヘッダ | 同上 | |
| pages/quote-approval.html:116 | `OTA原価を再確認` | 差戻しメッセージ | 同上 | |
| pages/audit-log.html:181 | `OTA原価を再確認してください` | ログ本文 | 同上 | アーカイブ対象 |
| mock-audit.md:213 | 監査記述（OTA vs OTJ） | メタ | ドキュメント更新のみ | 実行置換対象外 |

#### 3.2.2 `OTJ原価` / `OTJ原価率` / `発注先原価` / `発注先原価率`（行単位・集約なし）

同一モデル上は **「OTJ売上に紐づく自社側原価率（OTJ原価率）と発注先側原価（発注先原価）」** と読める（**推測**）。**（VN）** は単価区分名であり **`VN原価` というラベルではない**（grep 0件）。

| ファイル:行 | 現在の文字列 | 文脈(原価が指す対象が何か)（推測） | 推奨される正規語 | 備考 |
|----|----|----|----|----|
| pages/quote-create-lab.html:1672 | 文中 `OTJ原価率・発注先原価率` | OTJ売上に対する掛け率と、発注先（再委託先）側の掛け率の両方 | OTA原価／NC原価への再定義は **オーナー判断**（データ構造に依存） | 利益管理タブ説明 |
| pages/quote-create-lab.html:1688 | `OTJ原価（発注先売上）` | テーブル列: OTJ側に帰属する原価（括弧内は発注先売上との関係を示すラベルと推測） | 同上 | `<th>` |
| pages/quote-create-lab.html:1689 | `OTJ原価率（%）` | OTJ売上に対する原価率 | 同上 | `<th>` |
| pages/quote-create-lab.html:1692 | `発注先原価（円）` | 発注先（NC/VN拠点等）に支払う原価額と推測 | **NC原価** へのリネーム候補（**推測**）。確定はオーナー | `<th>` |
| pages/quote-create-lab.html:1693 | `発注先原価率（%）` | 発注先原価の率表現 | 同上 | `<th>` |
| pages/quote-create-lab.html:1715 | 長文（`OTJ原価＝…` `発注先原価＝…` `（VN）系の OTJ原価率`） | 計算式ヘルプ。VNは区分タグ | 用語マップ承認後に一括置換 | 1行に複数語 |
| pages/quote-create-lab.html:1908 | JS連結文字列内 `OTJ原価率（%）` | 動的生成テーブルヘッダ | HTMLのthと同期 | |
| pages/quote-create-lab.html:1916 | JS連結文字列内 `発注先原価率（%）` | 同上 | 同上 | |
| pages/quote-create-maint.html:1502 | `OTJ原価（発注先売上）` | 保守見積の利益管理列 | 請負と同型 | `<th>` |
| pages/quote-create-maint.html:1503 | `OTJ原価率（%）` | 同上 | 同上 | `<th>` |
| pages/quote-create-maint.html:1506 | `発注先原価（円）` | 同上 | 同上 | `<th>` |
| pages/quote-create-maint.html:1507 | `発注先原価率（%）` | 同上 | 同上 | `<th>` |
| pages/quote-create-maint.html:1529 | 長文（`OTJ原価＝…` `発注先原価＝…` `（VN）区分の OTJ原価率`） | 計算式ヘルプ | 同上 | |
| pages/quote-create-maint.html:2366 | JS連結文字列 `OTJ原価率（%）` | 動的表 | 同上 | |
| pages/quote-create-maint.html:2374 | JS連結文字列 `発注先原価率（%）` | 動的表 | 同上 | |
| pages/quote-create.html:1705 | `OTJ原価（発注先売上）` | 請負見積・利益管理 | 同上 | `<th>` |
| pages/quote-create.html:1706 | `OTJ原価率（%）` | 同上 | 同上 | `<th>` |
| pages/quote-create.html:1709 | `発注先原価（円）` | 同上 | 同上 | `<th>` |
| pages/quote-create.html:1710 | `発注先原価率（%）` | 同上 | 同上 | `<th>` |
| pages/quote-create.html:1732 | 長文（`OTJ原価＝…` `発注先原価＝…`） | 計算式ヘルプ | 同上 | |
| pages/quote-create.html:2555 | コメント `OTJ原価率の初期値` | 実装メモ（VN/JP区分） | コードコメント。用語変更時はロジック名も検討 | `/**` コメント |
| pages/quote-create.html:2585 | JS連結 `OTJ原価率（%）` | 動的表 | 同上 | |
| pages/quote-create.html:2593 | JS連結 `発注先原価率（%）` | 動的表 | 同上 | |
| pages/quote-update-ver3.html:1406 | `OTJ原価（発注先売上）` | Ver.3 利益管理 | 同上 | `<th>` |
| pages/quote-update-ver3.html:1407 | `OTJ原価率（%）` | 同上 | 同上 | `<th>` |
| pages/quote-update-ver3.html:1410 | `発注先原価（円）` | 同上 | 同上 | `<th>` |
| pages/quote-update-ver3.html:1411 | `発注先原価率（%）` | 同上 | 同上 | `<th>` |
| pages/quote-update-ver3.html:1433 | 長文（計算式） | 計算式ヘルプ | 同上 | |
| pages/quote-update-ver3.html:2204 | コメント `OTJ原価率の初期値` | 実装メモ | 同上 | |
| pages/quote-update-ver3.html:2234 | JS連結 `OTJ原価率（%）` | 動的表 | 同上 | |
| pages/quote-update-ver3.html:2242 | JS連結 `発注先原価率（%）` | 動的表 | 同上 | |
| pages/quote-detail.html:845 | `OTJ原価（発注先売上）` | 見積詳細・利益管理 | 同上 | `<th>` |
| pages/quote-detail.html:846 | `OTJ原価率（%）` | 同上 | 同上 | `<th>` |
| pages/quote-detail.html:849 | `発注先原価（円）` | 同上 | 同上 | `<th>` |
| pages/quote-detail.html:850 | `発注先原価率（%）` | 同上 | 同上 | `<th>` |
| pages/quote-detail.html:872 | 長文（計算式・`OTJ原価` `発注先原価`） | 計算式ヘルプ | 同上 | |
| pages/quote-detail.html:2117 | コメント `OTJ原価率の初期値` | 実装メモ | 同上 | |
| pages/quote-detail.html:2227 | JS連結 `OTJ原価率（%）` | 動的表 | 同上 | |
| pages/quote-detail.html:2235 | JS連結 `発注先原価率（%）` | 動的表 | 同上 | |
| pages/master-management.html:170 | 説明文 `発注先原価（請負見積で利用）` | マスタカード説明 | マスタ用語を見積画面と同期 | 文中に「原価率」も |
| pages/master-management.html:228 | 説明文 `発注先原価（保守見積…）` | 同上（保守） | 同上 | |
| pages/master-management.html:592 | 長文（`OTJ原価率` `発注先原価` `発注先原価率`） | 請負・単価マスタ説明 | 同上 | モーダル |
| pages/master-management.html:599 | `OTJ原価率`（`<th>` 改行付き） | マスタ表ヘッダ | 同上 | |
| pages/master-management.html:600 | `発注先原価`（`<th>` 改行付き） | 同上 | 同上 | |
| pages/master-management.html:601 | `発注先原価率`（`<th>` 改行付き） | 同上 | 同上 | |
| pages/master-management.html:624 | 長文（`OTJ原価率` `発注先原価`） | ラボ用マスタ説明 | 同上 | |
| pages/master-management.html:632 | `OTJ原価率`（`<th>`） | ラボマスタ表 | 同上 | |
| pages/master-management.html:633 | `発注先原価`（`<th>`） | 同上 | 同上 | |
| pages/master-management.html:634 | `発注先原価率`（`<th>`） | 同上 | 同上 | |
| pages/master-management.html:744 | 長文（`OTJ原価率` `発注先原価`） | 保守マスタ説明 | 同上 | |
| pages/master-management.html:751 | `OTJ原価率`（`<th>`） | 保守マスタ表 | 同上 | |
| pages/master-management.html:752 | `発注先原価`（`<th>`） | 同上 | 同上 | |
| pages/master-management.html:753 | `発注先原価率`（`<th>`） | 同上 | 同上 | |
| pages/master-management.html:2098 | `title="…発注先原価率で売上から計算"` | 入力欄ツールチップ | 同上 | |
| js/quote-unit-price-config.js:2 | ファイル先頭コメント `発注先原価・発注先原価率` | モジュール説明 | ドキュメントコメント更新 | |

#### 3.2.3 その他「原価」を含むが組織略称ラベルではない例（参考）

| ファイル:行 | 現在の文字列 | 文脈 | 推奨される正規語 | 備考 |
|----|----|----|----|----|
| pages/integration-settings.html:96 | `原価情報（双方向）` | 連携設定の行 | ※判別不能（汎用） | アーカイブ対象 |
| pages/integration-settings.html:169 | `原価情報同期` | ジョブ一覧 | 同上 | |
| pages/integration-settings.html:177 | `原価情報同期` | 同上 | 同上 | |
| pages/integration-settings.html:185 | `原価情報同期` | 同上 | 同上 | |
| pages/quote-detail.html:835 | `明細ベースの原価単価（掛け率）` | 説明文 | 組織略称とは別概念 | |
| pages/quote-detail.html:1038 | `原価単価（円）` | 明細表ヘッダ（繰返し） | 同上 | 同文言の `<th>` が計 **16行**（下表続く） |
| pages/quote-detail.html:1100 | `原価単価（円）` | 同上 | 同上 | |
| pages/quote-detail.html:1150 | `原価単価（円）` | 同上 | 同上 | |
| pages/quote-detail.html:1188 | `原価単価（円）` | 同上 | 同上 | |
| pages/quote-detail.html:1262 | `原価単価（円）` | 同上 | 同上 | |
| pages/quote-detail.html:1336 | `原価単価（円）` | 同上 | 同上 | |
| pages/quote-detail.html:1410 | `原価単価（円）` | 同上 | 同上 | |
| pages/quote-detail.html:1496 | `原価単価（円）` | 同上 | 同上 | |
| pages/quote-detail.html:1558 | `原価単価（円）` | 同上 | 同上 | |
| pages/quote-detail.html:1608 | `原価単価（円）` | 同上 | 同上 | |
| pages/quote-detail.html:1670 | `原価単価（円）` | 同上 | 同上 | |
| pages/quote-detail.html:1720 | `原価単価（円）` | 同上 | 同上 | |
| pages/quote-detail.html:1770 | `原価単価（円）` | 同上 | 同上 | |
| pages/quote-detail.html:1819 | `原価単価（円）` | 同上 | 同上 | |
| pages/quote-detail.html:1872 | `原価単価（円）` | 同上 | 同上 | |
| pages/quote-detail.html:1912 | `原価単価（円）` | 同上 | 同上 | |
| pages/quote-detail.html:2964 | JS文字列 `原価単価（掛け率）` | プレビュー連動 | 同上 | |
| pages/quote-detail.html:3150 | コメント `原価単価列` | 実装メモ | 同上 | |
| pages/quote-detail.html:3159 | JS `indexOf('原価単価')` | 列削除ロジック | 同上 | |
| pages/quote-create.html:3171 | JS文字列 `原価単価` | プレビュー処理 | 同上 | |
| pages/quote-create.html:3302 | JS `indexOf('原価単価')` | 列操作 | 同上 | |

**所見**: 現状モックは **「OTA原価」（承認・比較）** と **「OTJ原価／発注先原価」（見積明細・マスタ）** の二系統。**NC** を独立ラベルとしては未使用。正規化は **表・計算式・マスタキー** を横断するためオーナー承認必須。

---

### 3.3 「クライアント」「顧客」「お客様」「取引先」

**`取引先`**: 実行系 `*.html` / `*.js` では **0 件**（`mock-audit.md:216` の監査語のみ）。

分類凡例: **UI**＝ラベル・ボタン・テーブルヘッダ・画面説明。**条文**＝textarea 初期値・契約条項風・納品条件・著作権条項等。**その他**＝コメント・ドキュメント・製品名ダミー等。

#### `クライアント`（`*.html` / `js/layout.js`・**1行ずつ**）

| ファイル:行 | 現在の文字列(抜粋) | 文脈分類 | 推奨される正規語 | 備考 |
|----|----|----|----|----|
| js/layout.js:8 | `"client-list": "クライアント一覧"` | UI | クライアント | `TITLES` |
| js/layout.js:9 | `"client-detail": "クライアント詳細"` | UI | クライアント | `TITLES` |
| js/layout.js:10 | `"client-create": "クライアント登録"` | UI | クライアント | `TITLES` |
| js/layout.js:50 | `label: "クライアント"` | UI | クライアント | サイドバー短縮ラベル |
| index.html:11 | `クライアント一覧` | UI | クライアント | 入口リンク文言 |
| pages/client-detail.html:6 | `<title>クライアント詳細 — …` | UI | クライアント | |
| pages/client-list.html:6 | `<title>クライアント一覧 — …` | UI | クライアント | |
| pages/client-create.html:6 | `<title>クライアント登録 — …` | UI | クライアント | |
| pages/client-create.html:55 | `クライアント登録`（見出し） | UI | クライアント | |
| pages/quote-hub.html:34 | `クライアント`（ラベル） | UI | クライアント | |
| pages/quote-hub.html:89 | `<th>クライアント</th>` | UI | クライアント | |
| pages/quote-approval.html:27 | `クライアント:` | UI | クライアント | 定義リスト |
| pages/order-list.html:49 | `<th>クライアント</th>` | UI | クライアント | |
| pages/invoice-list.html:95 | `クライアント名`（ラベル） | UI | クライアント | |
| pages/invoice-list.html:119 | `<th>クライアント</th>` | UI | クライアント | |
| pages/invoice-create.html:218 | 説明文に `クライアントと見積書` | UI | クライアント | |
| pages/invoice-create.html:239 | `クライアント選択` | UI | クライアント | |
| pages/invoice-create.html:584 | JS文字列内 `③クライアントより検収完了` | **条文** | **顧客**（方針） | 納品条件テンプレ |
| pages/invoice-create.html:907 | `alert('クライアントを選択…` | UI | クライアント | |
| pages/invoice-create.html:912 | `選択中のクライアントと見積書` | UI | クライアント | |
| pages/payment-list.html:53 | `クライアント名`（ラベル） | UI | クライアント | |
| pages/payment-list.html:84 | `<th>クライアント</th>` | UI | クライアント | |
| pages/payment-reconcile.html:26 | `クライアント:` | UI | クライアント | |
| pages/document-history.html:48 | `<th>クライアント</th>` | UI | クライアント | アーカイブ対象 |
| pages/dashboard.html:144 | `<th>クライアント</th>` | UI | クライアント | アーカイブ対象 |
| pages/quote-create-lab.html:535 | `クライアント`（必須ラベル） | UI | クライアント | |
| pages/quote-create-lab.html:677 | `クライアントよりRFP` | UI | クライアント | トースト文言 |
| pages/quote-create-lab.html:1116 | `クライアント調達` | **条文**/条件表 | **顧客** 推奨 | セル値 |
| pages/quote-create-lab.html:1124 | `原則クライアント調達` | **条文** | **顧客** 推奨 | textarea |
| pages/quote-create-lab.html:1610 | `クライアント提出用のラボ見積` | UI | クライアント | 説明文 |
| pages/quote-create-lab.html:1621 | `クライアント名` | UI | クライアント | |
| pages/quote-create-maint.html:478 | `クライアント`（必須ラベル） | UI | クライアント | |
| pages/quote-create-maint.html:619 | `クライアントよりRFP` | UI | クライアント | |
| pages/quote-create-maint.html:1430 | `クライアント提出用の保守見積` | UI | クライアント | |
| pages/quote-create-maint.html:1441 | `クライアント名` | UI | クライアント | |
| pages/quote-create-maint.html:1486 | `OTJ の見積をクライアントに提出` | **※要確認** | UIか条文か境界 | 利益管理ヘルプ |
| pages/quote-create.html:442 | `クライアント`（必須ラベル） | UI | クライアント | |
| pages/quote-create.html:584 | `クライアントよりRFP` | UI | クライアント | |
| pages/quote-create.html:701 | `クライアント提出用の見積書` | UI | クライアント | |
| pages/quote-create.html:718 | `クライアント名` | UI | クライアント | |
| pages/quote-create.html:988 | `原則：クライアント作成` | UI（表の例示値） | クライアント | 納品物表 |
| pages/quote-create.html:1689 | `クライアントに提出する前提` | **※要確認** | ヘルプ＋契約トーン混在 | |
| pages/quote-create.html:2055 | `対象とするクライアント（ブラウザ／OS）` | **条文** | **顧客** 推奨 | 条件ブロック |
| pages/quote-create.html:2207 | textarea 内 `⑤クライアント側提出物` | **条文** | **顧客** 推奨 | |
| pages/quote-create.html:2213 | textarea 内 `クライアント側の意思決定` | **条文** | **顧客** 推奨 | |
| pages/quote-create.html:2371 | textarea 内 `クライアント側のハードウェア` | **条文** | **顧客** 推奨 | |
| pages/quote-create.html:2405 | textarea 内 `クライアントには本件システム` | **条文** | **顧客** 推奨 | 著作権 |
| pages/quote-create.html:3164 | JS文字列 `画面表示・操作の対象とするクライアント` | **条文**/同期 | **顧客** 推奨 | 検索キー |
| pages/quote-create.html:3170 | JS文字列 `OTJの見積をクライアントに提出` | **※要確認** | 同上 | |
| pages/quote-create.html:3173 | JS文字列 `クライアント提出用の見積書レイアウト` | UI寄り | クライアント | プレビュー説明 |
| pages/quote-update-ver3.html:206 | `クライアント`（必須ラベル） | UI | クライアント | |
| pages/quote-update-ver3.html:326 | `クライアントよりRFP` | UI | クライアント | |
| pages/quote-update-ver3.html:405 | `クライアント提出用の見積書レイアウト` | UI | クライアント | |
| pages/quote-update-ver3.html:409 | `クライアント名` | UI | クライアント | |
| pages/quote-update-ver3.html:689 | `原則：クライアント作成` | UI | クライアント | |
| pages/quote-update-ver3.html:1390 | `クライアントに提出する前提` | **※要確認** | ヘルプ | |
| pages/quote-update-ver3.html:1625 | `③クライアントより検収完了` | **条文** | **顧客** 推奨 | `<p>` 内納品条件 |
| pages/quote-update-ver3.html:1754 | `対象とするクライアント（ブラウザ／OS）` | **条文** | **顧客** 推奨 | |
| pages/quote-update-ver3.html:1907 | textarea `⑤クライアント側提出物` | **条文** | **顧客** 推奨 | |
| pages/quote-update-ver3.html:1913 | textarea `クライアント側の意思決定` | **条文** | **顧客** 推奨 | |
| pages/quote-update-ver3.html:2010 | textarea `③クライアントより検収完了` | **条文** | **顧客** 推奨 | |
| pages/quote-update-ver3.html:2024 | textarea `クライアント側のハードウェア` | **条文** | **顧客** 推奨 | |
| pages/quote-update-ver3.html:2058 | textarea `クライアントには本件システム` | **条文** | **顧客** 推奨 | |
| pages/quote-detail.html:490 | `クライアント`（必須ラベル） | UI | クライアント | |
| pages/quote-detail.html:610 | `クライアントよりRFP` | UI | クライアント | |
| pages/quote-detail.html:637 | `クライアント提出用の見積書` | UI | クライアント | |
| pages/quote-detail.html:681 | `クライアント名` | UI | クライアント | |
| pages/quote-detail.html:757 | `クライアント名` | UI | クライアント | |
| pages/quote-detail.html:829 | `クライアントに提出する前提` | **※要確認** | ヘルプ | |
| pages/quote-detail.html:875 | コメント `クライアント発注書` | UI | クライアント | HTMLコメント |
| pages/quote-detail.html:877 | `クライアントからの発注書` | UI | クライアント | 説明文 |
| pages/quote-detail.html:880 | `クライアント発注書`（タブラベル） | UI | クライアント | |
| pages/quote-detail.html:1204 | `原則：クライアント作成` | UI | クライアント | |
| pages/quote-detail.html:2957 | JS `'画面表示・操作の対象とするクライアント'` | **条文**/同期 | **顧客** 推奨 | |
| pages/quote-detail.html:2963 | JS `'OTJの見積をクライアントに提出する前提で'` | **※要確認** | | |
| pages/quote-detail.html:2966 | JS `'クライアント提出用の見積書レイアウト（デモ）'` | UI | クライアント | |
| pages/quote-detail.html:2967 | JS `'クライアント提出用の見積書（デモ）'` | UI | クライアント | |

#### `顧客`（1行ずつ）

| ファイル:行 | 現在の文字列(抜粋) | 文脈分類 | 推奨される正規語 | 備考 |
|----|----|----|----|----|
| pages/quote-create-lab.html:1234 | `顧客情報`（textarea） | **条文** | 顧客 | 秘密保持・再委託周辺 |
| pages/quote-create-lab.html:1312 | `顧客窓口は弊社` | **条文** | 顧客 | 再委託条項 |
| pages/quote-create-lab.html:2598 | `var tail = '…顧客窓口…'` | **条文**/JS | 顧客 | テンプレ同期 |
| pages/quote-create-lab.html:2624 | `ta.value = '…顧客窓口…'` | **条文**/JS | 顧客 | |
| pages/quote-create-maint.html:1201 | `顧客窓口は弊社`（textarea） | **条文** | 顧客 | |
| pages/quote-create-maint.html:1820 | `var tail = '…顧客窓口…'` | **条文**/JS | 顧客 | |
| pages/quote-create-maint.html:1846 | `ta.value = '…顧客窓口…'` | **条文**/JS | 顧客 | |
| pages/quote-create.html:2191 | `顧客窓口は弊社`（textarea） | **条文** | 顧客 | |
| pages/quote-create.html:2943 | `var tail = '…顧客窓口…'` | **条文**/JS | 顧客 | |
| pages/quote-create.html:2969 | `ta.value = '…顧客窓口…'` | **条文**/JS | 顧客 | |
| pages/quote-update-ver3.html:1891 | `顧客窓口は弊社`（textarea） | **条文** | 顧客 | |
| pages/quote-update-ver3.html:2587 | `var tail = '…顧客窓口…'` | **条文**/JS | 顧客 | |
| pages/quote-update-ver3.html:2616 | `ta.value = '…顧客窓口…'` | **条文**/JS | 顧客 | |
| pages/quote-detail.html:2582 | `var tail = '…顧客窓口…'` | **条文**/JS | 顧客 | |
| pages/quote-detail.html:2611 | `ta.value = '…顧客窓口…'` | **条文**/JS | 顧客 | |
| pages/client-detail.html:176 | `顧客管理システム保守` | **その他** | ※要確認 | 案件名ダミー（製品カテゴリ名） |
| mock-audit.md:216 | 表セル「顧客」 | **その他** | ドキュメント | 監査記述 |
| mock-audit.md:299 | 所見「クライアント/顧客」 | **その他** | ドキュメント | |

#### `お客様`（1行ずつ）

| ファイル:行 | 現在の文字列(抜粋) | 文脈分類 | 推奨される正規語 | 備考 |
|----|----|----|----|----|
| pages/quote-create-maint.html:932 | `お客様の操作ミス` | **条文** | **顧客**（方針: 敬体・相手方） | SLA説明 |
| pages/quote-create-maint.html:1119 | `お客様側の操作ミス`（表） | **条文** | **顧客** | |
| pages/quote-create-maint.html:1265 | 表セル `お客様` | **条文** | **顧客** | 工程表 |
| pages/quote-create-maint.html:1269 | textarea `お客様側にて` | **条文** | **顧客** | |
| pages/quote-create-maint.html:1286 | `別途お客様の負担` | **条文** | **顧客** | |
| pages/quote-create-maint.html:1289 | `お客様の負担` | **条文** | **顧客** | |
| pages/quote-create-maint.html:1324 | `お客様側の操作ミス` | **条文** | **顧客** | |
| pages/quote-create-maint.html:1339 | `お客様側の操作ミス` | **条文** | **顧客** | |
| pages/quote-create-maint.html:1388 | `お客様には…ライセンス` | **条文** | **顧客** | |
| pages/quote-create-maint.html:1392 | `事前にお客様の確認` | **条文** | **顧客** | |
| pages/quote-create.html:1977 | `1.2 お客様からの要求` | **条文** | **顧客** | 見出し |
| pages/quote-create.html:2227 | `お客様にて実施` | **条文** | **顧客** | |
| pages/quote-create.html:2242 | `お客様より検収完了` | **条文** | **顧客** | |
| pages/quote-create.html:2289 | `「1.2 お客様からの要求」一覧` | **条文**/注釈 | **顧客** | |
| pages/quote-update-ver3.html:1677 | `1.2 お客様からの要求` | **条文** | **顧客** | |
| pages/quote-update-ver3.html:1924 | `お客様にて実施` | **条文** | **顧客** | |
| js/quote-ukeoi-condition-defaults.js:93 | `1.2 お客様からの要求 行1` | **条文**/マスタ | **顧客** | HTMLと整合要 |
| pages/quote-detail.html:2930 | コメント `お客様提出用プレビュー` | **その他** | ※要確認 | コードコメント |
| pages/quote-detail.html:3150 | コメント `お客様向けに…原価単価列` | **その他** | ※要確認 | コードコメント |

#### `取引先`（実行系 `*.html` / `*.js` では **0件**）

| ファイル:行 | 現在の文字列(抜粋) | 文脈分類 | 推奨される正規語 | 備考 |
|----|----|----|----|----|
| mock-audit.md:216 | 表見出し「取引先呼称」 | **その他** | ドキュメント | コード置換対象外 |

---

### 3.4 請求番号「OTJ-INV-」プレフィックス除去

| ファイル:行 | 現在の文字列 | 置換後の予定 | 備考 |
|----|----|----|----|
| pages/purchase-list.html:142 | `OTJ-INV-2026-0045` | `INV-2026-0045` | **発注一覧のダミー請求番号**。請求一覧の `INV-2026-*` との関係は mock-audit でも **人間確認（推測）** |
| pages/purchase-list.html:153 | `OTJ-INV-2026-0038` | `INV-2026-0038` | 同上 |
| pages/purchase-list.html:164 | `OTJ-INV-2026-0021` | `INV-2026-0021` | 同上 |
| mock-audit.md:218,249 | 監査記述 | 文言の更新 | ドキュメント。実データ行は上記3行のみ |

---

### 3.5 人物ロール「出力者」

| ファイル:行 | 現在の文字列 | 文脈 | 推奨される正規語 | 備考 |
|----|----|----|----|----|
| pages/document-history.html:50 | `<th>出力者</th>` | 帳票履歴テーブルヘッダ | **作成者**（方針） | **アーカイブ対象**。他に同一画面内のtbodyデータ行は別途確認 |
| mock-audit.md:217,261 | 監査記述 | ドキュメント | 2-Bで「作成者」への方針に合わせ更新 | |

**検索上、他HTML/JSに「出力者」は未検出**（`document-history` と監査ドキュメントのみ）。

---

## 4. リンク切れリスク（§1の集約）

| リスク源 | 内容 | 重要度 |
|----|----|----|
| `js/layout.js` → `quote-list.html` | ナビの実URL。スタブをアーカイブ移動すると **404** | **高**（全画面共通サイドバー） |
| `purchase-list.html` → `purchase-detail.html` | 行クリックで詳細へ遷移するモック。**詳細をアーカイブすると発注一覧から遷移不能** | **高**（VN発注フロー） |
| その他8ファイル | 他ページから **ハイパーリンク未接続** のため、移動による直接切れは小 | 低〜中（ブックマーク・手打ちURLのみ想定） |
| `mock-audit.md` / `tools/split_pages.py` | ドキュメント・旧スクリプトのパスずれ | 低（開発者向け） |

**所見（業務フロー）**: **見積一覧**と**発注一覧→詳細**の2点が実用上のボトルネック。2-Bでは **`layout.js` の href 更新**と **`purchase-list` の遷移先決定**を最優先するとよい（推測）。

---

## 5. 監査者所見（オーナー判断推奨・3〜7項目）

1. **ナビURLとスタブの両立**: `quote-list.html` をアーカイブ移動する場合、`layout.js` を `quote-hub.html` に直さないとリンク切れになる。スタブを残す場合は **アーカイブ対象から外す** か、**リダイレクト先を新パスに更新**するかの二者択一が必要。  
2. **`purchase-detail` 置き換え先**: 本文がプレースホルダのため、アーカイブ後は **一覧の `data-href` をどこに向けるか**（新モック・「準備中」モーダル・リンク無効化）をオーナー決定。  
3. **「見積り」一括置換**: UIの `見積り担当` 等は **y** しやすいが、**お見積り**・**別途お見積り**は帳票・法務トーンのため **機械一括は非推奨**。条文内のひらがな統一は **法務レビュー** を推奨。  
4. **原価ラベル（OTA / OTJ / 発注先）**: モックは **「OTA原価」（承認系）** と **「OTJ原価／発注先原価」（見積利益管理）** の二語彙。**NC原価** という表記は未登場。正規化は **列定義・計算式・localStorageキー説明** を含むため、**用語マッピング表** をオーナー承認してから2-B実行が安全。  
5. **クライアント vs 顧客**: 同一ファイル内で **UIはクライアント・条項textareaはクライアント表記が混在**（例: `quote-create.html` の性能・著作権条項）。方針どおり **条文を顧客に統一**するか、**対外契約ではクライアントのまま**とするかをオーナー決定。  
6. **`OTJ-INV-` 除去**: 実データは **purchase-list の3セルのみ**。請求一覧との番号体系の **意図的差** か **ゆれ** かをオーナー確認後に置換。  
7. **`出力者`**: 実画面は **document-history のみ**でアーカイブ予定。帳票履歴を別ページで復活させるなら **列名を「作成者」に**合わせるタイミングを決める。

---

## 変更ファイルについて（フェーズ2-A 締め）

**本フェーズでリポジトリに加えた変更は、本ドキュメント `mock-cleanup-plan.md` の新規作成のみです。** その他の HTML / JS / CSS / 設定ファイルには **一切手を入れていません**。
