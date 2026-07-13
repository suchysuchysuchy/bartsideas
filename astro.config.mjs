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
      // Poza sitemapą: stub angielski (brak treści EN), strona podziękowania
      // oraz dokumenty prawne, dopóki są szkicami [DO WERYFIKACJI PRAWNEJ].
      filter: (page) => {
        const path = new URL(page).pathname;
        const excluded = [
          '/en',
          '/dziekuje',
          '/regulamin',
          '/polityka-prywatnosci',
          '/odstapienie-od-umowy',
        ];
        return !excluded.some((e) => path === e || path === `${e}/` || path.startsWith(`${e}/`));
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
