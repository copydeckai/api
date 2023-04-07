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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const sendEmail = (email, subject, contentLink, name, template) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.HOST,
            service: process.env.MAIL_SERVICE,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.LOGIN,
            },
        });
        // verify connection configuration
        transporter.verify((error, success) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(`Server is ready to take messages: ${success}`);
            }
        });
        const handlebarOptions = {
            viewEngine: {
                extName: '.hbs',
                partialsDir: path_1.default.resolve(__dirname, 'emails'),
                defaultLayout: template,
            },
            viewPath: path_1.default.resolve(__dirname, 'emails'),
            extName: '.hbs',
        };
        transporter.use('compile', (0, nodemailer_express_handlebars_1.default)(handlebarOptions));
        const mailOptions = {
            from: `Copydeck Inc. <${process.env.EMAIL}>`,
            to: email,
            subject,
            template,
            context: {
                email,
                name,
                link: contentLink,
            },
        };
        yield transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(`Unable to send email: ${error}`);
            }
            else {
                console.log(`Email sent: ${info.response}`);
            }
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.sendEmail = sendEmail;
exports.default = exports.sendEmail;
//# sourceMappingURL=mailer.js.map