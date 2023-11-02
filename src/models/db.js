const {
  DB_NAME,
  DB_USER_NAME,
  DB_USER_PASSWORD,
  DB_HOST,
} = require("../configs");
const { Sequelize } = require("sequelize");

const db = new Sequelize(DB_NAME, DB_USER_NAME, DB_USER_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

try {
  db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = db;
