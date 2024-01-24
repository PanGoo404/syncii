import express from 'express';
import {
  // # - admin only
  // $ - self (/w admin) only
  // @ - user only
  // - open
  createWorkout, // POST /api/workouts @
  getWorkouts, // GET /api/workouts @
  getWorkoutById, // GET /api/workouts/:id
  getUserWorkouts,
  deleteWorkout, // GET /api/users/:id/workouts $
} from '../controllers/workoutController.js';
import { userOnly, selfOnly } from '../middleware/protectMid.js';

const router = express.Router();

router.post('/', userOnly, createWorkout); //
router.get('/', userOnly, getWorkouts); //
router.get('/:id', getWorkoutById); //
router.get('/user/:id', userOnly, selfOnly, getUserWorkouts); //

router.delete('/:id', userOnly, selfOnly, deleteWorkout); //

export default router;
