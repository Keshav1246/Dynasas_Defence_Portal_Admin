const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const companyRoutes = require("./routes/company.routes");
const cmsRoutes = require("./routes/cms.routes");
const serviceRoutes = require("./routes/service.routes");

const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/cms", cmsRoutes);
app.use("/api/v1/services", serviceRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Defense Portal Backend Running Successfully",
  });
});

module.exports = app;