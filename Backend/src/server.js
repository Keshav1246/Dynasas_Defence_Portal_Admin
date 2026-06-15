// Validate environment variables first before anything else
const env = require('./config/env');
const logger = require('./config/logger');

const app = require('./app');

// =========================
// Start Server
// =========================

const server = app.listen(env.PORT, () => {
  logger.info(
    `🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`
  );
});

// =========================
// Process Error Handlers
// =========================

process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...', err);

  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...', err);

  process.exit(1);
});

// Graceful shutdown (recommended for production)
process.on('SIGTERM', () => {
  logger.info('SIGTERM RECEIVED. Shutting down gracefully...');

  server.close(() => {
    logger.info('Process terminated.');
  });
});