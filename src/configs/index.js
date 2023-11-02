/**
 * Server config
 */

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  // server configuration
  NODE_ENV: process.env.NODE_ENV || "development",

  // database configuration
  DB_NAME: process.env.DB_NAME,
  DB_USER_NAME: process.env.DB_USER_NAME,
  DB_USER_PASSWORD: process.env.DB_USER_PASSWORD,
  DB_HOST: process.env.DB_HOST,

  // jwt token configuration
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME,

  // spooncular config
  SPOONCULAR_API_KEY: process.env.SPOONCULAR_API_KEY,

  // JWE token config
  FILE_SERVER_PRIVATE_KEY: process.env.FILE_SERVER_PRIVATE_KEY,
  FILE_SERVER_PUBLIC_KEY: process.env.FILE_SERVER_PUBLIC_KEY,
};
