import { Router } from 'express';
import authRouter from './authRoute.js';
import usersRouter from './usersRoute.js';
import workoutRouter from './workoutRoute.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/workouts', workoutRouter);

export default router;
