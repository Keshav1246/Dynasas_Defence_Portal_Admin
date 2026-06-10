const prisma = require('../config/prisma');

/**
 * Service to handle business logic for Media Library
 */
class MediaService {
  /**
   * Save uploaded file metadata to DB
   */
  async uploadFile(fileData) {
    return prisma.media.create({
      data: {
        fileName: fileData.fileName,
        originalName: fileData.originalName,
        fileUrl: fileData.fileUrl,
        fileType: fileData.fileType,
        size: fileData.size,
      },
    });
  }

  /**
   * Get all non-deleted files with pagination, search, and type filtering
   */
  async getAllFiles({
    page = 1,
    limit = 10,
    search,
    fileType,
  }) {
    const skip = (page - 1) * limit;

    const where = {
      isDeleted: false,
    };

    if (search) {
      where.OR = [
        {
          fileName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          originalName: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (fileType) {
      where.fileType = {
        contains: fileType,
        mode: 'insensitive',
      };
    }

    const [data, total] = await Promise.all([
      prisma.media.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.media.count({
        where,
      }),
    ]);

    return { data, total };
  }

  /**
   * Fetch a single active file by ID
   */
  async getFileById(id) {
    return prisma.media.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
  }
  
  /**
   * Soft delete a file by ID
   */
  async deleteFile(id) {
    return prisma.media.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}

module.exports = new MediaService();