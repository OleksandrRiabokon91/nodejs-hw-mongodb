// src/middlewares/errorHandler.js
import { isHttpError } from 'http-errors';

export function errorHandler(err, req, res, next) {
  if (isHttpError(err)) {
    const response = {
      status: err.statusCode,
      message: err.message || 'Error',
    };

    if (err.errors) {
      response.errors = err.errors;
    }

    res.status(err.statusCode).json(response);
    return;
  }

  console.error(err);

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    errors: [{ message: err.message }],
  });
}
