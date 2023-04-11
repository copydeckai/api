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
exports.verifyEmail = exports.changePassword = exports.resetPasswordPost = exports.resetPassword = exports.forgotPassword = exports.getUserDetails = exports.login = exports.resendConfirmEmail = exports.register = void 0;
// import { IUser } from "./../../types/user"
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// import passport from 'passport';
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CreateError_1 = __importDefault(require("../error/CreateError"));
const mailer_1 = __importDefault(require("../utils/mailer"));
const User_1 = __importDefault(require("../models/User"));
// import { passportSession } from '../utils/verifyToken';
dotenv_1.default.config();
const jwtSecret = process.env.JWT;
// const clientUrl = process.env.CLIENT_URL as string;
function getUserDataFromReq(req) {
    return new Promise((resolve) => {
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
    const userExist = yield User_1.default.findOne({ email });
    if (userExist)
        return next(CreateError_1.default.badRequest('User with email already exists'));
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(req.body.password, salt);
    const newUser = new User_1.default(Object.assign(Object.assign({}, req.body), { password: hash }));
    yield newUser.save();
    // Generate token with id
    const token = newUser.generateVerificationToken();
    // const verificationToken = newUser.token();
    // Email the user a unique verification link
    const link = `https://copydeck.grayshapes.co/verify-identity/${newUser.id}/${token}`;
    yield (0, mailer_1.default)(email, 'Confirm Account', link, firstName, 'signup-confirm');
    res.status(200).send({ message: 'Account created' });
});
exports.register = register;
const resendConfirmEmail = (req, res, 
// eslint-disable-next-line no-unused-vars
next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield getUserDataFromReq(req);
    const user = yield User_1.default.findOne({ _id: userData.id });
    console.log(user);
    // Generate token with user data
    const token = user === null || user === void 0 ? void 0 : user.generateVerificationToken();
    // const token = jwt.sign({ email: userData.email, id: userData._id }, jwtSecret, {
    // 	expiresIn: "10m",
    //   });
    // const verificationToken = newUser.token();
    // Email the user a unique verification link
    if (user) {
        const link = `https://copydeck.grayshapes.co/verify-identity/${userData.id}/${token}`;
        yield (0, mailer_1.default)(user.email, 'Confirm Account', link, user.firstName, 'signup-confirm');
        res.status(200).send({ message: 'Verfication email sent' });
    }
});
exports.resendConfirmEmail = resendConfirmEmail;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user)
        return next(CreateError_1.default.badRequest('Email or password is incorrect'));
    // if (!user.isActive) return next(CreateError.badRequest("Account hasn\'t been verified"));
    if (user.isBanned)
        return next(CreateError_1.default.unauthorized('User has been banned'));
    const isMatch = yield bcryptjs_1.default.compare(req.body.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isMatch)
        return next(CreateError_1.default.badRequest('Wrong password or email'));
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
});
exports.login = login;
const getUserDetails = (req, res
// next: NextFunction
) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
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
});
exports.getUserDetails = getUserDetails;
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user)
        return next(CreateError_1.default.badRequest('User not found!'));
    const token = jsonwebtoken_1.default.sign({ email: user.email, id: user._id }, jwtSecret, {
        expiresIn: '5m',
    });
    const link = `https://copydeck.grayshapes.co/reset-password/${user._id}/${token}`;
    const { email } = req.body;
    yield (0, mailer_1.default)(email, 'Password Reset', link, '', 'reset-password');
    res.status(200).send({
        message: 'Password reset link sent',
    });
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.params;
    const user = yield User_1.default.findOne({ _id: id });
    if (!user)
        return next(CreateError_1.default.badRequest('User not found!'));
    let payload = null;
    try {
        // eslint-disable-next-line no-unused-vars
        payload = jsonwebtoken_1.default.verify(token, jwtSecret);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(`Invalid token`);
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
        return next(CreateError_1.default.badRequest('User not found!'));
    let payload = null;
    try {
        // eslint-disable-next-line no-unused-vars
        payload = jsonwebtoken_1.default.verify(token, jwtSecret);
        try {
            const isMatchPassword = yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (isMatchPassword)
                return next(CreateError_1.default.badRequest('New password cannot be similar as previous password'));
            // const verify = jwt.verify(token, jwtSecret);
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
            yield (0, mailer_1.default)(email, 'Password Reset Done', content, '', 'reset-done');
            res.status(200).send({ message: 'Password reset done.' });
        }
        catch (err) {
            console.log(err);
            next(err);
            //   res.json({ status: "Something Went Wrong" });
        }
    }
    catch (err) {
        return next(CreateError_1.default.internal(`Link token expired, get a new link`));
    }
});
exports.resetPasswordPost = resetPasswordPost;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield getUserDataFromReq(req);
    const { newPassword } = req.body;
    const user = yield User_1.default.findOne({ _id: userData.id });
    // if (!user) return next(CreateError.badRequest("User not found!"));
    const isMatchPassword = yield bcryptjs_1.default.compare(newPassword, user.password);
    if (isMatchPassword)
        return next(CreateError_1.default.badRequest("Try a password you've not used before."));
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
    yield (0, mailer_1.default)(user === null || user === void 0 ? void 0 : user.email, 'Password has been changed', content, '', 'reset-done');
    res.status(200).send({
        message: 'Password updated.',
    });
});
exports.changePassword = changePassword;
const verifyEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.params;
    if (!token) {
        return res.status(422).send({
            message: 'Missing token',
        });
    }
    // Verify the token from the URL
    let payload = null;
    try {
        // eslint-disable-next-line no-unused-vars
        payload = jsonwebtoken_1.default.verify(token, jwtSecret);
    }
    catch (err) {
        return next(CreateError_1.default.internal(`Invalid token: ${err}`));
    }
    const user = yield User_1.default.findOne({ _id: id });
    if (!user)
        return next(CreateError_1.default.badRequest('User not found!'));
    user.isActive = true;
    yield user.save();
    return res.status(200).send({
        message: 'Account Verified',
    });
});
exports.verifyEmail = verifyEmail;
// export const googlePassport = async (): Promise<void> => {
//   passport.authenticate('google', { scope: ['profile', 'email'] });
// };
// export const googlePassportCallback = async () => {
//   // eslint-disable-next-line no-unused-expressions
//   passport.authenticate('google', {
//     successRedirect: clientUrl,
//     failureRedirect: `/login`,
//     // eslint-disable-next-line no-sequences
//   }),
//     (req: Request, res: Response) => {
//       const token = passportSession(req.user);
//       res.cookie('token', token);
//       res.redirect(`/`);
//     };
// };
//# sourceMappingURL=auth.js.map