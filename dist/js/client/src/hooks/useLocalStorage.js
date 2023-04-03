"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = (0, react_1.useState)(() => {
        let result;
        try {
            const item = window.localStorage.getItem(key);
            result = item ? JSON.parse(item) : initialValue;
        }
        catch (_a) {
            result = initialValue;
        }
        return result;
    });
    const setValue = (value) => {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        try {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        catch (_a) {
            console.warn(`Could not save ${key} to localStorage`);
        }
    };
    return [storedValue, setValue];
}
exports.default = useLocalStorage;
