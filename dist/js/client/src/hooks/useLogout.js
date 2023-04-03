"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLogout = void 0;
const authContext_1 = require("../contexts/authContext");
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
const useLogout = () => {
    const { dispatch } = (0, authContext_1.useAuth)();
    const logout = () => {
        sessionStorage.clear();
        localStorage.clear();
        // window.location.href = "/login";
        dispatch({ type: 'logout' });
    };
    return { logout };
};
exports.useLogout = useLogout;
