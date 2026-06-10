// Validate environment variables first before anything else
const env = require('./config/env');
const logger = require('./config/logger');

const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const mediaRouter = require('./routes/mediaRoutes');
const partnerRouter = require('./routes/partnerRoutes');
const { contactRouter, inquiryRouter } = require('./routes/inquiryRoutes');

// Import global error middleware
const errorMiddleware = require('./middlewares/errorMiddleware');
const AppError = require('./utils/AppError');

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors({
  origin: '*', // Adjust this to specific origins in production
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parsers for incoming request payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple request logger middleware using Winston
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl} - IP: ${req.ip}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'UP',
    timestamp: new Date(),
    environment: env.NODE_ENV,
  });
});

// Register API v1 routes
app.use('/api/v1/media', mediaRouter);
app.use('/api/v1/partners', partnerRouter);
app.use('/api/v1/inquiries', inquiryRouter);
app.use('/api/v1/contact', contactRouter); //post

// Handle undefined routes
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Centralized error handler
app.use(errorMiddleware);

// Boot server
const server = app.listen(env.PORT, () => {
  logger.info(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});

// Handle unhandled promise rejections outside Express
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...', err);
  process.exit(1);
});
