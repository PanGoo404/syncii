import { Router } from 'express';
import authRouter from './authRoute.js';
import usersRouter from './usersRoute.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);

export default router;
