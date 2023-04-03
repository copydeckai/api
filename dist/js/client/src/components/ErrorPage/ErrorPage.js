"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WindowTitle_1 = require("@copydeck/components/WindowTitle");
const react_1 = __importDefault(require("react"));
const ErrorPage = props => {
    const { id } = props;
    return (<div className="utilities-section">
      <WindowTitle_1.WindowTitle title={`That's an Error`}/>
      <div className="utilities-form-column">
        <div className="utilities-form-wrap d-flex">
          <h1 className="l-margin">
            (<span className="text-primary">:</span>
          </h1>
          <div>
            <h4 className="h4-title xs-margin">That's an error!</h4>
            <p className="m-paragraph l-margin">
              Refresh the page to dismiss this message {id} or navigate to a different page.
            </p>
          </div>
          <div className="utilities-form w-form"></div>
        </div>
      </div>
    </div>);
};
ErrorPage.displayName = 'ErrorPage';
exports.default = ErrorPage;
