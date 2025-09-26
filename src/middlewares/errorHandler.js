// src/middlewares/errorHandler.js
import { isHttpError } from 'http-errors';

export function errorHandler(err, req, res, next) {
  if (isHttpError(err)) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.name,
      data: err,
    });
    return;
  }
  console.error(err);

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
}
