const { z } = require("zod");

const createServiceSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  image: z.string().optional(),

  status: z
    .enum(["published", "draft"])
    .optional(),

  displayOrder: z
    .number()
    .int()
    .nonnegative("Display order cannot be negative")
    .optional(),
});

const updateServiceSchema =
  createServiceSchema.partial();

module.exports = {
  createServiceSchema,
  updateServiceSchema,
};