const { z } = require('zod');

// Public contact form submission schema
const createContactSchema = z.object({
  body: z.object({
    fullName: z.string().min(1, 'Full name is required').max(255),
    email: z.string().email('Invalid email address'),
    phone: z.string().max(20).optional().nullable(),
    organization: z.string().max(255).optional().nullable(),
    type: z.enum(['Defense Procurement', 'Strategic Partnership', 'General Information']),
    message: z.string().min(1, 'Message is required').max(5000),
  }),
});

// Listing inquiries schema with pagination, filtering, and search
const listInquiriesSchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? Math.max(1, parseInt(val, 10)) : 1)),
    limit: z.string().optional().transform((val) => (val ? Math.min(100, Math.max(1, parseInt(val, 10))) : 10)),
    search: z.string().max(100).optional(),
    status: z.enum(['All', 'New', 'In Review', 'Assigned', 'Resolved']).optional(),
    type: z.enum(['All Types', 'Defense Procurement', 'Strategic Partnership', 'General Information']).optional(),
    assignedTo: z.string().max(255).optional(),
  }),
});

// Parameter validator for single resource routes
const inquiryIdParamSchema = z.object({
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

// Admin inquiry update schema (all fields optional)
const updateInquirySchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
  body: z.object({
    fullName: z.string().min(1, 'Full name cannot be empty').max(255).optional(),
    email: z.string().email('Invalid email address').optional(),
    phone: z.string().max(20).optional().nullable(),
    organization: z.string().max(255).optional().nullable(),
    subject: z.string().min(1, 'Subject cannot be empty').max(255).optional(),
    message: z.string().min(1, 'Message cannot be empty').max(5000).optional(),
    inquiryType: z.enum(['CONTACT', 'DEMO_REQUEST', 'QUOTE']).optional(),
    status: z.enum(['NEW', 'IN_PROGRESS', 'CLOSED']).optional(),
    assignedTeam: z.string().max(255).optional().nullable(),
    internalNote: z.string().max(5000).optional().nullable(),
  }),
});

// Inquiry status patch schema
const inquiryStatusSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
  body: z.object({
    status: z.enum(['NEW', 'IN_PROGRESS', 'CLOSED']),
  }),
});

// Inquiry assignment patch schema
const inquiryAssignSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
  body: z.object({
    assignedTeam: z.string().min(1, 'Team name is required').max(255),
  }),
});

module.exports = {
  createContactSchema,
  listInquiriesSchema,
  inquiryIdParamSchema,
  updateInquirySchema,
  inquiryStatusSchema,
  inquiryAssignSchema,
};
