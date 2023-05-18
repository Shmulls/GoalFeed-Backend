import mongoose from "mongoose";
import "../models/userdata.js";

const User = mongoose.model("user");

// recive the user id and the path
export const uploadimage = async (req) => {
    try {
      const findUser = await User.findOne({ _id: req.userid });
      if (!findUser) {
        return {
          success: false,
          message: "user not found to upload image",
          status: 400,
        };
      }
      const result = await User.updateOne({ _id: req.userid }, req.image64);
      if (!result) {
        return {
            success: false,
            message: "cent upload image",
            status: 400,
          };
      }

      return {
        success: true,
        message: "image upload succsefully",
        status: 200,
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Error in uploag image", status: 500 };
    }
  };
