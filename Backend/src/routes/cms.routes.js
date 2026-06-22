const express = require("express");

const router = express.Router();

const validate = require("../middlewares/validate.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const {
  createHomepageSchema,
  updateHomepageSchema,
  createFooterSchema,
  updateFooterSchema,
  createServicesPageSchema,
  updateServicesPageSchema,
} = require("../validations/cms.validation");

const {
  getHomepageContent,
  createHomepageContent,
  updateHomepageContent,
  getFooterContent,
  createFooterContent,
  updateFooterContent,
  getServicesPageContent,
  createServicesPageContent,
  updateServicesPageContent,
} = require("../controllers/cms.controller");

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

router.get("/services-page", getServicesPageContent);

router.post(
  "/services-page",
  authMiddleware,
  validate(createServicesPageSchema),
  createServicesPageContent
);

router.put(
  "/services-page/:id",
  authMiddleware,
  validate(updateServicesPageSchema),
  updateServicesPageContent
);

module.exports = router;