/* eslint-disable no-unused-vars */
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import { IUser } from "../types/user";
import { IGetUserAuthInfoRequest } from '../types/authRequest';
import CreateError from '../error/CreateError';

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
    return next(CreateError.badRequest('You are not authenticated!'));
  }

  jwt.verify(token, process.env.JWT as string, (err: any, user: any) => {
    if (err) return next(CreateError.badRequest('Token is not valid!'));
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
      return next(CreateError.unauthorized('Unauthorized!'));
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
      return next(CreateError.unauthorized('Unauthorized!'));
    }
  });
};

export const passportSession = (user: any) => {
  const { password, isAdmin, isActive, ...otherDetails } = user._doc;
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin, isActive: user.isActive },
    process.env.JWT as string,
    {
      expiresIn: '7d',
    }
  );
  return token;
};
