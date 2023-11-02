const { loginUser, signupUser } = require("./auth.service");

/**
 * Only handle request related logic | Use service to provide x data and get y data
 */
module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Invalid data!");
      }

      const response = await loginUser(email, password);
      if (!response.complete) {
        return res.status(401).json({ message: response.message });
      }

      // set a cookie: res.cookie('name', value, { httpOnly: true, expires: expire })
      // res.cookie("x-app-token", response.token, {
      //   httpOnly: true,
      //   expires: new Date(Date.now() + 25892000000),
      //   sameSite: false,
      // });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("x-app-token");
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  signup: async (req, res) => {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        throw new Error("Invalid data!");
      }

      const response = await signupUser(email, password, name);
      if (!response.complete) {
        return res.status(409).json({ message: response.message });
      }
      return res.status(200).send(response.data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
