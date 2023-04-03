"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consumer = exports.AppStateContext = void 0;
const react_1 = __importDefault(require("react"));
// import { useLocation } from "react-router-dom";
const reducer_1 = __importDefault(require("./reducer"));
const state_1 = require("./state");
exports.AppStateContext = react_1.default.createContext([
    state_1.initialAppState,
    () => undefined
]);
const AppStateProvider = ({ children }) => {
    //   const location = useLocation();
    const stateAndDispatch = react_1.default.useReducer(reducer_1.default, state_1.initialAppState);
    const [state, dispatch] = stateAndDispatch;
    react_1.default.useEffect(() => {
        if (!!state.error) {
            dispatch({
                payload: {
                    error: undefined
                },
                type: 'displayError'
            });
        }
    });
    return <exports.AppStateContext.Provider value={stateAndDispatch}>{children}</exports.AppStateContext.Provider>;
};
exports.Consumer = exports.AppStateContext.Consumer;
exports.default = AppStateProvider;
