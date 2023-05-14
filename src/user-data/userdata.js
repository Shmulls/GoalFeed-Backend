import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // this will give us createdAt and updatedAt
  }
);

const User = mongoose.model("user", userSchema);
export default User;
