import { Request as Req, Response as Res, NextFunction as Next } from 'express';

export const error404 = (req: Req, res: Res, next: Next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorServer = (error: Error, req: Req, res: Res, next: Next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  if (error.name == 'CastError') {
    statusCode = 404;
    message = '';
  }

  return res.status(statusCode).json({
    message,
    stack: error.stack,
  });
};
