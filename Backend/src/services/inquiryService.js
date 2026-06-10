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
      data,
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
  assignedTo,
}) {
  const skip = (page - 1) * limit;

  const where = {
    isDeleted: false,
  };

  if (status) {
    where.status = status;
  }

  if (assignedTo) {
    where.assignedTo = {
      contains: assignedTo,
      mode: 'insensitive',
    };
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
      },
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
      },
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
   * Assign an inquiry to an admin
   */
  async assignInquiry(id, assignedTo) {
    return prisma.inquiry.update({
      where: { id },
      data: { assignedTo },
    });
  }
}

module.exports = new InquiryService();
