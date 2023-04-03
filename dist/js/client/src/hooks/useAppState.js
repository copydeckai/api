"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const AppState_1 = require("../containers/AppState");
function useAppState() {
    const stateAndDispatch = react_1.default.useContext(AppState_1.AppStateContext);
    return stateAndDispatch;
}
exports.default = useAppState;
