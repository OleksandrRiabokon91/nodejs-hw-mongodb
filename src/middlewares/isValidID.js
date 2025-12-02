import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export async function isValidID(req, res, next) {
  if (isValidObjectId(req.params.id) !== true) {
    throw createHttpError(400, 'ID is not valid');
  }
  return next();
}
