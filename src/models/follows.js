import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
  follower: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
    following: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
    },
  });

const follow = mongoose.model("posts", followSchema);
export default follow;
