"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
// import { useForm } from "@mantine/form";
const react_1 = __importDefault(require("react"));
// import { Link } from "react-router-dom";
const MembershipSettings = () => {
    const { Text } = antd_1.Typography;
    return (<antd_1.Card>
      <div className="card-body">
        <div className="row align-items-center justify-content-between">
          <div className="col-12 col-md-6">
            <Text>Membership</Text>
          </div>
        </div>
      </div>
    </antd_1.Card>);
};
MembershipSettings.displayName = 'MembershipSettings';
exports.default = MembershipSettings;
