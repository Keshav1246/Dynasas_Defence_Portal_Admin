const express = require('express');
const inquiryController = require('../controllers/inquiryController');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/auth.middleware');
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
inquiryRouter.get('/stats', authMiddleware, inquiryController.getStats);

// Get unread count
inquiryRouter.get('/unread-count', authMiddleware, inquiryController.getUnreadCount);

// List inquiries with query filters and pagination
inquiryRouter.get('/', authMiddleware, validate(listInquiriesSchema), inquiryController.getAllInquiries);

// Get single inquiry detail
inquiryRouter.get('/:id', authMiddleware, validate(inquiryIdParamSchema), inquiryController.getInquiryById);

// Update inquiry detail fully/partially
inquiryRouter.put('/:id', authMiddleware, validate(updateInquirySchema), inquiryController.updateInquiry);

// Soft delete an inquiry
inquiryRouter.delete('/:id', authMiddleware, validate(inquiryIdParamSchema), inquiryController.deleteInquiry);

// Patch status (NEW/IN_PROGRESS/CLOSED)
inquiryRouter.patch('/:id/status', authMiddleware, validate(inquiryStatusSchema), inquiryController.updateInquiryStatus);

// Assign inquiry to an admin
inquiryRouter.patch('/:id/assign', authMiddleware, validate(inquiryAssignSchema), inquiryController.assignInquiry);

module.exports = {
  contactRouter,
  inquiryRouter,
};
