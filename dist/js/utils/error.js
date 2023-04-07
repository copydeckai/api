"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createError(status, message) {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
}
exports.default = createError;
//# sourceMappingURL=error.js.map