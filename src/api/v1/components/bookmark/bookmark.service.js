const { create, fetchMultiple, remove } = require("./bookmark.dao");

/**
 * Only handle provided x data and return y data | Use dao to get data from DB
 */
module.exports = {
  createBookmark: async (bookmark) => {
    try {
      const data = await create(bookmark);
      return {
        complete: true,
        data,
      };
    } catch (error) {
      return new Error(error);
    }
  },

  fetchUserBookmarks: async (user_id) => {
    try {
      const data = await fetchMultiple({ user_id });
      return {
        complete: true,
        data,
      };
    } catch (error) {
      return new Error(error);
    }
  },

  removeBookmark: async (user_id, recipe_id) => {
    try {
      const data = await remove({ user_id, recipe_id });
      return {
        complete: true,
        data,
      };
    } catch (error) {
      return new Error(error);
    }
  },
};
