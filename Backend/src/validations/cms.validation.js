const { z } = require("zod");

const createHomepageSchema = z.object({
  heroTitle: z
    .string()
    .min(2, "Hero title must be at least 2 characters"),

  heroSubtitle: z
    .string()
    .min(5, "Hero subtitle must be at least 5 characters"),

  ctaText: z
    .string()
    .min(2, "CTA text must be at least 2 characters"),

  ctaLink: z
  .string()
  .min(1, "CTA link is required"),

  heroImage: z
    .string()
    .min(1, "Hero image is required"),
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
});

const updateFooterSchema =
  createFooterSchema.partial();

module.exports = {
  createHomepageSchema,
  updateHomepageSchema,
  createFooterSchema,
  updateFooterSchema,
};