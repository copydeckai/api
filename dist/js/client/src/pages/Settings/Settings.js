"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const icons_1 = require("@tabler/icons");
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
// import { Link } from "react-router-dom";
const MembershipSettings_1 = __importDefault(require("./views/MembershipSettings"));
const PasswordSettings_1 = __importDefault(require("./views/PasswordSettings"));
const ProfileSettings_1 = __importDefault(require("./views/ProfileSettings"));
const Settings = () => {
    // const onChange = (key: string) => {
    //   console.log(key);
    // };
    const items = [
        {
            key: '1',
            label: (<span>
          <icons_1.IconUser />
          Profile
        </span>),
            children: <ProfileSettings_1.default />
        },
        {
            key: '2',
            label: (<span>
          <icons_1.IconCreditCard />
          Membership
        </span>),
            children: <MembershipSettings_1.default />
        },
        {
            key: '3',
            label: (<span>
          <icons_1.IconKey />
          Password
        </span>),
            children: <PasswordSettings_1.default />
        }
    ];
    return (<div className="hp-main-layout-content">
      <div className="row mb-32 gy-32">
        <div className="col-12">
          <div className="row">
            <div className="col-12 col-md-6">
              <h3>My Account</h3>
            </div>
          </div>
        </div>

        <div className="col-12">
          <antd_1.Tabs defaultActiveKey="1" items={items}></antd_1.Tabs>
        </div>
      </div>
    </div>);
};
Settings.displayName = 'Settings';
exports.default = Settings;
