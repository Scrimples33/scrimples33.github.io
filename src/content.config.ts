import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        date: z.coerce.date(),
        summary: z.string(),
        cover: image().optional(),
        coverAlt: z.string().optional(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
      })
      .refine((post) => !post.cover || Boolean(post.coverAlt?.trim()), {
        message: 'coverAlt is required when a cover image is set.',
        path: ['coverAlt'],
      }),
});

const artworks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artworks' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Tag names from src/data/tags.json (any spelling/case). At least one.
      tags: z.array(z.string()).min(1),
      date: z.coerce.date(),
      medium: z.string(),
      size: z.string().optional(),
      description: z.string().default(''),
      image: image(),
      imageAlt: z.string(),
      featured: z.boolean().default(false),
      // available = original for sale; sold; commission = private commission; nfs = not for sale (no badge)
      availability: z.enum(['available', 'sold', 'commission', 'nfs']).default('nfs'),
    }),
});

export const collections = { posts, artworks };
