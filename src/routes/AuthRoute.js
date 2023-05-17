/* eslint-disable import/extensions */
import express from "express";
import { checkAuth, createAuth } from "../controllers/Auth_controller.js";
import "../index.js";


const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await checkAuth({ email, password });
  if ( result.status == 400 ){
    const justtry = currentuserid ;
    console.log(justtry);
  }
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
