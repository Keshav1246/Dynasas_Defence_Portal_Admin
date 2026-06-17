const mediaService = require('../services/mediaService');
const apiResponse = require('../utils/apiResponse');
const AppError = require('../utils/AppError');
const activityLogService = require('../services/ActivityLogService');
const https = require('https');

/**
 * Controller to handle Media Library HTTP requests
 */
class MediaController { 
  /**
   * Upload and register a new file
   */
  uploadFile = async (req, res, next) => {
    try {
      if (!req.file) {
        throw new AppError('No file uploaded', 400);
      }

      const fileData = {
        fileName: req.file.filename,
        originalName: req.file.originalname,
        fileUrl: req.file.path,
        fileType: req.file.mimetype,
        size: req.file.size,
      };

      const media = await mediaService.uploadFile(fileData);

      res
        .status(201)
        .json(
          apiResponse.success(
            media,
            'File uploaded and registered successfully'
          )
        );

      activityLogService.logActivity({
        action: `Uploaded media: ${media.originalName}`,
        entityType: "Media",
        entityId: media.id,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * List all uploaded files with filters and pagination
   */
  getAllFiles = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const { search, fileType } = req.query;

      const { data, total } = await mediaService.getAllFiles({
        page,
        limit,
        search,
        fileType,
      });

      res.status(200).json(
        apiResponse.paginated(
          data,
          { page, limit, total },
          'Files retrieved successfully'
        )
      );
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get metadata for a single file
   */
  getFileById = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);

      const media = await mediaService.getFileById(id);

      if (!media) {
        throw new AppError('File not found', 404);
      }

      res
        .status(200)
        .json(apiResponse.success(media, 'File retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Soft delete a file
   */
  deleteFile = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);

      const media = await mediaService.getFileById(id);

      if (!media) {
        throw new AppError('File not found', 404);
      }

      await mediaService.deleteFile(id);

      res
        .status(200)
        .json(apiResponse.success(null, 'File soft-deleted successfully'));

      activityLogService.logActivity({
        action: `Deleted media: ${media.originalName}`,
        entityType: "Media",
        entityId: id,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Download a file
   */
  downloadFile = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const media = await mediaService.getFileById(id);

      if (!media) {
        throw new AppError('File not found', 404);
      }

      // Check if URL is cloudinary
      const fileUrl = media.fileUrl;
      const fileName = media.originalName || media.fileName;

      // Ensure appropriate headers are set for download
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      if (media.fileType) {
        res.setHeader('Content-Type', media.fileType);
      }

      if (fileUrl.startsWith('http')) {
        https.get(fileUrl, (stream) => {
          stream.pipe(res);
        }).on('error', (err) => {
          next(new AppError('Failed to download file stream', 500));
        });
      } else {
        // Local file
        const fs = require('fs');
        const path = require('path');
        const localPath = path.resolve(fileUrl);
        if (fs.existsSync(localPath)) {
          fs.createReadStream(localPath).pipe(res);
        } else {
          throw new AppError('Local file not found', 404);
        }
      }
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get media stats
   */
  getStats = async (req, res, next) => {
    try {
      const stats = await mediaService.getMediaStats();
      res.status(200).json(apiResponse.success(stats, 'Media stats retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new MediaController();