"use strict";
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
exports.passportSession = exports.verifyAdmin = exports.verifyUser = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CreateError_1 = __importDefault(require("../error/CreateError"));
// declare module 'express-serve-static-core' {
//   interface Response {
//     error: (status: number, message: string) => Response;
//     success: (status: number, message: string, result: any) => Response;
//   }
// }
const verifyToken = (req, res, next, func) => {
    const { token } = req.cookies;
    if (!token) {
        return next(CreateError_1.default.badRequest('You are not authenticated!'));
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT, (err, user) => {
        if (err)
            return next(CreateError_1.default.badRequest('Token is not valid!'));
        req.user = user;
        next();
    });
};
exports.verifyToken = verifyToken;
const verifyUser = (req, res, next) => {
    (0, exports.verifyToken)(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            return next(CreateError_1.default.unauthorized('Unauthorized!'));
        }
    });
};
exports.verifyUser = verifyUser;
const verifyAdmin = (req, res, next) => {
    (0, exports.verifyToken)(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            return next(CreateError_1.default.unauthorized('Unauthorized!'));
        }
    });
};
exports.verifyAdmin = verifyAdmin;
const passportSession = (user) => {
    const _a = user._doc, { password, isAdmin, isActive } = _a, otherDetails = __rest(_a, ["password", "isAdmin", "isActive"]);
    const token = jsonwebtoken_1.default.sign({ id: user._id, isAdmin: user.isAdmin, isActive: user.isActive }, process.env.JWT, {
        expiresIn: '7d',
    });
    return token;
};
exports.passportSession = passportSession;
//# sourceMappingURL=verifyToken.js.map