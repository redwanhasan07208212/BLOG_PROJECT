import { z } from 'zod';

const blogModelSchema = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
  }),
});
const blogModelUpdateSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  }),
});

export const blogModelValidation = {
  blogModelSchema,
  blogModelUpdateSchema
};
