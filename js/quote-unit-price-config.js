/**
 * 見積「単価区分」マスタ（OTJ売上単価・原価率・発注先原価・発注先原価率を含む）。localStorage に保存。
 */
(function (global) {
    var STORAGE_KEY = "onetech_quote_unit_prices";

    function defOtjRatio(id) {
        var s = String(id || "");
        if (/_JP$/i.test(s) || s === "CONSULT_JP") return 0;
        return 70;
    }

    var DEFAULTS = [
        { id: "PG_VN", label: "PG（VN）", price: 8000, otjCostRatio: 70, vendorUnitCost: 0, vendorCostRatio: 70 },
        { id: "TEST_VN", label: "TEST（VN）", price: 7500, otjCostRatio: 70, vendorUnitCost: 0, vendorCostRatio: 70 },
        { id: "AI_VN", label: "AI（VN）", price: 12000, otjCostRatio: 70, vendorUnitCost: 0, vendorCostRatio: 70 },
        { id: "INFRA_VN", label: "INFRA(VN)", price: 9000, otjCostRatio: 70, vendorUnitCost: 0, vendorCostRatio: 70 },
        { id: "PM_VN", label: "PM(VN)", price: 6500, otjCostRatio: 70, vendorUnitCost: 0, vendorCostRatio: 70 },
        { id: "BSE_VN", label: "BSE(VN)", price: 7000, otjCostRatio: 70, vendorUnitCost: 0, vendorCostRatio: 70 },
        { id: "BSE_JP", label: "BSE(JP)", price: 12000, otjCostRatio: 0, vendorUnitCost: 0, vendorCostRatio: 70 },
        { id: "PM_JP", label: "PM(JP)", price: 14000, otjCostRatio: 0, vendorUnitCost: 0, vendorCostRatio: 70 },
        {
            id: "CONSULT_JP",
            label: "コンサルタント（JP)",
            price: 100000,
            otjCostRatio: 0,
            vendorUnitCost: 0,
            vendorCostRatio: 0,
        },
        { id: "PURCHASE_JP", label: "購入費（JP）", price: 12000, otjCostRatio: 0, vendorUnitCost: 0, vendorCostRatio: 70 },
        { id: "TRAVEL_JP", label: "旅費・交通費（JP）", price: 12000, otjCostRatio: 0, vendorUnitCost: 0, vendorCostRatio: 70 },
        { id: "BIM_CAD_VN", label: "BIM/CAD(VN)", price: 8500, otjCostRatio: 70, vendorUnitCost: 0, vendorCostRatio: 70 },
    ];

    function cloneDefaults() {
        return DEFAULTS.map(function (x) {
            return {
                id: x.id,
                label: x.label,
                price: x.price,
                otjCostRatio: x.otjCostRatio,
                vendorUnitCost: x.vendorUnitCost,
                vendorCostRatio: x.vendorCostRatio,
            };
        });
    }

    function clampPct(v) {
        var n = parseFloat(v);
        if (isNaN(n) || n < 0) return 0;
        if (n > 100) return 100;
        return n;
    }

    function normalizeRow(r) {
        var id = String(r.id || "").trim();
        var label = String(r.label || "").trim();
        var price = parseInt(String(r.price).replace(/,/g, ""), 10);
        if (!id || !label) return null;
        if (isNaN(price) || price < 0) price = 0;
        var otjCostRatio = r.otjCostRatio;
        if (otjCostRatio === "" || otjCostRatio === undefined || otjCostRatio === null) {
            otjCostRatio = defOtjRatio(id);
        } else {
            otjCostRatio = clampPct(otjCostRatio);
        }
        var vendorUnitCost = parseInt(String(r.vendorUnitCost != null ? r.vendorUnitCost : "0").replace(/,/g, ""), 10);
        if (isNaN(vendorUnitCost) || vendorUnitCost < 0) vendorUnitCost = 0;
        var vendorCostRatio = r.vendorCostRatio;
        if (vendorCostRatio === "" || vendorCostRatio === undefined || vendorCostRatio === null) {
            vendorCostRatio = 70;
        } else {
            vendorCostRatio = clampPct(vendorCostRatio);
        }
        return {
            id: id,
            label: label,
            price: price,
            otjCostRatio: otjCostRatio,
            vendorUnitCost: vendorUnitCost,
            vendorCostRatio: vendorCostRatio,
        };
    }

    function mergeWithDefaultsRow(parsedRow) {
        var id = String(parsedRow.id || "").trim();
        for (var i = 0; i < DEFAULTS.length; i++) {
            if (DEFAULTS[i].id === id) {
                var d = DEFAULTS[i];
                return normalizeRow({
                    id: id,
                    label: parsedRow.label != null && String(parsedRow.label).trim() !== "" ? parsedRow.label : d.label,
                    price: parsedRow.price != null ? parsedRow.price : d.price,
                    otjCostRatio: parsedRow.otjCostRatio != null ? parsedRow.otjCostRatio : d.otjCostRatio,
                    vendorUnitCost: parsedRow.vendorUnitCost != null ? parsedRow.vendorUnitCost : d.vendorUnitCost,
                    vendorCostRatio: parsedRow.vendorCostRatio != null ? parsedRow.vendorCostRatio : d.vendorCostRatio,
                });
            }
        }
        return normalizeRow(parsedRow);
    }

    function getRateTypes() {
        try {
            if (!global.localStorage) return cloneDefaults();
            var raw = global.localStorage.getItem(STORAGE_KEY);
            if (raw) {
                var parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length) {
                    var out = [];
                    for (var i = 0; i < parsed.length; i++) {
                        var n = mergeWithDefaultsRow(parsed[i]);
                        if (n) out.push(n);
                    }
                    if (out.length) {
                        var have = {};
                        for (var j = 0; j < out.length; j++) have[out[j].id] = true;
                        for (var d = 0; d < DEFAULTS.length; d++) {
                            if (!have[DEFAULTS[d].id]) {
                                var added = normalizeRow(DEFAULTS[d]);
                                if (added) out.push(added);
                            }
                        }
                        return out;
                    }
                }
            }
        } catch (e) {}
        return cloneDefaults();
    }

    function saveRateTypes(list) {
        if (!global.localStorage) return;
        var arr = Array.isArray(list) ? list : [];
        var out = [];
        for (var i = 0; i < arr.length; i++) {
            var n = normalizeRow(arr[i]);
            if (n) out.push(n);
        }
        global.localStorage.setItem(STORAGE_KEY, JSON.stringify(out.length ? out : cloneDefaults()));
    }

    global.QuoteUnitPriceConfig = {
        STORAGE_KEY: STORAGE_KEY,
        getDefaults: cloneDefaults,
        getRateTypes: getRateTypes,
        saveRateTypes: saveRateTypes,
    };
})(typeof window !== "undefined" ? window : this);
