"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUrl = exports.newPasswordUrl = exports.socialSignInCallbackPath = exports.socialSignInUrl = exports.socialSignInPath = exports.logoutPath = exports.signupPath = exports.loginPath = exports.newPasswordPath = exports.passwordResetSuccessUrl = exports.passwordResetSuccessPath = exports.passwordResetUrl = exports.passwordResetPath = exports.updateWritingUrl = exports.writingSection = exports.accountPageUrl = exports.searchUrl = exports.homePageUrl = void 0;
const urls_1 = require("@copydeck/utils/urls");
exports.homePageUrl = '/';
exports.searchUrl = `/:search`;
// Account
exports.accountPageUrl = '/account';
// Writing
exports.writingSection = '/write';
exports.updateWritingUrl = `${exports.writingSection}/:id`;
// Auth
exports.passwordResetPath = '/forgot-password/';
exports.passwordResetUrl = exports.passwordResetPath;
exports.passwordResetSuccessPath = '/reset-password/success/';
exports.passwordResetSuccessUrl = exports.passwordResetSuccessPath;
exports.newPasswordPath = '/new-password/';
exports.loginPath = '/login/';
exports.signupPath = '/signup/';
exports.logoutPath = '/logout/';
exports.socialSignInPath = '/social-signin/';
exports.socialSignInUrl = exports.socialSignInPath;
exports.socialSignInCallbackPath = '/social-signin/callback/';
const newPasswordUrl = (params) => exports.newPasswordPath + '?' + (0, urls_1.stringifyQs)(params);
exports.newPasswordUrl = newPasswordUrl;
// Logout
exports.logoutUrl = '/logout';
