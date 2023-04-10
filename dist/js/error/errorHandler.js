"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateError_1 = __importDefault(require("./CreateError"));
function errorHandler(err, req, res, next) {
    console.error(err);
    if (err instanceof CreateError_1.default) {
        res.status(err.code).json({ message: err.message });
        return;
    }
    res.status(500).json({ message: 'Something went wrong' });
    next({});
}
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map