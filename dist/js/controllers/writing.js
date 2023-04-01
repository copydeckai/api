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
exports.getStory = exports.deleteStory = exports.updateStory = exports.storeWriting = exports.fetchAuthorStories = exports.fetchStory = void 0;
const Writing_1 = __importDefault(require("../models/Writing"));
// import sendEmail from "../utils/mailer";
// import bcrypt from "bcryptjs";
const dotenv_1 = __importDefault(require("dotenv"));
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
const fetchStory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.params, { url } = _a, others = __rest(_a, ["url"]);
    try {
        const data = yield Writing_1.default.find(Object.assign({ urlString: url, isPublic: true, isDeleted: false }, others));
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
});
exports.fetchStory = fetchStory;
const fetchAuthorStories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield getUserDataFromReq(req);
    const _b = req.query, { query } = _b, others = __rest(_b, ["query"]);
    try {
        const regexPattern = new RegExp(query, "i");
        const results = yield Writing_1.default.find(Object.assign({ title: { $regex: regexPattern }, isDeleted: false, authorId: userData.id }, others)).sort({ updatedAt: -1 }).limit(req.query.limit);
        res.status(200).json(results);
    }
    catch (err) {
        next(err);
    }
});
exports.fetchAuthorStories = fetchAuthorStories;
const storeWriting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //   const { title, content, wordCount, charCount } = req.body;
    try {
        const newWriting = new Writing_1.default(Object.assign({}, req.body));
        yield newWriting.save();
        res.status(200).send("Created new writing");
    }
    catch (err) {
        next(err);
    }
});
exports.storeWriting = storeWriting;
const updateStory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedStory = yield Writing_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedStory);
    }
    catch (err) {
        next(err);
    }
});
exports.updateStory = updateStory;
const deleteStory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Writing_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("Story has been deleted.");
    }
    catch (err) {
        next(err);
    }
});
exports.deleteStory = deleteStory;
const getStory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield getUserDataFromReq(req);
    const { url } = req.params;
    try {
        const story = yield Writing_1.default.find({ authorId: userData.id, urlString: url });
        res.status(200).json(story);
    }
    catch (err) {
        next(err);
    }
});
exports.getStory = getStory;
