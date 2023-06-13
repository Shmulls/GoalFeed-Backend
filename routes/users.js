import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  editUser,
  getfullname,
  getstaticdata,
  deleteUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/assets");
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const router = express.Router();
/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:id/getfullname", getfullname);
router.get("/:id/getstaticdata", getstaticdata);
/* UPDATE */
router.patch("/:id/change", verifyToken, upload.single("picture"), editUser);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

/* UPDATE */
router.delete("/:id/delete", verifyToken, deleteUser);

export default router;
