import { defineConfig } from 'astro/config';
import remarkPrefixIds from './remark-prefix-ids.mjs';

export default defineConfig({
  site: 'https://johannessundman.github.io',
  base: '/after-the-boom',
  output: 'static',
  markdown: {
    remarkPlugins: [remarkPrefixIds],
  },
});
