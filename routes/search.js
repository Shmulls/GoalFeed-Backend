import express from "express";
import { searchContent } from "../controllers/search.js";
import { searchPostContent } from "../controllers/search.js";

const router = express.Router();

router.get("/", searchContent);
router.get("/content", searchPostContent);

export default router;
