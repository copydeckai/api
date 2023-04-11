// import { Document } from 'mongoose';

interface DocumentResult<T> {
  _doc: T;
}

export interface IInvoice extends DocumentResult<IInvoice> {
  invoiceId: string;
  planType: string;
  amount: number;
  status: string;
  isPublic: boolean;
  isDeleted: boolean;
}
