const prisma = require("../config/db");
const logger = require("../config/logger");

const getCompanyProfile = async (req, res, next) => {
  try {
    const companyProfile = await prisma.companyProfile.findFirst();

    res.status(200).json({
      success: true,
      data: companyProfile,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const createCompanyProfile = async (req, res, next) => {
  try {
    const companyProfile = await prisma.companyProfile.create({
      data: req.body,
    });

    res.status(201).json({
      success: true,
      message: "Company Profile Created",
      data: companyProfile,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const updateCompanyProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const companyProfile = await prisma.companyProfile.update({
      where: { id },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      message: "Company Profile Updated",
      data: companyProfile,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

module.exports = {
  getCompanyProfile,
  createCompanyProfile,
  updateCompanyProfile,
};
