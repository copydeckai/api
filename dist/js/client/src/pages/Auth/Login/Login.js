"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import PasswordField from "@copydeck/components/PasswordField";
// import TextField from "@copydeck/components/TextField";
const WindowTitle_1 = require("@copydeck/components/WindowTitle");
const authContext_1 = require("@copydeck/contexts/authContext");
const useNavigator_1 = __importDefault(require("@copydeck/hooks/useNavigator"));
const errorTracking_1 = __importDefault(require("@copydeck/services/errorTracking"));
// import axios from "axios";
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
// import SVG from "react-inlinesvg";
const react_router_dom_1 = require("react-router-dom");
const form_1 = __importDefault(require("./form"));
const Login = () => {
    const { login, dispatch, error, loading } = (0, authContext_1.useAuth)();
    const navigate = (0, useNavigator_1.default)();
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const { email, password } = data;
        dispatch({ type: 'loginStart' });
        // validate email and password
        if (!email || !password) {
            const errors = [...(!email ? ['email'] : []), ...(!password ? ['password'] : [])];
            antd_1.message.error(error === null || error === void 0 ? void 0 : error.message);
            return errors;
        }
        else {
            try {
                yield login(data);
                navigate('/');
                dispatch({ type: 'loginSuccess' });
            }
            catch (err) {
                errorTracking_1.default.captureException(err);
                antd_1.message.error((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.message);
                dispatch({ type: 'actionFailure', payload: (_b = err.response) === null || _b === void 0 ? void 0 : _b.data });
                return [];
            }
        }
        return [];
    });
    return (<>
      <WindowTitle_1.WindowTitle title="Log in"/>
      <div className="utilities-form-wrap">
        <h4 className="h4-title xs-margin">Login to Copydeck.</h4>
        <p className="m-paragraph l-margin">
          Not a member yet?{' '}
          <react_router_dom_1.Link className="text-dark" to="/signup">
            Sign Up
          </react_router_dom_1.Link>{' '}
        </p>
        <div className="utilities-form w-form">
          <form_1.default onSubmit={onSubmit}>
            {({ change: handleChange, data, submit: handleSubmit, hasChanged, disabled: formDisabled }) => (<>
                <div className="mb-16">
                  <input autoComplete="email" type="email" name="email" className="form-control large-field email w-input" placeholder="Your Email" disabled={loading} onChange={handleChange} value={data.email}/>
                </div>

                <div className="mb-16">
                  <input autoComplete="password" type="password" name="password" className="form-control large-field password w-input" placeholder="Your Password" disabled={loading} onChange={handleChange} value={data.password}/>
                </div>

                <div className="row align-items-center justify-content-between mb-16">
                  <div className="col hp-flex-none w-auto"></div>

                  <div className="col hp-flex-none w-auto">
                    <react_router_dom_1.Link className="hp-button text-black-80 hp-text-color-dark-40" to="/forgot-password">
                      Forgot Password?
                    </react_router_dom_1.Link>
                  </div>
                </div>

                <antd_1.Button disabled={loading || !hasChanged || formDisabled} onClick={handleSubmit} htmlType="submit" className="btn utilities-button btn-primary w-100" loading={loading}>
                  Login to your account
                </antd_1.Button>
                <div className="or-sign-up-with-wrap">
                  <div className="sign-up-divider"></div>
                  <div className="extra-small-text">or log in with</div>
                  <div className="sign-up-divider"></div>
                </div>
                <a className="social-sign-up w-inline-block">
                  <img src="./assets/62851dcc1205d6034471f709_search.png" loading="lazy" width="24" srcSet="
				https://assets.website-files.com/62851dcc1205d63c8b71f57f/62851dcc1205d6034471f709_search-p-500.png 500w,
				https://assets.website-files.com/62851dcc1205d63c8b71f57f/62851dcc1205d6034471f709_search.png       512w
			" sizes="23.993057250976562px" alt="" className="social-sign-up-icon"/>
                  <div className="social-sign-up-text">Login With Google</div>
                </a>
              </>)}
          </form_1.default>
          {/* {isError && <span>{error?.message}</span>} */}
        </div>
      </div>
    </>);
};
exports.default = Login;
