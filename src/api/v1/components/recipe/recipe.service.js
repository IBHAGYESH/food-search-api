const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { SPOONCULAR_API_KEY } = require("../../../../configs");
const { bookmark } = require("../services");

/**
 * Only handle provided x data and return y data | Use dao to get data from DB
 */
module.exports = {
  callSpoonCularAPI: async (endpoint, qParams = {}) => {
    qParams["apiKey"] = SPOONCULAR_API_KEY;
    const objString = "?" + new URLSearchParams(qParams).toString();
    console.log(`https://api.spoonacular.com/recipes/${endpoint}${objString}`);
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${endpoint}${objString}`
    );
    const data = await response.json();
    return data;
  },
  getRandomRecipes: async () => {
    try {
      const data = await module.exports.callSpoonCularAPI("random", {
        number: 12,
        tags: "vegetarian, dessert",
      });
      return {
        complete: true,
        data,
      };
    } catch (error) {
      return new Error(error);
    }
  },
  searchRecipeNames: async (query) => {
    try {
      const data = await module.exports.callSpoonCularAPI("autocomplete", {
        number: 12,
        query,
      });

      return {
        complete: true,
        data,
      };
    } catch (error) {
      return new Error(error);
    }
  },
  searchRecipe: async (query, number, offset, diet, type) => {
    try {
      const data = await module.exports.callSpoonCularAPI("complexSearch", {
        query,
        number,
        offset,
        diet,
        type,
      });

      return {
        complete: true,
        data,
      };
    } catch (error) {
      return new Error(error);
    }
  },
  getRecipeInformation: async (user_id, recipe_id) => {
    try {
      const data = await module.exports.callSpoonCularAPI(
        `${recipe_id}/information`,
        { includeNutrition: true }
      );

      const bookmarks = await bookmark.fetchUserBookmarks(user_id);

      for (let i = 0; i < bookmarks.data.length; i++) {
        if (bookmarks.data[i].recipe_id === data.id) {
          data.bookmarked = true;
        }
      }

      return {
        complete: true,
        data,
      };
    } catch (error) {
      return new Error(error);
    }
  },
};
