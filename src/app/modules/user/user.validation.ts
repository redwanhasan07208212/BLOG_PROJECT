import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    isblocked: z.boolean().optional(),
  }),
});
export const createUserRgisterValidation = {
  createUserValidationSchema,
};
