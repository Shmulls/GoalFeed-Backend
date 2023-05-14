/* eslint-disable import/extensions */
import express from "express";
import { checkAuth } from "../controllers/Auth_controller.js";

const authRouter = express.Router();

authRouter.post("/auth", async (req, res) => {
  const requestObject = req.body;
  const result = await checkAuth(requestObject);
  return res.status(result.status).json(result.json);
});

export default authRouter;
