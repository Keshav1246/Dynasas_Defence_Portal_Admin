const express = require("express");

const validate = require("../middlewares/validate.middleware");

const {
  createServiceSchema,
  updateServiceSchema,
} = require("../validations/service.validation");

const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/service.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Public Routes
router.get("/", getAllServices);
router.get("/:id", getServiceById);

// Protected Routes (TODO: Re-enable authMiddleware once authentication is implemented)
router.post(
  "/",
  // authMiddleware,
  validate(createServiceSchema),
  createService
);

router.put(
  "/:id",
  // authMiddleware,
  validate(updateServiceSchema),
  updateService
);

router.delete(
  "/:id",
  // authMiddleware,
  deleteService
);

module.exports = router;