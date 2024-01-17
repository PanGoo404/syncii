import { Response } from 'express';
import Workout, { WorkoutI } from '../models/Workout.js';
import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import User, { UserI } from '../models/User.js';

export const createWorkout = async (req: Req, res: Res, next: Next) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400);
      next(new Error('Name is required'));
    }
    const alreadyThere = await Workout.find({ name });
    if (alreadyThere) {
      res.status(400);
      next(new Error('Workout already exists'));
    }
    const workout = await Workout.create({ name });
    const user = await User.findById(req.user._id);
    await user.workouts.push(workout._id.toString());
    res.status(201).json(workout);
  } catch (error) {
    next(error);
  }
};

export const getAllWorkouts = async (req: Req, res: Res, next: Next) => {
  try {
    const workouts = await Workout.find({});
    res.status(200).json(workouts);
  } catch (error) {
    next(error);
  }
};

export const getWorkouts = async (req: Req, res: Res, next: Next) => {
  try {
    const user = await User.findById(req.user._id).populate('workouts');
    res.status(200).json(user.workouts);
  } catch (error) {
    next(error);
  }
};

export const getWorkout = async (req: Req, res: Res, next: Next) => {
  try {
    const workout = await Workout.findById(req.params.id);
    res.status(200).json(workout);
  } catch (error) {
    next(error);
  }
};

export const deleteAllWorkouts = async (req: Req, res: Res, next: Next) => {
  try {
    await Workout.deleteMany({});
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteWorkouts = async (req: Req, res: Res, next: Next) => {
  try {
    const user = await User.findById(req.user._id);
    await Workout.deleteMany({ _id: { $in: user.workouts } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteWorkout = async (req: Req, res: Res, next: Next) => {
  try {
    await Workout.findOneAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const getUserWorkouts = async (req: Req, res: Res, next: Next) => {
  try {
    const user = await User.findById(req.params.id).populate('workouts');
    res.status(200).json(user.workouts);
  } catch (error) {
    next(error);
  }
};
