/**
 * Czysta ścieżka strony bez artefaktów build.format 'file':
 * "/index.html" → "/", "/wydruki.html" → "/wydruki".
 * Jedno źródło prawdy dla canonical (BaseLayout) i aria-current (Nav).
 */
export const cleanPath = (pathname: string): string =>
  pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '') || '/';
