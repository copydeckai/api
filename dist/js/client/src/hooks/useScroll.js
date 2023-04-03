"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useScroll = heightLimit => {
    const [isScrolled, setIsScrolled] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const checkScroll = () => {
            // eslint-disable-next-line chai-friendly/no-unused-expressions
            window.scrollY > heightLimit ? setIsScrolled(true) : setIsScrolled(false);
        };
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, [heightLimit]);
    return isScrolled;
};
exports.default = useScroll;
