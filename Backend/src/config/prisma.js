const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const env = require('./env');

// Initialize PG connection pool
const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

// Create Prisma pg adapter
const adapter = new PrismaPg(pool);

// Instantiate PrismaClient with the adapter
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
