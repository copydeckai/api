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
const ForgotPassword = () => {
    const { checkForgot, dispatch, error, loading } = (0, authContext_1.useAuth)();
    const navigate = (0, useNavigator_1.default)();
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const { email } = data;
        dispatch({ type: 'loginStart' });
        // validate email and password
        if (!email) {
            const errors = [...(!email ? ['email'] : [])];
            antd_1.message.error(error === null || error === void 0 ? void 0 : error.message);
            return errors;
        }
        else {
            try {
                yield checkForgot(data);
                navigate('/login');
                antd_1.message.success('Password Reset Link Sent!');
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
      <WindowTitle_1.WindowTitle title="Forgot Password"/>
      <div className="utilities-form-wrap">
        <h4 className="h4-title xs-margin">Forgot Password?</h4>
        <p className="m-paragraph l-margin">Enter your email we'll send you a link </p>
        <div className="utilities-form w-form">
          <form_1.default onSubmit={onSubmit}>
            {({ change: handleChange, data, submit: handleSubmit, hasChanged, disabled: formDisabled }) => (<>
                <div className="mb-16">
                  <input autoComplete="email" type="email" name="email" className="form-control large-field email w-input" placeholder="Your Email" disabled={loading} onChange={handleChange} value={data.email}/>
                </div>
                <antd_1.Button disabled={loading || !hasChanged || formDisabled} onClick={handleSubmit} htmlType="submit" loading={loading} className={`btn utilities-button btn-primary w-100`}>
                  Send me a link
                </antd_1.Button>
              </>)}
          </form_1.default>
          <div className="row mt-16">
            <div className="text-center col w-auto">
              <p>
                Return to&nbsp;
                <react_router_dom_1.Link className="hp-button text-black-80 hp-text-color-dark-40" to="/login">
                  Log In
                </react_router_dom_1.Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>);
};
exports.default = ForgotPassword;
