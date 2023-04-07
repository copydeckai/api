// import { Document } from 'mongoose';

interface DocumentResult<T> {
  _doc: T;
}

export interface IUser extends DocumentResult<IUser> {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  phone: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;
  isBanned: boolean;
  generateVerificationToken: () => void;
}
