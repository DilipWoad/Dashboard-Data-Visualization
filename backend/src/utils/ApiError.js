class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong.",
    errors = [],
    stack = "",
  ) {
    //call the Error class constructor
    super(message); // error class constructor ask for one para to initial it.

    this.statusCode = statusCode;
      this.errors = errors;
      this.message = message;
      this.data = null;
      this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export {ApiError}