import { z } from 'zod';

export const createIssueSchema = z.object({
  owner: z.string().min(1, 'Repository owner is required').trim(),
  repo: z.string().min(1, 'Repository name is required').trim(),
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters')
    .trim(),
  body: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters')
    .trim(),
  accessToken: z.string().min(1, 'Access token is required').trim(),
});
