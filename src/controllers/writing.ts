import { Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Writing from '../models/Writing';
// import sendEmail from "../utils/mailer";
// import bcrypt from "bcryptjs";
// import createError from '../utils/error';

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

export const fetchStory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { url, ...others } = req.params;
  try {
    const data = await Writing.find({
      urlString: url,
      isPublic: true,
      isDeleted: false,
      ...others,
    });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const fetchAuthorStories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userData: any = await getUserDataFromReq(req);
  const { search, ...others } = req.query;
  try {
    const regexPattern: any = new RegExp(search as string, 'i');
    const results = await Writing.find({
      title: { $regex: regexPattern },
      isDeleted: false,
      authorId: userData.id,
      ...others,
    }).sort({ updatedAt: -1 });
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
};

export const storeWriting = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  //   const { title, content, wordCount, charCount } = req.body;
  try {
    const newWriting = new Writing({
      ...req.body,
    });

    await newWriting.save();
    res.status(200).send({ message: 'Created new writing' });
  } catch (err) {
    next(err);
  }
};

export const updateStory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedStory = await Writing.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedStory);
  } catch (err) {
    next(err);
  }
};

export const deleteStory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await Writing.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Story has been deleted.' });
  } catch (err) {
    next(err);
  }
};

export const getStory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userData: any = await getUserDataFromReq(req);
  const { url } = req.params;
  try {
    const story = await Writing.find({ authorId: userData.id, urlString: url });
    res.status(200).json(story);
  } catch (err) {
    next(err);
  }
};
