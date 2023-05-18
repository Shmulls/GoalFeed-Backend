/* eslint-disable import/extensions */
import express from "express";
import { createPost,getallposts } from "../controllers/post_controller.js";

const homeRoute = express.Router();

// remember to pass the user id when post new post
homeRoute.post("/", async (req, res) => {
  const { userid, content } = req.body;
  const result = await createPost({ userid, content });
  return res.status(result.status || 500).json(result);
});

homeRoute.get("/", async (req, res) => {
  const posts = await getallposts();
  if (!posts.message) {
    return res.status(400).json({ message: 'No posts found' })
}
  return res.json(posts.message);
});

export default homeRoute;
