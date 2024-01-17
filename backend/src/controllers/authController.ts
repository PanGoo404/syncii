import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import User from '../models/User.js';
import attachToken from '../utils/attachToken.js';

export const login = async (req: Req, res: Res, next: Next) => {
  const { login, password } = req.body;
  try {
    const user = await User.findOne({ login });
    if (!user) return res.status(404).send('Wrong credentials');

    if (!user.checkPasswd(password))
      return res.status(401).send('Wrong credentials');

    attachToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      login: user.login,
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
