const prisma = require('../config/prisma');

class DashboardService {
  async getDashboardData() {
    // 1. SERVICES
    const [totalServices, publishedServices, draftServices, archivedServices] = await Promise.all([
      prisma.service.count(),
      prisma.service.count({ where: { status: 'published' } }),
      prisma.service.count({ where: { status: 'draft' } }),
      prisma.service.count({ where: { status: 'archived' } })
    ]);

    // 2. PARTNERS
    const [totalPartners, activePartners, inactivePartners] = await Promise.all([
      prisma.partner.count({ where: { isDeleted: false } }),
      prisma.partner.count({ where: { status: 'ACTIVE', isDeleted: false } }),
      prisma.partner.count({ where: { status: 'INACTIVE', isDeleted: false } })
    ]);

    // 3. INQUIRIES
    const [totalInquiries, newInquiries, inProgressInquiries, closedInquiries] = await Promise.all([
      prisma.inquiry.count({ where: { isDeleted: false } }),
      prisma.inquiry.count({ where: { status: 'NEW', isDeleted: false } }),
      prisma.inquiry.count({ where: { status: 'IN_PROGRESS', isDeleted: false } }),
      prisma.inquiry.count({ where: { status: 'CLOSED', isDeleted: false } })
    ]);

    // 4. MEDIA
    const allMediaFiles = await prisma.media.findMany({
      where: { isDeleted: false },
      select: { fileType: true, size: true }
    });

    const totalMediaFiles = allMediaFiles.length;
    let totalStorageUsed = 0;
    const mediaBreakdown = {
      images: 0,
      videos: 0,
      documents: 0,
      models: 0
    };

    allMediaFiles.forEach(file => {
      totalStorageUsed += file.size;
      const type = file.fileType.toLowerCase();
      if (type.startsWith('image/')) {
        mediaBreakdown.images += file.size;
      } else if (type.startsWith('video/')) {
        mediaBreakdown.videos += file.size;
      } else if (type.startsWith('application/') || type.startsWith('text/')) {
        mediaBreakdown.documents += file.size;
      } else if (type.startsWith('model/')) {
        mediaBreakdown.models += file.size;
      } else {
        // Fallback for any unknown types, classify as documents for now
        mediaBreakdown.documents += file.size;
      }
    });

    // 5. ADMIN USERS (Removed)

    // 6. SERVICE PUBLISHING TREND (Monthly grouping in JS)
    const allServices = await prisma.service.findMany({
      select: { createdAt: true, status: true },
      orderBy: { createdAt: 'asc' }
    });

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Grouping logic for last 6 months
    const last6Months = [];
    const currentDate = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      last6Months.push({
        month: monthNames[d.getMonth()],
        year: d.getFullYear(),
        monthIndex: d.getMonth(),
        monthIndex: d.getMonth(),
        published: 0,
        draft: 0,
        archived: 0
      });
    }

    allServices.forEach(service => {
      const serviceDate = new Date(service.createdAt);
      const targetMonth = last6Months.find(m => m.monthIndex === serviceDate.getMonth() && m.year === serviceDate.getFullYear());
      if (targetMonth) {
        if (service.status === 'published') {
          targetMonth.published += 1;
        } else if (service.status === 'draft') {
          targetMonth.draft += 1;
        } else if (service.status === 'archived') {
          targetMonth.archived += 1;
        }
      }
    });

    // Remove internal grouping keys
    const serviceTrend = last6Months.map(m => ({
      month: m.month,
      published: m.published,
      draft: m.draft,
      archived: m.archived
    }));

    // 7. INQUIRY OVERVIEW
    const inquiryOverview = [
      { name: 'New Requests', value: newInquiries, fill: '#3b82f6' },
      { name: 'In Progress', value: inProgressInquiries, fill: '#f59e0b' },
      { name: 'Closed/Resolved', value: closedInquiries, fill: '#10b981' }
    ];

    // 8. CONTENT HEALTH
    const contentHealth = {
      published: publishedServices,
      draft: draftServices,
      archived: archivedServices
    };

    // 9. RECENT ACTIVITY
    const recentActivityRaw = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    const recentActivity = recentActivityRaw.map(log => {
      // Logic to assign color/icon loosely based on entityType/action
      let bgColor = 'bg-blue-100';
      let iconColor = 'text-blue-600';
      if (log.action.includes('Created') || log.action.includes('Uploaded')) {
        bgColor = 'bg-green-100';
        iconColor = 'text-green-600';
      } else if (log.action.includes('Deleted')) {
        bgColor = 'bg-red-100';
        iconColor = 'text-red-600';
      } else if (log.action.includes('Updated')) {
        bgColor = 'bg-orange-100';
        iconColor = 'text-orange-600';
      }

      // Format time
      const timeDiffMs = new Date() - new Date(log.createdAt);
      const diffHours = Math.floor(timeDiffMs / (1000 * 60 * 60));
      const diffMins = Math.floor(timeDiffMs / (1000 * 60));
      let timeStr = `${diffMins} min ago`;
      if (diffHours > 24) {
        timeStr = `${Math.floor(diffHours / 24)} days ago`;
      } else if (diffHours > 0) {
        timeStr = `${diffHours} hours ago`;
      }

      return {
        id: log.id,
        action: log.action, // Details was removed earlier to standardize formatting
        entityType: log.entityType,
        time: timeStr,
        bgColor,
        iconColor
      };
    });

    return {
      stats: {
        totalServices,
        publishedServices,
        draftServices,
        archivedServices,
        totalPartners,
        activePartners,
        inactivePartners,
        totalInquiries,
        newInquiries,
        inProgressInquiries,
        closedInquiries,
        totalMediaFiles,
        totalStorageUsed
      },
      serviceTrend,
      inquiryOverview,
      contentHealth,
      mediaBreakdown,
      recentActivity
    };
  }
}

module.exports = new DashboardService();
