const prisma = require('../config/prisma');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../utils/emailService');
const AppError = require('../utils/AppError');

const getAllUsers = async (filter, search, page, limit) => {
  const userWhere = {};
  const inviteWhere = { status: 'PENDING' }; // Only show pending invites in the user list


  
  if (search) {
    userWhere.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ];
    inviteWhere.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [users, invites] = await Promise.all([
    prisma.user.findMany({
      where: userWhere,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,

        status: true,
        lastLogin: true,
        createdAt: true,
      }
    }),
    prisma.userInvitation.findMany({
      where: inviteWhere,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,

        status: true,
        createdAt: true,
      }
    })
  ]);

  // Merge and sort by createdAt desc
  const allRecords = [...users, ...invites].sort((a, b) => b.createdAt - a.createdAt);
  
  const total = allRecords.length;
  const skip = (page - 1) * limit;
  const paginatedUsers = allRecords.slice(skip, skip + limit);

  return { users: paginatedUsers, total };
};

const updateUserStatus = async (id, status) => {
  return prisma.user.update({
    where: { id },
    data: { status },
    select: { id: true, status: true }
  });
};

const deleteUser = async (id) => {
  return prisma.user.delete({
    where: { id }
  });
};

const inviteUser = async (name, email, invitedById) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new AppError('User already exists', 400);

  // Check if active invitation exists
  const existingInvite = await prisma.userInvitation.findUnique({ where: { email } });
  if (existingInvite && existingInvite.status === 'PENDING') {
    await prisma.userInvitation.delete({ where: { email } });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days valid

  const invite = await prisma.userInvitation.create({
    data: {
      name,
      email,

      invitationToken: token,
      expiresAt,
      invitedById
    }
  });

  const inviteLink = `http://localhost:5173/setup-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: 'You have been invited to Dynasoft Admin Portal',
    html: `
      <h2>Welcome ${name}!</h2>
      <p>You have been invited to join the Dynasoft Admin Portal.</p>
      <p>Click the link below to set up your password and access the portal:</p>
      <a href="${inviteLink}" style="display:inline-block;padding:10px 20px;background:#ff5a36;color:#fff;text-decoration:none;border-radius:5px;">Set up your account</a>
      <p>This link expires in 7 days.</p>
    `
  });

  return invite;
};

const cancelInvitation = async (id) => {
  return prisma.userInvitation.update({
    where: { id },
    data: { status: 'CANCELLED' }
  });
};

const resendInvitation = async (id) => {
  const invite = await prisma.userInvitation.findUnique({ where: { id } });
  if (!invite) throw new AppError('Invitation not found', 404);

  const inviteLink = `http://localhost:5173/setup-password?token=${invite.invitationToken}`;

  await sendEmail({
    to: invite.email,
    subject: 'Reminder: You have been invited to Dynasoft Admin Portal',
    html: `
      <h2>Welcome ${invite.name}!</h2>
      <p>This is a reminder that you have been invited to join the Dynasoft Admin Portal.</p>
      <p>Click the link below to set up your password and access the portal:</p>
      <a href="${inviteLink}" style="display:inline-block;padding:10px 20px;background:#ff5a36;color:#fff;text-decoration:none;border-radius:5px;">Set up your account</a>
      <p>This link expires soon.</p>
    `
  });

  return invite;
};



module.exports = {
  getAllUsers,
  updateUserStatus,
  deleteUser,
  inviteUser,
  cancelInvitation,
  resendInvitation
};
