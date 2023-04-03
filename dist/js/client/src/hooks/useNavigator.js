"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
function useNavigator() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { search } = (0, react_router_dom_1.useParams)();
    return (url, replace = false, preserveQs = false) => {
        const targetUrl = preserveQs ? url + search : url;
        navigate(targetUrl, { replace });
        window.scrollTo({ behavior: 'smooth', top: 0 });
    };
}
exports.default = useNavigator;
