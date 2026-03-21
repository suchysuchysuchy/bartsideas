// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bartsideas.com',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
