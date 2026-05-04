/**
 * ラボ見積（quote-create-lab）の詳細条件・固定条件のデフォルト文言を
 * localStorage で上書きし、マスタ管理画面から編集するためのユーティリティ。
 */
(function (global) {
    var STORAGE_KEY = 'mmLabConditionTextDefaults_v1';

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
        var root = global.document && global.document.querySelector(rootSelector || '#quote-create-lab');
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

    function fetchBuiltinMapFromLabHtml(htmlUrl) {
        return new Promise(function (resolve) {
            var url = htmlUrl || 'quote-create-lab.html';
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
                    var root = p.getElementById('quote-create-lab') || p.body;
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

    var LAB_DETAIL_FIELD_META = [
        { key: 'ql_d_doc_1a', label: '1.3.1 お見積り資料 行1・資料', input: 'text' },
        { key: 'ql_d_doc_1b', label: '1.3.1 行1・作成日', input: 'date' },
        { key: 'ql_d_doc_1c', label: '1.3.1 行1・備考', input: 'text' },
        { key: 'ql_d_skill_1', label: '1.3.2 スキル行1', input: 'text' },
        { key: 'ql_d_skill_2', label: '1.3.2 スキル行2', input: 'text' },
        { key: 'ql_d_skill_3', label: '1.3.2 スキル行3', input: 'text' },
        { key: 'ql_d_skill_4', label: '1.3.2 スキル行4', input: 'text' },
        { key: 'ql_d_devfee_1a', label: '1.5 使用料表 行1・端末等', input: 'text' },
        { key: 'ql_d_devfee_1b', label: '1.5 行1・使用料', input: 'text' },
        { key: 'ql_d_devfee_2a', label: '1.5 行2・端末等', input: 'text' },
        { key: 'ql_d_devfee_2b', label: '1.5 行2・使用料', input: 'text' },
        { key: 'ql_d_devfee_3a', label: '1.5 行3・端末等', input: 'text' },
        { key: 'ql_d_devfee_3b', label: '1.5 行3・使用料', input: 'text' },
        { key: 'ql_d_devfee_4a', label: '1.5 行4・端末等', input: 'text' },
        { key: 'ql_d_devfee_4b', label: '1.5 行4・使用料', input: 'text' },
        { key: 'ql_d_devfee_5a', label: '1.5 行5・端末等', input: 'text' },
        { key: 'ql_d_devfee_5b', label: '1.5 行5・使用料', input: 'text' },
        { key: 'ql_l5_supp', label: '1.5 補足（編集可）', rows: 4 },
        { key: 'ql_l1', label: '1.1 ラボのサービス範囲・成果物の扱い', rows: 20 },
        { key: 'ql_l2', label: '1.2 人月・時間外係数・計算式', rows: 26 },
        { key: 'ql_l4', label: '1.4 コミュニケーション範囲・日越', rows: 18 },
        { key: 'ql_l6', label: '1.6 OSS・追加スキル・開発実績', rows: 16 },
        { key: 'ql_l7', label: '1.7 ラボ契約の請求・締めサイクル', rows: 12 },
        { key: 'ql_l8', label: '1.8 前提条件・同意事項', rows: 22 },
        { key: 'ql_l9', label: '1.9 任意解約・契約終了と精算', rows: 16 },
        { key: 'ql_l10', label: '1.10 稼働の記録・承認方法', rows: 16 },
        { key: 'ql_l11', label: '1.11 秘密保持の参照', rows: 12 },
        { key: 'ql_l12', label: '1.12 メンバー交代・同等スキル', rows: 14 },
        { key: 'ql_l13', label: '1.13 下請法上の表示', rows: 14 },
        { key: 'ql_qc_extra', label: '追加条項・特記事項（ラボ）', rows: 6 },
    ];

    var LAB_FIXED_FIELD_META = [
        {
            key: 'qc_re_sub_party_sel',
            label: '2. 再委託 — 再委託先の表記',
            input: 'select',
            options: [
                { value: 'otasjc', label: 'ONETECH ASIA JOINT STOCK COMPANY' },
                { value: 'nexconstruct', label: 'NeXConstruct' },
                { value: 'other', label: 'その他の企業（下欄に会社名）' },
                { value: 'none', label: '再委託なし（One Technology Japanが対応）' },
            ],
        },
        { key: 'qc_re_sub_party_custom', label: '2. 再委託 — その他の再委託先（会社名）', input: 'text' },
        { key: 'qc_a1', label: '2. 再委託 — 本文', rows: 5 },
        { key: 'qlf_f3', label: '3. 下請けに関する法令上の表示', rows: 16 },
        { key: 'qlf_f4', label: '4. 準委任の趣旨・委任事務の範囲・報告', rows: 18 },
        { key: 'qlf_f5', label: '5. スケジュール・遅延・指示の変更', rows: 16 },
        { key: 'qlf_f6', label: '6. 中間確認・評価（成果確約なし）', rows: 16 },
        { key: 'qlf_f7', label: '7. 開発瑕疵の取り扱い', rows: 18 },
        { key: 'qlf_f8', label: '8. 対応時間・休日', rows: 32 },
        { key: 'qlf_f9', label: '9. 支払条件（準委任・ラボ）', rows: 16 },
        { key: 'qlf_f10', label: '10. 成果物・ドキュメントの授受・保存', rows: 16 },
        { key: 'qlf_f11', label: '11. 第三者サービス・性能に関する免責', rows: 14 },
        { key: 'qlf_f12', label: '12. 発注・業務指示・仕様の確定', rows: 16 },
        { key: 'qlf_f13', label: '13. 知的財産権・秘密保持・個人情報', rows: 20 },
        { key: 'qlf_f14', label: '14. 任意解約・契約終了・精算', rows: 18 },
        { key: 'qlf_f15', label: '15. メンバー交代・同等スキル', rows: 14 },
        { key: 'qlf_f16', label: '16. 稼働記録の作成・保存・開示', rows: 14 },
        { key: 'qlf_f17', label: '17. 損害賠償・準拠法', rows: 14 },
    ];

    global.QuoteLabConditionDefaults = {
        STORAGE_KEY: STORAGE_KEY,
        loadAll: loadAll,
        saveAll: saveAll,
        savePartial: savePartial,
        applyFromStorage: applyFromStorage,
        fetchBuiltinMapFromLabHtml: fetchBuiltinMapFromLabHtml,
        LAB_DETAIL_FIELD_META: LAB_DETAIL_FIELD_META,
        LAB_FIXED_FIELD_META: LAB_FIXED_FIELD_META,
    };
})(typeof window !== 'undefined' ? window : this);
