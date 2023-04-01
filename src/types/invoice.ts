// import { Document } from 'mongoose';

interface DocumentResult<T> {
  _doc: T;
}

export interface IInvoice extends DocumentResult<IInvoice> {
  title: string;
  content: string;
  charCount: number;
  wordCount: number;
  urlString: string;
  status: string;
  isPublic: boolean;
  isDeleted: boolean;
}
