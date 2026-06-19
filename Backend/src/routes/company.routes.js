const express = require("express");
const validate = require("../middlewares/validate.middleware");

const {
  createCompanySchema,
  updateCompanySchema,
  statisticSchema,
  pillarSchema,
  reorderSchema,
} = require("../validations/company.validation");

const {
  getCompanyProfile,
  createCompanyProfile,
  updateCompanyProfile,
  getStatistics,
  createStatistic,
  updateStatistic,
  deleteStatistic,
  reorderStatistics,
  getPillars,
  createPillar,
  updatePillar,
  deletePillar,
  reorderPillars,
} = require("../controllers/company.controller");

const router = express.Router();

router.get("/", getCompanyProfile);

router.post(
  "/",
  validate(createCompanySchema),
  createCompanyProfile
);

// Statistics Routes
router.get("/statistics", getStatistics);
router.post("/statistics", validate(statisticSchema), createStatistic);
router.put("/statistics/reorder", validate(reorderSchema), reorderStatistics);
router.put("/statistics/:id", validate(statisticSchema), updateStatistic);
router.delete("/statistics/:id", deleteStatistic);

// Mission Pillars Routes
router.get("/pillars", getPillars);
router.post("/pillars", validate(pillarSchema), createPillar);
router.put("/pillars/reorder", validate(reorderSchema), reorderPillars);
router.put("/pillars/:id", validate(pillarSchema), updatePillar);
router.delete("/pillars/:id", deletePillar);

router.put(
  "/:id",
  validate(updateCompanySchema),
  updateCompanyProfile
);

module.exports = router;