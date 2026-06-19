const express = require("express");

const validate = require("../middlewares/validate.middleware");
const { createSettingsSchema, updateSettingsSchema } = require("../validations/settings.validation");
const { getSettings, createSettings, updateSettings } = require("../controllers/settings.controller");

const router = express.Router();

router.get("/", getSettings);

router.post(
  "/",
  validate(createSettingsSchema),
  createSettings
);

router.put(
  "/:id",
  validate(updateSettingsSchema),
  updateSettings
);

module.exports = router;
