const { login, logout, signup } = require("./auth.controller");

module.exports = (router, prefix) => {
  this.routePreFix = prefix;
  /**
   * Add demo route middleware
   * router.use((req, res, next) => next())
   */
  router.use((req, res, next) => {
    // console.log("demo route middleware");
    next();
  });

  // CREATE
  router.post(`/${this.routePreFix}/login`, login);
  router.post(`/${this.routePreFix}/logout`, logout);
  router.post(`/${this.routePreFix}/signup`, signup);
};
