const express = require("express");
const router = express.Router();

/**
 * Add global route middleware
 * router.use((req, res, next) => next())
 */
router.use((req, res, next) => {
  // console.log("global route middleware");
  next();
});

// server ping
router.use("/ping", (req, res) => {
  res.status(200).json({
    message: "Server online!",
    version: 1.0,
  });
});

require("./components/auth/auth.route")(router, "auth");
require("./components/bookmark/bookmark.route")(router, "bookmarks");
require("./components/recipe/recipe.route")(router, "recipes");

module.exports = router;
