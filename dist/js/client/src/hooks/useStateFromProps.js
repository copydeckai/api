"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isEqual_1 = __importDefault(require("lodash/isEqual"));
const react_1 = require("react");
function useStateFromProps(data, opts) {
    const [state, setState] = (0, react_1.useState)(data);
    const [prevData, setPrevData] = (0, react_1.useState)(data);
    if (!opts) {
        opts = {};
    }
    const { mergeFunc, onRefresh } = opts;
    const shouldUpdate = !(0, isEqual_1.default)(prevData, data);
    if (shouldUpdate) {
        const newData = typeof mergeFunc === 'function' ? mergeFunc(prevData, state, data) : data;
        setState(newData);
        setPrevData(data);
        if (typeof onRefresh === 'function') {
            onRefresh(newData);
        }
    }
    return [state, setState];
}
exports.default = useStateFromProps;
