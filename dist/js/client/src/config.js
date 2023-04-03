"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosInstance = exports.GTM_ID = exports.APP_VERSION = exports.API_URL = exports.API_URI = exports.APP_DEFAULT_URI = exports.APP_MOUNT_URI = void 0;
const axios_1 = __importDefault(require("axios"));
const package_json_1 = __importDefault(require("../package.json"));
// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;
axios_1.default.defaults.baseURL = process.env.API_URI;
axios_1.default.defaults.withCredentials = true;
exports.APP_MOUNT_URI = process.env.APP_MOUNT_URI;
exports.APP_DEFAULT_URI = '/';
exports.API_URI = process.env.API_URI;
exports.API_URL = process.env.API_URL;
exports.APP_VERSION = package_json_1.default.version;
exports.GTM_ID = process.env.GTM_ID;
exports.axiosInstance = axios_1.default.create({
    baseURL: process.env.API_URL
});
// export const userRequest = axios.create({
//   baseURL: process.env.API_URL,
//   header: { token: `Bearer ${TOKEN}` },
// });
