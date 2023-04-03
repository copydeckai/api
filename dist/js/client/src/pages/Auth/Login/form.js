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
const react_1 = __importDefault(require("react"));
const getLoginFormData = () => ({ email: '', password: '' });
function useLoginForm(onSubmit) {
    const [changed, setChanged] = react_1.default.useState(false);
    const triggerChange = () => setChanged(true);
    const form = (0, useForm_1.default)(getLoginFormData());
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
    const disabled = !data.email || !data.password || data.password.length < 5 || !isEmailValid(data.email);
    return {
        change: handleChange,
        data,
        hasChanged: changed,
        disabled,
        submit
    };
}
const LoginForm = (_a) => {
    var { children, onSubmit } = _a, rest = __rest(_a, ["children", "onSubmit"]);
    const props = useLoginForm(onSubmit);
    return (<form onSubmit={e => {
            e.preventDefault();
            props.submit();
        }} {...rest}>
      {children(props)}
    </form>);
};
LoginForm.displayName = 'LoginForm';
exports.default = LoginForm;
