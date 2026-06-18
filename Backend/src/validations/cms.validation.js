const { z } = require("zod");

const createHomepageSchema = z.object({
  heroTitle: z.string().min(2),
  heroSubtitle: z.string().min(5),
  heroDescription: z.string().min(5),
  ctaText: z.string().min(2),
  ctaLink: z.string().min(1, "URL is required"),
  heroImage: z.string(),

  secondaryCtaText: z.string().optional(),
  secondaryCtaLink: z.string().optional(),

  trustBarItems: z.array(z.string().min(3).max(100)).optional(),

  partnersSectionLabel: z.string().optional(),
  partnersSectionTitle: z.string().optional(),
  partnersSectionDescription: z.string().optional(),
  partnersButtonText: z.string().optional(),
  partnersButtonLink: z.string().optional(),

  servicesSectionTitle: z.string().optional(),
  servicesSectionDescription: z.string().optional(),

  statisticsSectionTitle: z.string().optional(),

  sectionOrder: z.array(z.string()).optional(),
});

const updateHomepageSchema =
  createHomepageSchema.partial();

const createFooterSchema = z.object({
  address: z
    .string()
    .min(5, "Address must be at least 5 characters"),

  phone: z
    .string()
    .min(8, "Phone number is too short"),

  email: z
    .string()
    .email("Please provide a valid email address"),

  footerTagline: z.string().optional(),
  footerDescription: z.string().optional(),

  companyLinks: z.array(z.string()).optional(),
  solutionLinks: z.array(z.string()).optional(),
  resourceLinks: z.array(z.string()).optional(),
  legalLinks: z.array(z.string()).optional(),
});

const updateFooterSchema =
  createFooterSchema.partial();

module.exports = {
  createHomepageSchema,
  updateHomepageSchema,
  createFooterSchema,
  updateFooterSchema,
};