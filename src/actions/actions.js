// All user actions on the database.

import mongoose from "mongoose";
import "../user-data/userdata.js";

const User = mongoose.model("user");
// export const getUser = async (req) => {};

export const createUser = async (req) => {
  const findUser = await User.findOne({ username: req.username });
  if (findUser) {
    return { success: false };
  }
  const user = await User.create(req);
  return user;
};
