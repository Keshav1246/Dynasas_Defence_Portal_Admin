const express = require('express');
const inquiryController = require('../controllers/inquiryController');
const validate = require('../middlewares/validate');
const {
  createContactSchema,
  listInquiriesSchema,
  inquiryIdParamSchema,
  updateInquirySchema,
  inquiryStatusSchema,
  inquiryAssignSchema,
} = require('../utils/inquiryValidation');

const contactRouter = express.Router();
const inquiryRouter = express.Router();

// 1. PUBLIC CONTACT ROUTE
contactRouter.post('/', validate(createContactSchema), inquiryController.submitContact);

// 2. ADMIN INQUIRY ROUTES
// Get inquiries stats
inquiryRouter.get('/stats', inquiryController.getStats);

// Get unread count
inquiryRouter.get('/unread-count', inquiryController.getUnreadCount);

// List inquiries with query filters and pagination
inquiryRouter.get('/', validate(listInquiriesSchema), inquiryController.getAllInquiries);

// Get single inquiry detail
inquiryRouter.get('/:id', validate(inquiryIdParamSchema), inquiryController.getInquiryById);

// Update inquiry detail fully/partially
inquiryRouter.put('/:id', validate(updateInquirySchema), inquiryController.updateInquiry);

// Soft delete an inquiry
inquiryRouter.delete('/:id', validate(inquiryIdParamSchema), inquiryController.deleteInquiry);

// Patch status (NEW/IN_PROGRESS/CLOSED)
inquiryRouter.patch('/:id/status', validate(inquiryStatusSchema), inquiryController.updateInquiryStatus);

// Assign inquiry to an admin
inquiryRouter.patch('/:id/assign', validate(inquiryAssignSchema), inquiryController.assignInquiry);

module.exports = {
  contactRouter,
  inquiryRouter,
};
