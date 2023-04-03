"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorTrackerFactory = void 0;
const types_1 = require("./types");
const ErrorTrackerFactory = (extension, permissions = []) => {
    let ENABLED = false;
    const safelyInvoke = (fn, permission) => {
        const hasPermission = permission !== undefined ? permissions.includes(permission) : true;
        if (ENABLED && hasPermission) {
            try {
                return fn();
            }
            catch (e) {
                throw new Error(`Tracking Extension Error: ${e}`);
            }
        }
    };
    const init = () => {
        if (!ENABLED) {
            ENABLED = extension.init();
        }
        return ENABLED;
    };
    const setUserData = (userData) => safelyInvoke(() => extension.setUserData(userData), types_1.TrackerPermission.USER_DATA);
    const captureException = (e) => safelyInvoke(() => extension.captureException(e));
    return {
        captureException,
        init,
        setUserData
    };
};
exports.ErrorTrackerFactory = ErrorTrackerFactory;
