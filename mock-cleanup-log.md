# モック整理 作業ログ（フェーズ2-B）

**フェーズ2-B（整理実行）の作業ログ。**  
**実施日: 2026-05-02**

本ログはオーナー確定方針（方針1〜6）に従い実施した変更のみを記録する。判断が曖昧な項目・方針6の保護対象には手を加えていない。

---

## 1. アーカイブ移動の実施結果

### 1.1 移動したファイル（移動前 → 移動後）

| 移動前 | 移動後 |
|--------|--------|
| `pages/dashboard.html` | `_archive/pages/dashboard.html` |
| `pages/audit-log.html` | `_archive/pages/audit-log.html` |
| `pages/document-history.html` | `_archive/pages/document-history.html` |
| `pages/integration-settings.html` | `_archive/pages/integration-settings.html` |
| `pages/quote-compare.html` | `_archive/pages/quote-compare.html` |
| `pages/delivery-create.html` | `_archive/pages/delivery-create.html` |
| `pages/purchase-order-create.html` | `_archive/pages/purchase-order-create.html` |
| `pages/quote-edit.html` | `_archive/pages/quote-edit.html` |
| `pages/quote-list.html` | `_archive/pages/quote-list.html` |
| `pages/purchase-detail.html` | `_archive/pages/purchase-detail.html` |

### 1.2 `_archive/README.md`

**作成済み。** 各ファイルの移動理由はオーナー指定の表どおり `_archive/README.md` に記載した。実体ファイルは `_archive/pages/` 配下。

---

## 2. ナビ修正の実施結果

**対象ファイル:** `js/layout.js`

### 2.1 実施した差分（該当行）

```diff
         {
             page: "quote-hub",
-            href: "quote-list.html",
+            href: "quote-hub.html",
             icon: "bi-list-ul",
             label: "見積一覧",
```

- **変更行:** `href` のみ（付近は元ファイルで 42 行目相当）。
- **`TITLES` の `"quote-list": "見積一覧"`（12 行目付近）:** 方針どおり **削除・変更していない**。

---

## 3. リンク切れ修正の実施結果

**対象ファイル:** `pages/purchase-list.html`

`data-href` 属性のみ削除。`class` / `role` / `tabindex` / `data-billing-month` / `data-quote-source` は維持。

| 行（実施前基準） | 削除前スニペット（要約） |
|------------------|---------------------------|
| 140 | `<tr class="clickable" role="button" tabindex="0" data-href="purchase-detail.html?id=PO-2026-0018" data-billing-month="2026-05" data-quote-source="OTA">` |
| 151 | `<tr class="clickable" role="button" tabindex="0" data-href="purchase-detail.html?id=PO-2026-0017" data-billing-month="2026-05" data-quote-source="NC">` |
| 162 | `<tr class="clickable" role="button" tabindex="0" data-href="purchase-detail.html?id=PO-2026-0016" data-billing-month="2026-06" data-quote-source="OTHERS">` |

**削除後:** 上記各行に `data-href="purchase-detail.html?..."` は存在しない（クリック時は `data-href` 参照型のハンドラでは無反応となる想定）。

### 3.1 請求番号表記（方針5・同一ファイル）

| 行（実施前基準） | 置換前 | 置換後 |
|------------------|--------|--------|
| 142 | `OTJ-INV-2026-0045` | `INV-2026-0045` |
| 153 | `OTJ-INV-2026-0038` | `INV-2026-0038` |
| 164 | `OTJ-INV-2026-0021` | `INV-2026-0021` |

---

## 4. 用語置換の実施結果

### 4.1 「見積り」→「見積」（方針4・限定箇所のみ）

| ファイル:行 | 置換前 | 置換後 |
|-------------|--------|--------|
| pages/quote-create-lab.html:580 | `見積り担当` | `見積担当` |
| pages/quote-create-maint.html:522 | `見積り担当` | `見積担当` |
| pages/quote-create.html:487 | `見積り担当` | `見積担当` |
| pages/quote-update-ver3.html:246 | `見積り担当者` | `見積担当者` |
| pages/quote-detail.html:530 | `見積り担当者` | `見積担当者` |

### 4.2 `pages/master-management.html`（UIラベル系・パターン一括置換）

方針4どおり、次の **5 パターンのみ** `replace_all` 相当で置換（`お見積り` 等は含まないため対象外のまま）。

| パターン | 置換前 | 置換後 | 置換回数（ツール報告） |
|----------|--------|--------|------------------------|
| A | `見積り詳細条件設定` | `見積詳細条件設定` | 6 箇所 |
| B | `見積り固定条件設定` | `見積固定条件設定` | 6 箇所 |
| C | `見積り単価設定` | `見積単価設定` | 9 箇所 |
| D | `見積りステータス設定` | `見積ステータス設定` | 2 箇所 |
| E | `見積りカテゴリ` | `見積カテゴリ` | 4 箇所 |

**レビュー用スニペット例（置換後・L90 付近）:**

```html
<i class="bi bi-folder2"></i> 見積カテゴリ
```

**置換前（同一位置のイメージ）:** `見積りカテゴリ`

本ファイル内に **`見積り` 残存なし** を grep で確認済み（意図しない部分の取りこぼしなし）。

---

## 5. 触らなかったもの（確認用・grep 件数）

対象は原則 **`pages/*.html`**（アーカイブ移動後）。比較は **同一 grep 条件** で実施。

| カテゴリ | 検索パターン | 実施後の件数（ファイル別・grep count） | 備考 |
|----------|--------------|----------------------------------------|------|
| 敬体・条文系「お見積り」 | `お見積り` | quote-create-lab:3, quote-create:3, quote-update-ver3:2, quote-detail:1（合計 **9**） | 方針4で **未変更**。実施前も同一構成で **9**（dashboard はアーカイブのため pages から除外後も残存ファイルのみで一致）。 |
| 「別途お見積り」 | `別途お見積り` | quote-create-lab:1, quote-create:2, quote-update-ver3:1, quote-detail:1（合計 **5**） | **未変更** |
| 原価関連（保護） | `OTA原価\|OTJ原価\|発注先原価`（正規表現） | 編集した見積系・マスタで件数維持を確認（例: `pages/quote-create.html` **8 件**のまま） | 本フェーズでは **置換・削除なし** |
| `mock-audit.md` | — | **未編集** | 方針6 |
| `tools/split_pages.py` | — | **未編集** | 方針6 |

**補足:** `pages/` 配下から `quote-compare.html` / `audit-log.html` を移動したため、`OTA原価\|OTJ原価\|発注先原価` の **pages 全体の合計件数**は移動前より減少する（ファイルごと消えた分）。**編集したファイル内**の当該文字列は意図的に変更していない。

---

## 6. 検証

| # | 検証項目 | 結果 |
|---|----------|------|
| 1 | `_archive/pages/` に 10 ファイルすべて存在するか | **OK**（`dashboard.html` … `purchase-detail.html` まで 10 件確認） |
| 2 | `pages/` 配下に当該 10 ファイルが残っていないか | **OK**（`pages/` に上記ファイル名の実体なし） |
| 3 | `js/layout.js` のナビ `href` が `quote-hub.html` を指すか | **OK** |
| 4 | `purchase-list.html` の 3 行から `data-href` が消えているか | **OK**（`purchase-detail.html` への `data-href` は **pages 全体 grep でも 0 件**） |
| 5 | `pages/` に `quote-list.html` / `dashboard.html` 等の参照が残っていないか（簡易） | **OK**（`quote-list.html` / `dashboard.html` を `pages` で grep → 0 件） |
| 6 | 保護対象の誤変更混入 | **問題なし（方針範囲内）** — 変更のあったパスは次項のとおり |

### 6.1 本フェーズで変更したパス一覧（想定どおり）

- `_archive/README.md`（新規）
- `_archive/pages/*.html`（上記 10 ファイル・移動）
- `js/layout.js`
- `pages/purchase-list.html`
- `pages/master-management.html`
- `pages/quote-create-lab.html`
- `pages/quote-create-maint.html`
- `pages/quote-create.html`
- `pages/quote-update-ver3.html`
- `pages/quote-detail.html`
- `mock-cleanup-log.md`（本ファイル・新規）

**注:** 作業ツリーの `git status` に **`pages/quote-hub.html` や `css/app.css` の変更**が表示される場合があるが、**本フェーズ2-Bの方針1〜6には含まれない**ため、当実行では編集していない（既存のローカル変更の可能性）。必要に応じて作業者が `git diff` で切り分けすること。

---

## 7. 既知の残課題（次フェーズ・開発依頼で扱う想定）

- **原価データ構造:** OTA原価 / NC原価 / 発注先原価 / OTJ原価の関係整理（モック・用語・列定義）
- **ダミー番号の世界観:** `QUO-2026-0099` 等の整合（フェーズ2-Bでは未着手）
- **ヘッダー「プロフィール」「設定」:** 遷移先の定義
- **`master-management.html` の「準備中」ボタン:** 要件化
- **条文 textarea:** 法務監修フロー

---

## 8. 追加修正（入金管理機能のアーカイブ）

**実施日: 2026-05-02**（オーナー判断による追補。方針 A1〜A5 のみ実施）

### 8.1 アーカイブ移動の実施結果

| 移動前 | 移動後 |
|--------|--------|
| `pages/payment-list.html` | `_archive/pages/payment-list.html` |
| `pages/payment-reconcile.html` | `_archive/pages/payment-reconcile.html` |

### 8.2 ナビ修正の実施結果

- **`NAV` 配列:** 作業前に `js/layout.js` を確認したところ、`page: "payment-list"` を含むエントリは **既に存在しなかった**（サイドバーは見積・請求・発注・クライアント・マスタの 5 項目のみ）。方針 A3 の**目標状態**（「入金管理」がナビにないこと）は満たされているため、**本追補では `NAV` のコード削除は行っていない**（削除対象がなかった）。
- **`TITLES`:** 方針どおり **`"payment-list": "入金管理一覧"`** および **`"payment-reconcile": "入金消込"`** は **削除・変更していない**（過去記録として残置）。

※上記「削除 diff なし」の場合、コードベース上の差分は該当なし。

### 8.3 残存リンク削除

**grep 条件:** リポジトリ全体で `payment-list\.html` / `payment-reconcile\.html`（正規表現）

| 区分 | 結果 | 実施内容 |
|------|------|----------|
| `pages/*.html` | **0 件**（移動後） | 他画面からの `href` / `data-href` / `location.href` による当該2ファイルへのリンク **なし** |
| `js/*.js` | **0 件** | `layout.js` に `.html` 文字列としての参照なし（`TITLES` のキー `payment-list` のみ） |
| `_archive/pages/*.html`（移動後） | 入金2ファイル相互のみ | 方針 A5 のため **アーカイブ済み HTML の内容は変更しない**。相対パス `payment-reconcile.html` / `payment-list.html` は **アーカイブ内の相互遷移**として残存（現行 `pages/` からの導線ではない） |
| `mock-audit.md` / `mock-cleanup-plan.md` | 監査・計画文書にパス表記あり | 方針 A4 の「他HTML/JS」対象外。**変更していない**（過去記録） |
| `tools/split_pages.py` | 辞書キー `payment-list` 等（`.html` 文字列ではない） | 方針 A5・本追補スコープ外のため **未変更** |

**※要確認:** なし（上記のとおり `pages/` / `js/` に残存リンクはなかったため、リンク削除のための HTML/JS 編集は不要と判断）

### 8.4 検証

| # | 検証項目 | 結果 |
|---|----------|------|
| 1 | `_archive/pages/` に `payment-list.html` / `payment-reconcile.html` が存在するか | **OK** |
| 2 | `pages/` 配下に当該2ファイルが残っていないか | **OK** |
| 3 | `js/layout.js` のサイドバー（`NAV`）に「入金管理」相当の項目がないか | **OK**（`payment-list` を含む `NAV` エントリなし） |
| 4 | **アクティブな** HTML/JS（`pages/`・`js/`）に `payment-list.html` / `payment-reconcile.html` への参照が残っていないか | **OK**（grep で 0 件） |
| 5 | `mock-audit.md` 等の過去記録 | 方針どおり **未編集**・検証の「除く」対象 |

**強調:** 現行モックのナビおよび `pages/` / `js/` から、入金管理2画面への **有効な導線は除去済み**（もともと他画面からのリンクは検出されず）。入金画面本体は `_archive/pages/` へ退避のみ。

---

## 9. 追加修正（依頼カテゴリーの整理）

**実施日: 2026-05-02**（方針 B1〜B4 のみ実施）

### 9.0 事前 grep（網羅）

リポジトリ内（`_archive/` は対象外）で次を実施:

| パターン | 削除前の該当（実体） |
|----------|----------------------|
| `通常：概算：請負／保守／サーバー`（全角コロン・全角スラッシュ） | **9 箇所**（`<option>` 7・マスタ `<tr>` 1・一覧デモ `<td>` 1） |
| `通常:概算`（半角コロン） | **0 箇所** |
| `STD_MIXED` / `STD_EST_MCS` | 各 **1 箇所**（いずれも削除対象行にのみ存在。`js/` 内の独立定数は**なし**） |

半角スペース入り・「通常 概算 …」形式の別表記は **検出されず**。

### 9.1 削除した箇所（全件）

| ファイル:行（実施前基準） | 削除前のスニペット | 削除内容 |
|---------------------------|-------------------|----------|
| pages/quote-hub.html:61 | `<option>通常：概算：請負／保守／サーバー</option>` | `<option>` 行を削除 |
| pages/quote-hub.html:145 | `<td>通常：概算：請負／保守／サーバー</td>` | **削除ではなく**、デモ一覧の整合のため `<td>概算：請負／保守／サーバー</td>` に変更（方針 B2 の残存7種のいずれかへ寄せる） |
| pages/master-management.html:567 | `<tr><td>5</td>…value="通常：概算：請負／保守／サーバー"…STD_EST_MCS…</tr>` | マスタ行 **1 行削除**。続行の `#` を 5〜8 に繰り上げ |
| pages/quote-create.html:461 | `<option>通常：概算：請負／保守／サーバー</option>` | 行削除 |
| pages/quote-create-maint.html:497 | 同上 | 行削除 |
| pages/quote-create-lab.html:554 | `<option value="STD_MIXED">通常：概算：請負／保守／サーバー</option>` | 行削除（`value="STD_MIXED"` 含む） |
| pages/quote-detail.html:509 | `<option>通常：概算：請負／保守／サーバー</option>` | 行削除 |
| pages/quote-update-ver3.html:225 | `<option>通常：概算：請負／保守／サーバー</option>` | 行削除 |
| pages/quote-update-ver3.html:431 | `<option>通常：概算：請負／保守／サーバー</option>` | 行削除（見積書プレビュー内の `<select>`） |

### 9.2 grep 結果サマリ

| 確認 | 結果 |
|------|------|
| 削除前 `通常：概算`（`pages/`・`js/`・ルート `*.md` 除く任意） | 実作業前の洗い出し **9 箇所**（§9.0） |
| 削除後 `pages/` / `js/` で `通常：概算` | **0 件** |
| 削除後 `STD_MIXED` / `STD_EST_MCS`（`pages/` / `js/`） | **0 件** |
| `_archive/` | **未編集**（方針 B4） |

### 9.3 残存カテゴリーの確認

**共通の 7 ラベル（＋フィルタ用「すべて」は別）:**  
`通常：請負` / `通常：ラボ` / `通常：保守` / `概算：請負` / `概算：ラボ` / `概算：保守` / `概算：請負／保守／サーバー`

| ファイル | 確認内容 |
|----------|----------|
| pages/quote-hub.html | 「カテゴリー」`<select>`（L56〜65）に **`<option>` 計 8 件**（`すべて` + 上記7）。削除対象の文言 **なし** |
| pages/master-management.html | 見積ステータス設定モーダル内のカテゴリ表（L563〜570）に **データ行 8 件**（`すべて` + 上記7）。`STD_EST_MCS` 行 **なし** |
| その他 | `quote-create` / `maint` / `lab` / `detail` / `update-ver3` の依頼（または見積）カテゴリー `<select>` から該当 `<option>` のみ除去済み |

### 9.4 検証

| # | 検証項目 | 結果 |
|---|----------|------|
| 1 | 7 カテゴリー＋必要箇所の「すべて」が残存 | **OK**（`概算：請負／保守／サーバー` は **維持**） |
| 2 | 「通常：概算：請負／保守／サーバー」が `pages/` / `js/` から消滅 | **OK**（grep **0 件**） |
| 3 | 他の依頼カテゴリー表記に意図しない変更なし | **OK**（削除・デモ1セル修正・マスタ行削除・行番号繰り上げのみ） |
| 4 | ステータス等の別 `<select>` に手を入れていない | **OK**（依頼／見積カテゴリーに紐づく `<option>` のみ） |

**強調:** 依頼カテゴリーの **「通常＋概算」複合1種** をモックから除去し、オーナー指定の **7 区分**に揃えた。`_archive/`・`mock-audit.md`・`mock-cleanup-plan.md`・`js/` 内の追加定数は **変更していない**。

---

## 変更ファイル（本ログ以外）

- リポジトリ: 上記「6.1」および `_archive/` の新規・移動、`mock-cleanup-log.md` の新規作成。
- **§8 追補:** `_archive/pages/payment-list.html` / `payment-reconcile.html` の移動、`_archive/README.md` の表追記、本ログへの §8 追記のみ（`js/layout.js` の `NAV` は変更なし）。
- **§9 追補:** `pages/quote-hub.html` / `master-management.html` / `quote-create*.html` / `quote-detail.html` / `quote-update-ver3.html` のみ編集（本ログ追記）。
