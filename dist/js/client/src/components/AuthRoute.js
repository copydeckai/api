"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authContext_1 = require("@copydeck/contexts/authContext");
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const AuthRoute = () => {
    const { user } = (0, authContext_1.useAuth)();
    return user ? <react_router_dom_1.Navigate to="/"/> : <react_router_dom_1.Outlet />;
};
AuthRoute.displayName = 'AuthRoute';
exports.default = AuthRoute;
