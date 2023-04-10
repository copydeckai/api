"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
    static badRequest(msg) {
        return new CreateError(400, msg);
    }
    static unauthorized(msg) {
        return new CreateError(401, msg);
    }
    static internal(msg) {
        return new CreateError(500, msg);
    }
}
exports.default = CreateError;
//# sourceMappingURL=CreateError.js.map