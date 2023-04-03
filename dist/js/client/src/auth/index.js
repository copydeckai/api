"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthLayout_1 = __importDefault(require("@components/AuthLayout"));
const FrontLayout_1 = __importDefault(require("@components/FrontLayout"));
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const NotFound_1 = __importDefault(require("../NotFound"));
const ForgotPassword_1 = __importDefault(require("../pages/Auth/ForgotPassword"));
const Login_1 = __importDefault(require("../pages/Auth/Login"));
const ResetPassword_1 = __importDefault(require("../pages/Auth/ResetPassword"));
const Signup_1 = __importDefault(require("../pages/Auth/Signup"));
const Verification_1 = __importDefault(require("../pages/Auth/Verification"));
const WriteView_1 = __importDefault(require("../pages/Write/views/WriteView"));
const Home_1 = __importDefault(require("./pages/Home"));
const Pricing_1 = __importDefault(require("./pages/Pricing"));
const Privacy_1 = __importDefault(require("./pages/Privacy"));
const Terms_1 = __importDefault(require("./pages/Terms"));
const urls_1 = require("./urls");
// import AuthRoute from "@components/AuthRoute";
const AuthRouter = () => (<react_router_dom_1.Routes>
    <react_router_dom_1.Route element={<AuthLayout_1.default />}>
      <react_router_dom_1.Route path={urls_1.loginPath} element={<Login_1.default />}/>
      <react_router_dom_1.Route path={urls_1.signupPath} element={<Signup_1.default />}/>
      <react_router_dom_1.Route path={urls_1.passwordResetPath} element={<ForgotPassword_1.default />}/>
      <react_router_dom_1.Route path="/reset-password/:id/:token" element={<ResetPassword_1.default />}/>
      <react_router_dom_1.Route path="/verify-identity/:id/:token" element={<Verification_1.default />}/>
      {/* <Route
          path={socialSignInCallbackPath}
          element={<SocialViewComponent />}
        /> */}
    </react_router_dom_1.Route>
    <react_router_dom_1.Route path={urls_1.readWritingUrl} element={<WriteView_1.default />}/>
    <react_router_dom_1.Route element={<FrontLayout_1.default />}>
      <react_router_dom_1.Route path="/" element={<Home_1.default />}/>
      <react_router_dom_1.Route path="/pricing" element={<Pricing_1.default />}/>
      <react_router_dom_1.Route path="/terms-of-service" element={<Terms_1.default />}/>
      <react_router_dom_1.Route path="/privacy-policy" element={<Privacy_1.default />}/>
      <react_router_dom_1.Route path="*" element={<NotFound_1.default />}/>
    </react_router_dom_1.Route>
  </react_router_dom_1.Routes>);
AuthRouter.displayName = 'AuthRouter';
exports.default = AuthRouter;
