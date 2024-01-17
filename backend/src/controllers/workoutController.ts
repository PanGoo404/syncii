import { Schema } from 'mongoose';
import Workout from '../models/Workout.js';
import User from '../models/User.js';
import { Request as Req, Response as Res, NextFunction as Next } from 'express';

export const createWorkout = async (req: Req, res: Res, next: Next) => {
  try {
    const { title, description, sets, reps, rest, rapsInSecs } = req.body;
    const workout = await Workout.create({
      title,
      description,
      sets,
      reps,
      rest,
      rapsInSecs,
    });
    await User.findByIdAndUpdate(req.user._id, {
      $push: { workouts: workout._id },
    });
    res.status(201).json({ workout });
  } catch (error) {
    next(error);
  }
};

export const getWorkouts = async (req: Req, res: Res, next: Next) => {
  const user = req.user;
  try {
    const workouts = await Workout.find({ _id: { $in: user.workouts } });
    res.status(200).json({ workouts });
  } catch (error) {
    next(error);
  }
};

export const getWorkoutById = async (req: Req, res: Res, next: Next) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findById(id);
    res.status(200).json({ workout });
  } catch (error) {
    next(error);
  }
};

export const getUserWorkouts = async (req: Req, res: Res, next: Next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }
    const workouts = await Workout.find({ _id: { $in: user.workouts } });
    res.status(200).json({ workouts });
  } catch (error) {
    next(error);
  }
};
