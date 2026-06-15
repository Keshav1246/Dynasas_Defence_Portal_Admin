const adminUsersService = require('../services/adminUsers.service');
const apiResponse = require('../utils/apiResponse');
const logger = require('../config/logger');

const getAllUsers = async (req, res, next) => {
  try {
    const { filter, search, page = 1, limit = 10 } = req.query;
    const { users, total } = await adminUsersService.getAllUsers(filter, search, Number(page), Number(limit));
    
    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        totalRecords: total,
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        limit: Number(limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const stats = await adminUsersService.getStats();
    res.status(200).json(apiResponse.success(stats, 'Stats fetched'));
  } catch (error) {
    next(error);
  }
};

const updateUserStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const user = await adminUsersService.updateUserStatus(req.params.id, status);
    res.status(200).json(apiResponse.success(user, 'User status updated'));
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await adminUsersService.updateUserRole(req.params.id, role);
    res.status(200).json(apiResponse.success(user, 'User role updated'));
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await adminUsersService.deleteUser(req.params.id);
    res.status(200).json(apiResponse.success(null, 'User deleted'));
  } catch (error) {
    next(error);
  }
};

const inviteUser = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    let invitedById = req.user?.id;

    if (!invitedById) {
      const prisma = require('../config/prisma');
      const defaultUser = await prisma.user.findFirst();
      if (!defaultUser) throw new Error('No users exist to invite from');
      invitedById = defaultUser.id;
    }
    
    const invite = await adminUsersService.inviteUser(name, email, role, invitedById);
    res.status(201).json(apiResponse.success(invite, 'Invitation sent'));
  } catch (error) {
    next(error);
  }
};

const cancelInvitation = async (req, res, next) => {
  try {
    const invite = await adminUsersService.cancelInvitation(req.params.id);
    res.status(200).json(apiResponse.success(invite, 'Invitation cancelled'));
  } catch (error) {
    next(error);
  }
};

const resendInvitation = async (req, res, next) => {
  try {
    const invite = await adminUsersService.resendInvitation(req.params.id);
    res.status(200).json(apiResponse.success(invite, 'Invitation resent'));
  } catch (error) {
    next(error);
  }
};

const getPermissions = async (req, res, next) => {
  try {
    const permissions = await adminUsersService.getPermissions();
    res.status(200).json(apiResponse.success(permissions, 'Permissions fetched'));
  } catch (error) {
    next(error);
  }
};

const updatePermissions = async (req, res, next) => {
  try {
    const { role, permissions } = req.body;
    const updated = await adminUsersService.updatePermissions(role, permissions);
    res.status(200).json(apiResponse.success(updated, 'Permissions updated'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getStats,
  updateUserStatus,
  updateUserRole,
  deleteUser,
  inviteUser,
  cancelInvitation,
  resendInvitation,
  getPermissions,
  updatePermissions
};
