const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

exports.getAllOffices = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, sort = "displayOrder", order = "asc", publicView = "false" } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);
    const orderBy = { [sort]: order === "desc" ? "desc" : "asc" };

    const where = { isDeleted: false };
    if (publicView === "true") {
      where.isActive = true;
    }

    const [offices, total] = await Promise.all([
      prisma.office.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      prisma.office.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: offices,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getOfficeById = async (req, res, next) => {
  try {
    const office = await prisma.office.findFirst({
      where: {
        id: req.params.id,
        isDeleted: false,
      },
    });

    if (!office) {
      return next(new AppError("Office not found", 404));
    }

    res.status(200).json({
      success: true,
      data: office,
    });
  } catch (error) {
    next(error);
  }
};

exports.createOffice = async (req, res, next) => {
  try {
    const office = await prisma.office.create({
      data: {
        ...req.body,
        isDeleted: false, // Ensure defaults
      },
    });

    res.status(201).json({
      success: true,
      data: office,
      message: "Office created successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateOffice = async (req, res, next) => {
  try {
    const existing = await prisma.office.findFirst({
      where: { id: req.params.id, isDeleted: false },
    });

    if (!existing) {
      return next(new AppError("Office not found", 404));
    }

    const office = await prisma.office.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      data: office,
      message: "Office updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteOffice = async (req, res, next) => {
  try {
    const existing = await prisma.office.findFirst({
      where: { id: req.params.id, isDeleted: false },
    });

    if (!existing) {
      return next(new AppError("Office not found", 404));
    }

    // Soft delete
    await prisma.office.update({
      where: { id: req.params.id },
      data: { isDeleted: true },
    });

    res.status(200).json({
      success: true,
      message: "Office deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
