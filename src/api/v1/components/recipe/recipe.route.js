const {
  random,
  autocomplete,
  search,
  information,
} = require("./recipe.controller");
const { authMiddleware } = require("../../../../middlewares/authentication");

module.exports = (router, prefix) => {
  this.routePreFix = prefix;
  /**
   * Add demo route middleware
   * router.use((req, res, next) => next())
   */
  router.use(authMiddleware);

  // GET
  router.get(`/${this.routePreFix}/random`, random);
  router.get(`/${this.routePreFix}/autocomplete`, autocomplete);
  router.get(`/${this.routePreFix}/search`, search);
  router.get(`/${this.routePreFix}/information/:recipe_id`, information);
};
