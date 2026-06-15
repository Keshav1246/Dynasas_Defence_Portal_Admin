// Validate environment variables first before anything else
const env = require('./config/env');
const logger = require('./config/logger');

const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth.routes');
const mediaRouter = require('./routes/mediaRoutes');
const partnerRouter = require('./routes/partnerRoutes');
const { contactRouter, inquiryRouter } = require('./routes/inquiryRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Import global error middleware
const errorMiddleware = require('./middlewares/errorMiddleware');
const AppError = require('./utils/AppError');

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors({
  origin: '*', // Restrict in production
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  if (process.env.LOG_REQUESTS === 'true') {
    logger.info(`${req.method} ${req.originalUrl} - IP: ${req.ip}`);
  }
  next();
});

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'UP',
    timestamp: new Date(),
    environment: env.NODE_ENV,
  });
});

const adminUsersRoutes = require('./routes/adminUsers.routes');

// =========================
// API ROUTES
// =========================

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/media', mediaRouter);
app.use('/api/v1/partners', partnerRouter);
app.use('/api/v1/inquiries', inquiryRouter);
app.use('/api/v1/contact', contactRouter);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/admin-users', adminUsersRoutes);

// =========================
// 404 Handler
// =========================

app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// =========================
// Global Error Handler
// =========================

app.use(errorMiddleware);

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