import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  editUser,
  getfullname,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:id/getfullname", getfullname);

/* UPDATE */
router.patch("/:id/change", verifyToken, editUser);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
