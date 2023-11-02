const { users } = require("../../../../models");

/**
 * Only do data manipulations in DB and return results
 */
module.exports = {
  create: async (user) => {
    return await users.create(user);
  },

  fetch: async (filter) => {
    return await users.findOne({
      where: filter,
    });
  },
};
