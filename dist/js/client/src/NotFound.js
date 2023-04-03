"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const NotFoundPage_1 = __importDefault(require("./components/NotFoundPage"));
const useNavigator_1 = __importDefault(require("./hooks/useNavigator"));
const NotFound = () => {
    const navigate = (0, useNavigator_1.default)();
    const location = (0, react_router_dom_1.useLocation)();
    const path = location.pathname;
    // strip / from path
    const pathWithoutSlash = path.replace(/^\/+|\/+$/g, '');
    const authPaths = ['login', 'register', 'reset-password', 'logout', 'sign-up', 'signup'];
    // if the path is in the authPaths array, redirect to the home page
    if (authPaths.includes(pathWithoutSlash)) {
        window.location.href = '/';
        return null;
    }
    else {
        return <NotFoundPage_1.default onBack={() => navigate('/')}/>;
    }
};
exports.NotFound = NotFound;
exports.default = exports.NotFound;
