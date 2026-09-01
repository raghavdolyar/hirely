import { Router } from 'express';

import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} from '../controllers/auth.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/get-me', authUser, getMe);

export default router;
