// errorHandler.js
export const errorHandler = (statusCode, message) => {
  const error = new Error(message); // Set the error message
  error.statusCode = statusCode; // Set the status code
  return error; // Return the error object
};
