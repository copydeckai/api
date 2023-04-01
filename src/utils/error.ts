
interface Error {
	status?: number;
	message?: string;
  }

export const createError = (status: number, message: string) => {
  const err: Error = new Error();
  err.status = status;
  err.message = message;
  return err;
};
