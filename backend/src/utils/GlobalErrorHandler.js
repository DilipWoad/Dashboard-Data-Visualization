const GlobalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error.";

  const response = {
    success: false,
    statusCode,
    message,
    errors: err.errors || [],
    data: null,
    //show the stack trace in dev only env
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };
  //for development console.log the errorStack
  if (process.env.NODE_ENV === "development") {
    console.error(`💥 Error: ${message}`);
  }

  return res.status(statusCode).json(response);
};
