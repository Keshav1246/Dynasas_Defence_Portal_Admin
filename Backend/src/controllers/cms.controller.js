const prisma = require("../config/db");
const logger = require("../config/logger");

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
    const homepageContent =
      await prisma.homepageContent.create({
        data: req.body,
      });

    res.status(201).json({
      success: true,
      message: "Homepage Content Created",
      data: homepageContent,
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
    const footerContent =
      await prisma.footerContent.create({
        data: req.body,
      });

    res.status(201).json({
      success: true,
      message: "Footer Content Created",
      data: footerContent,
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
};