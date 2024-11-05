import { z } from 'zod';

export const createInvitationSchema = z.object({
  body: z.object({
    invitee_email: z.string().email(),
    isSuperAdmin: z.boolean().optional(),
  }),
});

export const acceptInvitationSchema = z.object({
  body: z
    .object({
      token: z.string(),
      fullname: z.string().min(3).max(255),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }),
});
