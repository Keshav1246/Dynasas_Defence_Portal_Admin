const analyticsController = require('./src/controllers/analytics.controller');

const req = { query: { filter: '30D' } };
const res = {
  status: function(code) { this.code = code; return this; },
  json: function(data) { console.log('Response:', this.code, JSON.stringify(data).substring(0, 200)); }
};
const next = (err) => console.error('Next error:', err);

analyticsController.getOverview(req, res, next);
analyticsController.getTraffic(req, res, next);
analyticsController.getLeads(req, res, next);
