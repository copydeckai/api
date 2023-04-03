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
exports.AuthContextProvider = exports.useAuth = void 0;
const axios_1 = __importDefault(require("axios"));
const react_1 = __importStar(require("react"));
const initialState = {
    user: JSON.parse(localStorage.getItem('persist:root')) || null,
    loading: false,
    error: null
};
const AuthContext = (0, react_1.createContext)({});
function useAuth() {
    return (0, react_1.useContext)(AuthContext);
}
exports.useAuth = useAuth;
const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'loginStart':
            return {
                user: null,
                loading: true,
                error: null
            };
        case 'loginSuccess':
            return {
                user: action.payload,
                loading: false,
                error: null
            };
        case 'signupStart':
            return {
                user: null,
                loading: true,
                error: null
            };
        case 'signupSuccess':
            return {
                user: action.payload,
                loading: false,
                showConfirmation: true,
                error: null
            };
        case 'actionFailure':
            return {
                user: null,
                loading: false,
                error: action.payload
            };
        case 'logout':
            return {
                user: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }
};
function AuthContextProvider({ children }) {
    const stateAndDispatch = (0, react_1.useReducer)(AuthReducer, initialState);
    const [state, dispatch] = stateAndDispatch;
    const [user, setUser] = (0, react_1.useState)(initialState.user);
    // const [loading, setLoading] = useState(true);
    const dataFetchedRef = (0, react_1.useRef)(false);
    const fetchData = () => {
        axios_1.default.get(`/auth/fetch`).then(({ data }) => {
            setUser(data);
            // setLoading(false);
        });
    };
    // console.log("Loading", loading);
    (0, react_1.useEffect)(() => {
        if (dataFetchedRef.current) {
            return;
        }
        dataFetchedRef.current = true;
        // if (!user) {
        //   fetchData();
        // }
        setTimeout(() => {
            fetchData();
        }, 2000);
    }, [user]);
    const getUser = (id) => __awaiter(this, void 0, void 0, function* () {
        yield axios_1.default.get(`/users/${id}/fetch`);
    });
    const updateUserAccount = (payload) => __awaiter(this, void 0, void 0, function* () {
        const { data } = yield axios_1.default.put(`/users/update`, payload, {
            withCredentials: true
        });
        fetchData();
        return data;
    });
    const login = (payload) => __awaiter(this, void 0, void 0, function* () {
        const { data } = yield axios_1.default.post(`/auth/login`, payload, {
            withCredentials: true
        });
        setUser(data);
    });
    const signup = (payload) => __awaiter(this, void 0, void 0, function* () {
        yield axios_1.default.post(`/auth/register`, payload);
    });
    const checkForgot = (payload) => __awaiter(this, void 0, void 0, function* () {
        yield axios_1.default.post(`/auth/forgot-password`, payload);
    });
    (0, react_1.useEffect)(() => {
        localStorage.setItem('persist:root', JSON.stringify(user));
    }, [user]);
    return (<AuthContext.Provider value={{
            setUser,
            user,
            loading: state.loading,
            error: state.error,
            showConfirmation: state.showConfirmation,
            dispatch,
            getUser,
            login,
            signup,
            checkForgot,
            updateUserAccount
        }}>
      {children}
    </AuthContext.Provider>);
}
exports.AuthContextProvider = AuthContextProvider;
