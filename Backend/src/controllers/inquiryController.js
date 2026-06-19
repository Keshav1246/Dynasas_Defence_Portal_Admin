const inquiryService = require('../services/inquiryService');
const apiResponse = require('../utils/apiResponse');
const AppError = require('../utils/AppError');
const activityLogService = require('../services/ActivityLogService');
const { viewerToDatabaseMap } = require('../constants/inquiryMapping');

/**
 * Controller to handle Contact & Inquiry Management HTTP requests
 */
class InquiryController {
  /**
   * Submit contact form (Public endpoint)
   */
  submitContact = async (req, res, next) => {
    try {
      const payload = { ...req.body };
      
      // Auto-generate subject if missing
      if (!payload.subject) {
        payload.subject = `New Inquiry from ${payload.fullName}`;
      }

      // Map Viewer labels to Database enum
      if (payload.type) {
        payload.inquiryType = viewerToDatabaseMap[payload.type] || 'CONTACT';
        delete payload.type;
      }

      const inquiry = await inquiryService.createInquiry(payload);
      res.status(201).json(apiResponse.success(inquiry, 'Your inquiry has been submitted successfully'));
    } catch (error) {
      next(error);
    }
  };

  /**
   * List all inquiries with search, status filtering, assignment filtering, and pagination (Admin endpoint)
   */
  getAllInquiries = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const { search, status, type, assignedTo } = req.query;

      const { data, total } = await inquiryService.getAllInquiries({
        page,
        limit,
        search,
        status,
        type,
        assignedTo,
      });

      res.status(200).json(
        apiResponse.paginated(
          data,
          { page, limit, total },
          'Inquiries list retrieved successfully'
        )
      );
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get stats for KPI cards
   */
  getStats = async (req, res, next) => {
    try {
      const stats = await inquiryService.getStats();
      res.status(200).json(apiResponse.success(stats, 'Stats retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get unread count for sidebar
   */
  getUnreadCount = async (req, res, next) => {
    try {
      const count = await inquiryService.getUnreadCount();
      res.status(200).json(apiResponse.success({ count }, 'Unread count retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get detail of a single inquiry (Admin endpoint)
   */
  getInquiryById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const inquiry = await inquiryService.getInquiryById(id);

      if (!inquiry) {
        throw new AppError('Inquiry not found', 404);
      }

      res.status(200).json(apiResponse.success(inquiry, 'Inquiry retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };

  /**
   * Edit inquiry details (Admin endpoint)
   */
  updateInquiry = async (req, res, next) => {
    try {
      const { id } = req.params;
      const inquiry = await inquiryService.getInquiryById(id);

      if (!inquiry) {
        throw new AppError('Inquiry not found', 404);
      }

      const updatedInquiry = await inquiryService.updateInquiry(id, req.body);
      res.status(200).json(apiResponse.success(updatedInquiry, 'Inquiry updated successfully'));
    } catch (error) {
      next(error);
    }
  };

  /**
   * Soft delete an inquiry (Admin endpoint)
   */
  deleteInquiry = async (req, res, next) => {
    try {
      const { id } = req.params;
      const inquiry = await inquiryService.getInquiryById(id);

      if (!inquiry) {
        throw new AppError('Inquiry not found', 404);
      }

      await inquiryService.deleteInquiry(id);
      res.status(200).json(apiResponse.success(null, 'Inquiry soft-deleted successfully'));
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update inquiry status (Admin endpoint)
   */
  updateInquiryStatus = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const inquiry = await inquiryService.getInquiryById(id);

      if (!inquiry) {
        throw new AppError('Inquiry not found', 404);
      }

      const updatedInquiry = await inquiryService.updateInquiryStatus(id, status);
      res.status(200).json(apiResponse.success(updatedInquiry, `Inquiry status changed to ${status} successfully`));

      activityLogService.logActivity({
        action: `Updated inquiry status to ${status}: ${updatedInquiry.subject}`,
        entityType: "Inquiry",
        entityId: updatedInquiry.id,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Assign inquiry to a team (Admin endpoint)
   */
  assignInquiry = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { assignedTeam } = req.body;

      const inquiry = await inquiryService.getInquiryById(id);

      if (!inquiry) {
        throw new AppError('Inquiry not found', 404);
      }

      const updatedInquiry = await inquiryService.assignInquiry(id, assignedTeam);

      // Email Delivery Verification Logging (Option B)
      const recipientEmail = "kushal.arora77@gmail.com";
      const prisma = require('../config/prisma');

      // Set initial pending state
      await prisma.inquiry.update({
        where: { id: parseInt(id, 10) },
        data: {
          emailStatus: 'PENDING',
          emailError: null,
          emailSent: false
        }
      });

      try {
        const emailService = require('../utils/emailService');
        await emailService.sendEmail({
          to: recipientEmail,
          subject: `New Inquiry Assigned: ${updatedInquiry.subject}`,
          html: `<p>A new inquiry has been assigned to your team.</p><p><strong>From:</strong> ${updatedInquiry.fullName} (${updatedInquiry.email})</p><p><strong>Subject:</strong> ${updatedInquiry.subject}</p>`
        });

        await prisma.inquiry.update({
          where: { id: parseInt(id, 10) },
          data: {
            emailStatus: 'SENT',
            emailSent: true,
            sentAt: new Date()
          }
        });
      } catch (err) {
        console.error("Failed to send email notification", err);
        await prisma.inquiry.update({
          where: { id: parseInt(id, 10) },
          data: {
            emailStatus: 'FAILED',
            emailSent: false,
            emailError: err.message || 'Unknown error'
          }
        });
      }

      // Re-fetch inquiry for the frontend
      const updatedInquiryWithDelivery = await inquiryService.getInquiryById(id);

      res.status(200).json(apiResponse.success(updatedInquiryWithDelivery, `Inquiry assigned to ${assignedTeam} successfully`));

      activityLogService.logActivity({
        action: `Assigned inquiry to ${assignedTeam}: ${updatedInquiry.subject}`,
        entityType: "Inquiry",
        entityId: updatedInquiry.id,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new InquiryController();
