const sequelize = require("./db");
const User = require("./users");
const Bookmark = require("./bookmarks");

sequelize
  .sync()
  .then(() => {
    console.log("tables created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = {
  users: User,
  bookmarks: Bookmark,
};
