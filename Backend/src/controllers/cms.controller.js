const prisma = require("../config/db");
const logger = require("../config/logger");
const activityLogService = require("../services/ActivityLogService");

const getHomepageContent = async (req, res, next) => {
  try {
    const homepageContent =
      await prisma.homepageContent.findFirst();

    res.status(200).json({
      success: true,
      data: homepageContent,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const createHomepageContent = async (req, res, next) => {
  try {
    const existing =
      await prisma.homepageContent.findFirst();

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Homepage content already exists",
      });
    }
    const homepageContent =
      await prisma.homepageContent.create({
        data: req.body,
      });

    res.status(201).json({
      success: true,
      message: "Homepage Content Created",
      data: homepageContent,
    });

    activityLogService.logActivity({
      action: `Created homepage content: Homepage`,
      entityType: "HomepageContent",
      entityId: homepageContent.id,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const updateHomepageContent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const homepageContent =
      await prisma.homepageContent.update({
        where: { id },
        data: req.body,
      });

    res.status(200).json({
      success: true,
      message: "Homepage Content Updated",
      data: homepageContent,
    });

    activityLogService.logActivity({
      action: `Updated homepage content: Homepage`,
      entityType: "HomepageContent",
      entityId: homepageContent.id,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const getFooterContent = async (req, res, next) => {
  try {
    const footerContent =
      await prisma.footerContent.findFirst();

    res.status(200).json({
      success: true,
      data: footerContent,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const createFooterContent = async (req, res, next) => {
  try {
    const existing =
      await prisma.footerContent.findFirst();

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Footer content already exists",
      });
    }
    const footerContent =
      await prisma.footerContent.create({
        data: req.body,
      });

    res.status(201).json({
      success: true,
      message: "Footer Content Created",
      data: footerContent,
    });

    activityLogService.logActivity({
      action: `Created footer content: Footer`,
      entityType: "FooterContent",
      entityId: footerContent.id,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const updateFooterContent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const footerContent =
      await prisma.footerContent.update({
        where: { id },
        data: req.body,
      });

    res.status(200).json({
      success: true,
      message: "Footer Content Updated",
      data: footerContent,
    });

    activityLogService.logActivity({
      action: `Updated footer settings`,
      entityType: "FooterContent",
      entityId: footerContent.id,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const getServicesPageContent = async (req, res, next) => {
  try {
    const servicesPageContent =
      await prisma.servicesPageContent.findFirst();

    res.status(200).json({
      success: true,
      data: servicesPageContent,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const createServicesPageContent = async (req, res, next) => {
  try {
    const existing =
      await prisma.servicesPageContent.findFirst();

    let servicesPageContent;

    if (existing) {
      servicesPageContent = await prisma.servicesPageContent.update({
        where: { id: existing.id },
        data: req.body,
      });

      res.status(200).json({
        success: true,
        message: "Services Page Content Updated",
        data: servicesPageContent,
      });

      activityLogService.logActivity({
        action: `Updated services page content: Services`,
        entityType: "ServicesPageContent",
        entityId: servicesPageContent.id,
      });
    } else {
      servicesPageContent = await prisma.servicesPageContent.create({
        data: req.body,
      });

      res.status(201).json({
        success: true,
        message: "Services Page Content Created",
        data: servicesPageContent,
      });

      activityLogService.logActivity({
        action: `Created services page content: Services`,
        entityType: "ServicesPageContent",
        entityId: servicesPageContent.id,
      });
    }
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const updateServicesPageContent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const servicesPageContent =
      await prisma.servicesPageContent.update({
        where: { id },
        data: req.body,
      });

    res.status(200).json({
      success: true,
      message: "Services Page Content Updated",
      data: servicesPageContent,
    });

    activityLogService.logActivity({
      action: `Updated services page content`,
      entityType: "ServicesPageContent",
      entityId: servicesPageContent.id,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

module.exports = {
  getHomepageContent,
  createHomepageContent,
  updateHomepageContent,
  getFooterContent,
  createFooterContent,
  updateFooterContent,
  getServicesPageContent,
  createServicesPageContent,
  updateServicesPageContent,
};