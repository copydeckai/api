"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import logo from '@assets/images/logo.svg';'
const react_1 = __importDefault(require("react"));
// import { Link } from 'react-router-dom';
const react_router_dom_1 = require("react-router-dom");
const Footer_1 = __importDefault(require("../Footer"));
const Header_1 = __importDefault(require("../Header"));
// interface AuthLayoutProps {
//   children?: React.ReactNode;
// }
const FrontLayout = () => {
    return (<>
      <Header_1.default />
      <main>
        <react_router_dom_1.Outlet />
      </main>
      <Footer_1.default />
    </>);
};
FrontLayout.displayName = 'FrontLayout';
exports.default = FrontLayout;
