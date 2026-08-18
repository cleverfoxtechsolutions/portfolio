import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subject: z.string(),
    vector: z.string(),
    stack: z.array(z.string()),
    status: z.string(),
    summary: z.string(),
    order: z.number(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string(),
  }),
});

export const collections = { projects, writing };
