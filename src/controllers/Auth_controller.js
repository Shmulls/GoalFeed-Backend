import { createUser, checkUser } from "../actions/actions.js";

export const createAuth = async (requestObject) => {
  try {
    const { username, email, password, dateOfBirth, gender } = requestObject;
    const newUser = await createUser({
      username,
      email,
      password,
      dateOfBirth,
      gender,
    });

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

export const checkAuth = async (requestObject) => {
  try {
    const { email, password } = requestObject;
    const user = await checkUser({ email, password });
    if (!user.success) {
      return {
        success: false,
        message: "Username or password is incorrect.",
        status: 200,
      };
    }
    return {
      success: true,
      message: "User logged in successfully.",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error in logging in.", status: 500 };
  }
};
