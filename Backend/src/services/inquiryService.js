const prisma = require('../config/prisma');

/**
 * Service to handle business logic for Contact & Inquiry Management
 */
class InquiryService {
  /**
   * Submit an inquiry (public contact submission)
   */
  async createInquiry(data) {
    return prisma.inquiry.create({
      data: {
        ...data,
        status: 'NEW',
        assignedTeam: null,
      },
    });
  }

  /**
   * Get all non-deleted inquiries with pagination, filtering, and search
   */
  async getAllInquiries({
    page = 1,
    limit = 10,
    search,
    status,
    type,
    assignedTo,
  }) {
    const skip = (page - 1) * limit;

    const where = {
      isDeleted: false,
    };

    if (status && status !== 'All') {
      if (status === 'New') where.status = 'NEW';
      if (status === 'In Review') {
        where.status = 'IN_PROGRESS';
        where.assignedTeam = null;
      }
      if (status === 'Assigned') {
        where.status = 'IN_PROGRESS';
        where.assignedTeam = { not: null };
      }
      if (status === 'Resolved') where.status = 'CLOSED';
    }

    if (type && type !== 'All Types') {
      if (type === 'Contact') where.inquiryType = 'CONTACT';
      if (type === 'Demo Request') where.inquiryType = 'DEMO_REQUEST';
      if (type === 'Quote') where.inquiryType = 'QUOTE';
    }

    if (search) {
      where.OR = [
        {
          fullName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          organization: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          subject: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          message: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        }
      }),
      prisma.inquiry.count({
        where,
      }),
    ]);

    return { data, total };
  }

  /**
   * Get a single active inquiry by ID
   */
  async getInquiryById(id) {
    return prisma.inquiry.findFirst({
      where: {
        id,
        isDeleted: false,
      }
    });
  }

  /**
   * Update inquiry details
   */
  async updateInquiry(id, data) {
    return prisma.inquiry.update({
      where: { id },
      data,
    });
  }

  /**
   * Soft delete an inquiry
   */
  async deleteInquiry(id) {
    return prisma.inquiry.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }

  /**
   * Update status of an inquiry
   */
  async updateInquiryStatus(id, status) {
    return prisma.inquiry.update({
      where: { id },
      data: { status },
    });
  }

  /**
   * Assign an inquiry to a team
   */
  async assignInquiry(id, assignedTeam) {
    return prisma.inquiry.update({
      where: { id },
      data: { 
        assignedTeam,
        status: 'IN_PROGRESS'
      },
    });
  }

  /**
   * Get stats
   */
  async getStats() {
    const [newCount, inReviewCount, assignedCount, resolvedCount] = await Promise.all([
      prisma.inquiry.count({ where: { isDeleted: false, status: 'NEW' } }),
      prisma.inquiry.count({ where: { isDeleted: false, status: 'IN_PROGRESS', assignedTeam: null } }),
      prisma.inquiry.count({ where: { isDeleted: false, status: 'IN_PROGRESS', assignedTeam: { not: null } } }),
      prisma.inquiry.count({ where: { isDeleted: false, status: 'CLOSED' } })
    ]);

    return {
      new: newCount,
      inReview: inReviewCount,
      assigned: assignedCount,
      resolved: resolvedCount
    };
  }

  /**
   * Get unread count
   */
  async getUnreadCount() {
    return prisma.inquiry.count({ where: { isDeleted: false, status: 'NEW' } });
  }
}

module.exports = new InquiryService();
