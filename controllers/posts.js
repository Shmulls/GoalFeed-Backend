import Post from '../models/Post.js';
import User from '../models/User.js';

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
      saved: {},
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPostsilike = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({
      [`likes.${userId}`]: true,
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getSavePosts = async (req, res) => {
  try {
    console.log('getSavePosts');
    const { userId } = req.params;
    const posts = await Post.find({
      [`saved.${userId}`]: true,
    });
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    console.log('ERRORPOSTS');
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const savePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isSaved = post.saved.get(userId);

    if (isSaved) {
      console.log('notSaved', isSaved);
      post.saved.delete(userId);
    } else {
      console.log('isSaved', isSaved);
      post.saved.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { saved: post.saved },
      { new: true },
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true },
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    console.log(description);
    const updated = await Post.findOneAndUpdate(
      { _id: id },
      { description: description },
      { new: true },
    );
    if (!updated) {
      res.status(400).json({ message: 'cent update this post' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* DELETE */
export const deletepost = async (req, res) => {
  try {
    console.log('delete post');
    const { id } = req.params;
    const result = await Post.findOneAndDelete({ _id: id });
    console.log('result');
    if (result) {
      res.status(200).json({ message: 'post deleted' });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
