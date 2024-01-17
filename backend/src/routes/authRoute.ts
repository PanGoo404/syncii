import { Router } from 'express';
import {
  login, // POST /api/auth
  logout, // DELETE /api/auth
} from '../controllers/authController.js';

const router = Router();

router.post('/', login); // ok
router.delete('/', logout); // ok
router.get('/', logout); // ok

export default router;
