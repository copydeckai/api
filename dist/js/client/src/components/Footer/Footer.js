"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logo_svg_1 = __importDefault(require("@assets/images/logo.svg"));
const useNavigator_1 = __importDefault(require("@copydeck/hooks/useNavigator"));
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Footer = () => {
    const navigate = (0, useNavigator_1.default)();
    return (<div className="section">
      <div className="container">
        <div className="grid l-margin">
          <div id="w-node-d65bbcea-6814-d9db-bffb-df2e964851c6-1275d46c" className="nav-logo">
            <img width={170} height={50} src={logo_svg_1.default}/>
          </div>
          <div id="w-node-_9f59a8c9-6f71-dc5d-4e9a-401b46694036-1275d46c" className="space-between-hor align-left-justify-center-hor">
            <h4 id="w-node-ecdb920d-29ca-7a2b-5ed4-b0ce1275d472-1275d46c" className="h4-title">
              Get started now
            </h4>
            <a href="/" className="primary-button w-inline-block invert">
              <div className="button-text-wrap">
                <div className="button-text">Create Account</div>
                <div className="button-text">Start free trial</div>
              </div>
              <div className="button-hover-effect"></div>
            </a>
          </div>
        </div>
        <div className="grid">
          <div id="w-node-ecdb920d-29ca-7a2b-5ed4-b0ce1275d479-1275d46c" className="align-left-and-vertical">
            <h5 className="h5-title m-margin">Write more, faster!</h5>
          </div>
          <div id="w-node-ecdb920d-29ca-7a2b-5ed4-b0ce1275d49a-1275d46c" className="align-left-and-vertical">
            <p className="m-subtitle m-margin">Product</p>
            <react_router_dom_1.Link to="/pricing" onClick={() => navigate('/pricing')}>
              Pricing
            </react_router_dom_1.Link>
          </div>
          <div id="w-node-e1e31929-5347-93d0-86c2-6550937553b6-1275d46c" className="align-left-and-vertical">
            <p className="m-subtitle m-margin">Company</p>
            <react_router_dom_1.Link to="/" className="s-margin">
              Help & Guides
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/pricing/#faq" onClick={() => navigate('/pricing/#faq')} className="s-margin">
              FAQ
            </react_router_dom_1.Link>
          </div>
          <div id="w-node-_1ba40cca-e3ac-bbde-290e-b257efc1860f-1275d46c" className="align-left-and-vertical">
            <p className="m-subtitle m-margin">Other</p>
            <react_router_dom_1.Link to="/terms-of-service" onClick={() => navigate('/terms-of-service')} className="s-margin">
              Terms of Service
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/privacy-policy" onClick={() => navigate('/privacy-policy')}>
              Privacy Policy
            </react_router_dom_1.Link>
          </div>
        </div>
        {/* <div className="footer-credits">© 2022 Copydeck Inc.</div> */}
      </div>
    </div>);
};
Footer.displayName = 'Footer';
exports.default = Footer;
