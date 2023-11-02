const { create, fetchMultiple, remove } = require("./bookmark.controller");
const { authMiddleware } = require("../../../../middlewares/authentication");

module.exports = (router, prefix) => {
  this.routePreFix = prefix;
  /**
   * Add demo route middleware
   * router.use((req, res, next) => next())
   */
  router.use(authMiddleware);

  // CREATE
  router.post(`/${this.routePreFix}/`, create);

  // READ
  router.get(`/${this.routePreFix}/:user_id`, fetchMultiple);

  // DELETE
  router.delete(`/${this.routePreFix}/`, remove);
};
