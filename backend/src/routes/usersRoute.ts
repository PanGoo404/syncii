import { Router } from 'express';
import {
  // # - admin only
  // $ - self (/w admin) only
  register, // POST /api/users
  getUsers, // GET /api/users #
  getUser, // GET /api/users/:id $
  updateUser, // PUT /api/users/:id $
  deleteUser, // DELETE /api/users/:id $
  deleteUsers, // DELETE /api/users #
} from '../controllers/usersController.js';
import { adminOnly, userOnly, selfOnly } from '../middleware/protectMid.js';

const router = Router();

router.post('/', register);

router.get('/:id', userOnly, selfOnly, getUser); // $
router.get('/', userOnly, adminOnly, getUsers); // #

router.put('/:id', userOnly, selfOnly, updateUser); // $

router.delete('/:id', userOnly, selfOnly, deleteUser); // $
router.delete('/', userOnly, adminOnly, deleteUsers); // #

export default router;
