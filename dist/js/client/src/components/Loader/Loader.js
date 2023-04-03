"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Loader = () => (<div className="circular-loader">
    <div className="has-loader is-relative has-loader-active">
      <div className="h-loader-wrapper">
        <div className="loader is-large is-loading"></div>
      </div>
    </div>
  </div>);
Loader.displayName = 'Loader';
exports.default = Loader;
