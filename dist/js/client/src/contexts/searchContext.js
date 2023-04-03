"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.SearchContextProvider = exports.useSearch = void 0;
const axios_1 = __importDefault(require("axios"));
const react_1 = __importStar(require("react"));
const initialState = {
    // searchResults: null,
    loading: false,
    error: null
};
const SearchContext = (0, react_1.createContext)({});
function useSearch() {
    return (0, react_1.useContext)(SearchContext);
}
exports.useSearch = useSearch;
const SearchReducer = (state, action) => {
    switch (action.type) {
        case 'searchStart':
            return {
                loading: true,
                error: null
            };
        case 'newSearch':
            return {
                loading: true,
                error: null
            };
        case 'resetSearch':
            return initialState;
        case 'searchSuccess':
            return {
                loading: false,
                error: null
            };
        case 'actionFailure':
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
function SearchContextProvider({ children }) {
    const stateAndDispatch = (0, react_1.useReducer)(SearchReducer, initialState);
    const [state, dispatch] = stateAndDispatch;
    const [searchResults, setSearchResults] = (0, react_1.useState)(null);
    const [keyword, setKeyword] = (0, react_1.useState)('');
    const fetchSearchResults = (payload) => __awaiter(this, void 0, void 0, function* () {
        yield axios_1.default.get(`/story/stories?query=${payload}`).then(({ data }) => {
            setSearchResults(data);
        });
        setKeyword(payload);
    });
    return (<SearchContext.Provider value={{
            searchResults,
            setSearchResults,
            keyword,
            loading: state.loading,
            error: state.error,
            fetchSearchResults,
            dispatch
        }}>
      {children}
    </SearchContext.Provider>);
}
exports.SearchContextProvider = SearchContextProvider;
