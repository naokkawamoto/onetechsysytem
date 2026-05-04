# アーカイブ（モック整理フェーズ2-B）

本ディレクトリは、社内業務管理システムの静的モック整理に伴い **`pages/` から退避した HTML** を格納します。削除ではなく退避のため、履歴参照・差分比較用に保持しています。

## 退避ファイル一覧

| ファイル | 移動理由 |
|---|---|
| `pages/dashboard.html` | 業務上使用しない判断 |
| `pages/audit-log.html` | AWS CloudTrail + バックアップで代替するため画面不要 |
| `pages/document-history.html` | メール送付記録と会計提出物が正本であり画面不要 |
| `pages/integration-settings.html` | 社内システム連携は別の話、本システムでは扱わない |
| `pages/quote-compare.html` | 見積ver2画面の上部に差分表示する仕様のため独立画面不要 |
| `pages/delivery-create.html` | 納品書発行は頻度が低くExcel運用 |
| `pages/purchase-order-create.html` | OTJ発注は見積起点で自動連携、OTA/NCは請求ソートで把握するため新規作成画面不要 |
| `pages/quote-edit.html` | 編集は全てバージョン管理（`quote-update-ver3.html`）経由で行う |
| `pages/quote-list.html` | `quote-hub.html` に統合 |
| `pages/purchase-detail.html` | 発注詳細は一覧と関連エンティティ参照で把握可能 |
| `pages/payment-list.html` | 入金管理機能が現時点では不要と判断 |
| `pages/payment-reconcile.html` | 入金管理機能が現時点では不要と判断 |

実体は `_archive/pages/` 配下にあります。
