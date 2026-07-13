# Revelare — instrukcja obsługi strony

Ten dokument jest pisany dla właściciela strony, nie dla programisty.
Wszystkie codzienne czynności (nowe zdjęcie, nowy produkt, zmiana ceny,
oznaczenie „wyprzedane") sprowadzają się do **edycji plików tekstowych
i wrzucenia obrazów** — bez dotykania kodu.

---

## Jak to jest poukładane

```
src/
├── config.ts               ← Twoje dane: e-mail, Instagram, klucze, flagi
├── assets/images/          ← tu wrzucasz pliki JPG
└── content/
    ├── photos/             ← wpisy portfolio (1 plik .md = 1 zdjęcie)
    ├── prints/             ← wydruki w sklepie (1 plik .md = 1 produkt)
    └── digitals/           ← pliki cyfrowe (1 plik .md = 1 produkt)
```

W każdym z trzech katalogów leży **wzorzec** (`_wzor-…md`) z komentarzem
przy każdym polu. Pliki zaczynające się od `_` nie trafiają na stronę.

Wszystko edytujesz bezpośrednio na GitHubie (przycisk ołówka przy pliku)
albo lokalnie. Po zapisaniu zmian na gałęzi `main` Cloudflare sam
przebuduje i opublikuje stronę (2–3 minuty).

---

## Jak dodać zdjęcie do portfolio

1. Przygotuj JPG — **maks. 2048 px po dłuższym boku** (strona i tak nie
   pokaże większego; mniejszy plik = szybszy build). Watermark, jeśli
   chcesz, nakładasz sam — strona niczego nie dokleja. EXIF możesz
   zostawić: build go usuwa automatycznie.
2. Wrzuć plik do `src/assets/images/`, np. `pasikonik.jpg`.
3. Skopiuj `src/content/photos/_wzor-zdjecia.md` do nowego pliku, np.
   `pasikonik.md` (bez `_` na początku, bez polskich znaków w nazwie).
4. Uzupełnij pola według komentarzy (tytuł, gatunek, kategoria,
   `image: "../../assets/images/pasikonik.jpg"`).
5. Zapisz. Tyle.

Zdjęcie z `featured: true` pojawi się też na stronie głównej. Jedno
zdjęcie w całej kolekcji powinno mieć `hero: true` — to kadr na pełny
ekran na górze strony głównej.

## Jak dodać wydruk / zmienić cenę / oznaczyć sold out

- **Nowy wydruk:** skopiuj `src/content/prints/_wzor-wydruku.md`,
  usuń `_`, uzupełnij pola. Adres strony produktu = nazwa pliku
  (`wstezyk.md` → `bartsideas.com/wydruki/wstezyk`).
- **Publikacja:** produkt jest widoczny w sklepie dopiero, gdy ustawisz
  `published: true`. Dopóki wszystkie produkty są szkicami
  (`published: false`), strony /wydruki i /pliki pokazują eleganckie
  „Sklep w przygotowaniu" — możesz spokojnie dopieszczać szkice.
- **Zmiana ceny:** zmień liczbę w polu `price` przy wariancie. Uwaga:
  cenę trzeba też zmienić w Stripe (patrz niżej) — na stronie jest tylko
  informacyjnie, płatność pobiera kwotę z linku Stripe.
- **Sprzedała się sztuka edycji:** podbij `sold: 7` → `sold: 8`.
  Gdy `sold` zrówna się z `edition`, strona sama pokaże „Wyprzedane"
  i wyłączy przyciski.
- **Zdjęcie produktu ze sklepu:** ustaw `available: false`.

## Jak podpiąć płatność Stripe (wydruki)

Jeden link = jedno zdjęcie w jednym rozmiarze.

1. Załóż konto na [stripe.com](https://stripe.com). W ustawieniach
   płatności włącz **BLIK** i **Przelewy24** (Settings → Payment methods).
2. Utwórz produkt: **Product catalog → Add product** — nazwa np.
   „Galaktyka Igła — wydruk A3", cena w PLN.
3. Utwórz link: **Payment Links → New** → wybierz produkt → w opcjach
   włącz **zbieranie adresu wysyłki** (Collect shipping address) i ogranicz
   kraje do Polski → Create.
4. Skopiuj adres (zaczyna się od `https://buy.stripe.com/...`) i wklej
   w pole `stripeLink` przy właściwym wariancie w pliku produktu.

Po każdej sprzedaży dostaniesz e-mail od Stripe z adresem wysyłki —
realizacja (lab, pakowanie, nadanie) jest po Twojej stronie.

## Jak podpiąć Lemon Squeezy (pliki cyfrowe)

Lemon Squeezy sam rozlicza VAT i dostarcza plik kupującemu.

1. Załóż sklep na [lemonsqueezy.com](https://www.lemonsqueezy.com)
   i przejdź weryfikację.
2. **Products → New product** — nazwa, cena w PLN, a w sekcji plików
   wgraj **oryginalny plik w pełnej rozdzielczości** (bez watermarku).
3. Skopiuj link **Share → Checkout link** i wklej w pole
   `lemonSqueezyUrl` w pliku produktu w `src/content/digitals/`.

## Formularz kontaktowy (Web3Forms)

1. Wejdź na [web3forms.com](https://web3forms.com), podaj swój e-mail —
   dostaniesz **Access Key**.
2. Wklej go w `src/config.ts` w pole `web3formsKey`.
   Od tej chwili wiadomości z formularzy przychodzą na Twój e-mail.

## Deploy na Cloudflare — jak to działa

Repozytorium jest już podpięte do **Cloudflare Workers Builds**
(konfiguracja w pliku `wrangler.jsonc` — nie ruszaj go):

- każdy zapis na gałęzi `main` **automatycznie buduje i publikuje** stronę
  produkcyjną (2–3 minuty),
- każda inna gałąź dostaje własny **adres podglądowy** `*.workers.dev`
  (link pojawia się w komentarzu bota pod pull requestem na GitHubie).

Nie ma żadnego ręcznego wgrywania plików.

### Podpięcie własnej domeny

1. W panelu Cloudflare: **Workers & Pages → bartsideas → Settings →
   Domains & Routes → Add → Custom domain** — wpisz np. `bartsideas.com`.
2. Jeśli domena jest zarejestrowana poza Cloudflare, panel poprosi
   o zmianę serwerów DNS u rejestratora na wskazane przez Cloudflare
   (zmiana propaguje się do 24 h). Certyfikat SSL wystawi się sam.
3. Jeżeli zmieniasz domenę na inną niż `bartsideas.com` — podmień adres
   w **jednej linijce**: `site:` w pliku `astro.config.mjs`
   (robots.txt i mapa strony wygenerują się z niej same).

### Statystyki odwiedzin (bez baneru cookies)

1. W panelu Cloudflare: **Analytics & Logs → Web Analytics → Add a site**.
2. Skopiuj **token** ze snippetu i wklej go w `src/config.ts` w pole
   `cloudflareAnalyticsToken`. To wszystko — narzędzie nie używa cookies,
   więc baner zgód nie jest potrzebny.

## Pozostałe ustawienia w `src/config.ts`

- `instagram`, `inaturalist`, `email` — Twoje linki w stopce i kontakcie,
- `showPeopleSection: true` — włącza sekcję „Ludzie" w portfolio,
- `seller` — dane do dokumentów prawnych (**uzupełnij adres!**),
- teksty w `[NAWIASACH ✏️]` na stronach O mnie, Usługi i Szkolenia — do
  podmiany (ceny pakietów i szkoleń edytujesz wprost w plikach
  `src/pages/uslugi.astro` i `src/pages/szkolenia.astro` — to zwykłe
  listy tekstowe na górze pliku).

⚠️ Strony `/regulamin`, `/polityka-prywatnosci` i `/odstapienie-od-umowy`
to szkice oznaczone **[DO WERYFIKACJI PRAWNEJ]** — przed uruchomieniem
sprzedaży pokaż je prawnikowi.

## Dla programisty (gdyby kiedyś był potrzebny)

Astro 7 + Tailwind 4, output w pełni statyczny, zero backendu.
`npm install`, `npm run dev` (podgląd na `localhost:4321`),
`npm run build` (wynik w `dist/`). Treści: Astro Content Collections
(`src/content.config.ts`). Obrazy: pipeline Astro — AVIF/WebP, srcset,
LQIP, EXIF usuwany, maks. 2048 px. Struktura tras gotowa pod `/en`.
