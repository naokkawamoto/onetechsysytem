/**
 * 保守見積（quote-create-maint）の「詳細設定」タブ（#quote-items）の明細行初期値を localStorage で上書きし、
 * マスタ管理から JSON で取り込み・保存するためのユーティリティ。
 */
(function (global) {
    var STORAGE_KEY = "mmMaintQuoteItemsDefaults_v1";
    var DOC_VERSION = 1;

    function loadDoc() {
        try {
            var raw = global.localStorage && global.localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            var o = JSON.parse(raw);
            if (!o || typeof o !== "object" || !Array.isArray(o.rows)) return null;
            return o;
        } catch (e) {
            return null;
        }
    }

    function saveDoc(doc) {
        if (!global.localStorage) return;
        global.localStorage.setItem(STORAGE_KEY, JSON.stringify(doc || { v: DOC_VERSION, rows: [] }));
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

    function refillRateSelect(sel, selectedId) {
        var types = getRateTypesList();
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

    function collectRowState(tr) {
        var task = tr.querySelector(".qi-task");
        var kind = tr.querySelector(".qi-kind");
        var scope = tr.querySelector(".qi-scope");
        var md = tr.querySelector(".qi-md");
        var rtSel = tr.querySelector(".qi-rate-type");
        var note = tr.querySelector(".qi-note");
        var am = tr.querySelector(".qi-amount");
        var flat = tr.classList.contains("quote-item-row--flat-amount");
        var flatRateId = tr.getAttribute("data-flat-rate-id");
        var defaultRate = tr.getAttribute("data-default-rate");
        var def = flatRateId || defaultRate || "PG_VN";
        if (rtSel && rtSel.options.length === 0) {
            refillRateSelect(rtSel, def);
        }
        return {
            flat: !!flat,
            flatRateId: flatRateId || null,
            defaultRate: defaultRate || null,
            task: task ? String(task.value) : "",
            kind: kind ? String(kind.value) : "日",
            scope: scope ? String(scope.value) : "対象",
            md: md ? String(md.value) : "0.0",
            rateType: rtSel ? String(rtSel.value) : "",
            amount: flat && am ? String(am.value) : null,
            note: note ? String(note.value) : "",
        };
    }

    function collectRowsFromItemsPane(pane) {
        if (!pane) return [];
        var rows = [];
        pane.querySelectorAll(".quote-item-row").forEach(function (tr) {
            rows.push(collectRowState(tr));
        });
        return rows;
    }

    function fetchBuiltinRowsFromMaintHtml(htmlUrl) {
        return new Promise(function (resolve) {
            var url = htmlUrl || "quote-create-maint.html";
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
                    var pane = p.getElementById("quote-items");
                    if (!pane) {
                        resolve([]);
                        return;
                    }
                    pane.querySelectorAll(".quote-item-row").forEach(function (tr) {
                        var rtSel = tr.querySelector(".qi-rate-type");
                        var def = tr.getAttribute("data-flat-rate-id") || tr.getAttribute("data-default-rate") || "PG_VN";
                        if (rtSel) refillRateSelect(rtSel, def);
                    });
                    resolve(collectRowsFromItemsPane(pane));
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

    function applyRowsToLiveDom(rootSelector) {
        var doc = global.document;
        var root = doc.querySelector(rootSelector || "#quote-create-maint");
        if (!root) return;
        var pane = root.querySelector("#quote-items");
        if (!pane) return;
        var stored = loadDoc();
        if (!stored || !Array.isArray(stored.rows) || !stored.rows.length) return;
        var domRows = pane.querySelectorAll(".quote-item-row");
        var n = Math.min(stored.rows.length, domRows.length);
        for (var i = 0; i < n; i++) {
            var tr = domRows[i];
            var d = stored.rows[i];
            if (!d || typeof d !== "object") continue;
            var task = tr.querySelector(".qi-task");
            var kind = tr.querySelector(".qi-kind");
            var scope = tr.querySelector(".qi-scope");
            var md = tr.querySelector(".qi-md");
            var rtSel = tr.querySelector(".qi-rate-type");
            var note = tr.querySelector(".qi-note");
            var am = tr.querySelector(".qi-amount");
            var isFlat = tr.classList.contains("quote-item-row--flat-amount");
            if (task) task.value = d.task != null ? String(d.task) : "";
            if (kind && d.kind != null) kind.value = String(d.kind);
            if (scope && d.scope != null) scope.value = String(d.scope);
            if (md && d.md != null) md.value = String(d.md);
            if (note) note.value = d.note != null ? String(d.note) : "";
            if (isFlat) {
                if (am && d.amount != null) am.value = String(d.amount);
            } else if (rtSel && rtSel.options.length) {
                var wantRt = d.rateType != null && String(d.rateType).trim() !== "" ? String(d.rateType) : "";
                if (!setSelectValueIfOptionExists(rtSel, wantRt)) {
                    if (!setSelectValueIfOptionExists(rtSel, d.defaultRate)) {
                        setSelectValueIfOptionExists(rtSel, tr.getAttribute("data-default-rate"));
                    }
                }
            }
        }
        if (global.window && global.window.QuoteMaintCreateRecalc && typeof global.window.QuoteMaintCreateRecalc.recalcAll === "function") {
            global.window.QuoteMaintCreateRecalc.recalcAll();
        }
    }

    global.QuoteMaintItemsDefaults = {
        STORAGE_KEY: STORAGE_KEY,
        DOC_VERSION: DOC_VERSION,
        loadDoc: loadDoc,
        saveDoc: saveDoc,
        clearAll: clearAll,
        collectRowsFromItemsPane: collectRowsFromItemsPane,
        fetchBuiltinRowsFromMaintHtml: fetchBuiltinRowsFromMaintHtml,
        applyFromStorage: applyRowsToLiveDom,
        refillRateSelect: refillRateSelect,
    };
})(typeof window !== "undefined" ? window : this);
