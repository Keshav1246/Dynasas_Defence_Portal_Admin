const env = require("../config/env");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const logger = require("../config/logger");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new AppError("Access denied. No token provided.", 401));
    }

    if (!authHeader.startsWith("Bearer ")) {
      return next(new AppError("Invalid authorization format", 401));
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    logger.error(error.message);

    return next(new AppError("Invalid token", 401));
  }
};

module.exports = authMiddleware;
