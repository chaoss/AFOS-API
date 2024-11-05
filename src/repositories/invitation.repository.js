import { Invitation, User } from '../models/index.js';
import crypto from 'crypto';

export const createInvitation = (inviterId, inviteeEmail, isSuperAdmin) => {
  const token = crypto.randomBytes(32).toString('hex');
  const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  return Invitation.create({
    inviter_id: inviterId,
    invitee_email: inviteeEmail,
    isSuperAdmin,
    token,
    expires_at,
  });
};

export const findPendingInvitation = (inviteeEmail) => {
  return Invitation.findOne({
    where: {
      invitee_email: inviteeEmail,
      status: 'pending',
    },
  });
};

export const findAllInvitations = () => {
  return Invitation.findAll({
    include: [
      {
        model: User,
        as: 'inviter',
        attributes: ['id', 'fullname', 'email'],
      },
    ],
  });
};

export const findInvitationById = (id) => {
  return Invitation.findByPk(id, {
    include: [
      {
        model: User,
        as: 'inviter',
        attributes: ['id', 'fullname', 'email'],
      },
    ],
  });
};
