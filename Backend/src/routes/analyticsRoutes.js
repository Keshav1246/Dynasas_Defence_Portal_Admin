const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');

router.get('/overview', analyticsController.getOverview);
router.get('/traffic', analyticsController.getTraffic);
router.get('/leads', analyticsController.getLeads);
router.get('/export', analyticsController.exportData);
router.post('/track', analyticsController.trackEvent);

module.exports = router;
