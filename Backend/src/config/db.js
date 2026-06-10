const { PrismaClient } = require("@prisma/client");
const logger = require("./logger");

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    logger.info("PostgreSQL connected successfully");
  })
  .catch((error) => {
    logger.error(`Database connection failed: ${error.message}`);
  });

module.exports = prisma;