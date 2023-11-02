// const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../configs");
const { verifyToken } = require("../api/v1/components/auth/auth.service");

const authMiddleware = async (req, res, next) => {
  // if using token based auth in headers

  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  const token = req.headers["authorization"].split(" ")[1];

  // get a cookie: req.cookies['cookie-name']
  // const token = req.cookies["x-app-token"];

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    // const decoded = jwt.verify(token, JWT_SECRET);
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token.");
  }
};
module.exports = { authMiddleware };
