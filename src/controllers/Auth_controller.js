import { createUser } from "../actions/actions.js";

export const createAuth = async (requestObject) => {
  try {
    const { username, password } = requestObject;
    const newUser = await createUser({ username, password });

    if (!newUser.success) {
      return {
        success: false,
        message: "Username already exists.",
        status: 200,
      };
    }

    return {
      success: true,
      message: "User created successfully.",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error in creating user.", status: 500 };
  }
};
