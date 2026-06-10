const express = require('express');
const partnerController = require('../controllers/partnerController');
const validate = require('../middlewares/validate');
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
router.post('/', validate(createPartnerSchema), partnerController.createPartner);

// Update a partner fully/partially by ID
router.put('/:id', validate(updatePartnerSchema), partnerController.updatePartner);

// Soft delete a partner by ID
router.delete('/:id', validate(partnerIdParamSchema), partnerController.deletePartner);

// Update status of a partner by ID (ACTIVE/INACTIVE)
router.patch('/:id/status', validate(partnerStatusSchema), partnerController.updatePartnerStatus);

module.exports = router;
