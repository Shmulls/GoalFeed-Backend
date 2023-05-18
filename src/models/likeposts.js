import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
    userid: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
    post: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true, 
    },
    created_at: { 
        type: Date, 
        default: Date.now,
    },
});

const likespost = mongoose.model("likespost", likesSchema);
export default likespost;
