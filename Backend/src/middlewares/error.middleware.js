const logger = require("../config/logger");
const env = require("../config/env");

const errorMiddleware = (err, req, res, next) => {
  logger.error(err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack:
      env.NODE_ENV === "development"
        ? err.stack
        : undefined,
  });
};

module.exports = errorMiddleware;