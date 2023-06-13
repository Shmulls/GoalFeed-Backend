import express from 'express';
import {
  getactivegame,
  getactivegameiguess,
  addgame,
  makeguess,
  getendedgame,
} from '../controllers/gamecontrol.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/:userId/activegame', verifyToken, getactivegame);
router.get('/:userId/getactivegameiguess', verifyToken, getactivegameiguess);
router.get('/:userId/getendedgame', verifyToken, getendedgame);

/* UPDATE */
router.patch('/:userId/makeguess', verifyToken, makeguess);

/* MENEGERONLY */
router.post('/meneger', addgame);

export default router;
