import { createpost } from "../actions/actions.js";

export const createPost = async (requestObject) => {
  try {
    const { userid, content } = requestObject;
    const post = await createpost({ userid, content });
    if (!post.success) {
      return {
        success: false,
        message: "username doesnt exist blalalalal.",
        status: 400,
      };
    }
    return {
      success: true,
      message: "post added succsesfully",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error in posting.", status: 500 };
  }
};
