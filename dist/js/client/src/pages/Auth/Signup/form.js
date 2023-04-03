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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useForm_1 = __importDefault(require("@copydeck/hooks/useForm"));
const handleFormSubmit_1 = __importDefault(require("@copydeck/utils/handlers/handleFormSubmit"));
const react_1 = __importStar(require("react"));
// const getSignupFormData = () => ({
//   firstName: '',
//   lastName: '',
//   email: '',
//   password: ''
// });
function useSignupForm(onSubmit) {
    const [changed, setChanged] = react_1.default.useState(false);
    const triggerChange = () => setChanged(true);
    const [emailAddress, setEmailAddress] = (0, react_1.useState)(null);
    const getUrlQuery = () => {
        const params = new URLSearchParams(window.location.search);
        const emailParam = params.get('email');
        setEmailAddress(emailParam);
    };
    (0, react_1.useEffect)(() => {
        getUrlQuery();
    }, []);
    let _formData = {
        firstName: '',
        lastName: '',
        email: emailAddress,
        password: ''
    };
    // if (email) {
    //   _formData[email] = email;
    // }
    const form = (0, useForm_1.default)(_formData);
    const handleChange = (event, cb) => {
        form.change(event, cb);
        triggerChange();
    };
    const data = Object.assign({}, form.data);
    const handleSubmit = (data) => __awaiter(this, void 0, void 0, function* () {
        const errors = yield onSubmit(data);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        react_1.default.useState({ password: '' });
        return errors;
    });
    const submit = () => __awaiter(this, void 0, void 0, function* () { return (0, handleFormSubmit_1.default)(data, handleSubmit, setChanged); });
    /**
     * checks if email is a valid email
     * @param email
     * @returns {boolean}
     */
    const isEmailValid = (email) => {
        if (email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return true;
        }
        return false;
    };
    const disabled = !data.firstName ||
        !data.lastName ||
        !data.email ||
        !data.password ||
        data.password.length < 5 ||
        !isEmailValid(data.email);
    return {
        change: handleChange,
        data,
        hasChanged: changed,
        disabled,
        submit
    };
}
const SignupForm = (_a) => {
    var { children, onSubmit } = _a, rest = __rest(_a, ["children", "onSubmit"]);
    const props = useSignupForm(onSubmit);
    return (<form onSubmit={e => {
            e.preventDefault();
            props.submit();
        }} {...rest}>
      {children(props)}
    </form>);
};
SignupForm.displayName = 'SignupForm';
exports.default = SignupForm;
