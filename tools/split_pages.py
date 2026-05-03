#!/usr/bin/env python3
"""index.html を pages/<name>.html に分割する（1回用／再生成可）"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
PAGES_DIR = ROOT / "pages"
CSS_DIR = ROOT / "css"
JS_DIR = ROOT / "js"

# 1-based line numbers（grep で確定した各 .screen 開始行）
SCREEN_STARTS = [
    406, 541, 670, 798, 894, 967, 1073, 1351, 1356, 1495, 1614, 1720, 1798, 1878,
    1965, 2057, 2159, 2299, 2474, 2594, 2737, 2866, 2980, 3170,
]
# 最終画面の終了行（</main> 直前の screen 閉じタグまで）
LAST_SCREEN_END = 3443

SCREEN_TITLES = {
    "dashboard": "ダッシュボード",
    "client-list": "クライアント一覧",
    "client-detail": "クライアント詳細",
    "client-create": "クライアント登録",
    "quote-list": "見積一覧",
    "quote-create": "見積新規作成",
    "quote-edit": "見積編集",
    "quote-detail": "見積詳細",
    "quote-approval": "見積承認",
    "quote-compare": "見積バージョン比較",
    "document-history": "帳票出力履歴",
    "order-list": "受注一覧",
    "purchase-list": "発注一覧",
    "purchase-detail": "発注詳細",
    "purchase-order-create": "注文書作成",
    "invoice-list": "請求一覧",
    "invoice-create": "請求書作成",
    "invoice-detail": "請求書詳細",
    "delivery-create": "納品書作成",
    "payment-list": "入金管理一覧",
    "payment-reconcile": "入金消込",
    "master-management": "マスタ管理",
    "integration-settings": "連携設定",
    "audit-log": "監査ログ",
}

SITE_TITLE = "社内業務管理システム"


def extract_screen_ids(lines: list[str]) -> list[str]:
    ids: list[str] = []
    for ln in range(len(SCREEN_STARTS)):
        start = SCREEN_STARTS[ln] - 1
        m = re.search(r'id="([^"]+)"', lines[start])
        if not m:
            raise RuntimeError(f"no id at line {SCREEN_STARTS[ln]}")
        ids.append(m.group(1))
    return ids


def first_line_to_page_root(line: str, page_name: str) -> str:
    # class="screen active" / class="screen" を page-root + data-page-name に
    line = re.sub(
        r'<div id="([^"]+)"\s+class="screen(?:\s+active)?"',
        rf'<div id="\1" class="page-root" data-page-name="{page_name}"',
        line,
        count=1,
    )
    return line


def rewrite_navigation(html: str) -> str:
    html = re.sub(
        r'<a href="#" onclick="showScreen\(\'([^\']+)\'\)">',
        r'<a href="\1.html">',
        html,
    )
    html = re.sub(r"showScreen\('([^']+)'\)", r"location.href='\1.html'", html)
    return html


def main() -> None:
    raw = INDEX.read_text(encoding="utf-8")
    lines = raw.splitlines(keepends=True)

    # --- CSS ---
    css_lines: list[str] = []
    in_style = False
    for line in lines:
        if "<style>" in line:
            in_style = True
            continue
        if "</style>" in line:
            break
        if in_style:
            css_lines.append(line)
    CSS_DIR.mkdir(parents=True, exist_ok=True)
    (CSS_DIR / "app.css").write_text("".join(css_lines), encoding="utf-8")

    screen_ids = extract_screen_ids(lines)
    if len(screen_ids) != len(SCREEN_STARTS):
        raise RuntimeError("screen id count mismatch")

    PAGES_DIR.mkdir(parents=True, exist_ok=True)

    page_template_head = """<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} — {site}</title>
    <meta name="page-name" content="{page_name}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../css/app.css">
</head>
<body data-page-name="{page_name}">
"""

    page_template_foot = """
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/layout.js"></script>
</body>
</html>
"""

    for i, page_name in enumerate(screen_ids):
        start = SCREEN_STARTS[i] - 1
        end = (
            (SCREEN_STARTS[i + 1] - 2)
            if i + 1 < len(SCREEN_STARTS)
            else (LAST_SCREEN_END - 1)
        )
        block_lines = lines[start : end + 1]
        block_lines[0] = first_line_to_page_root(block_lines[0], page_name)
        inner = "".join(block_lines)
        inner = rewrite_navigation(inner)
        # 元 index の区切りコメント（<!-- N. ... -->）がブロック末尾に残るのを除去
        inner, _ = re.subn(
            r"\n\s*<!--\s*\d+\.[^>]*-->\s*",
            "\n",
            inner,
            flags=re.MULTILINE,
        )

        title = SCREEN_TITLES.get(page_name, page_name)
        out = page_template_head.format(
            title=title, site=SITE_TITLE, page_name=page_name
        )
        out += '<main class="main-content">\n' + inner + "\n</main>\n"
        out += page_template_foot

        out_path = PAGES_DIR / f"{page_name}.html"
        out_path.write_text(out, encoding="utf-8")
        print("wrote", out_path.relative_to(ROOT))

    # スタブ（元 HTML に画面ブロックが無い ID 向け）
    stubs = ["client-create"]
    for stub in stubs:
        p = PAGES_DIR / f"{stub}.html"
        if p.exists():
            continue
        title = SCREEN_TITLES.get(stub, stub)
        body = f"""{page_template_head.format(title=title, site=SITE_TITLE, page_name=stub)}
<main class="main-content">
    <div class="page-root" id="{stub}" data-page-name="{stub}">
        <div class="alert alert-info">このページはプレースホルダです（レイアウト用）。</div>
        <a href="client-list.html" class="btn btn-outline-secondary">クライアント一覧へ</a>
    </div>
</main>
{page_template_foot}"""
        p.write_text(body, encoding="utf-8")
        print("wrote stub", p.relative_to(ROOT))


if __name__ == "__main__":
    main()
