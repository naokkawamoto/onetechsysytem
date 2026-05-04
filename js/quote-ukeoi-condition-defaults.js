/**
 * 請負見積（quote-create）の詳細条件・固定条件のデフォルト文言を
 * localStorage で上書きし、マスタ管理画面から編集するためのユーティリティ。
 */
(function (global) {
    var STORAGE_KEY = 'mmUkeoiConditionTextDefaults_v1';

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

    function clearAll() {
        if (global.localStorage) global.localStorage.removeItem(STORAGE_KEY);
    }

    function applyFromStorage(rootSelector) {
        var root = global.document && global.document.querySelector(rootSelector || '#quote-create');
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

    /** マスタ画面用：quote-create.html を取得して data-qc-default-key ごとの組み込み値を返す */
    function fetchBuiltinMapFromQuoteCreateHtml(htmlUrl) {
        return new Promise(function (resolve, reject) {
            var url = htmlUrl || 'quote-create.html';
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
                    var out = {};
                    p.querySelectorAll('[data-qc-default-key]').forEach(function (el) {
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

    var UKEOI_DETAIL_FIELD_META = [
        { key: 'qc_d_doc_1a', label: '1.1 お見積り資料 行1・資料', rows: 2 },
        { key: 'qc_d_doc_1b', label: '1.1 行1・作成日', input: 'date' },
        { key: 'qc_d_doc_1c', label: '1.1 行1・備考', rows: 2 },
        { key: 'qc_d_doc_2a', label: '1.1 行2・資料', rows: 2 },
        { key: 'qc_d_doc_2b', label: '1.1 行2・作成日', input: 'date' },
        { key: 'qc_d_doc_2c', label: '1.1 行2・備考', rows: 2 },
        { key: 'qc_d_doc_3a', label: '1.1 行3・資料', rows: 2 },
        { key: 'qc_d_doc_3b', label: '1.1 行3・作成日', input: 'date' },
        { key: 'qc_d_doc_3c', label: '1.1 行3・備考', rows: 2 },
        { key: 'qc_d_req_1', label: '1.2 お客様からの要求 行1', rows: 2 },
        { key: 'qc_d_req_2', label: '1.2 行2', rows: 2 },
        { key: 'qc_d_req_3', label: '1.2 行3', rows: 2 },
        { key: 'qc_d_rq_1', label: '1.3 再見積もり基準 行1', rows: 3 },
        { key: 'qc_d_rq_2', label: '1.3 行2', rows: 3 },
        { key: 'qc_d_rq_3', label: '1.3 行3', rows: 3 },
        { key: 'qc_d_rq_4', label: '1.3 行4', rows: 3 },
        { key: 'qc_d_rq_5', label: '1.3 行5', rows: 3 },
        { key: 'qc_d_period_1', label: '1.4 開発期間', rows: 2 },
        { key: 'qc_d_cloud_sel_1', label: '1.5 クラウド（select の value: AWS/GCP/Azure/その他）', rows: 1 },
        { key: 'qc_d_cloud_txt_1', label: '1.5 アカウント準備・備考', rows: 3 },
        { key: 'qc_d_dev_1', label: '1.6 開発環境 行1', rows: 2 },
        { key: 'qc_d_dev_2', label: '1.6 行2', rows: 2 },
        { key: 'qc_d_dev_3', label: '1.6 行3', rows: 2 },
        { key: 'qc_d_dev_4', label: '1.6 行4', rows: 2 },
        { key: 'qc_d_compat_1', label: '1.7 対応デバイス 行1', rows: 2 },
        { key: 'qc_d_compat_2', label: '1.7 行2', rows: 2 },
        { key: 'qc_d_compat_note', label: '1.7 補足（対応デバイス）', rows: 4 },
        { key: 'qc_d_testenv_1', label: '1.8 テスト環境 行1', rows: 2 },
        { key: 'qc_d_testenv_2', label: '1.8 行2', rows: 2 },
        { key: 'qc_d_testenv_3', label: '1.8 行3', rows: 2 },
        { key: 'qc_d_prod_1', label: '1.9 本番環境 行1', rows: 2 },
        { key: 'qc_d_prod_2', label: '1.9 行2', rows: 2 },
        { key: 'qc_d_prod_3', label: '1.9 行3', rows: 2 },
        { key: 'qc_d_testdev_1', label: '1.10 テストデバイス 行1', rows: 2 },
        { key: 'qc_d_testdev_2', label: '1.10 行2', rows: 2 },
        { key: 'qc_d_testdev_3', label: '1.10 行3', rows: 2 },
        { key: 'qc_d_acc_1_item', label: '1.11 受け入れ条件 行1・項目', rows: 2 },
        { key: 'qc_d_acc_1_note', label: '1.11 行1・備考', rows: 2 },
        { key: 'qc_d_acc_2_item', label: '1.11 行2・項目', rows: 2 },
        { key: 'qc_d_acc_2_note', label: '1.11 行2・備考', rows: 2 },
        { key: 'qc_d_ssl_1', label: '1.12 SSL証明書', rows: 5 },
        { key: 'qc_extra', label: '追加条項・特記事項', rows: 6 }
    ];

    var UKEOI_FIXED_FIELD_META = [
        { key: 'qc_a1', label: '2. 再委託（本文）', rows: 6 },
        { key: 'qc_a2', label: '3. 開発・納期について', rows: 18 },
        { key: 'qc_a3', label: '4. 受入テスト・検収', rows: 32 },
        { key: 'qc_a4', label: '5. 瑕疵担保', rows: 24 },
        { key: 'qc_a5', label: '6. 対応時間・休日', rows: 34 },
        { key: 'qc_a6', label: '7. 支払条件', rows: 18 },
        { key: 'qc_a7', label: '8. 納品物・ドキュメントの保存期間', rows: 16 },
        { key: 'qc_a8', label: '9. 免責', rows: 16 },
        { key: 'qc_a9', label: '10. 発注・仕様管理', rows: 20 },
        { key: 'qc_a10', label: '11. 著作権の帰属', rows: 16 },
        { key: 'qc_a11', label: '12. 損害賠償・準拠法', rows: 14 }
    ];

    global.QuoteUkeoiConditionDefaults = {
        STORAGE_KEY: STORAGE_KEY,
        loadAll: loadAll,
        saveAll: saveAll,
        savePartial: savePartial,
        clearAll: clearAll,
        applyFromStorage: applyFromStorage,
        fetchBuiltinMapFromQuoteCreateHtml: fetchBuiltinMapFromQuoteCreateHtml,
        UKEOI_DETAIL_FIELD_META: UKEOI_DETAIL_FIELD_META,
        UKEOI_FIXED_FIELD_META: UKEOI_FIXED_FIELD_META
    };
})(typeof window !== 'undefined' ? window : this);
