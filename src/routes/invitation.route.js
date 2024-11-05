import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { createInvitationSchema } from '../validations/invitation.js';
import * as invitationController from '../controllers/invitation.controller.js';

const router = express.Router();

router.post(
  '/',
  authenticate,
  authorizeAdmin,
  validate(createInvitationSchema),
  invitationController.createInvitation
);
router.get('/', authenticate, authorizeAdmin, invitationController.getInvitations);
router.get('/:id', authenticate, authorizeAdmin, invitationController.getInvitationById);

export default router;
