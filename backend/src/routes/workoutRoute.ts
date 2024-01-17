import { Router } from 'express';
import {
  // # - admin only
  // $ - self (and admin) only
  createWorkout, // POST /api/workouts $
  getAllWorkouts, // GET /api/workouts/all #
  getWorkouts, // GET /api/workouts $
  getUserWorkouts, // GET /api/workouts/user/:id #
  getWorkout, // GET /api/workouts/:id
  deleteAllWorkouts, // DELETE /api/workouts/all #
  deleteWorkouts, // DELETE /api/workouts $
  deleteWorkout, // DELETE /api/workouts/:id $
} from '../controllers/workoutController.js';
import { userOnly, ownedOnly, adminOnly } from '../middleware/protectMid.js';
import Workout from '../models/Workout.js';

const router = Router();

router.post('/', userOnly, createWorkout); // $

router.get('/user/:id', userOnly, adminOnly, getUserWorkouts); // #
router.get('/all', userOnly, adminOnly, getAllWorkouts); // $
router.get('/:id', userOnly, ownedOnly(Workout), getWorkout); // $
router.get('/', userOnly, getWorkouts); // $

router.delete('/all', userOnly, adminOnly, deleteAllWorkouts); // #')
router.delete('/:id', userOnly, ownedOnly(Workout), deleteWorkout); // $
router.delete('/', userOnly, deleteWorkouts); // $

export default router;
