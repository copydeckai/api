"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logo_svg_1 = __importDefault(require("@assets/images/logo.svg"));
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Header = () => {
    return (<div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navigation w-nav">
      <div className="nav-container">
        <div className="menu-left">
          <react_router_dom_1.Link to="/" className="brand w-nav-brand" aria-label="home">
            <div className="nav-logo">
              <img width={150} height={50} src={logo_svg_1.default}/>
            </div>
          </react_router_dom_1.Link>
        </div>
        <nav role="navigation" className="menu-right w-nav-menu">
          <react_router_dom_1.NavLink to="/" className="nav-link w-nav-link">
            Overview
          </react_router_dom_1.NavLink>
          <react_router_dom_1.NavLink to="/pricing" className="nav-link w-nav-link">
            Pricing
          </react_router_dom_1.NavLink>
          <react_router_dom_1.NavLink to="/login" className="nav-link w-nav-link">
            Login
          </react_router_dom_1.NavLink>
          <react_router_dom_1.Link to="/signup" className="primary-button invert nav w-inline-block">
            <div className="button-text-wrap">
              <div className="button-text">Get Started</div>
              <div className="button-text">Get Started</div>
            </div>
            <div className="button-hover-effect invert"></div>
          </react_router_dom_1.Link>
        </nav>
        <div className="menu-button w-nav-button" aria-label="menu" role="button" tabIndex={0} aria-controls="w-nav-overlay-0" aria-haspopup="menu" aria-expanded="false">
          <div className="w-icon-nav-menu"></div>
        </div>
      </div>
      <div className="w-nav-overlay" data-wf-ignore="" id="w-nav-overlay-0"></div>
    </div>);
};
Header.displayName = 'Header';
exports.default = Header;
