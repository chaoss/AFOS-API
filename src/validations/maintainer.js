import { z } from 'zod';

export const createMaintainerSchema = z.object({
 body: z.object({
  project_id: z.number().int().positive(),
  fullname: z.string().min(3).max(255),
  email: z.string().email(),
  linkedin_url: z.string().url().optional(),
  x_url: z.string().url().optional(),
 }),
});

export const updateMaintainerSchema = z.object({
 body: z.object({
  project_id: z.number().int().positive().optional(),
  fullname: z.string().min(3).max(255).optional(),
  email: z.string().email().optional(),
  linkedin_url: z.string().url().optional(),
  x_url: z.string().url().optional(),
 }),
});