"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const antd_1 = require("antd");
const axios_1 = __importDefault(require("axios"));
const react_1 = __importStar(require("react"));
const react_router_1 = require("react-router");
// import SVG from "react-inlinesvg";
// import { Link } from "react-router-dom";
const form_1 = __importDefault(require("./form"));
const ResetPassword = () => {
    const { id, token } = (0, react_router_1.useParams)();
    const [userData, setUserData] = (0, react_1.useState)();
    const [, setError] = react_1.default.useState();
    const [isError, setIsError] = (0, react_1.useState)(false);
    // const [errors, setErrors] = useState<{}>({});
    const [loading, setLoading] = (0, react_1.useState)(false);
    const { dispatch, error } = (0, authContext_1.useAuth)();
    const navigate = (0, useNavigator_1.default)();
    const getUserData = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        const result = yield axios_1.default.get(`http://localhost:8800/api/users/open/${id}`);
        setLoading(false);
        if (result.data) {
            return result.data;
        }
        return false;
    });
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        setIsError(false);
        const { password, passwordConfirm } = data;
        // validate passwords
        if (!password || !passwordConfirm) {
            const errors = [
                ...(!password ? ['password'] : []),
                ...(!passwordConfirm ? ['passwordConfirm'] : [])
            ];
            setIsError((errors === null || errors === void 0 ? void 0 : errors.length) > 0);
            setLoading(false);
            return errors;
        }
        else {
            if (password !== passwordConfirm) {
                setIsError(true);
                setError('Password and confirm password do not match');
                setLoading(false);
            }
            else {
                setError(null);
                return handleReset(data);
            }
        }
    });
    const handleReset = (data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            yield axios_1.default.post(`http://localhost:8800/api/auth/reset-password/${id}/${token}`, {
                password: data.password,
                email: userData.email
            });
            //   dispatch({ type: "loginSuccess" });
            setLoading(false);
            antd_1.message.success('Password reset successful');
            navigate('/login');
        }
        catch (err) {
            errorTracking_1.default.captureException(err);
            setLoading(false);
            setIsError(true);
            dispatch({ type: 'actionFailure', payload: (_a = err.response) === null || _a === void 0 ? void 0 : _a.data });
            return [];
        }
    });
    (0, react_1.useEffect)(() => {
        getUserData().then(userData => {
            setUserData(userData);
        });
        // show error message if there is any
        if (isError) {
            antd_1.message.error(error === null || error === void 0 ? void 0 : error.message);
        }
    }, [id, isError, error === null || error === void 0 ? void 0 : error.message]);
    return (<>
      <WindowTitle_1.WindowTitle title="Reset Password"/>
      <div className="utilities-form-wrap">
        <h4 className="h4-title xs-margin">Create New Password.</h4>
        <div className="utilities-form w-form">
          <form_1.default onSubmit={onSubmit}>
            {({ change: handleChange, data, submit: handleSubmit, hasChanged, disabled: formDisabled }) => (<>
                <div className="mb-16">
                  <input className="form-control large-field email w-input" placeholder="Your Email" disabled defaultValue={userData.email}/>
                </div>

                <div className="mb-16">
                  <input autoComplete="password" type="password" name="password" className="form-control large-field password w-input" placeholder="New Password" disabled={loading} onChange={handleChange} value={data.password}/>
                </div>

                <div className="mb-16">
                  <input type="password" name="passwordConfirm" className="form-control large-field password w-input" placeholder="Confirm New Password" disabled={loading} onChange={handleChange} value={data.passwordConfirm}/>
                </div>

                <antd_1.Button disabled={loading || !hasChanged || formDisabled} onClick={handleSubmit} htmlType="submit" loading={loading} className={`btn utilities-button btn-primary w-100`}>
                  Reset Password
                </antd_1.Button>
              </>)}
          </form_1.default>
        </div>
      </div>
    </>);
};
exports.default = ResetPassword;
