const AppError = require('../utils/AppError');

/**
 * Express middleware to validate request using Zod schema
 * @param {import('zod').ZodSchema} schema - Zod schema
 */
const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    
    // Assign validated and parsed/coerced values to request
    req.body = parsed.body || req.body;
    req.query = parsed.query || req.query;
    req.params = parsed.params || req.params;
    
    next();
  } catch (error) {
    // If Zod validation error, parse the specific fields and formatting
    if (error.name === 'ZodError') {
      const details = Array.isArray(error.errors)
        ? error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          }))
        : [{ field: 'unknown', message: error.message || 'Validation failed' }];
      return next(new AppError('Validation failed', 400, details));
    }
    next(error);
  }
};

module.exports = validate;
