/**
 * Standard API Response helpers for consistent responses.
 */

/**
 * Format a successful API response
 * @param {any} data - Core payload
 * @param {string} [message] - Success message
 * @returns {object}
 */
const success = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data,
  };
};

/**
 * Format a paginated successful API response
 * @param {any[]} data - Listing data array
 * @param {object} paginationDetails - Pagination meta
 * @param {number} paginationDetails.page - Current page number
 * @param {number} paginationDetails.limit - Limit per page
 * @param {number} paginationDetails.total - Total items in database
 * @param {string} [message] - Success message
 * @returns {object}
 */
const paginated = (data, { page, limit, total }, message = 'Success') => {
  const totalPages = Math.ceil(total / limit);
  return {
    success: true,
    message,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
};

module.exports = {
  success,
  paginated,
};
