/**
 * 静的サイト用: サイドバー・ヘッダーを挿入し、現在ページのナビを active にする。
 * 各ページ body に data-page-name="<画面ID>"（ファイル名の .html より前と同一）を付与。
 */
(function () {
    var TITLES = {
        dashboard: "ダッシュボード",
        "client-list": "クライアント一覧",
        "client-detail": "クライアント詳細",
        "client-create": "クライアント登録",
        "quote-hub": "見積・承認",
        "quote-list": "見積一覧",
        "quote-create": "見積新規作成",
        "quote-create-lab": "ラボ見積新規作成",
        "quote-create-maint": "保守見積新規作成",
        "quote-edit": "見積編集",
        "quote-detail": "見積詳細",
        "quote-update-ver3": "見積書ver3",
        "quote-approval": "見積承認",
        "quote-compare": "見積バージョン比較",
        "document-history": "帳票出力履歴",
        "order-list": "受注一覧",
        "order-detail": "受注詳細",
        "purchase-list": "VN発注一覧",
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
    };

    /** href ファイル名（pages/ 直下）と data-page-name の対応 */
    var NAV = [
        {
            page: "quote-hub",
            href: "quote-hub.html",
            icon: "bi-file-earmark-check",
            label: "見積・承認",
            quoteNavGroup: true,
            badge: null,
        },
        { page: "invoice-list", href: "invoice-list.html", icon: "bi-receipt", label: "請求一覧", badge: null },
        { page: "purchase-list", href: "purchase-list.html", icon: "bi-box-seam", label: "VN発注一覧", badge: null },
        { page: "client-list", href: "client-list.html", icon: "bi-people", label: "クライアント", badge: null },
        { page: "master-management", href: "master-management.html", icon: "bi-gear", label: "マスタ管理", badge: null },
    ];

    function esc(s) {
        return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
    }

    function navItem(item, current) {
        var active = "";
        if (item.quoteNavGroup) {
            active = /^quote-/.test(current) ? " active" : "";
        } else if (item.page === current) {
            active = " active";
        }
        var badgeHtml = "";
        if (item.badge) {
            badgeHtml =
                '<span class="badge badge-count ' +
                item.badge.cls +
                '">' +
                esc(item.badge.text) +
                "</span>";
        }
        return (
            '<a class="sidebar-nav-item' +
            active +
            '" href="' +
            esc(item.href) +
            '">' +
            '<i class="bi ' +
            esc(item.icon) +
            '"></i>' +
            "<span>" +
            esc(item.label) +
            "</span>" +
            badgeHtml +
            "</a>"
        );
    }

    function buildChrome(currentPage) {
        var title = TITLES[currentPage] || "システム";
        var navHtml = NAV.map(function (item) {
            return navItem(item, currentPage);
        }).join("");
        var sidebar =
            '<div class="sidebar">' +
            '<div class="sidebar-brand"><i class="bi bi-building"></i> 業務管理システム</div>' +
            '<nav class="sidebar-nav">' +
            navHtml +
            "</nav></div>";
        var header =
            '<header class="main-header">' +
            '<h1 class="header-title" id="headerTitle">' +
            esc(title) +
            "</h1>" +
            '<div class="header-actions">' +
            '<button type="button" class="btn btn-light btn-sm"><i class="bi bi-bell"></i></button>' +
            '<button type="button" class="btn btn-light btn-sm"><i class="bi bi-question-circle"></i></button>' +
            '<div class="dropdown">' +
            '<button class="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">' +
            '<i class="bi bi-person-circle"></i> 管理者</button>' +
            '<ul class="dropdown-menu dropdown-menu-end">' +
            '<li><a class="dropdown-item" href="#"><i class="bi bi-person"></i> プロフィール</a></li>' +
            '<li><a class="dropdown-item" href="#"><i class="bi bi-gear"></i> 設定</a></li>' +
            '<li><hr class="dropdown-divider"></li>' +
            '<li><a class="dropdown-item" href="#"><i class="bi bi-box-arrow-right"></i> ログアウト</a></li>' +
            "</ul></div></div></header>";
        return sidebar + header;
    }

    var main = document.querySelector("main.main-content");
    if (!main) return;

    if (typeof location !== "undefined" && /(?:\?|&)chrome=0(?:&|$)/.test(location.search)) {
        document.body.classList.add("layout-no-chrome");
        return;
    }

    var metaPage = document.querySelector('meta[name="page-name"]');
    var current =
        document.body.getAttribute("data-page-name") ||
        (metaPage && metaPage.getAttribute("content")) ||
        "client-list";

    main.insertAdjacentHTML("beforebegin", buildChrome(current));
})();
