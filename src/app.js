const express = require("express");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const v1Routes = require("./api/v1/router");

function generateApp() {
  try {
    // generate express app
    const app = express();

    app.set("trust proxy", 1);

    // cors
    app.use(
      cors({
        credentials: true,
      })
    );

    // for compression
    app.use(compression());

    // for parsing application/json
    app.use(express.json());

    // for parsing application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    // for parsing cookies
    app.use(cookieParser());

    // attaching the API v1 routes to the server
    app.use("/api/v1", v1Routes);

    // handling undefined route
    app.use("*", (req, res) => {
      res.sendStatus(404);
    });

    return app;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = generateApp;
