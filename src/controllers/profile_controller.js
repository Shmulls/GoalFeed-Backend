import Follow from "../models/follows.js";
import User from "../models/userdata.js";

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

  export const followaction = async (req) => {
    const { userid, following } = req;
    try {
      const find1 = await User.findOne({ _id: userid });
      const find2 = await User.findOne({ _id: following });
      if (!find1 && !find2) {
        return {
            success: false,
            message: "one of the user dident find",
            status: 400,
          };
      }
      const checkdup = await Follow.findOne({ follower: userid, following });
      if (checkdup) {
        return {
            success: false,
            message: "you are already following him",
            status: 400,
          };
      }
      const result = await Follow.create({ follower: userid, following });
      return {
        success: true,
        message: result,
        status: 200,
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Error in following action", status: 500 };
    }
  };
