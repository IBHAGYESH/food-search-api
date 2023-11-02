const { JWK, JWE } = require("node-jose");
const { user } = require("../services");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const {
  FILE_SERVER_PUBLIC_KEY,
  FILE_SERVER_PRIVATE_KEY,
} = require("../../../../configs");
const keystore = JWK.createKeyStore();

/**
 * Only handle provided x data and return y data | Use dao to get data from DB
 */
module.exports = {
  generateToken: async (payload) => {
    console.log("#####");
    // Add the RSA public and private keys to the key store
    await keystore.add(FILE_SERVER_PUBLIC_KEY, "pem", { kid: "pubid" });

    // Get the RSA public key from the key store
    const pubKey = keystore.get({ kty: "RSA" });

    // Encrypt the JWT payload using the public key
    const data = await JWE.createEncrypt({ format: "compact" }, pubKey)
      .update(JSON.stringify(payload))
      .final()
      .then((encrypted) => {
        // console.log('Encrypted JWE:', encrypted);
        return encrypted;
      });
    return data;
  },
  verifyToken: async (token) => {
    try {
      // Add the RSA public and private keys to the key store
      await keystore.add(FILE_SERVER_PRIVATE_KEY, "pem", { kid: "privid" });

      // Get the RSA public key from the key store
      const privKey = keystore.get({ kid: "privid" });

      // Decrypt the JWT payload using the private key
      const data = await JWE.createDecrypt(privKey)
        .decrypt(token)
        .then((decrypted) => {
          const decryptedPayload = JSON.parse(decrypted.payload.toString());
          // console.log('Decrypted JWE payload:', decryptedPayload);
          return decryptedPayload;
        });
      return data;
    } catch (error) {}
  },
  loginUser: async (email, password) => {
    try {
      //1. find user by email
      const foundUser = await user.fetchUserByEmail(email);

      //2.. if not found throw 400
      if (!foundUser.data) {
        return {
          complete: false,
          message: "Invalid email or password",
        };
      }

      //3. if found match the password hash
      const isPasswordValid = await bcrypt.compare(
        password,
        foundUser.data.password
      );

      //4. if password hash does not match throw 401
      if (!isPasswordValid) {
        return {
          complete: false,
          message: "Invalid email or password",
        };
      }

      const tid = foundUser.data.id;
      const tName = foundUser.data.name;
      const tEmail = foundUser.data.email;

      //5. if hash matches create token
      // const token = jwt.sign(
      // {
      //   id: tid,
      //   name: tName,
      //   email: tEmail,
      // },
      //   process.env.JWT_SECRET
      // {
      //   expiresIn: config.JWT_EXPIRE_TIME,
      // }
      // );

      const token = await module.exports.generateToken({
        id: tid,
        name: tName,
        email: tEmail,
      });

      return {
        complete: true,
        token: `Bearer ${token}`,
        user_id: foundUser.data.id,
        name: foundUser.data.name,
      };
    } catch (error) {
      return new Error(error);
    }
  },
  signupUser: async (email, password, name) => {
    try {
      //1. find user by email
      const userExists = await user.fetchUserByEmail(email);

      //2. if found match throw already exists (409 conflict)
      if (userExists.data) {
        return {
          complete: false,
          message: "user already exists!",
        };
      }

      //3. if not found create new user
      const hash = await bcrypt.hash(password, 10);
      password = hash;
      const response = await user.createUser({ email, password, name });

      return {
        complete: true,
        data: response.data,
      };
    } catch (error) {
      return new Error(error);
    }
  },
};
