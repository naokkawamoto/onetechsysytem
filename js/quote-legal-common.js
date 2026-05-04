/**
 * 見積ひな形の法務共通値（R3）。
 * 遅延損害金の年利率を変える場合は delayedDamagesAnnualPercent のみを更新し、
 * 各ページ textarea の初期HTMLに残る文言が意図どおりか確認してください。
 */
(function (global) {
  'use strict';

  var delayedDamagesAnnualPercent = '14.6';

  /** 請負・保守の【支払遅延】定型行の利率部分のみ置換対象 */
  var reOrderMaint = /(支払期日を過ぎた場合、翌日より)年[\d.]+%(の遅延損害金が発生します。)/g;
  /** ラボの【支払遅延】定型行 */
  var reLab = /(支払期日を過ぎた場合、翌日より)年[\d.]+%(の遅延損害金が発生することがあります（個別契約で別途定める場合を除きます）。)/g;

  var payDelayTextareaNames = ['qc_a6', 'qc_m_fix_a5', 'qlf_f9'];

  function syncDelayedDamagesRateInPayDelayTextareas() {
    if (typeof document === 'undefined') return;
    var pct = delayedDamagesAnnualPercent;
    payDelayTextareaNames.forEach(function (name) {
      var ta = document.querySelector('textarea[name="' + name + '"]');
      if (!ta || typeof ta.value !== 'string') return;
      var v = ta.value;
      v = v.replace(reOrderMaint, '$1年' + pct + '%$2');
      v = v.replace(reLab, '$1年' + pct + '%$2');
      ta.value = v;
    });
  }

  global.QUOTE_LEGAL_COMMON = Object.freeze({
    delayedDamagesAnnualPercent: delayedDamagesAnnualPercent,
    syncDelayedDamagesRateInPayDelayTextareas: syncDelayedDamagesRateInPayDelayTextareas,
  });

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', syncDelayedDamagesRateInPayDelayTextareas);
    } else {
      syncDelayedDamagesRateInPayDelayTextareas();
    }
  }
})(typeof window !== 'undefined' ? window : this);
