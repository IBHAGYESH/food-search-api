const {
  createBookmark,
  fetchUserBookmarks,
  removeBookmark,
} = require("./bookmark.service");

/**
 * Only handle request related logic | Use service to provide x data and get y data
 */
module.exports = {
  create: async (req, res) => {
    try {
      const { recipe_id, recipe_title, recipe_image, recipe_summary, user_id } =
        req.body;
      if (
        !recipe_id ||
        !recipe_title ||
        !recipe_image ||
        !recipe_summary ||
        !user_id
      ) {
        throw new Error("Invalid data!");
      }

      const response = await createBookmark({
        recipe_id,
        recipe_title,
        recipe_image,
        recipe_summary,
        user_id,
      });
      return res.status(200).send(response.data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  fetchMultiple: async (req, res) => {
    try {
      const { user_id } = req.params;

      if (!user_id) {
        throw new Error("user_id required!");
      }

      const response = await fetchUserBookmarks(user_id);
      return res.status(200).send(response.data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const { recipe_id, user_id } = req.query;

      if (!recipe_id || !user_id) {
        throw new Error("Invalid data!");
      }

      await removeBookmark(user_id, recipe_id);
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
