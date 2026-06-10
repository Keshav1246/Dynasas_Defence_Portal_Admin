const prisma = require("../config/db");
const AppError = require("../utils/AppError");
const logger = require("../config/logger");

const getAllServices = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);

    const skip = (page - 1) * limit;

    const totalServices = await prisma.service.count();

    const services = await prisma.service.findMany({
      skip,
      take: limit,

      orderBy: {
        displayOrder: "asc",
      },
    });

    res.status(200).json({
      success: true,

      pagination: {
        total: totalServices,
        page,
        limit,
        totalPages: Math.ceil(totalServices / limit),
      },

      data: services,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      return next(new AppError("Service not found", 404));
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const createService = async (req, res, next) => {
  try {
    const service = await prisma.service.create({
      data: req.body,
    });

    res.status(201).json({
      success: true,
      message: "Service Created Successfully",
      data: service,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.update({
      where: { id },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      message: "Service Updated Successfully",
      data: service,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.service.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Service Deleted Successfully",
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
