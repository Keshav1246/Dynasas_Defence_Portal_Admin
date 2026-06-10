const { z } = require("zod");

const createCompanySchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters"),

  overview: z
    .string()
    .min(20, "Overview must be at least 20 characters"),

  mission: z
    .string()
    .min(10, "Mission must be at least 10 characters"),

  vision: z
    .string()
    .min(10, "Vision must be at least 10 characters"),

  contactEmail: z
    .string()
    .email("Please provide a valid email address"),

  phone: z
    .string()
    .min(8, "Phone number is too short"),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters"),
});

const updateCompanySchema =
  createCompanySchema.partial();

module.exports = {
  createCompanySchema,
  updateCompanySchema,
};