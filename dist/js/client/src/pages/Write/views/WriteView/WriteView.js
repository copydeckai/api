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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const icon_svg_1 = __importDefault(require("@assets/images/icon.svg"));
const NotFoundPage_1 = __importDefault(require("@copydeck/components/NotFoundPage"));
// import logoDark from "@assets/images/logo-light.svg";
const ThemeSwitch_1 = __importDefault(require("@copydeck/components/ThemeSwitch"));
const makeRequest_1 = require("@copydeck/hooks/makeRequest");
// import useNavigator from "@copydeck/hooks/useNavigator";
// import { Button } from "antd";
const react_1 = __importStar(require("react"));
const react_inlinesvg_1 = __importDefault(require("react-inlinesvg"));
const react_router_dom_1 = require("react-router-dom");
require("./style.scss");
const WriteView = () => {
    // const navigate = useNavigator();
    const { id } = (0, react_router_dom_1.useParams)();
    const { data, error, loading } = (0, makeRequest_1.useFetch)(`/story/read/${id}`);
    const [story, setStory] = (0, react_1.useState)(data[0]);
    (0, react_1.useEffect)(() => {
        setStory(data[0]);
    }, [data]);
    return (<div className="sc-iwjdpV rzjgo">
      <div className="sc-dlVxhl dYGOrL">
        <react_router_dom_1.Link to="/">
          <react_inlinesvg_1.default className="hp-logo sc-ieecCq bJuKmw hp-dark-block" src={icon_svg_1.default}/>
          <react_inlinesvg_1.default className="hp-logo sc-ieecCq bJuKmw hp-dark-none" src={icon_svg_1.default}/>
        </react_router_dom_1.Link>
        <div className="sc-kfPuZi ePnpsE">
          <div className="me-24">
            <ThemeSwitch_1.default />
          </div>
          <div className="sc-fKVqWL eperKY">
            <a 
    // htmlType="submit"
    className="btn btn-primary is-rounded">
              Write with Copydeck
            </a>
          </div>
        </div>
      </div>
      {error ? ('Something went wrong!') : !loading ? (story ? (<div className="sc-cxpSdN hhLwZn">
            <h2 className="sc-gsDKAQ sc-iJKOTD jmEcTz">{story === null || story === void 0 ? void 0 : story.title}</h2>
            <div className="sc-llYSUQ bbWDWG">
              <p className="sc-eCImPb sc-giYglK dNLAro">
                Written by<span>&nbsp;</span>
              </p>
              <p className="sc-jRQBWg dcPzrL">
                {`${story === null || story === void 0 ? void 0 : story.authorFname} ${story === null || story === void 0 ? void 0 : story.authorLname}`}
                <span>&nbsp;</span>
              </p>
              {/* <p className="sc-eCImPb sc-giYglK dNLAro">on Copydeck</p> */}
            </div>
            <div className="sc-eCImPb sc-ezbkAF ebKIPs A-dmbO" dangerouslySetInnerHTML={{ __html: story === null || story === void 0 ? void 0 : story.content }}></div>
          </div>) : (<NotFoundPage_1.default onBack={undefined}/>)) : (<div className="circular-loader">
          <div className={`has-loader is-fixed has-loader-active`}>
            <div className="h-loader-wrapper">
              <div className="loader is-large is-loading"></div>
            </div>
          </div>
        </div>)}
    </div>);
};
WriteView.displayName = 'WriteView';
exports.default = WriteView;
