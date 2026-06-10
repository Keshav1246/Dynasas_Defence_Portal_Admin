const inquiryService = require('../services/inquiryService');
const apiResponse = require('../utils/apiResponse');
const AppError = require('../utils/AppError');

/**
 * Controller to handle Contact & Inquiry Management HTTP requests
 */
class InquiryController {
  /**
   * Submit contact form (Public endpoint)
   */
  submitContact = async (req, res, next) => {
    try {
      const inquiry = await inquiryService.createInquiry(req.body);
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
    const { search, status, assignedTo } = req.query;

    const { data, total } = await inquiryService.getAllInquiries({
      page,
      limit,
      search,
      status,
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
    } catch (error) {
      next(error);
    }
  };

  /**
   * Assign inquiry to an admin (Admin endpoint)
   */
  assignInquiry = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { assignedTo } = req.body;

      const inquiry = await inquiryService.getInquiryById(id);

      if (!inquiry) {
        throw new AppError('Inquiry not found', 404);
      }

      const updatedInquiry = await inquiryService.assignInquiry(id, assignedTo);
      res.status(200).json(apiResponse.success(updatedInquiry, `Inquiry assigned to ${assignedTo} successfully`));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new InquiryController();
