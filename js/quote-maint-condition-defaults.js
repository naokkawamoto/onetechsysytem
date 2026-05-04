/**
 * 保守見積（quote-create-maint）の詳細条件・固定条件のデフォルト文言を
 * localStorage で上書きし、マスタ管理画面から編集するためのユーティリティ。
 * 請負用（mmUkeoiConditionTextDefaults_v1）とは別キーで保存します。
 */
(function (global) {
    var STORAGE_KEY = 'mmMaintConditionTextDefaults_v1';

    function loadAll() {
        try {
            var raw = global.localStorage && global.localStorage.getItem(STORAGE_KEY);
            if (!raw) return {};
            var o = JSON.parse(raw);
            return o && typeof o === 'object' ? o : {};
        } catch (e) {
            return {};
        }
    }

    function saveAll(obj) {
        if (!global.localStorage) return;
        global.localStorage.setItem(STORAGE_KEY, JSON.stringify(obj || {}));
    }

    function savePartial(updates) {
        var all = loadAll();
        Object.keys(updates || {}).forEach(function (k) {
            all[k] = updates[k];
        });
        saveAll(all);
    }

    function applyFromStorage(rootSelector) {
        var root = global.document && global.document.querySelector(rootSelector || '#quote-create-maint');
        if (!root) return;
        var all = loadAll();
        Object.keys(all).forEach(function (key) {
            var el = root.querySelector('[data-qc-default-key="' + key.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"]');
            if (!el) return;
            var v = all[key];
            if (v == null) return;
            if (el.tagName === 'SELECT') {
                el.value = String(v);
            } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.value = String(v);
            }
        });
    }

    function fetchBuiltinMapFromMaintHtml(htmlUrl) {
        return new Promise(function (resolve) {
            var url = htmlUrl || 'quote-create-maint.html';
            if (!global.fetch) {
                resolve({});
                return;
            }
            fetch(url, { cache: 'no-store' })
                .then(function (r) {
                    if (!r.ok) throw new Error(String(r.status));
                    return r.text();
                })
                .then(function (html) {
                    var p = new global.DOMParser().parseFromString(html, 'text/html');
                    var root = p.getElementById('quote-create-maint') || p.body;
                    var out = {};
                    if (!root) {
                        resolve({});
                        return;
                    }
                    root.querySelectorAll('[data-qc-default-key]').forEach(function (el) {
                        var k = el.getAttribute('data-qc-default-key');
                        if (!k) return;
                        if (el.tagName === 'SELECT') out[k] = el.value;
                        else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') out[k] = el.value != null ? el.value : '';
                    });
                    resolve(out);
                })
                .catch(function () {
                    resolve({});
                });
        });
    }

    var MAINT_DETAIL_FIELD_META = [
        { key: 'qc_m_sys_name', label: '■1.1 対象システム名', input: 'text' },
        { key: 'qc_m_dev_cost', label: '■1.1 開発費（税別・万円欄）', input: 'text' },
        { key: 'qc_m_maint_month', label: '■1.1 月額保守費用（税別・万円欄）', input: 'text' },
        { key: 'qc_m_maint_year', label: '■1.1 年間保守費用（税別・万円欄）', input: 'text' },
        { key: 'qc_m_infra_note', label: '■1.1 インフラ', input: 'text' },
        {
            key: 'qc-maint-satellite',
            label: '■1.1 サテライト連携',
            input: 'select',
            options: [
                { value: 'なし', label: 'なし' },
                { value: 'あり', label: 'あり' },
            ],
        },
        { key: 'qc_m_migration_src_name', label: '■1.2 移行元システム正式名称', input: 'text' },
        { key: 'qc_m_disclaimer_migration', label: '■6.1 移行元システムの名称', input: 'text' },
        { key: 'qc_m_disclaimer_db', label: '■6.2 データベース（製品名等）', input: 'text' },
        { key: 'qc_m_extra_terms', label: '■7. 追加条項・特記事項', rows: 8 },
    ];

    var MAINT_FIXED_FIELD_META = [
        {
            key: 'qc_m_fix_re_sub_party_sel',
            label: '2. 再委託 — 再委託先の表記',
            input: 'select',
            options: [
                { value: 'otasjc', label: 'ONETECH ASIA JOINT STOCK COMPANY' },
                { value: 'nexconstruct', label: 'NeXConstruct' },
                { value: 'other', label: 'その他の企業（下欄に会社名）' },
                { value: 'none', label: '再委託なし（One Technology Japanが対応）' },
            ],
        },
        { key: 'qc_m_fix_re_sub_party_custom', label: '2. 再委託 — その他の再委託先（会社名）', input: 'text' },
        { key: 'qc_m_fix_a1', label: '2. 再委託 — 本文', rows: 5 },
        { key: 'qc_m_fix_a3', label: '3. 対応時間・休日', rows: 24 },
        { key: 'qc_m_fix_a4_note', label: '4. リリース・デプロイフロー — 補足', rows: 5 },
        { key: 'qc_m_fix_a5', label: '5. 支払条件', rows: 20 },
        { key: 'qc_m_fix_a6', label: '6. 月次報告', rows: 10 },
        { key: 'qc_m_fix_a7', label: '7. 開発瑕疵の取り扱い', rows: 16 },
        { key: 'qc_m_fix_a8', label: '8. 共通免責事項', rows: 12 },
        { key: 'qc_m_fix_a9', label: '9. セキュリティパッチ・バージョンアップ', rows: 10 },
        { key: 'qc_m_fix_a10', label: '10. 発注・変更管理', rows: 18 },
        { key: 'qc_m_fix_a11', label: '11. 著作権の帰属', rows: 14 },
        { key: 'qc_m_fix_a12', label: '12. 損害賠償・準拠法', rows: 14 },
        { key: 'qc_m_fix_a13', label: '13. 契約変更・解約', rows: 10 },
    ];

    global.QuoteMaintConditionDefaults = {
        STORAGE_KEY: STORAGE_KEY,
        loadAll: loadAll,
        saveAll: saveAll,
        savePartial: savePartial,
        applyFromStorage: applyFromStorage,
        fetchBuiltinMapFromMaintHtml: fetchBuiltinMapFromMaintHtml,
        MAINT_DETAIL_FIELD_META: MAINT_DETAIL_FIELD_META,
        MAINT_FIXED_FIELD_META: MAINT_FIXED_FIELD_META,
    };
})(typeof window !== 'undefined' ? window : this);
