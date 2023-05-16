// All user actions on the database.

import mongoose from "mongoose";
import "../models/userdata.js";

const User = mongoose.model("user");
// export const getUser = async (req) => {};

export const createUser = async (req) => {
  const findUser = await User.findOne({ username: req.username });
  if (findUser) {
    return { success: false };
  }
  //create is a bulid in func
  const user = await User.create(req);
  return user;
};

export const checkUser = async (req) => {
  const user = await User.findOne({
    email: req.email,
    password: req.password,
  });
  console.log(user);
  if (!user) {
    return { success: false };
  }

  return { success: true, user };
};
