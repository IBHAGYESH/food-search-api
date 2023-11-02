const {
  getRandomRecipes,
  searchRecipeNames,
  searchRecipe,
  getRecipeInformation,
} = require("./recipe.service");

/**
 * Only handle request related logic | Use service to provide x data and get y data
 */
module.exports = {
  random: async (req, res) => {
    try {
      const response = await getRandomRecipes();
      return res.status(200).send(response.data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  autocomplete: async (req, res) => {
    try {
      const { query } = req.query;

      if (!query) {
        throw new Error("search query required!");
      }

      const response = await searchRecipeNames(query);
      return res.status(200).send(response.data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  search: async (req, res) => {
    try {
      const { query, number, offset, diet, type } = req.query;

      if (!query || !number || !offset) {
        throw new Error("Invalid data!");
      }

      const response = await searchRecipe(query, number, offset, diet, type);
      return res.status(200).send(response.data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  information: async (req, res) => {
    try {
      const { recipe_id } = req.params;

      if (!recipe_id) {
        throw new Error("recipe_id is required!");
      }

      const response = await getRecipeInformation(req.user.id, recipe_id);
      return res.status(200).send(response.data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
