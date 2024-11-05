import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { updateUserSchema } from '../validations/user.js';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', authenticate, authorizeAdmin, userController.getUsers);
router.get('/:id', authenticate, authorizeAdmin, userController.getUserById);
router.put(
  '/:id',
  authenticate,
  authorizeAdmin,
  validate(updateUserSchema),
  userController.updateUser
);
router.delete('/:id', authenticate, authorizeAdmin, userController.deleteUser);

export default router;
