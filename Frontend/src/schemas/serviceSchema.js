import { z } from 'zod';

export const serviceSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  subtitle: z.string().optional().or(z.literal('')),
  features: z.array(z.string()).optional(),
  ctaText: z.string().optional().or(z.literal('')),
  ctaLink: z.string().optional().or(z.literal('')),
  isActive: z.boolean().optional(),
  status: z.enum(["published", "draft", "archived"]),
  displayOrder: z.coerce.number().int().nonnegative("Display order cannot be negative").optional().default(0),
});
