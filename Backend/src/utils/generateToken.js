const env = require("../config/env");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = generateToken;