import bcrypt from "bcrypt";
import User from "../models/User.js";
import Post from "../models/Post.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getfullname = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const fullname = user.firstName + " " + user.lastName;
    const picture = user.picturePath;
    res.status(200).json({ fullname, picture });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getstaticdata = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const data = await Post.find({ userId: id });
    const totalposts = data.length;
    let totalLikes = 0;
    // Iterate over the posts and sum the likes
    data.forEach((post) => {
      let likes = post.likes.size;
      totalLikes += likes;
    });
    res.status(200).json({ totalposts, totalLikes });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id1) => User.findById(id1))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, phoneNumber, team, picturePath }) => ({
        _id,
        firstName,
        lastName,
        phoneNumber,
        team,
        picturePath,
      })
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
/* DELETE */

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = id;
    console.log(userId);

    await Post.deleteMany({ userId });

    // Remove the user's ID from the likes array in all posts
    await Post.updateMany(
      { [`likes.${userId}`]: true }, // Use the converted ObjectId as the key
      { $unset: { [`likes.${userId}`]: 1 } }
    );

    // Remove the user's ID from the friends array of all users
    await User.updateMany({ friends: userId }, { $pull: { friends: userId } });

    await User.deleteOne({ _id: userId });

    res
      .status(200)
      .json({ message: "User and associated data deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to delete user and associated data" });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
      // user.friends = user.friends.filter((id1) => id1 !== friendId);
      // friend.friends = friend.friends.filter((id2) => id2 !== id1);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id3) => User.findById(id3))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, phoneNumber, team, picturePath }) => ({
        _id,
        firstName,
        lastName,
        phoneNumber,
        team,
        picturePath,
      })
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const editUser = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    picturePath,
    team,
  } = req.body;

  console.log(req.body);

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (firstName) {
      const posts = await Post.find({ userId: id });
      posts.forEach(async (post) => {
        post.firstName = firstName;
        await post.save();
      });
      console.log(firstName);

      user.firstName = firstName;
    }

    if (lastName) {
      const posts = await Post.find({ userId: id });
      posts.forEach(async (post) => {
        post.lastName = lastName;
        await post.save();
      });
      user.lastName = lastName;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      // Handle password hashing if required
      user.password = password;
    }

    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }

    if (picturePath) {
      const posts = await Post.find({ userId: id });
      posts.forEach(async (post) => {
        post.userPicturePath = picturePath;
        await post.save();
      });
      user.picturePath = picturePath;
    }

    if (team) {
      user.team = team;
    }

    await user.save();
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
