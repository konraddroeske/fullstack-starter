import { Request, Response, NextFunction } from 'express';
import prisma from '../db';

const asyncHandler = (fn: Function) => (
  req: Request,
  res: Response,
  next: NextFunction,
) =>
  Promise.resolve(fn(req, res, next))
    .catch(next)
    .finally(async () => {
      await prisma.$disconnect();
    });

export default asyncHandler;
