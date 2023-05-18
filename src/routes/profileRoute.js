/* eslint-disable import/extensions */
import express from "express";
import { getuserdata } from "../controllers/profile_controller.js";

const profileRoute = express.Router();

profileRoute.get("/", async (req, res) => {
  const userdata = await getuserdata(req.body);
  if (!userdata.success) {
    return res.status(400).json({ message: userdata.message });
  }
  // the user want to see someone else profile
  if (req.body.userid !== req.body.lookingfor) {
    console.log({ username: userdata.message.username, usergender: userdata.message.gender });
    return res.json({ username: userdata.message.username, usergender: userdata.message.gender });
  }
  // the user want to see is own profile
  return res.json(userdata.message);
  });
  
  export default profileRoute;
