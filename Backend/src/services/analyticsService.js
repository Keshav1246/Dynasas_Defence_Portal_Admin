const prisma = require('../config/prisma');

class AnalyticsService {
  /**
   * Get high-level overview metrics (Sessions, Visitors, Duration, Bounce Rate)
   * Calculates metrics for the requested period, and the previous period for growth comparison.
   */
  async getOverview(startDate, endDate) {
    const currentPeriod = await this._getMetrics(startDate, endDate);
    
    // Calculate previous period of same duration
    const duration = endDate.getTime() - startDate.getTime();
    const prevStartDate = new Date(startDate.getTime() - duration);
    const prevPeriod = await this._getMetrics(prevStartDate, startDate);

    return {
      current: currentPeriod,
      previous: prevPeriod,
      growth: {
        sessions: this._calcGrowth(currentPeriod.sessions, prevPeriod.sessions),
        visitors: this._calcGrowth(currentPeriod.visitors, prevPeriod.visitors),
        duration: this._calcGrowth(currentPeriod.avgDuration, prevPeriod.avgDuration),
        bounceRate: this._calcGrowth(currentPeriod.bounceRate, prevPeriod.bounceRate, true), // Lower is better
      }
    };
  }

  async _getMetrics(start, end) {
    const data = await prisma.websiteAnalytics.findMany({
      where: {
        createdAt: { gte: start, lte: end }
      }
    });

    const sessions = new Set();
    const visitors = new Set();
    let totalDuration = 0;
    let bounces = 0;
    let totalPageViews = data.length;

    data.forEach(event => {
      sessions.add(event.sessionId);
      visitors.add(event.visitorId);
      totalDuration += event.durationSeconds;
      if (event.bounced) bounces++;
    });

    const sessionCount = sessions.size;
    const visitorCount = visitors.size;

    return {
      sessions: sessionCount,
      visitors: visitorCount,
      pageViews: totalPageViews,
      avgDuration: sessionCount > 0 ? totalDuration / sessionCount : 0,
      bounceRate: sessionCount > 0 ? (bounces / sessionCount) * 100 : 0
    };
  }

  _calcGrowth(current, previous, reverse = false) {
    if (previous === 0) return current > 0 ? 100 : 0;
    const diff = current - previous;
    const pct = (diff / previous) * 100;
    return reverse ? -pct : pct; // For bounce rate, a drop is positive
  }

  /**
   * Get traffic data grouped by week/day depending on filter
   */
  async getTrafficData(filter) {
    const end = new Date();
    let start = new Date();
    let groupBy = 'day';

    switch(filter) {
      case '7D': start.setDate(end.getDate() - 7); break;
      case '30D': start.setDate(end.getDate() - 30); break;
      case '90D': start.setDate(end.getDate() - 90); groupBy = 'week'; break;
      case '1Y': start.setFullYear(end.getFullYear() - 1); groupBy = 'month'; break;
      default: start.setDate(end.getDate() - 30);
    }

    const data = await prisma.websiteAnalytics.findMany({
      where: { createdAt: { gte: start, lte: end } },
      orderBy: { createdAt: 'asc' }
    });

    const grouped = {};

    data.forEach(event => {
      const d = new Date(event.createdAt);
      let key;
      if (groupBy === 'day') {
        key = d.toISOString().split('T')[0];
      } else if (groupBy === 'week') {
        // Simple week grouping by ISO week
        const firstDayOfYear = new Date(d.getFullYear(), 0, 1);
        const pastDaysOfYear = (d - firstDayOfYear) / 86400000;
        const weekNum = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
        key = `W${weekNum} ${d.getFullYear()}`;
      } else {
        key = `${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`;
      }

      if (!grouped[key]) {
        grouped[key] = { label: key, sessions: new Set(), users: new Set(), pageViews: 0 };
      }

      grouped[key].sessions.add(event.sessionId);
      grouped[key].users.add(event.visitorId);
      grouped[key].pageViews++;
    });

    // Format for frontend
    return Object.values(grouped).map(g => ({
      label: g.label,
      sessions: g.sessions.size,
      users: g.users.size,
      pageViews: g.pageViews
    }));
  }

  /**
   * Get leads aggregated by month
   */
  async getLeadsData() {
    const end = new Date();
    const start = new Date();
    start.setFullYear(end.getFullYear() - 1); // 12 months

    const inquiries = await prisma.inquiry.findMany({
      where: { createdAt: { gte: start, lte: end }, isDeleted: false },
      select: { createdAt: true, inquiryType: true }
    });

    const grouped = {};

    // Initialize 12 months with 0
    for (let i = 11; i >= 0; i--) {
      const d = new Date(end.getFullYear(), end.getMonth() - i, 1);
      const key = `${d.toLocaleString('default', { month: 'short' })}`;
      grouped[key] = { label: key, CONTACT: 0, DEMO_REQUEST: 0, QUOTE: 0 };
    }

    inquiries.forEach(inq => {
      const d = new Date(inq.createdAt);
      const key = `${d.toLocaleString('default', { month: 'short' })}`;
      if (grouped[key]) {
        grouped[key][inq.inquiryType] = (grouped[key][inq.inquiryType] || 0) + 1;
      }
    });

    return Object.values(grouped);
  }

  /**
   * Track a new analytics event from the frontend
   */
  async trackEvent(data) {
    const { sessionId, visitorId, pagePath, durationSeconds, bounced } = data;
    return await prisma.websiteAnalytics.create({
      data: {
        sessionId: sessionId || 'unknown',
        visitorId: visitorId || 'unknown',
        pagePath: pagePath || '/',
        durationSeconds: durationSeconds || 0,
        bounced: !!bounced,
      }
    });
  }
}

module.exports = new AnalyticsService();
