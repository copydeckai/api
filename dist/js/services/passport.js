"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-extraneous-dependencies */
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// import passportLocal from 'passport-local';
// import CreateError from '../error/CreateError';
const User_1 = __importDefault(require("../models/User"));
// import { IUser } from '../types/user';
// interface GoogleProfile {
//   googleId: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   avatar: string;
//   token: string;
//   aiUsage: {
//     credits: number;
//     planType: string;
//   };
// }
dotenv_1.default.config();
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const JWT = process.env.JWT;
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    const query = { email: profile.emails[0].value };
    User_1.default.findOne(query, (err, user) => {
        if (err) {
            return done(err);
        }
        if (user) {
            // User already exists, return user data
            return done(null, user);
        }
        // Create new user
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(accessToken + refreshToken, salt);
        const fullName = profile.displayName.split(' ');
        const firstName = fullName[0];
        const lastName = fullName[1];
        const newUser = new User_1.default({
            // googleId: profile.id,
            firstName,
            lastName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            token: accessToken,
            isActive: true,
            password: hash,
            aiUsage: {
                credits: 5,
                planType: 'basic',
            },
        });
        // Save user to database
        newUser.save((saveErr) => {
            if (saveErr) {
                console.log(saveErr);
                return done(saveErr);
            }
            return done(null, newUser);
        });
    });
}));
passport_1.default.use(new passport_jwt_1.default.Strategy({
    jwtFromRequest: (req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies.jwt;
        }
        return token;
    },
    secretOrKey: JWT,
}, (jwtPayload, done) => {
    if (!jwtPayload) {
        return done('No token found...');
    }
    return done(null, jwtPayload);
}));
// passport.use(new passportLocal.Strategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    User_1.default.findById(id, (err, user) => {
        done(err, user);
    });
});
//# sourceMappingURL=passport.js.map