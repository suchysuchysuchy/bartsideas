---
# ── WZORZEC PRODUKTU: WYDRUK FINE ART ─────────────────────────────────
# Skopiuj plik, zmień nazwę (np. wstezyk-ogrodowy.md — nazwa pliku = adres
# strony produktu /wydruki/wstezyk-ogrodowy) i usuń podkreślnik z początku.

# Nazwa wydruku.
title: "Tytuł wydruku"

# (opcjonalne) Nazwa gatunkowa — kursywą na karcie produktu.
species: "Cepaea hortensis"

# Podgląd produktu (ten sam obraz co w portfolio albo inny kadr).
image: "../../assets/images/placeholders/makro-01.jpg"
alt: "Opis obrazu"

# Edycja limitowana: liczba sztuk (np. 25) albo null = edycja otwarta.
edition: 25

# Ile sztuk edycji już sprzedano — aktualizujesz RĘCZNIE po każdej sprzedaży.
# Gdy sold == edition, strona sama pokaże „Wyprzedane” i schowa przyciski.
sold: 7

# false = produkt znika ze sklepu (ale strona produktu nadal istnieje).
available: true

# Kolejność w gridzie sklepu — mniejsza liczba = wyżej.
order: 50

# Warianty: rozmiar × papier × cena (PLN) × link płatności Stripe.
# stripeLink: wygeneruj w Stripe → Payment Links (instrukcja w README.md),
# wklej tutaj. Pusty "" = przycisk nieaktywny z podpisem „wkrótce”.
variants:
  - size: "A3 (29,7×42 cm)"
    paper: "Hahnemühle Photo Rag 308"
    price: 350
    stripeLink: ""
  - size: "A2 (42×59,4 cm)"
    paper: "Hahnemühle Photo Rag 308"
    price: 550
    stripeLink: ""
  - size: "50×70 cm"
    paper: "Hahnemühle Photo Rag 308"
    price: 750
    stripeLink: ""
---

Tu, pod kreskami, piszesz zwykłym tekstem opis wydruku — historia kadru,
technika (focus stacking, liczba klatek), charakter papieru. Ten tekst
pokazuje się na stronie produktu. Może mieć kilka akapitów.
