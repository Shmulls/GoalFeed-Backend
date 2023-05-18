import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
  // the one how follow
  follower: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
  // the one that he want to follow
    following: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
    },
  });

// "follower" is follow after the one in the field "following"

const Follow = mongoose.model("follow", followSchema);
export default Follow;
