// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // ✏️ Adres docelowy strony — przy zmianie domeny podmień tylko tę linijkę.
  site: 'https://bartsideas.com',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
