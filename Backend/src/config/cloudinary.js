const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const env = require('./env');

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Extract file extension
    const extension = file.originalname.split('.').pop().toLowerCase();
    
    // Cloudinary resource types: 'image', 'video', 'raw'
    let resourceType = 'image';
    if (extension === 'pdf') {
      resourceType = 'raw';
    } else if (extension === 'mp4') {
      resourceType = 'video';
    } else if (extension === 'svg') {
      // SVG can be treated as image
      resourceType = 'image';
    }

    return {
      folder: 'dynasas_defence_portal',
      resource_type: resourceType,
      public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
    };
  },
});

module.exports = {
  cloudinary,
  storage,
};
