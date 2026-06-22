const express = require('express');
const mediaController = require('../controllers/mediaController');
const upload = require('../middlewares/uploadMiddleware');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/auth.middleware');
const { listMediaSchema, mediaIdParamSchema } = require('../utils/mediaValidation');

const router = express.Router();

// Upload file endpoint (requires multipart/form-data with field named 'file')
router.post('/upload', authMiddleware, upload.single('file'), mediaController.uploadFile);

// Get all files with query validation for pagination, filtering, and searching
router.get('/', validate(listMediaSchema), mediaController.getAllFiles);

// Get media stats
router.get('/stats', mediaController.getStats);

// Get single file detail
router.get('/:id', validate(mediaIdParamSchema), mediaController.getFileById);

// Download file
router.get('/:id/download', validate(mediaIdParamSchema), mediaController.downloadFile);

// Delete file (soft-delete)
router.delete('/:id', authMiddleware, validate(mediaIdParamSchema), mediaController.deleteFile);

module.exports = router;
