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
Object.defineProperty(exports, "__esModule", { value: true });
// import { makeRequest } from "@copydeck/utils/makeRequest";
const icons_1 = require("@tabler/icons");
const antd_1 = require("antd");
const date_fns_1 = require("date-fns");
const react_1 = __importStar(require("react"));
// import { useQuery } from "@tanstack/react-query";
const react_router_dom_1 = require("react-router-dom");
const WritingCardInner = ({ data, deleteAction, confirmLoading }) => {
    const contentSnippet = data.content.substring(0, 250) + '...';
    const [visible, setVisible] = (0, react_1.useState)(false);
    const showPopconfirm = () => {
        setVisible(true);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    const CardActions = () => (<div className="card-footer sc-fpYaaq dgVbpZ">
      <div className="sc-lnDqNf knFRhQ">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="StyledIconBase-ea9ulj-0 fHrGFt sc-hUnA hTifgl">
          <g data-name="Layer 2">
            <g data-name="clock">
              <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z"></path>
              <path d="M16 11h-3V8a1 1 0 00-2 0v4a1 1 0 001 1h4a1 1 0 000-2z"></path>
            </g>
          </g>
        </svg>
        <p className="sc-jrQzAO sc-cnTVOG isybwh gTHWVV">
          {/* {format(new Date(data.updatedAt), 'yyyy-MM-dd')} */}
          {(0, date_fns_1.formatDistance)((0, date_fns_1.subDays)(new Date(data.updatedAt), 0), new Date(), {
            addSuffix: true
        })}
        </p>
      </div>
      <div className="sc-lnDqNf knFRhQ">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="StyledIconBase-ea9ulj-0 fHrGFt sc-hUnA hTifgl">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path>
        </svg>
        <p className="sc-jrQzAO sc-cnTVOG isybwh gTHWVV">{data.wordCount} words</p>
      </div>
      <div className="sc-hctura jmeNYp">
        <react_router_dom_1.Link to={`/write/${data.urlString}`}>
          <icons_1.IconEdit className="fHrGFt sc-jSYIrd"/>
        </react_router_dom_1.Link>
      </div>
      <div className="sc-hctura jmeMXd">
        <antd_1.Popconfirm placement="bottomRight" title="Are you sure you want to delete this?" open={visible} onConfirm={() => {
            deleteAction(data._id);
            setVisible(false);
        }} okButtonProps={{ loading: confirmLoading }} okText="Delete" cancelText="Nope" onCancel={handleCancel} icon={<icons_1.IconInfoCircle />}>
          <icons_1.IconTrash className="fHrGFt sc-jSYIrd" onClick={showPopconfirm}/>
        </antd_1.Popconfirm>
      </div>
    </div>);
    return (<div className="col-lg-4">
      <antd_1.Card className="writings mb-8" actions={[<CardActions />]}>
        <h6>{data.title}</h6>
        <p className="hp-p1-body hp-mb-0 sssjW" dangerouslySetInnerHTML={{ __html: contentSnippet }}></p>
      </antd_1.Card>
    </div>);
};
WritingCardInner.displayName = 'WritingCardInner';
exports.default = WritingCardInner;
