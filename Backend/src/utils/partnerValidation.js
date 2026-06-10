const { z } = require('zod');

// Schema to list partners with filtering and pagination
const listPartnersSchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? Math.max(1, parseInt(val, 10)) : 1)),
    limit: z.string().optional().transform((val) => (val ? Math.min(100, Math.max(1, parseInt(val, 10))) : 10)),
    search: z.string().max(100).optional(),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
    category: z.string().max(100).optional(),
  }),
});

// Parameter validator for single resource routes
const partnerIdParamSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => {
      const parsed = parseInt(val, 10);
      if (isNaN(parsed)) {
        throw new Error('ID must be a valid number');
      }
      return parsed;
    }),
  }),
});

// Partner creation body schema
const createPartnerSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(255),
    description: z.string().max(1000).optional().nullable(),
    logo: z.string().url('Logo must be a valid URL').or(z.literal('')).optional().nullable(),
    website: z.string().url('Website must be a valid URL').or(z.literal('')).optional().nullable(),
    category: z.string().max(100).optional().nullable(),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional().default('ACTIVE'),
  }),
});

// Partner update body schema (all fields optional)
const updatePartnerSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
  body: z.object({
    name: z.string().min(1, 'Name cannot be empty').max(255).optional(),
    description: z.string().max(1000).optional().nullable(),
    logo: z.string().url('Logo must be a valid URL').or(z.literal('')).optional().nullable(),
    website: z.string().url('Website must be a valid URL').or(z.literal('')).optional().nullable(),
    category: z.string().max(100).optional().nullable(),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  }),
});

// Partner status patch schema
const partnerStatusSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
  body: z.object({
    status: z.enum(['ACTIVE', 'INACTIVE']),
  }),
});

module.exports = {
  listPartnersSchema,
  partnerIdParamSchema,
  createPartnerSchema,
  updatePartnerSchema,
  partnerStatusSchema,
};
