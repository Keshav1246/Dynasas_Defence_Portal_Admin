const express = require('express');
const router = express.Router();
const adminUsersController = require('../controllers/adminUsers.controller');

// Note: No auth middleware enforced during dev based on current portal rules, but you can add later.

router.get('/', adminUsersController.getAllUsers);
router.get('/stats', adminUsersController.getStats);
router.patch('/:id/status', adminUsersController.updateUserStatus);
router.patch('/:id/role', adminUsersController.updateUserRole);
router.delete('/:id', adminUsersController.deleteUser);

// Invitations
router.post('/invite', adminUsersController.inviteUser);
router.post('/invite/resend/:id', adminUsersController.resendInvitation);
router.post('/invite/cancel/:id', adminUsersController.cancelInvitation);

// Permissions
router.get('/permissions', adminUsersController.getPermissions);
router.put('/permissions', adminUsersController.updatePermissions);

module.exports = router;
