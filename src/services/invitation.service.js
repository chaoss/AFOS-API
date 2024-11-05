import * as invitationRepository from '../repositories/invitation.repository.js';

export const createInvitationService = async (
 inviterId,
 inviteeEmail,
 isSuperAdmin
) => {
 const existingInvitation = await invitationRepository.findPendingInvitation(
  inviteeEmail
 );

 if (existingInvitation) {
  throw new Error('Pending invitation already exists for this email');
 }

 const invitation = await invitationRepository.createInvitation(
  inviterId,
  inviteeEmail,
  isSuperAdmin
 );

 return {
  id: invitation.id,
  inviteeEmail: invitation.invitee_email,
  expiresAt: invitation.expires_at,
  token: invitation.token,
 };
};

export const getInvitationsService = async () => {
 const invitations = await invitationRepository.findAllInvitations();
 return invitations;
};

export const getInvitationByIdService = async (id) => {
 const invitation = await invitationRepository.findInvitationById(id);
 if (!invitation) {
  throw new Error('Invitation not found');
 }
 return invitation;
};
