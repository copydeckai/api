"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import externalLinkIcon from "@assets/icons/externalLink.svg"
// import { Avatar } from "@mantine/core";;
const Chat_svg_1 = __importDefault(require("@assets/icons/Chat.svg"));
const Edit_svg_1 = __importDefault(require("@assets/icons/Edit.svg"));
const Logout_svg_1 = __importDefault(require("@assets/icons/Logout.svg"));
const Star_svg_1 = __importDefault(require("@assets/icons/Star.svg"));
const User_svg_1 = __importDefault(require("@assets/icons/User.svg"));
const icon_svg_1 = __importDefault(require("@assets/images/icon.svg"));
const logo_light_svg_1 = __importDefault(require("@assets/images/logo-light.svg"));
const useNavigator_1 = __importDefault(require("@copydeck/hooks/useNavigator"));
const axios_1 = __importDefault(require("axios"));
const react_1 = __importDefault(require("react"));
// import Gravatar from "react-gravatar";
const react_inlinesvg_1 = __importDefault(require("react-inlinesvg"));
const react_router_dom_1 = require("react-router-dom");
const authContext_1 = require("../../contexts/authContext");
require("./sidebar.css");
const SideBar = () => {
    const { user, setUser } = (0, authContext_1.useAuth)();
    const navigate = (0, useNavigator_1.default)();
    const activeClassName = ({ isActive }) => (isActive ? 'active' : '');
    // React.useEffect(() => {
    //   document.body.classList.remove('collapsed-active');
    // }, []);
    function logout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default.post('/logout');
            setUser(null);
            navigate('/');
        });
    }
    //   const userAvatar = user?.details.avatar
    const userAvatar = (user === null || user === void 0 ? void 0 : user.avatar)
        ? user === null || user === void 0 ? void 0 : user.avatar
        : 'https://avatars.githubusercontent.com/u/29050206?s=120&v=4';
    return (<div className="hp-sidebar hp-bg-color-black-20">
      <div className="hp-sidebar-container">
        <div className="hp-sidebar-header-menu">
          <div className="row justify-content-between align-items-end mx-0">
            <div className="w-auto px-0 hp-sidebar-collapse-button hp-sidebar-visible">
              <react_router_dom_1.Link to="/" className="hp-cursor-pointer">
                <react_inlinesvg_1.default src={icon_svg_1.default} className="hp-logo"/>
              </react_router_dom_1.Link>
            </div>

            <div className="w-auto px-0">
              <div className="hp-header-logo d-flex align-items-center">
                <react_router_dom_1.Link to="/" className="position-relative">
                  <react_inlinesvg_1.default className="hp-logo hp-sidebar-hidden hp-dir-none" src={logo_light_svg_1.default}/>
                </react_router_dom_1.Link>
              </div>
            </div>
          </div>

          <ul>
            <li>
              <ul>
                <li>
                  <react_router_dom_1.NavLink className={activeClassName} to="/">
                    <span>
                      <span className="submenu-item-icon">
                        <react_inlinesvg_1.default src={Edit_svg_1.default}/>
                      </span>

                      <span>My Writings</span>
                    </span>
                  </react_router_dom_1.NavLink>
                </li>
              </ul>
            </li>

            <li>
              <div className="menu-title">Account</div>
              <ul>
                <li>
                  <react_router_dom_1.NavLink className={activeClassName} to="/account">
                    <span>
                      <span className="submenu-item-icon">
                        <react_inlinesvg_1.default src={User_svg_1.default}/>
                      </span>

                      <span>My Account</span>
                    </span>
                  </react_router_dom_1.NavLink>
                </li>

                <li>
                  <a target="_blank" href="http://localhost:3000/pricing?ref=webapp&page=HomePageMenu">
                    <span>
                      <div className="submenu-item-icon">
                        <react_inlinesvg_1.default src={Star_svg_1.default}/>
                      </div>

                      <span>Get Premium</span>
                    </span>
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <div className="menu-title">Resources</div>

              <ul>
                <li>
                  <a href="">
                    <span>
                      <span className="submenu-item-icon">
                        <react_inlinesvg_1.default src={Chat_svg_1.default}/>
                      </span>
                      <span>Help & Guides</span>
                    </span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="row justify-content-between align-items-center hp-sidebar-footer mx-0 hp-bg-color-dark-90">
          <div className="col">
            <div className="row align-items-center">
              <div className="w-auto px-0">
                <div className="avatar-item bg-primary-4 d-flex align-items-center justify-content-center rounded-circle">
                  <img src={userAvatar} height="100%" className="hp-img-cover"/>
                </div>
              </div>

              <div className="w-auto ms-8 px-0 hp-sidebar-hidden mt-4">
                <span className="d-block hp-text-color-black-100 hp-text-color-dark-0 hp-p1-body lh-1">{`${user === null || user === void 0 ? void 0 : user.firstName} ${user === null || user === void 0 ? void 0 : user.lastName}`}</span>
                <span className="user-email">{user === null || user === void 0 ? void 0 : user.email}</span>
              </div>
            </div>
          </div>

          <div className="col hp-flex-none w-auto px-0 hp-sidebar-hidden">
            <a className="hp-cursor-pointer" onClick={logout}>
              <react_inlinesvg_1.default src={Logout_svg_1.default}/>
            </a>
          </div>
        </div>
      </div>
    </div>);
};
SideBar.displayName = 'SideBar';
exports.default = SideBar;
