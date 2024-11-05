import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import {
 loginSchema,
 forgotPasswordSchema,
 resetPasswordSchema,
 changePasswordSchema,
} from '../validations/auth.js';
import * as authController from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/login', validate(loginSchema), authController.login);
authRouter.post(
 '/forgot-password',
 validate(forgotPasswordSchema),
 authController.forgotPassword
);
authRouter.post(
 '/reset-password',
 validate(resetPasswordSchema),
 authController.resetPassword
);
authRouter.post(
 '/change-password',
 authenticate,
 validate(changePasswordSchema),
 authController.changePassword
);
authRouter.post(
 '/accept-invitation',
 validate(acceptInvitationSchema),
 authController.acceptInvitation
);

export default authRouter;
