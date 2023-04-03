"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lists_1 = require("@copydeck/utils/lists");
const isEqual_1 = __importDefault(require("lodash/isEqual"));
const omit_1 = __importDefault(require("lodash/omit"));
const react_1 = require("react");
const useStateFromProps_1 = __importDefault(require("./useStateFromProps"));
function merge(prevData, prevState, data) {
    return Object.keys(prevState).reduce((acc, key) => {
        if (!(0, isEqual_1.default)(data[key], prevData[key])) {
            acc[key] = data[key];
        }
        return acc;
    }, Object.assign({}, prevState));
}
function handleRefresh(data, newData, setChanged) {
    if ((0, isEqual_1.default)(data, newData)) {
        setChanged(false);
    }
}
function useForm(initial, onSubmit) {
    const [hasChanged, setChanged] = (0, react_1.useState)(false);
    const [errors, setErrors] = (0, react_1.useState)({});
    const [data, setData] = (0, useStateFromProps_1.default)(initial, {
        mergeFunc: merge,
        onRefresh: newData => handleRefresh(data, newData, setChanged)
    });
    function toggleValue(event, cb) {
        const { name, value } = event.target;
        const field = data[name];
        if (Array.isArray(field)) {
            if (!hasChanged) {
                setChanged(true);
            }
            setData(Object.assign(Object.assign({}, data), { [name]: (0, lists_1.toggle)(value, field, isEqual_1.default) }));
        }
        if (typeof cb === 'function') {
            cb();
        }
    }
    function change(event) {
        const { name, value } = event.target;
        if (!(name in data)) {
            console.error(`Unknown form field: ${name}`);
            return;
        }
        else {
            if (data[name] !== value) {
                setChanged(true);
            }
            setData(data => (Object.assign(Object.assign({}, data), { [name]: value })));
        }
    }
    function reset() {
        setData(initial);
    }
    function set(newData, setHasChanged = true) {
        setData(data => (Object.assign(Object.assign({}, data), newData)));
        setChanged(setHasChanged);
    }
    function submit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof onSubmit === 'function' && !Object.keys(errors).length) {
                const result = onSubmit(data);
                if (result) {
                    const errors = yield result;
                    if ((errors === null || errors === void 0 ? void 0 : errors.length) === 0) {
                        setChanged(false);
                    }
                }
            }
        });
    }
    function triggerChange() {
        setChanged(true);
    }
    const setError = (field, error) => setErrors(e => (Object.assign(Object.assign({}, e), { [field]: error })));
    const clearErrors = (field) => {
        if (!field) {
            setErrors({});
        }
        else {
            setErrors(errors => (0, omit_1.default)(errors, Array.isArray(field) ? field : [field]));
        }
    };
    return {
        setError,
        errors,
        change,
        clearErrors,
        data,
        hasChanged,
        reset,
        setChanged,
        set,
        submit,
        toggleValue,
        triggerChange
    };
}
exports.default = useForm;
