import * as invitationRepository from '../repositories/invitation.repository.js';

class InvitationService {
  async createInvitation(inviterId, inviteeEmail, isSuperAdmin) {
    const existingInvitation = await invitationRepository.findPendingInvitation(inviteeEmail);

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
  }

  async getInvitations() {
    const invitations = await invitationRepository.findAllInvitations();
    return invitations;
  }

  async getInvitationById(id) {
    const invitation = await invitationRepository.findInvitationById(id);
    if (!invitation) {
      throw new Error('Invitation not found');
    }
    return invitation;
  }
}

export default new InvitationService();
