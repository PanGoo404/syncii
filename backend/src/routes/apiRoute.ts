import { Router } from 'express';
import usersRouter from './usersRoute.js';
import authRouter from './authRoute.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);

export default router;
