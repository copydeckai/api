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
const empty_svg_1 = __importDefault(require("@assets/icons/empty.svg"));
// import { API_URL } from "@copydeck/config";
const searchContext_1 = require("@copydeck/contexts/searchContext");
const makeRequest_1 = require("@copydeck/hooks/makeRequest");
// import useNavigator from "@copydeck/hooks/useNavigator";
const antd_1 = require("antd");
const axios_1 = __importDefault(require("axios"));
const react_1 = __importStar(require("react"));
// import SVG from "react-inlinesvg";
// import toast from "react-hot-toast";
const WritingCardInner_1 = __importDefault(require("./WritingCardInner"));
const WritingCard = () => {
    // const navigate = useNavigator();
    const { searchResults, loading: searchLoading } = (0, searchContext_1.useSearch)();
    const [confirmLoading, setConfirmLoading] = (0, react_1.useState)(false);
    const { loading, error, data } = (0, makeRequest_1.useFetch)(`/story/stories`);
    const [list, setList] = (0, react_1.useState)(data);
    // useEffect(() => {
    //   setList(data);
    // }, [data]);
    (0, react_1.useEffect)(() => {
        if (searchResults) {
            // navigate("/");
            setList(searchResults);
        }
        else {
            setList(data);
        }
    }, [data, searchResults]);
    const handleDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        setConfirmLoading(true);
        try {
            yield axios_1.default.delete(`/story/${id}/delete`, {
                withCredentials: true
            });
            setList(list.filter(item => item._id !== id));
            antd_1.message.success('Story successfully deleted');
            setConfirmLoading(false);
        }
        catch (err) {
            antd_1.message.error(err);
        }
    });
    return (<antd_1.Col span={24}>
      {error ? ('Something went wrong!') : loading || searchLoading ? (<div className="row g-32">
          <div className="col-lg-4">
            <antd_1.Card className="writings p-0">
              <antd_1.Skeleton active={!loading}></antd_1.Skeleton>
            </antd_1.Card>
          </div>
          <div className="col-lg-4">
            <antd_1.Card className="writings p-0">
              <antd_1.Skeleton active={!loading}></antd_1.Skeleton>
            </antd_1.Card>
          </div>
          <div className="col-lg-4">
            <antd_1.Card className="writings p-0">
              <antd_1.Skeleton active={!loading}></antd_1.Skeleton>
            </antd_1.Card>
          </div>
        </div>) : list.length > 0 ? (<div className="row g-32">
          {list.map((_data, index) => (<WritingCardInner_1.default data={_data} key={index} confirmLoading={confirmLoading} deleteAction={handleDelete}/>))}
        </div>) : (<antd_1.Row gutter={16} className="g-32 d-block">
          <antd_1.Empty image={empty_svg_1.default} description={false}>
            <h4 className="mt-42 hp-text-color-dark-30">No writing</h4>
            <p>Use the button to add a new story</p>
          </antd_1.Empty>
        </antd_1.Row>)}
    </antd_1.Col>);
};
WritingCard.displayName = 'WritingCard';
exports.default = WritingCard;
