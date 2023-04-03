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
Object.defineProperty(exports, "__esModule", { value: true });
// import { axiosInstance } from '@copydeck/config';
const authContext_1 = require("@copydeck/contexts/authContext");
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
// import { Link } from "react-router-dom";
const ProfileSettings = () => {
    const { user, updateUserAccount } = (0, authContext_1.useAuth)();
    const { Title, Text } = antd_1.Typography;
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [firstName, setFirstName] = (0, react_1.useState)(user === null || user === void 0 ? void 0 : user.firstName);
    const [lastName, setLastName] = (0, react_1.useState)(user === null || user === void 0 ? void 0 : user.lastName);
    const [phoneNumber, setPhoneNumber] = (0, react_1.useState)(user === null || user === void 0 ? void 0 : user.phone);
    function updateProfileAction() {
        return __awaiter(this, void 0, void 0, function* () {
            // e.preventDefault();
            setLoading(true);
            try {
                const payload = {
                    firstName,
                    lastName,
                    phone: phoneNumber
                };
                yield updateUserAccount(payload);
                setLoading(false);
                antd_1.message.success('Profile updated');
            }
            catch (err) {
                setLoading(false);
                antd_1.message.error(err.message);
                return [];
            }
        });
    }
    const formDisabled = () => {
        if (firstName && lastName && phoneNumber) {
            if ((phoneNumber.length >= 9 && firstName !== (user === null || user === void 0 ? void 0 : user.firstName)) ||
                lastName !== (user === null || user === void 0 ? void 0 : user.lastName) ||
                phoneNumber !== (user === null || user === void 0 ? void 0 : user.phone)) {
                return true;
            }
        }
        return false;
    };
    return (<antd_1.Card>
      <div className="card-body">
        <div className="row align-items-center justify-content-between">
          <div className="col-12 col-md-6 hp-profile-content-list">
            <Title level={5}>Update Profile</Title>
            <div className="hp-profile-content-list mt-16 pb-0 pb-sm-36">
              <form>
                <antd_1.Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                  <div>
                    <Text>First Name</Text>
                    <antd_1.Input className="mt-4" size="large" placeholder="John" disabled={loading} value={firstName} onChange={e => setFirstName(e.target.value)}/>
                  </div>
                  <div>
                    <Text>Last Name</Text>
                    <antd_1.Input className="mt-4" size="large" placeholder="Doe" disabled={loading} value={lastName} onChange={e => setLastName(e.target.value)}/>
                  </div>
                  <div>
                    <Text>Email Address</Text>
                    <antd_1.Input className="mt-4" size="large" placeholder="your@email.com" value={user.email} disabled/>
                  </div>
                  <div>
                    <Text>Phone Number</Text>
                    <antd_1.Input className="mt-4" size="large" placeholder="Phone" disabled={loading} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                  </div>
                </antd_1.Space>
              </form>
            </div>
            <div className="hp-profile-action-btn">
              <antd_1.Button onClick={updateProfileAction} disabled={!formDisabled()} loading={loading} className="btn btn-primary is-rounded">
                Save Changes
              </antd_1.Button>
            </div>
          </div>
        </div>
      </div>
    </antd_1.Card>);
};
ProfileSettings.displayName = 'ProfileSettings';
exports.default = ProfileSettings;
