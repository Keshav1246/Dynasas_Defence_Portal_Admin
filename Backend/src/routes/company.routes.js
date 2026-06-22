const express = require("express");
const validate = require("../middlewares/validate.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

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
  authMiddleware,
  validate(createCompanySchema),
  createCompanyProfile
);

// Statistics Routes
router.get("/statistics", getStatistics);
router.post("/statistics", authMiddleware, validate(statisticSchema), createStatistic);
router.put("/statistics/reorder", authMiddleware, validate(reorderSchema), reorderStatistics);
router.put("/statistics/:id", authMiddleware, validate(statisticSchema), updateStatistic);
router.delete("/statistics/:id", authMiddleware, deleteStatistic);

// Mission Pillars Routes
router.get("/pillars", getPillars);
router.post("/pillars", authMiddleware, validate(pillarSchema), createPillar);
router.put("/pillars/reorder", authMiddleware, validate(reorderSchema), reorderPillars);
router.put("/pillars/:id", authMiddleware, validate(pillarSchema), updatePillar);
router.delete("/pillars/:id", authMiddleware, deletePillar);

router.put(
  "/:id",
  authMiddleware,
  validate(updateCompanySchema),
  updateCompanyProfile
);

module.exports = router;