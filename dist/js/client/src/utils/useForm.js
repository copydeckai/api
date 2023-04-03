"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useForm = () => {
    const [values, setValues] = (0, react_1.useState)({});
    const handleChange = event => {
        event.persist();
        setValues(values => (Object.assign(Object.assign({}, values), { [event.target.name]: event.target.value })));
    };
    return {
        handleChange,
        values
    };
};
exports.default = useForm;
