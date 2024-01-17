import { Request as Req, Response as Res, NextFunction as Next } from 'express';

export const error404 = (req: Req, res: Res, next: Next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const error500 = (error: Error, req: Req, res: Res, next: Next) => {
  let code = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(code);
  let message = error.message;

  if (error.name == 'CastError') {
    // Mongo error
    code = 404;
    message = "MongoDB haven't found/casted";
  }

  return res.status(code).json({
    message,
    stack: error.stack,
  });
};
