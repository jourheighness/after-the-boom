import { defineConfig } from 'astro/config';
import remarkPrefixIds from './remark-prefix-ids.mjs';
import rehypeSourceLines from './rehype-source-lines.mjs';
import commentsIntegration from './src/integrations/comments.ts';
import editorIntegration from './src/integrations/editor.ts';

export default defineConfig({
  site: 'https://johannessundman.github.io',
  base: '/after-the-boom',
  output: 'static',
  markdown: {
    remarkPlugins: [remarkPrefixIds],
    rehypePlugins: [rehypeSourceLines],
  },
  integrations: [commentsIntegration(), editorIntegration()],
  vite: {
    resolve: {
      alias: {
        '@crepe-theme': new URL('./node_modules/@milkdown/crepe/lib/theme', import.meta.url).pathname,
      },
    },
  },
});
