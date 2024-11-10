import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { createIssueSchema } from '../validations/github.js';
import * as githubController from '../controllers/github.controller.js';

const router = express.Router();

router.get('/auth', githubController.initiateGithubAuth);
router.get('/callback', githubController.handleGithubCallback);
router.post(
  '/issues',
  authenticate,
  validate(createIssueSchema),
  githubController.createGithubIssue
);

export default router;
