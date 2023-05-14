/* eslint-disable import/extensions */
import express from "express";
import { createAuth } from "../controllers/Auth_controller.js";

const authRouter = express.Router();

authRouter.post("/auth", async (req, res) => {
  const { username, password } = req.body;
  const result = await createAuth({ username, password });
  return res.status(result.status || 500).json(result);
});

export default authRouter;
