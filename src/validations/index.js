import { createAchievementSchema, updateAchievementSchema } from './achievement.js';
import { updateMaintainerSchema, createMaintainerSchema } from './maintainer.js';
import { createProjectSchema, updateProjectSchema } from './project.js';
import { createUserSchema, updateUserSchema } from './user.js';
import {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from './auth.js';
import { createInvitationSchema, acceptInvitationSchema } from './invitation.js';

export {
  createAchievementSchema,
  updateAchievementSchema,
  createMaintainerSchema,
  updateMaintainerSchema,
  createProjectSchema,
  updateProjectSchema,
  createUserSchema,
  updateUserSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  createInvitationSchema,
  acceptInvitationSchema,
};
