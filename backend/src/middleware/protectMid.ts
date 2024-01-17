import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import User from '../models/User.js';
import Workout from '../models/Workout.js';
import jwt from 'jsonwebtoken';
import { JWT_SEC } from '../config.js';

export const userOnly = async (req: Req, res: Res, next: Next) => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401);
    return next(new Error('Not authorized, no token'));
  }
  try {
    const decoded = jwt.verify(token, JWT_SEC) as jwt.JwtPayload;
    req.user = await User.findById(decoded.id).select('-password');
    return next();
  } catch (error) {
    res.status(401);
    return next(new Error('Not authorized, token failed'));
  }
};

// # - admin only
// usage: router.get([endpoint], userOnly, adminOnly, [controllers]);
export const adminOnly = (req: Req, res: Res, next: Next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(401);
  return next(new Error('Not authorized as an admin'));
};

// $ - self (and admin) only
// usage: router.get([endpoint], userOnly, selfOnly(), [controllers]);
export const selfOnly = (req: Req, res: Res, next: Next) => {
  if (
    req.user &&
    (req.user.isAdmin || req.user._id.toString() === req.params.id)
  )
    next();
  else {
    res.status(401);
    return next(new Error('Not authorized to access this route'));
  }
};

export const ownedOnly = (model: any) => {
  return async (req: Req, res: Res, next: Next) => {
    if (req.user && req.user.isAdmin) {
      return next();
    }
    const workout = await model.findById(req.params.id);
    if (workout && workout.user.toString() === req.user._id.toString()) {
      return next();
    }
    res.status(401);
    return next(new Error('Not authorized to access this route'));
  };
};
