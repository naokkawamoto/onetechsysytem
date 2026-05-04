/**
 * 保守見積（quote-create-maint）の「基本設定」タブの初期値を localStorage で上書きし、
 * マスタ管理から編集するためのユーティリティ。
 */
(function (global) {
    var STORAGE_KEY = 'mmMaintQuoteBasicDefaults_v1';

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
        var basic = root.querySelector('#quote-basic');
        if (!basic) return;
        var all = loadAll();
        Object.keys(all).forEach(function (key) {
            var el = basic.querySelector('[data-qb-default-key="' + key.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"]');
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
                    var pane = p.getElementById('quote-basic');
                    var out = {};
                    if (!pane) {
                        resolve({});
                        return;
                    }
                    pane.querySelectorAll('[data-qb-default-key]').forEach(function (el) {
                        var k = el.getAttribute('data-qb-default-key');
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

    /** 請負基本設定と同一キー体系（マスタのフォーム定義を共通化） */
    var MAINT_BASIC_FIELD_META = [
        {
            key: 'qb_case_category',
            label: '案件分類',
            input: 'select',
            options: [
                { value: '新規開発', label: '新規開発' },
                { value: '保守・運用', label: '保守・運用' },
                { value: '機能追加', label: '機能追加' },
            ],
        },
        { key: 'qb_start_date', label: '開始予定日', input: 'date' },
        { key: 'qb_due_date', label: '納期', input: 'date' },
        { key: 'qb_duration_md', label: '工期（人月）', input: 'number', step: '0.1', min: '0' },
        { key: 'qb_valid_until', label: '見積有効期限', input: 'date' },
        { key: 'qb_payment_terms', label: '支払条件', rows: 2 },
        {
            key: 'qb_delivery_method',
            label: '納品方法',
            input: 'select',
            options: [
                { value: '電子納品', label: '電子納品' },
                { value: 'オンサイト', label: 'オンサイト' },
            ],
        },
        { key: 'qc-maint-estimate-amount', label: '保守運用 月間概算（税別・数値）', input: 'number', step: '1', min: '0' },
        {
            key: 'qc-cloud-scope',
            label: 'クラウド（見積計上）',
            input: 'select',
            options: [
                { value: '対象', label: '対象' },
                { value: '対象外', label: '対象外' },
            ],
        },
        { key: 'qc-cloud-provider', label: 'クラウド プロバイダー', rows: 2 },
        { key: 'qc-cloud-estimate-amount', label: 'クラウド 月間概算（税別・数値）', input: 'number', step: '1', min: '0' },
    ];

    global.QuoteMaintBasicDefaults = {
        STORAGE_KEY: STORAGE_KEY,
        loadAll: loadAll,
        saveAll: saveAll,
        savePartial: savePartial,
        applyFromStorage: applyFromStorage,
        fetchBuiltinMapFromMaintHtml: fetchBuiltinMapFromMaintHtml,
        MAINT_BASIC_FIELD_META: MAINT_BASIC_FIELD_META,
    };
})(typeof window !== 'undefined' ? window : this);
