"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-extraneous-dependencies */
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const rand_token_1 = __importDefault(require("rand-token"));
dotenv_1.default.config();
const UserSchema = new mongoose_1.Schema({
    username: {
        required: false,
        default() {
            return rand_token_1.default.generate(8);
        },
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
    },
    phone: {
        type: String,
    },
    aiUsage: {
        tokensUsed: { type: Number },
        credits: { type: Number, default: 0, required: true },
        planType: { type: String, required: true },
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
// eslint-disable-next-line func-names
UserSchema.methods.generateVerificationToken = function () {
    const user = this;
    const verificationToken = jsonwebtoken_1.default.sign({ ID: user._id }, process.env.JWT, { expiresIn: '7d' });
    return verificationToken;
};
exports.default = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=User.js.map