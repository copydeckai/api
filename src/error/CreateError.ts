class CreateError extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }

  static badRequest(msg: string): CreateError {
    return new CreateError(400, msg);
  }

  static unauthorized(msg: string): CreateError {
    return new CreateError(401, msg);
  }

  static internal(msg: string): CreateError {
    return new CreateError(500, msg);
  }
}

export default CreateError;
