const express = require('express');
const partnerController = require('../controllers/partnerController');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/auth.middleware');
const {
  listPartnersSchema,
  partnerIdParamSchema,
  createPartnerSchema,
  updatePartnerSchema,
  partnerStatusSchema,
} = require('../utils/partnerValidation');

const router = express.Router();

// Get all partners with validation for pagination, filtering, and search query parameters
router.get('/', validate(listPartnersSchema), partnerController.getAllPartners);

// Get single partner by ID
router.get('/:id', validate(partnerIdParamSchema), partnerController.getPartnerById);

// Create a new partner
router.post('/', authMiddleware, validate(createPartnerSchema), partnerController.createPartner);

// Update a partner fully/partially by ID
router.put('/:id', authMiddleware, validate(updatePartnerSchema), partnerController.updatePartner);

// Soft delete a partner by ID
router.delete('/:id', authMiddleware, validate(partnerIdParamSchema), partnerController.deletePartner);

// Update status of a partner by ID (ACTIVE/INACTIVE)
router.patch('/:id/status', authMiddleware, validate(partnerStatusSchema), partnerController.updatePartnerStatus);

module.exports = router;
