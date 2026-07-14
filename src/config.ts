/**
 * Ustawienia strony — jedyny plik konfiguracyjny, który edytujesz.
 * Pola oznaczone ✏️ podmień na własne dane.
 */
export const SITE = {
  name: 'Revelare',
  owner: 'Bartłomiej Suchanek',
  motto: 'revelare abscondita',
  mottoTranslation: 'ujawniać ukryte',
  location: 'Częstochowa · Jura Krakowsko-Częstochowska',

  // ✏️ Adres e-mail kontaktowy (widoczny na stronie).
  email: 'bartsideas@gmail.com',

  // Linki społecznościowe. Linki zawierające "twoj-profil" są traktowane
  // jako placeholder i NIE pokazują się na stronie.
  instagram: 'https://www.instagram.com/bartsideas/',
  inaturalist: 'https://www.inaturalist.org/people/bartsuchy',

  // Czy sekcja „Ludzie” ma być widoczna w portfolio? (true / false)
  showPeopleSection: false,

  // ✏️ Klucz dostępu Web3Forms (https://web3forms.com — darmowe, podajesz
  // tylko e-mail i dostajesz klucz). Bez klucza formularze nie wysyłają.
  web3formsKey: '02564a10-7282-4bda-aa75-c1ebc619b8c8',

  // ✏️ Token Cloudflare Web Analytics (zakładka Analytics → Web Analytics
  // w panelu Cloudflare). Pusty = analityka wyłączona.
  cloudflareAnalyticsToken: '',

  // ✏️ Dane sprzedawcy do dokumentów prawnych (działalność nierejestrowana).
  seller: {
    name: 'Bartłomiej Suchanek',
    address: '[ADRES DO KORESPONDENCJI — UZUPEŁNIJ]',
    email: 'bartsideas@gmail.com',
  },

  // Informacja o realizacji wydruków, pokazywana przy produktach.
  fulfillment: 'Czas realizacji: 5–10 dni roboczych. Wysyłka na terenie Polski.',
} as const;

/** Czy link społecznościowy jest prawdziwy (nie placeholder)? */
export const isRealLink = (url: string) => !url.includes('twoj-profil');

/** Czy klucz Web3Forms jest skonfigurowany? */
export const hasWeb3formsKey = !SITE.web3formsKey.startsWith('TU-WKLEJ') && SITE.web3formsKey.length > 0;

/** Profile społecznościowe — jedna lista dla stopki i strony kontaktu. */
export const socials = [
  { href: SITE.instagram, label: 'Instagram' },
  { href: SITE.inaturalist, label: 'iNaturalist' },
].filter((s) => isRealLink(s.href));

/**
 * Ścieżki poza indeksem wyszukiwarek i poza sitemapą.
 * Jedno źródło prawdy: BaseLayout ustawia z niej meta noindex,
 * a astro.config.mjs filtruje sitemapę.
 */
export const NOINDEX_PATHS = [
  '/en', // stub — do czasu powstania treści EN
  '/dziekuje', // strona techniczna po wysłaniu formularza
  '/regulamin', // szkice prawne [DO WERYFIKACJI PRAWNEJ]
  '/polityka-prywatnosci',
  '/odstapienie-od-umowy',
];
