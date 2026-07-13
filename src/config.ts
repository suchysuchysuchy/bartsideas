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

  // ✏️ Linki społecznościowe — podmień na własne profile.
  instagram: 'https://www.instagram.com/twoj-profil',
  inaturalist: 'https://www.inaturalist.org/people/twoj-profil',

  // Czy sekcja „Ludzie” ma być widoczna w portfolio? (true / false)
  showPeopleSection: false,

  // ✏️ Klucz dostępu Web3Forms (https://web3forms.com — darmowe, podajesz
  // tylko e-mail i dostajesz klucz). Bez klucza formularze nie wysyłają.
  web3formsKey: 'TU-WKLEJ-KLUCZ-WEB3FORMS',

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
