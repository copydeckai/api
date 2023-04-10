"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
    static badRequest(msg) {
        return new ApiError(400, msg);
    }
    static internal(msg) {
        return new ApiError(500, msg);
    }
}
exports.default = ApiError;
//# sourceMappingURL=Error.js.map