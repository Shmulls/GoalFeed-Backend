/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import User from "../user-data/userdata.js";

export const checkAuth = async (requestObject) => {
  const { username, password } = requestObject;

  try {
    const user = new User({ username, password });
    await user.save();

    console.log("User saved successfully!");
    const resStatus = 200;
    const resJson = {
      message: "You are now logged in!",
    };
    return { status: resStatus, json: resJson };
  } catch (error) {
    console.error("Error saving user:", error);
    const resStatus = 500;
    const resJson = {
      message: "An error occurred while saving the user.",
    };
    return { status: resStatus, json: resJson };
  }
};
