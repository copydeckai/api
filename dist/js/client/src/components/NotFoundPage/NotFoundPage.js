"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const NotFoundPage = props => {
    const { onBack } = props;
    return (<div className="section _100vh">
      <div className="text-container">
        <div className="_40rem l-margin">
          <h2 className="h2-title s-margin">Sorry, this page does not exist or has been moved</h2>
          <div>Please, consider going back to our homepage.</div>
        </div>
        <button onClick={onBack} className="btn btn-primary is-rounded">
          Go back home
        </button>
      </div>
    </div>);
};
NotFoundPage.displayName = 'NotFoundPage';
exports.default = NotFoundPage;
