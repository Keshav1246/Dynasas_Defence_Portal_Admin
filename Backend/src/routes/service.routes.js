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

const router = express.Router();

// Public Routes
router.get("/", getAllServices);
router.get("/:id", getServiceById);

// Protected Routes (TODO: Re-enable authMiddleware once authentication is implemented)
router.post(
  "/",
  validate(createServiceSchema),
  createService
);

router.put(
  "/:id",
  validate(updateServiceSchema),
  updateService
);

router.delete(
  "/:id",
  deleteService
);

module.exports = router;