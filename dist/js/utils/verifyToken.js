"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyUser = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
const verifyToken = (req, res, next, func) => {
    const token = req.cookies.token;
    if (!token) {
        return next((0, error_1.createError)(401, "You are not authenticated!"));
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT, (err, user) => {
        if (err)
            return next((0, error_1.createError)(403, "Token is not valid!"));
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
            return next((0, error_1.createError)(401, "Unauthorized!"));
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
            return next((0, error_1.createError)(401, "Unauthorized!"));
        }
    });
};
exports.verifyAdmin = verifyAdmin;
