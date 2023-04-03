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
// import { Link } from "react-router-dom";
const searchContext_1 = require("@copydeck/contexts/searchContext");
const useNavigator_1 = __importDefault(require("@copydeck/hooks/useNavigator"));
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
const WritingCard_1 = __importDefault(require("./components/WritingCard"));
require("./home.css");
const Home = () => {
    const navigate = (0, useNavigator_1.default)();
    const { setSearchResults, searchResults, keyword } = (0, searchContext_1.useSearch)();
    (0, react_1.useEffect)(() => {
        if (keyword.length < 1) {
            setSearchResults(null);
        }
    }, [keyword, setSearchResults]);
    return (<div className="hp-main-layout-content">
      <div className="row mb-32 gy-32">
        <div className="col-12">
          <div className="row align-items-center justify-content-between g-24">
            <div className="col-12 col-md-6">
              {searchResults ? <h3>Results for : {keyword}</h3> : <h3>Your Writings</h3>}
            </div>
            <div className="col hp-flex-none w-auto">
              <antd_1.Button onClick={() => navigate('/write')} className="btn btn-primary is-rounded">
                Write New
              </antd_1.Button>
            </div>
          </div>
        </div>
        <WritingCard_1.default />
      </div>
    </div>);
};
Home.displayName = 'Home';
exports.default = Home;
