const logger = require('../config/logger');
const env = require('../config/env');

/**
 * Express global error-handling middleware
 */
const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let details = err.details || null;

  // Log error via Winston
  logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`, {
    stack: err.stack,
    details: err.details,
  });

  // Handle specific database errors (Prisma)
  if (err.code) {
    switch (err.code) {
      case 'P2002': // Unique constraint violation
        statusCode = 409;
        message = 'Conflict: Record with this value already exists';
        details = err.meta ? { target: err.meta.target } : null;
        break;
      case 'P2025': // Record to update/delete not found
        statusCode = 404;
        message = 'Not Found: Record does not exist';
        break;
      case 'P2003': // Foreign key constraint failed
        statusCode = 400;
        message = 'Bad Request: Related record does not exist';
        break;
      default:
        if (err.name === 'PrismaClientKnownRequestError') {
          statusCode = 400;
          message = 'Database operation failed';
        }
        break;
    }
  }

  // Handle Multer upload errors
  if (err.name === 'MulterError') {
    statusCode = 400;
    message = `Upload error: ${err.message}`;
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'Upload error: File is too large. Max size is 50MB.';
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: {
      message,
      status: `${statusCode}`.startsWith('4') ? 'fail' : 'error',
      details,
      // Stack trace is only exposed in non-production environments
      ...(env.NODE_ENV !== 'production' && { stack: err.stack }),
    },
  });
};

module.exports = errorMiddleware;
