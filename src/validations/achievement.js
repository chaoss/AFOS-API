import { z } from 'zod';

export const createAchievementSchema = z.object({
  body: z.object({
    project_id: z.number().int().positive(),
    item: z.string().min(3),
  }),
});

export const updateAchievementSchema = z.object({
  body: z.object({
    project_id: z.number().int().positive().optional(),
    item: z.string().min(3).optional(),
  }),
});
