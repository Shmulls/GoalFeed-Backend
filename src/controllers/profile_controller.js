import mongoose from "mongoose";
import "../models/userdata.js";

const User = mongoose.model("user");

export const getuserdata = async (req) => {
    try {
      const findUser = await User.findOne({ _id: req.lookingfor });
      if (!findUser) {
        return {
          success: false,
          message: "cant find user with this id",
          status: 400,
        };
      }
      return {
        success: true,
        message: findUser,
        status: 200,
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Error in get all posts", status: 500 };
    }
  };
