const express = require("express");

const validate = require("../middlewares/validate.middleware");

const {
  createHomepageSchema,
  updateHomepageSchema,
  createFooterSchema,
  updateFooterSchema,
} = require("../validations/cms.validation");

const {
  getHomepageContent,
  createHomepageContent,
  updateHomepageContent,
  getFooterContent,
  createFooterContent,
  updateFooterContent,
} = require("../controllers/cms.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/homepage", getHomepageContent);

router.post(
  "/homepage",
  authMiddleware,
  validate(createHomepageSchema),
  createHomepageContent
);

router.put(
  "/homepage/:id",
  authMiddleware,
  validate(updateHomepageSchema),
  updateHomepageContent
);

router.get("/footer", getFooterContent);

router.post(
  "/footer",
  authMiddleware,
  validate(createFooterSchema),
  createFooterContent
);

router.put(
  "/footer/:id",
  authMiddleware,
  validate(updateFooterSchema),
  updateFooterContent
);

module.exports = router;