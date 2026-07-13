import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Trzy kolekcje treści. Dodanie zdjęcia lub produktu = plik obrazu
 * w src/assets/images/ + jeden plik .md w odpowiednim katalogu.
 * Pliki zaczynające się od "_" (wzorce) są ignorowane przy buildzie.
 */

const photos = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/photos' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      species: z.string().optional(), // nazwa binominalna, renderowana kursywą
      location: z.string().optional(),
      year: z.number().optional(),
      category: z.enum(['makro', 'astro', 'ludzie']),
      image: image(),
      alt: z.string(),
      featured: z.boolean().default(false), // pokazuj na stronie głównej
      hero: z.boolean().default(false), // zdjęcie hero na stronie głównej (jedno)
      order: z.number().default(99),
    }),
});

const variant = z.object({
  size: z.string(), // np. "A3 (29,7×42 cm)"
  paper: z.string(), // np. "Hahnemühle Photo Rag 308"
  price: z.number(), // cena w PLN
  stripeLink: z.string().url().or(z.literal('')).default(''), // Stripe Payment Link
});

const prints = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/prints' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      species: z.string().optional(),
      image: image(),
      alt: z.string(),
      published: z.boolean().default(false), // true = produkt widoczny w sklepie; false = szkic
      edition: z.number().nullable().default(null), // liczba = edycja limitowana, null = open edition
      sold: z.number().default(0), // sprzedane sztuki edycji (aktualizujesz ręcznie)
      available: z.boolean().default(true), // false = zdejmij ze sprzedaży
      order: z.number().default(99),
      variants: z.array(variant).min(1),
    }),
});

const digitals = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/digitals' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      species: z.string().optional(),
      image: image(),
      alt: z.string(),
      published: z.boolean().default(false), // true = produkt widoczny w sklepie; false = szkic
      price: z.number(), // cena w PLN
      resolution: z.string().optional(), // np. "6000×4000 px"
      format: z.string().default('JPG'),
      lemonSqueezyUrl: z.string().url().or(z.literal('')).default(''),
      available: z.boolean().default(true),
      order: z.number().default(99),
    }),
});

export const collections = { photos, prints, digitals };
