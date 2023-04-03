"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArrayQueryParam = exports.stringifyQs = void 0;
const isArray_1 = __importDefault(require("lodash/isArray"));
const qs_1 = require("qs");
function stringifyQs(params) {
    return (0, qs_1.stringify)(params, {
        indices: false,
        arrayFormat: 'brackets'
    });
}
exports.stringifyQs = stringifyQs;
function getArrayQueryParam(param) {
    if (!param) {
        return undefined;
    }
    if ((0, isArray_1.default)(param)) {
        return param;
    }
    return [param];
}
exports.getArrayQueryParam = getArrayQueryParam;
