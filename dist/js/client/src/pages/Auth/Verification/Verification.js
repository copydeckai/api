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
const Done_json_1 = __importDefault(require("@assets/animations/Done.json"));
// import { API_URL } from "@copydeck/config";
const Loader_1 = __importDefault(require("@components/Loader"));
// import NotFound from '@copydeck/NotFound';
const WindowTitle_1 = require("@copydeck/components/WindowTitle");
const authContext_1 = require("@copydeck/contexts/authContext");
const useNavigator_1 = __importDefault(require("@copydeck/hooks/useNavigator"));
// import axios from "axios";
const antd_1 = require("antd");
const axios_1 = __importDefault(require("axios"));
const lottie_react_1 = __importDefault(require("lottie-react"));
const react_1 = __importStar(require("react"));
const react_router_1 = require("react-router");
// import SVG from "react-inlinesvg";
// import { Link } from "react-router-dom";
const Verification = () => {
    const { error, dispatch } = (0, authContext_1.useAuth)();
    const { id, token } = (0, react_router_1.useParams)();
    const navigate = (0, useNavigator_1.default)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    // const [, setError] = useState(false);
    const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        try {
            yield axios_1.default.get(`/auth/verify/${id}/${token}`);
            //   navigate("/login");
        }
        catch (err) {
            setLoading(false);
            dispatch({ type: 'actionFailure', payload: err.response.data });
        }
    });
    (0, react_1.useEffect)(() => {
        fetchData();
        setLoading(false);
    }, [id]);
    return (<div className="utilities-form-wrap">
      <WindowTitle_1.WindowTitle title="Account Verified"/>
      {loading ? (<Loader_1.default />) : error ? (<>
          <antd_1.Alert message={error === null || error === void 0 ? void 0 : error.message} description="This is an error message take the title seriously." type="error" showIcon/>
        </>) : (<div className="card border-0">
          <div className="card-body">
            <div className="mb-12 d-flex align-items-center justify-content-center hp-components-item-img" style={{ borderRadius: 17 + 'px', minHeight: 140 + 'px' }}>
              <lottie_react_1.default animationData={Done_json_1.default} className="animation-wrap" height="100px" autoPlay loop/>
            </div>
            <div className="text-center justify-content-center">
              <h4>Email Address Verfied</h4>
              <p style={{ marginBottom: 15 + 'px' }}>You now have an AI writing super power.</p>
              <antd_1.Button className="btn utilities-button btn-primary mt-4" onClick={() => navigate('/login')}>
                Log In
              </antd_1.Button>
            </div>
          </div>
        </div>)}
    </div>);
};
exports.default = Verification;
