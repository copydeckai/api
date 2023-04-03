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
const icons_1 = require("@ant-design/icons");
const config_1 = require("@copydeck/config");
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
// import validator from "validator";
const PasswordSettings = () => {
    const { Text, Title } = antd_1.Typography;
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [password, setPassword] = (0, react_1.useState)('');
    const [newPassword, setNewPassword] = (0, react_1.useState)('');
    const [confirmPassword, setConfirmPassword] = (0, react_1.useState)('');
    function changePasswordAction() {
        return __awaiter(this, void 0, void 0, function* () {
            setLoading(true);
            try {
                if (confirmPassword !== newPassword) {
                    antd_1.message.error('Passwords do not match');
                    setLoading(false);
                    return;
                }
                const payload = {
                    password,
                    newPassword,
                    confirmPassword
                };
                yield config_1.axiosInstance.post(`/auth/change-password`, payload, {
                    withCredentials: true
                });
                setLoading(false);
                antd_1.message.success('Password Updated');
            }
            catch (err) {
                setLoading(false);
                antd_1.message.error(err.message);
                return [];
            }
        });
    }
    const formDisabled = () => {
        if (password && newPassword && confirmPassword) {
            if (password.length !== 0 || newPassword !== confirmPassword) {
                return true;
            }
        }
        return false;
    };
    return (<antd_1.Card>
      <div className="card-body">
        <div className="row align-items-center justify-content-between">
          <div className="col-12 col-md-6 hp-profile-content-list">
            <Title level={5}>Update Account Password</Title>
            <div className="hp-profile-content-list mt-16 pb-0 pb-sm-36">
              <form>
                <antd_1.Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                  <div>
                    <Text>Current Password</Text>
                    <antd_1.Input.Password className="mt-4" size="large" placeholder="current password" iconRender={visible => (visible ? <icons_1.EyeTwoTone /> : <icons_1.EyeInvisibleOutlined />)} value={password} onChange={e => setPassword(e.target.value)}/>
                  </div>
                  <div>
                    <Text>New Password</Text>
                    <antd_1.Input.Password className="mt-4" size="large" placeholder="input password" iconRender={visible => (visible ? <icons_1.EyeTwoTone /> : <icons_1.EyeInvisibleOutlined />)} value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
                  </div>
                  <div>
                    <Text>Repeat Password</Text>
                    <antd_1.Input.Password className="mt-4" size="large" placeholder="repeat password" iconRender={visible => (visible ? <icons_1.EyeTwoTone /> : <icons_1.EyeInvisibleOutlined />)} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                  </div>
                </antd_1.Space>
              </form>
            </div>
            <div className="hp-profile-action-btn">
              <antd_1.Button onClick={changePasswordAction} loading={loading} disabled={!formDisabled()} className="btn btn-primary is-rounded">
                Change Password
              </antd_1.Button>
            </div>
          </div>
        </div>
      </div>
    </antd_1.Card>);
};
PasswordSettings.displayName = 'PasswordSettings';
exports.default = PasswordSettings;
