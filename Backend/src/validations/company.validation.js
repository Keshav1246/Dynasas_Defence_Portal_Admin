const { z } = require("zod");

const createCompanySchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  overview: z.string().min(20, "Overview must be at least 20 characters"),
  
  // New fields
  foundedYear: z.string().optional().nullable(),
  headquarters: z.string().optional().nullable(),
  registrationNumber: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  missionTitle: z.string().optional().nullable(),
  missionStatement: z.string().optional().nullable(),
  visionTitle: z.string().optional().nullable(),
  visionStatement: z.string().optional().nullable(),
  longTermGoals: z.string().optional().nullable(),
  visionFuturePriorities: z.array(z.string()).optional(),
  generalEmail: z.string().optional().nullable(),
  securityEmail: z.string().optional().nullable(),
  mainPhone: z.string().optional().nullable(),
  defenseContractsPhone: z.string().optional().nullable(),
  mailingAddress: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
});

const updateCompanySchema = createCompanySchema.partial();

const statisticSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
  displayOrder: z.number().int().optional(),
});

const pillarSchema = z.object({
  text: z.string().min(1, "Text is required"),
  displayOrder: z.number().int().optional(),
});

const reorderSchema = z.array(z.object({
  id: z.string().uuid("Invalid ID format"),
  displayOrder: z.number().int(),
})).min(1, "At least one item is required for reordering");

module.exports = {
  createCompanySchema,
  updateCompanySchema,
  statisticSchema,
  pillarSchema,
  reorderSchema,
};