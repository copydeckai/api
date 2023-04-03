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
exports.useFetch = void 0;
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const useFetch = url => {
    const [data, setData] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            setLoading(true);
            try {
                const { data } = yield axios_1.default.get(url);
                setData(data);
            }
            catch (err) {
                setError(err);
            }
            setLoading(false);
        });
        fetchData();
    }, [url]);
    const reFetch = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        try {
            const res = yield axios_1.default.get(url);
            setData(res.data);
        }
        catch (err) {
            setError(err);
        }
        setLoading(false);
    });
    return { data, loading, error, reFetch };
};
exports.useFetch = useFetch;
