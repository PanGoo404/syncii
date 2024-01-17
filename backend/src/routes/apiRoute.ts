import { Router } from 'express';
import usersRouter from './usersRoute.js';
import authRouter from './authRoute.js';
import workoutRouter from './workoutRoute.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/workout', workoutRouter);

export default router;
