import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    fullname: z.string().min(3).max(255),
    email: z.string().email(),
    isSuperAdmin: z.boolean().optional(),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    fullname: z.string().min(3).max(255).optional(),
    email: z.string().email().optional(),
    isSuperAdmin: z.boolean().optional(),
  }),
});
