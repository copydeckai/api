"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionRoute = void 0;
// import useUser from "@vidor/hooks/useUser";
// import NotFound from "@vidor/NotFound";
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const SectionRoute = () => (
// const { user } = useUser();
// const hasPermissions =
//   !permissions ||
//   permissions
//     .map(permission => hasPermission(permission, user))
//     .reduce((prev, curr) => prev && curr);
// return hasPermissions ? <Route {...props} /> : <NotFound />;
<react_router_dom_1.Outlet />);
exports.SectionRoute = SectionRoute;
exports.SectionRoute.displayName = 'Route';
exports.default = exports.SectionRoute;
