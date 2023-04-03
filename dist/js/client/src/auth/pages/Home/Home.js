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
const _62b56c9b9a3cf13e0ca0fb6e_Iphone_Card_png_1 = __importDefault(require("@assets/images/app/62b56c9b9a3cf13e0ca0fb6e_Iphone_Card.png"));
// import { Button } from 'antd';
// import chevron from '@assets/images/app/6128e36d3eea8b7d17ec992c_Chevron.svg';
const _62b559ad3eba99521996f929_Half_Mac_Pro_png_1 = __importDefault(require("@assets/images/app/62b559ad3eba99521996f929_Half_Mac_Pro.png"));
const _62c588ae673c647fb6f95ddf_Support_ill_png_1 = __importDefault(require("@assets/images/app/62c588ae673c647fb6f95ddf_Support_ill.png"));
const WindowTitle_1 = require("@copydeck/components/WindowTitle");
const useNavigator_1 = __importDefault(require("@copydeck/hooks/useNavigator"));
const react_1 = __importStar(require("react"));
const Home = () => {
    const navigate = (0, useNavigator_1.default)();
    const [email, setEmail] = (0, react_1.useState)('');
    const handleSubmit = () => {
        navigate(`/signup?email=${email}`);
    };
    return (<>
      <WindowTitle_1.WindowTitle title={`Home`}/>
      <div className="section overflow-hidden _hero-section">
        <div className="text-container center _37-5rem">
          <h1 className="h1-title s-margin">Make writers block a thing of the past.</h1>
          <p className="l-paragraph l-margin">
            Get writing superpowers with an AI writing partner. At the click of a button, our AI can
            continue writing for you, help you get your thoughts on paper, and more.
          </p>
          <div>
            <div className="email-form w-form">
              <form data-name="" id="email-form" name="email-form" method="get" aria-label="Form">
                <input autoFocus type="email" className="email-capture-field w-input" maxLength={256} name="Email" data-name="Email" placeholder="Enter Your Email" id="field" onChange={e => setEmail(e.target.value)} value={email} required/>
                <input onClick={handleSubmit} type="submit" value="" data-wait="..." className="circular-form-button w-button"/>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="grid">
            <div id="w-node-f7af8eda-761f-8217-7ef5-6155109b2906-109b2903" className="bg-gray-4 rounded">
              <div id="w-node-f7af8eda-761f-8217-7ef5-6155109b2907-109b2903" className="grid">
                <img src={_62b559ad3eba99521996f929_Half_Mac_Pro_png_1.default} loading="eager" id="w-node-c46f59e8-d854-2d8f-bda4-4bfb5474ab98-109b2903" alt="" className="_100-width no-round"/>
                <div id="w-node-f7af8eda-761f-8217-7ef5-6155109b2909-109b2903" className="l-card center-content">
                  <div className="centered-and-vertical">
                    <h3 className="s-margin">AI writing assitance</h3>
                    <p className="m-paragraph hide-on-tablet">
                      CopyDeck is a platform where publishers and writers reach their potentials
                      using artificial intelligence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div id="w-node-f7af8eda-761f-8217-7ef5-6155109b291b-109b2903" className="l-card no-bottom-margin bg-gray-4 rounded">
              <div className="text-container center _37-5rem xl-margin">
                <h3 className="h3-title s-margin">Get past the dreaded blinking cursor.</h3>
                <p className="m-paragraph hide-on-tablet">
                  Just click the button and your AI partner will continue writing for you, in your
                  own voice.
                </p>
              </div>
              <img src={_62c588ae673c647fb6f95ddf_Support_ill_png_1.default} loading="eager" alt="" className="_100-width no-round"/>
            </div>
            <div id="w-node-_55d63eef-dec1-f77a-37f9-897d9e983b73-109b2903" className="l-card no-bottom-margin bg-gray-4 rounded">
              <div className="text-container center _37-5rem xl-margin">
                <h3 className="h3-title s-margin">Powerful commands.</h3>
                <p className="m-paragraph hide-on-tablet">
                  Refine your writing with /commands. Use commands to rewrite, shorten, and expand
                  your sentences instantly. Commands help you create your perfect sentences.
                </p>
              </div>
              <img src={_62b56c9b9a3cf13e0ca0fb6e_Iphone_Card_png_1.default} loading="eager" alt="" className="_100-width no-round"/>
            </div>
          </div>
        </div>
      </div>
      <div id="more" className="section">
        <div className="text-container center _37-5rem xl-margin">
          <h2 className="s-margin">How to use the AI</h2>
          <p className="l-paragraph">
            Our state-of-the-art AI will help you turn your thoughts into well-written paragraphs.
          </p>
        </div>
        <div className="container">
          <div className="steps-grid">
            <div className="centered-and-vertical">
              <div className="l-icon center-content _100-roundness bg-gray-4 xs-margin">
                <div className="l-subtitle text-primary">●</div>
              </div>
              <h6 className="xs-margin">/expand</h6>
              <p className="m-paragraph">Generates related text based on selected context.</p>
            </div>
            <div className="l-icon center-content hide-on-tablet">
              {/* <img
          src={chevron}
          loading="lazy"
          alt=""
          className="xs-icon"
        /> */}
            </div>
            <div className="centered-and-vertical">
              <div className="l-icon center-content _100-roundness bg-gray-4 xs-margin">
                <div className="l-subtitle text-primary">●</div>
              </div>
              <h6 className="xs-margin">/rewrite</h6>
              <p className="m-paragraph">Grammatically correct and coherent selected text.</p>
            </div>
            <div className="l-icon center-content hide-on-tablet">
              {/* <img
          src={chevron}
          loading="lazy"
          alt=""
          className="xs-icon"
        /> */}
            </div>
            <div className="centered-and-vertical">
              <div className="l-icon center-content _100-roundness bg-gray-4 xs-margin">
                <div className="l-subtitle text-primary">●</div>
              </div>
              <h6 className="xs-margin">/shorten</h6>
              <p className="m-paragraph">Generates a concise version of the selected text.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="xl-card bg-gray-4">
            <div className="text-container center _37-5rem">
              <h4 className="h4-title xs-margin">Turn your thoughts into fully-fledged prose.</h4>
              <p className="m-paragraph l-margin">
                All in a clean, blank, distraction-free interface.
              </p>
              <div className="buttons-wrap">
                <a href="/" className="primary-button btn-primary w-inline-block">
                  <div className="button-text-wrap">
                    <div className="button-text">Get Started</div>
                    <div className="button-text">Get Started</div>
                  </div>
                  <div className="button-hover-effect"></div>
                </a>
                <a href="#" className="primary-button btn-primary w-inline-block">
                  <div className="button-text-wrap">
                    <div className="button-text">Log In</div>
                    <div className="button-text">Log In</div>
                  </div>
                  <div className="button-hover-effect"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);
};
Home.displayName = 'Home';
exports.default = Home;
