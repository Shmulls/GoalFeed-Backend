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
    const data = await Post.find({ userId: id })
    const totalposts = data.length;
    let totalLikes = 0;
    // Iterate over the posts and sum the likes
    data.forEach((post) => {
      const likes = Object.keys(post.likes);
      totalLikes += likes.length;
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
      user.friends.map((id1) => User.findById(id1)),
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, phoneNumber, team, picturePath }) => ({
        _id,
        firstName,
        lastName,
        phoneNumber,
        team,
        picturePath,
      }),
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
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
      user.friends.map((id3) => User.findById(id3)),
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, phoneNumber, team, picturePath }) => ({
        _id,
        firstName,
        lastName,
        phoneNumber,
        team,
        picturePath,
      }),
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const editUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, phoneNumber, picture } = req.body;
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const user = await User.findById(id); // Replace 'userId' with the actual user ID
    if (!user) {
      // Handle the case when the user doesn't exist
      return res.status(404).json({ error: "User not found" });
    }
    if (firstName) {
      user.firstName = firstName;
    }

    if (lastName) {
      user.lastName = lastName;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      user.password = passwordHash;
    }

    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }

    if (picture) {
      user.picture = picture;
    }

    await user.save();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
