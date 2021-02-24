import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

const errorHandler = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(error);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

export default errorHandler;
