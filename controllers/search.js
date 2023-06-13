import User from "../models/User.js";
import Post from "../models/Post.js";

/**
 * Searches for users whose first name or last name matches the specified query.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The JSON response containing the matched user IDs.
 */
export const searchContent = async (req, res) => {
  const { query } = req.query;
  console.log("query", query);

  try {
    const users = await User.find(
      {
        $or: [
          { firstName: { $regex: query, $options: "i" } },
          { lastName: { $regex: query, $options: "i" } },
        ],
      },
      { _id: 1, firstName: 1, lastName: 1 } // Project only the _id field
    );

    if (users.length > 0) {
      console.log(`Found matching users for query '${query}':`, users);
    } else {
      console.log(`No matching users found for query '${query}'.`);
    }

    res.json(users);
  } catch (error) {
    console.error("Error occurred while searching for users:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for users." });
  }
};

export const searchPostContent = async (req, res) => {
  const { query } = req.query;
  console.log("query", query);

  try {
    const posts = await Post.find(
      { description: { $regex: `.*${query}.*`, $options: "i" } },
      { __v: 0 } // Exclude the __v field from the result
    );

    if (posts.length > 0) {
      console.log(`Found matching posts for query '${query}':`, posts);
    } else {
      console.log(`No matching posts found for query '${query}'.`);
    }

    res.json(posts);
  } catch (error) {
    console.error("Error occurred while searching for posts:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for posts." });
  }
};
