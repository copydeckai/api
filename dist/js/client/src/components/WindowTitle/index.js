"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowTitle = void 0;
const react_1 = __importDefault(require("react"));
const react_helmet_1 = require("react-helmet");
const WindowTitle = ({ title }) => !title ? null : <react_helmet_1.Helmet title={`${title} - Copy Deck`}/>;
exports.WindowTitle = WindowTitle;
