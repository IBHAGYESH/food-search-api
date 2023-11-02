const { create, fetch } = require("./user.dao");

/**
 * Only handle provided x data and return y data | Use dao to get data from DB
 */
module.exports = {
  createUser: async (user) => {
    try {
      const data = await create(user);
      return {
        complete: true,
        data,
      };
    } catch (error) {
      return new Error(error);
    }
  },

  fetchUserByEmail: async (email) => {
    try {
      const data = await fetch({ email });
      return {
        complete: true,
        data,
      };
    } catch (error) {
      return new Error(error);
    }
  },
};
