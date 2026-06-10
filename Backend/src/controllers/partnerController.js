const partnerService = require('../services/partnerService');
const apiResponse = require('../utils/apiResponse');
const AppError = require('../utils/AppError');

/**
 * Controller to handle Partner Management HTTP requests
 */
class PartnerController {
  /**
   * Add a new partner
   */
  createPartner = async (req, res, next) => {
    try {
      const partner = await partnerService.createPartner(req.body);
      res.status(201).json(apiResponse.success(partner, 'Partner added successfully'));
    } catch (error) {
      next(error);
    }
  };

  /**
   * List all partners with search, filtering, and pagination
   */
  getAllPartners = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const { search, status, category } = req.query;

    const { data, total } = await partnerService.getAllPartners({
      page,
      limit,
      search,
      status,
      category,
    });

    res.status(200).json(
      apiResponse.paginated(
        data,
        { page, limit, total },
        'Partners list retrieved successfully'
      )
    );
  } catch (error) {
    next(error);
  }
};

  /**
   * Get a single partner's details
   */
  getPartnerById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const partner = await partnerService.getPartnerById(id);

      if (!partner) {
        throw new AppError('Partner not found', 404);
      }

      res.status(200).json(apiResponse.success(partner, 'Partner retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };

  /**
   * Edit a partner's details
   */
  updatePartner = async (req, res, next) => {
    try {
      const { id } = req.params;
      const partner = await partnerService.getPartnerById(id);

      if (!partner) {
        throw new AppError('Partner not found', 404);
      }

      const updatedPartner = await partnerService.updatePartner(id, req.body);
      res.status(200).json(apiResponse.success(updatedPartner, 'Partner updated successfully'));
    } catch (error) {
      next(error);
    }
  };

  /**
   * Soft delete a partner
   */
  deletePartner = async (req, res, next) => {
    try {
      const { id } = req.params;
      const partner = await partnerService.getPartnerById(id);

      if (!partner) {
        throw new AppError('Partner not found', 404);
      }

      await partnerService.deletePartner(id);
      res.status(200).json(apiResponse.success(null, 'Partner soft-deleted successfully'));
    } catch (error) {
      next(error);
    }
  };

  /**
   * Change a partner's active status
   */
  updatePartnerStatus = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const partner = await partnerService.getPartnerById(id);

      if (!partner) {
        throw new AppError('Partner not found', 404);
      }

      const updatedPartner = await partnerService.updatePartnerStatus(id, status);
      res.status(200).json(apiResponse.success(updatedPartner, `Partner status changed to ${status} successfully`));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new PartnerController();
