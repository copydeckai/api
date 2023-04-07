import { Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { IUser } from '../types/user';
import User from '../models/User';

dotenv.config();
const jwtSecret = process.env.JWT as string;

function getUserDataFromReq(req: Request) {
  return new Promise((resolve) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        throw err;
      }
      resolve(userData);
    });
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

export const updateUser = async (
  req: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  const userData: any = await getUserDataFromReq(req);
  try {
    const filter = { _id: userData.id };
    const updateDoc = { $set: req.body };
    const options = { upsert: true };
    await User.updateOne(filter, updateDoc, options);
    res.status(200).json(req.body);
  } catch (err) {
    // next(createError(500, 'Server error occured'));
    throw res.status(500).json({ message: 'Server error occured' });
    // next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedUser: IUser | null = await User.findByIdAndDelete(
      req.params.id
    );
    const allUsers: IUser[] = await User.find();
    res.status(200).json({
      message: 'User has been deleted',
      todo: deletedUser,
      todos: allUsers,
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user: IUser | null = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
