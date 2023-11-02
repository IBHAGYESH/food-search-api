const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Bookmark = sequelize.define(
  "Bookmark",
  {
    // Model attributes are defined here
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipe_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipe_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipe_summary: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Bookmark;
