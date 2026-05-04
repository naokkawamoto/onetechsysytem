/**
 * ラボ見積（quote-create-lab）の「詳細設定」タブ（#quote-items 内 #lab-months-container）の
 * 月別明細の初期値を localStorage で上書きし、マスタ管理から JSON で取り込み・保存するユーティリティ。
 *
 * 保存形式: { v: 1, months: [ { ym: "2026-04", rows: [ { itemName, kind, rateType, mm, defaultRate }, ... ] }, ... ] }
 */
(function (global) {
    var STORAGE_KEY = "mmLabQuoteItemsDefaults_v1";
    var DOC_VERSION = 1;

    function loadDoc() {
        try {
            var raw = global.localStorage && global.localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            var o = JSON.parse(raw);
            if (!o || typeof o !== "object" || !Array.isArray(o.months)) return null;
            return o;
        } catch (e) {
            return null;
        }
    }

    function saveDoc(doc) {
        if (!global.localStorage) return;
        global.localStorage.setItem(STORAGE_KEY, JSON.stringify(doc || { v: DOC_VERSION, months: [] }));
    }

    function clearAll() {
        if (global.localStorage) global.localStorage.removeItem(STORAGE_KEY);
    }

    function getRateTypesList() {
        if (typeof global.QuoteUnitPriceConfig === "undefined" || !global.QuoteUnitPriceConfig.getRateTypes) {
            return [];
        }
        return global.QuoteUnitPriceConfig.getRateTypes() || [];
    }

    function refillLabRateSelect(sel, selectedId) {
        var types = getRateTypesList();
        if (!sel) return;
        sel.innerHTML = "";
        types.forEach(function (rt) {
            var o = global.document.createElement("option");
            o.value = rt.id;
            o.textContent = rt.label;
            sel.appendChild(o);
        });
        var id = String(selectedId || "").trim();
        var ok = types.some(function (t) {
            return t.id === id;
        });
        sel.value = ok ? id : types[0] && types[0].id ? types[0].id : "";
    }

    function collectLabRowState(tr) {
        var name = tr.querySelector(".lab-item-name");
        var kind = tr.querySelector(".lab-kind");
        var rtSel = tr.querySelector(".lab-rate-type");
        var mm = tr.querySelector(".lab-mm");
        var def = tr.getAttribute("data-lab-default-rate") || "PG_VN";
        if (rtSel && rtSel.options.length === 0) {
            refillLabRateSelect(rtSel, def);
        }
        return {
            defaultRate: tr.getAttribute("data-lab-default-rate") || null,
            itemName: name ? String(name.value) : "",
            kind: kind ? String(kind.value) : "日",
            rateType: rtSel ? String(rtSel.value) : "",
            mm: mm ? String(mm.value) : "0.00",
        };
    }

    function collectMonthsFromLabContainer(container) {
        if (!container) return [];
        var months = [];
        container.querySelectorAll(".lab-month-card").forEach(function (card) {
            var ym = card.getAttribute("data-lab-ym") || "";
            var rows = [];
            card.querySelectorAll(".lab-month-tbody .lab-detail-row").forEach(function (tr) {
                rows.push(collectLabRowState(tr));
            });
            months.push({ ym: ym, rows: rows });
        });
        return months;
    }

    function fetchBuiltinMonthsFromLabHtml(htmlUrl) {
        return new Promise(function (resolve) {
            var url = htmlUrl || "quote-create-lab.html";
            if (!global.fetch) {
                resolve([]);
                return;
            }
            global
                .fetch(url, { cache: "no-store" })
                .then(function (r) {
                    if (!r.ok) throw new Error(String(r.status));
                    return r.text();
                })
                .then(function (html) {
                    var p = new global.DOMParser().parseFromString(html, "text/html");
                    var container = p.getElementById("lab-months-container");
                    if (!container) {
                        resolve([]);
                        return;
                    }
                    container.querySelectorAll(".lab-detail-row").forEach(function (tr) {
                        var rtSel = tr.querySelector(".lab-rate-type");
                        var def = tr.getAttribute("data-lab-default-rate") || "PG_VN";
                        if (rtSel) refillLabRateSelect(rtSel, def);
                    });
                    resolve(collectMonthsFromLabContainer(container));
                })
                .catch(function () {
                    resolve([]);
                });
        });
    }

    function setSelectValueIfOptionExists(sel, value) {
        if (!sel || !sel.options || !sel.options.length) return false;
        var v = String(value || "");
        for (var i = 0; i < sel.options.length; i++) {
            if (sel.options[i].value === v) {
                sel.value = v;
                return true;
            }
        }
        return false;
    }

    function applyMonthsToLiveDom(rootSelector) {
        var doc = global.document;
        var root = doc.querySelector(rootSelector || "#quote-create-lab");
        if (!root) return;
        var container = root.querySelector("#lab-months-container");
        if (!container) return;
        var stored = loadDoc();
        if (!stored || !Array.isArray(stored.months) || !stored.months.length) return;

        var cards = container.querySelectorAll(".lab-month-card");
        var byYm = {};
        cards.forEach(function (c) {
            var ym = c.getAttribute("data-lab-ym");
            if (ym) byYm[ym] = c;
        });

        stored.months.forEach(function (block) {
            if (!block || typeof block !== "object") return;
            var ym = String(block.ym || "");
            var card = byYm[ym];
            if (!card) return;
            if (card.getAttribute("data-confirmed") === "1") return;
            var domRows = card.querySelectorAll(".lab-month-tbody .lab-detail-row");
            var savedRows = Array.isArray(block.rows) ? block.rows : [];
            var n = Math.min(savedRows.length, domRows.length);
            for (var i = 0; i < n; i++) {
                var tr = domRows[i];
                var d = savedRows[i];
                if (!d || typeof d !== "object") continue;
                var nameInp = tr.querySelector(".lab-item-name");
                var kind = tr.querySelector(".lab-kind");
                var rtSel = tr.querySelector(".lab-rate-type");
                var mmInp = tr.querySelector(".lab-mm");
                if (nameInp && d.itemName != null) nameInp.value = String(d.itemName);
                if (kind && d.kind != null) kind.value = String(d.kind);
                if (mmInp && d.mm != null) mmInp.value = String(d.mm);
                if (rtSel && rtSel.options.length) {
                    var wantRt = d.rateType != null && String(d.rateType).trim() !== "" ? String(d.rateType) : "";
                    if (!setSelectValueIfOptionExists(rtSel, wantRt)) {
                        if (!setSelectValueIfOptionExists(rtSel, d.defaultRate)) {
                            setSelectValueIfOptionExists(rtSel, tr.getAttribute("data-lab-default-rate"));
                        }
                    }
                }
            }
        });

        if (global.window && global.window.QuoteLabCreateRecalc && typeof global.window.QuoteLabCreateRecalc.recalcAll === "function") {
            global.window.QuoteLabCreateRecalc.recalcAll();
        }
    }

    global.QuoteLabItemsDefaults = {
        STORAGE_KEY: STORAGE_KEY,
        DOC_VERSION: DOC_VERSION,
        loadDoc: loadDoc,
        saveDoc: saveDoc,
        clearAll: clearAll,
        collectMonthsFromLabContainer: collectMonthsFromLabContainer,
        fetchBuiltinMonthsFromLabHtml: fetchBuiltinMonthsFromLabHtml,
        applyFromStorage: applyMonthsToLiveDom,
    };
})(typeof window !== "undefined" ? window : this);
