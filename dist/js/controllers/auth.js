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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = exports.changePassword = exports.resetPasswordPost = exports.resetPassword = exports.forgotPassword = exports.getUserDetails = exports.login = exports.register = void 0;
// import { IUser } from "./../../types/user"
const User_1 = __importDefault(require("../models/User"));
const mailer_1 = __importDefault(require("../utils/mailer"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_1 = require("../utils/error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const jwtSecret = process.env.JWT;
function getUserDataFromReq(req) {
    return new Promise((resolve, _reject) => {
        jsonwebtoken_1.default.verify(req.cookies.token, jwtSecret, {}, (err, userData) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                throw err;
            }
            resolve(userData);
        }));
    });
}
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName } = req.body;
    try {
        const userExist = yield User_1.default.findOne({ email });
        if (userExist)
            return next((0, error_1.createError)(422, "User with email already exists"));
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(req.body.password, salt);
        const newUser = new User_1.default(Object.assign(Object.assign({}, req.body), { password: hash }));
        yield newUser.save();
        // Generate token with id
        const token = newUser.generateVerificationToken();
        // const verificationToken = newUser.token();
        // Email the user a unique verification link
        const link = `https://copydeck.grayshapes.co/verify-identity/${newUser.id}/${token}`;
        yield (0, mailer_1.default)(email, "Confirm Account", link, firstName, "signup-confirm");
        res.status(200).send("Verfication email sent");
    }
    catch (err) {
        next(err);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user)
            return next((0, error_1.createError)(404, "Wrong password or email"));
        // if (!user.isActive) return next(createError(403, "Account hasn\'t been verified"));
        if (user.isBanned)
            return next((0, error_1.createError)(401, "User has been banned"));
        const isMatch = yield bcryptjs_1.default.compare(req.body.password, user === null || user === void 0 ? void 0 : user.password);
        if (!isMatch)
            return next((0, error_1.createError)(400, "Wrong password or email"));
        const _a = user._doc, { password, isAdmin, isActive } = _a, otherDetails = __rest(_a, ["password", "isAdmin", "isActive"]);
        jsonwebtoken_1.default.sign({ id: user._id, isAdmin: user.isAdmin, isActive: user.isActive }, jwtSecret, {}, (err, token) => {
            if (err) {
                throw err;
            }
            res
                .cookie('token', token, {
                httpOnly: true,
            })
                .status(200)
                .json(Object.assign(Object.assign({}, otherDetails), { isAdmin, isActive }));
        });
    }
    catch (err) {
        next(err);
    }
});
exports.login = login;
const getUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    try {
        if (token) {
            jsonwebtoken_1.default.verify(token, jwtSecret, {}, (err, userData) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    throw err;
                }
                const query = { _id: userData.id };
                const account = yield User_1.default.findOne(query);
                res.status(200).json(account);
            }));
        }
        else {
            res.status(401).json(null);
        }
    }
    catch (err) {
        throw res.status(500).json({ message: 'Server error occured' });
        next(err);
    }
});
exports.getUserDetails = getUserDetails;
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user)
            return next((0, error_1.createError)(404, "User not found!"));
        const token = jsonwebtoken_1.default.sign({ email: user.email, id: user._id }, jwtSecret, {
            expiresIn: "5m",
        });
        const link = `https://copydeck.grayshapes.co/reset-password/${user._id}/${token}`;
        const email = req.body.email;
        yield (0, mailer_1.default)(email, "Password Reset", link, "", "reset-password");
        res.status(200).send("Password reset link sent");
    }
    catch (err) {
        next((0, error_1.createError)(500, "Something went wrong"));
        console.log(err);
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.params;
    const user = yield User_1.default.findOne({ _id: id });
    if (!user)
        return next((0, error_1.createError)(404, "User not found!"));
    let payload = null;
    try {
        payload = jsonwebtoken_1.default.verify(token, jwtSecret);
    }
    catch (err) {
        return res.status(500).send(`Invalid token: ${err}`);
    }
    // try {
    // const verify = jwt.verify(token, process.env.JWT);
    // res.render("index", { email: verify.email, status: "Not Verified" });
    // } catch (error) {
    // console.log(error);
    // res.status(400).send("Not Verified");
    // }
});
exports.resetPassword = resetPassword;
const resetPasswordPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.params;
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ _id: id });
    if (!user)
        return next((0, error_1.createError)(404, "User not found!"));
    let payload = null;
    try {
        payload = jsonwebtoken_1.default.verify(token, jwtSecret);
        try {
            const isMatchPassword = yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (isMatchPassword)
                return next((0, error_1.createError)(400, "New password cannot be similar as previous password"));
            const verify = jsonwebtoken_1.default.verify(token, jwtSecret);
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hash = yield bcryptjs_1.default.hashSync(password, salt);
            yield User_1.default.updateOne({
                _id: id,
            }, {
                $set: {
                    password: hash,
                },
            });
            const content = `Your copydeck account password has been changed.`;
            yield (0, mailer_1.default)(email, "Password Reset Done", content, "", "reset-done");
            res.status(200).send("Password reset done.");
        }
        catch (err) {
            console.log(err);
            next(err);
            //   res.json({ status: "Something Went Wrong" });
        }
    }
    catch (err) {
        return next((0, error_1.createError)(500, `Link token expired`));
    }
});
exports.resetPasswordPost = resetPasswordPost;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield getUserDataFromReq(req);
    const { newPassword } = req.body;
    const user = yield User_1.default.findOne({ _id: userData.id });
    // if (!user) return next(createError(404, "User not found!"));
    try {
        const isMatchPassword = yield bcryptjs_1.default.compare(newPassword, user.password);
        if (isMatchPassword)
            return next((0, error_1.createError)(400, "Try a password you've not used before."));
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = yield bcryptjs_1.default.hashSync(newPassword, salt);
        yield User_1.default.updateOne({
            _id: userData.id,
        }, {
            $set: {
                password: hash,
            },
        });
        const content = `Your copydeck account password has been updated.`;
        yield (0, mailer_1.default)(user === null || user === void 0 ? void 0 : user.email, "Password has been changed", content, "", "reset-done");
        res.status(200).send("Password updated.");
    }
    catch (err) {
        console.log(err);
        next(err);
        //   res.json({ status: "Something Went Wrong" });
    }
});
exports.changePassword = changePassword;
const verifyEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.params;
    if (!token) {
        return res.status(422).send({
            message: "Missing token"
        });
    }
    // Verify the token from the URL
    let payload = null;
    try {
        payload = jsonwebtoken_1.default.verify(token, jwtSecret);
    }
    catch (err) {
        return next((0, error_1.createError)(500, `Invalid token: ${err}`));
    }
    try {
        const user = yield User_1.default.findOne({ _id: id });
        if (!user)
            return next((0, error_1.createError)(404, "User not found!"));
        user.isActive = true;
        yield user.save();
        return res.status(200).send({
            message: "Account Verified"
        });
    }
    catch (err) {
        console.log(err);
        next(err);
        // return res.status(500).send(err);
    }
});
exports.verifyEmail = verifyEmail;
