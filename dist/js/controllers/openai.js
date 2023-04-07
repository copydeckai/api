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
exports.embedding = exports.edit = exports.completion = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const openai_1 = require("openai");
const error_1 = __importDefault(require("../utils/error"));
dotenv_1.default.config();
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API,
});
const openai = new openai_1.OpenAIApi(configuration);
const completion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.method !== 'POST')
            return next((0, error_1.default)(405, 'Only POST requests allowed'));
        const body = req.body;
        const request = yield openai.createCompletion(body);
        res.status(200).json(request.data);
    }
    catch (err) {
        next(err);
    }
});
exports.completion = completion;
const edit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.method !== 'POST')
            return next((0, error_1.default)(405, 'Only POST requests allowed'));
        const body = req.body;
        const request = yield openai.createEdit(body);
        res.status(200).json(request.data);
    }
    catch (err) {
        next(err);
    }
});
exports.edit = edit;
const embedding = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.method !== 'POST')
            return next((0, error_1.default)(405, 'Only POST requests allowed'));
        const body = req.body;
        const request = yield openai.createEmbedding(body);
        res.status(200).json(request.data);
    }
    catch (err) {
        next(err);
    }
});
exports.embedding = embedding;
//# sourceMappingURL=openai.js.map