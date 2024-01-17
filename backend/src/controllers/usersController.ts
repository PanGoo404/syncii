import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import User from '../models/User.js';

export const register = async (req: Req, res: Res, next: Next) => {
  const { name, login, password } = req.body;
  try {
    const canCreate = await User.findOne({ login });
    if (canCreate) {
      res.status(409);
      return next(new Error('User already exists'));
    }
    // make first user admin
    const isAdmin = (await User.countDocuments({})) === 0;
    const user = await User.create({ name, login, password, isAdmin });
    res.status(201).json({
      _id: user._id,
      login: user.login,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: Req, res: Res, next: Next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Req, res: Res, next: Next) => {
  if (!req.params?.id) {
    res.status(400);
    return next(new Error('User id is required'));
  }
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Req, res: Res, next: Next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }
    user.login = req.body.login || user.login;
    user.password = req.body.password || user.password;
    await user.save();
    res.json({
      _id: user._id,
      login: user.login,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUsers = async (req: Req, res: Res, next: Next) => {
  try {
    await User.deleteMany();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Req, res: Res, next: Next) => {
  try {
    const user = await User.findOneAndDelete(req.params.id);
    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
