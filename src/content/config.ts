import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  })
});

const caseStudyCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    client: z.string(),
    result: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  })
});

export const collections = {
  blog: blogCollection,
  casestudy: caseStudyCollection,
};
