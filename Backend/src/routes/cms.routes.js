const express = require("express");

const router = express.Router();

const validate = require("../middlewares/validate.middleware");

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
  validate(createHomepageSchema),
  createHomepageContent
);

router.put(
  "/homepage/:id",
  validate(updateHomepageSchema),
  updateHomepageContent
);

router.get("/footer", getFooterContent);

router.post(
  "/footer",
  validate(createFooterSchema),
  createFooterContent
);

router.put(
  "/footer/:id",
  validate(updateFooterSchema),
  updateFooterContent
);

router.get("/services-page", getServicesPageContent);

router.post(
  "/services-page",
  validate(createServicesPageSchema),
  createServicesPageContent
);

router.put(
  "/services-page/:id",
  validate(updateServicesPageSchema),
  updateServicesPageContent
);

module.exports = router;