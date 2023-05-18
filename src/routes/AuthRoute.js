/* eslint-disable import/extensions */
import express from "express";
import { checkAuth, createAuth } from "../controllers/Auth_controller.js";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await checkAuth({ email, password });
  return res.status(result.status || 500).json(result);
});

authRouter.post("/auth", async (req, res) => {
  const { username, email, password, dateOfBirth, gender } = req.body;
  const result = await createAuth({
    username,
    email,
    password,
    dateOfBirth,
    gender,
  });
  return res.status(result.status || 500).json(result);
});

export default authRouter;
