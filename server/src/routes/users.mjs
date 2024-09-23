import { Router } from 'express';
import { getAllUsers, getUserByUsername } from '../controllers/usersController.mjs';

const router = Router();

router.get('/', getAllUsers);
router.get('/:username', getUserByUsername);

export default router;