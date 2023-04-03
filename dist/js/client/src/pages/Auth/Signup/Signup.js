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
const emailAnim_json_1 = __importDefault(require("@assets/animations/emailAnim.json"));
const WindowTitle_1 = require("@copydeck/components/WindowTitle");
const authContext_1 = require("@copydeck/contexts/authContext");
const errorTracking_1 = __importDefault(require("@copydeck/services/errorTracking"));
// import useNavigator from "@copydeck/hooks/useNavigator";
const antd_1 = require("antd");
// import axios from "axios";
const lottie_react_1 = __importDefault(require("lottie-react"));
const react_1 = __importDefault(require("react"));
// import SVG from "react-inlinesvg";
const react_router_dom_1 = require("react-router-dom");
const form_1 = __importDefault(require("./form"));
const Signup = () => {
    const { signup, dispatch, error, loading, showConfirmation } = (0, authContext_1.useAuth)();
    //   const navigate = useNavigator();
    const validateForm = (data) => {
        const errors = {};
        if (!data.firstName) {
            errors.firstName = 'First name is required';
        }
        if (!data.lastName) {
            errors.lastName = 'Last name is required';
        }
        if (!data.email) {
            errors.email = 'Email is required';
        }
        return errors;
    };
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        dispatch({ type: 'signupStart' });
        // validate form
        const payload = Object.assign({ aiUsage: {
                credits: 5,
                planType: 'basic'
            } }, data);
        const errors = validateForm(data);
        if (errors.length > 0) {
            antd_1.message.error(error === null || error === void 0 ? void 0 : error.message);
        }
        else {
            try {
                yield signup(payload);
                dispatch({ type: 'signupSuccess' });
            }
            catch (err) {
                errorTracking_1.default.captureException(err);
                dispatch({ type: 'actionFailure', payload: (_a = err.response) === null || _a === void 0 ? void 0 : _a.data });
                antd_1.message.error((_b = err.response) === null || _b === void 0 ? void 0 : _b.data.message);
                return [];
            }
        }
        return [];
    });
    return (<>
      <WindowTitle_1.WindowTitle title="Create account"/>
      <div className="utilities-form-wrap">
        {showConfirmation ? (<div className="utilities-form w-form">
            <div className="card border-0">
              <div className="card-body">
                <div className="mb-12 d-flex align-items-center justify-content-center hp-components-item-img" style={{ borderRadius: 17 + 'px', minHeight: 140 + 'px' }}>
                  <lottie_react_1.default animationData={emailAnim_json_1.default} className="animation-wrap" height="100" autoPlay loop/>
                </div>
                <div className="text-center justify-content-center">
                  <h3>Account Created</h3>
                  <p>Check your mailbox follow link to verify email</p>
                </div>
              </div>
            </div>
          </div>) : (<>
            <h4 className="h4-title xs-margin">Sign Up To Copydeck.</h4>
            <p className="m-paragraph l-margin">
              Already have an account?{' '}
              <react_router_dom_1.Link className="text-dark" to="/login">
                Sign In
              </react_router_dom_1.Link>{' '}
            </p>
            <div className="utilities-form w-form">
              <form_1.default onSubmit={onSubmit}>
                {({ change: handleChange, data, submit: handleSubmit, hasChanged, disabled: formDisabled }) => (<>
                    <div className="mb-16">
                      <input autoComplete="firstName" name="firstName" className="form-control large-field w-input" placeholder="First Name" disabled={loading} onChange={handleChange} value={data.firstName}/>
                    </div>
                    <div className="mb-16">
                      <input autoComplete="lastName" name="lastName" className="form-control large-field w-input" placeholder="Last Name" disabled={loading} onChange={handleChange} value={data.lastName}/>
                    </div>
                    <div className="mb-16">
                      <input autoComplete="email" type="email" name="email" className="form-control large-field email w-input" placeholder="Your Email" disabled={loading} onChange={handleChange} value={data.email}/>
                    </div>
                    <div className="mb-16">
                      <input autoComplete="password" name="password" 
            //   pattern="^.{8,20}$"
            type="password" className="form-control large-field password w-input" placeholder="Create Password" disabled={loading} onChange={handleChange} value={data.password}/>
                    </div>
                    <antd_1.Button disabled={loading || !hasChanged || formDisabled} onClick={handleSubmit} htmlType="submit" loading={loading} className={`btn utilities-button btn-primary w-100`}>
                      Create account
                    </antd_1.Button>
                    <div className="or-sign-up-with-wrap">
                      <div className="sign-up-divider"></div>
                      <div className="extra-small-text">or sign up with</div>
                      <div className="sign-up-divider"></div>
                    </div>
                    <a href="" className="social-sign-up w-inline-block">
                      <img src="./assets/62851dcc1205d6034471f709_search.png" loading="lazy" width="24" srcSet="
                    https://assets.website-files.com/62851dcc1205d63c8b71f57f/62851dcc1205d6034471f709_search-p-500.png 500w,
                    https://assets.website-files.com/62851dcc1205d63c8b71f57f/62851dcc1205d6034471f709_search.png       512w
                  " sizes="23.993057250976562px" alt="" className="social-sign-up-icon"/>
                      <div className="social-sign-up-text">Signup With Google</div>
                    </a>
                  </>)}
              </form_1.default>
            </div>
          </>)}
      </div>
    </>);
};
exports.default = Signup;
