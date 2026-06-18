// Validate environment variables first before anything else
const env = require('./config/env');

const express = require("express");
const cors = require("cors");
const logger = require("./config/logger");

// Import Routes
const authRoutes = require("./routes/auth.routes");
const companyRoutes = require("./routes/company.routes");
const cmsRoutes = require("./routes/cms.routes");
const serviceRoutes = require("./routes/service.routes");

const mediaRouter = require('./routes/mediaRoutes');
const partnerRouter = require('./routes/partnerRoutes');
const { contactRouter, inquiryRouter } = require('./routes/inquiryRoutes');
const dashboardRoutes = require("./routes/dashboard.routes");
const activityLogRoutes = require("./routes/activityLogRoutes");
const settingsRoutes = require("./routes/settings.routes");
const analyticsRoutes = require('./routes/analyticsRoutes');
const adminUsersRoutes = require('./routes/adminUsers.routes');
const searchRoutes = require('./routes/search.routes');


// Import global error middleware
const errorMiddleware = require('./middlewares/errorMiddleware');
const AppError = require('./utils/AppError');

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:5177'
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Parsers for incoming request payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  if (process.env.LOG_REQUESTS === 'true') {
    logger.info(`${req.method} ${req.originalUrl} - IP: ${req.ip}`);
  }
  next();
});

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "UP",
    timestamp: new Date(),
    environment: env.NODE_ENV,
  });
});

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Defense Portal Backend Running Successfully",
  });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/company-profile", companyRoutes);
app.use("/api/v1/cms", cmsRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/media", mediaRouter);
app.use("/api/v1/partners", partnerRouter);
app.use("/api/v1/inquiries", inquiryRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/activity-logs", activityLogRoutes);
app.use("/api/v1/settings", settingsRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/admin-users', adminUsersRoutes);
app.use('/api/v1/search', searchRoutes);

// Handle undefined routes
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Error Handling Middleware (ALWAYS LAST)
app.use(errorMiddleware);

module.exports = app;