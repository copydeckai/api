"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
require("./config/passport");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const openai_1 = __importDefault(require("./routes/openai"));
const auth_1 = __importDefault(require("./routes/auth"));
const writing_1 = __importDefault(require("./routes/writing"));
const users_1 = __importDefault(require("./routes/users"));
const errorHandler_1 = __importDefault(require("./error/errorHandler"));
const app = (0, express_1.default)();
dotenv_1.default.config();
mongoose_1.default.set('strictQuery', false);
// const PORT: string | number = process.env.PORT || 8800;
const MONGO_URL = process.env.MONGO;
const JWT_TOKEN = process.env.JWT;
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(`${MONGO_URL}`);
    console.log('Connected to mongoDB.');
});
// middlewares
app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ['https://copydeck.grayshapes.co', 'http://localhost:3001'],
}));
app.use((0, express_session_1.default)({ secret: JWT_TOKEN, resave: false, saveUninitialized: false }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get('/status', (req, res) => {
    res.json('We up! 🚀');
});
app.use('/writing', openai_1.default);
app.use('/story', writing_1.default);
app.use('/auth', auth_1.default);
app.use('/users', users_1.default);
app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});
app.use(errorHandler_1.default);
app.listen(process.env.PORT || 8800, () => {
    connect();
    console.log('Connected to backend.');
});
//# sourceMappingURL=app.js.map