import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const rules = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/rules' }),
});

const campaigns = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/campaigns' }),
});

const dmScreen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dm-screen' }),
});

export const collections = { rules, campaigns, dmScreen };
