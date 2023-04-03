"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCurrency = void 0;
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: 'NGN',
    style: 'currency'
});
function formatCurrency(number) {
    return CURRENCY_FORMATTER.format(number);
}
exports.formatCurrency = formatCurrency;
