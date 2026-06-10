const { z } = require('zod');

const listMediaSchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? Math.max(1, parseInt(val, 10)) : 1)),
    limit: z.string().optional().transform((val) => (val ? Math.min(100, Math.max(1, parseInt(val, 10))) : 10)),
    search: z.string().max(100).optional(),
    fileType: z.string().max(100).optional(),
  }),
});

const mediaIdParamSchema = z.object({
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

module.exports = {
  listMediaSchema,
  mediaIdParamSchema,
};
