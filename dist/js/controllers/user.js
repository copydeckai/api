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
exports.getUsers = exports.getUser = exports.deleteUser = exports.updateUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const jwtSecret = process.env.JWT;
function getUserDataFromReq(req) {
    return new Promise((resolve, _reject) => {
        jsonwebtoken_1.default.verify(req.cookies.token, jwtSecret, {}, (err, userData) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                throw err;
            }
            resolve(userData);
        }));
    });
}
// export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
//   try {
//     const updatedUser: IUser[] | null = await User.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     next(err);
//   }
// }
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield getUserDataFromReq(req);
    try {
        const filter = { _id: userData.id };
        const updateDoc = { $set: req.body };
        const options = { upsert: true };
        yield User_1.default.updateOne(filter, updateDoc, options);
        res.status(200).json(req.body);
    }
    catch (err) {
        // next(createError(500, 'Server error occured'));
        throw res.status(500).json({ message: 'Server error occured' });
        next(err);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield User_1.default.findByIdAndDelete(req.params.id);
        const allUsers = yield User_1.default.find();
        res.status(200).json({
            message: 'User has been deleted',
            todo: deletedUser,
            todos: allUsers,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUser = deleteUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
});
exports.getUser = getUser;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.status(200).json(users);
    }
    catch (err) {
        next(err);
    }
});
exports.getUsers = getUsers;
