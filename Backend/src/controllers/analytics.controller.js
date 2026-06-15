const analyticsService = require('../services/analyticsService');
const AppError = require('../utils/AppError');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit-table');
const { parse } = require('json2csv');

exports.getOverview = async (req, res, next) => {
  try {
    const { filter = '30D' } = req.query;
    const end = new Date();
    let start = new Date();
    
    switch(filter) {
      case '7D': start.setDate(end.getDate() - 7); break;
      case '30D': start.setDate(end.getDate() - 30); break;
      case '90D': start.setDate(end.getDate() - 90); break;
      case '1Y': start.setFullYear(end.getFullYear() - 1); break;
      default: start.setDate(end.getDate() - 30);
    }

    const data = await analyticsService.getOverview(start, end);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.getTraffic = async (req, res, next) => {
  try {
    const { filter = '30D' } = req.query;
    const data = await analyticsService.getTrafficData(filter);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.getLeads = async (req, res, next) => {
  try {
    const data = await analyticsService.getLeadsData();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.trackEvent = async (req, res, next) => {
  try {
    await analyticsService.trackEvent(req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

exports.exportData = async (req, res, next) => {
  try {
    const { format = 'csv', filter = '30D' } = req.query;
    
    // Gather data
    const end = new Date();
    let start = new Date();
    switch(filter) {
      case '7D': start.setDate(end.getDate() - 7); break;
      case '30D': start.setDate(end.getDate() - 30); break;
      case '90D': start.setDate(end.getDate() - 90); break;
      case '1Y': start.setFullYear(end.getFullYear() - 1); break;
      default: start.setDate(end.getDate() - 30);
    }
    
    const overview = await analyticsService.getOverview(start, end);
    const traffic = await analyticsService.getTrafficData(filter);
    const leads = await analyticsService.getLeadsData();

    if (format === 'csv') {
      const csvData = traffic.map(t => ({
        Period: t.label,
        Sessions: t.sessions,
        Users: t.users,
        PageViews: t.pageViews
      }));
      const csv = parse(csvData);
      res.header('Content-Type', 'text/csv');
      res.attachment(`analytics_report_${filter}.csv`);
      return res.send(csv);
    } 
    
    if (format === 'xlsx') {
      const workbook = new ExcelJS.Workbook();
      
      // Overview Sheet
      const overviewSheet = workbook.addWorksheet('Overview');
      overviewSheet.addRow(['Metric', 'Value', 'Growth (%)']);
      overviewSheet.addRow(['Total Sessions', overview.current.sessions, overview.growth.sessions.toFixed(1)]);
      overviewSheet.addRow(['Unique Visitors', overview.current.visitors, overview.growth.visitors.toFixed(1)]);
      overviewSheet.addRow(['Avg Session (s)', overview.current.avgDuration.toFixed(0), overview.growth.duration.toFixed(1)]);
      overviewSheet.addRow(['Bounce Rate (%)', overview.current.bounceRate.toFixed(1), overview.growth.bounceRate.toFixed(1)]);

      // Traffic Sheet
      const trafficSheet = workbook.addWorksheet('Traffic');
      trafficSheet.addRow(['Period', 'Sessions', 'Users', 'Page Views']);
      traffic.forEach(t => trafficSheet.addRow([t.label, t.sessions, t.users, t.pageViews]));

      // Leads Sheet
      const leadsSheet = workbook.addWorksheet('Leads Generated');
      leadsSheet.addRow(['Month', 'Contact', 'Demo Request', 'Quote']);
      leads.forEach(l => leadsSheet.addRow([l.label, l.CONTACT, l.DEMO_REQUEST, l.QUOTE]));

      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.attachment(`analytics_report_${filter}.xlsx`);
      return await workbook.xlsx.write(res);
    }
    
    if (format === 'pdf') {
      const doc = new PDFDocument({ margin: 30, size: 'A4' });
      res.header('Content-Type', 'application/pdf');
      res.attachment(`analytics_report_${filter}.pdf`);
      doc.pipe(res);

      doc.fontSize(20).text('Dynasoft Analytics Report', { align: 'center' });
      doc.fontSize(12).text(`Date Range: ${filter} (${start.toLocaleDateString()} - ${end.toLocaleDateString()})`, { align: 'center' });
      doc.moveDown(2);

      // Overview Table
      const overviewTable = {
        title: "Overview Metrics",
        headers: ["Metric", "Value", "Growth"],
        rows: [
          ["Total Sessions", overview.current.sessions.toString(), `${overview.growth.sessions.toFixed(1)}%`],
          ["Unique Visitors", overview.current.visitors.toString(), `${overview.growth.visitors.toFixed(1)}%`],
          ["Avg Duration (s)", overview.current.avgDuration.toFixed(0), `${overview.growth.duration.toFixed(1)}%`],
          ["Bounce Rate", `${overview.current.bounceRate.toFixed(1)}%`, `${overview.growth.bounceRate.toFixed(1)}%`]
        ],
      };
      await doc.table(overviewTable, { width: 300, x: 150 });
      doc.moveDown(2);

      // Traffic Table
      const trafficTable = {
        title: "Website Traffic",
        headers: ["Period", "Sessions", "Users", "Page Views"],
        rows: traffic.map(t => [t.label, t.sessions.toString(), t.users.toString(), t.pageViews.toString()]),
      };
      await doc.table(trafficTable, { width: 400, x: 100 });

      doc.end();
      return;
    }

    return next(new AppError('Invalid format specified', 400));
  } catch (error) {
    next(error);
  }
};
