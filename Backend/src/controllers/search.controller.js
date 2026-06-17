const prisma = require('../config/prisma');
const apiResponse = require('../utils/apiResponse');

const globalSearch = async (req, res, next) => {
  try {
    const query = req.query.q || '';
    
    if (!query || query.trim().length === 0) {
      return res.status(200).json(apiResponse.success([], 'No query provided'));
    }

    const [services, partners] = await Promise.all([
      prisma.service.findMany({
        where: {
          title: {
            contains: query,
            mode: 'insensitive'
          }
        },
        select: { id: true, title: true },
        take: 5
      }),
      prisma.partner.findMany({
        where: {
          name: {
            contains: query,
            mode: 'insensitive'
          }
        },
        select: { id: true, name: true },
        take: 5
      })
    ]);

    const results = [
      ...services.map(s => ({ id: s.id, title: s.title, type: 'Service' })),
      ...partners.map(p => ({ id: p.id, title: p.name, type: 'Partner' }))
    ];

    res.status(200).json(apiResponse.success(results, 'Search results'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  globalSearch
};
