import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import User from '../models/User.js';
import attachToken from '../utils/attachToken.js';

export const login = async (req: Req, res: Res, next: Next) => {
  const { login, password } = req.body as { login: string; password: string };
  try {
    const user = await User.findOne({ login });
    if (!user) {
      res.status(400);
      return next(new Error('Wrong credentials'));
    }

    if (!user.checkPassword(password)) {
      res.status(400);
      return next(new Error('Wrong credentials'));
    }

    attachToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      login: user.login,
      name: user.name,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Req, res: Res, next: Next) => {
  try {
    res.clearCookie('token');
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
