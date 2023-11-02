const { bookmarks } = require("../../../../models");

/**
 * Only do data manipulations in DB and return results
 */
module.exports = {
  create: async (bookmark) => {
    return await bookmarks.create(bookmark);
  },

  fetchMultiple: async (filter) => {
    return await bookmarks.findAll({
      where: filter,
    });
  },

  remove: async (filter) => {
    return await bookmarks.destroy({
      where: filter,
    });
  },
};
