const prisma = require("../config/db");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const AppError = require("../utils/AppError");
const logger = require("../config/logger");
const activityLogService = require("../services/ActivityLogService");

const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return next(new AppError("Email already exists", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      user,
    });

    activityLogService.logActivity({
      action: `Created admin: ${user.name}`,
      entityType: "User",
      entityId: user.id,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return next(new AppError("Invalid email or password", 401));
    }

    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });

    res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
};
