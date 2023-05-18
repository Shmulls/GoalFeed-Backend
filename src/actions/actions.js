// All user actions on the database.

import mongoose from "mongoose";
import "../models/userdata.js";
import "../models/posts.js";

const User = mongoose.model("user");
// export const getUser = async (req) => {};
const Posts = mongoose.model("posts");

export const createUser = async (req) => {
  const findUser = await User.findOne({ username: req.username });
  if (findUser) {
    return { success: false };
  }
  // create is a bulid in func
  const user = await User.create(req);
  return { success: true, user };
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

export const createpost = async (req) => {
  const { userid, content } = req;
  const user = await User.findOne({ _id: userid });
  if (!user) {
    return { success: false };
  }
  const postcreted = await Posts.create({ userid, content });
  return { success: true, postcreted };
};

export const getusernamebyid = async (req) => {
  const nameofuser = await User.findById(req);
  return nameofuser.username;
};

export const getallpostsaction = async () => {
  const posts = await Posts.find().lean();
  const postswithname = await Promise.all(posts.map(async (post) => {
    const username = await getusernamebyid(post.userid);
    return { ...post, username };
  }));
  if (!posts) {
    return { success: false };
  }
  return { success: true, postswithname };
};
