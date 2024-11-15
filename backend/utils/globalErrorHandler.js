// globalErrorHandler.js
export const globalErrorHandler = (err, req, res, next) => {
  // Use error's statusCode, or default to 500 for server errors
  const statusCode = err.statusCode || 500;

  // Use error's message, or default to a generic server error message
  const message = err.message || "Internal Server Error";

  // Respond with JSON containing error details
  res.status(statusCode).json({
    success: false,
    message,
  });
};
