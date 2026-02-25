import { defineConfig } from 'astro/config';
import remarkPrefixIds from './remark-prefix-ids.mjs';
import rehypeSourceLines from './rehype-source-lines.mjs';
import commentsIntegration from './src/integrations/comments.ts';

export default defineConfig({
  site: 'https://johannessundman.github.io',
  base: '/after-the-boom',
  output: 'static',
  markdown: {
    remarkPlugins: [remarkPrefixIds],
    rehypePlugins: [rehypeSourceLines],
  },
  integrations: [commentsIntegration()],
});
