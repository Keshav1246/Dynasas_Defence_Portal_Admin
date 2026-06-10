const express = require('express');
const mediaController = require('../controllers/mediaController');
const upload = require('../middlewares/uploadMiddleware');
const validate = require('../middlewares/validate');
const { listMediaSchema, mediaIdParamSchema } = require('../utils/mediaValidation');

const router = express.Router();

// Upload file endpoint (requires multipart/form-data with field named 'file')
router.post('/upload', upload.single('file'), mediaController.uploadFile);

// Get all files with query validation for pagination, filtering, and searching
router.get('/', validate(listMediaSchema), mediaController.getAllFiles);

// Get single file detail
router.get('/:id', validate(mediaIdParamSchema), mediaController.getFileById);

// Delete file (soft-delete)
router.delete('/:id', validate(mediaIdParamSchema), mediaController.deleteFile);

module.exports = router;
