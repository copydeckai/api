/* eslint-disable import/no-extraneous-dependencies */
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import JWTStrategy from 'passport-jwt';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
// import passportLocal from 'passport-local';
// import CreateError from '../error/CreateError';
import User from '../models/User';
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

dotenv.config();

const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
const JWT = process.env.JWT as string;

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken: string, refreshToken: string, profile: any, done: any) => {
      const query = { email: profile.emails[0].value };
      User.findOne(query, (err: any, user: any) => {
        if (err) {
          return done(err);
        }
        if (user) {
          // User already exists, return user data
          return done(null, user);
        }
        // Create new user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(accessToken + refreshToken, salt);
        const fullName = profile.displayName.split(' ');
        const firstName = fullName[0];
        const lastName = fullName[1];
        const newUser = new User({
          googleId: profile.id,
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
        newUser.save((saveErr: any) => {
          if (saveErr) {
            console.log(saveErr);
            return done(saveErr);
          }
          return done(null, newUser);
        });
      });
    }
  )
);

passport.use(
  new JWTStrategy.Strategy(
    {
      jwtFromRequest: (req) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies.jwt;
        }
        return token;
      },
      secretOrKey: JWT,
    },
    (jwtPayload: any, done: any) => {
      if (!jwtPayload) {
        return done('No token found...');
      }

      return done(null, jwtPayload);
    }
  )
);

// passport.use(new passportLocal.Strategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done: any) => {
  User.findById(id, (err: any, user: any) => {
    done(err, user);
  });
});
