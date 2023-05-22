import User from "../models/User.js";

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

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      // user.friends = user.friends.filter((id) => id !== friendId);
      // friend.friends = friend.friends.filter((id) => id !== id);
      user.friends = user.friends.filter((id1) => id1 !== friendId);
      friend.friends = friend.friends.filter((id2) => id2 !== id1);
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
  console.log(req.body);
  try {
    console.log("editUser");
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
