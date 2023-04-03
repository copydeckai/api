"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Loader_1 = __importDefault(require("@components/Loader"));
const authContext_1 = require("@copydeck/contexts/authContext");
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ProtectedRoute = () => {
    const { user, loading } = (0, authContext_1.useAuth)();
    if (loading) {
        return <Loader_1.default />;
    }
    // If authorized, return an outlet that will render child elements
    return user ? <react_router_dom_1.Outlet /> : <react_router_dom_1.Navigate to="/login"/>;
};
ProtectedRoute.displayName = 'ProtectedRoute';
exports.default = ProtectedRoute;
