// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

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
      // Stub angielski nie trafia do sitemapy, dopóki nie ma treści EN.
      filter: (page) => {
        const path = new URL(page).pathname;
        return path !== '/en' && !path.startsWith('/en/') && path !== '/dziekuje';
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
