const express = require("express");

const validate = require("../middlewares/validate.middleware");

const {
  createCompanySchema,
  updateCompanySchema,
} = require("../validations/company.validation");

const {
  getCompanyProfile,
  createCompanyProfile,
  updateCompanyProfile,
} = require("../controllers/company.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getCompanyProfile);

router.post(
  "/",
  authMiddleware,
  validate(createCompanySchema),
  createCompanyProfile
);

router.put(
  "/:id",
  authMiddleware,
  validate(updateCompanySchema),
  updateCompanyProfile
);

module.exports = router;