const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seed skipped');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());