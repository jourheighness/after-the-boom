import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const rules = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/rules' }),
});

export const collections = { rules };
