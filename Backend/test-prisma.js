const prisma = require('./src/config/prisma');
async function test() {
  try {
    const data = await prisma.websiteAnalytics.count();
    console.log("Analytics count:", data);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}
test();
