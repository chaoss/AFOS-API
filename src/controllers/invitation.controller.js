import invitationService from '../services/invitation.service.js';

export const createInvitation = async (req, res) => {
  try {
    const { invitee_email, isSuperAdmin } = req.body;
    const result = await invitationService.createInvitation(
      req.user.id,
      invitee_email,
      isSuperAdmin
    );

    return res.status(201).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const getInvitations = async (req, res) => {
  try {
    const invitations = await invitationService.getInvitations();

    return res.status(200).json({
      status: 'success',
      data: invitations,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const getInvitationById = async (req, res) => {
  try {
    const invitation = await invitationService.getInvitationById(req.params.id);

    return res.status(200).json({
      status: 'success',
      data: invitation,
    });
  } catch (error) {
    return res.status(404).json({
      status: 'error',
      message: error.message,
    });
  }
};
