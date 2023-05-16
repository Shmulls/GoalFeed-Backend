/* eslint-disable import/extensions */
import express from "express";
import { createPost } from "../controllers/post_controller.js";

const homeRoute = express.Router();

// remember to pass the user id when post new post
homeRoute.post("/", async (req, res) => {
  const { userid , content } = req.body;
  const result = await createPost({ userid, content });
  return res.status(result.status || 500).json(result);
});


// homeRoute.get("/", async (req, res) => {
//   const { username, email, password, dateOfBirth, gender } = req.body;
//   const result = await createAuth({
//     username,
//     email,
//     password,
//     dateOfBirth,
//     gender,
//   });
//   return res.status(result.status || 500).json(result);
// });

export default homeRoute;