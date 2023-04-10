import {
  NextFunction,
  Request,
  Response,
} from 'express';
import CreateError from './CreateError';

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(err);

  if (err instanceof CreateError) {
    res.status(err.code).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: 'Something went wrong' });
  next({});
}

export default errorHandler;
