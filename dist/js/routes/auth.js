"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const verifyToken_1 = require("../utils/verifyToken");
const router = (0, express_1.Router)();
const use = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
};
router.post('/register', use(auth_1.register));
router.post('/login', auth_1.login);
router.get('/fetch', auth_1.getUserDetails);
router.post('/forgot-password', auth_1.forgotPassword);
router.post('/resend-confirm', auth_1.resendConfirmEmail);
router.get('/reset-password/:id/:token', auth_1.resetPassword);
router.post('/reset-password/:id/:token', auth_1.resetPasswordPost);
router.post('/change-password', verifyToken_1.verifyUser, auth_1.changePassword);
router.get('/verify/:id/:token', auth_1.verifyEmail);
// router.get('/google', googlePassport);
// router.get('/google/callback', googlePassportCallback);
exports.default = router;
//# sourceMappingURL=auth.js.map