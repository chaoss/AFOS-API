import { z } from 'zod';

export const createProjectSchema = z.object({
 body: z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(10),
  url: z.string().url(),
  license_status: z.enum(['licensed', 'not licensed']),
  license_details: z.enum([
   'MIT License',
   'Apache License 2.0',
   'BSD License (2-Clause and 3-Clause)',
   'Microsoft Public License (MS-PL)',
   'Zlib License',
   'GNU General Public License (GPL) 2.0 & 3.0',
   'GNU Lesser General Public License (LGPL)',
   'Affero General Public License (AGPL)',
   'Mozilla Public License 2.0 (MPL)',
   'Creative Commons Zero (CC0)',
   'Unlicense',
   'Eclipse Public License (EPL)',
   'Common Development and Distribution License (CDDL)',
   'SIL Open Font License (OFL)',
   'End User License Agreement (EULA)',
   'Proprietary License',
   'Subscription-Based License',
   'Trial or Evaluation License',
  ]),
  category: z.string(),
  country: z.string(),
  logo_url: z.string().url().optional(),
  maintainers: z.array(
   z.object({
    fullname: z.string(),
    email: z.string().email(),
    linkedin_url: z.string().url().optional(),
    x_url: z.string().url().optional(),
   })
  ),
  achievements: z
   .array(
    z.object({
     item: z.string(),
    })
   )
   .optional(),
 }),
});

export const updateProjectSchema = z.object({
 body: z.object({
  title: z.string().min(3).max(255).optional(),
  description: z.string().min(10).optional(),
  url: z.string().url().optional(),
  license_status: z.enum(['licensed', 'not licensed']).optional(),
  license_details: z
   .enum([
    'MIT License',
    'Apache License 2.0',
    'BSD License (2-Clause and 3-Clause)',
    'Microsoft Public License (MS-PL)',
    'Zlib License',
    'GNU General Public License (GPL) 2.0 & 3.0',
    'GNU Lesser General Public License (LGPL)',
    'Affero General Public License (AGPL)',
    'Mozilla Public License 2.0 (MPL)',
    'Creative Commons Zero (CC0)',
    'Unlicense',
    'Eclipse Public License (EPL)',
    'Common Development and Distribution License (CDDL)',
    'SIL Open Font License (OFL)',
    'End User License Agreement (EULA)',
    'Proprietary License',
    'Subscription-Based License',
    'Trial or Evaluation License',
   ])
   .optional(),
  category: z.string().optional(),
  country: z.string().optional(),
  logo_url: z.string().url().optional(),
  maintainers: z
   .array(
    z.object({
     fullname: z.string(),
     email: z.string().email(),
     linkedin_url: z.string().url().optional(),
     x_url: z.string().url().optional(),
    })
   )
   .optional(),
  achievements: z
   .array(
    z.object({
     item: z.string(),
    })
   )
   .optional(),
 }),
});
