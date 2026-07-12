import type { APIRoute } from 'astro';

// robots.txt generowany z konfiguracji — domena zmienia się tylko
// w astro.config.mjs (pole `site`).
export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', site)}
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
