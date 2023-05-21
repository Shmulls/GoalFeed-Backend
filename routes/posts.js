import express from 'express';
import { getFeedPosts, getUserPosts, likePost, deletepost } from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

/* UPDATE */
router.patch('/:id/like', verifyToken, likePost);

/* DELETE */
router.get('/:userId/posts/delete-post', verifyToken, deletepost);

export default router;
