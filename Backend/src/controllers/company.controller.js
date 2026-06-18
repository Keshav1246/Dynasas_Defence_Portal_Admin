const prisma = require("../config/db");
const logger = require("../config/logger");
const activityLogService = require("../services/ActivityLogService");
// trigger nodemon

const getCompanyProfile = async (req, res, next) => {
  try {
    const companyProfile = await prisma.companyProfile.findFirst({
      include: {
        statistics: {
          orderBy: { displayOrder: "asc" },
        },
        missionPillars: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

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
    const existing = await prisma.companyProfile.findFirst();
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Company profile already exists",
      });
    }

    const companyProfile = await prisma.companyProfile.create({
      data: req.body,
    });

    res.status(201).json({
      success: true,
      message: "Company Profile Created",
      data: companyProfile,
    });

    activityLogService.logActivity({
      action: `Created company profile: ${companyProfile.companyName}`,
      entityType: "CompanyProfile",
      entityId: companyProfile.id,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const updateCompanyProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const companyProfile = await prisma.companyProfile.update({
      where: { id },
      data: body,
    });

    res.status(200).json({
      success: true,
      message: "Company Profile Updated",
      data: companyProfile,
    });

    // Logging logic based on sections
    const aboutUsFields = ["companyName", "foundedYear", "headquarters", "registrationNumber", "overview", "logo"];
    const missionFields = ["missionTitle", "missionStatement"];
    const visionFields = ["visionTitle", "visionStatement", "longTermGoals"];
    const contactFields = ["generalEmail", "securityEmail", "mainPhone", "defenseContractsPhone", "mailingAddress", "website"];

    const hasAboutUs = aboutUsFields.some((f) => body[f] !== undefined);
    const hasMission = missionFields.some((f) => body[f] !== undefined);
    const hasVision = visionFields.some((f) => body[f] !== undefined);
    const hasContact = contactFields.some((f) => body[f] !== undefined);

    if (hasAboutUs) {
      activityLogService.logActivity({ action: "Updated company profile: About Us", entityType: "CompanyProfile", entityId: companyProfile.id });
    }
    if (hasMission) {
      activityLogService.logActivity({ action: "Updated company profile: Mission", entityType: "CompanyProfile", entityId: companyProfile.id });
    }
    if (hasVision) {
      activityLogService.logActivity({ action: "Updated company profile: Vision", entityType: "CompanyProfile", entityId: companyProfile.id });
    }
    if (hasContact) {
      activityLogService.logActivity({ action: "Updated company profile: Contact Information", entityType: "CompanyProfile", entityId: companyProfile.id });
    }

  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

// --- Statistics ---

const getStatistics = async (req, res, next) => {
  try {
    const statistics = await prisma.companyStatistic.findMany({
      orderBy: { displayOrder: "asc" },
    });
    res.status(200).json({ success: true, data: statistics });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const createStatistic = async (req, res, next) => {
  try {
    const profile = await prisma.companyProfile.findFirst();
    if (!profile) return res.status(404).json({ success: false, message: "Company profile not found" });

    const statistic = await prisma.companyStatistic.create({
      data: { ...req.body, companyProfileId: profile.id },
    });

    res.status(201).json({ success: true, message: "Statistic Created", data: statistic });
    activityLogService.logActivity({ action: "Created statistic", entityType: "CompanyStatistic", entityId: statistic.id });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const updateStatistic = async (req, res, next) => {
  try {
    const statistic = await prisma.companyStatistic.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.status(200).json({ success: true, message: "Statistic Updated", data: statistic });
    activityLogService.logActivity({ action: "Updated statistic", entityType: "CompanyStatistic", entityId: statistic.id });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const deleteStatistic = async (req, res, next) => {
  try {
    const statistic = await prisma.companyStatistic.delete({
      where: { id: req.params.id },
    });
    res.status(200).json({ success: true, message: "Statistic Deleted" });
    activityLogService.logActivity({ action: "Deleted statistic", entityType: "CompanyStatistic", entityId: statistic.id });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const reorderStatistics = async (req, res, next) => {
  try {
    const items = req.body;
    await prisma.$transaction(
      items.map((item) =>
        prisma.companyStatistic.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder },
        })
      )
    );
    res.status(200).json({ success: true, message: "Statistics Reordered" });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

// --- Mission Pillars ---

const getPillars = async (req, res, next) => {
  try {
    const pillars = await prisma.missionPillar.findMany({
      orderBy: { displayOrder: "asc" },
    });
    res.status(200).json({ success: true, data: pillars });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const createPillar = async (req, res, next) => {
  try {
    const profile = await prisma.companyProfile.findFirst();
    if (!profile) return res.status(404).json({ success: false, message: "Company profile not found" });

    const pillar = await prisma.missionPillar.create({
      data: { ...req.body, companyProfileId: profile.id },
    });

    res.status(201).json({ success: true, message: "Pillar Created", data: pillar });
    activityLogService.logActivity({ action: "Created mission pillar", entityType: "MissionPillar", entityId: pillar.id });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const updatePillar = async (req, res, next) => {
  try {
    const pillar = await prisma.missionPillar.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.status(200).json({ success: true, message: "Pillar Updated", data: pillar });
    activityLogService.logActivity({ action: "Updated mission pillar", entityType: "MissionPillar", entityId: pillar.id });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const deletePillar = async (req, res, next) => {
  try {
    const pillar = await prisma.missionPillar.delete({
      where: { id: req.params.id },
    });
    res.status(200).json({ success: true, message: "Pillar Deleted" });
    activityLogService.logActivity({ action: "Deleted mission pillar", entityType: "MissionPillar", entityId: pillar.id });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const reorderPillars = async (req, res, next) => {
  try {
    const items = req.body;
    await prisma.$transaction(
      items.map((item) =>
        prisma.missionPillar.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder },
        })
      )
    );
    res.status(200).json({ success: true, message: "Pillars Reordered" });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

module.exports = {
  getCompanyProfile,
  createCompanyProfile,
  updateCompanyProfile,
  getStatistics,
  createStatistic,
  updateStatistic,
  deleteStatistic,
  reorderStatistics,
  getPillars,
  createPillar,
  updatePillar,
  deletePillar,
  reorderPillars,
};
