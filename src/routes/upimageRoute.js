// https://github.com/akashyap2013/ImageToBase64/tree/master
/* eslint-disable import/extensions */
import express from "express";
import { uploadimage } from "../controllers/image_controller.js";

const upimageRoute = express.Router();

// remember to pass the user id 
upimageRoute.patch("/", async (req, res) => {
  const { userid, image64 } = req.body;
  const result = await uploadimage({ userid, image64 });
  return res.status(result.status || 500).json(result);
});

export default upimageRoute;
