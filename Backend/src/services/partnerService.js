const prisma = require('../config/prisma');

/**
 * Service to handle business logic for Partner Management
 */
class PartnerService {
  /**
   * Add a new partner
   */
  async createPartner(data) {
    return prisma.partner.create({
      data,
    });
  }
  
  async getPartnerById(id) {
    return prisma.partner.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  /**
   * Get all non-deleted partners with pagination, filtering, and search
   */
  async getAllPartners({
  page = 1,
  limit = 10,
  search,
  status,
}) {
  const skip = (page - 1) * limit;

  const where = {
    isDeleted: false,
  };

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        description: {
          contains: search,
          mode: 'insensitive',
        },
      },
    ];
  }

  const [data, total, totalPartners, activePartners, newPartners] = await Promise.all([
    prisma.partner.findMany({
      where,
      skip,
      take: limit,
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' }
      ],
    }),
    prisma.partner.count({ where }),
    prisma.partner.count({ where: { isDeleted: false } }),
    prisma.partner.count({ where: { isDeleted: false, status: 'ACTIVE' } }),
    prisma.partner.count({ 
      where: { 
        isDeleted: false, 
        createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } 
      } 
    }),
  ]);

  return { 
    data, 
    total, 
    stats: { 
      totalPartners, 
      activePartners, 
      newThisMonth: newPartners 
    } 
  };
}

  /**
   * Edit partner details
   */
  async updatePartner(id, data) {
    return prisma.partner.update({
      where: { id },
      data,
    });
  }

  /**
   * Soft delete a partner
   */
  async deletePartner(id) {
    return prisma.partner.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }

  /**
   * Update partner status
   */
  async updatePartnerStatus(id, status) {
    return prisma.partner.update({
      where: { id },
      data: { status },
    });
  }
}

module.exports = new PartnerService();
