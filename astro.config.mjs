// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { NOINDEX_PATHS } from './src/config';

export default defineConfig({
  // ✏️ Adres docelowy strony — przy zmianie domeny podmień tylko tę linijkę
  // (robots.txt i sitemapa generują się z tej wartości automatycznie).
  site: 'https://bartsideas.com',
  build: {
    // Płaskie pliki .html — adresy bez ukośnika na końcu serwowane są
    // przez Cloudflare bez przekierowań 307.
    format: 'file',
  },
  integrations: [
    sitemap({
      // Strony noindex (lista w src/config.ts — to samo źródło ustawia
      // meta robots w BaseLayout) nie trafiają do sitemapy.
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\.html$/, '');
        return !NOINDEX_PATHS.some(
          (e) => path === e || path === `${e}/` || path.startsWith(`${e}/`),
        );
      },
    }),
  ],
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
