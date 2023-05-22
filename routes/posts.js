import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  deletepost,
  editPost,
  getPostsilike,
  getSavePosts,
  savePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:userId/posts-ilike", verifyToken, getPostsilike);
router.get("/:userId/posts-saved", verifyToken, getSavePosts);
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/save", verifyToken, savePost);
router.patch("/:id/edit", verifyToken, editPost);

/* DELETE */
router.delete("/:id/delete-post", verifyToken, deletepost);

export default router;
