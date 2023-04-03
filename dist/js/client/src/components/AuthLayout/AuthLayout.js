"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import logo from '@assets/images/logo.svg';
const react_1 = __importDefault(require("react"));
const react_hot_toast_1 = require("react-hot-toast");
// import { Link } from 'react-router-dom';
const react_router_dom_1 = require("react-router-dom");
require("./auth.css");
// interface AuthLayoutProps {
//   children?: React.ReactNode;
// }
const AuthLayout = () => (<>
    <react_hot_toast_1.Toaster position="top-center" reverseOrder={false} toastOptions={{
        className: 'toast-toast'
    }}/>
    <div className="utilities-section">
      <div className="utilities-form-column">
        <react_router_dom_1.Outlet />
      </div>
    </div>
  </>);
AuthLayout.displayName = 'AuthLayout';
exports.default = AuthLayout;
