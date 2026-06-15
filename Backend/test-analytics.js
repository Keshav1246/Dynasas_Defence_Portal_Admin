const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const analyticsService = require('./src/services/analyticsService');

async function test() {
  try {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30);
    const data = await analyticsService.getOverview(start, end);
    console.log('Overview:', data);
    
    const traffic = await analyticsService.getTrafficData('30D');
    console.log('Traffic sample:', traffic.slice(0, 2));
    
    const leads = await analyticsService.getLeadsData();
    console.log('Leads:', leads);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}
test();
