const multer = require('multer');
const { storage } = require('../config/cloudinary');
const AppError = require('../utils/AppError');

// Allowed file formats and corresponding MIME types
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'svg', 'pdf', 'mp4'];
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'application/pdf',
  'video/mp4',
];

/**
 * Filter uploaded files based on extension and MIME type
 */
const fileFilter = (req, file, cb) => {
  const fileExtension = file.originalname.split('.').pop().toLowerCase();
  
  if (!ALLOWED_EXTENSIONS.includes(fileExtension) || !ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(
      new AppError(
        `File type not allowed. Allowed extensions: ${ALLOWED_EXTENSIONS.join(', ')}`,
        400
      ),
      false
    );
  }
  
  cb(null, true);
};

// Setup Multer instance with Cloudinary Storage
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: fileFilter,
});

module.exports = upload;
