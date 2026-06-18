const { z } = require("zod");

const createHomepageSchema = z.object({
  heroTitle: z.string().min(2),
  heroSubtitle: z.string().min(5),
  ctaText: z.string().min(2),
  ctaLink: z.string().url("Must be a valid URL"),
  heroImage: z.string().min(1),

  secondaryCtaText: z.string().optional(),
  secondaryCtaLink: z.string().url("Must be a valid URL").optional(),

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

const createServicesPageSchema = z.object({
  heroLabel: z.string().optional(),
  heroTitle: z.string().optional(),
  heroDescription: z.string().optional(),
  servicesNavigatorTitle: z.string().optional(),
});

const updateServicesPageSchema =
  createServicesPageSchema.partial();

module.exports = {
  createHomepageSchema,
  updateHomepageSchema,
  createFooterSchema,
  updateFooterSchema,
  createServicesPageSchema,
  updateServicesPageSchema,
};