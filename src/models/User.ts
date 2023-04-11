import { model, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUser } from '../types/user';

dotenv.config();

const UserSchema = new Schema(
  {
    googleId: {
      required: false,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    phone: {
      type: String,
    },
    aiUsage: {
      tokensUsed: { type: Number },
      credits: { type: Number, default: 0, required: true },
      planType: { type: String, required: true },
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// eslint-disable-next-line func-names
UserSchema.methods.generateVerificationToken = function () {
  const user = this;
  const verificationToken = jwt.sign(
    { ID: user._id },
    process.env.JWT as string,
    { expiresIn: '7d' }
  );
  return verificationToken;
};

export default model<IUser>('User', UserSchema);
