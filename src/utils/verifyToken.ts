/* eslint-disable no-unused-vars */
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import { IUser } from "../types/user";
import { IGetUserAuthInfoRequest } from '../types/authRequest';
import createError from './error';

// declare module 'express-serve-static-core' {
//   interface Response {
//     error: (status: number, message: string) => Response;
//     success: (status: number, message: string, result: any) => Response;
//   }
// }

export const verifyToken = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
  func: any
) => {
  const { token } = req.cookies;
  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }

  jwt.verify(token, process.env.JWT as string, (err: any, user: any) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.user = user;
    next();
  });
};

export const verifyUser = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(401, 'Unauthorized!'));
    }
  });
};

export const verifyAdmin = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(401, 'Unauthorized!'));
    }
  });
};

export const passportSession = (user: any) => {
  const token = jwt.sign(user, process.env.JWT as string, {
    expiresIn: '7d',
  });
  return token;
};
