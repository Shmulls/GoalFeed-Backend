import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date, 
    default: Date.now 
  },
});

const post = mongoose.model("posts", postSchema);
export default post;
